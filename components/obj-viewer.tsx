"use client";

import { useEffect, useRef, useState } from "react";

// GitHub Pages 子路徑：OBJ/貼圖為一般檔案，需手動補 basePath
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

type Props = {
  src: string; // OBJ 路徑，例如 "/models/roman-ruins/3Dmodel.obj"（同資料夾須有同名 .mtl 與貼圖）
  height?: number;
};

export function ObjViewer({ src, height = 480 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cleanup: (() => void) | undefined;
    let disposed = false;

    (async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import(
        "three/examples/jsm/controls/OrbitControls.js"
      );
      const { OBJLoader } = await import(
        "three/examples/jsm/loaders/OBJLoader.js"
      );
      const { MTLLoader } = await import(
        "three/examples/jsm/loaders/MTLLoader.js"
      );
      if (disposed) return;

      const width = container.clientWidth || 600;
      const h = container.clientHeight || height;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / h, 0.1, 5_000_000);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      });
      renderer.setSize(width, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // 燈光
      scene.add(new THREE.HemisphereLight(0xffffff, 0x8d8676, 1.15));
      const key = new THREE.DirectionalLight(0xffffff, 1.5);
      key.position.set(1, 2, 1.5);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xffffff, 0.6);
      fill.position.set(-1.5, 1, -1);
      scene.add(fill);

      const render = () => renderer.render(scene, camera);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = false;
      // 需要時才算繪（重模型較省效能）：操作時重畫
      controls.addEventListener("change", render);

      const ro = new ResizeObserver(() => {
        const w = container.clientWidth || 600;
        const hh = container.clientHeight || height;
        camera.aspect = w / hh;
        camera.updateProjectionMatrix();
        renderer.setSize(w, hh);
        render();
      });
      ro.observe(container);

      // 解析路徑：資料夾、OBJ 檔名、MTL 檔名
      const resolved = src.startsWith("/") ? `${basePath}${src}` : src;
      const dir = resolved.slice(0, resolved.lastIndexOf("/") + 1);
      const objFile = resolved.slice(resolved.lastIndexOf("/") + 1);
      const mtlFile = objFile.replace(/\.obj$/i, ".mtl");

      const onLoaded = (obj: import("three").Object3D) => {
        if (disposed) return;
        // 補法線（Rhino OBJ 常缺頂點法線，否則會全黑）+ 雙面渲染（避免面朝向反了被剔除）
        obj.traverse((child) => {
          const mesh = child as import("three").Mesh;
          if (!mesh.isMesh) return;
          if (mesh.geometry && !mesh.geometry.attributes.normal) {
            mesh.geometry.computeVertexNormals();
          }
          const mats = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];
          mats.forEach((m) => {
            if (m) (m as import("three").Material).side = THREE.DoubleSide;
          });
        });

        const box = new THREE.Box3().setFromObject(obj);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        obj.position.sub(center);
        const maxDim = Math.max(size.x, size.y, size.z) || 1;

        camera.near = maxDim / 1000;
        camera.far = maxDim * 1000;
        camera.position.set(maxDim * 0.9, maxDim * 0.7, maxDim * 1.3);
        camera.updateProjectionMatrix();
        controls.target.set(0, 0, 0);
        controls.maxDistance = maxDim * 6;
        controls.minDistance = maxDim * 0.15;
        controls.update();

        scene.add(obj);
        render();
        setStatus("ready");
      };

      const onError = (err: unknown) => {
        console.error("OBJ 載入失敗", err);
        if (!disposed) setStatus("error");
      };

      // 先載 MTL（含貼圖），再套到 OBJ
      new MTLLoader()
        .setPath(dir)
        .setResourcePath(dir)
        .load(
          mtlFile,
          (materials) => {
            if (disposed) return;
            materials.preload();
            new OBJLoader()
              .setMaterials(materials)
              .setPath(dir)
              .load(objFile, onLoaded, undefined, onError);
          },
          undefined,
          () => {
            // 沒有 MTL 也照樣載入 OBJ（用預設材質）
            new OBJLoader().setPath(dir).load(objFile, onLoaded, undefined, onError);
          },
        );

      cleanup = () => {
        controls.removeEventListener("change", render);
        ro.disconnect();
        controls.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [src, height]);

  return (
    <div
      className="relative overflow-hidden rounded-lg border border-line bg-card"
      style={{ height }}
    >
      <div ref={containerRef} className="h-full w-full" />
      {status !== "ready" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-muted">
          {status === "error" ? "3D 模型載入失敗" : "3D 模型載入中…"}
        </div>
      )}
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-xs text-white">
        拖曳旋轉・滾輪縮放・右鍵平移
      </div>
    </div>
  );
}

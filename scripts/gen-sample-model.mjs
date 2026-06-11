// 產生一個範例 3D 模型（GLB），是一棟階梯狀的建築量體，讓網站立即有可互動的 3D。
// 之後你只要把自己的模型匯出成 .glb 放到 public/models/，再到 data/projects.ts 指定路徑即可，
// 不需要再執行這支腳本。
// 執行：node scripts/gen-sample-model.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "../public/models");
mkdirSync(outDir, { recursive: true });

// 要組成建築量體的方塊：[中心x, 中心y, 中心z, 寬, 高, 深]
const boxes = [
  [0, 0.5, 0, 6, 1, 6], // 基座
  [-1, 2, -1, 3.2, 2, 3.2], // 第二層
  [-1.6, 3.6, -1.6, 1.6, 1.2, 1.6], // 頂層
  [1.6, 1.4, 1.6, 0.8, 1.8, 0.8], // 旁邊一根柱體
];

const positions = [];
const normals = [];
const indices = [];

function addBox(cx, cy, cz, w, h, d) {
  const x0 = cx - w / 2,
    x1 = cx + w / 2;
  const y0 = cy - h / 2,
    y1 = cy + h / 2;
  const z0 = cz - d / 2,
    z1 = cz + d / 2;

  // 每個面 4 個頂點 + 法線
  const faces = [
    { n: [0, 0, 1], v: [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]] }, // +Z
    { n: [0, 0, -1], v: [[x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0]] }, // -Z
    { n: [1, 0, 0], v: [[x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1]] }, // +X
    { n: [-1, 0, 0], v: [[x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0]] }, // -X
    { n: [0, 1, 0], v: [[x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0]] }, // +Y
    { n: [0, -1, 0], v: [[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]] }, // -Y
  ];

  for (const f of faces) {
    const base = positions.length / 3;
    for (const vert of f.v) {
      positions.push(...vert);
      normals.push(...f.n);
    }
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
  }
}

for (const b of boxes) addBox(...b);

// 打包成二進位 buffer：positions(float32) + normals(float32) + indices(uint32)
const posArr = new Float32Array(positions);
const normArr = new Float32Array(normals);
const idxArr = new Uint32Array(indices);

const posBytes = Buffer.from(posArr.buffer);
const normBytes = Buffer.from(normArr.buffer);
const idxBytes = Buffer.from(idxArr.buffer);

function pad4(buf) {
  const rem = buf.length % 4;
  return rem === 0 ? buf : Buffer.concat([buf, Buffer.alloc(4 - rem)]);
}

const bin = Buffer.concat([pad4(posBytes), pad4(normBytes), pad4(idxBytes)]);

// 計算 POSITION 的 min / max（glTF 規範要求）
const min = [Infinity, Infinity, Infinity];
const max = [-Infinity, -Infinity, -Infinity];
for (let i = 0; i < positions.length; i += 3) {
  for (let k = 0; k < 3; k++) {
    min[k] = Math.min(min[k], positions[i + k]);
    max[k] = Math.max(max[k], positions[i + k]);
  }
}

const vertexCount = positions.length / 3;
const posLen = posBytes.length;
const normLen = normBytes.length;
const idxLen = idxBytes.length;
const normOffset = pad4(posBytes).length;
const idxOffset = normOffset + pad4(normBytes).length;

const gltf = {
  asset: { version: "2.0", generator: "portfolio sample generator" },
  scene: 0,
  scenes: [{ nodes: [0] }],
  nodes: [{ mesh: 0, name: "Building" }],
  meshes: [
    {
      name: "Building",
      primitives: [
        {
          attributes: { POSITION: 0, NORMAL: 1 },
          indices: 2,
          material: 0,
        },
      ],
    },
  ],
  materials: [
    {
      name: "Concrete",
      pbrMetallicRoughness: {
        baseColorFactor: [0.82, 0.8, 0.76, 1],
        metallicFactor: 0.0,
        roughnessFactor: 0.85,
      },
    },
  ],
  buffers: [{ byteLength: bin.length }],
  bufferViews: [
    { buffer: 0, byteOffset: 0, byteLength: posLen, target: 34962 },
    { buffer: 0, byteOffset: normOffset, byteLength: normLen, target: 34962 },
    { buffer: 0, byteOffset: idxOffset, byteLength: idxLen, target: 34963 },
  ],
  accessors: [
    {
      bufferView: 0,
      componentType: 5126,
      count: vertexCount,
      type: "VEC3",
      min,
      max,
    },
    { bufferView: 1, componentType: 5126, count: vertexCount, type: "VEC3" },
    { bufferView: 2, componentType: 5125, count: indices.length, type: "SCALAR" },
  ],
};

// 組成 GLB 容器
const jsonStr = JSON.stringify(gltf);
let jsonBuf = Buffer.from(jsonStr, "utf8");
// JSON chunk 以空白補齊到 4 bytes
const jsonPad = (4 - (jsonBuf.length % 4)) % 4;
if (jsonPad) jsonBuf = Buffer.concat([jsonBuf, Buffer.from(" ".repeat(jsonPad))]);
// BIN chunk 以 0 補齊到 4 bytes
let binBuf = bin;
const binPad = (4 - (binBuf.length % 4)) % 4;
if (binPad) binBuf = Buffer.concat([binBuf, Buffer.alloc(binPad)]);

const header = Buffer.alloc(12);
header.writeUInt32LE(0x46546c67, 0); // "glTF"
header.writeUInt32LE(2, 4); // version
header.writeUInt32LE(12 + 8 + jsonBuf.length + 8 + binBuf.length, 8); // total length

const jsonHeader = Buffer.alloc(8);
jsonHeader.writeUInt32LE(jsonBuf.length, 0);
jsonHeader.writeUInt32LE(0x4e4f534a, 4); // "JSON"

const binHeader = Buffer.alloc(8);
binHeader.writeUInt32LE(binBuf.length, 0);
binHeader.writeUInt32LE(0x004e4942, 4); // "BIN\0"

const glb = Buffer.concat([header, jsonHeader, jsonBuf, binHeader, binBuf]);
const outFile = resolve(outDir, "sample-building.glb");
writeFileSync(outFile, glb);
console.log(`已產生範例模型：public/models/sample-building.glb（${glb.length} bytes，${vertexCount} 頂點）`);

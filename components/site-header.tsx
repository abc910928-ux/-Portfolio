import Link from "next/link";

const nav = [
  { href: "/", label: "作品" },
  { href: "/about", label: "關於" },
  { href: "/#contact", label: "聯絡" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex flex-col leading-tight">
          <span className="text-lg font-medium tracking-wide">
            建築・3D 作品集
          </span>
          <span className="text-xs text-muted">
            Architecture ・ 3D Modeling ・ Rendering
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

import { supabase } from "@/lib/supabase";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export const revalidate = 30;

async function getProducts() {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("status", "disponible")
    .gt("quantity", 0)
    .order("brand", { ascending: true });
  return data || [];
}

export default async function Home() {
  const products = await getProducts();
  const iphones = products.filter((p: any) => p.brand === "iPhone").slice(0, 4);

  return (
    <main className="min-h-screen">
      <ThemeToggle />

      {/* HEADER */}
      <header className="px-6 pt-10 pb-5 text-center">
        <svg className="w-24 h-24 mx-auto mb-4" viewBox="0 0 100 100" fill="none">
          <rect x="20" y="20" width="60" height="60" stroke="#c9a227" strokeWidth="1.5" />
          <rect x="20" y="20" width="60" height="60" stroke="#c9a227" strokeWidth="1.5" transform="rotate(45 50 50)" />
          <rect x="25" y="25" width="50" height="50" stroke="#c9a227" strokeWidth="1" />
          <text x="50" y="62" fontFamily="Playfair Display, serif" fontSize="34" fontStyle="italic" fill="#c9a227" textAnchor="middle" fontWeight="500">H</text>
        </svg>
        <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-[0.15em] mb-2">HELENA STORE</h1>
        <p className="text-xs tracking-[0.3em] uppercase opacity-60">Premium · Santa Cruz, Argentina</p>
      </header>

      {/* NAV */}
      <nav className="flex justify-center gap-10 px-6 py-5 border-y border-theme mt-8">
        <Link href="#celulares" className="text-xs tracking-[0.25em] uppercase hover:text-gold transition-colors">Celulares</Link>
        <Link href="#accesorios" className="text-xs tracking-[0.25em] uppercase hover:text-gold transition-colors">Accesorios</Link>
        <Link href="#hogar" className="text-xs tracking-[0.25em] uppercase hover:text-gold transition-colors">Hogar</Link>
        <Link href="/carrito" className="text-xs tracking-[0.25em] uppercase hover:text-gold transition-colors">Carrito</Link>
      </nav>

      {/* HERO */}
      <section className="py-20 px-6 text-center max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-gold mb-5">Nueva colección</p>
        <h2 className="font-serif text-4xl md:text-6xl font-normal leading-tight mb-5">
          Tecnología que eleva<br />tu estilo de vida
        </h2>
        <p className="text-base max-w-lg mx-auto mb-8 opacity-70 leading-relaxed">
          iPhones, accesorios y selecciones premium. Cada pieza curada con intención.
        </p>
        <Link href="#celulares" className="inline-block px-9 py-3.5 border border-current text-xs tracking-[0.2em] uppercase hover:bg-gold hover:border-gold hover:text-black transition-all">
          Explorar catálogo
        </Link>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* CELULARES grande */}
        <Link href="#celulares" className="bg-soft border border-transparent hover:border-gold transition-all hover:-translate-y-1 flex flex-col md:row-span-2 md:min-h-[720px] min-h-[500px]">
          <div className="p-8 pb-4">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-2">Categoría principal</p>
            <h3 className="font-serif text-3xl md:text-5xl font-medium mb-3">Celulares</h3>
            <p className="text-sm opacity-65">iPhone, Samsung, Xiaomi y más.<br />Nuevos y seleccionados con garantía.</p>
          </div>
          <div className="flex-1 flex items-center justify-center p-5">
            <svg className="w-full max-w-[280px]" viewBox="0 0 300 400">
              <defs>
                <linearGradient id="phone1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c9a227" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#8a6d14" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="phone2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2a2a2a" />
                  <stop offset="100%" stopColor="#0a0a0a" />
                </linearGradient>
              </defs>
              <circle cx="150" cy="200" r="140" fill="#c9a227" opacity="0.04" />
              <g transform="translate(40,70) rotate(-8)">
                <rect x="0" y="0" width="110" height="220" rx="18" fill="url(#phone1)" stroke="#c9a227" strokeWidth="1.2" />
                <rect x="8" y="12" width="94" height="198" rx="12" fill="#1a1a1a" opacity="0.4" />
                <circle cx="25" cy="30" r="9" fill="#1a1a1a" stroke="#c9a227" strokeWidth="0.6" />
                <circle cx="25" cy="52" r="9" fill="#1a1a1a" stroke="#c9a227" strokeWidth="0.6" />
                <circle cx="25" cy="30" r="3" fill="#c9a227" opacity="0.7" />
              </g>
              <g transform="translate(140,50) rotate(6)">
                <rect x="0" y="0" width="120" height="240" rx="20" fill="url(#phone2)" stroke="#c9a227" strokeWidth="1.5" />
                <rect x="6" y="8" width="108" height="224" rx="14" fill="#000" />
                <rect x="48" y="14" width="24" height="5" rx="2.5" fill="#c9a227" opacity="0.3" />
                <rect x="12" y="30" width="2" height="180" rx="1" fill="#c9a227" opacity="0.25" />
                <circle cx="60" cy="110" r="34" fill="#c9a227" opacity="0.18" />
                <circle cx="60" cy="110" r="20" fill="#c9a227" opacity="0.12" />
                <rect x="30" y="170" width="60" height="1.5" fill="#c9a227" opacity="0.35" />
                <rect x="40" y="180" width="40" height="1.5" fill="#c9a227" opacity="0.25" />
              </g>
            </svg>
          </div>
          <div className="px-8 py-5 border-t border-gold/20 text-xs tracking-[0.25em] uppercase text-gold">Ver colección →</div>
        </Link>

        {/* ACCESORIOS chico */}
        <Link href="#accesorios" className="bg-soft border border-transparent hover:border-gold transition-all hover:-translate-y-1 flex flex-col min-h-[350px]">
          <div className="p-8 pb-4">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-2">Complementos</p>
            <h3 className="font-serif text-3xl md:text-4xl font-medium mb-3">Accesorios</h3>
            <p className="text-sm opacity-65">Fundas, cables, cargadores, auriculares.</p>
          </div>
          <div className="flex-1 flex items-center justify-center p-5">
            <svg className="w-full max-w-[200px]" viewBox="0 0 200 140">
              <defs>
                <linearGradient id="acc1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c9a227" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#8a6d14" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="70" r="80" fill="#c9a227" opacity="0.05" />
              <g transform="translate(30, 50)">
                <rect x="0" y="0" width="55" height="42" rx="16" fill="url(#acc1)" stroke="#c9a227" strokeWidth="1.2" />
                <line x1="2" y1="21" x2="53" y2="21" stroke="#0a0a0a" strokeWidth="0.6" opacity="0.5" />
                <circle cx="27.5" cy="10" r="1.8" fill="#0a0a0a" opacity="0.6" />
              </g>
              <g transform="translate(115, 40)" stroke="#c9a227" fill="none" strokeWidth="2" strokeLinecap="round">
                <path d="M 0 30 Q 15 8, 30 30 T 60 30" />
                <path d="M 0 48 Q 15 26, 30 48 T 60 48" opacity="0.6" />
                <circle cx="0" cy="30" r="3.5" fill="#c9a227" />
                <circle cx="60" cy="30" r="3.5" fill="#c9a227" />
              </g>
            </svg>
          </div>
          <div className="px-8 py-5 border-t border-gold/20 text-xs tracking-[0.25em] uppercase text-gold">Ver →</div>
        </Link>

        {/* HOGAR chico */}
        <Link href="#hogar" className="bg-soft border border-transparent hover:border-gold transition-all hover:-translate-y-1 flex flex-col min-h-[350px]">
          <div className="p-8 pb-4">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-2">Estilo de vida</p>
            <h3 className="font-serif text-3xl md:text-4xl font-medium mb-3">Hogar</h3>
            <p className="text-sm opacity-65">Electrodomésticos y selecciones especiales.</p>
          </div>
          <div className="flex-1 flex items-center justify-center p-5">
            <svg className="w-full max-w-[200px]" viewBox="0 0 200 140">
              <defs>
                <linearGradient id="tv1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2a2a2a" />
                  <stop offset="100%" stopColor="#0a0a0a" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="70" r="80" fill="#c9a227" opacity="0.05" />
              <g transform="translate(50, 25)">
                <rect x="0" y="0" width="100" height="60" rx="4" fill="url(#tv1)" stroke="#c9a227" strokeWidth="1.3" />
                <rect x="4" y="4" width="92" height="52" rx="2" fill="#000" />
                <circle cx="50" cy="28" r="14" fill="#c9a227" opacity="0.22" />
                <circle cx="50" cy="28" r="7" fill="#c9a227" opacity="0.15" />
                <rect x="40" y="60" width="20" height="4" fill="#c9a227" opacity="0.7" />
                <rect x="25" y="64" width="50" height="2" fill="#c9a227" opacity="0.5" />
              </g>
            </svg>
          </div>
          <div className="px-8 py-5 border-t border-gold/20 text-xs tracking-[0.25em] uppercase text-gold">Ver →</div>
        </Link>
      </section>

      {/* DESTACADOS iPhone */}
      {iphones.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-2">Destacados iPhone</h2>
            <p className="text-sm tracking-[0.2em] uppercase opacity-50">Selección premium</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {iphones.map((p: any) => {
              const images = Array.isArray(p.images) ? p.images : [];
              const img = images[0];
              return (
                <Link key={p.id} href={`/producto/${p.id}`} className="border border-theme hover:border-gold transition-all hover:-translate-y-1 overflow-hidden relative">
                  {p.quantity === 1 && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[9px] tracking-[0.2em] uppercase bg-gold text-black font-medium z-10">Última unidad</span>
                  )}
                  {p.condition === "nuevo" && p.quantity > 1 && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[9px] tracking-[0.2em] uppercase bg-gold text-black font-medium z-10">Nuevo</span>
                  )}
                  <div className="aspect-square bg-soft flex items-center justify-center overflow-hidden">
                    {img ? <img src={img} alt="" className="w-full h-full object-cover" /> : <span className="font-serif text-6xl opacity-30">iPhone</span>}
                  </div>
                  <div className="p-5 border-t border-theme">
                    <p className="text-[10px] tracking-[0.25em] uppercase text-gold mb-1">{p.brand}</p>
                    <h3 className="font-serif text-lg font-medium mb-1">{p.model}</h3>
                    <p className="text-xs opacity-60 mb-3">{[p.color, p.storage, p.condition].filter(Boolean).join(" · ")}</p>
                    <p className="text-xl text-gold">${Math.round(p.sale_price)} USD</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* TODOS LOS PRODUCTOS (secciones con anclas) */}
      {["Celulares", "Accesorios", "Hogar"].map((cat) => {
        const items = products.filter((p: any) => {
          if (cat === "Accesorios") return p.brand === "Accesorios";
          if (cat === "Hogar") return p.brand === "Otros" || p.brand === "Esotéricos";
          return !["Accesorios", "Otros", "Esotéricos"].includes(p.brand);
        });
        if (items.length === 0) return null;
        const id = cat.toLowerCase();
        return (
          <section key={cat} id={id} className="max-w-6xl mx-auto px-6 py-16">
            <h2 className="font-serif text-3xl font-medium mb-8 pb-3 border-b border-theme">{cat}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((p: any) => {
                const images = Array.isArray(p.images) ? p.images : [];
                const img = images[0];
                return (
                  <Link key={p.id} href={`/producto/${p.id}`} className="border border-theme hover:border-gold transition-all overflow-hidden">
                    <div className="aspect-square bg-soft flex items-center justify-center overflow-hidden">
                      {img ? <img src={img} alt="" className="w-full h-full object-cover" /> : <span className="text-xs tracking-widest opacity-40">SIN FOTO</span>}
                    </div>
                    <div className="p-5">
                      <p className="text-[10px] tracking-[0.25em] uppercase text-gold mb-1">{p.brand}</p>
                      <h3 className="font-serif text-lg font-medium mb-1">{p.model}</h3>
                      <p className="text-xs opacity-60 mb-3">{[p.color, p.storage, p.condition].filter(Boolean).join(" · ")}</p>
                      <p className="text-xl text-gold">${Math.round(p.sale_price)} USD</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* FOOTER */}
      <footer className="bg-footer mt-16 px-6 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left mb-10">
          <div>
            <h4 className="font-serif text-sm tracking-[0.2em] uppercase mb-4 text-gold">Helena Store</h4>
            <p className="text-xs opacity-70 leading-relaxed">Tecnología premium curada con intención. Santa Cruz, Argentina.</p>
          </div>
          <div>
            <h4 className="font-serif text-sm tracking-[0.2em] uppercase mb-4 text-gold">Tienda</h4>
            <a href="#celulares" className="block text-xs opacity-70 hover:opacity-100 hover:text-gold mb-2 transition-all">Celulares</a>
            <a href="#accesorios" className="block text-xs opacity-70 hover:opacity-100 hover:text-gold mb-2 transition-all">Accesorios</a>
            <a href="#hogar" className="block text-xs opacity-70 hover:opacity-100 hover:text-gold transition-all">Hogar</a>
          </div>
          <div>
            <h4 className="font-serif text-sm tracking-[0.2em] uppercase mb-4 text-gold">Contacto</h4>
            <a href="#" className="block text-xs opacity-70 hover:opacity-100 hover:text-gold mb-2 transition-all">WhatsApp</a>
            <a href="#" className="block text-xs opacity-70 hover:opacity-100 hover:text-gold mb-2 transition-all">Instagram</a>
            <a href="#" className="block text-xs opacity-70 hover:opacity-100 hover:text-gold transition-all">Facebook</a>
          </div>
          <div>
            <h4 className="font-serif text-sm tracking-[0.2em] uppercase mb-4 text-gold">Atención</h4>
            <p className="text-xs opacity-70 mb-2">Lun a Sáb · 10:00 — 20:00</p>
            <p className="text-xs opacity-70">Envíos y consultas</p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto pt-8 border-t border-gold/20 text-center text-[11px] tracking-[0.2em] uppercase opacity-50">
          © 2026 Helena Store · Todos los derechos reservados
        </div>
      </footer>
    </main>
  );
}

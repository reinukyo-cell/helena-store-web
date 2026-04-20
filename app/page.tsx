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
    <main className="min-h-screen overflow-x-hidden">
      <ThemeToggle />

      <header className="px-4 sm:px-6 pt-8 sm:pt-10 pb-5 text-center">
        <svg className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4" viewBox="0 0 100 100" fill="none">
          <rect x="20" y="20" width="60" height="60" stroke="#c9a227" strokeWidth="1.5" />
          <rect x="20" y="20" width="60" height="60" stroke="#c9a227" strokeWidth="1.5" transform="rotate(45 50 50)" />
          <rect x="25" y="25" width="50" height="50" stroke="#c9a227" strokeWidth="1" />
          <text x="50" y="62" fontFamily="Playfair Display, serif" fontSize="34" fontStyle="italic" fill="#c9a227" textAnchor="middle" fontWeight="500">H</text>
        </svg>
        <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-medium tracking-[0.15em] mb-2">HELENA STORE</h1>
        <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase opacity-60">Premium · Santa Cruz, Argentina</p>
      </header>

      <nav className="flex flex-wrap justify-center gap-4 sm:gap-10 px-4 sm:px-6 py-4 sm:py-5 border-y border-theme mt-6 sm:mt-8">
        <Link href="#celulares" className="text-[10px] sm:text-xs tracking-[0.25em] uppercase hover:text-gold transition-colors">Celulares</Link>
        <Link href="#accesorios" className="text-[10px] sm:text-xs tracking-[0.25em] uppercase hover:text-gold transition-colors">Accesorios</Link>
        <Link href="#hogar" className="text-[10px] sm:text-xs tracking-[0.25em] uppercase hover:text-gold transition-colors">Hogar</Link>
        <Link href="#otros" className="text-[10px] sm:text-xs tracking-[0.25em] uppercase hover:text-gold transition-colors">Otros</Link>
      </nav>

      <section className="py-12 sm:py-20 px-4 sm:px-6 text-center max-w-5xl mx-auto">
        <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold mb-4 sm:mb-5">Nueva colección</p>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-tight mb-4 sm:mb-5">
          Tecnología que eleva<br />tu estilo de vida
        </h2>
        <p className="text-sm sm:text-base max-w-lg mx-auto mb-6 sm:mb-8 opacity-70 leading-relaxed">
          iPhones, accesorios y selecciones premium. Cada pieza curada con intención.
        </p>
        <Link href="#celulares" className="inline-block px-7 sm:px-9 py-3 sm:py-3.5 border border-current text-[10px] sm:text-xs tracking-[0.2em] uppercase hover:bg-gold hover:border-gold hover:text-black transition-all">
          Explorar catálogo
        </Link>
      </section>

      {/* CATEGORIES: celulares 3 filas + 3 chicas al lado */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

        <Link href="#celulares" className="group relative overflow-hidden border border-transparent hover:border-gold transition-all hover:-translate-y-1 md:row-span-3 aspect-[4/5] md:aspect-auto">
          <img src="/categorias/celulares.jpg" alt="Celulares" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white">
            <div>
              <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold mb-2">Categoría principal</p>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-6xl font-medium mb-2 sm:mb-3 drop-shadow-lg">Celulares</h3>
              <p className="text-xs sm:text-sm opacity-90 max-w-xs drop-shadow">iPhone, Samsung, Xiaomi y más.<br />Nuevos y seleccionados con garantía.</p>
            </div>
            <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-gold">Ver colección →</span>
          </div>
        </Link>

        <Link href="#accesorios" className="group relative overflow-hidden border border-transparent hover:border-gold transition-all hover:-translate-y-1 aspect-[16/9]">
          <img src="/categorias/accesorios.jpg" alt="Accesorios" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
          <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between text-white">
            <div>
              <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-gold mb-1">Complementos</p>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium mb-1 drop-shadow-lg">Accesorios</h3>
              <p className="text-[11px] sm:text-xs opacity-90 drop-shadow">Fundas, cables, cargadores.</p>
            </div>
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-gold">Ver →</span>
          </div>
        </Link>

        <Link href="#hogar" className="group relative overflow-hidden border border-transparent hover:border-gold transition-all hover:-translate-y-1 aspect-[16/9]">
          <img src="/categorias/hogar.jpg" alt="Hogar" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
          <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between text-white">
            <div>
              <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-gold mb-1">Estilo de vida</p>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium mb-1 drop-shadow-lg">Hogar</h3>
              <p className="text-[11px] sm:text-xs opacity-90 drop-shadow">Electrodomésticos y selecciones.</p>
            </div>
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-gold">Ver →</span>
          </div>
        </Link>

        <Link href="#otros" className="group relative overflow-hidden border border-transparent hover:border-gold transition-all hover:-translate-y-1 aspect-[16/9]">
          <img src="/categorias/otros.jpg" alt="Otros" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
          <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between text-white">
            <div>
              <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-gold mb-1">Selección especial</p>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium mb-1 drop-shadow-lg">Otros</h3>
              <p className="text-[11px] sm:text-xs opacity-90 drop-shadow">Esotéricos y piezas únicas.</p>
            </div>
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-gold">Ver →</span>
          </div>
        </Link>
      </section>

      {iphones.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium mb-2">Destacados iPhone</h2>
            <p className="text-xs sm:text-sm tracking-[0.2em] uppercase opacity-50">Selección premium</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {iphones.map((p: any) => {
              const images = Array.isArray(p.images) ? p.images : [];
              const img = images[0];
              return (
                <Link key={p.id} href={`/producto/${p.id}`} className="border border-theme hover:border-gold transition-all hover:-translate-y-1 overflow-hidden relative">
                  {p.quantity === 1 && (
                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-1 text-[8px] sm:text-[9px] tracking-[0.2em] uppercase bg-gold text-black font-medium z-10">Última unidad</span>
                  )}
                  {p.condition === "nuevo" && p.quantity > 1 && (
                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-1 text-[8px] sm:text-[9px] tracking-[0.2em] uppercase bg-gold text-black font-medium z-10">Nuevo</span>
                  )}
                  <div className="aspect-square bg-soft flex items-center justify-center overflow-hidden">
                    {img ? <img src={img} alt="" className="w-full h-full object-cover" /> : <span className="font-serif text-4xl sm:text-6xl opacity-30">iPhone</span>}
                  </div>
                  <div className="p-3 sm:p-5 border-t border-theme">
                    <p className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-gold mb-1">{p.brand}</p>
                    <h3 className="font-serif text-base sm:text-lg font-medium mb-1">{p.model}</h3>
                    <p className="text-[10px] sm:text-xs opacity-60 mb-2 sm:mb-3 line-clamp-1">{[p.color, p.storage, p.condition].filter(Boolean).join(" · ")}</p>
                    <p className="text-lg sm:text-xl text-gold">${Math.round(p.sale_price)} USD</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {["Celulares", "Accesorios", "Hogar", "Otros"].map((cat) => {
        const items = products.filter((p: any) => {
          if (cat === "Accesorios") return p.brand === "Accesorios";
          if (cat === "Hogar") return p.brand === "Otros";
          if (cat === "Otros") return p.brand === "Esotéricos";
          return !["Accesorios", "Otros", "Esotéricos"].includes(p.brand);
        });
        if (items.length === 0) return null;
        const id = cat.toLowerCase();
        return (
          <section key={cat} id={id} className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium mb-6 sm:mb-8 pb-3 border-b border-theme">{cat}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
              {items.map((p: any) => {
                const images = Array.isArray(p.images) ? p.images : [];
                const img = images[0];
                return (
                  <Link key={p.id} href={`/producto/${p.id}`} className="border border-theme hover:border-gold transition-all overflow-hidden">
                    <div className="aspect-square bg-soft flex items-center justify-center overflow-hidden">
                      {img ? <img src={img} alt="" className="w-full h-full object-cover" /> : <span className="text-[10px] sm:text-xs tracking-widest opacity-40">SIN FOTO</span>}
                    </div>
                    <div className="p-3 sm:p-5">
                      <p className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-gold mb-1">{p.brand}</p>
                      <h3 className="font-serif text-base sm:text-lg font-medium mb-1">{p.model}</h3>
                      <p className="text-[10px] sm:text-xs opacity-60 mb-2 sm:mb-3 line-clamp-1">{[p.color, p.storage, p.condition].filter(Boolean).join(" · ")}</p>
                      <p className="text-lg sm:text-xl text-gold">${Math.round(p.sale_price)} USD</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      <footer className="bg-footer mt-12 sm:mt-16 px-4 sm:px-6 py-10 sm:py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-left mb-8 sm:mb-10">
          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-serif text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 text-gold">Helena Store</h4>
            <p className="text-[11px] sm:text-xs opacity-70 leading-relaxed">Tecnología premium curada con intención. Santa Cruz, Argentina.</p>
          </div>
          <div>
            <h4 className="font-serif text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 text-gold">Tienda</h4>
            <a href="#celulares" className="block text-[11px] sm:text-xs opacity-70 hover:opacity-100 hover:text-gold mb-2 transition-all">Celulares</a>
            <a href="#accesorios" className="block text-[11px] sm:text-xs opacity-70 hover:opacity-100 hover:text-gold mb-2 transition-all">Accesorios</a>
            <a href="#hogar" className="block text-[11px] sm:text-xs opacity-70 hover:opacity-100 hover:text-gold mb-2 transition-all">Hogar</a>
            <a href="#otros" className="block text-[11px] sm:text-xs opacity-70 hover:opacity-100 hover:text-gold transition-all">Otros</a>
          </div>
          <div>
            <h4 className="font-serif text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 text-gold">Contacto</h4>
            <a href="#" className="block text-[11px] sm:text-xs opacity-70 hover:opacity-100 hover:text-gold mb-2 transition-all">WhatsApp</a>
            <a href="#" className="block text-[11px] sm:text-xs opacity-70 hover:opacity-100 hover:text-gold mb-2 transition-all">Instagram</a>
            <a href="#" className="block text-[11px] sm:text-xs opacity-70 hover:opacity-100 hover:text-gold transition-all">Facebook</a>
          </div>
          <div>
            <h4 className="font-serif text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 text-gold">Atención</h4>
            <p className="text-[11px] sm:text-xs opacity-70 mb-2">Lun a Sáb · 10:00 — 20:00</p>
            <p className="text-[11px] sm:text-xs opacity-70">Envíos y consultas</p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto pt-6 sm:pt-8 border-t border-gold/20 text-center text-[10px] sm:text-[11px] tracking-[0.2em] uppercase opacity-50">
          © 2026 Helena Store · Todos los derechos reservados
        </div>
      </footer>
    </main>
  );
}

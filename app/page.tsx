import { supabase } from "@/lib/supabase";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Navbar from "@/components/Navbar";

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

function ProductCard({ p }: { p: any }) {
  const images = Array.isArray(p.images) ? p.images : [];
  const img = images[0];
  return (
    <Link href={`/producto/${p.id}`} className="border border-theme hover:border-gold transition-all hover:-translate-y-1 overflow-hidden relative">
      {p.quantity === 1 && (
        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-1 text-[8px] sm:text-[9px] tracking-[0.2em] uppercase bg-gold text-black font-medium z-10">Última unidad</span>
      )}
      {p.condition === "nuevo" && p.quantity > 1 && (
        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-1 text-[8px] sm:text-[9px] tracking-[0.2em] uppercase bg-gold text-black font-medium z-10">Nuevo</span>
      )}
      <div className="aspect-square bg-soft flex items-center justify-center overflow-hidden">
        {img ? <img src={img} alt="" className="w-full h-full object-cover" /> : <span className="text-[10px] sm:text-xs tracking-widest opacity-40">SIN FOTO</span>}
      </div>
      <div className="p-3 sm:p-5 border-t border-theme">
        <p className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-gold mb-1">{p.brand}</p>
        <h3 className="font-serif text-base sm:text-lg font-medium mb-1">{p.model}</h3>
        <p className="text-[10px] sm:text-xs opacity-60 mb-2 sm:mb-3 line-clamp-1">{[p.color, p.storage, p.condition].filter(Boolean).join(" · ")}</p>
        <p className="text-lg sm:text-xl text-gold">${Math.round(p.sale_price)} USD</p>
      </div>
    </Link>
  );
}

function SectionDestacados({ titulo, subtitulo, slug, items }: { titulo: string; subtitulo: string; slug: string; items: any[] }) {
  if (items.length === 0) return null;
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium mb-2">{titulo}</h2>
        <p className="text-xs sm:text-sm tracking-[0.2em] uppercase opacity-50">{subtitulo}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {items.map((p: any) => <ProductCard key={p.id} p={p} />)}
      </div>
      <div className="text-center mt-8">
        <Link href={`/categoria/${slug}`} className="inline-block px-7 py-3 border border-current text-[10px] sm:text-xs tracking-[0.2em] uppercase hover:bg-gold hover:border-gold hover:text-black transition-all">
          Ver todos
        </Link>
      </div>
    </section>
  );
}

export default async function Home() {
  const products = await getProducts();
  const iphones = products.filter((p: any) => p.brand === "iPhone").slice(0, 4);
  const hogar = products.filter((p: any) => p.brand === "Hogar").slice(0, 4);
  const accesorios = products.filter((p: any) => p.brand === "Accesorios").slice(0, 4);
  const otros = products.filter((p: any) => p.brand === "Otros" || p.brand === "Esotéricos").slice(0, 4);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <ThemeToggle />

      <header className="px-4 sm:px-6 pt-8 sm:pt-10 pb-5 text-center">
        <img src="/logo.png" alt="Helena Store" className="w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-2 object-contain" />
        <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase opacity-60">Premium · Santa Cruz, Argentina</p>
      </header>

      <Navbar />

      <section className="py-12 sm:py-20 px-4 sm:px-6 text-center max-w-5xl mx-auto">
        <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold mb-4 sm:mb-5">Desde 2018</p>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-tight mb-4 sm:mb-5">
          Tecnología que eleva<br />tu estilo de vida
        </h2>
        <p className="text-sm sm:text-base max-w-lg mx-auto mb-6 sm:mb-8 opacity-70 leading-relaxed">
          Más de 10.000 ventas. Asesoramiento cercano. El equipo ideal, al mejor precio del mercado.
        </p>
        <Link href="/categoria/celulares" className="inline-block px-7 sm:px-9 py-3 sm:py-3.5 border border-current text-[10px] sm:text-xs tracking-[0.2em] uppercase hover:bg-gold hover:border-gold hover:text-black transition-all">
          Explorar catálogo
        </Link>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

        <Link href="/categoria/celulares" className="group relative overflow-hidden border border-transparent hover:border-gold transition-all hover:-translate-y-1 md:row-span-3 aspect-[4/5] md:aspect-auto">
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

        <Link href="/categoria/accesorios" className="group relative overflow-hidden border border-transparent hover:border-gold transition-all hover:-translate-y-1 aspect-[16/9]">
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

        <Link href="/categoria/hogar" className="group relative overflow-hidden border border-transparent hover:border-gold transition-all hover:-translate-y-1 aspect-[16/9]">
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

        <Link href="/categoria/otros" className="group relative overflow-hidden border border-transparent hover:border-gold transition-all hover:-translate-y-1 aspect-[16/9]">
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

      <SectionDestacados titulo="Destacados iPhone" subtitulo="Selección premium" slug="celulares?marca=iPhone" items={iphones} />
      <SectionDestacados titulo="Destacados Hogar" subtitulo="Para tu día a día" slug="hogar" items={hogar} />
      <SectionDestacados titulo="Destacados Accesorios" subtitulo="Complementos esenciales" slug="accesorios" items={accesorios} />
      <SectionDestacados titulo="Destacados Otros" subtitulo="Piezas únicas" slug="otros" items={otros} />

      <section id="sobre" className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold mb-3">Nuestra historia</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium">Sobre nosotros</h2>
        </div>
        <div className="space-y-5 text-sm sm:text-base opacity-80 leading-relaxed">
          <p>
            En <span className="text-gold">HelenaStore</span> trabajamos desde 2018 con un objetivo claro: que cada cliente encuentre el equipo de tecnología ideal con total confianza. A lo largo de estos años hemos concretado más de <span className="text-gold">10.000 ventas</span> en distintas plataformas, construyendo una trayectoria basada en la seguridad, la transparencia y la satisfacción de quienes nos eligen.
          </p>
          <p>
            Nos destacamos por ofrecer una experiencia de compra cómoda, confiable y personalizada. Entendemos que cada usuario tiene necesidades diferentes, por eso te asesoramos de forma cercana para que encuentres el equipo que realmente se adapte a vos, evitando gastos innecesarios y asegurando el mejor rendimiento según tu uso diario.
          </p>
          <p>
            No solo vendemos tecnología, brindamos <span className="text-gold">soluciones pensadas</span> para mejorar tu experiencia. Elegirnos es optar por respaldo, confianza y también por ese plus de status que aporta contar con un equipo adecuado, al mejor precio del mercado.
          </p>
          <p className="font-serif text-lg sm:text-xl text-center pt-4 text-gold italic">
            "En HelenaStore, tu próxima compra tecnológica empieza con confianza."
          </p>
        </div>
      </section>

      <footer className="bg-footer px-4 sm:px-6 py-10 sm:py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-left mb-8 sm:mb-10">
          <div className="col-span-2 lg:col-span-1">
            <img src="/logo.png" alt="Helena Store" className="w-16 h-16 mb-3 object-contain" />
            <p className="text-[11px] sm:text-xs opacity-70 leading-relaxed">Tecnología premium desde 2018. Más de 10.000 ventas. Santa Cruz, Argentina.</p>
          </div>
          <div>
            <h4 className="font-serif text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 text-gold">Tienda</h4>
            <Link href="/categoria/celulares" className="block text-[11px] sm:text-xs opacity-70 hover:opacity-100 hover:text-gold mb-2 transition-all">Celulares</Link>
            <Link href="/categoria/accesorios" className="block text-[11px] sm:text-xs opacity-70 hover:opacity-100 hover:text-gold mb-2 transition-all">Accesorios</Link>
            <Link href="/categoria/hogar" className="block text-[11px] sm:text-xs opacity-70 hover:opacity-100 hover:text-gold mb-2 transition-all">Hogar</Link>
            <Link href="/categoria/otros" className="block text-[11px] sm:text-xs opacity-70 hover:opacity-100 hover:text-gold transition-all">Otros</Link>
          </div>
          <div>
            <h4 className="font-serif text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 text-gold">Contacto</h4>
            <a href="https://wa.me/5492966210440" target="_blank" className="block text-[11px] sm:text-xs opacity-70 hover:opacity-100 hover:text-gold mb-2 transition-all">WhatsApp · 2966 210440</a>
            <a href="https://www.instagram.com/helenastore09/" target="_blank" className="block text-[11px] sm:text-xs opacity-70 hover:opacity-100 hover:text-gold mb-2 transition-all">Instagram · @helenastore09</a>
            <a href="#" target="_blank" className="block text-[11px] sm:text-xs opacity-70 hover:opacity-100 hover:text-gold transition-all">Facebook · Helena Store</a>
          </div>
          <div>
            <h4 className="font-serif text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 text-gold">Local</h4>
            <p className="text-[11px] sm:text-xs opacity-70 mb-2">9 de Julio 580</p>
            <p className="text-[11px] sm:text-xs opacity-70 mb-2">Puerto Santa Cruz</p>
            <p className="text-[11px] sm:text-xs opacity-70">Santa Cruz, Argentina</p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto pt-6 sm:pt-8 border-t border-gold/20 text-center text-[10px] sm:text-[11px] tracking-[0.2em] uppercase opacity-50">
          © 2026 Helena Store · Todos los derechos reservados
        </div>
      </footer>
    </main>
  );
}

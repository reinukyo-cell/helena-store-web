import { supabase } from "@/lib/supabase";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";
import { formatARS } from "@/lib/price";

export const revalidate = 30;

const CATEGORIAS: Record<string, { titulo: string; subtitulo: string }> = {
  celulares: { titulo: "Celulares", subtitulo: "iPhone, Samsung, Xiaomi y más" },
  accesorios: { titulo: "Accesorios", subtitulo: "Fundas, cables, cargadores" },
  hogar: { titulo: "Hogar", subtitulo: "Electrodomésticos y selecciones" },
  otros: { titulo: "Otros", subtitulo: "Piezas únicas y esotéricos" },
};

async function getProducts(slug: string) {
  const { data } = await supabase.from("products").select("*").eq("status", "disponible").gt("quantity", 0).order("brand", { ascending: true });
  const products = data || [];
  if (slug === "celulares") return products.filter((p: any) => !["Accesorios", "Hogar", "Otros", "Esotéricos"].includes(p.brand));
  if (slug === "accesorios") return products.filter((p: any) => p.brand === "Accesorios");
  if (slug === "hogar") return products.filter((p: any) => p.brand === "Hogar");
  if (slug === "otros") return products.filter((p: any) => p.brand === "Otros" || p.brand === "Esotéricos");
  return [];
}

export default async function CategoriaPage({ params, searchParams }: { params: { slug: string }; searchParams: { marca?: string; orden?: string } }) {
  const cat = CATEGORIAS[params.slug];
  if (!cat) notFound();
  let products = await getProducts(params.slug);
  const marcasDisponibles = Array.from(new Set(products.map((p: any) => p.brand).filter(Boolean))).sort() as string[];
  if (searchParams.marca) {
    if (searchParams.marca === "Otros" && params.slug === "celulares") {
      const principales = ["iPhone", "Samsung", "Xiaomi", "Motorola"];
      products = products.filter((p: any) => !principales.includes(p.brand));
    } else {
      products = products.filter((p: any) => p.brand === searchParams.marca);
    }
  }
  if (searchParams.orden === "precio-asc") products = [...products].sort((a: any, b: any) => a.sale_price - b.sale_price);
  else if (searchParams.orden === "precio-desc") products = [...products].sort((a: any, b: any) => b.sale_price - a.sale_price);
  const marcasFiltro = params.slug === "celulares" ? ["iPhone", "Samsung", "Xiaomi", "Motorola", "Otros"] : marcasDisponibles;

  return (
    <main className="min-h-screen overflow-x-hidden">
      <ThemeToggle />
      <header className="px-4 sm:px-6 pt-8 sm:pt-10 pb-5 text-center"><Link href="/"><img src="/logo.png" alt="Helena Store" className="w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-2 object-contain" /></Link><p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase opacity-60">Premium · Santa Cruz, Argentina</p></header>
      <Navbar />
      <section className="py-10 sm:py-14 px-4 sm:px-6 text-center max-w-5xl mx-auto"><p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold mb-3">Catálogo</p><h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal mb-3">{cat.titulo}</h1><p className="text-sm sm:text-base opacity-70">{cat.subtitulo}</p></section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
        <div className="flex flex-wrap gap-2 sm:gap-3 items-center justify-center mb-4">
          {params.slug === "celulares" && (<><Link href={`/categoria/${params.slug}`} className={`px-4 py-2 text-[10px] sm:text-xs tracking-[0.2em] uppercase border transition-all ${!searchParams.marca ? "bg-gold text-black border-gold" : "border-theme hover:border-gold"}`}>Todas</Link>{marcasFiltro.map((m) => (<Link key={m} href={`/categoria/${params.slug}?marca=${encodeURIComponent(m)}`} className={`px-4 py-2 text-[10px] sm:text-xs tracking-[0.2em] uppercase border transition-all ${searchParams.marca === m ? "bg-gold text-black border-gold" : "border-theme hover:border-gold"}`}>{m}</Link>))}</>)}
        </div>
        <div className="flex justify-center gap-2 sm:gap-3 mb-8">
          <Link href={`/categoria/${params.slug}${searchParams.marca ? `?marca=${searchParams.marca}` : ""}`} className={`px-3 py-1.5 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase border transition-all ${!searchParams.orden ? "bg-soft border-gold" : "border-theme hover:border-gold"}`}>Relevancia</Link>
          <Link href={`/categoria/${params.slug}?${searchParams.marca ? `marca=${searchParams.marca}&` : ""}orden=precio-asc`} className={`px-3 py-1.5 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase border transition-all ${searchParams.orden === "precio-asc" ? "bg-soft border-gold" : "border-theme hover:border-gold"}`}>Precio ↑</Link>
          <Link href={`/categoria/${params.slug}?${searchParams.marca ? `marca=${searchParams.marca}&` : ""}orden=precio-desc`} className={`px-3 py-1.5 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase border transition-all ${searchParams.orden === "precio-desc" ? "bg-soft border-gold" : "border-theme hover:border-gold"}`}>Precio ↓</Link>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        {products.length === 0 ? (
          <div className="text-center py-20"><p className="font-serif text-2xl mb-3">Sin productos disponibles</p><p className="text-sm opacity-60 mb-6">Probá con otra marca o categoría.</p><Link href="/" className="inline-block px-7 py-3 border border-current text-[10px] sm:text-xs tracking-[0.2em] uppercase hover:bg-gold hover:border-gold hover:text-black transition-all">Volver al inicio</Link></div>
        ) : (<>
          <p className="text-center text-[10px] sm:text-xs tracking-[0.2em] uppercase opacity-50 mb-6">{products.length} {products.length === 1 ? "producto" : "productos"}</p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {products.map((p: any) => {
              const images = Array.isArray(p.images) ? p.images : [];
              const img = images[0];
              return (
                <Link key={p.id} href={`/producto/${p.id}`} className="border border-theme hover:border-gold transition-all hover:-translate-y-1 overflow-hidden relative">
                  {p.quantity === 1 && (<span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-1 text-[8px] sm:text-[9px] tracking-[0.2em] uppercase bg-gold text-black font-medium z-10">Última unidad</span>)}
                  {p.condition === "nuevo" && p.quantity > 1 && (<span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-1 text-[8px] sm:text-[9px] tracking-[0.2em] uppercase bg-gold text-black font-medium z-10">Nuevo</span>)}
                  <div className="aspect-square bg-soft flex items-center justify-center overflow-hidden">{img ? (<img src={img} alt="" className="w-full h-full object-cover" />) : (<span className="text-[10px] sm:text-xs tracking-widest opacity-40">SIN FOTO</span>)}</div>
                  <div className="p-3 sm:p-5 border-t border-theme">
                    <p className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-gold mb-1">{p.brand}</p>
                    <h3 className="font-serif text-base sm:text-lg font-medium mb-1">{p.model}</h3>
                    <p className="text-[10px] sm:text-xs opacity-60 mb-2 sm:mb-3 line-clamp-1">{[p.color, p.storage, p.condition].filter(Boolean).join(" · ")}</p>
                    <p className="text-lg sm:text-xl text-gold">${formatARS(p.sale_price)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </>)}
      </section>
      <footer className="bg-footer px-4 sm:px-6 py-10 sm:py-12 mt-10"><div className="max-w-5xl mx-auto text-center"><Link href="/" className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-gold hover:opacity-70 transition-all">← Volver al inicio</Link><p className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase opacity-50 mt-6">© 2026 Helena Store</p></div></footer>
    </main>
  );
}

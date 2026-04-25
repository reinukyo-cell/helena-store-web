import { supabase } from "@/lib/supabase";
import Link from "next/link";
import AddToCart from "@/components/AddToCart";
import ThemeToggle from "@/components/ThemeToggle";
import { formatARS } from "@/lib/price";

export const revalidate = 30;

async function getProduct(id: string) {
  const { data } = await supabase.from("products").select("*").eq("id", id).single();
  return data;
}

const WHATSAPP = "5492966210440";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const p = await getProduct(params.id);
  if (!p) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <ThemeToggle />
        <p className="opacity-60">Producto no encontrado.</p>
      </main>
    );
  }

  const images: string[] = Array.isArray(p.images) ? p.images : [];
  const msg = encodeURIComponent(
    `Hola! Me interesa el ${p.brand} ${p.model} de $${formatARS(p.sale_price)}. Está disponible?`
  );
  const waUrl = `https://wa.me/${WHATSAPP}?text=${msg}`;

  return (
    <main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12 max-w-5xl mx-auto">
      <ThemeToggle />
      <Link href="/" className="text-[10px] sm:text-xs tracking-[0.25em] uppercase opacity-60 hover:text-gold transition-colors">← Volver</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mt-6 sm:mt-8">
        <div>
          {images.length > 0 ? (
            <>
              <div className="aspect-square bg-soft mb-3 overflow-hidden"><img src={images[0]} alt={`${p.brand} ${p.model}`} className="w-full h-full object-cover" /></div>
              {images.length > 1 && (<div className="grid grid-cols-4 gap-2">{images.slice(1, 5).map((img, i) => (<div key={i} className="aspect-square bg-soft overflow-hidden"><img src={img} alt="" className="w-full h-full object-cover" /></div>))}</div>)}
            </>
          ) : (
            <div className="aspect-square bg-soft flex items-center justify-center"><span className="text-xs tracking-widest opacity-40">SIN FOTO</span></div>
          )}
        </div>
        <div>
          <p className="text-[10px] sm:text-xs tracking-[0.3em] text-gold uppercase mb-2">{p.brand}</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium mb-4 leading-tight">{p.model}</h1>
          <p className="text-xs sm:text-sm opacity-65 mb-6 tracking-wide">{[p.color, p.storage, p.condition].filter(Boolean).join(" · ")}</p>
          <p className="font-serif text-3xl sm:text-4xl text-gold mb-8">${formatARS(p.sale_price)}</p>
          {p.notes && <p className="text-xs sm:text-sm opacity-70 mb-8 leading-relaxed">{p.notes}</p>}
          <div className="space-y-3">
            <a href={waUrl} target="_blank" className="block w-full text-center py-4 bg-gold text-black hover:opacity-90 transition-all tracking-[0.2em] text-[10px] sm:text-xs uppercase font-medium">Consultar por WhatsApp</a>
            <AddToCart product={{ id: p.id, brand: p.brand, model: p.model, sale_price: p.sale_price, image: images[0] || "" }} />
          </div>
          <p className="text-[10px] sm:text-xs opacity-50 mt-6 tracking-[0.2em] uppercase">Stock disponible: {p.quantity}</p>
        </div>
      </div>
    </main>
  );
}

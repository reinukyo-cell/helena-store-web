import { supabase } from "@/lib/supabase";
import Link from "next/link";
import AddToCart from "@/components/AddToCart";

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
        <p className="text-gray-500">Producto no encontrado.</p>
      </main>
    );
  }

  const images: string[] = Array.isArray(p.images) ? p.images : [];
  const msg = encodeURIComponent(
    `Hola! Me interesa el ${p.brand} ${p.model} de $${Math.round(p.sale_price)} USD. ¿Esta disponible?`
  );
  const waUrl = `https://wa.me/${WHATSAPP}?text=${msg}`;

  return (
    <main className="min-h-screen px-6 py-12 max-w-5xl mx-auto">
      <Link href="/" className="text-xs text-gray-500 hover:text-gold tracking-widest">
        ← VOLVER
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
        <div>
          {images.length > 0 ? (
            <>
              <div className="aspect-square bg-gray-900 mb-3 overflow-hidden">
                <img src={images[0]} alt={`${p.brand} ${p.model}`} className="w-full h-full object-cover" />
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.slice(1, 5).map((img, i) => (
                    <div key={i} className="aspect-square bg-gray-900 overflow-hidden">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="aspect-square bg-gray-900 flex items-center justify-center">
              <span className="text-gray-700 text-xs tracking-widest">SIN FOTO</span>
            </div>
          )}
        </div>

        <div>
          <p className="text-xs tracking-widest text-gold uppercase mb-2">{p.brand}</p>
          <h1 className="text-4xl font-light mb-4">{p.model}</h1>
          <p className="text-sm text-gray-400 mb-6">
            {[p.color, p.storage, p.condition].filter(Boolean).join(" · ")}
          </p>
          <p className="text-4xl font-light text-gold mb-8">
            ${Math.round(p.sale_price)} USD
          </p>

          {p.notes && <p className="text-sm text-gray-500 mb-8">{p.notes}</p>}

          <div className="space-y-3">
            
              href={waUrl}
              target="_blank"
              className="block w-full text-center py-4 bg-green-700 hover:bg-green-600 transition-colors tracking-wider text-sm"
            >
              CONSULTAR POR WHATSAPP
            </a>
            <AddToCart product={{ id: p.id, brand: p.brand, model: p.model, sale_price: p.sale_price, image: images[0] || "" }} />
          </div>

          <p className="text-xs text-gray-600 mt-6 tracking-wider">
            Stock disponible: {p.quantity}
          </p>
        </div>
      </div>
    </main>
  );
}

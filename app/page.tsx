import { supabase } from "@/lib/supabase";

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

  const categories: Record<string, any[]> = {};
  products.forEach((p: any) => {
    const cat = ["Accesorios", "Esotéricos", "Otros"].includes(p.brand)
      ? p.brand
      : "Celulares";
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(p);
  });

  return (
    <main className="min-h-screen px-6 py-12 max-w-6xl mx-auto">
      <header className="mb-16 text-center">
        <h1 className="text-5xl font-light tracking-wider mb-2">HELENA STORE</h1>
        <p className="text-sm text-gray-500 tracking-widest uppercase">
          Premium · Santa Cruz, Argentina
        </p>
      </header>

      {Object.keys(categories).length === 0 && (
        <p className="text-center text-gray-500">No hay productos disponibles.</p>
      )}

      {Object.entries(categories).map(([cat, items]) => (
        <section key={cat} className="mb-16">
          <h2 className="text-xs tracking-widest uppercase text-gold mb-6 border-b border-gray-800 pb-2">
            {cat}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((p: any) => (
              <div
                key={p.id}
                className="border border-gray-800 p-6 hover:border-gold transition-colors"
              >
                <h3 className="text-lg font-light mb-1">
                  {p.brand} {p.model}
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  {[p.color, p.storage, p.condition].filter(Boolean).join(" · ")}
                </p>
                <p className="text-2xl font-light text-gold">
                  ${Math.round(p.sale_price)} USD
                </p>
                {p.quantity > 1 && (
                  <p className="text-xs text-gray-600 mt-2">
                    Stock: {p.quantity}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <footer className="mt-20 text-center text-xs text-gray-600 tracking-widest">
        Consultas por Instagram · WhatsApp
      </footer>
    </main>
  );
}

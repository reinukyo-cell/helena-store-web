import { supabase } from "@/lib/supabase";

const BASE_URL = "https://helena-store-web.vercel.app";

export default async function sitemap() {
  const { data: products } = await supabase
    .from("products")
    .select("id, date_added")
    .eq("status", "disponible")
    .gt("quantity", 0);

  const productPages = (products || []).map((p) => ({
    url: `${BASE_URL}/producto/${p.id}`,
    lastModified: p.date_added || new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const categorias = ["celulares", "accesorios", "hogar", "otros"];
  const catPages = categorias.map((c) => ({
    url: `${BASE_URL}/categoria/${c}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    ...catPages,
    ...productPages,
  ];
}

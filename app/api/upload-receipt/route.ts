import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `receipt_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;

    const { error } = await supabase.storage
      .from("receipts")
      .upload(filename, buffer, { contentType: file.type });

    if (error) {
      // Si bucket no existe lo intentamos con products
      const { error: err2 } = await supabase.storage
        .from("products")
        .upload(filename, buffer, { contentType: file.type });
      if (err2) throw err2;
      const { data: pub } = supabase.storage.from("products").getPublicUrl(filename);
      return NextResponse.json({ url: pub.publicUrl });
    }

    const { data } = supabase.storage.from("receipts").getPublicUrl(filename);
    return NextResponse.json({ url: data.publicUrl });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_IDS = (process.env.TELEGRAM_CHAT_ID || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("orders")
      .insert([{
        customer_name: body.customer_name,
        customer_phone: body.customer_phone,
        customer_address: body.customer_address || "",
        items: body.items,
        total: body.total,
        payment_method: body.payment_method,
        notes: body.notes || "",
        source: "web",
      }])
      .select()
      .single();

    if (error) throw error;

    const itemsText = body.items
      .map((i: any) => `• ${i.brand} ${i.model} x${i.qty} — $${Math.round(i.sale_price * i.qty)}`)
      .join("\n");

    const msg =
      `🛒 *NUEVO PEDIDO WEB* #${data.id}\n\n` +
      `👤 ${body.customer_name}\n` +
      `📱 ${body.customer_phone}\n` +
      (body.customer_address ? `📍 ${body.customer_address}\n` : "") +
      `💳 ${body.payment_method}\n\n` +
      `${itemsText}\n\n` +
      `*TOTAL: $${Math.round(body.total)} USD*` +
      (body.notes ? `\n\n📝 ${body.notes}` : "");

    await Promise.all(
      CHAT_IDS.map((chatId) =>
        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: msg,
            parse_mode: "Markdown",
          }),
        })
      )
    );

    return NextResponse.json({ ok: true, id: data.id });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

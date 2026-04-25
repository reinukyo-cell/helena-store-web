"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

type CartItem = {
  id: number;
  brand: string;
  model: string;
  sale_price: number;
  image: string;
  qty: number;
};

const WHATSAPP = "5492966210440";

function fmtARS(n: number) {
  return Math.round(n).toLocaleString("es-AR");
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState("transferencia");
  const [receipt, setReceipt] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string>("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  useEffect(() => {
    const c = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(c);
  }, []);

  const total = cart.reduce((a, b) => a + b.sale_price * b.qty, 0);

  const remove = (id: number) => {
    const c = cart.filter((x) => x.id !== id);
    setCart(c);
    localStorage.setItem("cart", JSON.stringify(c));
  };

  const handleReceipt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setReceipt(f);
    setReceiptPreview(URL.createObjectURL(f));
  };

  const submit = async () => {
    if (!name || !phone) {
      alert("Nombre y teléfono son obligatorios.");
      return;
    }
    setSending(true);

    let receipt_url = "";
    if (receipt) {
      try {
        const fd = new FormData();
        fd.append("file", receipt);
        const up = await fetch("/api/upload-receipt", { method: "POST", body: fd });
        const d = await up.json();
        receipt_url = d.url || "";
      } catch {
        // sigue sin comprobante
      }
    }

    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: name,
        customer_phone: phone,
        customer_address: address,
        notes,
        payment_method: payment,
        items: cart,
        total,
        receipt_url,
      }),
    });
    setSending(false);
    if (res.ok) {
      const d = await res.json();
      setOrderId(d.id);
      localStorage.removeItem("cart");
      setCart([]);
      setDone(true);
    } else {
      alert("Error enviando pedido.");
    }
  };

  if (done) {
    const msg = encodeURIComponent(
      `Hola! Hice el pedido #${orderId || ""} por la web. Adjunto comprobante de pago.`
    );
    return (
      <main className="min-h-screen flex items-center justify-center px-4 sm:px-6">
        <ThemeToggle />
        <div className="text-center max-w-md">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold mb-4">Gracias</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium mb-4">Pedido recibido</h1>
          <p className="opacity-70 mb-6 text-sm sm:text-base">
            Recibimos tu pedido {orderId ? `#${orderId}` : ""}. Te contactamos por WhatsApp para confirmar y coordinar la entrega.
          </p>
          <a href={`https://wa.me/${WHATSAPP}?text=${msg}`} target="_blank" className="inline-block px-7 sm:px-9 py-3 sm:py-3.5 bg-gold text-black text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-4 hover:opacity-90 transition-all">Enviar comprobante por WhatsApp</a>
          <div><Link href="/" className="inline-block px-7 sm:px-9 py-3 sm:py-3.5 border border-current text-[10px] sm:text-xs tracking-[0.2em] uppercase hover:bg-gold hover:border-gold hover:text-black transition-all mt-2">Volver al catálogo</Link></div>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 sm:px-6">
        <ThemeToggle />
        <div className="text-center">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold mb-4">Carrito</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium mb-4">Tu carrito está vacío</h1>
          <Link href="/" className="inline-block px-7 sm:px-9 py-3 sm:py-3.5 border border-current text-[10px] sm:text-xs tracking-[0.2em] uppercase hover:bg-gold hover:border-gold hover:text-black transition-all mt-4">Ver catálogo</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12 max-w-4xl mx-auto">
      <ThemeToggle />
      <Link href="/" className="text-[10px] sm:text-xs tracking-[0.25em] uppercase opacity-60 hover:text-gold transition-colors">← Volver</Link>
      <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold mt-6 sm:mt-8 mb-2">Tu pedido</p>
      <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium mb-8 sm:mb-10">Checkout</h1>

      <div className="space-y-3 mb-10">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-3 sm:gap-4 border border-theme p-3 sm:p-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-soft flex-shrink-0 overflow-hidden">{item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}</div>
            <div className="flex-1 min-w-0">
              <p className="font-serif text-sm sm:text-base truncate">{item.brand} {item.model}</p>
              <p className="text-[10px] sm:text-xs opacity-60">Cantidad: {item.qty}</p>
            </div>
            <p className="text-gold text-sm sm:text-base whitespace-nowrap">${fmtARS(item.sale_price * item.qty)}</p>
            <button onClick={() => remove(item.id)} className="opacity-60 hover:text-red-500 text-[9px] sm:text-xs tracking-[0.2em] uppercase">Quitar</button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center font-serif text-xl sm:text-2xl mb-10 border-t border-theme pt-4 sm:pt-6">
        <span className="tracking-[0.2em] uppercase text-xs sm:text-sm">Total</span>
        <span className="text-gold text-2xl sm:text-3xl">${fmtARS(total)}</span>
      </div>

      <div className="space-y-4 mb-8">
        <input placeholder="Tu nombre *" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent border border-theme px-4 py-3 focus:border-gold outline-none transition-colors text-sm" />
        <input placeholder="WhatsApp *" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-transparent border border-theme px-4 py-3 focus:border-gold outline-none transition-colors text-sm" />
        <input placeholder="Dirección (opcional)" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-transparent border border-theme px-4 py-3 focus:border-gold outline-none transition-colors text-sm" />
      </div>

      <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold mb-4">Método de pago</p>
      <div className="grid grid-cols-3 gap-2 mb-6">
        {[{ v: "transferencia", l: "Transferencia" }, { v: "cripto", l: "Cripto" }, { v: "naranjax", l: "Naranja X" }].map((p) => (
          <button key={p.v} onClick={() => setPayment(p.v)} className={`py-3 text-[10px] sm:text-xs tracking-[0.2em] uppercase border transition-all ${payment === p.v ? "bg-gold text-black border-gold" : "border-theme hover:border-gold"}`}>{p.l}</button>
        ))}
      </div>

      {payment === "transferencia" && (
        <div className="border border-theme p-4 sm:p-5 mb-6 text-xs sm:text-sm space-y-1 opacity-90">
          <p className="font-serif text-base text-gold mb-2">Datos de transferencia</p>
          <p><span className="opacity-60">CBU:</span> 4530000800013865417568</p>
          <p><span className="opacity-60">Alias:</span> HARMENGOL.NX.ARS</p>
          <p><span className="opacity-60">Caja de ahorro:</span> 1386541756</p>
          <p><span className="opacity-60">Titular:</span> Helena Geovana Armengol</p>
          <p><span className="opacity-60">CUIL:</span> 27437085469</p>
        </div>
      )}

      {payment === "cripto" && (
        <div className="border border-theme p-4 sm:p-5 mb-6 text-xs sm:text-sm space-y-3 opacity-90">
          <p className="font-serif text-base text-gold">Pago con Cripto · USDT TRC20</p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <img src="/qr-usdt.png" alt="QR USDT TRC20" className="w-36 h-36 sm:w-44 sm:h-44 bg-white p-2" />
            <div className="flex-1 space-y-2">
              <p className="opacity-60 text-[11px]">Red: <span className="text-gold">TRC20 (Tron)</span></p>
              <p className="opacity-60 text-[11px]">Dirección:</p>
              <p className="break-all select-all text-[11px] sm:text-xs font-mono bg-black/20 p-2">TBnHKWDPgPYtMA5pT3LcvNcg3pk9VNTpJW</p>
              <p className="opacity-60 text-[10px]">Verificá que la red sea TRC20 antes de enviar.</p>
            </div>
          </div>
        </div>
      )}

      {payment === "naranjax" && (
        <div className="border border-theme p-4 sm:p-5 mb-6 text-xs sm:text-sm opacity-90">
          <p className="font-serif text-base text-gold mb-2">Naranja X</p>
          <p>Pagá a través de Naranja X al alias <span className="text-gold">HARMENGOL.NX.ARS</span> y adjuntá el comprobante.</p>
        </div>
      )}

      <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold mb-3">Comprobante de pago</p>
      <label className="block w-full border border-dashed border-gold/50 p-6 text-center cursor-pointer hover:bg-gold/5 transition-all mb-6">
        <input type="file" accept="image/*" onChange={handleReceipt} className="hidden" />
        {receiptPreview ? (<img src={receiptPreview} alt="" className="max-h-48 mx-auto" />) : (<p className="text-xs sm:text-sm opacity-70">Adjuntar foto del comprobante<br /><span className="opacity-50 text-[10px]">(se enviará automáticamente a la tienda)</span></p>)}
      </label>

      <textarea placeholder="Notas (opcional)" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="w-full bg-transparent border border-theme px-4 py-3 focus:border-gold outline-none transition-colors text-sm mb-6" />

      <button onClick={submit} disabled={sending} className="w-full py-4 bg-gold text-black hover:opacity-90 transition-all tracking-[0.2em] text-[10px] sm:text-xs uppercase font-medium disabled:opacity-50">
        {sending ? "Enviando..." : "Confirmar pedido"}
      </button>
    </main>
  );
}

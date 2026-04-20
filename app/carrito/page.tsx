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

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState("transferencia");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

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

  const submit = async () => {
    if (!name || !phone) {
      alert("Nombre y teléfono son obligatorios.");
      return;
    }
    setSending(true);
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
      }),
    });
    setSending(false);
    if (res.ok) {
      localStorage.removeItem("cart");
      setCart([]);
      setDone(true);
    } else {
      alert("Error enviando pedido.");
    }
  };

  if (done) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 sm:px-6">
        <ThemeToggle />
        <div className="text-center">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold mb-4">Gracias</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium mb-4">Pedido recibido</h1>
          <p className="opacity-70 mb-8 text-sm sm:text-base">Te contactaremos por WhatsApp a la brevedad.</p>
          <Link href="/" className="inline-block px-7 sm:px-9 py-3 sm:py-3.5 border border-current text-[10px] sm:text-xs tracking-[0.2em] uppercase hover:bg-gold hover:border-gold hover:text-black transition-all">
            Volver al catálogo
          </Link>
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
          <Link href="/" className="inline-block px-7 sm:px-9 py-3 sm:py-3.5 border border-current text-[10px] sm:text-xs tracking-[0.2em] uppercase hover:bg-gold hover:border-gold hover:text-black transition-all mt-4">
            Ver catálogo
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12 max-w-4xl mx-auto">
      <ThemeToggle />

      <Link href="/" className="text-[10px] sm:text-xs tracking-[0.25em] uppercase opacity-60 hover:text-gold transition-colors">
        ← Volver
      </Link>

      <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold mt-6 sm:mt-8 mb-2">Tu pedido</p>
      <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium mb-8 sm:mb-10">Checkout</h1>

      <div className="space-y-3 mb-10">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-3 sm:gap-4 border border-theme p-3 sm:p-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-soft flex-shrink-0 overflow-hidden">
              {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-serif text-sm sm:text-base truncate">{item.brand} {item.model}</p>
              <p className="text-[10px] sm:text-xs opacity-60">Cantidad: {item.qty}</p>
            </div>
            <p className="text-gold text-sm sm:text-base whitespace-nowrap">${Math.round(item.sale_price * item.qty)}</p>
            <button onClick={() => remove(item.id)} className="opacity-60 hover:text-red-500 text-[9px] sm:text-xs tracking-[0.2em] uppercase">
              Quitar
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center font-serif text-xl sm:text-2xl mb-10 border-t border-theme pt-4 sm:pt-6">
        <span className="tracking-[0.2em] uppercase text-xs sm:text-sm">Total</span>
        <span className="text-gold text-2xl sm:text-3xl">${Math.round(total)} USD</span>
      </div>

      <div className="space-y-4 mb-8">
        <input
          placeholder="Tu nombre *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-transparent border border-theme px-4 py-3 focus:border-gold outline-none transition-colors text-sm"
        />
        <input
          placeholder="WhatsApp *"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-transparent border border-theme px-4 py-3 focus:border-gold outline-none transition-colors text-sm"
        />
        <input
          placeholder="Dirección (opcional)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full bg-transparent border border-theme px-4 py-3 focus:border-gold outline-none transition-colors text-sm"
        />
        <select
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          className="w-full bg-soft border border-theme px-4 py-3 focus:border-gold outline-none transition-colors text-sm"
        >
          <option value="transferencia">Transferencia bancaria</option>
          <option value="efectivo">Efectivo</option>
          <option value="mercadopago">MercadoPago</option>
        </select>
        <textarea
          placeholder="Notas (opcional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full bg-transparent border border-theme px-4 py-3 focus:border-gold outline-none transition-colors text-sm"
        />
      </div>

      <button
        onClick={submit}
        disabled={sending}
        className="w-full py-4 bg-gold text-black hover:opacity-90 transition-all tracking-[0.2em] text-[10px] sm:text-xs uppercase font-medium disabled:opacity-50"
      >
        {sending ? "Enviando..." : "Confirmar pedido"}
      </button>
    </main>
  );
}

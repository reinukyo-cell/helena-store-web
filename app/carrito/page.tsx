"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

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
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-light mb-4">PEDIDO RECIBIDO</h1>
          <p className="text-gray-500 mb-8">Te contactaremos por WhatsApp a la brevedad.</p>
          <Link href="/" className="text-gold tracking-widest text-sm">VOLVER AL CATALOGO</Link>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-gray-500 mb-8">Tu carrito esta vacio.</p>
          <Link href="/" className="text-gold tracking-widest text-sm">VER CATALOGO</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-12 max-w-4xl mx-auto">
      <Link href="/" className="text-xs text-gray-500 hover:text-gold tracking-widest">← VOLVER</Link>
      <h1 className="text-3xl font-light mt-6 mb-8">TU PEDIDO</h1>

      <div className="space-y-3 mb-10">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border border-gray-800 p-4">
            <div className="w-20 h-20 bg-gray-900 flex-shrink-0 overflow-hidden">
              {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1">
              <p className="font-light">{item.brand} {item.model}</p>
              <p className="text-sm text-gray-500">Cantidad: {item.qty}</p>
            </div>
            <p className="text-gold">${Math.round(item.sale_price * item.qty)}</p>
            <button onClick={() => remove(item.id)} className="text-gray-600 hover:text-red-500 text-xs">
              QUITAR
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-2xl font-light mb-10 border-t border-gray-800 pt-4">
        <span>TOTAL</span>
        <span className="text-gold">${Math.round(total)} USD</span>
      </div>

      <div className="space-y-4 mb-8">
        <input
          placeholder="Tu nombre *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-transparent border border-gray-800 px-4 py-3 focus:border-gold outline-none"
        />
        <input
          placeholder="WhatsApp *"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-transparent border border-gray-800 px-4 py-3 focus:border-gold outline-none"
        />
        <input
          placeholder="Direccion (opcional)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full bg-transparent border border-gray-800 px-4 py-3 focus:border-gold outline-none"
        />
        <select
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          className="w-full bg-black border border-gray-800 px-4 py-3 focus:border-gold outline-none"
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
          className="w-full bg-transparent border border-gray-800 px-4 py-3 focus:border-gold outline-none"
        />
      </div>

      <button
        onClick={submit}
        disabled={sending}
        className="w-full py-4 bg-gold text-black hover:bg-yellow-600 transition-colors tracking-widest text-sm disabled:opacity-50"
      >
        {sending ? "ENVIANDO..." : "CONFIRMAR PEDIDO"}
      </button>
    </main>
  );
}

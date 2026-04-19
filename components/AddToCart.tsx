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

export default function AddToCart({ product }: { product: any }) {
  const [added, setAdded] = useState(false);

  const add = () => {
    if (typeof window === "undefined") return;
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((c) => c.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    window.dispatchEvent(new Event("cart-updated"));
  };

  return (
    <button
      onClick={add}
      className="block w-full text-center py-4 border border-gold text-gold hover:bg-gold hover:text-black transition-colors tracking-wider text-sm"
    >
      {added ? "✓ AGREGADO AL CARRITO" : "AGREGAR AL CARRITO"}
    </button>
  );
}

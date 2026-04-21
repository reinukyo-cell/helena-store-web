"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const marcas = ["iPhone", "Samsung", "Xiaomi", "Motorola", "Otros"];

  return (
    <nav className="border-y border-theme mt-6 sm:mt-8 relative">
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-10 px-4 sm:px-6 py-4 sm:py-5">
        <div
          className="relative"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-[10px] sm:text-xs tracking-[0.25em] uppercase hover:text-gold transition-colors flex items-center gap-1"
          >
            Celulares
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            className={`${
              open || mobileOpen ? "block" : "hidden"
            } absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[180px] bg-soft border border-theme shadow-xl z-50`}
          >
            <Link
              href="/categoria/celulares"
              onClick={() => setMobileOpen(false)}
              className="block px-5 py-3 text-[10px] sm:text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-black transition-all border-b border-theme"
            >
              Ver todos
            </Link>
            {marcas.map((m) => (
              <Link
                key={m}
                href={`/categoria/celulares?marca=${encodeURIComponent(m)}`}
                onClick={() => setMobileOpen(false)}
                className="block px-5 py-2.5 text-[10px] sm:text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-black transition-all"
              >
                {m}
              </Link>
            ))}
          </div>
        </div>

        <Link href="/categoria/accesorios" className="text-[10px] sm:text-xs tracking-[0.25em] uppercase hover:text-gold transition-colors">
          Accesorios
        </Link>
        <Link href="/categoria/hogar" className="text-[10px] sm:text-xs tracking-[0.25em] uppercase hover:text-gold transition-colors">
          Hogar
        </Link>
        <Link href="/categoria/otros" className="text-[10px] sm:text-xs tracking-[0.25em] uppercase hover:text-gold transition-colors">
          Otros
        </Link>
        <Link href="/#sobre" className="text-[10px] sm:text-xs tracking-[0.25em] uppercase hover:text-gold transition-colors">
          Nosotros
        </Link>
      </div>
    </nav>
  );
}

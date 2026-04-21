"use client";
import Link from "next/link";
import { useState, useRef } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<any>(null);

  const marcas = ["iPhone", "Samsung", "Xiaomi", "Motorola", "Otros"];

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <nav className="border-y border-theme mt-6 sm:mt-8 relative">
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-10 px-4 sm:px-6 py-4 sm:py-5">
        <Link href="/" className="text-[10px] sm:text-xs tracking-[0.25em] uppercase hover:text-gold transition-colors flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Home
        </Link>

        <div
          className="relative"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <Link
            href="/categoria/celulares"
            className="text-[10px] sm:text-xs tracking-[0.25em] uppercase hover:text-gold transition-colors flex items-center gap-1"
          >
            Celulares
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </Link>

          {open && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
              <div className="min-w-[180px] bg-soft border border-theme shadow-xl">
                <Link
                  href="/categoria/celulares"
                  className="block px-5 py-3 text-[10px] sm:text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-black transition-all border-b border-theme"
                >
                  Ver todos
                </Link>
                {marcas.map((m) => (
                  <Link
                    key={m}
                    href={`/categoria/celulares?marca=${encodeURIComponent(m)}`}
                    className="block px-5 py-2.5 text-[10px] sm:text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-black transition-all"
                  >
                    {m}
                  </Link>
                ))}
              </div>
            </div>
          )}
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

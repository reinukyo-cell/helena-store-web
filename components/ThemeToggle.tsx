"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "light" | "dark") || "dark";
    setTheme(saved);
    document.documentElement.classList.toggle("theme-light", saved === "light");
  }, []);

  const change = (t: "light" | "dark") => {
    setTheme(t);
    localStorage.setItem("theme", t);
    document.documentElement.classList.toggle("theme-light", t === "light");
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex gap-2 p-1.5 rounded-full backdrop-blur-md bg-white/10">
      <button
        onClick={() => change("light")}
        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all ${
          theme === "light" ? "bg-gold text-black" : "text-current"
        }`}
        title="Claro"
      >
        ☀
      </button>
      <button
        onClick={() => change("dark")}
        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all ${
          theme === "dark" ? "bg-gold text-black" : "text-current"
        }`}
        title="Oscuro"
      >
        ☾
      </button>
    </div>
  );
}

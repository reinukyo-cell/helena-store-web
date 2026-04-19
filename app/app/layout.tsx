import "./globals.css";

export const metadata = {
  title: "Helena Store",
  description: "Tienda premium de celulares y accesorios",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

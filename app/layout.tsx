import "./globals.css";
import FloatingButtons from "@/components/FloatingButtons";

export const metadata = {
  title: "Helena Store",
  description: "Tienda premium de celulares, accesorios y selecciones para el hogar",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
        <FloatingButtons />
      </body>
    </html>
  );
}

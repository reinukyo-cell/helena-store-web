import "./globals.css";
import FloatingButtons from "@/components/FloatingButtons";

const BASE_URL = "https://helena-store-web.vercel.app";

export const metadata = {
  title: {
    default: "Helena Store | Celulares, Accesorios y Hogar · Santa Cruz, Argentina",
    template: "%s | Helena Store",
  },
  description:
    "Tienda premium de celulares, accesorios y selecciones para el hogar. Más de 10.000 ventas desde 2018. iPhone, Samsung, Xiaomi al mejor precio. Santa Cruz, Argentina.",
  keywords: [
    "celulares",
    "accesorios celulares",
    "iPhone",
    "Samsung",
    "Xiaomi",
    "Santa Cruz",
    "Argentina",
    "tienda celulares",
    "Helena Store",
    "comprar celular",
    "electrodomésticos",
    "Puerto Santa Cruz",
  ],
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "Helena Store | Celulares y Accesorios Premium",
    description:
      "Más de 10.000 ventas desde 2018. iPhone, Samsung, Xiaomi y más al mejor precio del mercado. Santa Cruz, Argentina.",
    url: BASE_URL,
    siteName: "Helena Store",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Helena Store Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Helena Store | Celulares y Accesorios Premium",
    description:
      "Tienda premium de celulares en Santa Cruz, Argentina. Más de 10.000 ventas.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
  google: "8s0h6YGyiSL3JMqrTJ7hCe9keBxiq2aoBZlmp-SxIjY",
},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body>
        {children}
        <FloatingButtons />
      </body>
    </html>
  );
}

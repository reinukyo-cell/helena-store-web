const BASE_URL = "https://helena-store-web.vercel.app";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/billones-dashboard.html"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

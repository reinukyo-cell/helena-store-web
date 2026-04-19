# ---- IMAGES / STORAGE ----

def upload_image(file_bytes, filename):
    """Sube imagen a Storage y devuelve URL pública."""
    url = f"{SUPABASE_URL}/storage/v1/object/products/{filename}"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "image/jpeg",
        "x-upsert": "true",
    }
    r = requests.post(url, headers=headers, data=file_bytes, timeout=30)
    if r.status_code not in (200, 201):
        raise Exception(f"Upload failed: {r.status_code} {r.text}")
    return f"{SUPABASE_URL}/storage/v1/object/public/products/{filename}"


def add_product_with_images(data, image_urls):
    """Agrega producto con lista de URLs de imágenes."""
    row = {
        "brand": data.get("brand", ""),
        "model": data.get("model", ""),
        "color": data.get("color", ""),
        "storage": data.get("storage", ""),
        "condition": data.get("condition", "nuevo"),
        "purchase_price": data.get("purchase_price", 0) or 0,
        "sale_price": data.get("sale_price", 0) or 0,
        "quantity": data.get("quantity", 1) or 1,
        "notes": data.get("notes", ""),
        "status": "disponible",
        "images": image_urls or [],
    }
    res = _post("products", row)
    return res[0]["id"] if res else None

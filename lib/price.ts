export function formatARS(price: number): string {
  return Math.round(price).toLocaleString("es-AR");
}

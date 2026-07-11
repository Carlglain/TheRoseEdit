export function formatPrice(priceMinor: number, currency: string): string {
  const amount = (priceMinor / 100).toFixed(0);
  if (currency === "USD") return `$${amount}`;
  if (currency === "NOK") return `${amount} kr`;
  return `${amount} ${currency}`;
}

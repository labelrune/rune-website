//handle that if the price is string then also format it
export const formatPrice = (price: string | number) => {
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(numericPrice);
};

export function toKebabCase(input: string): string {
  return input
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/\s/g, "-")
    .trim();
}

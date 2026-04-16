export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const generateRandomSKU = (length = 8) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let sku = "";
  for (let i = 0; i < length; i++) {
    sku += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return sku;
};

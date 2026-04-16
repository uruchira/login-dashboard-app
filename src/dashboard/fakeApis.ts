import type { Product } from "../types";
import { delay, generateRandomSKU } from "../utils";
import { NETWORK_DELAY } from "../constants";

let productsDB: Product[] = [
  {
    sku: "AN001",
    name: "HP Laptop",
    price: 1000,
    quantity: 200,
    category: "AA",
    status: true,
  },
  {
    sku: "AN002",
    name: "iPhone XS",
    price: 500,
    quantity: 100,
    category: "AB",
    status: true,
  },
  {
    sku: "AN00K",
    name: "Mac Book 4",
    price: 150,
    quantity: 10,
    category: "AB",
    status: false,
  },
];

export const getAPI = async (): Promise<Product[]> => {
  await delay(NETWORK_DELAY);
  return [...productsDB];
};

export const createAPI = async (product: Product): Promise<Product> => {
  await delay(NETWORK_DELAY);
  const newProduct = {
    sku: generateRandomSKU(),
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    category: product.category,
    description: product.description,
    status: product.status,
  };
  productsDB.push(newProduct);
  return newProduct;
};

export const updateAPI = async (updatedProduct: Product): Promise<Product> => {
  await delay(NETWORK_DELAY);
  const index = productsDB.findIndex((p) => p.sku === updatedProduct.sku);
  if (index === -1) {
    throw new Error("Product is not found");
  }
  productsDB[index] = updatedProduct;
  return updatedProduct;
};

export const deleteAPI = async (sku: string): Promise<void> => {
  await delay(NETWORK_DELAY);
  productsDB = productsDB.filter((p) => p.sku !== sku);
};

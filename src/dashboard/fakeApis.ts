import type { Product} from '../types';
import { delay  } from '../utils';
import { NETWORK_DELAY} from "../constants"

let productsDB: Product[] = [
  { sku: "AP-AN001", price: 1000, quantity: 200, category: "AA", status: true },
  { sku: "AP-AN002",  price: 500, quantity: 100,  category: "AB", status: true },
   { sku: "AP-AN00K",  price: 150, quantity: 10,  category: "AB", status: false },
];

export const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  await delay(NETWORK_DELAY);
  const newProduct = {
    id: Date.now(),
    ...product,
  };
  productsDB.push(newProduct);
  return newProduct;
};

export const getProducts = async (): Promise<Product[]> => {
  await delay(NETWORK_DELAY);
  return [...productsDB];
};

export const updateProduct = async (updatedProduct: Product): Promise<Product> => {
  await delay(NETWORK_DELAY);
  const index = productsDB.findIndex(p => p.sku === updatedProduct.sku);
  if (index === -1) {
    throw new Error("Product is not found");
  }
  productsDB[index] = updatedProduct;
  return updatedProduct;
};

export const deleteProduct = async (sku: string): Promise<void> => {
  await delay(NETWORK_DELAY);
  productsDB = productsDB.filter(p => p.sku !== sku);
};
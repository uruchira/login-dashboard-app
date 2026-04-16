import { getAPI, createAPI, updateAPI, deleteAPI } from "./fakeApis";
import type { Product } from "../types";

export async function getProducts(): Promise<Product[]> {
  const response = await getAPI();
  return response;
}

export async function addProduct(
  product: Omit<Product, "sku">,
): Promise<Product> {
  const response = await createAPI(product);
  return response;
}

export async function updateProduct(updatedProduct: Product): Promise<Product> {
  const response = await updateAPI(updatedProduct);
  return response;
}

export async function deleteProduct(sku: string): Promise<void> {
  const response = await deleteAPI(sku);
  return response;
}

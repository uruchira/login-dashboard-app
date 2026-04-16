import React, { createContext, useContext, useState } from "react";
import type { Product, ProductContextType } from "../types";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const setNewProduct = (newProduct: Product) => {
    setAllProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <ProductContext.Provider value={{ allProducts, setNewProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useAuth must be used within ProductProvider");
  }
  return context;
};

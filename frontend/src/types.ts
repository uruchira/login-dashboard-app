export type User = {
  id: string;
  username: string;
};

export type LoginFormState = {
  username: string;
  password: string;
};

export type LoginErrorState = {
  username?: string;
  password?: string;
};

export type LoginResponse = {
  user?: User;
  success: boolean;
  error?: string;
};

export interface AuthContextType {
  user: User | null;
  setNewUser: (newUser: User | null) => void;
}

export interface Product {
  id: string;
  sku: string;
  productName: string;
  price: number;
  quantity: number;
  category: string;
  description?: string;
  status: boolean;
}

export type ProductFormValues = Omit<Product, "id">;

export type ProductFormErrors = {
  sku?: string;
  productName?: string;
  price?: string;
  quantity?: string;
  category?: string;
  description?: string;
};

export interface ProductContextType {
  allProducts: Product[] | [];
  updateProducts: (newProduct: Product[] | Product) => void;
}

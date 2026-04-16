export type User = {
  username: string;
  token?: string;
};

export type LoginResponse = {
  success: boolean;
  user?: User;
  error?: string;
};

export interface AuthContextType {
  user: User | null;
  setNewUser: (newUser: User | null) => void;
}

export interface Product {
  sku: string
  price: number;
  quantity: number;
  category: string;
  description?: string;
  status: boolean;
}

export interface ProductContextType {
  allProducts: Product[] | [];
  setNewProduct: (newProduct: Product) => void;
}

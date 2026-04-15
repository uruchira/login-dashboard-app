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
  setNewUser: (loggedUser: User) => void;
}
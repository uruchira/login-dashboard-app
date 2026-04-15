import React, { createContext, useContext, useState } from 'react';
import type { User, AuthContextType } from "./types"

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const setNewUser = (loggedUser: User) => {
    setUser(loggedUser);
  }

  return (
    <AuthContext.Provider value={{ user, setNewUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
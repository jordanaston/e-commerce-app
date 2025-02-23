import React, { createContext, useContext, useState, useEffect } from "react";
import { trpc } from "../utils/trpc";

import { User } from "@/types/user";

interface AuthContextType {
  user: User | null;
  loginUser: (username: string) => Promise<void>;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const { data: users } = trpc.user.getAllUsers.useQuery();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId && users) {
      const matchedUser = users.find((u) => u.id.toString() === userId);
      if (matchedUser) {
        setUser(matchedUser);
      }
    }
  }, [users]);

  const loginUser = async (username: string) => {
    const matchedUser = users?.find((u) => u.username === username);
    if (matchedUser) {
      await localStorage.setItem("userId", matchedUser.id.toString());
      setUser(matchedUser);
    } else {
      console.error("User not found");
    }
  };

  const logoutUser = async () => {
    await localStorage.removeItem("userId");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

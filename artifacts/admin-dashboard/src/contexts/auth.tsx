import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AdminUser, useGetAdminMe } from "@workspace/api-client-react";
import { setAuthTokenGetter } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";

setAuthTokenGetter(() => localStorage.getItem("nexushub_admin_token"));

interface AuthContextType {
  token: string | null;
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: AdminUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("nexushub_admin_token"));
  const [user, setUser] = useState<AdminUser | null>(null);
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const { data: me, isLoading: isMeLoading, error } = useGetAdminMe({
    query: {
      enabled: !!token,
      retry: false
    }
  });

  useEffect(() => {
    if (me) {
      setUser(me);
    }
    if (error) {
      logout();
    }
  }, [me, error]);

  const login = (newToken: string, newUser: AdminUser) => {
    localStorage.setItem("nexushub_admin_token", newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("nexushub_admin_token");
    setToken(null);
    setUser(null);
    queryClient.clear();
    setLocation("/login");
  };

  const isLoading = !!token && isMeLoading;

  return (
    <AuthContext.Provider value={{
      token,
      user,
      isAuthenticated: !!token && !!user,
      isLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

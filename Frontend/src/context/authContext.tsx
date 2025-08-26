// AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  authUser: string | null;
  setAuthUser: (token: string | null) => void;
  loading: boolean; // Add loading state
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authUser, setAuthUserState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const token = Cookies.get("chat-token") || null;
    setAuthUserState(token);
    setLoading(false); // Set loading to false after checking cookie
  }, []);

  const setAuthUser = (token: string | null) => {
    if (token) {
      Cookies.set("chat-token", token, { expires: 7 });
    } else {
      Cookies.remove("chat-token");
    }
    setAuthUserState(token);
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
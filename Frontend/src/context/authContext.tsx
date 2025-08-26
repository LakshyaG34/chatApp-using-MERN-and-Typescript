import { createContext, useContext, useState, useEffect } from "react";
import type {ReactNode} from "react"
import Cookies from "js-cookie";

interface AuthContextType {
  authUser: string | null; // JWT token
  setAuthUser: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within AuthContextProvider");
  return context;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUserState] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("chat-token") || null;
    setAuthUserState(token);
  }, []);

  const setAuthUser = (token: string | null) => {
    if (token) Cookies.set("chat-token", token, { expires: 7 });
    else Cookies.remove("chat-token");
    setAuthUserState(token);
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

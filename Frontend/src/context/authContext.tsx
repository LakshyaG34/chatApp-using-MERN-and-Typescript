// import { createContext, useContext, useState, useEffect } from "react";
// import type {ReactNode} from "react"
// import Cookies from "js-cookie";

// interface AuthContextType {
//   authUser: string | null; // JWT token
//   setAuthUser: (token: string | null) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuthContext = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuthContext must be used within AuthContextProvider");
//   return context;
// };

// export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
//   const [authUser, setAuthUserState] = useState<string | null>(null);

//   useEffect(() => {
//     const token = Cookies.get("jwt") || null;
//     setAuthUserState(token);
//   }, []);

//   const setAuthUser = (token: string | null) => {
//     if (token) Cookies.set("jwt", token, { expires: 7 });
//     else Cookies.remove("jwt");
//     setAuthUserState(token);
//   };

//   return (
//     <AuthContext.Provider value={{ authUser, setAuthUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useContext, useState, useEffect } from "react";
import type {ReactNode} from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within AuthContextProvider");
  return context;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUserState] = useState<User | null>(null);

  // On app load, fetch the logged-in user from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me", {
          withCredentials: true, // send httpOnly cookie automatically
        });
        setAuthUserState(res.data.user); // set user object
      } catch (err) {
        setAuthUserState(null); // not logged in
      }
    };
    fetchUser();
  }, []);

  const setAuthUser = (user: User | null) => {
    setAuthUserState(user);
    // No need to manually set cookies; backend handles JWT in httpOnly cookie
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

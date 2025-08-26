import { createContext, useContext, useState, useEffect } from "react";
import type {ReactNode} from "react"
import io, { Socket } from "socket.io-client";
import { useAuthContext } from "./authContext";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: [],
});

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const { authUser } = useAuthContext();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!authUser) {
      socket?.disconnect();
      setSocket(null);
      return;
    }

    const newSocket = io("http://localhost:4000", {
      auth: { token: authUser }, // send JWT token
      withCredentials: true,
    });

    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (users: string[]) => {
      setOnlineUsers(users);
    });

    return () => {
      newSocket.off("getOnlineUsers");
      newSocket.disconnect();
    };
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

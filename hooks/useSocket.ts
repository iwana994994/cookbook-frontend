

import { io,Socket } from "socket.io-client";
import { create } from "zustand";

const baseUrl = "https://cookbook-backend-mjpt.onrender.com";

let socket: Socket | null = null;  // globalna promenljiva za socke
 


interface SocketState {
  isConnected: boolean;
   initSocket: (userId: string, token: string) => void;
  disconnectSocket: () => void;
}

export const useSocket = create<SocketState>((set, get) => ({
  isConnected: false,

  initSocket: (userId: string, token: string) => {
    const socket = io(baseUrl, {
      autoConnect: false,
      transports: ["websocket", "polling"],
      withCredentials: true,
      auth: { token },
    });   


  if (!socket.connected) {
    console.log("Connecting socket...   😍😍😍");
    socket.connect();
    socket.on("connect", () => {
      console.log("Socket connected");
      socket.emit("user_connected", userId);
      set({ isConnected: true });
    });
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      set({ isConnected: false });
    });
    socket.on("connect_error", (err) => {
      console.error(" !!!!!    🙄  Socket connection error:", err);
    });
    socket.on("error", (err) => {
  console.error(" !!!!!    🙄  Socket error:", err);
});
  }
},
 disconnectSocket: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },
}));

import { io } from "socket.io-client";
import { create } from "zustand";

const baseUrl = "https://cookbook-backend-mjpt.onrender.com";

const socket = io(baseUrl, {
  autoConnect: false,
  transports: ["websocket", "polling"], 
  withCredentials: true,
});

interface SocketState {
  isConnected: boolean;
  initSocket: (userId: string) => void;
  disconnectSocket: () => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  isConnected: false,

  initSocket: (userId: string) => {
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
    socket.disconnect();
    // ne postavljamo listener ovde
  },
}));

export default socket;

import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

// Define the base URL here
const BASE_URL = "http://localhost:3000/api/message";

export const useChatStore = create((set, get) => ({
  messages: [],
  isLoading: false,
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,
  users: [],

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axios.get(`${BASE_URL}/users`, {
        withCredentials: true,
      });
      set({ users: res.data });
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axios.get(`${BASE_URL}/${userId}`, { withCredentials: true });
      set({ messages: res.data });
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { messages, selectedUser } = get();
    const { socket, authUser } = useAuthStore.getState();
    try {
      const res = await axios.post(
        `${BASE_URL}/send/${selectedUser._id}`,
        messageData,
        {
          withCredentials: true,
        }
      );
      set({ messages: [...messages, res.data] });

      if (socket?.connected) {
        socket.emit("sendMessage", {
          recieverId: selectedUser._id,
          message: res.data,
        });
      }

      console.log("message sent successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },

  setSelectedUser: (user) => set({ selectedUser: user }),

  addMessageToState: (message) => {
    const { messages } = get();
    set({ messages: [...messages, message] });
  },
}));

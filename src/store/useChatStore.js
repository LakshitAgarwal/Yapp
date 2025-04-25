import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useChatStore = create((set) => ({
  messages: [],
  isLoading: false,
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,
  users: [],

  getUsers: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get("http://localhost:3000/api/message/users", {
        withCredentials: true,
      });
      set({ users: res.data });
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axios.get(
        `http://localhost:3000/api/message/${userId}`,
        { withCredentials: true }
      );
      set({ messages: res.data });
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  setSelectedUser: (user) => set({ selectedUser: user }),
}));

import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

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
      const res = await axios.get("http://localhost:3000/api/message/users", {
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

  sendMessage: async (messageData) => {
    const { messages, selectedUser } = get();
    try {
      const res = await axios.post(
        `http://localhost:3000/api/message/send/${selectedUser._id}`,
        messageData,
        {
          withCredentials: true,
        }
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },

  setSelectedUser: (user) => set({ selectedUser: user }),
}));

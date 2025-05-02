import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useChatStore } from "./useChatStore";

const BASE_URL = "https://api.socialmorph.co/api/auth";
// const BASE_URL = "http://localhost:3000/api/auth";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true, // this is the initial state which will be run when the app starts everytime.
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/check`, {
        withCredentials: true,
      });
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (userData) => {
    try {
      set({ isSigningUp: true });
      const res = await axios.post(
        `${BASE_URL}/signup`, // Use the base URL here
        userData,
        {
          withCredentials: true,
        }
      );
      toast.success("Account created successfully");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (userData) => {
    try {
      set({ isLoggingIn: true });

      const res = await axios.post(
        `${BASE_URL}/login`, // Use the base URL here
        userData,
        { withCredentials: true }
      );
      toast.success("Logged in successfully");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axios.post(
        `${BASE_URL}/logout`, // Use the base URL here
        {},
        {
          withCredentials: true,
        }
      );
      toast.success("Logout successful.");
      set({ authUser: null });
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updatePfp: async (userPfp) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axios.put(
        `${BASE_URL}/update-profile`, // Use the base URL here
        { profilePic: userPfp },
        { withCredentials: true }
      );
      toast.success("Profile Picture Updated");
      console.log("Update success:", res.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io("https://api.socialmorph.co");
    // const socket = io("http://localhost:3000");
    socket.connect();

    const userId = get().authUser?._id; // assuming your user ID is here

    socket.on("connect", () => {
      socket.emit("addUser", userId);
    });

    socket.on("newMessage", (message) => {
      const { selectedUser, addMessageToState } = useChatStore.getState();

      // Check if the message belongs to the currently selected user
      if (
        message.senderId === selectedUser?._id ||
        message.recieverId === selectedUser?._id
      ) {
        addMessageToState(message);
      }
    });

    set({ socket: socket });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) {
      socket.off("receiveMessage"); // remove listener to prevent duplicates
      socket.disconnect();
    }
  },
}));

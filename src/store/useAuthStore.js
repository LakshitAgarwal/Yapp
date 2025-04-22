import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true, // this is the initial state which will be run when the app starts everytime.

  checkAuth: async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/auth/check", {
        withCredentials: true,
      });
      set({ authUser: res.data });
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
        "http://localhost:3000/api/auth/signup",
        userData,
        {
          withCredentials: true,
        }
      );
      toast.success("Account created successfully");
      set({ authUser: res.data });
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
        "http://localhost:3000/api/auth/login",
        userData,
        { withCredentials: true }
      );
      toast.success("Logged in successfully");
      set({ authUser: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      toast.success("Logout successful.");
      set({ authUser: null });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updatePfp: async (userPfp) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axios.put(
        "http://localhost:3000/api/auth/update-profile",
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
}));

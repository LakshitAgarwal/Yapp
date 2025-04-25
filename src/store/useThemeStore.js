import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",
  setTheme: (selectedTheme) => {
    set({ theme: selectedTheme });
  },
}));

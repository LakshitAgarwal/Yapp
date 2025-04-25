import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",
  setTheme: (selectedTheme) => {
    localStorage.setItem("chat-theme", selectedTheme),
      set({ theme: selectedTheme });
  },
}));

import { create } from "zustand";

export const useThemeStore = create((set) => {
  // Initialize theme based on system preference or localStorage
  const getInitialTheme = () => {
    const stored = localStorage.getItem("chat-theme");
    if (stored) return stored;
    
    // Check system preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light"; // default to light mode
  };

  return {
    theme: getInitialTheme(),
    setTheme: (theme) => {
      localStorage.setItem("chat-theme", theme);
      // Apply theme to DOM immediately
      const htmlElement = document.documentElement;
      if (theme === "dark") {
        htmlElement.setAttribute("data-theme", "dark");
        htmlElement.classList.add("dark");
      } else {
        htmlElement.removeAttribute("data-theme");
        htmlElement.classList.remove("dark");
      }
      set({ theme });
    },
  };
});
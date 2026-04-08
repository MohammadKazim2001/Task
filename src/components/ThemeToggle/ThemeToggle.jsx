import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.scss";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    // Check if dark class exists on body
    return saved === "dark" || document.body.classList.contains("dark");
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Also add an effect to sync with localStorage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "theme") {
        setIsDark(e.newValue === "dark");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <button
      className={styles.toggle}
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle theme"
    >
      <span className={styles.toggleText}>Change theme</span>
      <span className={styles.toggleIcon}>{isDark ? "☀️" : "🌙"}</span>
    </button>
  );
};

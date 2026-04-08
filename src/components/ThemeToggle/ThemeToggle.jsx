import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.scss";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

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

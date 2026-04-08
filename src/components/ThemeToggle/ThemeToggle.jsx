import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.scss";
import ThemeIcon from "../ThemeIcon";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
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
      <span className={styles.toggleIcon}>
        {/* <ThemeIcon width={140} height={19} /> */}
        <ThemeIcon width={16} height={16} />
      </span>
    </button>
  );
};

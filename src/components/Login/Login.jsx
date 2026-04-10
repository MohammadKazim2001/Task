import { useState } from "react";
import styles from "./Login.module.scss";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

export const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Enter your email");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter a valid email");
      return;
    }

    if (!agreed) {
      setError("You must agree to the terms");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const userData = {
        email,
        profile: {
          alias: "",
          ratingPublic: true,
          avatar: {
            image: null,
            name: "",
            date: "",
          },
          contacts: {
            email: email,
            vk: "",
            telegram: "",
            whatsapp: "",
          },
        },
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      onLogin(userData);
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      <div className={styles.toggleParent}>
        <ThemeToggle />
      </div>
      <div className={styles.container}>
        <div className={styles.card}>
          <button className={styles.closeButton} aria-disabled="true" disabled>
            ×
          </button>
          <h1 className={styles.title}>Registration / Login</h1>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className={`${styles.input} ${error ? styles.inputError : ""}`}
                placeholder="Your email"
              />
            </div>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked);
                    setError("");
                  }}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>
                  I agree to the{" "}
                  <span className={styles.term_privacy}>
                    privacy policy terms
                  </span>
                </span>
              </label>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

import { useState } from "react";
import styles from "./Login.module.scss";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

export const Login = ({ onLogin, onClose }) => {
  // Add onClose prop
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

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

    // Save to localStorage
    const userData = {
      email,
      profile: {
        alias: "",
        ratingPublic: true,
        avatar: {
          name: "Jeev Yadav",
          date: "24.02.25",
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
  };

  return (
    <>
      <div className={styles.toggleParent}>
        <ThemeToggle />
      </div>
      <div className={styles.container}>
        <div></div>
        <div className={styles.card}>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
          <h1 className={styles.title}>Registration / Login</h1>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* ... rest of your form remains the same ... */}
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Your email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className={`${styles.input} ${error ? styles.inputError : ""}`}
                placeholder="example@mail.com"
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
                  I agree to the privacy policy terms
                </span>
              </label>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button type="submit" className={styles.submitButton}>
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

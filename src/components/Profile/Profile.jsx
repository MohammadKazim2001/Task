import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import styles from "./Profile.module.scss";

export const Profile = ({ userData, onLogout }) => {
  const [profile, setProfile] = useLocalStorage("userData", userData);
  const [formData, setFormData] = useState({
    alias: profile?.profile?.alias || "",
    ratingPublic: profile?.profile?.ratingPublic !== false,
    email: profile?.email || "",
    vk: profile?.profile?.contacts?.vk || "",
    telegram: profile?.profile?.contacts?.telegram || "",
    whatsapp: profile?.profile?.contacts?.whatsapp || "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      email: formData.email,
      profile: {
        alias: formData.alias,
        ratingPublic: formData.ratingPublic,
        avatar: profile?.profile?.avatar || {
          name: "Jeev Yadav",
          date: "24.02.25",
        },
        contacts: {
          email: formData.email,
          vk: formData.vk,
          telegram: formData.telegram,
          whatsapp: formData.whatsapp,
        },
      },
    };

    setProfile(updatedData);
    alert("Changes applied!");
  };

  const handleClear = () => {
    setFormData({
      alias: "",
      ratingPublic: true,
      email: profile?.email || "",
      vk: "",
      telegram: "",
      whatsapp: "",
    });
  };

  const handleAvatarChange = () => {
    // For demo purposes, just an alert
    alert("Avatar change feature will be available in the next version");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <button onClick={onLogout} className={styles.logoutButton}>
          ← Logout
        </button>

        <h1 className={styles.title}>Settings</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Profile Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Profile</h2>

            <div className={styles.field}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="ratingPublic"
                  checked={formData.ratingPublic}
                  onChange={handleChange}
                  className={styles.checkbox}
                />
                <span>Participate in public rating</span>
              </label>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Profile alias</label>
              <input
                type="text"
                name="alias"
                value={formData.alias}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter a name"
              />
            </div>
          </section>

          {/* Avatar Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Avatar</h2>
            <div className={styles.avatarInfo}>
              <div className={styles.avatarDetails}>
                <p>Uploaded {profile?.profile?.avatar?.date || "24.02.25"}</p>
                <p>Name: {profile?.profile?.avatar?.name || "Jeev Yadav"}</p>
              </div>
              <button
                type="button"
                onClick={handleAvatarChange}
                className={styles.changeButton}
              >
                Change
              </button>
            </div>
          </section>

          {/* Contacts Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Contacts</h2>

            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                placeholder="Your email"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>VKontakte</label>
              <input
                type="url"
                name="vk"
                value={formData.vk}
                onChange={handleChange}
                className={styles.input}
                placeholder="https://vk.com/"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Telegram</label>
              <input
                type="url"
                name="telegram"
                value={formData.telegram}
                onChange={handleChange}
                className={styles.input}
                placeholder="https://t.me/"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>WhatsApp</label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className={styles.input}
                placeholder="+1 123 456 78 90"
              />
            </div>
          </section>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={handleClear}
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
              Clear all
            </button>
            <button
              type="submit"
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              Apply changes
            </button>
          </div>
        </form>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Sign up to comment, edit, inspect and more.
          </p>
          <div className={styles.footerButtons}>
            <button className={styles.footerBtn}>Sign up</button>
            <button className={styles.footerBtn}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

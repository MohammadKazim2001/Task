import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import styles from "./Profile.module.scss";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import ProfileIcon from "../ProfileIcon";

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
    alert("Avatar change function will be available in the next version");
  };

  const handleBackToRanking = () => {
    alert("Ranking page coming soon!");
  };

  return (
    <div className={styles.wrapper}>
      {/* Top Bar with Buttons */}
      <div className={styles.topBar}>
        <button onClick={handleBackToRanking} className={styles.backButton}>
          ← Back to ranking
        </button>
        <ThemeToggle />
      </div>

      <div className={styles.profileIconWrapper}>
        <ProfileIcon />
      </div>

      {/* Main Layout */}
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarContent}>
            <h2 className={styles.sidebarTitle}>Settings</h2>

            <nav className={styles.nav}>
              <button className={`${styles.navItem} ${styles.navItemActive}`}>
                Profile
              </button>
              <button className={styles.navItem_project}>Project Niches</button>
            </nav>
          </div>
        </aside>

        <main className={styles.main}>
          <div className={styles.content}>
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Rating Public Section */}
              <section className={styles.card}>
                <div className={styles.toggleRow}>
                  <span className={styles.label}>
                    Public participation in ranking
                  </span>
                  <label className={styles.toggle}>
                    <input
                      type="checkbox"
                      name="ratingPublic"
                      checked={formData.ratingPublic}
                      onChange={handleChange}
                      className={styles.toggleInput}
                    />
                    <span className={styles.toggleSlider}></span>
                  </label>
                </div>
              </section>

              {/* Alias Section */}
              <section className={styles.card}>
                <h3 className={styles.cardTitle}>Profile alias</h3>
                <input
                  type="text"
                  name="alias"
                  value={formData.alias}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Enter name"
                />
              </section>

              {/* Avatar Section */}
              <section className={styles.card}>
                <h3 className={styles.cardTitle}>Avatar</h3>
                <div className={styles.avatarContainer}>
                  <div className={styles.avatarWrapper}>
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
                      alt="Avatar"
                      className={styles.avatar}
                    />
                  </div>
                  <div className={styles.avatarInfo}>
                    <p className={styles.avatarDate}>Uploaded 24.02.25</p>
                    <p className={styles.avatarName}>
                      name.jpg{" "}
                      <button type="button" className={styles.deleteLink}>
                        Delete
                      </button>
                    </p>
                    <button
                      type="button"
                      onClick={handleAvatarChange}
                      className={styles.changeButton}
                    >
                      Change
                    </button>
                  </div>
                </div>

                <h3 className={styles.cardTitleContact}>Contacts</h3>

                <div className={styles.field}>
                  <label className={styles.fieldLabel}>Email</label>
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
                  <label className={styles.fieldLabel}>VKontakte</label>
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
                  <label className={styles.fieldLabel}>Telegram</label>
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
                  <label className={styles.fieldLabel}>WhatsApp</label>
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
          </div>
        </main>
      </div>
    </div>
  );
};

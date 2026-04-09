import { useState, useRef } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import styles from "./Profile.module.scss";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import ProfileIcon from "../ProfileIcon";
import avatar from "../../assets/avatar.JPG";

export const Profile = ({ userData, onLogout }) => {
  const [profile, setProfile] = useLocalStorage("userData", userData);
  const fileInputRef = useRef(null);
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

        avatar: profile?.profile?.avatar || null,
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
    if (
      window.confirm("Are you sure you want to log out and clear your data?")
    ) {
      localStorage.removeItem("userData");
      if (onLogout) onLogout();
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;

      const updatedData = {
        ...profile,
        profile: {
          ...profile.profile,
          avatar: {
            image: base64,
            name: file.name,
            date: new Date().toLocaleDateString(),
          },
        },
      };

      setProfile(updatedData);
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleDeleteAvatar = () => {
    const updatedData = {
      ...profile,
      profile: {
        ...profile.profile,
        avatar: null,
      },
    };

    setProfile(updatedData);
  };

  const handleBackToRanking = () => {
    alert("Ranking page coming soon!");
  };

  return (
    <div className={styles.wrapper}>
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
              <button className={styles.navItem_project}>Projects</button>
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
                {/* <h3 className={styles.cardTitle}>Profile alias</h3> */}
                <h3 className={styles.cardTitle}>Profile Name</h3>
                <input
                  type="text"
                  name="alias"
                  value={formData.alias}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Enter your name"
                />
              </section>

              {/* Avatar Section */}
              <section className={styles.card}>
                <h3 className={styles.cardTitle}>Avatar</h3>

                <div className={styles.avatarContainer}>
                  <div className={styles.avatarWrapper}>
                    <img
                      src={profile?.profile?.avatar?.image || avatar}
                      alt="Avatar"
                      className={styles.avatar}
                    />
                  </div>

                  <div className={styles.avatarInfo}>
                    <p className={styles.avatarDate}>
                      Uploaded {profile?.profile?.avatar?.date || "—"}
                    </p>

                    <p className={styles.avatarName}>
                      {profile?.profile?.avatar?.name || "No file"}
                      {profile?.profile?.avatar?.image && (
                        <button
                          type="button"
                          onClick={handleDeleteAvatar}
                          className={styles.deleteLink}
                        >
                          Delete
                        </button>
                      )}
                    </p>

                    {/* Hidden file input */}
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleAvatarChange}
                      style={{ display: "none" }}
                    />

                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
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

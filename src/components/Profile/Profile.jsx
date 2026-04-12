import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { useProfile } from "../../hooks/useProfile";
import { AvatarSection } from "./AvatarSection";
import { ContactsSection } from "./ContactsSection";
import { FormActions } from "./FormActions";
import ProfileIcon from "../ProfileIcon";
import styles from "./Profile.module.scss";

// Sub-components with styles imported
const SuccessMessage = ({ show }) =>
  show && (
    <div className={styles.successMessage}>Changes applied successfully!</div>
  );

const BackButton = ({ disabled }) => (
  <button
    className={styles.backButton}
    disabled={disabled}
    style={{ cursor: "not-allowed", opacity: 0.6 }}
  >
    <span className="arrow">←</span> Back to ranking
  </button>
);

const RatingToggle = ({ checked, onChange }) => (
  <section className={styles.card_rating}>
    <div className={styles.toggleRow}>
      <span className={styles.label}>Public participation in ranking</span>
      <label className={styles.toggle}>
        <input
          type="checkbox"
          name="ratingPublic"
          checked={checked}
          onChange={onChange}
          className={styles.toggleInput}
        />
        <span className={styles.toggleSlider}></span>
      </label>
    </div>
  </section>
);

const NameInput = ({ value, onChange }) => (
  <section className={styles.name_card}>
    <h3 className={styles.cardTitle}>Profile Title</h3>
    <input
      type="text"
      name="name"
      value={value}
      onChange={onChange}
      className={styles.input}
      placeholder="Enter your name"
    />
  </section>
);

const Sidebar = () => (
  <aside className={styles.sidebar}>
    <div className={styles.sidebarContent}>
      <h2 className={styles.sidebarTitle}>Settings</h2>
      <nav className={styles.nav}>
        <button className={`${styles.navItem} ${styles.navItemActive}`}>
          Profile
        </button>
        <button
          className={styles.navItem_project}
          disabled
          style={{ cursor: "not-allowed", opacity: 0.6 }}
        >
          Projects
        </button>
      </nav>
    </div>
  </aside>
);

export const Profile = ({ userData, onLogout }) => {
  const {
    profile,
    formData,
    showSuccessMessage,
    fileInputRef,
    handleChange,
    handleSubmit,
    handleClear,
    handleAvatarChange,
    handleDeleteAvatar,
  } = useProfile(userData, onLogout);

  return (
    <div className={styles.wrapper}>
      <SuccessMessage show={showSuccessMessage} />

      <div className={styles.topBar}>
        <BackButton disabled />
        <ThemeToggle />
      </div>

      <div className={styles.profileIconWrapper}>
        <ProfileIcon />
      </div>

      <div className={styles.layout}>
        <Sidebar />

        <main className={styles.main}>
          <div className={styles.content}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <RatingToggle
                checked={formData.ratingPublic}
                onChange={handleChange}
              />

              <NameInput value={formData.name} onChange={handleChange} />

              <AvatarSection
                profile={profile}
                onAvatarChange={handleAvatarChange}
                onDeleteAvatar={handleDeleteAvatar}
                fileInputRef={fileInputRef}
              />

              <ContactsSection formData={formData} onChange={handleChange} />

              <FormActions onClear={handleClear} onSubmit={handleSubmit} />
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

import styles from "./Profile.module.scss";
import avatar from "../../assets/avatar.JPG";

export const AvatarSection = ({
  profile,
  formData,
  onAvatarChange,
  onDeleteAvatar,
  onFormChange,
  fileInputRef,
}) => {
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) onAvatarChange(file);
    e.target.value = "";
  };

  return (
    <section className={styles.avatar_card}>
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
                onClick={onDeleteAvatar}
                className={styles.deleteLink}
              >
                Delete
              </button>
            )}
          </p>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileSelect}
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

      {/* Contacts section - inside the same card */}
      <h3 className={styles.cardTitleContact}>Contacts</h3>

      <div className={styles.field}>
        <label className={styles.form_fieldLabel}>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onFormChange}
          className={styles.input}
          placeholder="Your email"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.form_fieldLabel}>VKontakte</label>
        <input
          type="url"
          name="vk"
          value={formData.vk}
          onChange={onFormChange}
          className={styles.input}
          placeholder="https://vk.com/"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.form_fieldLabel}>Telegram</label>
        <input
          type="url"
          name="telegram"
          value={formData.telegram}
          onChange={onFormChange}
          className={styles.input}
          placeholder="https://t.me/"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.form_fieldLabel}>WhatsApp</label>
        <input
          type="tel"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={onFormChange}
          className={styles.input}
          placeholder="+1 123 456 78 90"
        />
      </div>
    </section>
  );
};

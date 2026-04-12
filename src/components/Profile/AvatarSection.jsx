import React from "react";
import styles from "./Profile.module.scss";
import avatar from "../../assets/avatar.JPG";

export const AvatarSection = ({
  profile,
  onAvatarChange,
  onDeleteAvatar,
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
    </section>
  );
};

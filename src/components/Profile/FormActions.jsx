import styles from "./Profile.module.scss";

export const FormActions = ({ onClear, onSubmit }) => (
  <div className={styles.actions}>
    <button
      type="button"
      onClick={onClear}
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
);

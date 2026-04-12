import styles from "./Profile.module.scss";

export const ContactsSection = ({ formData, onChange }) => {
  const contactFields = [
    { name: "email", label: "Email", type: "email", placeholder: "Your email" },
    {
      name: "vk",
      label: "VKontakte",
      type: "url",
      placeholder: "https://vk.com/",
    },
    {
      name: "telegram",
      label: "Telegram",
      type: "url",
      placeholder: "https://t.me/",
    },
    {
      name: "whatsapp",
      label: "WhatsApp",
      type: "tel",
      placeholder: "+1 123 456 78 90",
    },
  ];

  return (
    <>
      <h3 className={styles.cardTitleContact}>Contacts</h3>
      {contactFields.map((field) => (
        <div key={field.name} className={styles.field}>
          <label className={styles.form_fieldLabel}>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={onChange}
            className={styles.input}
            placeholder={field.placeholder}
          />
        </div>
      ))}
    </>
  );
};

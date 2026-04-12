// constants/profileConstants.js
export const CONTACT_FIELDS = [
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

export const PROFILE_DEFAULTS = {
  name: "",
  ratingPublic: true,
  email: "",
  vk: "",
  telegram: "",
  whatsapp: "",
};

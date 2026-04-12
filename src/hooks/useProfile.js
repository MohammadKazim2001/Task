import { useState, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useProfile = (userData, onLogout) => {
  const [profile, setProfile] = useLocalStorage("userData", userData);
  const fileInputRef = useRef(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [formData, setFormData] = useState(() => ({
    name: profile?.profile?.name || "",
    ratingPublic: profile?.profile?.ratingPublic !== false,
    email: profile?.email || "",
    vk: profile?.profile?.contacts?.vk || "",
    telegram: profile?.profile?.contacts?.telegram || "",
    whatsapp: profile?.profile?.contacts?.whatsapp || "",
  }));

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
        name: formData.name,
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
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleClear = () => {
    localStorage.removeItem("userData");
    if (onLogout) onLogout();
  };

  const handleAvatarChange = (file) => {
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
  };

  const handleDeleteAvatar = () => {
    setProfile({
      ...profile,
      profile: { ...profile.profile, avatar: null },
    });
  };

  return {
    profile,
    formData,
    showSuccessMessage,
    fileInputRef,
    handleChange,
    handleSubmit,
    handleClear,
    handleAvatarChange,
    handleDeleteAvatar,
  };
};

export const validateField = (field, value) => {
  switch (field) {
    case "Full Name":
      return value.length >= 2 ? "" : "Name must be at least 2 characters";
    case "Email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ""
        : "Invalid email address";
    case "Phone Number":
      return /^\+?\d{10,15}$/.test(value)
        ? ""
        : "Enter a valid phone number (e.g. +254712345678)";
    case "Email or Phone":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^\+?\d{10,15}$/.test(value)
        ? ""
        : "Enter a valid email or phone number";
    case "Password":
      return value.length >= 6
        ? ""
        : "Password must be at least 6 characters";
    default:
      return "";
  }
};

export const validateField = (field, value) => {
  switch (field) {
    case "Full Name":
      return value.length >= 2 ? "" : "Must be at least 2 characters";
    case "Email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ""
        : "Invalid email address";
    case "Phone Number":
      return /^\+?\d{10,15}$/.test(value)
        ? ""
        : "Invalid phone number";
    case "Password":
      return value.length >= 6
        ? ""
        : "Must be at least 6 characters";
    default:
      return "";
  }
};

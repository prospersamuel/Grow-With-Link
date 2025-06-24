import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { getAuth } from "firebase/auth";
import {
  loginUser,
  registerUser,
  signInWithGoogle,
  resetPassword,
} from "../../services/Auth";
import AlertBox from "../../components/Alertbox";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { validateField } from "../../services/Validate";

const formFields = {
  login: [
    { type: "email", placeholder: "Email" },
    { type: "password", placeholder: "Password" },
  ],
  signup: [
    { type: "text", placeholder: "Full Name" },
    { type: "email", placeholder: "Email" },
    { type: "tel", placeholder: "Phone Number" },
    { type: "password", placeholder: "Password" },
  ],
};

export default function Login({ onClose, onLoginSuccess }) {
  const [mode, setMode] = useState("login");
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [password, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const auth = getAuth();

  const errorMessages = {
    "auth/email-already-in-use": "Email already in use. Try logging in instead.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Please check your connection.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/invalid-credential": "Invalid login credentials.",
    "auth/operation-not-allowed": "Email/password login is not enabled.",
    "auth/requires-recent-login": "Please log in again to verify your identity.",
  };

  const getFriendlyError = (code) =>
    errorMessages[code] || "Something went wrong. Please try again.";

  const [alert, setAlert] = useState({
    open: false,
    type: "info",
    title: "",
    message: "",
    onConfirmAction: null,
  });

  const showAlert = ({
    type = "info",
    title,
    message,
    onConfirmAction = null,
  }) => {
    setAlert({ open: true, type, title, message, onConfirmAction });
  };

  const handleSwitch = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setInputs({});
    setErrors({});
  };


  const handleInputChange = (e) => {
    const { placeholder, value } = e.target;
    setInputs((prev) => ({ ...prev, [placeholder]: value }));
    setErrors((prev) => ({ ...prev, [placeholder]: validateField(placeholder, value) }));
  };

  const handleGoogleAuth = async () => {
    try {
      setGoogleLoading(true);
      await signInWithGoogle();
       showAlert({
          type: "success",
          title: "Google Sign-in Successful",
          message: "You are now logged in with Google!",
          onConfirmAction: () => {  
            onClose();
            onLoginSuccess();
          },
        });
    } catch (err) {
      showAlert({
        type: "error",
        title: "Google Sign-in Failed",
        message: getFriendlyError(err.code) || "Failed to sign in with Google",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate fields
    const newErrors = {};
    formFields[mode].forEach((field) => {
      const value = inputs[field.placeholder] || "";
      const error = validateField(field.placeholder, value);
      if (error) newErrors[field.placeholder] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showAlert({
        type: "warning",
        title: "Fix Errors",
        message: "Please correct the errors before continuing.",
      });
      setLoading(false);
      return;
    }

    const { Email: email, Password: password, "Full Name": name, "Phone Number": phone } = inputs;

    try {
      if (mode === "login") {
        await loginUser(email, password);
         showAlert({
          type: "success",
          title: "Login Successful",
          message: "Welcome back!",
          onConfirmAction: () => {  
            onClose();
            onLoginSuccess();
          },
        });
      } else {
        // Registration flow
        await registerUser(email, password, name, phone);       
        showAlert({
          type: "success",
          title: "Account Created",
          message: "Your account has been created successfully!",
          onConfirmAction: () => {  
            onClose();
            onLoginSuccess();
          },
        });
      }
    } catch (err) {
      setLoading(false);
      
      showAlert({
        type: "error",
        title: mode === "login" ? "Login Failed" : "Registration Failed",
        message: getFriendlyError(err.code) || err.message,
      });
    }
  };

  const handleResetPassword = async () => {
    const email = inputs["Email"];
    if (!email) {
      showAlert({
        type: "warning",
        title: "Missing Email",
        message: "Please enter your email first.",
      });
      return;
    }

    try {
      await resetPassword(email);
      showAlert({
        type: "success",
        title: "Reset Email Sent",
        message: "Check your inbox for password reset instructions.",
      });
    } catch (err) {
      showAlert({
        type: "error",
        title: "Reset Failed",
        message: getFriendlyError(err.code),
      });
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -30 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 max-w-md w-full relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-3xl font-extrabold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            &times;
          </button>

          <h2 className="text-2xl font-extrabold text-center text-slate-800 dark:text-white mb-6">
            {mode === "login" ? "Welcome Back" : "Create an Account"}
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {formFields[mode].map((field, idx) => {
              const inputType =
                field.type === "password" && field.placeholder === "Password"
                  ? password
                    ? "text"
                    : "password"
                  : field.type;

              const error = errors[field.placeholder];

              return (
                <div key={idx} className="relative">
                  <input
                    type={inputType}
                    placeholder={field.placeholder}
                    value={inputs[field.placeholder] || ""}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 pr-10 rounded-lg border-2 font-bold focus:outline-none border-neutral-300 dark:border-slate-600 dark:text-white dark:bg-slate-700 focus:ring-2 focus:ring-primary`}
                  />
                  {field.type === "password" && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!password)}
                      className="absolute right-3 top-4 text-sm text-gray-600 dark:text-gray-300"
                    >
                      {password ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  )}
                  {error && (
                    <p className="text-red-500 text-sm mt-1 ml-1 font-semibold">
                      {error}
                    </p>
                  )}
                </div>
              );
            })}

            {mode === "login" && (
              <button
                type="button"
                onClick={handleResetPassword}
                className="text-sm -mt-3 text-primary text-right hover:underline font-semibold"
              >
                Forgot Password?
              </button>
            )}

            <button
              disabled={loading}
              type="submit"
              className="mt-2 bg-primary hover:bg-primary-dark text-white py-2 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? mode === "login"
                  ? "Logging in..."
                  : "Creating account..."
                : mode === "login"
                ? "Login"
                : "Sign Up"}
            </button>
          </form>

          <div className="my-4 text-center text-sm text-slate-500 dark:text-slate-400">
            OR
          </div>

          <button
            onClick={handleGoogleAuth}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-2 border dark:text-white 
  font-bold border-neutral-300 dark:border-slate-600 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FcGoogle size={20} />
            <span className="font-medium">
              {googleLoading
                ? "Signing in..."
                : mode === "login"
                ? "Login with Google"
                : "Sign up with Google"}
            </span>
          </button>

          {/* Switch */}
          <p className="mt-6 text-sm text-center text-slate-600 dark:text-slate-400">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={handleSwitch}
                  className="text-primary font-semibold"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={handleSwitch}
                  className="text-primary font-bold"
                >
                  Log in
                </button>
              </>
            )}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Reusable Alert */}
      <AlertBox
        isOpen={alert.open}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onConfirm={() => {
          setAlert((prev) => ({ ...prev, open: false }));
          if (alert.onConfirmAction) {
            alert.onConfirmAction();
          }
        }}
      />
    </div>
  );
}

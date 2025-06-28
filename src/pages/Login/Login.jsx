import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import {
  loginUser,
  registerUser,
  signInWithGoogle,
  resetPassword,
} from "../../services/Auth";
import AlertBox from "../../components/Alertbox";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { validateField } from "../../services/Validate";
import { useNavigate } from "react-router-dom";

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

export default function Login({ onClose }) {
  const [mode, setMode] = useState("signup");
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()


  const errorMessages = {
    "auth/email-already-in-use": "Email already in use. Try logging in instead.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Check your connection.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/invalid-credential": "Invalid login credentials.",
    "auth/operation-not-allowed": "Email/password login is not enabled.",
    "auth/requires-recent-login": "Please log in again.",
  };

  const getFriendlyError = (code) => errorMessages[code] || "Something went wrong.";

  const [alert, setAlert] = useState({
    open: false,
    type: "info",
    title: "",
    message: "",
    onConfirmAction: null,
  });

  const showAlert = ({ type = "info", title, message, onConfirmAction = null }) => {
    setAlert({ open: true, type, title, message, onConfirmAction });
  };

  const handleSwitch = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
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

    let roleIfNew = null;
    if (mode === "signup") {
      if (!inputs["Role"]) {
        showAlert({
          type: "warning",
          title: "Select Role",
          message: "Please choose what you are signing up as before continuing.",
        });
        return;
      }
      roleIfNew = inputs["Role"];
    }

    await signInWithGoogle(roleIfNew, inputs["Company Name"], inputs["Company Website"]);

    // ✅ Success only
    showAlert({
      type: "success",
      title: "Google Sign-in Successful",
      message: "You're logged in!",
      onConfirmAction: () => {
        onClose();
        navigate("/dashboard")
      },
    });
  } catch (err) {
    showAlert({
      type: "error",
      title: "Google Sign-in Failed",
      message: err.message || "Something went wrong.",
    });
  } finally {
    setGoogleLoading(false);
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = {};
    formFields[mode].forEach((field) => {
      const value = inputs[field.placeholder] || "";
      const error = validateField(field.placeholder, value);
      if (error) newErrors[field.placeholder] = error;
    });

    if (mode === "signup" && !inputs["Role"]) {
      newErrors["Role"] = "Please select a role.";
    }

    if (mode === "signup" && inputs["Role"] === "company") {
      if (!inputs["Company Name"]) {
        newErrors["Company Name"] = "Company name is required";
      }
      if (!inputs["Company Website"]) {
        newErrors["Company Website"] = "Company website is required";
      }
    }

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
            navigate("/dashboard")
          },
        });
      } else {
        const companyData = inputs["Role"] === "company" ? {
          companyName: inputs["Company Name"],
          companyWebsite: inputs["Company Website"]
        } : null;
        
        await registerUser(email, password, name, phone, inputs["Role"], companyData, inputs["Company Name"],
  inputs["Company Website"]);

        showAlert({
          type: "success",
          title: "Account Created",
          message: "Your account has been created.",
          onConfirmAction: () => {
            onClose();
            navigate("/dashboard")
          },
        });
      }
    } catch (err) {
      setLoading(false);
      showAlert({
        type: "error",
        title: mode === "login" ? "Login Failed" : "Registration Failed",
        message: getFriendlyError(err.code),
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
        message: "Check your inbox for reset instructions.",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Glassmorphism backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        onClick={onClose}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full border border-white/20 dark:border-slate-700/50"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-4xl font-bold text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors"
          >
            &times;
          </button>

          <div className="flex flex-col items-center mb-4">
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
              {mode === "login" ? "Welcome Back" : "Join Us"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {mode === "login" ? "Sign in to continue" : "Create your account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "login" ? (
              <>
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Email"
                      value={inputs["Email"] || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-xl dark:text-white bg-white/70 dark:bg-slate-700/70 border border-slate-300/80 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                    />
                    {errors["Email"] && (
                      <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                        {errors["Email"]}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Password"
                      value={inputs["Password"] || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 dark:text-white rounded-xl bg-white/70 dark:bg-slate-700/70 border border-slate-300/80 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors"
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    {errors["Password"] && (
                      <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                        {errors["Password"]}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-right w-full -mt-2"
                >
                  Forgot Password?
                </button>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={inputs["Full Name"] || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 dark:text-white rounded-xl bg-white/70 dark:bg-slate-700/70 border border-slate-300/80 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                    />
                    {errors["Full Name"] && (
                      <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                        {errors["Full Name"]}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Email"
                      value={inputs["Email"] || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 dark:text-white rounded-xl bg-white/70 dark:bg-slate-700/70 border border-slate-300/80 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                    />
                    {errors["Email"] && (
                      <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                        {errors["Email"]}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={inputs["Phone Number"] || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 dark:text-white rounded-xl bg-white/70 dark:bg-slate-700/70 border border-slate-300/80 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                    />
                    {errors["Phone Number"] && (
                      <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                        {errors["Phone Number"]}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Password"
                      value={inputs["Password"] || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 dark:text-white rounded-xl bg-white/70 dark:bg-slate-700/70 border border-slate-300/80 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors"
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    {errors["Password"] && (
                      <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                        {errors["Password"]}
                      </p>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 ml-2 mb-1">
                    I am signing up as:
                  </label>
                  <select
                    value={inputs["Role"] || ""}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, ["Role"]: e.target.value }))
                    }
                    className="w-full px-4 py-2 dark:text-white rounded-xl bg-white/70 dark:bg-slate-700 border border-slate-300/80 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="" disabled>Select role</option>
                    <option value="promoter">Promoter</option>
                    <option value="company">Company</option>
                  </select>
                  {errors["Role"] && (
                    <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                      {errors["Role"]}
                    </p>
                  )}
                </div>
                {inputs["Role"] === "company" && (
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={inputs["Company Name"] || ""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 dark:text-white rounded-xl bg-white/70 dark:bg-slate-700/70 border border-slate-300/80 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                      />
                      {errors["Company Name"] && (
                        <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                          {errors["Company Name"]}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="url"
                        placeholder="Company Website"
                        value={inputs["Company Website"] || ""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 dark:text-white rounded-xl bg-white/70 dark:bg-slate-700/70 border border-slate-300/80 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                      />
                      {errors["Company Website"] && (
                        <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                          {errors["Company Website"]}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            <button
              disabled={loading}
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-primary to-cyan-500 uppercase text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {mode === "login" ? "Signing in..." : "Creating account..."}
                </span>
              ) : mode === "login" ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300/50 dark:border-slate-600/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400">
                OR CONTINUE WITH
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleAuth}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/80 dark:bg-slate-700/80 border border-slate-300/50 dark:border-slate-600/50 rounded-xl font-medium text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FcGoogle size={20} />
            {googleLoading ? "Signing in..." : "Google"}
          </button>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={handleSwitch}
                  className="font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={handleSwitch}
                  className="font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Login in
                </button>
              </>
            )}
          </p>
        </motion.div>
      </AnimatePresence>

      <AlertBox
        isOpen={alert.open}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onConfirm={() => {
          setAlert((prev) => ({ ...prev, open: false }));
          console.log("Alert confirmed");
          if (alert.onConfirmAction) alert.onConfirmAction();
        }}
      />
    </div>
  );
}
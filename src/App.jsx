import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Dashboard from "./pages/userdashboard/dashboard/Dashboard";
import { Toaster } from "react-hot-toast";
import { useApp } from "./context/Appcontext";
import Login from "./pages/Login/Login";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function AppContent() {
  const { theme, showLogin, setShowLogin } = useApp();
  const navigate = useNavigate();

   useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/dashboard'); // Redirect if already logged in
      }
    });
    return unsubscribe;
  }, [navigate]);

  return (
    <>
      <Toaster
        reverseOrder={false}
        position="bottom-right"
        toastOptions={{
          style: {
            background: theme === "dark" ? "#334155" : "",
            color: theme === "dark" ? "#fff" : "#1e293b",
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      {/* ✅ Only show if true */}
       {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onLoginSuccess={() => {
            setShowLogin(false);
            navigate("/dashboard");
          }}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

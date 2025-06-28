import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Dashboard from "./pages/companyDashboard/dashboard/Dashboard";
import { Toaster } from "react-hot-toast";
import { useApp } from "./context/Appcontext";
import Login from "./pages/Login/Login";

function AppContent() {
  const { theme, showLogin, setShowLogin } = useApp();

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
        />
      )}
    </>
  );
}

export default function App() {
  return (
      <AppContent />
  );
}

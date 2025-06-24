import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useApp } from "../../context/Appcontext";
import { FaX } from "react-icons/fa6";
import { CiMenuFries } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleTheme, theme, openLogin } = useApp();

  const navLinks = [
    { label: "Features", path: "#features" },
    { label: "How It Works", path: "#howitworks" },
    { label: "FAQ", path: "#faq" },
    { label: "Pricing", path: "#pricing" },
    { label: "Contact Us", path: "#contact" },
  ];

  return (
    <header className="w-full sticky top-0 left-0 z-50 bg-white/20 dark:bg-slate-900/20 backdrop-blur-xl shadow-sm border-b border-white/10 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* App Name */}
        <a
          href="/"
          className="text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight"
        >
          GrowWith<span className="text-primary">Link</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(({ label, path }) => (
            <a
              href={path}
              key={path}
              className="text-neutral-800 dark:text-neutral-300 font-semibold dark:hover:text-primary"
            >
              {label}
            </a>
          ))}

          {/* Login button */}
          {/* Desktop Login Button */}
          <button
            onClick={openLogin}
            className="bg-primary text-white px-4 py-2 rounded-xl font-semibold shadow hover:shadow-md transition"
          >
            Login
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-slate-700 transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="text-2xl font-extrabold"><CiMenuFries /></span>
        </button>
      </div>

      {/* Mobile Nav Menu */}

       <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden top-0 px-4 pb-4 space-y-2 bg-slate-900 absolute flex justify-center items-center flex-col w-[100%] h-[100vh] dark:bg-slate-900 backdrop-blur-md"
          >
             <button className="absolute top-3 font-extrabold right-3" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="text-5xl">×</span>
        </button>
            {navLinks.map(({ label, path }) => (
              <a
                href={path}
                key={path}
                onClick={() => setMenuOpen(false)}
                className="block text-3xl font-semibold transition text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-slate-700"
              >
                {label}
              </a>
            ))}

            <button
              onClick={() => {
                openLogin();
                setMenuOpen(false);
              }}
              className="bg-primary text-white px-5 py-2 rounded-xl font-semibold shadow hover:shadow-md transition"
            >
              Login
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
    </header>
  );
}

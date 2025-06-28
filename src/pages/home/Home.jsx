// File: src/pages/Home/index.jsx
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import Navbar from "./Navbar";
import HowItWorks from "./Howitworks";
import FAQ from './FAQ'
import PricingSection from "./Pricing";
import Contact from "./Contact";
import Policies from "./Policies";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";

export default function Home() {

  const [user, loading] = useAuthState(auth);

  if (user) return <Navigate to="/dashboard" />;

  return (
    <div className="bg-neutral-100 overflow-hidden dark:bg-slate-950 text-slate-900 dark:text-neutral-100 transition-colors duration-300">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <PricingSection />
      <Policies />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
// pages/dashboard/hooks/useDashboardStats.js
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { FiUsers, FiCreditCard, FiZap } from "react-icons/fi";
import { RiExchangeLine } from "react-icons/ri";

export default function useDashboardStats(user) {
  
  const [stats, setStats] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        setStats([
          {
            title: "Total Referrals",
            value: data.totalReferrals?.toLocaleString() || "0",
            change: "+12.5%",
            icon: <FiUsers />,
          },
          {
            title: "Conversion Rate",
            value: data.conversionRate
              ? `${(data.conversionRate * 100).toFixed(1)}%`
              : "0%",
            change: "+3.2%",
            icon: <RiExchangeLine />,
          },
          {
            title: "Payouts Sent",
            value: data.payoutsSent
              ? `$${data.payoutsSent.toLocaleString()}`
              : "$0",
            change: "+18%",
            icon: <FiCreditCard />,
          },
          {
            title: "Active Campaigns",
            value: data.activeCampaigns?.toString() || "0",
            change: "+1",
            icon: <FiZap />,
          },
        ]);
      }
    };

    fetchStats();
  }, [user]);

  return stats;
}


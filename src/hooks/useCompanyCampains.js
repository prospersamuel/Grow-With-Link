// hooks/useCompanyCampaigns.js
import { useState, useEffect } from "react";
import { auth, db } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function useCompanyCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uid, setUid] = useState(auth.currentUser?.uid || null);

  const fetchCampaigns = async (userId) => {
    if (!userId) {
      setCampaigns([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCampaigns(data.campaigns || []);
      } else {
        setError("User data not found.");
      }
    } catch (err) {
      console.error(err);
      setError("Error loading campaigns.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      const currentUid = user?.uid || null;
      setUid(currentUid);
      if (currentUid) {
        fetchCampaigns(currentUid);
      } else {
        setCampaigns([]);
      }
    });
    return unsub;
  }, []);

  const refreshCampaigns = () => {
    if (uid) fetchCampaigns(uid);
  };

  const updateCampaign = async (campaignId, updates) => {
    if (!uid) return;

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const updatedCampaigns = (userData.campaigns || []).map((c) =>
        c.id === campaignId ? { ...c, ...updates } : c
      );
      await updateDoc(userRef, { campaigns: updatedCampaigns });
      setCampaigns(updatedCampaigns);
    }
  };

  const toggleCampaignStatus = async (campaignId) => {
    if (!uid) return;

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const updatedCampaigns = (userData.campaigns || []).map((c) =>
        c.id === campaignId
          ? {
              ...c,
              status: c.status === "active" ? "paused" : "active",
            }
          : c
      );
      await updateDoc(userRef, { campaigns: updatedCampaigns });
      setCampaigns(updatedCampaigns);
    }
  };

  const deleteCampaign = async (campaignId) => {
    if (!uid) return;

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const updatedCampaigns = (userData.campaigns || []).filter(
        (c) => c.id !== campaignId
      );
      await updateDoc(userRef, { campaigns: updatedCampaigns });
      setCampaigns(updatedCampaigns);
    }
  };

  return {
    campaigns,
    loading,
    error,
    refreshCampaigns,
    updateCampaign,
    toggleCampaignStatus,
    deleteCampaign,
  };
}
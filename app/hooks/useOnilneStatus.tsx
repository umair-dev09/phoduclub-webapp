"use client";

import { useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase"; // Replace with your Firebase config path

const useOnlineStatus = () => {
  useEffect(() => {
    // Wait for `auth` state to initialize
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return; // Exit if no user is authenticated

      const userDocRef = doc(db, "users", user.uid); // Reference to the user's Firestore document

      // Function to update Firestore status
      const setOnlineStatus = async (status: boolean) => {
        try {
          await updateDoc(userDocRef, { isOnline: status });
        } catch (error) {
          console.error("Error updating online status:", error);
        }
      };

      // Set `isOnline: true` when user is online
      const handleOnline = () => setOnlineStatus(true);

      // Set `isOnline: false` when user goes offline
      const handleOffline = () => setOnlineStatus(false);

      // Set `isOnline: false` when the user closes or refreshes the tab
      const handleBeforeUnload = () => setOnlineStatus(false);

      // Initial online status
      setOnlineStatus(navigator.onLine);

      // Listen for changes in online/offline status
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
      window.addEventListener("beforeunload", handleBeforeUnload);

      // Cleanup event listeners when the component unmounts
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    });

    return () => unsubscribe();
  }, []);
};

export default useOnlineStatus;

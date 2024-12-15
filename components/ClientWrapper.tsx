"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth"; // Import Firebase auth listener
import { auth } from "@/firebase"; // Adjust path to your Firebase config
import useOnlineStatus from "@/app/hooks/useOnilneStatus";
import { useRouter } from "next/navigation";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useOnlineStatus(); // Call the hook here to monitor online status

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!isAuthenticated) {
    return null; // Show nothing while redirecting or waiting for auth status
  }

  return <>{children}</>;
};

export default ClientWrapper;

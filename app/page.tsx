"use client";
import Image from 'next/image';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import { auth } from '@/firebase';
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { Skeleton } from "@nextui-org/skeleton";
import { MoonLoader } from "react-spinners";
import styles from "./loading.module.css"
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import LoadingData from '@/components/Loading';
export default function Home() {

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const db = getFirestore();

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) {
              setUser(currentUser);
              const userDocRef = doc(db, `users/${currentUser.uid}`);

              try {
                  const docSnapshot = await getDoc(userDocRef);
                  if (docSnapshot.exists()) {
                    router.push("/dashboard");
                  } else {
                      // console.error("User ID not found in Firestore!");
                      setError(true);
                      router.push("/login");
                  }
              } catch (err) {
                  console.error("Error fetching user data:", err);
                  setError(true);
              }
          } else {
              // console.error('No user is logged in');
              setError(true);
              router.push("/login");
          }
      });

      return () => unsubscribe();
  }, [db, router]);

  return (
    <div className="flex justify-center items-center w-[100%] h-screen">
      <MoonLoader
        color="#7400e0"
        size={50}
        speedMultiplier={1.5}
      />
    </div>
  );
}
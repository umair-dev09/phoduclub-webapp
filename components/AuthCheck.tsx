"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth } from '../firebase'; // Adjust the path to your firebase config
import { onAuthStateChanged } from 'firebase/auth';
import LoadingData from './Loading';

function AuthCheck(){
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // If no user is logged in, redirect to the login page
                router.push("/dashboard");
          } else {
                // User is logged in, stop loading
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [router]);
    if (loading) {
        return (
            <LoadingData/>
        );
    }
}

export default AuthCheck;
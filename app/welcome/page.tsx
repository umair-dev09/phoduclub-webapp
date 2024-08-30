// app/(auth-pages)/welcome/page.tsx

"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "../../firebase"; // Adjust the path according to your Firebase config
import { signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

export default function WelcomePage() {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                // If no user is logged in, redirect to the login page
                router.push("/login");
            }
        });

        return () => unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success("Logged out successfully!");
            router.push("/login");
        } catch (error) {
            toast.error("Error logging out. Please try again.");
            console.error("Error logging out:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>You are logged in</h1>
            <button onClick={handleLogout} style={{ marginTop: "20px", padding: "10px 20px" }}>
                Logout
            </button>
        </div>
    );
}

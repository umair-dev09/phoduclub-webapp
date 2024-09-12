"use client";
import 'react-phone-input-2/lib/style.css';
import './signup.css';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from '@/components/AuthComponents/SignupComponents/Signup';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import LoadingData from '@/components/Loading';

export default function Sign() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             // If no user is logged in, redirect to the login page
    //             setTimeout(() => {
    //                 router.push("/dashboard");
    //             }, 0);
    //                   } else {
    //             // User is logged in, stop loading
    //             setLoading(false);
    //         }
    //     });

    //     return () => unsubscribe();
    // }, [router]);
    // if (loading) {
    //     return (
    //         <LoadingData/>
    //     );
    // }  
    onAuthStateChanged(auth, (user) => {
        if (user) {
           router.push("/dashboard");
        } 
        else{
       setLoading(false);
        }
      });
           
      if (loading) {
        return (
            <LoadingData/>
        );
    } 
    return (
        <div className="main_page">
            <div className="signup">
                
                <div>
                  <Signup/>
                </div>
                <span className="page_to_login">
                    <p>Already have an account? <a href="./login">Log In</a></p>
                </span>
            </div>
            <div className="motivation">
                <Image
                    src="/images/test1.png" // Path to your image file
                    alt="Description of image"
                    width={10000} // Desired width
                    height={10000} // Desired height
            
                />
            </div>
            {/* <ToastContainer /> Toast container */}
        </div>
    );
}


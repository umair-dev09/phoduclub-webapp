"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./login.css";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Image from 'next/image';
import { auth } from '../../../firebase'; // Adjust path as needed
import { getAuth, onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import LoadingData from "@/components/Loading";
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore';

export default function Login_Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [phone, setPhone] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [buttonColor, setButtonColor] = useState('#E39FF6'); // Default color
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userDocRef = doc(db, `users/${currentUser.uid}`);
                
                try {
                    const docSnapshot = await getDoc(userDocRef);
                    if (docSnapshot.exists()) {
                        setLoading(false);
                        router.push('/dashboard');
                    }
                } catch (err) {
                    console.error("Error fetching user data:", err);
                }
            }
            setLoading(false);
        });
    
        return () => unsubscribe();
    }, [db, router]);
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
    useEffect(() => {
        if (phone.length >= 10) {
            setIsPhoneValid(true);
            setErrorMessage('');
            setButtonColor('purple');
        } else {
            setIsPhoneValid(false);
            setButtonColor('#E39FF6');
        }
    }, [phone]);

    const handleSendVerificationCode = () => {
        if (!isPhoneValid) {
            setErrorMessage('Please enter a valid phone number.');
            return;
        }

        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response: any) => {
                // reCAPTCHA solved - will proceed with signInWithPhoneNumber
            }
        } ); 

        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, `+${phone}`, appVerifier)
            .then((confirmationResult) => {
                // SMS sent, redirect to verify OTP page
                router.push(`/verifyotp?phone=${encodeURIComponent(phone)}`);
            }).catch((error) => {
                setErrorMessage("Failed to send verification code. Please try again.");
                console.error("Error during phone sign-in:", error);
            });
    };

    return (
        <div className="mainpage">
            <div className="login">
                <div className="phodu_logo">
                    <Image
                        src="/images/phoduclublogo.png"
                        alt="Description of image"
                        width={150}
                        height={25}
                    />
                </div>
                <div className="heading">
                    <p className="head">Welcome Back!</p>
                </div>
                <div className="tagLine">
                    <p>Make yourself prepared, before time ✌</p>
                </div>
                <div>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="inputdiv">
                            <label htmlFor="Number">Phone Number</label>
                            <div className="inputflex">
                                <PhoneInput
                                    country={'in'}
                                    value={phone}
                                    onChange={(phone: any) => setPhone(phone)}
                                    inputProps={{
                                        name: 'phone',
                                        required: true,
                                        autoFocus: true,
                                        placeholder: "+91 00000-00000"
                                    }}
                                    containerClass="phone-input-container"
                                    inputClass="form-input"
                                />
                            </div>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </div>
                        <div id="recaptcha-container"></div> {/* Recaptcha container */}
                        <div className="buttons">
                            <button
                                type="button"
                                className="button"
                                onClick={handleSendVerificationCode}
                                style={{ backgroundColor: buttonColor }}
                                disabled={!isPhoneValid}
                            >
                                Send Verification Code
                            </button>
                        </div>
                    </form> 
                </div>
                <span className="page_to_login">
                    <p>Don't have an account? <a href="./signup">Sign Up</a></p>
                </span>
            </div>
            <div className="motivation ">
                <Image
                    src="/images/test1.png"
                    alt="Description of image"
                    width={10000}
                    height={10000}
                />
            </div>
        </div>
    );
}

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Image from 'next/image';
import { auth } from '../../../firebase'; // Adjust path as needed
import { getAuth, onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import LoadingData from "@/components/Loading";
import { getFirestore, doc, getDoc, onSnapshot, collection, getDocs, query, where } from 'firebase/firestore';

export default function Login_Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [phone, setPhone] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [buttonColor, setButtonColor] = useState('#E39FF6');
    const db = getFirestore();
    const [isLoading, setIsLoading] = useState(false); // Loading state

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

    useEffect(() => {
        if (phone.length >= 10) {
            setIsPhoneValid(true);
            setErrorMessage('');
            setButtonColor('#7400E0');
        } else {
            setIsPhoneValid(false);
            setButtonColor('#E39FF6');
        }
    }, [phone]);

    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                size: 'invisible',
                callback: () => {
                    // reCAPTCHA solved
                },
            });
        }
    };

    const handleSendVerificationCode = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        if (!isPhoneValid) {
            setErrorMessage('Please enter a valid phone number.');
            setIsLoading(false);
            return;
        }

        try {
            const formattedPhone = `+${phone.replace(/[^0-9]/g, '')}`;
            const userRef = collection(db, "users");
            const q = query(userRef, where("phone", "==", formattedPhone));
            const querySnapshot = await getDocs(q);

            // if (!querySnapshot.empty) {
            setupRecaptcha();
            // Trigger Firebase Phone Authentication
            signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;  // Save for OTP verification
                    window.localStorage.setItem('verificationId', confirmationResult.verificationId);
                    router.push(`/verifyotp?phone=${formattedPhone}`);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("SMS not sent:", error);
                    setIsLoading(false);
                    setErrorMessage("Failed to send verification code. Please try again.");
                });

            // } else {
            //     setErrorMessage("Your number is not registered. Please Signup first.");
            //     setIsLoading(false);
            // }

        } catch (error) {
            console.error("Error while login user:", error);
            setIsLoading(false);
        }


    };

    return (
        <div className="flex flex-row w-full h-screen bg-[#F7F8FB]">
            <div className="w-1/2 flex flex-col  ">
                <div className="mt-10 ml-10">
                    <Image
                        src="/images/phoduclublogo.png"
                        alt="Logo"
                        width={150}
                        height={25}
                    />
                </div>
                <div className="flex flex-col mt-12 gap-4 justify-center items-center h-auto w-full">
                    <p className="text-2xl font-bold text-[#101828]">Welcome Back!</p>
                    <span className="text-[#667085] font-medium text-base">Make yourself prepared, before time ✌️</span>
                    <div>
                        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center pt-6 w-full">
                            <div className="flex flex-col w-full">
                                <label htmlFor="Number" className="text-sm text-[#344054] mb-1">Phone Number</label>
                                <PhoneInput
                                    country={'in'}
                                    value={phone}
                                    onChange={(phone) => setPhone(phone)}
                                    inputProps={{
                                        name: 'phone',
                                        required: true,
                                        autoFocus: true,
                                        placeholder: "+91 00000-00000",
                                    }}
                                    inputStyle={{
                                        width: "100%",
                                        borderRadius: "4px",
                                        border: "1px solid #D0D5DD",
                                        height: "42px",
                                        boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                                        outline: "none"
                                    }}
                                    onFocus={(e) => e.target.style.boxShadow = "0 0 0 2px #D6BBFB"}
                                    onBlur={(e) => e.target.style.boxShadow = "0px 1px 2px 0px rgba(16, 24, 40, 0.05)"}
                                />
                                {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                            </div>
                            <div id="recaptcha-container"></div>
                            <div className="flex justify-center mt-8">
                                <button
                                    type="button"
                                    className={`text-white py-2 px-6 rounded-md w-[375px] font-medium flex items-center justify-center`}
                                    style={{ backgroundColor: buttonColor }}
                                    onClick={handleSendVerificationCode}
                                    disabled={!isPhoneValid}
                                >
                                    {isLoading ? (
                                        <div className='w-5 h-5 animate-spin-loading rounded-[50%]  border-4 border-[#ffffff4d] border-solid border-t-4 border-t-customWhite '></div> // Show spinner
                                    ) : (
                                        'Send Verification Code'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                    <span className="text-center text-[#7D7D8A] pt-6">
                        <p>Don&apos;t have an account? <a href="./signup" className="text-[#6646A2] hover:underline font-bold">Sign Up</a></p>
                    </span>
                </div>
            </div>
            <div className="w-1/2 flex items-center justify-center  bg-[#0E2138] rounded-lg m-2">
                <div className="absolute top-4 right-4 w-[400px] h-[400px] bg-[url('/icons/god-rays.png')] bg-cover bg-center bg-no-repeat mix-blend-plus-lighter blur-[12px] pointer-events-none"></div>
                <div className="w-[554px] flex flex-col gap-10 h-auto">
                    <Image
                        src="/icons/coma.svg"
                        width={80}
                        height={80}
                        alt="coma-image"
                    />
                    <h1 className="text-[#EAECF0CC] font-bold text-2xl">Education is the foundation upon which we build our future.</h1>
                    <span className=" text-[#667085] font-normal text-base text-right">- Christine Gregoire</span>
                </div>
            </div>
            <div id="recaptcha-container"></div>
        </div>
    );
}

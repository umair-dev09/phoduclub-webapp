"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
    const [buttonColor, setButtonColor] = useState('#E39FF6');
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
            'callback': (response: any) => { },
        });

        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, `+${phone}`, appVerifier)
            .then((confirmationResult) => {
                router.push(`/verifyotp?phone=${encodeURIComponent(phone)}`);
            }).catch((error) => {
                setErrorMessage("Failed to send verification code. Please try again.");
                console.error("Error during phone sign-in:", error);
            });
    };

    return (
        <div className="flex flex-row w-full h-screen bg-[#F7F8FB]">
            {/* <div className="w-1/2 h-auto bg-[#F7F8FB] flex flex-col">
                <div className="mt-10 ml-10">
                    <Image
                        src="/images/phoduclublogo.png"
                        alt="Logo"
                        width={150}
                        height={25}
                    />
                </div>
                <div className="flex justify-center items-center mt-12">
                    <p className="text-2xl font-bold">Welcome Back!</p>
                </div>
                <div className="flex justify-center items-center mt-2 text-[#98a2b3]">
                    <p>Make yourself prepared, before time ✌</p>
                </div>
                <div>
                    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center pt-10">
                        <div className="flex flex-col w-full">
                            <label htmlFor="Number" className="text-sm text-gray-700 mb-1">Phone Number</label>
                            <PhoneInput
                                country={'in'}
                                value={phone}
                                onChange={(phone) => setPhone(phone)}
                                inputProps={{
                                    name: 'phone',
                                    required: true,
                                    autoFocus: true,
                                    placeholder: "+91 00000-00000",
                                    width: "100%"
                                }}
                                containerClass="w-full"
                                inputClass="w-full border border-gray-300 rounded-md px-3 py-2 text-black"
                            />
                            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                        </div>
                        <div id="recaptcha-container"></div>
                        <div className="flex justify-center mt-8">
                            <button
                                type="button"
                                className={`text-white py-2 px-6 rounded-md w-[375px] font-medium`}
                                style={{ backgroundColor: buttonColor }}
                                onClick={handleSendVerificationCode}
                                disabled={!isPhoneValid}
                            >
                                Send Verification Code
                            </button>
                        </div>
                    </form>
                </div>
                <span className="text-center mt-6 text-gray-600">
                    <p>Don't have an account? <a href="./signup" className="text-purple-600 hover:underline font-bold">Sign Up</a></p>
                </span>
            </div> */}
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
                        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center pt-10">
                            <div className="flex flex-col w-full">
                                <label htmlFor="Number" className="text-sm text-gray-700 mb-1">Phone Number</label>
                                <PhoneInput
                                    country={'in'}
                                    value={phone}
                                    onChange={(phone) => setPhone(phone)}
                                    inputProps={{
                                        name: 'phone',
                                        required: true,
                                        autoFocus: true,
                                        placeholder: "+91 00000-00000",
                                        width: "100%"
                                    }}
                                    containerClass="w-full"
                                    inputClass="w-full border border-gray-300 rounded-md px-3 py-2 text-black"
                                />
                                {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                            </div>
                            <div id="recaptcha-container"></div>
                            <div className="flex justify-center mt-8">
                                <button
                                    type="button"
                                    className={`text-white py-2 px-6 rounded-md w-[375px] font-medium`}
                                    style={{ backgroundColor: buttonColor }}
                                    onClick={handleSendVerificationCode}
                                    disabled={!isPhoneValid}
                                >
                                    Send Verification Code
                                </button>
                            </div>
                        </form>
                    </div>
                    <span className="text-center  text-[#7D7D8A]">
                        <p>Don't have an account? <a href="./signup" className="text-[#6646A2] hover:underline font-bold">Sign Up</a></p>
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
        </div>
    );
}

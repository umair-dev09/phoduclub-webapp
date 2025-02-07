"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, Suspense } from "react";
import { auth } from '../../../firebase'; // Adjust path as needed
import { getAuth, PhoneAuthProvider, signInWithCredential, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, query, where, getDocs, collection, Timestamp } from "firebase/firestore"; // Import Firestore functions
import Image from 'next/image';
import styles from './VerifyOtp.module.css'; // Ensure you import the CSS module
import LoadingData from "@/components/Loading";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { KeyboardEvent as ReactKeyboardEvent, ClipboardEvent as ReactClipboardEvent } from 'react';

interface InputHandlerProps {
    onOtpChange: (otp: string) => void;
    length?: number;
    hasError?: boolean;
    onSubmit?: () => void;
}

const InputHandler = ({ onOtpChange, length = 6, hasError = false, onSubmit }: InputHandlerProps) => {
    const inputsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const inputs = inputsRef.current?.querySelectorAll("input");
        if (inputs) {
            inputs[0]?.focus();
        }
    }, []);

    const updateOTP = () => {
        const inputs = Array.from(inputsRef.current?.querySelectorAll('input') || []);
        const otp = inputs.map(input => input.value.trim()).join('');
        onOtpChange(otp);
    };

    const handleInput = (index: number, value: string) => {
        const inputs = Array.from(inputsRef.current?.querySelectorAll('input') || []);

        // Ensure input is numeric and single digit
        const sanitizedValue = value.replace(/[^0-9]/g, '').slice(0, 1);

        if (inputs[index]) {
            inputs[index].value = sanitizedValue;

            if (sanitizedValue && index < inputs.length - 1) {
                inputs[index + 1]?.focus();
            }
        }

        updateOTP();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const inputs = Array.from(inputsRef.current?.querySelectorAll('input') || []);
        const input = e.target as HTMLInputElement;

        switch (e.key) {
            case 'Enter':
                onSubmit?.();  // ✅ Safe invocation using optional chaining
                break;

            case 'Backspace':
                if (!input.value) {
                    if (index > 0) {
                        inputs[index - 1]?.focus();
                        inputs[index - 1].value = '';
                    }
                } else {
                    input.value = '';
                }
                updateOTP();
                break;

            case 'ArrowLeft':
                e.preventDefault();
                if (index > 0) {
                    inputs[index - 1]?.focus();
                }
                break;

            case 'ArrowRight':
                e.preventDefault();
                if (index < inputs.length - 1) {
                    inputs[index + 1]?.focus();
                }
                break;

            default:
                if (!/^[0-9]$/.test(e.key) && !['Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                    e.preventDefault();
                }
        }
    };

    const handlePaste = (e: ReactClipboardEvent<HTMLInputElement>, index: number) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '');
        const inputs = Array.from(inputsRef.current?.querySelectorAll('input') || []);

        for (let i = 0; i < Math.min(pastedData.length, inputs.length - index); i++) {
            const targetIndex = index + i;
            if (inputs[targetIndex]) {
                inputs[targetIndex].value = pastedData[i];
                if (targetIndex < inputs.length - 1) {
                    inputs[targetIndex + 1]?.focus();
                }
            }
        }

        updateOTP();
    };

    return (
        <div
            id="inputs"
            ref={inputsRef}
            className="flex space-x-2 justify-center"
        >
            {[...Array(length)].map((_, index) => (
                <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    placeholder="-"
                    maxLength={1}
                    pattern="[0-9]*"
                    autoComplete="one-time-code"
                    className={`w-12 h-12 border rounded-md text-center 
                                text-2xl font-medium text-black focus:outline-none 
                                appearance-none transition-colors duration-200
                                ${hasError
                            ? 'border-red-500 focus:border-red-500 focus:ring-[3px] focus:ring-red-200'
                            : 'border-[#98a2b3] focus:border-[#7400e0] focus:ring-[3px] focus:ring-[#D3A7FC]'
                        }`}
                    onInput={(e) => handleInput(index, (e.target as HTMLInputElement).value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={(e) => handlePaste(e, index)}
                    aria-label={`Digit ${index + 1} of OTP`}
                />
            ))}
        </div>
    );
};

function getRandomImageUrl(urls: string[]): string {
    const randomIndex = Math.floor(Math.random() * urls.length);
    return urls[randomIndex];
}
function VerifyOtp() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const phoneNumber = searchParams.get('phone') || '';
    const firstName = searchParams.get('firstName') || '';
    const lastName = searchParams.get('lastName') || '';
    const email = searchParams.get('email') || '';
    const [otp, setOtp] = useState('');
    const [counter, setCounter] = useState(60);
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const [verificationError, setVerificationError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const db = getFirestore(); // Initialize Firestore

    useEffect(() => {
        setOtp('');
        setCounter(60);
        setIsResendEnabled(false);
        setVerificationError(null);
    }, [phoneNumber]);

    useEffect(() => {
        if (counter > 0) {
            const timer = setInterval(() => {
                setCounter(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            setIsResendEnabled(true);
        }
    }, [counter]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true); // Start loading

        const verificationId = window.localStorage.getItem('verificationId'); // Retrieve the verification ID stored during sign-in
        if (!verificationId) {
            alert("No verification ID found. Please retry the process.");
            toast.error("No verification ID found. Please retry the process.");
            setIsLoading(false); // Stop loading
            return;
        }

        const credential = PhoneAuthProvider.credential(verificationId, otp);

        try {
            const userCredential = await signInWithCredential(auth, credential);
            const user = userCredential.user;
            const authId = user.uid;

            const usersRef = collection(db, "users");
            const q = query(usersRef, where("uniqueId", "==", authId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // User is already registered, redirect to welcome page
                toast.success("User already registered, redirecting to welcome page.");
                router.push("/dashboard");
            }

            else {
                const firstNamePart = firstName.slice(0, 4).toLowerCase();
                const lastNamePart = lastName.slice(0, 4).toLowerCase();
                const phoneNumberPart = phoneNumber.slice(-4);
                const userId = `${firstNamePart}${lastNamePart}${phoneNumberPart}`;
                const imageUrls: string[] = [
                    "https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar1.png?alt=media&token=f794198a-0d5b-4542-a7bd-8c8586e4ef85",
                    "https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar2.png?alt=media&token=003f3358-5134-49e7-a414-edd89366b5fb",
                    "https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar3.png?alt=media&token=35414381-9ac0-4742-8661-f4f315a45cc5",
                    "https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar4.png?alt=media&token=534c8508-01f3-477f-ab71-70c08ce9474f",
                    "https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar5.png?alt=media&token=57379dbd-e6d2-42de-a628-37c03621dc23",
                    "https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar6.png?alt=media&token=dac74da1-df0e-4577-9ba5-3fd37a9c1506",
                    "https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar7.png?alt=media&token=2469737e-d267-48ac-b8de-cc472adf169e",
                    "https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar8.png?alt=media&token=40cc97cf-aa18-43df-8a5a-254e0a92c603"
                ]

                const profilePic = getRandomImageUrl(imageUrls);

                // Store user data in Firestore
                await setDoc(doc(db, "users", authId), {
                    name: firstName + " " + lastName,
                    phone: phoneNumber,
                    email: email,
                    uniqueId: authId,
                    userId: userId,
                    profilePic: profilePic,
                    isAvatar: true,
                    isPremium: false,
                    isGuide: false,
                    createdAt: Timestamp.now(),
                });

                toast.success("Correct OTP! You are logged in.");

                // Redirect to /signup/onelaststep with userId as a query parameter
                router.push(`/signup/onelaststep?userId=${authId}`);
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            toast.error("Incorrect OTP. Please try again.");
            setVerificationError("Incorrect OTP. Please try again.");
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    const handleResend = async () => {
        if (isResendEnabled) {
            toast.error("Error resending OTP. Please try again.");
        } else {
            alert("Please wait before resending the OTP.");
        }
    };

    return (
        <div className="w-1/2 flex flex-col h-full">
            <div className="mt-10 ml-10">
                <Image
                    src="/images/phoduclublogo.png"
                    alt="Logo"
                    width={150}
                    height={25}
                />
            </div>
            <button className="flex flex-row gap-2 items-center mt-[20px] ml-10 "
                onClick={() => router.back()}>
                <p>&larr;</p>
                <span className="font-medium text-base text-[#98a2b3]">Back</span>
            </button>
            <div className="flex flex-col mt-[60px] items-center h-full gap-4">
                <h1 className=" text-[#101828] font-bold text-2xl">Verification Code</h1>
                <p className="text-[#667085] font-medium text-base w-[313px] text-center">Please enter the verification code we sent to your mobile <span id="mobile">{phoneNumber}</span></p>
                <div className="flex items-center justify-center pt-4">
                    <InputHandler
                        onOtpChange={setOtp}
                        hasError={verificationError !== null}
                        onSubmit={() => handleSubmit(new Event('submit'))} // ✅ Ensure proper invocation
                    />
                </div>
                <div className="w-full pt-4 flex flex-col items-center justify-center">
                    <button
                        className={`w-1/2 h-10 rounded-lg text-white font-medium text-sm 
                                    ${isLoading || otp.length === 6 ? 'bg-[#7400e0] hover:bg-[#6D0DCC] cursor-pointer' : 'bg-[#d4a9fc] cursor-not-allowed'} 
                                    transition-colors duration-150 
                                    active:opacity-50 shadow-inner-button
                                    flex items-center justify-center`}
                        onClick={handleSubmit}
                        disabled={isLoading || otp.length !== 6} // Ensure disabled when loading or OTP not filled
                    >
                        {isLoading ? (
                            <div className='w-5 h-5 animate-spin-loading rounded-[50%] border-4 border-[#ffffff4d] border-solid border-t-4 border-t-customWhite '></div> // Show spinner
                        ) : (
                            'Continue'
                        )}

                    </button>
                    {verificationError && (
                        <div className="text-red-500 mt-2 text-sm">{verificationError}</div>
                    )}
                </div>
                <div className="pt-4">
                    <p className="text-gray-700">
                        Didn&apos;t receive the code?&nbsp;
                        <a
                            href="#"
                            onClick={handleResend}
                            className={`
                                font-bold transition-colors duration-300 
                                ${isResendEnabled ? 'text-[#9012FF] cursor-pointer' : 'text-[#AD72FF] cursor-not-allowed'} `}
                        >
                            {isResendEnabled ? 'Resend' : `Resend (${counter})`}
                        </a>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
const WrappedVerifyOtp = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <VerifyOtp />
    </Suspense>
);

export default WrappedVerifyOtp;

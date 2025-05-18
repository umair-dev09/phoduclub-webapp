import React, { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from 'next/image';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from '@/firebase';
import { MoonLoader } from "react-spinners";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

declare global {
    interface Window {
        recaptchaVerifier?: any;
        confirmationResult: any;
    }
}

interface OTPInputProps {
    onComplete?: (otp: string) => void;
    length?: number;
    disabled?: boolean;
}

const AdminVerify: React.FC<OTPInputProps> = ({
    onComplete,
    length = 6,
    disabled = false,
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const uniqueId = searchParams.get("uniqueId");
    const phone = searchParams.get("phone");
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [inputValues, setInputValues] = useState<string[]>(Array(6).fill(""));
    const [showLoading, setShowLoading] = useState(false);
    const [timer, setTimer] = useState<number>(60); // Initialize timer to 60 seconds
    const [resendDisabled, setResendDisabled] = useState<boolean>(true); // Disable resend initially
    const [verificationError, setVerificationError] = useState<string | null>(null);
    const [confirmationResultSent, setConfirmationResultSent] = useState<boolean>(false);

    useEffect(() => {
        // Check if we need to re-send the OTP when the component loads
        // This handles cases where the user refreshes the page or confirmation result is lost
        const checkAndResendOTP = async () => {
            if (!window.confirmationResult && phone && !confirmationResultSent) {
                setShowLoading(true);
                try {
                    await setupRecaptcha();
                    const formattedPhone = phone;
                    const result = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
                    window.confirmationResult = result;
                    setConfirmationResultSent(true);
                } catch (error) {
                    console.error("Error re-sending verification code:", error);
                    setVerificationError("Failed to send verification code. Please go back and try again.");
                }
                setShowLoading(false);
            }
        };
        
        checkAndResendOTP();
    }, [phone, confirmationResultSent]);

    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                size: 'invisible',
                callback: () => {
                    // reCAPTCHA solved
                },
            });
        }
        return Promise.resolve();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let value = e.target.value.slice(-1);

        // Ensure the value is numeric
        if (!/^\d$/.test(value)) {
            return;
        }

        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);

        if (value.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // Move to previous input box on backspace when current input is empty
        if (value === "" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        // Handle paste event
        if (e.target.value.length > 1) {
            const pastedValue = e.target.value.split('');
            const updatedValues = [...inputValues];

            for (let i = 0; i < length - index; i++) {
                if (pastedValue[i] && /^\d$/.test(pastedValue[i])) {
                    updatedValues[index + i] = pastedValue[i];
                }
            }

            setInputValues(updatedValues);

            // Focus on the next empty input or the last input
            const nextEmptyIndex = updatedValues.findIndex((val, idx) => idx > index && !val);
            const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
            inputRefs.current[focusIndex]?.focus();

            // Trigger onComplete if all fields are filled
            if (!updatedValues.includes('')) {
                onComplete?.(updatedValues.join(''));
            }
            return;
        }

        // Auto-focus next input if current input is filled
        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // Check if all inputs are filled and trigger onComplete
        if (value && !newInputValues.includes('')) {
            onComplete?.(newInputValues.join(''));
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');

        // Only allow numeric paste
        const numericData = pastedData.replace(/\D/g, ''); // Remove any non-digit characters
        if (numericData) {
            const event = {
                target: { value: numericData },
            } as React.ChangeEvent<HTMLInputElement>;
            handleInputChange(event, index);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        // Handle backspace
        if (e.key === 'Backspace') {
            e.preventDefault();

            const newInputValues = [...inputValues];

            // If current input has value, clear it
            if (newInputValues[index]) {
                newInputValues[index] = '';
                setInputValues(newInputValues);
            }
            // If current input is empty, clear previous input and focus on it
            else if (index > 0) {
                newInputValues[index - 1] = '';
                setInputValues(newInputValues);
                inputRefs.current[index - 1]?.focus();
            }
        }

        if (e.key === 'Enter') {
            // Only trigger if all inputs are filled
            if (inputValues.every(value => value)) {
                verifyOTP();
            }
            return;
        }

        // Handle left arrow
        if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        // Handle right arrow
        if (e.key === 'ArrowRight' && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const verifyOTP = async () => {
        const otp = inputValues.join('');
        if (otp.length !== 6) return;
        
        setShowLoading(true);
        setVerificationError(null);
        
        try {
            if (!window.confirmationResult) {
                throw new Error("Verification session has expired. Please go back and try again.");
            }
            
            const result = await window.confirmationResult.confirm(otp);
            const currentAuthId = result.user.uid;

            // Check if uniqueId exists
            if (!uniqueId) {
                throw new Error("Admin ID not found");
            }
            
            // Get the admin document using the uniqueId from URL parameter
            const existingAdminDocRef = doc(db, "admin", uniqueId);
            const existingAdminSnapshot = await getDoc(existingAdminDocRef);

            if (existingAdminSnapshot.exists()) {
                // Update the document with the auth ID stored in userId field
                await updateDoc(existingAdminDocRef, {
                    userId: currentAuthId
                });

                // Redirect after successfully linking auth ID with admin account
                router.push('/admin');
                setVerificationError('');
            } else {
                throw new Error("Admin document not found");
            }
        } catch (error: any) {
            console.error("OTP verification failed:", error);
            
            // Display more specific error messages
            if (error.message === "Verification session has expired. Please go back and try again.") {
                setVerificationError(error.message);
            } else if (error.code === "auth/invalid-verification-code") {
                setVerificationError("Invalid verification code. Please try again.");
            } else if (error.code === "auth/code-expired") {
                setVerificationError("Verification code has expired. Please request a new code.");
            } else {
                setVerificationError("Failed to verify. Please try again or go back to request a new code.");
            }
        } finally {
            setShowLoading(false);
        }
    };

    // Countdown logic
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval); // Cleanup on unmount
        } else {
            setResendDisabled(false); // Enable resend button when timer hits 0
        }
    }, [timer]);

    const handleResend = async () => {
        if (resendDisabled || !phone) return;
        
        setShowLoading(true);
        setVerificationError(null);
        setTimer(60); // Reset the timer
        setResendDisabled(true); // Disable the resend button
        
        try {
            await setupRecaptcha();
            const formattedPhone = phone;
            const result = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
            window.confirmationResult = result;
            setConfirmationResultSent(true);
        } catch (error) {
            console.error("Error resending verification code:", error);
            setVerificationError("Failed to resend verification code. Please go back and try again.");
        } finally {
            setShowLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-10 h-screen w-screen">
            <div className="w-[500px]">
                <button className="flex flex-row text-left gap-2"
                    onClick={() => router.back()}>
                    <p>&larr;</p>
                    <span className="font-medium text-base text-[#98a2b3]">Back</span>
                </button>
            </div>
            <div className=" flex flex-col justify-center items-center">
                <Image src="/images/phoduclublogo.png" alt="Description of image" width={134} height={20} />
                <p className="text-[12px] text-[#667085]">Admin</p>
            </div>
            <MoonLoader className={`self-center mt-[-30px] mb-[-30px] ${showLoading ? 'visible' : 'invisible'}`} color="#7400e0" size={32} speedMultiplier={1.5} />
            <h3 className="text-2xl font-bold ">Verification Code</h3>
            <p className="text-center font-medium text-[#667085] w-[19.563rem] ">
                Please enter the verification code we sent to your mobile
                <button className="text-[#9012FF] ml-2" onClick={() => { router.back() }}>Edit</button>
            </p>
            <div className="flex flex-col gap-6">
                <div className="flex flex-row gap-3">
                    {[...Array(length)].map((_, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            className={`w-16 h-16 
                                        border-2 rounded-lg py-1 px-2 text-center text-4xl font-semibold 
                                        text-[#0E2138] placeholder-gray-400 focus:outline-none focus:ring-4 transition-colors
                                        ${verificationError
                                    ? 'border-[#F04438] focus:border-[#F04438] focus:ring-[#F8D7DA]'
                                    : 'border-[#D0D5DD] focus:border-[#8601FF] focus:ring-[#D3A7FC]'}
                                        ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                                    `}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            placeholder="-"
                            value={inputValues[index]}
                            onChange={(e) => handleInputChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            disabled={disabled}
                            onPaste={(e) => {
                                e.preventDefault();
                                const pastedData = e.clipboardData.getData('text');
                                if (!/^\d+$/.test(pastedData)) return; // Only allow numeric paste
                                const event = {
                                    target: { value: pastedData },
                                } as React.ChangeEvent<HTMLInputElement>;
                                handleInputChange(event, index);
                            }}
                        />
                    ))}
                </div>
                {verificationError && (
                    <p className="text-sm text-[#F04438] text-center font-medium leading-[21px]">
                        {verificationError}
                    </p>
                )}
            </div>
            <button
                className={`w-[24.688rem] border-b shadow-inner-button rounded-md text-white text-sm font-semibold py-[0.625rem] transition-colors ${inputValues.every(value => value) && !showLoading ? 'bg-[#8601FF] hover:bg-[#6D0DCC]  border-[#8601FF]' : 'bg-[#D3A7FC] border-[#D3A7FC] cursor-not-allowed'}`}
                onClick={verifyOTP}
                disabled={!inputValues.every(value => value) && !showLoading}
            >
                Done
            </button>
            <p className="text-base text-[#7D7D8A] font-medium leading-6">
                Didn’t receive the code?{" "}
                <span
                    className={`text-[#9012FF] font-semibold cursor-pointer hover:underline ${resendDisabled ? 'pointer-events-none opacity-50' : ''}`}
                    onClick={handleResend}
                >
                    Resend{resendDisabled ? `(${timer})` : ""}
                </span>
            </p>
        </div>
    );
};

export default AdminVerify;
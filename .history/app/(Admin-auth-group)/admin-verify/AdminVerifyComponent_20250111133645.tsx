import React, { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from 'next/image';
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from '@/firebase';
import { MoonLoader } from "react-spinners";

const AdminVerify: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const adminId = searchParams.get("adminId");
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [inputValues, setInputValues] = useState<string[]>(Array(6).fill(""));
    const [showLoading, setShowLoading] = useState(false);
    const [timer, setTimer] = useState<number>(60); // Initialize timer to 60 seconds
    const [resendDisabled, setResendDisabled] = useState<boolean>(true); // Disable resend initially
    const [verificationError, setVerificationError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
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
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        // Move to previous input box on backspace when current input is empty
        if (e.key === 'Backspace' && inputValues[index] === "" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const verifyOTP = async () => {
        const otp = inputValues.join('');
        if (otp.length !== 6) return;
        setShowLoading(true);
        try {
            const result = await window.confirmationResult.confirm(otp);
            const currentUserId = result.user.uid;
            // Check if a document with the authId (currentUserId) already exists
            const existingAdminDocRef = doc(db, "admin", currentUserId);
            const existingAdminSnapshot = await getDoc(existingAdminDocRef);

            if (existingAdminSnapshot.exists()) {
                // If a document with currentUserId exists, allow login without data migration
                router.push('/admin');
                setShowLoading(false);
            } else if (adminId) {
                // If no document with currentUserId exists, proceed with data migration
                const adminDocRef = doc(db, "admin", adminId);
                const adminSnapshot = await getDoc(adminDocRef);

                if (adminSnapshot.exists()) {
                    const adminData = adminSnapshot.data();

                    // Create a new document with currentUserId and migrate data
                    await setDoc(existingAdminDocRef, {
                        ...adminData,
                        adminId: currentUserId // Explicitly set authId as a field in the new document
                    });

                    // Delete the old admin document
                    await deleteDoc(adminDocRef);
                }

                // Redirect to the admin page after OTP verification and data migration
                router.push('/admin');
                setShowLoading(false);
                setVerificationError('');

            }
        } catch (error) {
            console.error("OTP verification or data migration failed:", error);
            setShowLoading(false);
            setVerificationError("Incorrect OTP. Please try again.");
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

    const handleResend = () => {
        // Logic to resend the OTP (e.g., call an API)
        setTimer(60); // Reset the timer
        setResendDisabled(true); // Disable the resend button
        console.log("OTP resent");
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
                <div className="flex flex-row gap-3 ">
                    {[...Array(6)].map((_, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            className={`w-16 h-16 ${verificationError ? 'border-2 border-[#F04438]' : 'border-2'}  rounded-lg py-1 px-2 text-center text-4xl font-semibold text-[#0E2138] placeholder-gray-400 focus:border-[#8601FF] focus:outline-none focus:ring-4 focus:ring-[#D3A7FC]`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            placeholder="-"
                            value={inputValues[index]}
                            onChange={(e) => {
                                const isNumeric = /^\d?$/.test(e.target.value); // Allow only numeric input
                                if (isNumeric) handleInputChange(e, index);
                            }}
                            onKeyDown={(e) => handleKeyDown(e, index)}
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
            {/* <p className="text-base text-[#7D7D8A] font-medium leading-6">
                Didn’t receive the code? <span className="text-[#9012FF] font-semibold cursor-pointer hover:underline">Resend(60)</span>
            </p> */}
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

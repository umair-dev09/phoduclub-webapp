"use client";
import React, { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from 'next/image';
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from '@/firebase';

const AdminVerify: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const adminId = searchParams.get("adminId");
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [inputValues, setInputValues] = useState<string[]>(Array(6).fill(""));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);

        if (value.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
        if (value === "" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const verifyOTP = async () => {
        const otp = inputValues.join('');
        if (otp.length !== 6) return;

        try {
            const result = await window.confirmationResult.confirm(otp);
            const currentUserId = result.user.uid;

            // Check if a document with the authId (currentUserId) already exists
            const existingAdminDocRef = doc(db, "admin", currentUserId);
            const existingAdminSnapshot = await getDoc(existingAdminDocRef);

            if (existingAdminSnapshot.exists()) {
                // If a document with currentUserId exists, allow login without data migration
                router.push('/admin');
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
            }
        } catch (error) {
            console.error("OTP verification or data migration failed:", error);
        }
    };


    return (
        <div className="flex flex-col items-center  pt-15 gap-10">
            <div className=" flex flex-col  items-center">
                <Image src="/images/phoduclublogo.png" alt="Description of image" width={134} height={20} />
                <p className="text-[12px] text-[#667085]">Admin</p>
            </div>
            <h3 className="text-2xl font-bold ">Verification Code</h3>
            <p className="text-center font-medium text-[#667085] w-[19.563rem] ">
                Please enter the verification code we sent to your mobile
                <button className="text-[#9012FF] ml-2">Edit</button>
            </p>
            <div className="flex flex-row gap-3 ">
                {[...Array(6)].map((_, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="w-16 h-16 border border-gray-300 rounded-lg py-1 px-2 text-center text-4xl font-semibold text-[#0E2138] placeholder-gray-400 focus:border-[#8601FF] focus:outline-none focus:ring-4 focus:ring-[#D3A7FC]"
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        placeholder="-"
                        value={inputValues[index]}
                        onChange={(e) => handleInputChange(e, index)}
                    />
                ))}
            </div>
            <button
                className={`w-[24.688rem] border-b shadow-inner-button rounded-md text-white text-sm font-semibold py-[0.625rem] transition-colors ${inputValues.every(value => value) ? 'bg-[#8601FF] border-[#8601FF]' : 'bg-[#D3A7FC] border-[#D3A7FC] cursor-not-allowed'}`}
                onClick={verifyOTP}
                disabled={!inputValues.every(value => value)}
            >
                Done
            </button>
        </div>
    );
};

export default AdminVerify;

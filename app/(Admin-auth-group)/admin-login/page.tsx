"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from 'react-phone-input-2';
import { MoonLoader } from "react-spinners";
import 'react-phone-input-2/lib/style.css';
import Image from 'next/image';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from '@/firebase'; 
import { onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore, doc } from 'firebase/firestore';

declare global {
    interface Window {
        recaptchaVerifier?: any;
        customConfirmationResult?: any;
    }
}

function AdminLoginPage() {
    const router = useRouter();
    const [phone, setPhone] = useState('');
    const [uniqueId, setUniqueId] = useState('');
    const [docId, setDocId] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [showLoading, setShowLoading] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [currentInputField, setCurrentInputField] = useState<'uniqueId' | 'phone'>('uniqueId');
    const [isPhoneValid, setIsPhoneValid] = useState(false);

    const handlePhoneChange = (value: string): void => {
        if (value.length <= 12) {
            setPhone(value);
            if (phoneError) {
                setPhoneError('');
            }
        }
    };

    useEffect(() => {
        if (phone.length === 12) {
            setIsPhoneValid(true);
        } else {
            setIsPhoneValid(false);
        }
    }, [phone]);

    useEffect(() => {
        setButtonDisabled(uniqueId.trim() === '' || phone.length !== 12);
    }, [uniqueId, phone]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const adminRef = collection(db, "admin");
                const q = query(adminRef, where("userId", "==", currentUser.uid));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    router.push('/admin');
                }
            }
        });

        return () => unsubscribe();
    }, [router]);

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

    const handleSendOtp = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setUsernameError('');
        setPhoneError('');
        setShowLoading(true);

        if (uniqueId.trim() === '' || phone.length !== 12) {
            if (uniqueId.trim() === '') setUsernameError('Incorrect User ID');
            if (phone.length !== 12) setPhoneError('Please enter a complete phone number');
            setShowLoading(false);
            return;
        }

        try {
            const formattedPhone = `+${phone.replace(/[^0-9]/g, '')}`;
            const adminRef = collection(db, "admin");

            const q = query(adminRef, where("uniqueId", "==", uniqueId), where("phone", "==", formattedPhone));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const adminDoc = querySnapshot.docs[0];
                setDocId(adminDoc.id);
                const adminData = adminDoc.data();

                setupRecaptcha();

                signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier)
                    .then((confirmationResult) => {
                        window.confirmationResult = confirmationResult;

                        // Pass both uniqueId and phone to the verification page
                        router.push(`/admin-verify?uniqueId=${adminDoc.id}&phone=${encodeURIComponent(formattedPhone)}`);
                        setShowLoading(false);
                    })
                    .catch((error) => {
                        console.error("SMS not sent:", error);
                        setShowLoading(false);
                    });
            } else {
                const uniqueIdExists = !(await getDocs(query(adminRef, where("uniqueId", "==", uniqueId)))).empty;
                const phoneExists = !(await getDocs(query(adminRef, where("phone", "==", formattedPhone)))).empty;

                if (uniqueIdExists && phoneExists) {
                    setUsernameError("User ID and phone number are not linked or incorrect");
                } else {
                    if (!uniqueIdExists) setUsernameError('Incorrect User ID');
                    if (!phoneExists) setPhoneError('Phone number is incorrect');
                }
                setShowLoading(false);
            }
        } catch (error) {
            console.error("Error checking admin data:", error);
            setShowLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (currentInputField === 'uniqueId' && uniqueId.trim() !== '' && phone.length !== 12) {
                const phoneInput = document.querySelector('.react-tel-input input');
                if (phoneInput instanceof HTMLElement) {
                    phoneInput.focus();
                    setCurrentInputField('phone');
                }
            } else if (currentInputField === 'phone' && uniqueId.trim() === '' && phone.length === 12) {
                const userIdInput = document.querySelector('input[type="text"]');
                if (userIdInput instanceof HTMLElement) {
                    userIdInput.focus();
                    setCurrentInputField('uniqueId');
                }
            } else if (!buttonDisabled) {
                handleSendOtp(e as any);
            }
        }
    };

    return (
        <div className="bg-[#f7f8fb] h-screen w-screen flex justify-center items-center">
            <div className="flex flex-col w-[395px] h-[auto] gap-3">
                <div className="flex flex-col justify-center items-center">
                    <Image
                        src="/images/phoduclublogo.png"
                        alt="Description of image"
                        width={134}
                        height={20}
                    />
                    <p className="text-[12px] text-[#667085]">Admin</p>
                </div>

                <MoonLoader className={`self-center ${showLoading ? 'visible' : 'invisible'}`} color="#7400e0" size={32} speedMultiplier={1.5} />

                <div className="mt-2">
                    <form onSubmit={handleSendOtp}>
                        <div className="mb-4">
                            <label className='text-[14px] text-[#344054] font-medium'>User ID</label>
                            <div className={`flex flex-col mt-1 border border-solid ${usernameError ? 'border-red-500' : 'border-[#D0D5DD]'} rounded-md shadow-sm`}>
                                <input
                                    type="text"
                                    placeholder='Admin'
                                    value={uniqueId}
                                    onChange={(e) => setUniqueId(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    onFocus={() => setCurrentInputField('uniqueId')}
                                    maxLength={25}
                                    className="w-full rounded-md h-[40px] pl-2 text-[#344054] font-normal text-sm border-none focus:ring-0 focus:border-black focus:outline-none shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                                />
                            </div>
                            {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
                        </div>

                        <div className="mb-4">
                            <label className='text-[14px] text-[#344054] font-medium'>Phone Number</label>
                            <div className="mt-1">
                                <PhoneInput
                                    country={'in'}
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    inputProps={{
                                        name: 'phone',
                                        required: true,
                                        autoFocus: true,
                                        placeholder: "+91 00000-00000",
                                        onKeyDown: handleKeyDown,
                                        onFocus: () => setCurrentInputField('phone')
                                    }}
                                    containerClass="phone-input-container"
                                    inputClass="forminput"
                                    inputStyle={{
                                        width: '395px',
                                        height: '42px',
                                        borderRadius: "8px",
                                        border: phoneError ? "1px solid red" : "1px solid #D0D5DD",
                                        boxShadow: "0px 1px 2px 0px #1018280D",
                                    }}
                                />
                            </div>
                            {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
                        </div>
                        <button
                            className={`mt-3 h-[48px] w-full rounded-md shadow-inner-button ${buttonDisabled ? 'bg-[#d8acff]' : 'hover:bg-[#6D0DCC] bg-[#8501FF]'}`}
                            disabled={buttonDisabled}
                        >
                            <span className="font-semibold text-sm text-[#FFFFFF]">Send Verification Code</span>
                        </button>
                    </form>
                </div>
                <div id="recaptcha-container"></div>
            </div>
        </div>
    );
}

export default AdminLoginPage;

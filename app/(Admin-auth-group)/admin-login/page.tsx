"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from 'react-phone-input-2';
import { MoonLoader } from "react-spinners"; 
import 'react-phone-input-2/lib/style.css';
import Image from 'next/image';
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db, auth } from '@/firebase'; // Ensure auth is imported from Firebase
import { getAuth, onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore';

function Login() {
    const router = useRouter();
    const [phone, setPhone] = useState('');
    const [Name, setName] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [showLoading, setShowLoading] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [adminId, setAdminId] = useState('');
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userDocRef = doc(db, `admin/${currentUser.uid}`);
                
                try {
                    const docSnapshot = await getDoc(userDocRef);
                    if (docSnapshot.exists()) {
                        // setLoading(false);
                        router.push('/admin');
                    }
                } catch (err) {
                    console.error("Error fetching user data:", err);
                }
            }
            // setLoading(false);
        });
    
        return () => unsubscribe();
    }, [db, router]);

    useEffect(() => {
        setButtonDisabled(Name.trim() === '' || phone.trim() === '');
    }, [Name, phone]);

    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
                size: 'invisible',
                callback: () => {
                    // reCAPTCHA solved
                },
            });
        }
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setUsernameError('');
        setPhoneError('');
        setShowLoading(true);

        if (Name.trim() === '' || phone.trim() === '') {
            if (Name.trim() === '') setUsernameError('Incorrect User ID');
            if (phone.trim() === '') setPhoneError('Please enter a correct mobile number');
            return;
        }

        try {
            const formattedPhone = `+${phone.replace(/[^0-9]/g, '')}`;
            const adminRef = collection(db, "admin");
            const q = query(adminRef, where("userId", "==", Name), where("phone", "==", formattedPhone));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const adminDoc = querySnapshot.docs[0];
                setAdminId(adminDoc.id);  // Store adminId

                setupRecaptcha(); 

                // Trigger Firebase Phone Authentication
                signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier)
                    .then((confirmationResult) => {
                        window.confirmationResult = confirmationResult;  // Save for OTP verification
                        router.push(`/admin-verify?adminId=${adminDoc.id}`);
                        setShowLoading(false);   
                    })
                    .catch((error) => {console.error("SMS not sent:", error);     setShowLoading(false);                       }
                );

            } else {
                // Username or phone number errors
                const usernameExists = !(await getDocs(query(adminRef, where("userId", "==", Name)))).empty;
                const phoneExists = !(await getDocs(query(adminRef, where("phone", "==", formattedPhone)))).empty;
                if (usernameExists && phoneExists) {
                    setUsernameError("User ID and phone number are not linked or incorrect");
                } else {
                    if (!usernameExists) setUsernameError('Incorrect User ID');
                    if (!phoneExists) setPhoneError('Phone number is incorrect');
                }
                setShowLoading(false);   
            }
        } catch (error) {
            console.error("Error checking admin data:", error);
        }
    };


    return (
        <div className="bg-[#f7f8fb] h-screen w-screen flex justify-center items-center ">
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

                {/*Loader*/}
                <MoonLoader className={`self-center ${showLoading ?'visible':'invisible' }`} color="#7400e0" size={32} speedMultiplier={1.5}/>
                {/*Loader*/}

                <div className="mt-2">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className='text-[14px] text-[#344054] font-medium'>User ID</label>
                            <div className={`flex flex-col mt-1 border border-solid ${usernameError ? 'border-red-500' : 'border-[#D0D5DD]'} rounded-md shadow-sm`}>
                                <input
                                    type="text"
                                    placeholder='Admin'
                                    value={Name}
                                    onChange={(e) => setName(e.target.value)}
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
                                    onChange={(phone) => setPhone(phone)}
                                    inputProps={{
                                        name: 'phone',
                                        required: true,
                                        autoFocus: true,
                                        placeholder: "+91 00000-00000"
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
                            className={`mt-3 h-[48px] w-full rounded-md shadow-inner-button ${buttonDisabled ? 'bg-[#d8acff]' : 'bg-[#8501FF]'}`}
                            disabled={buttonDisabled}
                        >
                            <span className="font-semibold text-sm text-[#FFFFFF]">Send Verification Code</span>
                        </button>
                    </form>
                </div>
                <div id="recaptcha-container"></div> {/* Recaptcha element */}
            </div>
           
        </div>
    );
}

export default Login;

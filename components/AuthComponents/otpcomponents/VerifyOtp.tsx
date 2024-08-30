"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { auth } from '../../../firebase'; // Adjust path as needed
import { getAuth, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { toast } from "react-toastify";
import Image from 'next/image';
import styles from './VerifyOtp.module.css'; // Ensure you import the CSS module

const InputHandler = ({ onOtpChange }: { onOtpChange: (otp: string) => void }) => {
    const inputsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const inputs = inputsRef.current?.querySelectorAll("input");

        if (inputs) {
            inputs.forEach((input, index) => {
                input.addEventListener("input", (e: Event) => handleInput(e, index));
                input.addEventListener("keyup", handleKeyup);
            });

            return () => {
                inputs.forEach((input) => {
                    input.removeEventListener("keyup", handleKeyup);
                });
            };
        }
    }, []);

    const handleInput = (e: Event, index: number) => {
        const target = e.target as HTMLInputElement;
        const val = target.value.trim();

        if (val !== "") {
            const next = target.nextElementSibling as HTMLInputElement | null;
            if (next) {
                next.focus();
            }
        }

        const otp = Array.from(inputsRef.current?.querySelectorAll('input') || []).map(input => input.value.trim()).join('');
        onOtpChange(otp);

        const allFilled = Array.from(inputsRef.current?.querySelectorAll('input') || []).every(
            input => input.value.trim() !== ""
        );

        if (allFilled) {
            document.querySelector('.button')?.classList.add('enabled');
            document.querySelector('.button')?.classList.remove('disabled');
        } else {
            document.querySelector('.button')?.classList.remove('enabled');
            document.querySelector('.button')?.classList.add('disabled');
        }
    };

    const handleKeyup = (e: KeyboardEvent) => {
        const target = e.target as HTMLInputElement;
        const key = e.key.toLowerCase();

        if (key === "backspace" || key === "delete") {
            target.value = "";
            const prev = target.previousElementSibling as HTMLInputElement | null;
            if (prev) {
                prev.focus();
            }
        }
    };

    return (
        <div id="inputs" ref={inputsRef} className="inputs">
            <input className={styles.input} type="text" inputMode="numeric" maxLength={1} placeholder="-" />
            <input className={styles.input} type="text" inputMode="numeric" maxLength={1} placeholder="-" />
            <input className={styles.input} type="text" inputMode="numeric" maxLength={1} placeholder="-" />
            <input className={styles.input} type="text" inputMode="numeric" maxLength={1} placeholder="-" />
            <input className={styles.input} type="text" inputMode="numeric" maxLength={1} placeholder="-" />
            <input className={styles.input} type="text" inputMode="numeric" maxLength={1} placeholder="-" />
        </div>
    );
};

function VerifyOtp() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const phoneNumber = searchParams.get('phone') || '';
    const name = searchParams.get('name') || '';
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
          const userId = user.uid;
  
          // Store user data in Firestore
          await setDoc(doc(db, "users", userId), {
              name: name,
              phone: phoneNumber,
              email: email,
              userId: userId
          });
  
          toast.success("Correct OTP! You are logged in.");
  
          // Redirect to /signup/onelaststep with userId as a query parameter
          router.push(`/signup/onelaststep?userId=${userId}`);
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
        <div className={styles.verify}>
            <div className={styles.logo}>
                <Image
                    src="/images/phoduclublogo.png"
                    alt="Description of image"
                    width={150}
                    height={25}
                />
            </div>
            <div className={styles.return}>
                <a href="">&larr; Back</a>
            </div>
            <div className={styles.container_2}>
                <div className={styles.heading}>
                    <p className={styles.head}>Verification Code</p>
                </div>
                <div className={styles.instructionContainer}>
                    <div className={styles.instruction}>
                        <p>Please enter the verification code we sent to your mobile <span id="mobile">{phoneNumber}</span></p>
                    </div>
                </div>
                <div className={styles.container_3}>
                    <InputHandler onOtpChange={setOtp} />
                </div>
                <div className={styles.buttons}>
                    <button
                        className={`button ${otp.length === 6 ? 'enabled' : 'disabled'}`}
                        onClick={handleSubmit}
                        disabled={isLoading} // Disable button when loading
                    >
                        {isLoading ? (
                            <div className={styles.spinner}></div> // Show spinner
                        ) : (
                            'Continue'
                        )}
                    </button>
                    {verificationError && <div className="error">{verificationError}</div>}
                </div>
                <div className={styles.instruction}>
                    <p>
                        Didn't receive the code?&#160;
                        <a
                            href="#"
                            className={styles.resend}
                            id="request"
                            onClick={handleResend}
                            style={{ color: isResendEnabled ? '#9012FF' : '#AD72FF' }}
                        >
                            {isResendEnabled ? 'Resend' : `Resend(${counter})`}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default VerifyOtp;

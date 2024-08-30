"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
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
                // input.removeEventListener("input", (e: Event) => handleInput(e, index));
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
      
          // Collect the OTP value
          const otp = Array.from(inputsRef.current?.querySelectorAll('input') || []).map(input => input.value.trim()).join('');
          onOtpChange(otp);
      
          // Enable the button if all inputs are filled
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
            <input className={styles.input} type="text" inputMode="numeric" maxLength={1} placeholder="-"/>
            <input className={styles.input} type="text" inputMode="numeric" maxLength={1} placeholder="-"/>
            <input className={styles.input} type="text" inputMode="numeric" maxLength={1} placeholder="-"/>
            <input className={styles.input} type="text" inputMode="numeric" maxLength={1} placeholder="-"/>
            <input className={styles.input} type="text" inputMode="numeric" maxLength={1} placeholder="-"/>
            <input className={styles.input} type="text" inputMode="numeric" maxLength={1} placeholder="-"/>
          </div>
        );
      };

      function VerifyOtp(){
      const router = useRouter();
      const searchParams = useSearchParams();
      const phoneNumber = searchParams.get('phone') || '';
      const [otp, setOtp] = useState('');
      const [counter, setCounter] = useState(60);
      const [isResendEnabled, setIsResendEnabled] = useState(false);
      const [verificationError, setVerificationError] = useState<string | null>(null);
    
      // Reset state on component mount or when phoneNumber changes
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
         alert("Hii")
      };
    
      const handleResend = async () => {
        if (isResendEnabled) {
           toast.error("Error");
        } else {
          alert("Please wait before resending the OTP.");
        }
      };
return(
    <div className={styles.verify}>
        <div className={styles.logo}>
          <Image
            src="/images/phoduclublogo.png" // Path to your image file
            alt="Description of image"
            width={150} // Desired width
            height={25} // Desired height
          />
        </div>
        <div className={styles.return}>
          <a href="">&larr; Back</a>
        </div>
        <div className={styles.container_2}>
          <div className={styles.heading}>
            <p className={styles.head}>Verification Code</p>
          </div>
          <div className={styles.instruction}>
            <p>Please enter the verification code we sent to your mobile <span id="mobile">{phoneNumber}</span></p>
          </div>
          <div className={styles.container_3}>
            <InputHandler onOtpChange={setOtp} />
          </div>
          <div className={styles.buttons}>
            <button className={`button ${otp.length === 6 ? 'enabled' : 'disabled'}`} onClick={handleSubmit}>Continue</button>
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
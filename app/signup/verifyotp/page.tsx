"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import './verify.css';
import { supabase } from "@/utils/supabase/client";
import Image from 'next/image';

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
          input.removeEventListener("input", (e: Event) => handleInput(e, index));
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
      <input className="input" type="text" inputMode="numeric" maxLength={1} />
      <input className="input" type="text" inputMode="numeric" maxLength={1} />
      <input className="input" type="text" inputMode="numeric" maxLength={1} />
      <input className="input" type="text" inputMode="numeric" maxLength={1} />
      <input className="input" type="text" inputMode="numeric" maxLength={1} />
      <input className="input" type="text" inputMode="numeric" maxLength={1} />
    </div>
  );
};

export default function VerifyOtp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get('phone') || '';
  const [otp, setOtp] = useState('');
  const [counter, setCounter] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

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

    if (otp.length === 6) {
      try {
        const { error } = await supabase.auth.verifyOtp({
          phone: phoneNumber,
          token: otp,
          type: 'sms' // Specify 'sms' for phone OTP
        });

        if (error) {
          console.error(error.code + " " + error.message);
          setVerificationError("Error verifying OTP. Please try again.");
        } else {
          alert("OTP verified successfully!");
          router.push('/some/other/page'); // Change this to the desired path
        }
      } catch (error) {
        console.error("An unexpected error occurred: ", error);
        setVerificationError("An unexpected error occurred. Please try again.");
      }
    } else {
      setVerificationError("Please enter a valid OTP.");
    }
  };

  const handleResend = async () => {
    if (isResendEnabled) {
      try {
        const { error } = await supabase.auth.signInWithOtp({
          phone: phoneNumber,
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) {
          console.error(error.code + " " + error.message);
          alert("Error sending OTP. Please try again.");
        } else {
          alert("OTP has been resent to your phone.");
          setCounter(60); // Reset timer
          setIsResendEnabled(false); // Disable resend button
        }
      } catch (error) {
        console.error("An unexpected error occurred: ", error);
        alert("An unexpected error occurred. Please try again.");
      }
    } else {
      alert("Please wait before resending the OTP.");
    }
  };

  return (
    <div className="container">
      <div className="verify">
        <div className="logo">
          <p>phodu.club</p>
        </div>
        <div className="return">
          <a href="">&larr; Back</a>
        </div>
        <div className="container-2">
          <div className="heading">
            <p className="head">Verification Code</p>
          </div>
          <div className="instruction">
            <p>Please enter the verification code we sent to your mobile <span id="mobile">{phoneNumber}</span></p>
          </div>
          <div className="container-3">
            <InputHandler onOtpChange={setOtp} />
          </div>
          <div className="buttons">
            <button className="button disabled" onClick={handleSubmit}>Continue</button>
            {verificationError && <div className="error">{verificationError}</div>}
          </div>
          <div className="instruction">
            <p>
              Didn't receive the code?&#160; 
              <a href="javascript:void(0)" className="resend" id="request" onClick={handleResend}>Resend(<span>{counter}</span>)</a>
            </p>
          </div>
        </div>
      </div>
      <div className="quote-section">
      <Image
        src="/images/test1.png" // Path to your image file
        alt="Description of image"
        width={10000} // Desired width
        height={10000} // Desired height
        />
         {/* <div className="inv_comma"></div>
        <div className="godRays">
        <Image
        src="/images/godrays.png" // Path to your image file
        alt="Description of image"
        width={900} // Desired width
        height={900} // Desired height
        />
        </div>
        <div className="quote">
          <p>Education is the foundation upon which we build our future.</p>
        </div>
        <div className="teller">
          <p>— Christine Gregoire</p>
        </div> */}
      </div> 
    </div>
  );
}

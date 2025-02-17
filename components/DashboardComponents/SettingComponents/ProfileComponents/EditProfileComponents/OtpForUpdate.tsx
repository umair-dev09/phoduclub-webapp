// OtpForUpdate.tsx
import { Dialog } from '@headlessui/react';
import { useEffect, useRef, useState } from 'react';
import styles from '../Profile.module.css';
import Image from 'next/image';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { auth } from '@/firebase';
import { onAuthStateChanged, User, updatePhoneNumber, PhoneAuthProvider } from 'firebase/auth';
import LoadingData from '@/components/Loading';
import { toast } from 'react-toastify';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

// Update the Props type
type OtpForUpdateProps = {
  newEmail: string;
  targetYear: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsEditing: (isEditing: boolean) => void;
  targetExams: string[] | null;
  newPhone: string;
  onResendOtp?: () => Promise<void>; // Add this prop
  verificationId?: string;
};

type UserData = {
  uniqueId: string | null;
  phone: string | null;
};

const InputHandler = ({
  onOtpChange,
  setIsButtonDisabled,
}: {
  onOtpChange: (otp: string) => void;
  setIsButtonDisabled: (disabled: boolean) => void;
}) => {
  const inputsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inputs = inputsRef.current?.querySelectorAll("input");

    if (inputs) {
      inputs.forEach((input, index) => {
        const handleInputWrapper = (e: Event) => handleInput(e, index);
        input.addEventListener("input", handleInputWrapper);
        input.addEventListener("keyup", handleKeyup);

        return () => {
          input.removeEventListener("input", handleInputWrapper);
          input.removeEventListener("keyup", handleKeyup);
        };
      });
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

    const otp = Array.from(inputsRef.current?.querySelectorAll("input") || [])
      .map((input) => input.value.trim())
      .join("");
    onOtpChange(otp);

    const allFilled = Array.from(inputsRef.current?.querySelectorAll("input") || []).every(
      (input) => input.value.trim() !== ""
    );

    setIsButtonDisabled(!allFilled);
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
    <div ref={inputsRef} className="flex flex-row gap-[6px] items-center justify-center">
      {Array.from({ length: 6 }).map((_, index) => (
        <input
          key={index}
          className="w-[62px] h-16 font-medium border-solid border-[1.5px] border-[#D0D5DD] m-[5px] text-center text-[30px] text-black rounded-[8px] hover:border-none hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] focus:border-none"
          type="text"
          inputMode="numeric"
          maxLength={1}
          placeholder="-"
        />
      ))}
    </div>
  );
};

function OtpForUpdate({
  isOpen,
  setIsOpen,
  newEmail,
  targetYear,
  setIsEditing,
  targetExams,
  onResendOtp,
  newPhone,
  verificationId,
}: OtpForUpdateProps) {
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const db = getFirestore();
  const [otp, setOtp] = useState('');
  const [counter, setCounter] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);




  useEffect(() => {
    setOtp('');
    setCounter(60);
    setIsResendEnabled(false);
  }, [userData?.phone]);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        console.error('No user is logged in');
        setError(true);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const uniqueId = user.uid;
          const userDoc = doc(db, `users/${uniqueId}`);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            const data = userSnapshot.data() as UserData;
            setUserData(data);
          } else {
            console.error('No user data found!');
            setError(true);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user, db]);

  const verifyOTP = async () => {
    setIsLoading(true);
    setIsButtonDisabled(true);
  
    try {
      if (newPhone && verificationId) {
        const credential = PhoneAuthProvider.credential(verificationId, otp);
        
        if (user) {
          // Update phone number in Firebase Auth
          await updatePhoneNumber(user, credential);
          
          // Update phone number in Firestore
          if (userData?.uniqueId) {
            await updateDoc(doc(db, "users", userData.uniqueId), {
              phone: `+${newPhone}`
            });
          }
          
          toast.success('Phone number updated successfully!');
          setIsOpen(false);
          setIsEditing(false);
        }
      } else {
        // Handle other verification cases (email, targetYear, targetExams)
        await window.confirmationResult.confirm(otp);
        
        if (userData?.uniqueId) {
          const updateData: any = {
            ...(newEmail && { email: newEmail }),
            ...(targetYear && { targetYear }),
            ...(targetExams?.length && { targetExams })
          };
          
          await updateDoc(doc(db, "users", userData.uniqueId), updateData);
          toast.success('Information updated successfully!');
        }
        
        setIsOpen(false);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
      setIsButtonDisabled(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsLoading(true);
      setIsResendEnabled(false);
      
      // Call the resend OTP function passed from parent
      if (onResendOtp) {
        await onResendOtp();
        
        // Reset counter and OTP input
        setCounter(60);
        setOtp('');
        
        // Clear OTP input fields
        const inputs = document.querySelectorAll('input[type="text"]') as NodeListOf<HTMLInputElement>;
        inputs.forEach(input => input.value = '');
        
        toast.success('OTP resent successfully!');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      toast.error('Failed to resend OTP. Please try again.');
      setIsResendEnabled(true);
    } finally {
      setIsLoading(false);
    }
  };  

  if (loading || error) {
    return <LoadingData />;
  }

 // Update the verification message function
const getVerificationMessage = () => {
  if (newPhone) {
    return `Please enter the verification code we sent to your new number ${newPhone.slice(-4)}`;
  }
  return `Please enter the verification code we sent to verify your request`;
};

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(isOpen) => !isOpen && setIsOpen(false)}
      hideCloseButton
    >
      <ModalContent className="flex w-auto max-w-full mx-auto">
        <>
          <ModalHeader className="flex flex-row justify-between items-center gap-1">
            <h3 className='flex items-center justify-center'>OTP Verification</h3>
            <button
              className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]"
              onClick={() => setIsOpen(false)}
            >
              <Image
                src="/icons/cancel.svg"
                alt="Close"
                width={18}
                height={18}
              />
            </button>
          </ModalHeader>

          <ModalBody className="w-auto p-6 gap-6">
            <p className="text-sm text-[#667085]">
              {getVerificationMessage()}
            </p>
            <div>
              <InputHandler
                onOtpChange={setOtp}
                setIsButtonDisabled={setIsButtonDisabled}
              />
            </div>
            <div className="text-sm text-center text-[#667085]">
            {isResendEnabled ? (
              <button
                onClick={handleResendOtp}
                className="text-[#8501FF] font-medium"
                disabled={isLoading}
              >
                {isLoading ? 'Resending...' : 'Resend OTP'}
              </button>
            ) : (
              `Resend OTP in ${counter}s`
            )}
          </div>
          </ModalBody>

          <ModalFooter className="border-t border-lightGrey flex justify-end gap-2 p-4">
            <Button
              onClick={() => setIsOpen(false)}
              variant="light"
              className="border border-lightGrey font-semibold text-[#1D2939]"
            >
              Cancel
            </Button>
            <Button
              className={`min-w-[100px] flex justify-center items-center px-6 py-[10px] rounded-[8px] text-white font-semibold shadow-inner-button ${
                isButtonDisabled ? 'bg-[#d8acff]' : 'hover:bg-[#6D0DCC] bg-[#8501FF]'
              }`}
              disabled={isButtonDisabled}
              onClick={verifyOTP}
            >
              {isLoading ? (
                <div className="w-5 h-5 animate-spin-loading rounded-[50%] border-4 border-[#ffffff4d] border-solid border-t-4 border-t-customWhite"></div>
              ) : (
                'Verify'
              )}
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}

export default OtpForUpdate;
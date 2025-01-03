import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { Dispatch, useEffect, useRef, useState } from 'react';
import styles from '../Profile.module.css';
import Image from 'next/image';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import LoadingData from '@/components/Loading';
import { toast, ToastContainer } from 'react-toastify';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

type OtpForUpdateProps = {
  newEmail: string;
  targetYear: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsEditing: (isEditing: boolean) => void; // Add this prop to update isEditing in Profile
  targetExams: string[] | null;
  newPhone: string;
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

    // Combine all OTP values
    const otp = Array.from(
      inputsRef.current?.querySelectorAll("input") || []
    )
      .map((input) => input.value.trim())
      .join("");
    onOtpChange(otp);

    // Check if all input fields are filled
    const allFilled = Array.from(inputsRef.current?.querySelectorAll("input") || []).every(
      (input) => input.value.trim() !== ""
    );

    // Disable or enable the button based on whether all fields are filled
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
    <div
      id="inputs"
      ref={inputsRef}
      className="flex flex-row gap-[6px] items-center justify-center mt-6"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <input
          key={index}
          className="w-[82px]  h-16 font-medium border-solid border-[1.5px] border-[#D0D5DD] m-[5px] text-center text-[30px] text-black rounded-[8px] hover:border-none hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] focus:border-none"
          type="text"
          inputMode="numeric"
          maxLength={1}
          placeholder="-"
        />
      ))}
    </div>
  );
};

function OtpForUpdate({ isOpen, setIsOpen, newEmail, targetYear, setIsEditing, targetExams, newPhone }: OtpForUpdateProps) {
  const [error, setError] = useState(false); // Track error state
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [user, setUser] = useState<User | null>(null);
  const db = getFirestore();
  const [otp, setOtp] = useState('');
  const [counter, setCounter] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State to disable/enable the button
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    setOtp('');
    setCounter(60);
    setIsResendEnabled(false);
    setVerificationError(null);
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
        setError(true); // Set error if no user is logged in
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
            setError(true); // Set error if no user data is found
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(true); // Set error if fetching data fails
      } finally {
        setLoading(false); // Ensure loading is set to false after fetching data
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user, db]);

  if (loading || error) {
    return <LoadingData />;
  }




  const verifyOTP = () => {
    setIsLoading(true);
    setIsButtonDisabled(true);

    toast.promise(
      new Promise((resolve, reject) => {
        window.confirmationResult.confirm(otp).then(async () => {
          // OTP verified successfully
          resolve('Otp Sent!');
          setIsLoading(false);
          setIsButtonDisabled(true);

          try {
            // Store the selected year and exams in Firestore if conditions are met
            if (userData?.uniqueId) {
              const updateData: any = {
                ...(newEmail.trim() !== "" && { email: newEmail }),
                ...(targetYear.trim() !== "" && { targetYear: targetYear }),
              };

              // Only include targetExams if it is not empty or null
              if (targetExams && targetExams.length > 0) {
                updateData.targetExams = targetExams;
              }

              await updateDoc(doc(db, "users", userData?.uniqueId), updateData);
            }

            setIsOpen(false);
            setIsLoading(false);
            setIsButtonDisabled(true);
            setIsEditing(false);
          } catch (error) {
            console.error("Error saving data:", error);
            setIsLoading(false);
            setIsButtonDisabled(true);
          }
        }).catch((error: any) => {
          reject(new Error('Failed to Verify'));
          console.error("Invalid OTP", error);
          setIsLoading(false);
          setIsButtonDisabled(false);
        });
      }),
      {
        pending: 'Verifying OTP...',
        success: 'OTP Verified!',
        error: 'Failed to Verify OTP',
      }
    );
  }


  return (
    // <div>
    //   <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
    //     <DialogBackdrop className="fixed inset-0 bg-black/30" />
    //     <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
    //       <DialogPanel transition className={styles.commonDialogBox}>
    //         <div className={styles.commonUpdateHeader}>
    //           <h3>OTP Verification</h3>
    //           <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
    //             <button onClick={() => setIsOpen(false)}><Image src='/icons/cancel.svg' alt="profile-image" width={18} height={18} /></button>
    //           </button>
    //         </div>
    //         <p className='text-sm mx-6 text-[#667085] mb-4'>Please enter the verification code we sent to your mobile 99*****99</p>
    //         <div className={styles.commonDivider} />

    //         <div>
    //           <InputHandler onOtpChange={setOtp} setIsButtonDisabled={setIsButtonDisabled} />
    //         </div>
    //         <div className={styles.commonDivider} />

    //         <div className={styles.commonButtons}>
    //           <button className={styles.emailCancelBtn}>Cancel</button>
    //           <button className={`min-w-[100px] flex justify-center items-center px-6 py-[10px] rounded-[8px] text-white font-medium shadow-inner-button ${isButtonDisabled ? 'bg-[#d8acff]' : 'bg-[#8501FF]'}`}
    //             disabled={isButtonDisabled}
    //             onClick={verifyOTP} >
    //             {isLoading ? (
    //               <div className='w-5 h-5 animate-spin-loading rounded-[50%] border-4 border-[#ffffff4d] border-solid border-t-4 border-t-customWhite '></div> // Show spinner
    //             ) : (
    //               'Done'
    //             )}
    //           </button>
    //         </div>
    //       </DialogPanel>
    //     </div>
    //   </Dialog>
    // </div>
    <Modal
      isOpen={isOpen}
      onOpenChange={(isOpen) => !isOpen && setIsOpen(false)}
      hideCloseButton
    >
      <ModalContent className='flex w-auto'>
        <>
          <ModalHeader className="flex flex-row justify-between gap-1">

            <h3>OTP Verification</h3>
            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
              <button onClick={() => setIsOpen(false)}><Image src='/icons/cancel.svg' alt="profile-image" width={18} height={18} /></button>
            </button>

          </ModalHeader>

          <ModalBody className='w-[100px'>
            <p className='text-sm  text-[#667085] mb-4'>Please enter the verification code we sent to your mobile 99*****99</p>
            {/* <div className={styles.commonDivider} /> */}

            <div>
              <InputHandler onOtpChange={setOtp} setIsButtonDisabled={setIsButtonDisabled} />
            </div>
            {/* <div className={styles.commonDivider} /> */}
          </ModalBody>

          <ModalFooter className="border-t border-lightGrey">

            <button className={styles.emailCancelBtn}>Cancel</button>
            <button className={`min-w-[100px] flex justify-center items-center px-6 py-[10px] rounded-[8px] text-white font-medium shadow-inner-button ${isButtonDisabled ? 'bg-[#d8acff]' : 'bg-[#8501FF]'}`}
              disabled={isButtonDisabled}
              onClick={verifyOTP} >
              {isLoading ? (
                <div className='w-5 h-5 animate-spin-loading rounded-[50%] border-4 border-[#ffffff4d] border-solid border-t-4 border-t-customWhite '></div> // Show spinner
              ) : (
                'Done'
              )}
            </button>

          </ModalFooter>
        </>
      </ModalContent>
    </Modal>

  );
}
export default OtpForUpdate;



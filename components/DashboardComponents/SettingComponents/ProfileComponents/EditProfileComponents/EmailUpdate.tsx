import styles from '../Profile.module.css';
import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Image from 'next/image';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber, User } from 'firebase/auth';
import { auth } from '@/firebase';
import OtpForUpdate from './OtpForUpdate';
import LoadingData from '@/components/Loading';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

type UserData = {
  email: string | null;
  phone: string | null;
};
type EmailUpdateProps = {
  setIsEditing: (isEditing: boolean) => void; // Add this prop to update isEditing in Profile

}
function EmailUpdate({ setIsEditing }: EmailUpdateProps) {
  const recaptchaVerifierRef = useRef<any>(null);
  let [showComponent, setShowComponent] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  let [isOpen1, setIsOpen1] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const db = getFirestore();
  const [newEmail, setNewEmail] = useState(''); // State for the new email input
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State to disable/enable the button


 const handleButtonClick = () => {
    setUpRecaptcha();
    const appVerifier = recaptchaVerifierRef.current;
    setIsLoading(true);
    setIsButtonDisabled(true);
    if (userData?.phone) {
      toast.promise(
        new Promise((resolve, reject) => {
          signInWithPhoneNumber(auth, `${userData.phone}`, appVerifier)
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;
              setIsOpen(false);
              setShowComponent(true);
              setIsOtpOpen(true);
              resolve('Otp Sent!');
              setIsLoading(false);
              setIsButtonDisabled(true);
            })
            .catch((error: any) => {
              console.error('Error sending OTP', error);
              reject(new Error('Failed to send OTP'));
              setIsLoading(false);
              setIsButtonDisabled(false);
            });
        }),
        {
          pending: 'Sending OTP...',
          success: 'OTP sent successfully!',
          error: 'Failed to send OTP',
        }
      );
    } else {
      console.error('No valid Phone Number');
      setIsLoading(false);
      setIsButtonDisabled(false);
    }
  };


  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" && !isButtonDisabled) {
        handleButtonClick();
      }
    };

    if (isOpen && !isButtonDisabled) { // Add check for isFormValid
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleButtonClick, isOpen, isButtonDisabled]);


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
          const userId = user.uid;
          const userDoc = doc(db, `users/${userId}`);
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

  // Function to validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    // Enable the button only if the newEmail is valid and not empty
    if (newEmail.trim() !== '' && isValidEmail(newEmail)) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [newEmail]);

  if (loading || error) {
    return <LoadingData />;
  }

  const setUpRecaptcha = () => {
    if (!recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response: any) => {
          console.log('Recaptcha verified', response);
        },
      });
    } else {
      console.log('Recaptcha already rendered');
    }
  };

 

  const handleResendOtp = async () => {
    setUpRecaptcha(); // Make sure recaptcha is set up
    const appVerifier = recaptchaVerifierRef.current;
    
    try {
      if (userData?.phone) {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          userData.phone,
          appVerifier
        );
        window.confirmationResult = confirmationResult;
        toast.success('OTP resent successfully!');
        return Promise.resolve();
      } else {
        throw new Error('No valid phone number found');
      }
    } catch (error: any) {
      console.error('Error resending OTP:', error);
      toast.error(error.message || 'Failed to resend OTP');
      throw error;
    }
  };

  return (
    <div className={styles.updateEmail}>
      <button className={styles.updateEmailButton} onClick={() => setIsOpen(true)}>Update</button>

      {/* <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel transition className={styles.commonDialogBox}>
            <div className={styles.commonUpdateHeader}>
              <h3>Update Email Address</h3>
              <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                <button onClick={() => setIsOpen(false)}>
                  <Image src='/icons/cancel.svg' alt="profile-image" width={18} height={18} />
                </button>
              </button>
            </div>
            <p className="text-sm mx-6 text-[#667085] mb-4">
              Lorem ipsum is a dummy text widely used in digital industry will be used here in as a preview
            </p>
            <div className={styles.commonDivider} />
            <div className="mt-4 mb-4 gap-4 flex flex-col">
              <div className={styles.emailInputDiv}>
                <label className="text-sm font-medium" htmlFor="Email">Enter Old Email Id</label>
                <div>
                  <input
                    type="email"
                    id="Email"
                    placeholder="Email Id"
                    value={userData?.email ?? ''}
                    className={styles.emailInput}
                    disabled
                  />
                </div>
              </div>
              <div className={styles.emailInputDiv}>
                <label className="text-sm font-medium" htmlFor="newEmail">Enter New Email Id</label>
                <div>
                  <input
                    type="email"
                    id="newEmail"
                    placeholder="Email Id"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className={styles.emailInput}
                  />
                </div>
              </div>
            </div>
            <div className={styles.commonDivider} />
            <div className={styles.commonButtons}>
              <button className={styles.emailCancelBtn} onClick={() => setIsOpen(false)}>Cancel</button>
              <button
                className={`min-w-[100px] flex justify-center items-center px-6 py-[10px] rounded-[8px] text-white font-medium shadow-inner-button ${isButtonDisabled ? 'bg-[#d8acff]' : 'bg-[#8501FF]'}`}
                onClick={handleButtonClick}
                disabled={isButtonDisabled} // Disable the button if the state is true
              >
                {isLoading ? (
                  <div className='w-5 h-5 animate-spin-loading rounded-[50%] border-4 border-[#ffffff4d] border-solid border-t-4 border-t-customWhite '></div> // Show spinner
                ) : (
                  'Verify'
                )}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog> */}
      <Modal
        isOpen={isOpen}
        onOpenChange={(isOpen) => !isOpen && setIsOpen(false)}
        hideCloseButton
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-row justify-between gap-1">
              <h3 className='flex items-center justify-center'>Update Email Address</h3>
              <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                <button onClick={() => setIsOpen(false)}>
                  <Image src='/icons/cancel.svg' alt="profile-image" width={18} height={18} />
                </button>
              </button>
            </ModalHeader>

            <ModalBody className='flex gap-4 pb-4'>
              <p className='text-sm  text-[#667085]'>
                Please verify your current email address and provide a new email address to update your account details.
              </p>

              <div className=" border-t border-lightGrey " />

              <div className="mt-4 mb-4 gap-4 flex flex-col">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium" htmlFor="Email">Enter Old Email Id</label>
                  <div>
                    <input
                      type="email"
                      id="Email"
                      placeholder="Email Id"
                      value={userData?.email ?? ''}
                      className={styles.emailInput}
                      disabled
                    />
                  </div>
                </div>
                <div className=" flex flex-col gap-1">
                  <label className="text-sm font-medium" htmlFor="newEmail">Enter New Email Id</label>
                  <div>
                    <input
                      type="email"
                      id="newEmail"
                      placeholder="Email Id"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className={styles.emailInput}
                    />
                  </div>
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="border-t border-lightGrey">
              <Button onClick={() => setIsOpen(false)} variant="light" className=" border border-lightGrey font-semibold text-[#1D2939]">Cancel</Button>
              <Button
                className={`min-w-[100px] flex justify-center items-center px-6 py-[10px] rounded-[8px] text-white font-medium shadow-inner-button ${isButtonDisabled ? 'bg-[#d8acff]' : ' hover:bg-[#6D0DCC] bg-[#8501FF]'}`}
                onClick={handleButtonClick}
                disabled={isButtonDisabled} // Disable the button if the state is true
              >
                {isLoading ? (
                  <div className='w-5 h-5 animate-spin-loading rounded-[50%] border-4 border-[#ffffff4d] border-solid border-t-4 border-t-customWhite '></div> // Show spinner 
                ) : (
                  'Verify'
                )}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
      {showComponent && <OtpForUpdate newEmail={newEmail} onResendOtp={handleResendOtp} newPhone='' isOpen={isOtpOpen} setIsOpen={setIsOtpOpen} targetYear='' setIsEditing={setIsEditing} targetExams={[]} />}
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default EmailUpdate;

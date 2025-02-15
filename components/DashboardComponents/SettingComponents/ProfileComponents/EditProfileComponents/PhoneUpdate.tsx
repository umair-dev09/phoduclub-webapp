import styles from '../Profile.module.css';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber, User } from 'firebase/auth';
import { auth } from '@/firebase';
import OtpForUpdate from './OtpForUpdate';
import LoadingData from '@/components/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

type UserData = {
  phone: string | null;
};

type PhoneUpdateProps = {
  setIsEditing: (isEditing: boolean) => void;
}

function PhoneUpdate({ setIsEditing }: PhoneUpdateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const recaptchaVerifierRef = useRef<any>(null);
  const [showComponent, setShowComponent] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const db = getFirestore();
  const [newPhone, setNewPhone] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);
  const [verificationId, setVerificationId] = useState('');

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
          const userDoc = doc(db, `users/${user.uid}`);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            setUserData(userSnapshot.data() as UserData);
          } else {
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

    if (user) fetchUserData();
  }, [user, db]);

  useEffect(() => {
    setIsFormValid(newPhone.trim() === '');
  }, [newPhone]);

  const setUpRecaptcha = () => {
    if (!recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
    }
  };

// Update the handleButtonClick function
const handleButtonClick = async () => {
  setUpRecaptcha();
  setIsLoading(true);

  try {
    const phoneNumber = `+${newPhone}`;

    // Check if the phone number already exists
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('phone', '==', phoneNumber));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      toast.error('This phone number is already registered with another account');
      setIsLoading(false);
      return;
    }

    // If phone number doesn't exist, proceed with OTP sending
    const confirmationResult = await signInWithPhoneNumber(
      auth, 
      phoneNumber, 
      recaptchaVerifierRef.current
    );
    
    setVerificationId(confirmationResult.verificationId);
    setIsOpen(false);
    setShowComponent(true);
    setIsOtpOpen(true);
    toast.success('OTP Sent!');
  } catch (error: any) {
    console.error('Error:', error);
    toast.error(error.message || 'Failed to send OTP');
  } finally {
    setIsLoading(false);
  }
};

// Update the handleResendOtp function to include the same check
const handleResendOtp = async () => {
  setUpRecaptcha();
  
  try {
    const phoneNumber = `+${newPhone}`;

    // Check if the phone number already exists
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('phone', '==', phoneNumber));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error('This phone number is already registered with another account');
    }

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifierRef.current
    );
    setVerificationId(confirmationResult.verificationId);
    
  } catch (error: any) {
    console.error('Error resending OTP:', error);
    throw error;
  }
};


  if (loading || error) return <LoadingData />;

  return (
    <div className={styles.updateMob}>
      <button className={styles.updateMobButton} onClick={() => setIsOpen(true)}>
        Update
      </button>

      {/* Modal Component */}
      <Modal
        isOpen={isOpen}
        onOpenChange={(isOpen) => !isOpen && setIsOpen(false)}
        hideCloseButton
      >
        <ModalContent>
          <ModalHeader className="flex flex-row justify-between gap-1">
            <h3>Update Phone Number</h3>
            <button 
              className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-[#F2F4F7]"
              onClick={() => setIsOpen(false)}
            >
              <Image src='/icons/cancel.svg' alt="close" width={18} height={18} />
            </button>
          </ModalHeader>

          <ModalBody className='flex gap-4 pb-4'>
            <p className='text-sm text-[#667085]'>
              Please enter your new phone number. We'll send a verification code to complete the update.
            </p>

            <div className="border-t border-lightGrey" />
            
            <div className='mt-4 mb-6 gap-4 flex flex-col'>
              <div>
                <label htmlFor="currentNumber">Current Number</label>
                <PhoneInput
                  country={'in'}
                  value={userData?.phone}
                  disabled
                  containerClass={styles.phoneinputcontainer}
                  inputClass={styles.forminput}
                />
              </div>
              
              <div>
                <label htmlFor="newNumber">New Number</label>
                <PhoneInput
                  country={'in'}
                  value={newPhone}
                  onChange={setNewPhone}
                  placeholder="+91 000000000"
                  containerClass={styles.phoneinputcontainer}
                  inputClass={styles.forminput}
                />
              </div>
            </div>
          </ModalBody>

          <ModalFooter className="border-t border-lightGrey">
            <Button 
              variant="light" 
              className="border border-lightGrey font-semibold text-[#1D2939]"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className={`min-w-[100px] px-6 py-[10px] rounded-[8px] text-white font-medium ${
                isFormValid ? 'bg-[#d8acff]' : 'bg-[#8501FF] hover:bg-[#6D0DCC]'
              }`}
              disabled={isFormValid || isLoading}
              onClick={handleButtonClick}
            >
              {isLoading ? (
                <div className='w-5 h-5 animate-spin-loading rounded-[50%] border-4 border-[#ffffff4d] border-t-customWhite'></div>
              ) : (
                'Verify'
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {showComponent && (
        <OtpForUpdate
          newEmail=''
          newPhone={newPhone}
          isOpen={isOtpOpen}
          setIsOpen={setIsOtpOpen}
          targetYear=''
          setIsEditing={setIsEditing}
          targetExams={[]}
          onResendOtp={handleResendOtp}
          verificationId={verificationId}
        />
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default PhoneUpdate;
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
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

type UserData = {
  phone: string | null;
};
type PhoneUpdateProps = {
  setIsEditing: (isEditing: boolean) => void; // Add this prop to update isEditing in Profile

}

function PhoneUpdate({ setIsEditing }: PhoneUpdateProps) {
  let [isOpen, setIsOpen] = useState(false)
  const recaptchaVerifierRef = useRef<any>(null);
  let [showComponent, setShowComponent] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const db = getFirestore();
  const [newPhone, setNewPhone] = useState(''); // State for the new email input
  const [isFormValid, setIsFormValid] = useState(true);

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
  useEffect(() => {
    // Enable the button only if the newEmail is valid and not empty
    if (newPhone.trim() !== '') {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [newPhone]);
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

  const handleButtonClick = () => {
    toast.warning('Currently this feature is disabled due to data cost.')
    // setUpRecaptcha();
    // const appVerifier = recaptchaVerifierRef.current;
    // setIsLoading(true);
    // if (userData?.phone) {
    //   toast.promise(
    //     new Promise((resolve, reject) => {
    //       signInWithPhoneNumber(auth, `${userData.phone}`, appVerifier)
    //         .then((confirmationResult) => {
    //           window.confirmationResult = confirmationResult;
    //           setIsOpen(false);
    //           setShowComponent(true);
    //           setIsOtpOpen(true);
    //           resolve('Otp Sent!');
    //           setIsLoading(false);
    //           setIsFormValid(true);
    //         })
    //         .catch((error: any) => {
    //           console.error('Error sending OTP', error);
    //           reject(new Error('Failed to send OTP'));
    //           setIsLoading(false);
    //           setIsFormValid(false);
    //         });
    //     }),
    //     {
    //       pending: 'Sending OTP...',
    //       success: 'OTP sent successfully!',
    //       error: 'Failed to send OTP',
    //     }
    //   );
    // } else {
    //   console.error('No valid Phone Number');
    //   setIsLoading(false);
    //   setIsFormValid(false);
    // }
  };

  function handleInputChange(phone: string, value: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className={styles.updateMob}>
      <button className={styles.updateMobButton} onClick={() => setIsOpen(true)}>Update</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
          <DialogPanel transition className={styles.commonDialogBox}>
            <div className={styles.commonUpdateHeader}>
              <h3>Update Phone Number</h3>
              <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                <button onClick={() => setIsOpen(false)}><Image src='/icons/cancel.svg' alt="profile-image" width={18} height={18} /></button>
              </button>
            </div>
            <p className='text-sm mx-6 text-[#667085] mb-4'>Lorem ipsum is a dummy text widely used in digital industry will be used here in as a preview</p>
            <div className={styles.commonDivider} />
            <div className='mt-4 mb-6 ml-6 mr-6 gap-4 flex flex-col'>
              <div>
                <label htmlFor="Number">Enter Old Number</label>
                <div>
                  <PhoneInput
                    country={'in'}
                    value={userData?.phone}
                    disabled
                    //  onChange={(value: any) => handleInputChange('phone', value)}
                    placeholder="+91 000000000"
                    inputProps={{
                      name: 'phone',
                      required: true,
                      autoFocus: true
                    }}
                    containerClass={styles.phoneinputcontainer}
                    inputClass={styles.forminput}
                  />
                  {/* {isSubmitted && errors.phone && <div id="phone_error" className={styles.error}>{errors.phone}</div>} */}
                </div>
              </div>
              <div>
                <label htmlFor="Number">Enter New Number</label>
                <div>
                  <PhoneInput
                    country={'in'}
                    value={newPhone}

                    onChange={(phone) => setNewPhone(phone)}
                    placeholder="+91 000000000"
                    inputProps={{
                      name: 'phone',
                      required: true,
                      autoFocus: true
                    }}
                    containerClass={styles.phoneinputcontainer}
                    inputClass={styles.forminput}
                  />
                  {/* {isSubmitted && errors.phone && <div id="phone_error" className={styles.error}>{errors.phone}</div>} */}
                </div>
              </div>
            </div>
            <div className={styles.commonDivider} />

            <div className={styles.commonButtons}>
              <button onClick={() => setIsOpen(false)} className={styles.emailCancelBtn}>Cancel</button>
              <button
                className={`min-w-[100px] flex justify-center items-center px-6 py-[10px] rounded-[8px] text-white font-medium shadow-inner-button ${isFormValid ? 'bg-[#d8acff]' : 'bg-[#8501FF]'}`}
                onClick={handleButtonClick}
                disabled={isFormValid}>
                {isLoading ? (
                  <div className='w-5 h-5 animate-spin-loading rounded-[50%] border-4 border-[#ffffff4d] border-solid border-t-4 border-t-customWhite '></div> // Show spinner
                ) : (
                  'Verify'
                )}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      {showComponent && <OtpForUpdate newEmail='' newPhone={newPhone} isOpen={isOtpOpen} setIsOpen={setIsOtpOpen} targetYear='' setIsEditing={setIsEditing} targetExams={[]} />}
      <div id="recaptcha-container"></div>
    </div>
  );
}
export default PhoneUpdate;


{/* <Modal
        isOpen={isOpen}
        onOpenChange={(isOpen) => !isOpen && setIsOpen(false)}
        hideCloseButton
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-row justify-between gap-1">
              <h3 className='flex items-center justify-center'>Update Phone Number</h3>
              <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                <button onClick={() => setIsOpen(false)}>
                  <Image src='/icons/cancel.svg' alt="profile-image" width={18} height={18} />
                </button>
              </button>
            </ModalHeader>

            <ModalBody className='flex gap-4 pb-4'>
              <p className='text-sm  text-[#667085]'>
                Lorem ipsum is a dummy text widely used in digital industry will be used here in as a preview
              </p>

              <div className=" border-t border-lightGrey " />
 <div className='mt-4 mb-6  gap-4 flex flex-col'>
              <div>
                <label htmlFor="Number">Enter Old Number</label>
                <div>
                  <PhoneInput
                    country={'in'}
                     value={userData?.phone}
                     disabled
                    //  onChange={(value: any) => handleInputChange('phone', value)}
                    placeholder="+91 000000000"
                    inputProps={{
                      name: 'phone',
                      required: true,
                      autoFocus: true
                    }}
                    containerClass={styles.phoneinputcontainer}
                    inputClass={styles.forminput}
                  />
                 
                  </div>
                  </div>
                  <div>
                    <label htmlFor="Number">Enter New Number</label>
                    <div>
                      <PhoneInput
                        country={'in'}
                         value={newPhone}
                         
                         onChange={(phone) => setNewPhone(phone)}
                        placeholder="+91 000000000"
                        inputProps={{
                          name: 'phone',
                          required: true,
                          autoFocus: true
                        }}
                        containerClass={styles.phoneinputcontainer}
                        inputClass={styles.forminput}
                      />
                    
                    </div>
                  </div>
                </div>
              
            </ModalBody>

            <ModalFooter className="border-t border-lightGrey">
              <Button onClick={() => setIsOpen(false)} variant="light" className=" border border-lightGrey font-semibold text-[#1D2939]">Cancel</Button>
              <Button
                className={`min-w-[100px] flex justify-center items-center px-6 py-[10px] rounded-[8px] text-white font-medium shadow-inner-button ${isFormValid ? 'bg-[#d8acff]' : 'bg-[#8501FF]'}`}
                onClick={handleButtonClick}
                disabled={isFormValid}>
                {isLoading ? (
                  <div className='w-5 h-5 animate-spin-loading rounded-[50%] border-4 border-[#ffffff4d] border-solid border-t-4 border-t-customWhite '></div> // Show spinner
                ) : (
                  'Verify'
                )}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal> */}
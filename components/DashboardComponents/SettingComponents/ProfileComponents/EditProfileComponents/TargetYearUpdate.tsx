import styles from '../Profile.module.css';
import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel} from '@headlessui/react';
import Image from 'next/image';
import Select, { MultiValue, SingleValue } from 'react-select';
import OtpForUpdate from './OtpForUpdate';
import { onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber, User } from 'firebase/auth';
import { auth } from '@/firebase';
import { toast } from 'react-toastify';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import LoadingData from '@/components/Loading';

 type UserData = {
  phone: string | null;
  targetYear: string | null;
 }

 type TargetYearUpdateProps = {
  setIsEditing: (isEditing: boolean) => void; // Add this prop to update isEditing in Profile

}

function TargetYearUpdate({setIsEditing}: TargetYearUpdateProps){
  const recaptchaVerifierRef = useRef<any>(null);
  let [showComponent, setShowComponent] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const db = getFirestore();


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

            if (data.targetYear) {
              const defaultYear = years.find(year => year.value === data.targetYear);
              setSelectedYear(defaultYear || null); // Set the found year or null if not found
            }
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

  // if (loading || error) {
  //   return <LoadingData />;
  // }
    type Option = {
        value: string;
        label: string;
      };
      
      type CustomState = {
        isSelected: boolean;
        isFocused: boolean;
      };
      
      const years: Option[] = [
        { value: '2024', label: '2024' },
        { value: '2025', label: '2025' },
        { value: '2026', label: '2026' },
      ];
      let [isOpen, setIsOpen] = useState(false)
      const [selectedYear, setSelectedYear] = useState<SingleValue<Option>>(null);

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

      const onContinueClick = () => {
        setUpRecaptcha();
        const appVerifier = recaptchaVerifierRef.current;
        
        if (userData?.phone) {
          toast.promise(
            new Promise((resolve, reject) => {
              signInWithPhoneNumber(auth, `+${userData.phone}`, appVerifier)
                .then((confirmationResult) => {
                  window.confirmationResult = confirmationResult;
                  resolve('Otp Sent!');
                  setIsOpen(false);
                  setShowComponent(true);
                  setIsOtpOpen(true);
                })
                .catch((error: any) => {
                  console.error('Error sending OTP', error);
                  reject(new Error('Failed to send OTP'));
                 
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
        }
      };

 return(
    
    <div className={styles.updateYear}>
    <button className={styles.updateYearButton} onClick={() => setIsOpen(true)}>Update</button>
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}  className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
          <DialogPanel transition className={styles.commonDialogBox}>
           <div className={styles.commonUpdateHeader}> 
            <h3>Update Target Year</h3>
            <button onClick={() => setIsOpen(false)}><Image src='/icons/cancel.svg' alt="profile-image" width={18} height={18} /></button>
           </div>
           <p className='text-sm mx-6 text-[#667085] mb-4'>Lorem ipsum is a dummy text widely used in digital industry will be used here in as a preview</p>
           <div className={styles.commonDivider}/> 

           <div className={styles.dropdownWrapper}>
        <label htmlFor="target-year" className={styles.label}>Target Year</label>
        <Select
          id="target-year"
          value={selectedYear}
          onChange={setSelectedYear}
          options={years}
          placeholder="Select year..."
          className={styles.yearSelect}
          styles={{
            option: (provided, state: CustomState) => ({
              ...provided,
              color: 'black',
              backgroundColor: state.isFocused ? '#E39FF6' : 'white', // Purple color when focused
            }),
            singleValue: (provided) => ({
              ...provided,
              color: 'black',
              fontWeight: '500'
            }),
            control: (provided) => ({
              ...provided,
              border: '1px solid #e6e6e6',
              borderRadius: '8px',
              padding: '4px',
              boxShadow: 'none',
              '&:hover': {
                outline: '1px solid #e5a1f5',
              },
            }),
            
          }}
        />
      </div>
          <div className={styles.commonDivider}/> 

          <div className={styles.commonButtons}>
           <button className={styles.tExamCancelBtn} onClick={() => setIsOpen(false)}>Cancel</button>
           <button className={styles .tExamContinueBtn} onClick={onContinueClick}>Continue</button>
          </div>      
          </DialogPanel>
        </div>
      </Dialog>
      {showComponent && <OtpForUpdate newEmail={''} isOpen={isOtpOpen} setIsOpen={setIsOtpOpen} targetYear={selectedYear?.value || ''} setIsEditing={setIsEditing} targetExams={[]}/>}
    </div>
 );
}
export default TargetYearUpdate;
import styles from '../Profile.module.css';
import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Image from 'next/image';
import Select, { MultiValue } from 'react-select';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber, User } from 'firebase/auth';
import { auth } from '@/firebase';
import OtpForUpdate from './OtpForUpdate';
import { toast } from 'react-toastify';

type UserData = {
  phone: string | null;
  targetExams: string[] | null;
};

type Option = {
  value: string;
  label: string;
};

type TargetExamsUpdateProps = {
  setIsEditing: (isEditing: boolean) => void; // Add this prop to update isEditing in Profile
}

function TargetExamUpdate({ setIsEditing }: TargetExamsUpdateProps) {
  const recaptchaVerifierRef = useRef<any>(null);
  let [showComponent, setShowComponent] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [selectedExams, setSelectedExams] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const db = getFirestore();

  const exams: Option[] = [
    { value: 'BITSAT', label: 'BITSAT' },
    { value: 'JEE', label: 'JEE' },
    { value: 'SRMJEEE', label: 'SRMJEEE' },
    { value: 'COMEDK', label: 'COMEDK' },
    { value: 'KCET', label: 'KCET' },
    { value: 'VITEEE', label: 'VITEEE' },
    { value: 'MET', label: 'MET' },
  ];

  // Handle authentication state change
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

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const userDoc = doc(db, `users/${user.uid}`);
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

  // Set default selected exams once userData is available
  useEffect(() => {
    if (userData?.targetExams) {
      const defaultExams = userData.targetExams.map((exam) => ({
        value: exam,
        label: exam,
      }));
      setSelectedExams(defaultExams);
    }
  }, [userData]);

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

  // Map the selected exams to an array of strings
  const selectedExamValues = selectedExams.map((exam) => exam.value);

  return (
    <div className={styles.updateIcon}>
      <button className={styles.updateIconButton} onClick={() => setIsOpen(true)}>Update</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel transition className={styles.commonDialogBox}>
            <div className={styles.commonUpdateHeader}>
              <h3>Update Exam</h3>
              <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                <button onClick={() => setIsOpen(false)}>
                  <Image src='/icons/cancel.svg' alt="profile-image" width={18} height={18} />
                </button>
              </button>
            </div>
            <p className='text-sm mx-6 text-[#667085] mb-4'>
              Lorem ipsum is a dummy text widely used in digital industry will be used here in as a preview
            </p>
            <div className={styles.commonDivider} />

            <div className={styles.dropdownWrapper}>
              <p className={styles.labelTargetExam}>Target Exam</p>
              <Select
                id="target-exam"
                value={selectedExams}
                onChange={(newValue) => setSelectedExams(newValue as Option[])}  // Explicit type casting
                options={exams}
                isMulti
                placeholder="Select exams..."
                // className={styles.examSelect}
                styles={{
                  option: (provided, state) => ({
                    ...provided,
                    color: 'black',
                    backgroundColor: state.isFocused ? '#E39FF6' : 'white',
                  }),
                  multiValue: (provided) => ({
                    ...provided,
                    backgroundColor: 'white',
                    border: '1.2px solid #D0D5DD',
                    borderRadius: '8px',
                    fontWeight: '500',
                    marginRight: '7px',
                  }),
                  multiValueLabel: (provided) => ({
                    ...provided,
                    color: 'black',
                  }),
                  multiValueRemove: (provided) => ({
                    ...provided,
                    color: 'gray',
                    cursor: 'pointer',
                    ':hover': {
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                    },
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: 'white',
                  }),
                  menuList: (provided) => ({
                    ...provided,
                    padding: '0',
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
            <div className={styles.commonDivider} />

            <div className={styles.commonButtons}>
              <button className={styles.tExamCancelBtn}>Cancel</button>
              <button className={styles.tExamContinueBtn} onClick={onContinueClick}>Continue</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      {showComponent && <OtpForUpdate newEmail={''} isOpen={isOtpOpen} setIsOpen={setIsOtpOpen} targetYear={''} setIsEditing={setIsEditing} targetExams={selectedExamValues} />}
    </div>
  );
}

export default TargetExamUpdate;

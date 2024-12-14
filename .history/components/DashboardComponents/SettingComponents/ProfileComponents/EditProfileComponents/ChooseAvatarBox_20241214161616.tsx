import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import styles from '../Profile.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '@/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import LoadingData from '@/components/Loading';

type ChooseAvatarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsEditing: (isEditing: boolean) => void; // Add this prop to update isEditing in Profile
};

const avatars = [
  'https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar1.png?alt=media&token=f794198a-0d5b-4542-a7bd-8c8586e4ef85',
  'https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar2.png?alt=media&token=003f3358-5134-49e7-a414-edd89366b5fb',
  'https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar3.png?alt=media&token=35414381-9ac0-4742-8661-f4f315a45cc5',
  'https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar4.png?alt=media&token=534c8508-01f3-477f-ab71-70c08ce9474f',
  'https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar5.png?alt=media&token=57379dbd-e6d2-42de-a628-37c03621dc23',
  'https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar6.png?alt=media&token=dac74da1-df0e-4577-9ba5-3fd37a9c1506',
  'https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar7.png?alt=media&token=2469737e-d267-48ac-b8de-cc472adf169e',
  'https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar8.png?alt=media&token=40cc97cf-aa18-43df-8a5a-254e0a92c603'
];

function ChooseAvatarBox({ isOpen, setIsOpen, setIsEditing }: ChooseAvatarProps) {
  const [user, setUser] = useState<User | null>(null);
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        console.error('No user is logged in');
      }
    });

    return () => unsubscribe();
  }, []);


  const handleImageClick = async (imageUrl: string) => {
    if (user) {
      try {
        // Reference to the user's document in Firestore
        const userRef = doc(db, 'users', user.uid);

        // Update the Firestore document with profilePic and isAvatar fields
        await updateDoc(userRef, {
          profilePic: imageUrl,
          isAvatar: true
        });
        toast.success('Avatar updated successfully!');
        setTimeout(() => {
          setIsEditing(false); // This will change the isEditing state in the Profile page
          setIsOpen(false);
        }, 500);

      } catch (error) {
        toast.error('Failed to update avatar.');
        console.error('Error updating avatar:', error);
      }
    } else {
      toast.error('No user logged in.');
    }

  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel transition className={styles.commonDialogBox}>
          <div className={styles.commonUpdateHeader}>
            <h3>Choose an Avatar</h3>
            <button className="w-[32px] h-[32px] bg-[#F7F8FA] border-[1.5px] border-[#EAECF0] rounded-full flex items-center justify-center transition-all duration-200 hover:bg-[#F2F4F7]">
              <button onClick={() => setIsOpen(false)}>
                <Image src='/icons/cancel.svg' alt="cancel-image" width={18} height={18} />
              </button>
            </button>
          </div>
          <div className={styles.commonDivider} />
          <div className="flex flex-col mx-6 my-5">
            <div className="grid grid-cols-4 gap-4">
              {avatars.map((avatar, index) => (
                <button
                  key={index}
                  className="rounded-full hover:opacity-60"
                  onClick={() => handleImageClick(avatar)}
                >
                  <Image
                    src={avatar}
                    alt={`avatar ${index + 1}`}
                    className="rounded-full"
                    width={88}
                    height={88}
                    quality={100}
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default ChooseAvatarBox;

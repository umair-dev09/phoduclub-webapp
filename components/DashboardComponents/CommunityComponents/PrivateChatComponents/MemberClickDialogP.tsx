import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState, useEffect } from "react";
import { arrayUnion, doc, getDoc, onSnapshot, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { db, auth } from "@/firebase";
import LoadingData from "@/components/Loading";
import MessageLoading from "@/components/MessageLoading";
import { Tooltip } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface MemberClickDialogProps {
  open: boolean;
  onClose: () => void;
  id: string;
  isAdmin: boolean;
}

type UserData = {
  name: string;
  userId: string;
  uniqueId: string;
  profilePic: string;
  targetYear: string;
  targetExams: string[];
  adminId: string;
  role: string;
  isPremium: boolean | false;
}

function MemberClickDialogP({ open, onClose, id, isAdmin }: MemberClickDialogProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [messageButtonLoading, setMessageButtonLoading] = useState(false);
  const currentUserId = auth.currentUser?.uid;
  const [sendrequestDialog, setSendrequestDialog] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const userDocRef = doc(db, isAdmin ? "admin" : "users", id);

    // Listen for real-time changes in the admin document
    const unsubscribe = onSnapshot(userDocRef, (userDocSnap) => {
      if (userDocSnap.exists()) {
        setUser(userDocSnap.data() as UserData);
      } else {
        console.error('User data not found');
      }
      setLoading(false); // Set loading to false after fetching data
    }, (error) => {
      console.error('Error fetching real-time data:', error);
      setLoading(false);
    });

    // Cleanup function to unsubscribe from the real-time listener
    return () => unsubscribe();
  }, [id]); // Re-run this effect when userId changes

  const colors = ['bg-red-500', 'bg-orange-500', 'bg-green-500', 'bg-blue-500']

  if (loading) {
    return <LoadingData />
  }

  return (

    <div>
      <Modal
        isOpen={open}
        onOpenChange={(isOpen) => !isOpen && onClose()}
        hideCloseButton
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 bg-purple p-4 ">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-3">
                  <div className="relative">
                    <Image
                      className="rounded-full w-[96px] h-[96px]"
                      src={user?.profilePic || '/defaultDP.svg'}
                      alt="Profile Pic"
                      width={96}
                      height={96}
                    />
                    {user?.isPremium && (
                      <Image
                        className="absolute right-0 bottom-0"
                        src="/icons/winnerBatch.svg"
                        alt="Batch"
                        width={28}
                        height={28}
                      />
                    )}
                  </div>

                  <div className="flex flex-col justify-center">
                    <h3 className="text-white text-[20px]">{user?.name}</h3>
                    <span className="text-white">{user?.userId}</span>

                    <div className="flex flex-row gap-1 bg-white bg-opacity-20 rounded-[30px] py-[2px] px-2 w-fit items-center ml-[-2px] mt-[4px]">
                      {isAdmin ? (
                        <h3 className="text-white text-sm ml-[2px]">{user?.role}</h3>
                      ) : (
                        <>
                          <Image
                            className="w-[14px] h-[14px]"
                            src="/icons/ey1.svg"
                            alt="icon"
                            width={14}
                            height={14}
                          />
                          <span className="text-white text-[13px]">Exam Year</span>
                          <h3 className="text-white text-base ml-[2px]">{user?.targetYear}</h3>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-[#F2F4F7]"
                  onClick={onClose}
                  aria-label="Close dialog"
                >
                  <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                </button>
              </div>

             
            </ModalHeader>

            <ModalBody>
              {loading ? (
                <div className="flex w-[480px] h-[200px] items-center justify-center">
                  <MessageLoading />
                </div>
              ) : (
                <div className="flex flex-col">

                  {!isAdmin && (
                    <div className="flex flex-col gap-2 p-2">
                      <span className="text-[#1D2939] text-sm">Preparing Exams</span>
                      <div className="flex flex-wrap gap-2">
                        {user?.targetExams?.map((exam, index) => {
                          const randomColor = colors[Math.floor(Math.random() * colors.length)];
                          return (
                            <div
                              key={index}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 font-medium border border-solid border-[#D0D5DD] rounded-full cursor-pointer hover:bg-gray-100"
                            >
                              <span
                                className={`w-2 h-2 rounded-[50%] mr-1 ${randomColor}`}
                              ></span>
                              {exam}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    
    </div>

  );
}
export default MemberClickDialogP;




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
  isCurrentUserAdmin: boolean;
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

function generateChatId(userId1: string, userId2: string) {
  // Sort user IDs alphabetically
  const sortedIds = [userId1, userId2].sort();
  // Join them with an underscore to create the chat ID
  return sortedIds.join("_");
}


function MemberClickDialog({ open, onClose, id, isAdmin, isCurrentUserAdmin }: MemberClickDialogProps) {
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


  const handleSendRequest = async () => {
    if (user && currentUserId) {
      if (isAdmin) {
        const chatId = generateChatId(currentUserId, id);
        const chatDocRef = doc(db, 'privatechats', chatId);
        const chatDocSnap = await getDoc(chatDocRef);

        if (chatDocSnap.exists()) {
          router.push(`/community/private-chat/${user.name.toLowerCase().replace(/\s+/g, '-')}/?pId=${generateChatId(currentUserId, id)}`);
        } else {
          await setDoc(chatDocRef, {
            participants: [currentUserId, id],
            chatStatus: 'requested',
            createdAt: Timestamp.now(),
          });

          const currentUserDocRef = doc(db, 'users', currentUserId);
          const recipientUserDocRef = doc(db, 'admin', id);

          await updateDoc(currentUserDocRef, {
            sentRequests: arrayUnion(id),
            chatList: arrayUnion({ id: id, isAdmin: true }),
          });

          await updateDoc(recipientUserDocRef, {
            receivedRequests: arrayUnion(currentUserId),
          });
          toast.success('Chat request sent!');
          setSendrequestDialog(false);
          onClose();
          router.push(`/community/private-chat/${user.name.toLowerCase().replace(/\s+/g, '-')}/?pId=${generateChatId(currentUserId, id)}`);
        }
      }
      else {
        const chatId = generateChatId(currentUserId, id);
        const chatDocRef = doc(db, 'privatechats', chatId);
        const chatDocSnap = await getDoc(chatDocRef);

        if (chatDocSnap.exists()) {
          router.push(`/community/private-chat/${user.name.toLowerCase().replace(/\s+/g, '-')}/?pId=${generateChatId(currentUserId, id)}`);
        } else {

          await setDoc(chatDocRef, {
            participants: [currentUserId, id],
            chatStatus: 'requested',
            createdAt: Timestamp.now(),
          });

          const currentUserDocRef = doc(db, 'users', currentUserId);
          const recipientUserDocRef = doc(db, 'users', id);

          await updateDoc(currentUserDocRef, {
            sentRequests: arrayUnion(id),
            chatList: arrayUnion({ id: id, isAdmin: false }),
          });

          await updateDoc(recipientUserDocRef, {
            receivedRequests: arrayUnion(currentUserId),
          });
          toast.success('Chat request sent!');
          setSendrequestDialog(false);
          onClose();
          router.push(`/community/private-chat/${user.name.toLowerCase().replace(/\s+/g, '-')}/?pId=${generateChatId(currentUserId, id)}`);


        }
      }

    }
  };

  const handleMessageClick = async () => {
    setMessageButtonLoading(true);
    if (user && currentUserId) {
      const chatId = generateChatId(currentUserId, id);
      const chatDocRef = doc(db, 'privatechats', chatId);
      const chatDocSnap = await getDoc(chatDocRef);

      if (chatDocSnap.exists()) {
        if (isCurrentUserAdmin) {
          router.push(`/admin/community/private-chat/${user.name.toLowerCase().replace(/\s+/g, '-')}/?pId=${generateChatId(currentUserId, id)}`);
          setMessageButtonLoading(false);
        } else {
          router.push(`/community/private-chat/${user.name.toLowerCase().replace(/\s+/g, '-')}/?pId=${generateChatId(currentUserId, id)}`);
          setMessageButtonLoading(false);
        }

      } else {
        if (isCurrentUserAdmin) {
          const chatId = generateChatId(currentUserId, id);
          const chatDocRef = doc(db, 'privatechats', chatId);
          if (isAdmin) {
            await setDoc(chatDocRef, {
              participants: [currentUserId, id],
              chatStatus: 'accepted',
              createdAt: Timestamp.now(),
            });

            const currentUserDocRef = doc(db, 'admin', currentUserId);
            const recipientUserDocRef = doc(db, 'admin', id);

            await updateDoc(currentUserDocRef, {
              chatList: arrayUnion({ id: id, isAdmin: true }),
            });

            await updateDoc(recipientUserDocRef, {
              chatList: arrayUnion({ id: currentUserId, isAdmin: true }),
            });
            onClose();
            router.push(`/admin/community/private-chat/${user.name.toLowerCase().replace(/\s+/g, '-')}/?pId=${generateChatId(currentUserId, id)}`);
          }
          else {
            await setDoc(chatDocRef, {
              participants: [currentUserId, id],
              chatStatus: 'accepted',
              createdAt: Timestamp.now(),
            });

            const currentUserDocRef = doc(db, 'admin', currentUserId);
            const recipientUserDocRef = doc(db, 'users', id);

            await updateDoc(currentUserDocRef, {
              chatList: arrayUnion({ id: id, isAdmin: false }),
            });

            await updateDoc(recipientUserDocRef, {
              chatList: arrayUnion({ id: currentUserId, isAdmin: true }),
            });
            onClose();
            router.push(`/admin/community/private-chat/${user.name.toLowerCase().replace(/\s+/g, '-')}/?pId=${generateChatId(currentUserId, id)}`);
          }
        }
        else {
          setSendrequestDialog(true);
          setMessageButtonLoading(false);
        }
      }
    }
  };


  if (loading) {
    return <LoadingData />
  }

  return (

    // <Dialog
    //   open={open}
    //   onClose={onClose}
    //   className="relative z-50"
    //   aria-label="Create Channel Dialog"
    // >
    //   <DialogBackdrop className="fixed inset-0 bg-black/30" />
    //   <div className="fixed inset-0 flex items-center justify-center">
    //     <DialogPanel transition className="bg-white rounded-2xl  w-[480px] h-auto">
    //       {loading ? (
    //         <div className="flex w-[480px] h-[200px] items-center justify-center">
    //           <MessageLoading />
    //         </div>
    //       ) : (
    //         <div className="flex flex-col">
    //           <div className="flex flex-row items-start justify-between bg-purple p-4 rounded-t-2xl">
    //             <div className="flex flex-row gap-3">
    //               <div className="relative">
    //                 <Image className="rounded-full w-[96px] h-[96px]" src={user?.profilePic || '/defaultDP.svg'} alt="Profile Pic" width={96} height={96} />
    //                 {user?.isPremium === true && (
    //                   <Image
    //                     className="absolute right-0 bottom-0"
    //                     src="/icons/winnerBatch.svg"
    //                     alt="Batch"
    //                     width={28}
    //                     height={28}
    //                   />
    //                 )}
    //               </div>

    //               <div className="flex flex-col justify-center">
    //                 <h3 className="text-white text-[20px]">{user?.name}</h3>
    //                 <span className="text-white">{user?.userId}</span>

    //                 <div className="flex flex-row gap-1 bg-white bg-opacity-20 rounded-[30px] py-[2px] px-2 w-fit items-center ml-[-2px] mt-[4px]">
    //                   {isAdmin ? (
    //                     <>
    //                       <h3 className="text-white text-sm ml-[2px]">{user?.role}</h3>
    //                     </>
    //                   ) : (
    //                     <>
    //                       <Image className="w-[14px] h-[14px]" src='/icons/ey1.svg' alt="icon" width={14} height={14} />
    //                       <span className="text-white text-[13px]">Exam Year</span>
    //                       <h3 className="text-white text-base ml-[2px]">{user?.targetYear}</h3>
    //                     </>
    //                   )}
    //                 </div>

    //               </div>
    //             </div>
    //             <button onClick={onClose}>
    //               <Image className="w-[20px] h-[20px] mt-1" src='/icons/cancel-01.svg' alt="close icon" width={20} height={20} />
    //             </button>
    //           </div>
    //           <Tooltip
    //             content="Launching Soon!!!!!"
    //             placement="right"
    //             offset={15}
    //             closeDelay={100}
    //             classNames={{
    //               content: [
    //                 "bg-[#222222] text-white text-sm py-2 px-4 rounded-md",
    //               ],
    //             }}
    //           >
    //             <div className="bg-purple p-4">
    //               <button className="flex flex-row gap-2 items-center justify-center w-full h-[44px] shadow-inner-button bg-white rounded-md cursor-not-allowed">
    //                 <Image className="w-[17px] h-[17px] " src='/icons/messageicon1.svg' alt="message icon" width={16} height={16} />
    //                 <span className="text-base font-semibold text-[#182230]">Message</span>
    //               </button>
    //             </div>
    //           </Tooltip>
    //           {!isAdmin && (
    //             <div className="flex flex-col gap-2 p-4">
    //               <span className="text-[#1D2939] text-sm">Preparing Exams</span>
    //               <div className='flex flex-wrap gap-2'>
    //                 {user?.targetExams?.map((exam, index) => {
    //                   const randomColor = colors[Math.floor(Math.random() * colors.length)];
    //                   return (
    //                     <div key={index} className='flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 font-medium border border-solid border-[#D0D5DD] rounded-full cursor-pointer hover:bg-gray-100'>
    //                       <span className={`${'w-2 h-2 rounded-[50%] mr-1'} ${randomColor}`}></span>
    //                       {exam}
    //                     </div>
    //                   );
    //                 })}
    //               </div>
    //             </div>
    //           )}

    //         </div>
    //       )}

    //     </DialogPanel>
    //   </div>
    // </Dialog>
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

              <div className="bg-purple p-4">
                <button className="flex flex-row gap-2 items-center justify-center w-full h-[44px] shadow-inner-button bg-white rounded-md hover:bg-[#F2F4F7]"
                  onClick={handleMessageClick}
                  disabled={messageButtonLoading}>
                  <Image
                    className="w-[17px] h-[17px]"
                    src="/icons/messageicon1.svg"
                    alt="message icon"
                    width={16}
                    height={16}
                  />
                  {messageButtonLoading ? (
                    <div className="w-5 h-5 animate-spin-loading rounded-[50%] border-4 border-[#8181814d] border-solid border-t-4 border-t-purple"></div>
                  ) : (
                    <span className="text-base font-semibold text-[#182230]">Message</span>
                  )}
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
                          let examColor = '';
                          switch (exam) {

                            case 'JEE':
                              examColor = '#F04438'; // Red
                              break;
                            case 'BITSAT':
                              examColor = '#F79009'; // Orange
                              break;
                            case 'VITEEE':
                              examColor = '#17B26A'; // Green
                              break;
                            case 'SRMJEEE':
                              examColor = '#2E90FA'; // Purple
                              break;
                            case 'KCET':
                              examColor = '#1177BB'; // Blue
                              break;
                            case 'COMEDK':
                              examColor = '#F04438'; // Red
                              break;
                            case 'MET':
                              examColor = '#F79009'; // Orange
                              break;
                            default:
                              examColor = '#CCCCCC'; // Default gray color
                              break;

                          }
                          return (
                            <div
                              key={index}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 font-medium border border-solid border-[#D0D5DD] rounded-full cursor-pointer hover:bg-gray-100"
                            >
                              <span
                                className={`w-2 h-2 rounded-[50%] mr-1 ${exam}`}
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
      {/* Send Request Dialog */}
      <Modal isOpen={sendrequestDialog} onOpenChange={(isOpen) => !isOpen && setSendrequestDialog(false)} hideCloseButton
      >

        <ModalContent>
          <>
            <ModalHeader className="flex flex-row justify-between items-center gap-1">
              <h1 className='text-[#1D2939] font-bold text-lg'>Send Chat Request</h1>
              <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                <button><Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={() => setSendrequestDialog(false)} /></button>
              </button>
            </ModalHeader>
            <ModalBody>
              <span className="font-normal pb-2 text-sm text-[#667085]"> To start a conversation with <span className="font-bold">{user?.name}</span>, you have to send a chat request. Once your request is accepted, you will be able to send messages and communicate privately.</span>

            </ModalBody>
            <ModalFooter className="border-t border-lightGrey">
              <Button variant="light" className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]" onClick={() => setSendrequestDialog(false)}>Cancel</Button>
              <Button className="py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold border border-solid  border-white bg-[#9012FF] hover:bg-[#6D0DCC]  rounded-md" onClick={handleSendRequest} >Send Chat Request</Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal >
    </div>

  );
}
export default MemberClickDialog;




'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { auth, db } from '@/firebase';
import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import LoadingData from '@/components/Loading';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MemberClickDialogP from '@/components/DashboardComponents/CommunityComponents/PrivateChatComponents/MemberClickDialogP';

interface UserDetails {
  userId: string;
  name: string;
  profilePic: string;
  uniqueId: string;
  isOnline: boolean;
}

function generateChatId(userId1: string, userId2: string) {
  const sortedIds = [userId1, userId2].sort();
  return sortedIds.join('_');
}

function NewRequest() {
  const currentUserId = auth.currentUser?.uid;
  const [requestUsers, setRequestUsers] = useState<UserDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // To capture any errors
  const [openDialogue, setOpenDialogue] = useState(false);
  const [id, setId] = useState<string>('');
  useEffect(() => {
    if (!currentUserId) return;

    const unsubscribe = onSnapshot(doc(db, 'admin', currentUserId), async (docSnapshot) => {
      try {
        const receivedRequests: string[] = docSnapshot.data()?.receivedRequests || [];
        const usersData: UserDetails[] = await Promise.all(
          receivedRequests.map(async (uniqueId) => {
            const userDocRef = doc(db, 'users', uniqueId);
            const userDoc = await getDoc(userDocRef);
            const userData = userDoc.data();
            return {
              uniqueId,
              userId: userData?.userId || '',
              name: userData?.name || 'Unknown User',
              profilePic: userData?.profilePic || '/images/DP.png',
              isOnline: userData?.isOnline || false,
            };
          })
        );
        setRequestUsers(usersData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load requests.');
        setLoading(false);
        console.error(err);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [currentUserId]);

  const handleAccept = useCallback(
    async (userId: string) => {
      if (!currentUserId) return;

      try {
        toast.dismiss();
        const chatId = generateChatId(currentUserId, userId);
        const chatDocRef = doc(db, 'privatechats', chatId);
        await updateDoc(chatDocRef, { chatStatus: 'accepted' });

        const currentUserDocRef = doc(db, 'admin', currentUserId);
        await updateDoc(currentUserDocRef, {
          chatList: arrayUnion({ id: userId, isAdmin: false }),
        });

        await updateDoc(currentUserDocRef, {
          receivedRequests: arrayRemove(userId),
        });

        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, {
          sentRequests: arrayRemove(currentUserId),
        });

        toast.success('Chat request accepted!');
        console.log('Chat request accepted successfully.');
      } catch (error) {
        console.error('Error accepting chat request:', error);
        toast.error('Error accepting chat request.');
      }
    },
    [currentUserId]
  );

  const handleDecline = useCallback(
    async (userId: string) => {
      if (!currentUserId) return;

      try {
        toast.dismiss();
        const chatId = generateChatId(currentUserId, userId);
        const chatDocRef = doc(db, 'privatechats', chatId);
        await updateDoc(chatDocRef, { chatStatus: 'declined' });

        const currentUserDocRef = doc(db, 'admin', currentUserId);
        await updateDoc(currentUserDocRef, {
          receivedRequests: arrayRemove(userId),
        });

        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, {
          sentRequests: arrayRemove(currentUserId),
        });

        toast.warning('Chat request declined!');
        console.log('Chat request declined successfully.');
      } catch (error) {
        console.error('Error declining chat request:', error);
        toast.error('Error declining chat request.');
      }
    },
    [currentUserId]
  );

  const handleClick = (id: string) => {
    setId(id);           // Set the id of the clicked member
    setOpenDialogue(true);     // Open the dialog or perform any other action
  };


  if (loading) {
    return <LoadingData />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row min-h-[72px] justify-between px-4 items-center bg-white border-b">
        <h3>New Requests</h3>
        <div className="flex flex-row gap-1 items-center">
          <Image src="/icons/user-add.svg" alt="number of members" width={18} height={18} />
          <span className="text-[#9012FF] text-sm">{requestUsers.length}</span>
        </div>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto pt-3 pb-5">
        {requestUsers.map((user, index) => (
          <div key={index} className="flex flex-row justify-between w-full h-auto px-4 gap-3">
            <div className="flex flex-row items-center gap-2">
              <div className="relative">
                <Image
                  className="rounded-full w-[43px] h-[43px]"
                  src={user.profilePic || '/images/new-request-img.png'}
                  alt="DP"
                  width={43}
                  height={43}
                />
                <div
                  className={`absolute right-0 bottom-0 w-3 h-3 rounded-full border-2 border-white ${user.isOnline ? 'bg-green-500' : 'bg-neutral-400'
                    }`}
                ></div>
              </div>
              <div className="flex flex-col justify-start">
                <button onClick={() => handleClick(user.uniqueId)}>
                  <h2 className="text-[#182230] text-normal font-semibold hover:underline">{user.name || "phodu user"}</h2>
                </button>
                <p className="text-sm text-[#475467]">{user.userId || "phodu Id"}</p>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <button
                className="flex flex-row items-center justify-center w-1/2 bg-white hover:bg-[#F2F4F7] rounded-md border border-[#D0D5DD] px-6 py-[10px] gap-1"
                onClick={() => handleDecline(user.uniqueId)}
              >
                <Image src="/icons/multiplication-sign.svg" alt="decline user" width={18} height={18} />
                <div className="text-sm font-semibold text-[#182230]">Decline</div>
              </button>
              <button
                className="flex flex-row items-center justify-center w-1/2 bg-white hover:bg-[#F2F4F7] rounded-md border border-green-600 px-6 py-[10px] gap-1"
                onClick={() => handleAccept(user.uniqueId)}
              >
                <Image src="/icons/tick-02.svg" alt="accept user" width={18} height={18} />
                <div className="text-sm font-semibold text-green-600">Accept</div>
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
      {openDialogue && (
        <MemberClickDialogP open={true} onClose={() => setOpenDialogue(false)} id={id} isAdmin={false} />
      )}
    </div>
  );
}

export default NewRequest;

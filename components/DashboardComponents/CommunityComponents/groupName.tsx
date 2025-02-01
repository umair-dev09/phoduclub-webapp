"use client";

import React, { useEffect, useState } from "react";
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
import Image from "next/image";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/firebase";
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Groupinfo from "@/components/AdminComponents/Community/AllDialogs/Groupinfo";
import DeleteGroup from "@/components/AdminComponents/Community/AllDialogs/DeleteGroup";
import { Tooltip } from "@nextui-org/react";
import ExitGroup from "@/components/DashboardComponents/CommunityComponents/ExitGroup";
import DeleteGroupForUser from "./DeleteGroupForUser";
type GroupData = {
  communityName: string | null;
  members: { id: string, isAdmin: boolean }[] | null;
  communityImg: string | null;
  communityDescription: string | null;
  groupExitedMembers: string[],
  notificationsMuted: { id: string, mutedUntil: string }[] | null;
};

type groupNameProps = {
  communityId: string | null;
  isAdmin: boolean;

};

function GroupName({ communityId, isAdmin }: groupNameProps) {
  const [groupData, setGroupData] = useState<GroupData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [groupInfoDialog, setGroupInfoDialog] = useState(false);
  const [deleteGroupDialog, setDeleteGroupDialog] = useState(false);
  const [deleteGroupForUserDialog, setDeleteGroupForUserDialog] = useState(false);
  const [exitgroup, setExitgroup] = useState(false);

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
    const fetchGroupDataRealtime = async () => {
      try {
        if (user) {
          const groupDoc = doc(db, `communities/${communityId}`);

          // Listen to real-time updates on the document
          const unsubscribe = onSnapshot(groupDoc, (docSnapshot) => {
            if (docSnapshot.exists()) {
              const data = docSnapshot.data() as GroupData;
              setGroupData(data);
              setLoading(false);
            } else {
              console.error('No group data found!');
              setError(true);
            }
          });

          // Cleanup listener on component unmount
          return () => unsubscribe();
        }
      } catch (error) {
        console.error('Error fetching group data in real-time:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchGroupDataRealtime();
    }
  }, [user, communityId]);

  const handleMarkAsRead = async () => {
    if (!user || !communityId) {
      console.log('Missing user or communityId');
      return;
    }

    try {
      const communityRef = doc(db, 'communities', communityId);
      const docSnap = await getDoc(communityRef);

      if (!docSnap.exists()) {
        console.log('Community document does not exist');
        return;
      }

      // Get all channelsHeadings subcollection
      const channelsHeadingRef = collection(db, 'communities', communityId, 'channelsHeading');
      const headingsSnap = await getDocs(channelsHeadingRef);

      if (headingsSnap.empty) {
        console.log('No channels heading found');
        return;
      }

      for (const headingDoc of headingsSnap.docs) {
        const channelsRef = collection(headingDoc.ref, 'channels');
        const channelsSnap = await getDocs(channelsRef);

        if (!channelsSnap.empty) {
          const updatePromises = channelsSnap.docs.map(channelDoc =>
            updateDoc(channelDoc.ref, {
              channelNotification: arrayRemove(user.uid)
            })
          );
          await Promise.all(updatePromises);
        }
      }

      console.log('Successfully marked all channels as read');
      closePopover();
    } catch (error) {
      console.error('Error marking as read:', error);
      alert('Failed to mark messages as read. Please try again.');
    }
  };

  // Function to close both popovers
  const closePopover = () => setIsPopoverOpen(false);


  const handleMute = async (duration: 'eightHours' | 'oneWeek' | 'always') => {
    if (!user || !communityId) return;

    try {
      const communityRef = doc(db, 'communities', communityId);
      let mutedUntil: string;

      const now = new Date();
      switch (duration) {
        case 'eightHours':
          mutedUntil = new Date(now.getTime() + (8 * 60 * 60 * 1000)).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
          break;
        case 'oneWeek':
          mutedUntil = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000)).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
          break;
        case 'always':
          mutedUntil = 'always';
          break;
      }

      await updateDoc(communityRef, {
        notificationsMuted: arrayUnion({
          id: user.uid,
          mutedUntil
        })
      });

      closePopover();
    } catch (error) {
      console.error('Error muting notifications:', error);
    }
  };

  const handleUnmute = async () => {
    if (!user || !communityId) return;

    try {
      const communityRef = doc(db, 'communities', communityId);
      const notificationToRemove = groupData?.notificationsMuted?.find(muted => muted.id === user.uid);

      if (notificationToRemove) {
        await updateDoc(communityRef, {
          notificationsMuted: arrayRemove(notificationToRemove)
        });
      }

      closePopover();
    } catch (error) {
      console.error('Error unmuting notifications:', error);
    }
  };


  return (
    <div className='flex flex-row items-center justify-between min-h-[72px] border-b border-lightGrey'>
      <div className='flex items-center justify-center w-full h-full'>

        <Popover placement="bottom-end"
          isOpen={isPopoverOpen}
          onOpenChange={(open) => setIsPopoverOpen(open)}
          classNames={{
            trigger: "w-full",
          }}
        >
          <PopoverTrigger className="w-full h-full block">
            <div className='w-full flex flex-row items-center px-4 my-0 cursor-pointer hover:bg-gray-50'>
              <div className="flex-shrink-0 mr-3">
                {loading ? (
                  <Skeleton width={40} height={40} borderRadius={1000} />
                ) : (
                  <Image
                    className="rounded-full w-10 h-10 object-cover"
                    src={groupData?.communityImg || '/icons/membersIcon.svg'}
                    alt='group icon'
                    quality={100}
                    width={42}
                    height={42}
                  />
                )}
              </div>

              <div className='flex-1 flex items-center justify-between'>
                <div className="flex flex-col">
                  <div className='font-semibold w-32'>
                    <h4 className="truncate">{groupData?.communityName || <Skeleton width={80} height={20} />}</h4>
                  </div>
                  {loading ? (
                    <Skeleton width={60} height={18} />
                  ) : (
                    <div className='flex flex-row gap-2 text-[#4B5563]'>
                      <Image src='/icons/membersIcon.svg' alt='members icon' width={18} height={18} />
                      <p>{groupData?.members ? groupData.members.length : 0}</p>
                      {groupData?.notificationsMuted?.find(muted => muted.id === user?.uid) && (
                        <Image className={`{isMuted ? 'flex : 'none'}`} src='/icons/notification-off-02.svg' alt="Muted" width={16} height={16} />
                      )}
                    </div>
                  )}
                </div>

                <div className='flex-shrink-0'>
                  <Image
                    src="/icons/selectdate-Arrowdown.svg"
                    width={20}
                    height={20}
                    alt="Arrow-Down Button"
                  />
                </div>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto py-1 px-0 bg-white border border-lightGrey rounded-md flex flex-col">
            <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#EAECF0] '
              onClick={() => { handleMarkAsRead(); }}>
              <Image
                src="/icons/mark as read.svg"
                width={18}
                height={18}
                alt="mark as read"
              />
              <span className='font-normal text-[#0C111D] text-sm'>Mark as read</span>
            </button>
            <Popover placement="right-start">
              <PopoverTrigger className="w-[206px] px-0">
                <div className='flex flex-row gap-2 items-center justify-between h-10 w-full px-4 hover:bg-[#EAECF0] cursor-pointer'>
                  <div className='flex flex-row gap-2'>
                    {groupData?.notificationsMuted?.find(muted => muted.id === user?.uid) ? (
                      <Image
                        src="/icons/notification-off.svg"
                        width={18}
                        height={18}
                        alt="unmute-icon"
                      />
                    ) : (
                      <Image
                        src="/icons/mute.svg"
                        width={18}
                        height={18}
                        alt="mute-icon"
                      />
                    )}
                    {groupData?.notificationsMuted?.find(muted => muted.id === user?.uid) ? (
                      <span className='font-normal text-[#0C111D] text-sm'>Muted</span>
                    ) : (
                      <span className='font-normal text-[#0C111D] text-sm'>Mute</span>
                    )}

                  </div>
                  <Image
                    src="/icons/arrow-right-01-round.svg"
                    width={18}
                    height={18}
                    alt="arrow-right-01-round"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto py-1 px-0 rounded-md border border-lightGrey">
                <div>
                  {groupData?.notificationsMuted?.find(muted => muted.id === user?.uid) ? (
                    <div className="flex flex-col">
                      <div className="w-[182px] px-4 py-[10px] text-left text-sm font-normal leading-5 text-[#667085]">Muted until {groupData.notificationsMuted.find(muted => muted.id === user?.uid)?.mutedUntil}</div>
                      <button className="w-[182px] px-4 py-[10px] text-left text-sm font-normal leading-5 text-[#0C111D] hover:bg-[#EAECF0] transition-colors" onClick={handleUnmute}>Unmute</button>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <button className="w-[128px] px-4 py-[10px] text-left text-sm font-normal leading-5 text-[#0C111D] hover:bg-[#EAECF0] transition-colors" onClick={() => handleMute('eightHours')}>For 8 hours</button>
                      <button className="w-[128px] px-4 py-[10px] text-left text-sm font-normal leading-5 text-[#0C111D] hover:bg-[#EAECF0] transition-colors" onClick={() => handleMute('oneWeek')}>For 1 week</button>
                      <button className="w-[128px] px-4 py-[10px] text-left text-sm font-normal leading-5 text-[#0C111D] hover:bg-[#EAECF0] transition-colors" onClick={() => handleMute('always')}>Always</button>
                    </div>
                  )}


                </div>
              </PopoverContent>
            </Popover>
            {!isAdmin && (
              (groupData?.groupExitedMembers ?? []).includes(user?.uid ?? '') ? (
                <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#FEE4E2]'
                  onClick={() => setDeleteGroupForUserDialog(true)}>
                  <Image
                    src="/icons/delete.svg"
                    width={18}
                    height={18}
                    alt="delete"
                  />
                  <span className='font-normal text-[#DE3024] text-sm'>Delete group</span>
                </button>
              ) : (
                <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#FEE4E2]'
                  onClick={() => {
                    setExitgroup(true);
                    setIsPopoverOpen(false);
                  }}>
                  <Image
                    src="/icons/exit-channel-red.svg"
                    width={18}
                    height={18}
                    alt="media-icon"
                  />
                  <span className='font-normal text-[#DE3024] text-sm'>Exit group</span>
                </button>
              )
            )}

            {isAdmin && (
              <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#EAECF0]'
                onClick={() => {
                  setGroupInfoDialog(true);
                  setIsPopoverOpen(false);
                }}>
                <Image
                  src="/icons/information-circle.svg"
                  width={18}
                  height={18}
                  alt="information-circle"
                />
                <span className='font-normal text-[#0C111D] text-sm'>Group info</span>
              </button>
            )}

            {isAdmin && (
              <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#FEE4E2]'
                onClick={() => {
                  setDeleteGroupDialog(true);
                  setIsPopoverOpen(false);
                }}>
                <Image
                  src="/icons/delete.svg"
                  width={18}
                  height={18}
                  alt="delete"
                />
                <span className='font-normal text-[#DE3024] text-sm'>Delete group</span>
              </button>
            )}
          </PopoverContent>
        </Popover>
      </div>
      {groupInfoDialog && <Groupinfo open={groupInfoDialog} onClose={() => setGroupInfoDialog(false)} communityId={communityId || ''} communityName={groupData?.communityName || ''} communityDescription={groupData?.communityDescription || ''} communityImage={groupData?.communityImg || ''} members={groupData?.members || []} />}
      {deleteGroupDialog && <DeleteGroup open={deleteGroupDialog} onClose={() => setDeleteGroupDialog(false)} communityId={communityId || ''} communityName={groupData?.communityName || ''} />}
      {exitgroup && < ExitGroup open={exitgroup} onClose={() => setExitgroup(false)} communityId={communityId || ''} communityName={groupData?.communityName || ''} />}
      {deleteGroupForUserDialog && < DeleteGroupForUser open={deleteGroupForUserDialog} onClose={() => setDeleteGroupForUserDialog(false)} communityId={communityId || ''} communityName={groupData?.communityName || ''} />}
    </div>
  );
}

export default GroupName;
function setError(arg0: boolean) {
  throw new Error("Function not implemented.");
}


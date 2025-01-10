"use client";

import React, { useEffect, useState } from "react";
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
import Image from "next/image";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
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

};

type groupNameProps = {
  communityId: string | null;
  isAdmin: boolean;

};

function GroupName({ communityId, isAdmin }: groupNameProps) {
  const [groupData, setGroupData] = useState<GroupData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isMutePopoverOpen, setIsMutePopoverOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
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

  // Function to close both popovers
  const closePopover = () => setIsPopoverOpen(false);
  const closeMutePopover = () => setIsMutePopoverOpen(false);
  const closeBothPopovers = () => {
    closeMutePopover();
    closePopover();
  };

  // Toggles mute state
  const toggleMute = () => setIsMuted(prev => !prev);



  return (
    <div className='flex flex-row items-center justify-between h-[72px] border-b border-lightGrey py-[12px]'>

      <div className='flex items-center justify-center mr-6 gap-2'>
        {isMuted && (
          <Image className={`{isMuted ? 'flex : 'none'}`} src='/icons/notification-off-02.svg' alt="Muted" width={16} height={16} />
        )}
        <Popover placement="bottom-end"
          isOpen={isPopoverOpen}
          onOpenChange={(open) => setIsPopoverOpen(open)}>
          <PopoverTrigger>
            <button className='flex flex-row gap-2 ml-6'>
              <div className="flex items-center justify-center w-[46px] h-[46px] rounded-full">
                {loading ? (
                  <Skeleton width={40} height={40} borderRadius={1000} />
                ) : (
                  <Image className="rounded-full w-10 h-10 object-cover" src={groupData?.communityImg || '/icons/membersIcon.svg'} alt='group icon' quality={100} width={42} height={42} />
                )}
              </div>
              <div className='flex flex-row justify-between text-sm '>
                <div className="flex flex-col">
                  <div className='font-semibold'><h4>{groupData?.communityName || <Skeleton width={80} height={20} />}</h4></div>
                  {loading ? (
                    <Skeleton width={60} height={18} />
                  ) : (
                    <div className='flex flex-row gap-2 text-[#4B5563]'>
                      <Image src='/icons/membersIcon.svg' alt='members icon' width={18} height={18} />
                      <p>{groupData?.members ? groupData.members.length : 0}</p> {/* Display the number of members */}
                    </div>
                  )}
                </div>
                <div className='focus:outline-none'>
                  <Image
                    src="/icons/selectdate-Arrowdown.svg"
                    width={20}
                    height={20}
                    alt="Arrow-Down Button"
                  />
                </div>

              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto py-1 px-0 bg-white border border-lightGrey rounded-md flex flex-col">
            <Tooltip
              content="Launching Soon!!!!!"
              placement="right"
              offset={15}
              closeDelay={100}
              classNames={{
                content: [
                  "bg-[#222222] text-white text-sm py-2 px-4 rounded-md",
                ],
              }}
            >
              <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#EAECF0] cursor-not-allowed'
              >
                <Image
                  src="/icons/mark as read.svg"
                  width={18}
                  height={18}
                  alt="mark as read"
                />
                <span className='font-normal text-[#0C111D] text-sm'>Mark as read</span>
              </button>
            </Tooltip>
            <Tooltip
              content="Launching Soon!!!!!"
              placement="right"
              offset={15}
              closeDelay={100}
              classNames={{
                content: [
                  "bg-[#222222] text-white text-sm py-2 px-4 rounded-md",
                ],
              }}
            >
              <button className='flex flex-row gap-2 items-center justify-between h-10 w-[206px] px-4 hover:bg-[#EAECF0] cursor-not-allowed'>
                <div className='flex flex-row gap-2'>
                  <Image
                    src="/icons/mute.svg"
                    width={18}
                    height={18}
                    alt="mute-icon"
                  />
                  <span className='font-normal text-[#0C111D] text-sm'>Mute</span>
                </div>
                <Image
                  src="/icons/arrow-right-01-round.svg"
                  width={18}
                  height={18}
                  alt="arrow-right-01-round"
                />
              </button>
            </Tooltip>
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


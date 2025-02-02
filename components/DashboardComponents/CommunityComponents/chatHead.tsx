import React, { useState } from 'react';
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
import Image from "next/image";
import Channelinfo from '@/components/AdminComponents/Community/AllDialogs/Channelinfo';
import ChannelRequests from '@/components/AdminComponents/Community/AllDialogs/ChannelRequests';
import Delete from '@/components/AdminComponents/Community/AllDialogs/DeleteChannel';
import { Tooltip } from "@nextui-org/react";
import ExitChannel from "@/components/DashboardComponents/CommunityComponents/ExitChannel";
import MediaDialog from './MediaDialog';
import { auth, db } from '@/firebase';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

type Chat = {
  message: string;
  messageType: string;
  fileUrl: string;
  senderId: string;
  timestamp: any; // Firebase Timestamp
  chatId: string;
  fileName: string;
  fileSize: number;
  isReplying: boolean;
  replyingToId: string;
  replyingToChatId: string;
  replyingToMsg: string;
  replyingToMsgType: string;
  replyingToFileUrl: string;
  replyingToFileName: string;
  isDeleted: boolean;
  adminThatDeletedId: string;
  isDeletedByAdmin: boolean;
  isAdmin: boolean;
  mentions: { userId: string; id: string, isAdmin: boolean, }[];
};


type chatHeadProps = {
  channelName: string | null;
  channelId: string | null;
  channelEmoji: string | null;
  communityId: string | null;
  categoryId: string | null;
  channelDescription: string | null;
  notificationsMuted: { id: string, mutedUntil: string }[] | null;
  isAdmin: boolean;
  channelRequests: { id: string, requestDate: string }[];
  members: { id: string, isAdmin: boolean }[] | null;
  chats: Chat[];
  setSelectedChannel: React.Dispatch<React.SetStateAction<{
    channelId: string;
    channelName: string;
    channelEmoji: string;
    channelDescription: string;
    notificationsMuted: { id: string, mutedUntil: string }[] | null;
    headingId?: string;
    members: {
      id: string;
      isAdmin: boolean;
    }[] | null;
    channelRequests: {
      id: string;
      requestDate: string;
    }[] | null;
    declinedRequests: string[];
  } | null>>;
}

function ChatHead({ channelName, channelId, notificationsMuted, channelEmoji, members, chats, communityId, categoryId, channelDescription, isAdmin, channelRequests, setSelectedChannel }: chatHeadProps) {
  const [exitchannel, setExitchannel] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [mediaDialog, setMediaDialog] = useState(false);
  const [channelRequestsDialog, setChannelRequestsDialog] = useState(false);
  const [channelInfoDialog, setChannelInfoDialog] = useState(false);
  const currentUserId = auth.currentUser?.uid;
  const closePopover = () => setIsPopoverOpen(false);


  const handleMarkAsRead = async () => {
    try {
      const channelRef = doc(db, 'communities', communityId || '', 'channelsHeading', categoryId || '', 'channels', channelId || '');
      await updateDoc(channelRef, {
        channelNotification: arrayRemove(currentUserId)
      });
      closePopover();
    } catch (error) {
      console.error("Error marking channel as read:", error);
    }
  };

  const handleMute = async (duration: 'eightHours' | 'oneWeek' | 'always') => {
    if (!currentUserId || !communityId || !categoryId || !channelId) return;

    try {
      const communityRef = doc(db, 'communities', communityId, 'channelsHeading', categoryId, 'channels', channelId);
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
          id: currentUserId,
          mutedUntil
        })
      });

      closePopover();
    } catch (error) {
      console.error('Error muting notifications:', error);
    }
  };

  const handleUnmute = async () => {
    if (!currentUserId || !communityId || !categoryId || !channelId) return;

    try {
      const communityRef = doc(db, 'communities', communityId, 'channelsHeading', categoryId, 'channels', channelId);
      const notificationToRemove = notificationsMuted?.find(muted => muted.id === currentUserId);

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
    <div className='flex items-center justify-between h-[72px] bg-white border-b border-lightGrey gap-2'>
      <div className='flex items-center justify-center mr-6 ml-4'>
        <Popover
          placement="bottom"
          isOpen={isPopoverOpen}
          onOpenChange={(open) => setIsPopoverOpen(open)}
        >
          <PopoverTrigger>
            <button className="flex flex-row gap-2 focus:outline-none">
              <p>{channelEmoji}</p>
              <h4 className="text-base text-[#182230] font-semibold leading-[1.26rem]">{channelName}</h4>
              {(notificationsMuted || [])?.find(muted => muted.id === currentUserId) && (
                <Image className={`{isMuted ? 'flex : 'none'}`} src='/icons/notification-off-02.svg' alt="Muted" width={16} height={16} />
              )}
              <Image
                src="/icons/selectdate-Arrowdown.svg"
                width={20}
                height={20}
                alt="Arrow-Down Button"
              />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto py-1 px-0 bg-white border border-lightGrey rounded-md flex flex-col">
            {members?.some(member => member.id === currentUserId) ? (
              <>
                <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#EAECF0] '
                  onClick={handleMarkAsRead}>
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
                        {(notificationsMuted || []).find(muted => muted.id === currentUserId) ? (
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
                        {(notificationsMuted || [])?.find(muted => muted.id === currentUserId) ? (
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
                      {(notificationsMuted || [])?.find(muted => muted.id === currentUserId) ? (
                        <div className="flex flex-col">
                          <div className="w-[182px] px-4 py-[10px] text-left text-sm font-normal leading-5 text-[#667085]">Muted until {(notificationsMuted || []).find(muted => muted.id === currentUserId)?.mutedUntil}</div>
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
                  <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#FEE4E2]'
                    onClick={() => {
                      setExitchannel(true);
                      setIsPopoverOpen(false);
                    }}>
                    <Image
                      src="/icons/exit-channel-red.svg"
                      width={18}
                      height={18}
                      alt="media-icon"
                    />
                    <span className='font-normal text-[#DE3024] text-sm'>Exit channel</span>
                  </button>
                )}

                {isAdmin && (
                  // <Tooltip
                  //     content="Launching Soon!!!!!"
                  //     placement="right"
                  //     offset={15}
                  //     closeDelay={100}
                  //     classNames={{
                  //         content: [
                  //             "bg-[#222222] text-white text-sm py-2 px-4 rounded-md",
                  //         ],
                  //     }}
                  // >
                  <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#EAECF0]'
                    onClick={() => {
                      setChannelInfoDialog(true);
                      setIsPopoverOpen(false);
                    }}>
                    <Image
                      src="/icons/information-circle.svg"
                      width={18}
                      height={18}
                      alt="information-circle"
                    />
                    <span className='font-normal text-[#0C111D] text-sm'>Channel info</span>
                  </button>
                  // </Tooltip>
                )}
                {isAdmin && (
                  //  <Tooltip
                  //     content="Launching Soon!!!!!"
                  //     placement="right"
                  //     offset={15}
                  //     closeDelay={100}
                  //     classNames={{
                  //         content: [
                  //             "bg-[#222222] text-white text-sm py-2 px-4 rounded-md",
                  //         ],
                  //     }}
                  // > 
                  <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#EAECF0]'
                    onClick={() => {
                      setChannelRequestsDialog(true);
                      setIsPopoverOpen(false);
                    }
                    }>
                    <Image
                      src="/icons/channel-requests.svg"
                      width={18}
                      height={18}
                      alt="channel-requests"
                    />
                    <span className='font-normal text-[#0C111D] text-sm'>Channel Requests</span>
                  </button>
                  //    </Tooltip> 
                )}
                {isAdmin && (
                  <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#FEE4E2]'
                    onClick={() => {
                      setDeleteDialog(true);
                      setIsPopoverOpen(false);
                    }}>
                    <Image
                      src="/icons/delete.svg"
                      width={18}
                      height={18}
                      alt="delete"
                    />
                    <span className='font-normal text-[#DE3024] text-sm'>Delete</span>
                  </button>
                )}

              </>
            ) : (
              <></>
            )}
            <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#EAECF0] '
              onClick={() => {
                setMediaDialog(true);
                setIsPopoverOpen(false);
              }}>
              <Image
                src="/icons/media.svg"
                width={18}
                height={18}
                alt="media-icon"
              />
              <span className='font-normal text-[#0C111D] text-sm'>Media</span>
            </button>



          </PopoverContent>
        </Popover>
      </div>
      {channelInfoDialog && <Channelinfo open={channelInfoDialog} onClose={() => setChannelInfoDialog(false)} channelName={channelName || ''} channelId={channelId || ''} channelEmoji={channelEmoji || ''} channelDescription={channelDescription || ''} communityId={communityId || ''} categoryId={categoryId || ''} />}
      {channelRequestsDialog && <ChannelRequests open={channelRequestsDialog} onClose={() => setChannelRequestsDialog(false)} requestedUsers={channelRequests} communityId={communityId || ''} headingId={categoryId || ''} channelId={channelId || ''} />}
      {deleteDialog && <Delete open={deleteDialog} onClose={() => setDeleteDialog(false)} communityId={communityId || ''} categoryId={categoryId || ''} channelId={channelId || ''} channelName={channelName || ''} setSelectedChannel={setSelectedChannel} />}
      {exitchannel && <ExitChannel open={exitchannel} onClose={() => setExitchannel(false)} communityId={communityId || ''} channelHeadingId={categoryId || ''} channelId={channelId || ''} channelName={channelName || ''} />}
      {mediaDialog && <MediaDialog isOpen={mediaDialog} setIsOpen={() => setMediaDialog(false)} chats={chats} />}

    </div>
  );
}

export default ChatHead;

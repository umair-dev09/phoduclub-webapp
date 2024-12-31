import React, { useState } from 'react';
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
import Image from "next/image";
import Channelinfo from '@/components/AdminComponents/Community/AllDialogs/Channelinfo';
import ChannelRequests from '@/components/AdminComponents/Community/AllDialogs/ChannelRequests';
import Delete from '@/components/AdminComponents/Community/AllDialogs/DeleteChannel';

type chatHeadProps = {
    channelName: string | null; 
    channelId: string | null; 
    channelEmoji: string | null; 
    communityId: string | null; 
    categoryId: string | null; 
    channelDescription: string | null;
    isAdmin: boolean;
  }

function ChatHead({channelName,channelId,channelEmoji,communityId,categoryId,channelDescription, isAdmin}:chatHeadProps) {

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isMutePopoverOpen, setIsMutePopoverOpen] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [channelRequestsDialog, setChannelRequestsDialog] = useState(false);
    const [channelInfoDialog, setChannelInfoDialog] = useState(false);
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

    
        <div className='flex items-center justify-between h-[72px] bg-white border-b border-lightGrey gap-2'>
            <div className='flex items-center justify-center mr-6 ml-4'>
             <Popover placement="bottom">
                        <PopoverTrigger>
                            <button className="flex flex-row gap-2 focus:outline-none">
                            <p>{channelEmoji}</p>
                                <h4 className="text-base text-[#182230] font-semibold leading-[1.26rem]">{channelName}</h4>
                                <Image
                                    src="/icons/selectdate-Arrowdown.svg"
                                    width={20}
                                    height={20}
                                    alt="Arrow-Down Button"
                                />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto py-1 px-0 bg-white border border-lightGrey rounded-md flex flex-col">
                            <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#EAECF0]'>
                                <Image
                                    src="/icons/mark as read.svg"
                                    width={18}
                                    height={18}
                                    alt="mark as read"
                                />
                                <span className='font-normal text-[#0C111D] text-sm'>Mark as read</span>
                            </button>

                            <button className='flex flex-row gap-2 items-center justify-between h-10 w-[206px] px-4 hover:bg-[#EAECF0]'>
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
                            <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#EAECF0]'>
                                <Image
                                    src="/icons/media.svg"
                                    width={18}
                                    height={18}
                                    alt="media-icon"
                                />
                                <span className='font-normal text-[#0C111D] text-sm'>Media</span>
                            </button>
                            {isAdmin &&(
                                <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#EAECF0]'
                                onClick={() => setChannelInfoDialog(true)}>
                                <Image
                                    src="/icons/information-circle.svg"
                                    width={18}
                                    height={18}
                                    alt="information-circle"
                                />
                                <span className='font-normal text-[#0C111D] text-sm'>Channel info</span>
                                </button>
                            )}
                            {isAdmin &&(
                                <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#EAECF0]'
                                onClick={() => setChannelRequestsDialog(true)}>
                                <Image
                                    src="/icons/channel-requests.svg"
                                    width={18}
                                    height={18}
                                    alt="channel-requests"
                                />
                                <span className='font-normal text-[#0C111D] text-sm'>Channel Requests</span>
                            </button>
                            )}
                            {isAdmin &&(
                            <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#EAECF0]'
                            onClick={() => setDeleteDialog(true)}>
                            <Image
                                src="/icons/delete.svg"
                                width={18}
                                height={18}
                                alt="delete"
                            />
                            <span className='font-normal text-[#DE3024] text-sm'>Delete</span>
                        </button>
                            )}
                           
                          

                        </PopoverContent>
                    </Popover>
            </div>
            {channelInfoDialog && <Channelinfo open={channelInfoDialog} onClose={() => setChannelInfoDialog(false)} channelName={channelName || ''} channelId={channelId || ''} channelEmoji={channelEmoji || ''} channelDescription={channelDescription || ''} communityId={communityId || ''} categoryId={categoryId || ''} />}
            {channelRequestsDialog && <ChannelRequests open={channelRequestsDialog} onClose={() => setChannelRequestsDialog(false)} />}
            {deleteDialog && <Delete open={deleteDialog} onClose={() => setDeleteDialog(false)} communityId={communityId || ''} categoryId={categoryId || ''} channelId={channelId || ''} channelName={channelName || ''}/>}
        </div>
    );
}

export default ChatHead;

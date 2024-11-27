import React from 'react';
import Image from 'next/image';
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
function OtherChats() {
    return (
        <div className='flex flex-col justify-start w-full pl-6 gap-4'>
            <div className='flex flex-col group w-full'>
                <div className='flex flex-row items-center gap-2'>
                    <Image src='/images/dp.png' alt='dp' width={36} height={36} />
                    <h4 className='text-sm text-[#182230] font-semibold leading-[1.104rem]'>Brooklyn Simmons</h4>
                    <p className='text-xs text-[#475467] font-normal leading-[18px]'>3:24 PM</p>
                </div>
                <div className='flex flex-row items-center justify-start w-full ml-10 gap-4'>
                    <div className='max-w-[65%] w-fit px-4 py-3 bg-white text-sm text-[#182230] font-normal leading-[1.313rem] whitespace-pre-line custom-line-spacing border border-lightGrey rounded-xl'>
                        Hey <span className='font-semibold text-[#C74FE6]'>@everyone</span>,<br /><br />
                        Welcome to the channel
                    </div>
                    <div className='w-fit'>
                        <button className='flex flex-row items-center px-2 py-1 gap-1 opacity-0 hover:bg-[#D0D5DD] border border-[#6770A9] rounded-full transition-all duration-150 group-hover:opacity-100'>
                            <Image src='/icons/arrow-down.svg' alt='more' width={12} height={12} />
                            <Image src='/icons/smile.svg' alt='more' width={16} height={16} />
                        </button>
                    </div>
                </div>
                <div className='flex flex-row max-w-[65%] mt-1 ml-10 gap-2'>
                    <button className='flex flex-row items-center px-2 py-1 gap-1 bg-[#F2F4F7] border border-[#D0D5DD] rounded-full'>
                        <p className='text-[0.813rem]'>👍</p>
                        <p className='text-xs text-[#475467] font-medium leading-[1.125rem]'>24</p>
                    </button>
                    <button className='flex flex-row items-center px-2 py-1 gap-1 bg-[#F2F4F7] border border-[#D0D5DD] rounded-full'>
                        <p className='text-[0.813rem]'>👍</p>
                        <p className='text-xs text-[#475467] font-medium leading-[1.125rem]'>24</p>
                    </button>
                    <button className='flex flex-row items-center px-2 py-1 gap-1 bg-[#F2F4F7] border border-[#D0D5DD] rounded-full'>
                        <p className='text-[0.813rem]'>😎</p>
                        <p className='text-xs text-[#475467] font-medium leading-[1.125rem]'>24</p>
                    </button>
                </div>
            </div>
            <div className='flex flex-col group w-full'>
                <div className='flex flex-row items-center gap-2'>
                    <Image src='/images/dp.png' alt='dp' width={36} height={36} />
                    <h4 className='text-sm text-[#182230] font-semibold leading-[1.104rem]'>Brooklyn Simmons</h4>
                    <p className='text-xs text-[#475467] font-normal leading-[18px]'>3:24 PM</p>
                </div>
                <div className='flex flex-row items-center justify-start w-full ml-10 gap-4'>
                    <div className='max-w-[65%] w-fit px-4 py-3 bg-white text-sm text-[#667085] font-normal leading-[1.313rem] whitespace-pre-line custom-line-spacing border border-lightGrey rounded-xl'>
                        This message was deleted by <span className='font-semibold text-[#C74FE6]'>@john#2547</span>
                    </div>
                    <div className='w-fit'>
                        <Popover
                            placement="bottom-start">
                            <PopoverTrigger>
                                <button className='flex flex-row items-center px-2 py-1 gap-1 opacity-0 hover:bg-[#D0D5DD] border border-[#6770A9] rounded-full transition-all duration-150 group-hover:opacity-100'>
                                    <Image src='/icons/arrow-down.svg' alt='more' width={12} height={12} />
                                    <Image src='/icons/smile.svg' alt='more' width={16} height={16} />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className='flex flex-col bg-[#FFFFFF] w-auto h-auto border border-[#EAECF0] rounded-md shadow-md'>

                                {/* Emoji list */}


                                {/* Other options */}
                                <button className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100'>
                                    <Image src='/icons/Reply.svg' alt='search icon' width={15} height={15} />
                                    <span className='font-normal text-[#0C111D] text-sm'>Reply</span>
                                </button>
                                <button className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100'>
                                    <Image src='/icons/copy.svg' alt='search icon' width={20} height={20} />
                                    <span className='font-normal text-[#0C111D] text-sm'>Copy</span>
                                </button>
                                <button className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100'>
                                    <Image src='/icons/Bookmark.svg' alt='search icon' width={20} height={20} />
                                    <span className='font-normal text-[#0C111D] text-sm'>Bookmark</span>
                                </button>
                                <button className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100 rounded-br-md rounded-bl-md'>
                                    <Image src='/icons/Report.svg' alt='search icon' width={20} height={20} />
                                    <span className='font-normal text-[#0C111D] text-sm'>Report Message</span>
                                </button>

                            </PopoverContent>
                        </Popover>












                    </div>
                </div>
                <div className='flex flex-row max-w-[65%] mt-1 ml-10 gap-2'>
                    <button className='flex flex-row items-center px-2 py-1 gap-1 bg-[#F2F4F7] border border-[#D0D5DD] rounded-full'>
                        <p className='text-[0.813rem]'>👍</p>
                        <p className='text-xs text-[#475467] font-medium leading-[1.125rem]'>24</p>
                    </button>
                    <button className='flex flex-row items-center px-2 py-1 gap-1 bg-[#F2F4F7] border border-[#D0D5DD] rounded-full'>
                        <p className='text-[0.813rem]'>👍</p>
                        <p className='text-xs text-[#475467] font-medium leading-[1.125rem]'>24</p>
                    </button>
                    <button className='flex flex-row items-center px-2 py-1 gap-1 bg-[#F2F4F7] border border-[#D0D5DD] rounded-full'>
                        <p className='text-[0.813rem]'>😎</p>
                        <p className='text-xs text-[#475467] font-medium leading-[1.125rem]'>24</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OtherChats;
"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import GroupIcons from '@/components/DashboardComponents/CommunityComponents/groupIcons';
import General from '@/components/DashboardComponents/CommunityComponents/general';
import MockTest from '@/components/DashboardComponents/CommunityComponents/mockTest';
import Details from '@/components/DashboardComponents/CommunityComponents/details';
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
import InsideGrp from '@/components/DashboardComponents/CommunityComponents/insideGrp';

const CommunityPage = () => {
    // State to track if the section is collapsed
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Function to toggle collapse
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const [text, setText] = useState('');                   // For textarea input
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);  // Reference for textarea
    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset to auto to get the true scrollHeight
            const maxHeight = 150;          // Set the maximum height
            textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [text]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        adjustTextareaHeight();  // Adjust height dynamically on text change
    };



    const [isButtonDisabled, setIsButtonDisabled] = useState(true);



    return (
        <div className='flex flex-1 flex-row'>
            <div className='flex flex-col w-[90px] bg-white border-t border-r border-b border-lightGrey'>
                <div className='flex items-center justify-center h-[72px] border-b border-lightGrey'>
                    <div className='flex items-center justify-center w-[42px] h-[42px] bg-[#C74FE6] rounded-full'>
                        <Image src='/icons/messageIcon.svg' alt='message icon' width={18} height={18} />
                    </div>
                </div>
                <div>
                    <GroupIcons />
                </div>
            </div>
            <div className='flex flex-col w-[270px] bg-white border-t border-r border-b border-lightGrey'>
                <InsideGrp />
                <div className='flex flex-col justify-start items-center mx-4 mt-[15px] gap-6'>
                    <General />
                    <MockTest />
                </div>
            </div>
            <div className='flex flex-1 flex-col border-t border-r border-b border-lightGrey h-auto'>
                <div className='flex items-center justify-between h-[72px] bg-white border-b border-lightGrey'>
                    <div className="flex flex-row items-center gap-2 ml-6 rounded-[7px] transition-colors">
                        <Image src='/icons/PhyiscsQuicktest.png' alt="bookstack icon" width={16} height={24} />
                        <p className="font-semibold text-[#182230]">Physics 101</p>
                        <Image src='/icons/chevron-down.svg' alt='arrow down' width={20} height={20} />
                    </div>
                    <button>
                        <div className='flex flex-row mr-6 gap-4' onClick={toggleCollapse}>
                            <Image src='/icons/search.svg' alt='search icon' width={18} height={18} />
                            <Image src='/icons/collapseDetails.svg' alt='collapse details icon' width={24} height={24} />
                        </div>
                    </button>

                </div>
                <div className='flex flex-1'></div>
                <div className='flex  flex-col border-t border-r border-b border-lightGrey h-auto p-6 bg-[#FFFFFF]'>
                    <div className="flex flex-row items-center justify-center h-auto bg-[#FFFFFF] gap-3">
                        <div
                            className={`flex flex-row justify-between items-center w-full bg-[#FFFFFF] 
                                       border ${text.trim() ? 'border-[#D6BBFB]' : 'border-[#D0D5DD] '} 
                                       rounded-[9px] overflow-hidden`}
                            style={{ minHeight: '52px', maxHeight: '150px' }}
                        >


                            <textarea
                                ref={textareaRef}
                                value={text}
                                onChange={handleChange}
                                placeholder="Type your message here..."
                                className="outline-none placeholder-[#667085] font-normal w-full bg-[#FCFCFD] resize-none ml-6 "
                                style={{ minHeight: '24px', maxHeight: '150px', overflowY: 'auto' }}
                            />


                            <div className="flex flex-row gap-3 mr-6">
                                <Image src='/icons/emojies.svg' alt='emojis icon' width={20} height={20} />
                                <Popover placement="bottom-end">
                                    <PopoverTrigger>
                                        <button className='transition-colors hover:bg-neutral-100 hover:rounded-[100px] focus:outline-none'>
                                            <Image src='/icons/files.svg' alt='files icon' width={22} height={22} />
                                        </button>

                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div
                                            className='flex flex-col bg-[#FFFFFF] w-auto h-auto border border-[#EAECF0] rounded-md '
                                            style={{
                                                boxShadow: '0px 4px 6px -2px rgba(16, 24, 40, 0.08), 0px 12px 16px -4px rgba(16, 24, 40, 0.14)'
                                            }}>

                                            <button className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100'>

                                                <Image src='/icons/image.svg' alt='search icon' width={20} height={20} />
                                                <span className='font-normal text-[#0C111D] text-sm'>Image</span>

                                            </button>
                                            <button className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100'>

                                                <Image src='/icons/video-icon.svg' alt='search icon' width={20} height={20} />
                                                <span className='font-normal text-[#0C111D] text-sm'>Video</span>

                                            </button>
                                            <button className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100'>

                                                <Image src='/icons/documents.svg' alt='search icon' width={20} height={20} />
                                                <span className='font-normal text-[#0C111D] text-sm'>Documents</span>

                                            </button>
                                        </div>
                                    </PopoverContent>
                                </Popover>


                            </div>
                        </div>
                        <button className="">
                            <Image
                                src={text.trim() ? '/icons/sendCommunity.svg' : '/icons/send.svg'}
                                alt='send icon'
                                width={24}
                                height={24}
                                style={{ cursor: text.trim() ? 'pointer' : 'not-allowed' }}
                            />
                        </button>
                    </div>
                </div>
            </div>
            {!isCollapsed && (
                <div className={` h-auto  bg-red-600'transition-all  ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'}`}>

                    <div className='flex items-center justify-center h-[72px] border-b border-lightGrey'>
                        <div className='flex flex-row justify-between w-full mx-6'>
                            <div><h3 className='text-base'>Details</h3></div>
                            <div className='flex flex-row items-center gap-[6px]'>
                                <Image src='/icons/membersIcon.svg' alt='members icon' width={18} height={18} />
                                <p className='text-sm text-[#4B5563]'>57</p>
                            </div>
                        </div>
                    </div>

                    <div className='overflow-y-auto h-auto'>
                        <Details />

                    </div>



                </div>
            )}
        </div>
    );
}

export default CommunityPage

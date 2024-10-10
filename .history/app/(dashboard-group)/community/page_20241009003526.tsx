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

    const [text, setText] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement | null>(null); // Explicitly typing the ref

    useEffect(() => {
        adjustTextareaHeight();
    }, [text]);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset the height to auto to calculate scrollHeight
            textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`; // Set height based on scrollHeight
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        adjustTextareaHeight(); // Call the height adjustment on change
    };

    const [value, setValue] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        // Disable the button if the input is empty
        setIsButtonDisabled(value.trim() === '');
    }, [value]);

    // const handleChange = (content: string) => {
    //     setValue(content);
    // };


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
                <div className="flex flex-row items-center justify-center h-auto bg-[#FFFFFF] gap-3 py-4">
                    <div className="bg-[#F7F8FB] border-b border-solid border-b-[#EAECF0] rounded-tl-[12px] rounded-tr-[12px]">
                        <textarea

                            value={value}
                            onChange={handleChange}


                            placeholder="Type your response here..."
                            className=" text-[#1D2939] focus:outline-none rounded-b-[12px] custom-quill placeholder:not-italic"
                            style={{
                                minHeight: "10px", // Initial height
                                maxHeight: "150px", // Maximum height before scrolling
                                overflowY: "auto",  // Enable scrolling if content exceeds max height
                                padding: "1rem",   // Padding to create space inside the editor
                                border: 'none',
                                fontStyle: 'normal',
                            }}
                        />





                        <div className="flex flex-row gap-3">
                            <Image src='/icons/emojies.svg' alt='emojis icon' width={20} height={20} />
                            <Popover placement="bottom-end">
                                <PopoverTrigger>
                                    <button>
                                        <Image src='/icons/files.svg' alt='files icon' width={20} height={20} />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className='flex flex-col bg-[#FFFFFF] mr-6 w-auto h-auto gap-4' onClick={toggleCollapse}>
                                        <div className='flex flex-row gap-2'>
                                            <Image src='/icons/search.svg' alt='search icon' width={18} height={18} />
                                            <span>files</span>

                                        </div>
                                        <div className='flex flex-row gap-2'>
                                            <Image src='/icons/search.svg' alt='search icon' width={18} height={18} />
                                            <span>files</span>

                                        </div>
                                        <div className='flex flex-row gap-2'>
                                            <Image src='/icons/search.svg' alt='search icon' width={18} height={18} />
                                            <span>files</span>

                                        </div>

                                    </div>
                                </PopoverContent>
                            </Popover>

                        </div>
                    </div>
                    <div className="mr-6">
                        <Image
                            src={text.trim() ? '/icons/sendCommunity.svg' : '/icons/send.svg'} // Change icon based on text input
                            alt='send icon'
                            width={24}
                            height={24}
                            style={{ cursor: text.trim() ? 'pointer' : 'not-allowed' }} // Change cursor based on text input
                        />
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

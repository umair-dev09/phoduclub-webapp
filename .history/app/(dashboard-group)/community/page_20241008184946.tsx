"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import GroupIcons from '@/components/DashboardComponents/CommunityComponents/groupIcons';
import General from '@/components/DashboardComponents/CommunityComponents/general';
import MockTest from '@/components/DashboardComponents/CommunityComponents/mockTest';

const Page = () => {
    const [message, setMessage] = useState<string>('');

    // Function to handle input change
    const handleInputChange = (e: React.FormEvent<HTMLDivElement>) => {
        setMessage(e.currentTarget.innerText); // Use innerText to get the content
    };

    return (
        <div className='flex flex-1 flex-row'>
            {/* Other columns omitted for brevity */}
            <div className='flex flex-1 flex-col border-t border-r border-b border-lightGrey'>
                <div className='flex items-center justify-between h-[72px] bg-white border-b border-lightGrey'>
                    {/* Header Content */}
                </div>
                <div className='flex flex-1'></div>
                <div className='flex flex-row items-center justify-center h-[100px] bg-white gap-3'>
                    <div className='flex flex-row justify-between w-full h-auto ml-6 px-4 py-[0.625rem] gap-2 bg-[#FCFCFD] border border-[#D0D5DD] rounded-[9px]'>
                        <div className='relative w-full'>
                            {/* Placeholder Span */}
                            {message.length === 0 && (
                                <span className='absolute left-2 top-1/2 transform -translate-y-1/2 text-[#667085]'>
                                    Type your message here...
                                </span>
                            )}
                            <div
                                contentEditable
                                className='outline-none font-normal w-full bg-[#FCFCFD] max-h-[150px] min-h-[40px] resize-none overflow-y-auto'
                                onInput={handleInputChange}
                                style={{
                                    padding: '8px',
                                    lineHeight: '1.5',
                                }}
                                // Ensure message state is set properly
                                suppressContentEditableWarning={true}
                                onBlur={(e) => setMessage(e.currentTarget.innerText)}
                            >
                                {message}
                            </div>
                        </div>
                        <div className='flex flex-row gap-3 items-end'>
                            <Image src='/icons/emojies.svg' alt='emojis icon' width={20} height={20} />
                            <Image src='/icons/files.svg' alt='files icon' width={20} height={20} />
                        </div>
                    </div>
                    <div className='mr-6'>
                        <Image src='/icons/send.svg' alt='send icon' width={24} height={24} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;

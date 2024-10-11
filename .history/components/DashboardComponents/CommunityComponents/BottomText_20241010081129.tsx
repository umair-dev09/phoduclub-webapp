"use client";
import React, { useEffect, useRef, useState } from 'react';
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
import Image from 'next/image';
function bottomtext() {
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
    return (
        <div>
            <div className='flex  flex-col border-t border-r border-b border-lightGrey h-auto p-6 bg-[#FFFFFF]'>
                <div className="flex flex-row items-center justify-center h-auto bg-[#FFFFFF] gap-3">
                    <div
                        className={`flex flex-row justify-between items-center w-full bg-[#FFFFFF] 
              border ${text.trim() ? 'border-[#D6BBFB]' : 'border-[#D0D5DD] '} 
              rounded-[9px] overflow-hidden`}
                        style={{
                            minHeight: '52px',
                            maxHeight: '150px',
                            boxShadow: text.trim() ? '0px 1px 2px 0px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px rgba(158, 119, 237, 0.12)' : 'none'
                        }}
                    >


                        <textarea
                            ref={textareaRef}
                            value={text}
                            onChange={handleChange}
                            placeholder="Type your message here..."
                            className="outline-none placeholder-[#667085] font-normal w-full bg-[#FCFCFD] resize-none ml-6 h-auto py-[11px]"
                            style={{ maxHeight: '150px', overflowY: 'auto' }}
                        />

                        <div className="flex flex-row gap-3 mr-6">
                            <Image src='/icons/emojies.svg' alt='emojis icon' width={20} height={20} />
                            <Popover placement="bottom-end">
                                <PopoverTrigger>
                                    <button className='transition-colors hover:bg-neutral-100 hover:rounded-[100px] focus:outline-none'>
                                        <Image src='/icons/files.svg' alt='files icon' width={26} height={26} />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div
                                        className='flex flex-col bg-[#FFFFFF] w-auto h-auto border border-[#EAECF0] rounded-md '
                                        style={{
                                            boxShadow: '0px 4px 6px -2px rgba(16, 24, 40, 0.08), 0px 12px 16px -4px rgba(16, 24, 40, 0.14)'
                                        }}>

                                        <button className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100 rounded-tr-md rounded-tl-md  '>

                                            <Image src='/icons/image.svg' alt='search icon' width={20} height={20} />
                                            <span className='font-normal text-[#0C111D] text-sm'>Image</span>

                                        </button>
                                        <button className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100 '>

                                            <Image src='/icons/video-icon.svg' alt='search icon' width={20} height={20} />
                                            <span className='font-normal text-[#0C111D] text-sm'>Video</span>

                                        </button>
                                        <button className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100 rounded-br-md rounded-bl-md'>

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


    )
}
export default bottomtext
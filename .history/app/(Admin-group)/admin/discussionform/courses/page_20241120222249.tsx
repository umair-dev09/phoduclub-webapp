"use client";
import Collapsible from 'react-collapsible';
import Image from 'next/image';
import { useState } from 'react';

function Courses() {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex flex-row w-full h-full">
            <div className="w-[270px] flex flex-col border-r border-solid border-[#EAECF0]">
                <div className="h-[72px] p-6 flex flex-row items-center gap-2 border-b border-solid border-[#EAECF0] bg-[#FFFFFF]">
                    <div className="rounded-full w-[42px] h-[42px] bg-[#FFECC0] items-center flex justify-center border-2 border-solid border-[#FFFFFF]">
                        <h1 className="text-[#624C18] text-base font-bold">B</h1>
                    </div>
                    <h1 className="text-[#182230] font-semibold text-sm">BITSET Full Course</h1>
                </div>
                <div className="flex flex-col overflow-y-auto">
                    <Collapsible
                        open={isOpen}  // Sets whether the content is open or closed
                        trigger={
                            <div className=' h-[60px] flex flex-row justify-between p-2 items-center ' onClick={handleToggle}>
                                <span className="font-semibold text-base text-[#1D2939]">Welcome and Introduction</span>
                                <Image
                                    src={isOpen ? '/icons/Arrow-up.svg' : '/icons/Arrow-down-1.svg'}
                                    width={20}
                                    height={20}
                                    alt="Arrow-toggle"
                                />
                            </div>
                        }
                    >
                        <div>
                            jabir
                        </div>
                    </Collapsible>
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="h-[72px] p-6 flex items-center border-b border-solid border-[#EAECF0] bg-[#FFFFFF]">
                    <span className="text-[#182230] font-semibold text-base">1. Welcome and Introduction</span>
                </div>
            </div>
        </div>
    );
}

export default Courses;

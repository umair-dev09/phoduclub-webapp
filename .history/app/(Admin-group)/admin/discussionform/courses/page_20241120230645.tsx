"use client";
import Collapsible from 'react-collapsible';
import Image from 'next/image';
import { useState } from 'react';

function Courses() {
    // Create an object to track the state of each collapsible
    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
        welcome: false,
        maths: false,
        chemistry: false,
        physics: false,
    });

    // Toggle function for each section
    const handleToggle = (section: string) => {
        setOpenSections(prevState => ({
            ...prevState,
            [section]: !prevState[section], // Toggle the specific section
        }));
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
                        open={openSections.welcome} // Control open state based on individual section
                        trigger={
                            <div
                                className="h-[60px] flex flex-row justify-between py-2 px-4 items-center"
                                onClick={() => handleToggle('welcome')} // Pass section name to toggle function
                            >
                                <span className="font-semibold text-base text-[#1D2939] text-left">Welcome and Introduction</span>
                                <Image
                                    src={openSections.welcome ? '/icons/arrow-up-dark.svg' : '/icons/arrow-down-dark.svg'}
                                    width={20}
                                    height={20}
                                    alt="Arrow-toggle"
                                />
                            </div>
                        }
                    >
                        <button className='bg-[#FFFFFF] w-full flex flex-col justify-center gap-2 h-[64px] px-4 hover:bg-[#F8F0FF]'>
                            <span className="font-semibold text-sm text-[#1D2939] text-left">1. Welcome and Introduction</span>
                            <div className='flex flex-row gap-2'>
                                <Image
                                    src="/icons/read.svg"
                                    width={16}
                                    height={16}
                                    alt="read-icon"
                                />
                                <span className="text-[#667085] font-normal text-sm">10:00</span>
                            </div>
                        </button>
                    </Collapsible>

                    <Collapsible
                        open={openSections.maths} // Control open state based on individual section
                        trigger={
                            <div
                                className="border-t border-solid border-[#EAECF0] flex flex-row justify-between py-2 px-4 items-center"
                                onClick={() => handleToggle('maths')} // Pass section name to toggle function
                            >
                                <span className="font-semibold text-base text-[#1D2939] text-left">Maths</span>
                                <Image
                                    src={openSections.maths ? '/icons/arrow-up-dark.svg' : '/icons/arrow-down-dark.svg'}
                                    width={20}
                                    height={20}
                                    alt="Arrow-toggle"
                                />
                            </div>
                        }
                    >
                        <div className="flex flex-col">
                            <button className='bg-[#FFFFFF] w-full flex flex-col justify-center gap-2 h-[64px] px-4 hover:bg-[#F8F0FF]'>
                                <span className="font-normal text-sm text-[#1D2939] text-left">1. Chapter 1</span>
                                <div className='flex flex-row gap-2'>
                                    <Image
                                        src="/icons/read.svg"
                                        width={16}
                                        height={16}
                                        alt="read-icon"
                                    />
                                    <span className="text-[#667085] font-normal text-sm">10:00</span>
                                </div>
                            </button>
                            <button className='bg-[#FFFFFF] w-full flex flex-col justify-center gap-2 h-[64px] px-4 hover:bg-[#F8F0FF]'>
                                <span className="font-normal text-sm text-[#1D2939] text-left">1. Chapter 2</span>
                                <div className='flex flex-row gap-2'>
                                    <Image
                                        src="/icons/read.svg"
                                        width={16}
                                        height={16}
                                        alt="read-icon"
                                    />
                                    <span className="text-[#667085] font-normal text-sm">10:00</span>
                                </div>
                            </button>
                        </div>
                    </Collapsible>

                    <Collapsible
                        open={openSections.chemistry} // Control open state based on individual section
                        trigger={
                            <div
                                className="border-t border-solid border-[#EAECF0] flex flex-row justify-between py-2 px-4 items-center"
                                onClick={() => handleToggle('chemistry')} // Pass section name to toggle function
                            >
                                <span className="font-semibold text-base text-[#1D2939] text-left">Chemistry</span>
                                <Image
                                    src={openSections.chemistry ? '/icons/arrow-up-dark.svg' : '/icons/arrow-down-dark.svg'}
                                    width={20}
                                    height={20}
                                    alt="Arrow-toggle"
                                />
                            </div>
                        }
                    >
                        <div className="flex flex-col">
                            <button className='bg-[#FFFFFF] w-full flex flex-col justify-center gap-2 h-[64px] px-4 hover:bg-[#F8F0FF]'>
                                <span className="font-normal text-sm text-[#1D2939] text-left">1. Chapter 1</span>
                                <div className='flex flex-row gap-2'>
                                    <Image
                                        src="/icons/read.svg"
                                        width={16}
                                        height={16}
                                        alt="read-icon"
                                    />
                                    <span className="text-[#667085] font-normal text-sm">10:00</span>
                                </div>
                            </button>
                            <button className='bg-[#FFFFFF] w-full flex flex-col justify-center gap-2 h-[64px] px-4 hover:bg-[#F8F0FF]'>
                                <span className="font-normal text-sm text-[#1D2939] text-left">1. Chapter 2</span>
                                <div className='flex flex-row gap-2'>
                                    <Image
                                        src="/icons/read.svg"
                                        width={16}
                                        height={16}
                                        alt="read-icon"
                                    />
                                    <span className="text-[#667085] font-normal text-sm">10:00</span>
                                </div>
                            </button>
                        </div>
                    </Collapsible>

                    <Collapsible
                        open={openSections.physics} // Control open state based on individual section
                        trigger={
                            <div
                                className="border-t border-solid border-[#EAECF0] flex flex-row justify-between py-2 px-4 items-center"
                                onClick={() => handleToggle('physics')} // Pass section name to toggle function
                            >
                                <span className="font-semibold text-base text-[#1D2939] text-left">Physics</span>
                                <Image
                                    src={openSections.physics ? '/icons/arrow-up-dark.svg' : '/icons/arrow-down-dark.svg'}
                                    width={20}
                                    height={20}
                                    alt="Arrow-toggle"
                                />
                            </div>
                        }
                    >
                        <div className="flex flex-col">
                            <button className='bg-[#FFFFFF] w-full flex flex-col justify-center gap-2 h-[64px] px-4 hover:bg-[#F8F0FF]'>
                                <span className="font-normal text-sm text-[#1D2939] text-left">1. Chapter 1</span>
                                <div className='flex flex-row gap-2'>
                                    <Image
                                        src="/icons/read.svg"
                                        width={16}
                                        height={16}
                                        alt="read-icon"
                                    />
                                    <span className="text-[#667085] font-normal text-sm">10:00</span>
                                </div>
                            </button>
                            <button className='bg-[#FFFFFF] w-full flex flex-col justify-center gap-2 h-[64px] px-4 hover:bg-[#F8F0FF]'>
                                <span className="font-normal text-sm text-[#1D2939] text-left">1. Chapter 2</span>
                                <div className='flex flex-row gap-2'>
                                    <Image
                                        src="/icons/read.svg"
                                        width={16}
                                        height={16}
                                        alt="read-icon"
                                    />
                                    <span className="text-[#667085] font-normal text-sm">10:00</span>
                                </div>
                            </button>
                        </div>
                    </Collapsible>
                </div>
            </div>
        </div>
    );
}

export default Courses;

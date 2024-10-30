import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

const Publish = () => {
    return (
        <div className='flex flex-col pt-4 pb-8 gap-4'>
            <div className='flex flex-col w-full h-auto p-6 bg-white border border-lightGrey rounded-xl gap-4'>
                <span className='font-semibold text-lg text-[#1D2939]'>Set Quiz Time</span>
                <div className='flex flex-row w-full gap-4'>
                    <div className='flex flex-col w-1/2 gap-1'>
                        <span className='font-medium text-[#1D2939] text-sm'>Start Date</span>
                        <div className='w-full py-2 px-3 border border-lightGrey rounded-md'>
                            <span className='font-normal text-[#667085] text-sm'>Select Date & Time</span>
                        </div>
                    </div>
                    <div className='flex flex-col w-1/2 gap-1'>
                        <span className='font-medium text-[#1D2939] text-sm'>End Date</span>
                        <div className='w-full py-2 px-3 border border-lightGrey rounded-md'>
                            <span className='font-normal text-[#667085] text-sm'>Select Date & Time</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-full h-auto p-5 bg-white border border-lightGrey rounded-xl gap-3'>
                <span className='font-semibold text-lg text-[#1D2939]'>About quiz</span>
                <div className='flex flex-row w-full gap-4'>
                    {/* Time Duration */}
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Time Duration</p>
                        <div className='flex flex-row w-full py-2 px-3 border border-lightGrey rounded-md gap-1 focus-within:border-[#D7BBFC] focus-within:ring-2 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'>
                            <input className='w-full outline-none' placeholder='0' />
                            <p className='text-sm font-normal text-[#182230]'>min</p>
                        </div>
                        <p className='text-[0.813rem] font-normal text-[#475467]'>Students must finish the quiz in time.</p>
                    </div>

                    {/* Marks per question */}
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Marks per question</p>
                        <div className='w-full py-2 px-3 border border-lightGrey rounded-md focus-within:border-[#D7BBFC] focus-within:ring-2 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'>
                            <input className='w-full outline-none' placeholder='0' />
                        </div>
                        <p className='text-[0.813rem] font-normal text-[#475467]'>Applies only to the correct answers.</p>
                    </div>

                    {/* Negative marks per question */}
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Negative marks per question</p>
                        <div className='w-full py-2 px-3 border border-lightGrey rounded-md focus-within:border-[#D7BBFC] focus-within:ring-2 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'>
                            <input className='w-full outline-none' placeholder='0' />
                        </div>
                        <p className='text-[0.813rem] font-normal text-[#475467]'>Applies only to the incorrect answers.</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col w-full h-auto p-5 bg-white border border-lightGrey rounded-xl gap-3'>
                <span className='font-semibold text-lg text-[#1D2939]'>About quiz</span>
                <div className='flex flex-row w-full gap-4'>
                    {/* YEAR */}
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Time Duration</p>
                        <Popover placement='bottom'>
                            <PopoverTrigger>
                                <div className='flex flex-row w-full py-2 px-3 border border-lightGrey rounded-md gap-1 focus-within:border-[#D7BBFC] focus-within:ring-2 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'>
                                    <div className='w-full text-sm text-[#667085]'>Select Year</div>
                                    <Image src='/icons/arrow-down-01-round.svg' alt='open popup' width={20} height={20} />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className='flex flex-col justify-start w-[15.625rem] h-auto py-1 px-0 bg-white border border-lightGrey rounded-md'>
                                <button className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'>2025</button>
                                <button className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'>2026</button>
                                <button className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'>2027</button>
                                <button className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'>2028</button>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* EXAM */}
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Marks per question</p>
                        <Popover placement='bottom'>
                            <PopoverTrigger>
                                <div className='flex flex-row w-full py-2 px-3 border border-lightGrey rounded-md gap-1 focus-within:border-[#D7BBFC] focus-within:ring-2 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'>
                                    <div className='w-full text-sm text-[#667085]'>Select Exam</div>
                                    <Image src='/icons/arrow-down-01-round.svg' alt='open popup' width={20} height={20} />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className='flex flex-col justify-start w-[15.625rem] h-auto py-1 px-0 bg-white border border-lightGrey rounded-md'>
                                <button className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'>JEE</button>
                                <button className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'>BITSAT</button>
                                <button className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'>VITEEE</button>
                                <button className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'>WBJEE</button>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* PRODUCT */}
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Negative marks per question</p>
                        <div>
                            <Popover placement='bottom'>
                                <PopoverTrigger>
                                    <div className='flex flex-row w-full py-2 px-3 border border-lightGrey rounded-md gap-1 focus-within:border-[#D7BBFC] focus-within:ring-2 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'>
                                        <div className='w-full text-sm text-[#667085]'>Select Product</div>
                                        <Image src='/icons/arrow-down-01-round.svg' alt='open popup' width={20} height={20} />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className='flex flex-col justify-start w-[17.063rem] h-auto py-1 px-0 bg-white border border-lightGrey rounded-md'>
                                    <button className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'>BITSAT Mastery Crash Course 2025</button>
                                    <button className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'>BITSAT Sprint Crash Course 2025</button>
                                    <button className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'>Phodu BITSAT Crash Course 2025</button>
                                    <button className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'>BITSAT Pro Crash Course 2025</button>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Publish;

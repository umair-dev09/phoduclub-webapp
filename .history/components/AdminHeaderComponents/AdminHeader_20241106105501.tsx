"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

interface HeaderProps {
    currentPage: string;
}

function Header({ currentPage }: HeaderProps) {
    const router = useRouter(); // Initialize the router

    // Handle back button click
    const handleBackClick = () => {
        router.back(); // Navigate to the previous page in the browser history
    };

    return (
        <div>
            <div className="flex w-full flex-row items-center justify-between px-6 bg-white h-[65px] rounded-t border border-b-[#e9ebf0] border-t-white border-r-white border-l-white">
                <div className='flex flex-row text-lg gap-2'
                >
                    {/* Conditionally render the back button if the current page is 'Back to Quizzes Management' */}
                    {currentPage === 'Back to Quizzes Management' && (
                        <button>
                            <Image src='/icons/arrow-left-02-round.svg' alt='back' width={24} height={24} onClick={handleBackClick} />
                        </button>
                    )}
                    {currentPage !== 'Back to Quizzes Management' && (
                        <h3>
                            {currentPage}
                        </h3>
                    )}
                    {currentPage === 'Back to Quizzes Management' && (
                        <button className='text-[#667085] text-base font-medium' onClick={handleBackClick}>
                            {currentPage}
                        </button>
                    )}
                </div>
                {currentPage === 'Role Management' && (




                    <Popover
                        placement="bottom-end"
                    >
                        <PopoverTrigger>
                            <button className='flex flex-row gap-2 h-10 items-center'>
                                <Image src='/icons/Profile-pic.png' alt="DP" width={40} height={40} />
                                <div className='flex flex-col gap-1'>
                                    <span className='text-[#1D2939] font-semibold text-sm'>Jenny Wilson</span>
                                    <span className='font-normal text-[#667085] text-sm'>Admin</span>
                                </div>
                                <Image
                                    src="/icons/by-role-arrow-down.svg"
                                    width={20}
                                    height={20}
                                    alt="Select-date Button"
                                    className='ml-2'
                                />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col px-0 text-sm font-normal bg-white border border-lightGrey rounded-md w-[167px] shadow-md"
                        >
                            <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full">
                                <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                                <span className="text-sm text-[#0C111D] font-normal">Edit Quiz</span>
                            </button>
                            <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"

                            >
                                <Image src="/icons/logout-03.svg" width={18} height={18} alt="delete-quiz" />
                                <span className="text-sm text-[#DE3024] font-normal">Log out</span>
                            </button>
                        </PopoverContent>
                    </Popover>
                )}

            </div>
        </div>
    );
}

export default Header;
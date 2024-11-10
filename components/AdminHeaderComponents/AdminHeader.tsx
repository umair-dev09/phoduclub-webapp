"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from "@nextui-org/react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

interface HeaderProps {
    currentPage: string;
}

function Header({ currentPage }: HeaderProps) {
    const router = useRouter();

    const handleBackClick = () => {
        router.back();
    };

    const isBackPage = currentPage === 'Back to Quizzes Management' || currentPage === 'Back to Test Series Management' || currentPage === 'Back to Customer Data Management' || currentPage === 'Back to Messenger';

    // Function to handle tab click and navigate to a new route
    const handleTabClick = (path: string) => {
        router.push(path);
    };

    return (
        <div className="flex w-full flex-row items-center justify-between px-6 bg-white h-[65px] rounded-t border border-b-[#e9ebf0]">
            <div className="flex flex-row items-center gap-2 text-lg">
                {isBackPage && (
                    <button onClick={handleBackClick}>
                        <Image src='/icons/arrow-left-02-round.svg' alt='back' width={24} height={24} />
                    </button>
                )}
                {currentPage !== 'My Profile' && (
                    <h2 className={!isBackPage ? "" : "text-[#667085] text-base font-medium"}>
                        {currentPage}
                    </h2>
                )}
                {currentPage === 'My Profile' && (
                    <h2 className='text-lg text-[#1D2939] font-bold'>My Profile</h2>
                )}
            </div>

            <div className="flex flex-row items-center gap-4">
                {isBackPage && currentPage !== 'Back to Customer Data Management' && currentPage !== 'Back to Messenger' && (
                    <Button variant='solid' className='w-[7.5rem] px-6 py-[0.625rem] text-sm text-[#1D2939] font-semibold bg-white border border-lightGrey rounded-md'>
                        Save
                    </Button>
                )}

                {(currentPage === 'Role Management' || currentPage === 'Customer Data Management' || currentPage === 'Marketing Integration' || currentPage === 'Quizzes Management' || currentPage === 'Test Series Management' || currentPage === 'Course Creation' || currentPage === "Dashboard") && (
                    <Popover placement="bottom-end">
                        <PopoverTrigger>
                            <button className='flex flex-row gap-2 items-center'>
                                <Image src='/icons/Profile-pic.png' alt="DP" width={40} height={40} />
                                <div className='flex flex-col'>
                                    <span className='text-[#1D2939] font-semibold text-sm'>Jenny Wilson</span>
                                    <span className='text-[#667085] text-sm'>Admin</span>
                                </div>
                                <Image src="/icons/by-role-arrow-down.svg" width={20} height={20} alt="Select-date Button" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col bg-white border border-lightGrey rounded-md w-[167px] px-0 shadow-md">
                            <button
                                className="flex items-center p-3 hover:bg-[#F2F4F7] w-full"
                                onClick={() => handleTabClick('/admin/myprofile')}
                            >
                                <Image src="/icons/profile.svg" width={18} height={18} alt="Edit-profile" />
                                <p className="text-sm text-[#0C111D] ml-2">My profile</p>
                            </button>
                            <button className="flex items-center p-3 hover:bg-[#F2F4F7] w-full">
                                <Image src="/icons/logout-03.svg" width={18} height={18} alt="Log out" />
                                <p className="text-sm text-[#DE3024] ml-2">Log out</p>
                            </button>
                        </PopoverContent>
                    </Popover>
                )}
            </div>
        </div>
    );
}

export default Header;
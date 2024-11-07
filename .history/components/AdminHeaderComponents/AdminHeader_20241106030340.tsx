"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter

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
                        <h2>
                            {currentPage}
                        </h2>
                    )}
                    {currentPage === 'Back to Quizzes Management' && (
                        <p className='text-[#667085] text-base font-medium'>
                            {currentPage}
                        </p>
                    )}
                </div>
                {currentPage === 'Role Management' && (
                    <div className=''>
                        jabir ali

                    </div>
                )}

            </div>
        </div>
    );
}

export default Header;
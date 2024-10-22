"use client";

import styles from '../../components/DashboardComponents/TabComps.module.css';
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
            <div className='flex flex-row text-lg gap-2'>
                {/* Conditionally render the back button if the current page is 'Back to Quizzes Management' */}
                {currentPage === 'Back to Quizzes Management' && (
                    <button onClick={handleBackClick}>
                        <Image src='/icons/arrow-left-02-round.svg' alt='back' width={24} height={24} />
                    </button>
                )}
                <h2 className='text-[#667085] font-medium text-[16px]'>
                    {currentPage}
                </h2>
            </div>

        </div>
    );
}

export default Header;
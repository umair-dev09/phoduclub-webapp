"use client";

import styles from '../../components/DashboardComponents/TabComps.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
        <div className={styles.headtab}>
            <div className='flex flex-row text-lg gap-2'>
                {/* Separate div for the back button */}
                {currentPage === 'Back to Quizzes Management' && (
                    <div className={styles.backButton} onClick={handleBackClick}>
                        <Image src='/icons/arrow-left-02-round.svg' alt='back' width={24} height={24} />
                    </div>
                )}
                {/* Separate div for the current page title */}
                <div className={styles.pageTitle}>
                    <h2 className='text-[#667085] font-medium text-[16px]'>{currentPage}</h2>
                </div>
            </div>
        </div>
    );
}

export default Header;

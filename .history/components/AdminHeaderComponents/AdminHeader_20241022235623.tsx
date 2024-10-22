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
            <div className={styles.headtab}>
                <button className='flex flex-row text-lg gap-2'
                    onClick={handleBackClick}>
                    {/* Conditionally render the back button if the current page is 'Back to Quizzes Management' */}
                    {currentPage === 'Back to Quizzes Management' && (

                        <Image src='/icons/arrow-left-02-round.svg' alt='back' width={24} height={24} />

                    )}
                    <h2>
                        {currentPage}
                    </h2>
                </button>
            </div>
        </div>
    );
}

export default Header;
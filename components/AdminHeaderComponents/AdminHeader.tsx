"use client";

import styles from '../../components/DashboardComponents/TabComps.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from "@nextui-org/react";

interface HeaderProps {
    currentPage: string;
}

function Header({ currentPage }: HeaderProps) {
    const router = useRouter();

    const handleBackClick = () => {
        router.back();
    };

    const isBackPage = currentPage === 'Back to Quizzes Management' || currentPage === 'Back to Test Series Management';

    return (
        <div>
            <div className={styles.headtab}>
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-row items-center text-lg gap-2">
                        {isBackPage && (
                            <button onClick={handleBackClick}>
                                <Image src='/icons/arrow-left-02-round.svg' alt='back' width={24} height={24} />
                            </button>
                        )}
                        {!isBackPage && (
                            <h2>
                                {currentPage}
                            </h2>
                        )}
                        {isBackPage && (
                            <p className="text-[#667085] text-base font-medium">
                                {currentPage}
                            </p>
                        )}
                    </div>
                    <div>
                        {isBackPage && (
                            <Button className='w-[7.5rem] px-6 py-[0.625rem] text-center text-sm text-[#1D2939] font-semibold border border-lightGrey rounded-md'>
                                Save
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
"use client";

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Learned from '@/components/DashboardComponents/LearnComponents/Learn';

interface LearnLayoutProps {
    children: ReactNode;
}

export default function LearnLayout({ children }: LearnLayoutProps) {
    const pathname = usePathname();

    // Check if the pathname matches root-level paths (quiz, test, or courses)
    const isRootLearnPath =
        pathname === '/learn/Quiz' ||
        pathname === '/learn/test' ||
        pathname === '/learn/courses';

    // Check if current path is specifically for quizzes
    const isQuiz = pathname === '/learn/Quiz';

    if (isRootLearnPath) {
        return (
            <div className="flex flex-col flex-1">
                <div
                    className={`h-auto ${isQuiz ? 'bg-[#FFFFFF]' : 'bg-[#F7F8FB]'
                        }`}
                >
                    <Learned />
                </div>
                <div className="flex flex-1 flex-col overflow-y-auto pb-8">
                    {children}
                </div>
            </div>
        );
    } else {
        return <>{children}</>;
    }
}

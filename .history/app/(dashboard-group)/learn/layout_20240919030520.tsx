"use client";
import { ReactNode } from "react";
import { useRouter } from 'next/navigation';  // Import the router to get the current path
import Learn from '@/components/DashboardComponents/LearnComponents/Learn';

interface LearnLayoutProps {
    children: ReactNode;
}

export default function LearnLayout({ children }: LearnLayoutProps) {
    const router = useRouter();

    // Paths where layout should be applied (only for /learn/quiz, /learn/test, /learn/code)
    const learnRootPaths = ['/learn/quiz', '/learn/test', '/learn/courses'];

    // Check if the path matches the root (quiz, test, code) without deeper subfolders
    const isRootPath = learnRootPaths.some((path) => router.pathname === path);

    // If it's not a root path (i.e., subfolders), do not apply layout
    if (!isRootPath) {
        return <>{children}</>;  // Render children without layout for subfolders
    }

    // If it's a root path, apply the Learn layout
    return (
        <div className="flex flex-col flex-1">
            <div className="h-[64px] bg-[#FFFFFF]">
                <Learn />
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto pb-8">
                {children}
            </div>
        </div>
    );
}
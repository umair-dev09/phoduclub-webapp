import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Learn from '@/components/DashboardComponents/LearnComponents/Learn';

interface LearnLayoutProps {
    children: ReactNode;
}

export default function SettingsLayout({ children }: LearnLayoutProps) {
    const pathname = usePathname();

    // Apply layout only for quiz, test, and course routes, not subfolders
    if (pathname?.startsWith('/learn/Quiz') || pathname?.startsWith('/learn/test') || pathname?.startsWith('/learn/courses')) {
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

    // For other routes, don't apply any layout
    return <>{children}</>;
}

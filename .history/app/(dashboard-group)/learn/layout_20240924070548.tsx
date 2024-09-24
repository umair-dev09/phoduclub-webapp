// "use client";
// import { usePathname } from 'next/navigation';
// import { ReactNode } from 'react';
// import Learn from '@/components/DashboardComponents/LearnComponents/Learn';

// interface LearnLayoutProps {
//     children: ReactNode;
// }

// export default function LearnLayout({ children }: LearnLayoutProps) {
//     const pathname = usePathname();

//     // Check if the pathname matches the root level of quiz, test, and courses but excludes subfolders like bit1, bit2, etc.

//     return (
//         <div className="flex flex-col flex-1">
//             <div className="h-[64px] bg-[#FFFFFF]">
//                 <Learn />
//             </div>
//             <div className="flex flex-1 flex-col overflow-y-auto pb-8">
//                 {children}
//             </div>
//         </div>
//     );
// }

"use client";
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Learn from '@/components/DashboardComponents/LearnComponents/Learn';

interface LearnLayoutProps {
    children: ReactNode;
}

export default function LearnLayout({ children }: LearnLayoutProps) {
    const pathname = usePathname();

    // Check if the pathname matches the root level of quiz, test, and courses but excludes subfolders like bit1, bit2, etc.
    if (
        pathname === '/learn/Quiz' ||
        pathname === '/learn/test' ||
        pathname === '/learn/courses'
    ) {
        return (
            <div className="flex flex-col flex-1">
                <div className="h-[64px] ">
                    <Learn />
                </div>
                <div className="flex flex-1 flex-col overflow-y-auto">
                    {children}
                </div>
            </div>
        );
    }
    else {
        return <>{children}</>;
    }

}

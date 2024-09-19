import { ReactNode } from 'react';
import SideButton from '@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/SideButton';

interface bitLayoutProps {
    children: ReactNode;
}

export default function bitLayout({ children }: bitLayoutProps) {
    return (
        <div className="flex flex-col w-screen h-screen bg-red-500">
            {/* Header with SideButton */}
            <div className="flex justify-end  w-[363px] h-full">
                <SideButton />
            </div>

            {/* Main content area */}
            <div className="flex-1 overflow-y-auto pb-8 p-4">
                {children}
            </div>
        </div>
    );
}

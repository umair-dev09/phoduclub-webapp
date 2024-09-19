import { ReactNode } from 'react';
import SideButton from '@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/SideButton';

interface bitLayoutProps {
    children: ReactNode;
}

export default function PurchaseLayout({ children }: bitLayoutProps) {
    return (
        <div className="h-full w-full flex">
            {/* Main content area (flexible width) */}
            <div className="flex-1 bg-gray-100">
                {children}
            </div>

            {/* Right side container with fixed width and fixed height */}
            <div className="w-[363px] bg-red-500 h-[400px] flex justify-end">
                {/* Content for the right side */}
                <SideButton />
            </div>
        </div>
    );
}

import { ReactNode } from 'react';
import SideButton from '@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/SideButton';

interface bitLayoutProps {
    children: ReactNode;
}

export default function PurchaseLayout({ children }: bitLayoutProps) {
    return (
        <div className="flex flex-col flex-1">
            <div className="h-[64px] bg-[#FFFFFF]">
                <SideButton />
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto pb-8">
                {children}
            </div>
        </div>
    );
}

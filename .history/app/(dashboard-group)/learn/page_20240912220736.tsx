import Learn from '@/components/DashboardComponents/LearnComponents/Learn';
import { ReactNode } from "react";
import MainCourse from '@/components/DashboardComponents/LearnComponents/maincourse';
import MainCourse2 from '@/components/DashboardComponents/LearnComponents/maincourse2';

interface learn {
    children: ReactNode;
}

export default function SettingsLayout({ children }: learn) {

    return (
        <div className="flex flex-col flex-1">
            <div className="h-[64px] bg-[#FFFFFF]">
                <Learn />
            </div>
            <div className="flex flex-1 flex-row">
                {children}
                <div className='flex flex-0.6 bg-green-300'>
                    <MainCourse />
                </div>
                <div className='flex flex-0.4 bg-orange-300'>
                    <MainCourse2 />
                </div>
            </div>
        </div>
    );
}
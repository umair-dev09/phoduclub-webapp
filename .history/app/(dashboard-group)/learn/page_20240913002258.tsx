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
            <div className="flex flex-1 flex-col overflow-auto mx-6">
                <div>{children}</div>
                <div className='flex flex-col w-full h-[50%]'>
                    <div><h3>My Courses</h3></div>
                    <div>
                        <MainCourse />
                    </div>
                </div>
                <div className='flex flex-col w-full h-[50%]'>
                    <div><h3>Suggested</h3></div>
                    <div>
                        <MainCourse2 />
                    </div>
                </div>
            </div>
        </div>
    );
}
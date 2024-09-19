import Learn from '@/components/DashboardComponents/LearnComponents/Learn';
import { ReactNode } from "react";
import MainCourse from '@/components/DashboardComponents/LearnComponents/maincourse';

interface learn {
    children: ReactNode;
}

export default function SettingsLayout({ children }: learn) {

    return (
        <div className="flex flex-col flex-1">
            <div className="h-[64px] bg-[#7400E0]">
                <Learn />
            </div>
            <div className="bg-blue-300 flex flex-1">
                {children}
                <MainCourse />
            </div>
        </div>
    );
}
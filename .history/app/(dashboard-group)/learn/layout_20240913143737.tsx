

import { ReactNode } from "react";
import Learn from '@/components/DashboardComponents/LearnComponents/Learn';



interface SettingsLayoutProps {
    children: ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {

    return (
        <div className="flex flex-col flex-1">
            <div className="h-[64px] bg-[#FFFFFF]">
                <Learn />
            </div>
            <div className="flex flex-1 flex-col overflow-auto">
                {children}
            </div>


        </div>
    );
}

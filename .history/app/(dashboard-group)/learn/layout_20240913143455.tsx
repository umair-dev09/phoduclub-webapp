

import { ReactNode } from "react";
import Learn from '@/components/DashboardComponents/LearnComponents/Learn';



interface SettingsLayoutProps {
    children: ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {

    return (
        <div className="mainContent">
            <div className="content1-box">
                <Learn />
            </div>
            <div className="content2-box">
                {children}
            </div>


        </div>
    );
}

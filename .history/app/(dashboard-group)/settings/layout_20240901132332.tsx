
import "./setting.css";
import { ReactNode } from "react";
import ContentBox1 from '@/components/DashboardComponents/SettingComponents/ContentBox1';



interface SettingsLayoutProps {
    children: ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {

    return (
        <div className="content">
            <div className="content1-box">
                <ContentBox1 />
            </div>
            <div className="content2-box">
                {children}
            </div>


        </div>
    );
}

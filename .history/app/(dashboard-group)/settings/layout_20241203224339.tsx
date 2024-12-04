import { ReactNode } from "react";
import ContentBox1 from '@/components/DashboardComponents/SettingComponents/ContentBox1';

interface SettingsLayoutProps {
    children: ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="flex items-stretch w-full border border-gray-300 rounded-lg m-6">
            <div className="w-1/5 bg-white flex flex-col justify-start rounded-l-lg border-r border-gray-300 px-5 pt-7">
                <ContentBox1 />
            </div>
            <div className="flex-1 bg-white flex rounded-r-lg overflow-hidden">
                {children}
            </div>
        </div>
    );
}

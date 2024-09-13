import Learn from '@/components/DashboardComponents/LearnComponents/Learn';
import { ReactNode } from "react";
interface learn {
    children: ReactNode;
}

export default function SettingsLayout({ children }: learn) {

    return (
        <div className="flex flex-col flex-1">
            <div className="h-9 px-8 border-b">
                <Learn />
            </div>
            <div className="bg-blue-300">
                {children}
            </div>
        </div>
    );
}
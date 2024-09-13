import Learn from '@/components/DashboardComponents/LearnComponents/Learn';
import { ReactNode } from "react";
interface learn {
    children: ReactNode;
}

export default function SettingsLayout({ children }: learn) {

    return (
        <div className="flex flex-col flex-1">
            <div className="h-[64px] bg-red-300">
                <Learn />
            </div>
            <div className="bg-blue-300">
                {children}
                <p>thhhhhhh</p>
            </div>
        </div>
    );
}
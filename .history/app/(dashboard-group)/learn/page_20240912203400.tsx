import Learn from '@/components/DashboardComponents/LearnComponents/Learn';
import { ReactNode } from "react";
interface learn {
    children: ReactNode;
}

export default function SettingsLayout({ children }: learn) {

    return (
        <div className="flex flex-column flex-1 mt-6 mb-6">
            <div className="content1-box">
                <Learn />
            </div>
            <div className="div">
                {children}
            </div>

        </div>
    );
}

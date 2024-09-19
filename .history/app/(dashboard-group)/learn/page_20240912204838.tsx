import Learn from '@/components/DashboardComponents/LearnComponents/Learn';
import { ReactNode } from "react";
interface learn {
    children: ReactNode;
}

export default function SettingsLayout({ children }: learn) {

    return (
        <div className="flex flex-column flex-1">
            <div className="">
                <Learn />
            </div>
            <div className="q t c">
                {children}
            </div>
        </div>
    );
}

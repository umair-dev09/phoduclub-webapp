

import { ReactNode } from "react";
import Learn from '@/components/DashboardComponents/LearnComponents/Learn';



interface LearnLayoutProps {
    children: ReactNode;
}

export default function PurchaseLayout({ children }: LearnLayoutProps) {

    return (
        <div >
            {children}
        </div>
    );
}
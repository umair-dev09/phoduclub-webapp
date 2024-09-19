
import { ReactNode } from 'react';

interface bitLayoutProps {
    children: ReactNode;
}

export default function PurchaseLayout({ children }: bitLayoutProps) {

    return (

        <div className="w-screen bg-red-500 h-full">
            {children}
        </div>

    );
}
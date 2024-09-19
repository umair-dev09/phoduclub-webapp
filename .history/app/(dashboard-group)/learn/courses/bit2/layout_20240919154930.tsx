
import { ReactNode } from 'react';

interface bitLayoutProps {
    children: ReactNode;
}

export default function PurchaseLayout({ children }: bitLayoutProps) {

    return (

        <div className="flex flex-col flex-1 bg-[#f7f8fb] w-full">
            {children}
        </div>

    );
}
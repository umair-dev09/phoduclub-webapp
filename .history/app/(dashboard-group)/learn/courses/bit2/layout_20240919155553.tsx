
import { ReactNode } from 'react';

interface bitLayoutProps {
    children: ReactNode;
}

export default function PurchaseLayout({ children }: bitLayoutProps) {

    return (

        <div className="w-[363px] bg-red-500 flex justify-end h-full">
            {children}
        </div>

    );
}
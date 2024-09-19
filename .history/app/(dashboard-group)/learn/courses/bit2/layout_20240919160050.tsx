import { ReactNode } from 'react';

interface bitLayoutProps {
    children: ReactNode;
}

export default function PurchaseLayout({ children }: bitLayoutProps) {
    return (
        <div className="h-full w-full flex">
            {/* Main content area (flexible width) */}
            <div className="flex-1 bg-gray-100">
                {children}
            </div>

            {/* Right side container with fixed width and fixed height */}

        </div>
    );
}

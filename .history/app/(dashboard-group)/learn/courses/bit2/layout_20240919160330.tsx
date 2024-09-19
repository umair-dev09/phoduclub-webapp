import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="h-screen w-full flex">
            {/* Main content area (flexible width) */}
            <div className="flex-1 bg-gray-100">
                {children}
            </div>

            {/* Right side container with fixed width and height */}
            <div className="w-[363px] bg-red-500 h-[400px] flex justify-end">
                {/* Content on the right side */}
                <p>Right Side Layout</p>
            </div>
        </div>
    );
}

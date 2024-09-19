

import { ReactNode } from "react";




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
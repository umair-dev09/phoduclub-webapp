import "./layout.css";
import { ReactNode } from 'react';
import TabComps from '@/components/DashboardComponents/TabComps';
import Header from "@/components/HeaderComponents/Header";

interface DashboardGroupProps {
    children: ReactNode;
}

export default function DashboardGroup({ children }: DashboardGroupProps) {
    return (
        <div className="h-screen bg-[#131313] flex flex-row overflow-y-auto flex-1">
            <div>
                <TabComps />
            </div>
            <div className="w-full h-full p-2">
                <div className="flex flex-col bg-[#f5f6fa] rounded-md text-[#131313] min-w-[480px] min-h-[336px] w-full m-2">
                    <div>
                        <Header />
                    </div>
                    <div className="flex-1 rounded-b-md overflow-hidden w-full h-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>

    );
}

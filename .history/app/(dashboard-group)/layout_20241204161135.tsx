import "./layout.css";
import { ReactNode } from 'react';
import TabComps from '@/components/DashboardComponents/TabComps';
import Header from "@/components/HeaderComponents/Header";

interface DashboardGroupProps {
    children: ReactNode;
}

export default function DashboardGroup({ children }: DashboardGroupProps) {
    return (
        <div className="h-screen bg-[#131313] flex flex-row overflow-y-auto w-screen">
            <div>
                <TabComps />
            </div>
            <div className="p-[10px] w-full">
                <div className="flex flex-col bg-[#f5f6fa] rounded-[5px] text-[#131313] min-w-[480px] min-h-[336px] w-full m-[10px]">
                    <div>
                        <Header />
                    </div>
                    <div className="flex-1 rounded-b-[5px] overflow-hidden">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

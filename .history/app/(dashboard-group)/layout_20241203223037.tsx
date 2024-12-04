import "./layout.css";
import { ReactNode } from 'react';
import TabComps from '@/components/DashboardComponents/TabComps';
import Header from "@/components/HeaderComponents/Header";

interface DashboardGroupProps {
    children: ReactNode;
}

export default function DashboardGroup({ children }: DashboardGroupProps) {
    return (
        <div className=" bg-[#131313] flex flex-row h-screen">
            <div>
                <TabComps />
            </div>

            <div className="flex flex-col bg-[#f5f6fa] rounded-[5px] w-full p-[10px]">
                <div>
                    <Header />
                </div>
                <div className="variable-contents">
                    {children}
                </div>
            </div>

        </div>
    );
}

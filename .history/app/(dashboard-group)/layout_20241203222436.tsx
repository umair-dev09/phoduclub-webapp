import "./layout.css";
import { ReactNode } from 'react';
import TabComps from '@/components/DashboardComponents/TabComps';
import Header from "@/components/HeaderComponents/Header";

interface DashboardGroupProps {
    children: ReactNode;
}

export default function DashboardGroup({ children }: DashboardGroupProps) {
    return (
        <div className=" bg-[#131313] flex flex-row ">
            <div>
                <TabComps />
            </div>
            <div className="contents">
                <div className="content-box">
                    <div>
                        <Header />
                    </div>
                    <div className="variable-contents">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

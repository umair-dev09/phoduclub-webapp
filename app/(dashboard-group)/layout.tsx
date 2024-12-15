import "./layout.css";
import { ReactNode } from 'react';
import TabComps from '@/components/DashboardComponents/TabComps';
import Header from "@/components/HeaderComponents/Header";
import ClientWrapper from "@/components/ClientWrapper";

interface DashboardGroupProps {
    children: ReactNode;
}

export default function DashboardGroup({ children }: DashboardGroupProps) {
    return (
        <div className=" bg-[#131313] flex flex-row h-screen ">
            <div>
                <TabComps />
            </div>
            <div className="contents">
                <div className="content-box">
                    <div>
                        <Header />
                    </div>
                    <div className="variable-contents">
                    <ClientWrapper>
                        {children}
                    </ClientWrapper>
                    </div>
                </div>
            </div>
        </div>
    );
}

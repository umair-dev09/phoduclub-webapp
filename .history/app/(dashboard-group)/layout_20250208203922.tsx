import "./layout.css";
import { ReactNode } from 'react';
import TabComps from '@/components/DashboardComponents/TabComps';
import Header from "@/components/HeaderComponents/Header";
import ClientWrapper from "@/components/ClientWrapper";
import Notification from '@/components/DashboardComponents/NotificationComponents/Notification'
import { notFound } from 'next/navigation'
interface DashboardGroupProps {
    children: ReactNode;
}

export default function DashboardGroup({ children }: DashboardGroupProps) {
    const pageExists = true; // Replace with actual validation logic

    if (!pageExists) {
        notFound(); // This will trigger Next.js's 404 page
    }
    return (
        <div className=" bg-[#131313] flex flex-row w-screen h-screen ">
            <div>
                <TabComps />
            </div>
            <div className="contents">
                <div className="content-box">
                    <div>
                        <Header />
                        <Notification />
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

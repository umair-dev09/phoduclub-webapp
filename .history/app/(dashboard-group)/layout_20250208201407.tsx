"use client"
import "./layout.css";
import { ReactNode } from 'react';
import { notFound, usePathname } from 'next/navigation';
import TabComps from '@/components/DashboardComponents/TabComps';
import Header from "@/components/HeaderComponents/Header";
import ClientWrapper from "@/components/ClientWrapper";
import Notification from '@/components/DashboardComponents/NotificationComponents/Notification'
interface DashboardGroupProps {
    children: ReactNode;
}

export default function DashboardGroup({ children }: DashboardGroupProps) {
    const pathname = usePathname(); // Get the current URL path

    // Define valid routes
    const validRoutes = [
        "/dashboard",
        "/dashboard/analytics",
        "/dashboard/settings",
        "/dashboard/profile",
    ];

    // If the route is not in the valid list, trigger a 404
    if (!validRoutes.includes(pathname)) {
        notFound();
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
                        here should the not found page should come how to call ?
                        <ClientWrapper>
                            {children}
                        </ClientWrapper>
                    </div>
                </div>
            </div>
        </div>
    );
}

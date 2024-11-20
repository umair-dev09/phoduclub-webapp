import React, { ReactNode } from "react";
import Image from "next/image";
import GroupIcons from "@/components/DashboardComponents/CommunityComponents/groupIcons";

interface CommunityLayoutProps {
    children: ReactNode;
}

function CommunityLayout({ children }: CommunityLayoutProps) {
    return (
        <div className="flex flex-1 flex-row">
            {/* Left Sidebar */}
            <div className="flex flex-col w-[90px] bg-white  border-r border-b border-lightGrey">
                <div>
                    <GroupIcons />
                </div>
            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}

export default CommunityLayout;

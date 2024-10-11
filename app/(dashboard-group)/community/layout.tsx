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
            <div className="flex flex-col w-[90px] bg-white border-t border-r border-b border-lightGrey">
                <div className="flex items-center justify-center h-[72px] border-b border-lightGrey">
                    <div className="group flex items-center justify-center relative w-[46px] h-[46px] rounded-full border-[#C74FE6] border-2 hover:border-darkPurple">
                        <div className="flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[#C74FE6] border-[#C74FE6] border-2 text-[#624C18] font-bold group-hover:border-white">
                            <Image src="/icons/messageIcon.svg" alt="message icon" width={18} height={18} />
                        </div>
                        <div className="absolute top-6 left-6 px-2 py-1 bg-red-600 rounded-full text-white text-xs font-medium hidden group-hover:flex">
                            6
                        </div>
                    </div>
                </div>
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

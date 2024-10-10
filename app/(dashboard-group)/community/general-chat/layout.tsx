import React, { ReactNode } from "react";
import Image from "next/image";
import ChatMembers from "@/components/DashboardComponents/CommunityComponents/chatMembers";

interface GeneralChatLayoutProps {
    children: ReactNode;
}

function GeneralChatLayout({ children }: GeneralChatLayoutProps) {
    return (
        <div className="flex flex-row h-full">
            <div className="flex flex-col w-[270px] bg-white border-t border-r border-lightGrey">
                <div className='flex flex-row items-center justify-between h-[72px] border-b border-lightGrey'>
                    <h2 className="ml-6 font-semibold text-[#182230]">General</h2>
                    <div className="flex flex-row items-center mr-6 gap-2">
                        <Image src='/icons/membersIcon.svg' alt="number of members" width={18} height={18} />
                        <p className="text-sm text-[#4B5563]">100</p>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-center mx-4 mt-4 gap-2">
                    <ChatMembers />
                    <ChatMembers />
                    <ChatMembers />
                    <ChatMembers />
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}

export default GeneralChatLayout
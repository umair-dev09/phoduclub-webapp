"use client";
import { Tabs, Tab } from "@nextui-org/react";
import User from "@/components/AdminComponents/UserDatabaseMangement/user";
import Banned from "@/components/AdminComponents/UserDatabaseMangement/Banned";
import { useState } from 'react';
function userdatabase() {
    // Example counts for users and banned users
    const userCount = 78; // Replace with dynamic value if necessary
    const bannedCount = 0; // Replace with dynamic value if necessary
    const [activeTab, setActiveTab] = useState("Users");
    return (
        <div className="p-8 flex flex-col overflow-y-auto w-full h-full">
            <Tabs
                aria-label="Market Integration Tabs"
                color="primary"
                variant="underlined"
                classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-solid border-[#EAECF0]",
                    cursor: "w-full bg-[#7400E0]",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-[#7400E0]",
                }}
            >
                <Tab
                    onClick={() => setActiveTab("Users")}
                    key="User"
                    title={
                        <div className="flex items-center space-x-2 hover:text-[#7400E0]">
                            {/* onClick={() => setActiveTab("Users")}> */}
                            <span
                                className={`font-medium text-base ${activeTab === "Users" ? 'text-[#7400E0]' : 'text-[#667085]'} hover:text-[#7400E0]`}
                            >
                                Users</span>
                            {userCount > 0 && (
                                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#EDE4FF] border border-[#EDE4FF] font-medium text-[#7400E0]">
                                    {userCount}
                                </div>
                            )}
                        </div>
                    }
                >
                    <User />
                </Tab>
                <Tab
                    onClick={() => setActiveTab("Banned")}
                    key="Banned"
                    title={
                        <div className="flex items-center space-x-2 hover:text-[#7400E0]">
                            {/* onClick={() => setActiveTab("Banned")}> */}
                            <span
                                className={`font-medium text-base ${activeTab === "Banned" ? 'text-[#7400E0]' : 'text-[#667085]'} hover:text-[#7400E0]`}
                            >
                                Banned</span>
                            {bannedCount > 0 && (
                                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#EDE4FF] border border-[#EDE4FF] font-medium text-[#7400E0]">
                                    {bannedCount}
                                </div>
                            )}
                        </div>
                    }
                >
                    <Banned />
                </Tab>
            </Tabs>
        </div>
    );
}

export default userdatabase;

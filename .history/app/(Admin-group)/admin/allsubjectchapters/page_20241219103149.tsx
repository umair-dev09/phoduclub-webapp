"use client";
import { Tabs, Tab } from "@nextui-org/react";
import User from "@/components/AdminComponents/UserDatabaseMangement/user";
import Banned from "@/components/AdminComponents/UserDatabaseMangement/Banned";
import { useState } from 'react';
function AllSubject() {
    const [activeTab, setActiveTab] = useState("Users");
    return (
        <div className="p-8 flex flex-col overflow-y-auto w-full h-full">
            <Tabs
                aria-label="Market Integration Tabs"
                color="primary"
                variant="underlined"
                selectedKey={activeTab}
                onSelectionChange={(key) => setActiveTab(key as string)}
                classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-solid border-[#EAECF0]",
                    cursor: "w-full bg-[#7400E0]",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-[#7400E0] hover:text-[#7400E0] ",
                }}
            >
                <Tab
                    key="Users"
                    title={
                        <div className="flex items-center space-x-2">
                            <span className="font-medium text-base">
                                Users
                            </span>
                        </div>
                    }
                >
                    <User />
                </Tab>

                <Tab
                    key="Banned"
                    title={
                        <div className="flex items-center space-x-2">
                            <span className="font-medium text-base">
                                Banned
                            </span>
                        </div>
                    }
                >
                    <Banned />
                </Tab>
            </Tabs>
        </div>
    )
}
export default AllSubject;
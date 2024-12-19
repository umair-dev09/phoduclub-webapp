"use client";
import { Tabs, Tab } from "@nextui-org/react";
import Chemistry from "@/components/AdminComponents/AllSubjectChapters/Chemistry";
import Physics from "@/components/AdminComponents/AllSubjectChapters/Physics";
import Maths from "@/components/AdminComponents/AllSubjectChapters/Maths";
import { useState } from 'react';
function AllSubject() {
    const [activeTab, setActiveTab] = useState("Chemistry");
    return (
        <div className="p-8 flex flex-col overflow-y-auto w-full h-full">
            <Tabs
                aria-label="All Subject Chapters"
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
                    key="Chemistry"
                    title={
                        <div className="flex items-center space-x-2">
                            <span className="font-medium text-base">
                                Chemistry
                            </span>
                        </div>
                    }
                >
                    <Chemistry />
                </Tab>
                <Tab
                    key="Physics"
                    title={
                        <div className="flex items-center space-x-2">
                            <span className="font-medium text-base">
                                Physics
                            </span>
                        </div>
                    }
                >
                    <Physics />
                </Tab>

                <Tab
                    key="Maths"
                    title={
                        <div className="flex items-center space-x-2">
                            <span className="font-medium text-base">
                                Maths
                            </span>
                        </div>
                    }
                >
                    <Maths />
                </Tab>
            </Tabs>
        </div>
    )
}
export default AllSubject;
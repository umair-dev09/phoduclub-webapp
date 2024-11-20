"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function DiscussionForm() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(""); // Track active tab

    const handleTabClick = (path: string) => {
        setActiveTab(path); // Set the active tab state
        router.push(path); // Navigate to the specified route
    };

    const tabs = [
        { id: "B", color: "#FFECC0", textColor: "#624C18", path: "/admin/discussionform/courses" },
        { id: "C", color: "#C0D5FF", textColor: "#122368", path: "/admin/discussionform/classes" },
        { id: "S", color: "#C0EAFF", textColor: "#124B68", path: "/admin/discussionform/schedule" },
        { id: "V", color: "#FFC0C5", textColor: "#681219", path: "/admin/discussionform/overview" },
    ];

    return (
        <div className="w-full bg-slate-500 flex">
            <div className="w-[90px] h-full bg-slate-50 p-6 flex flex-col gap-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`border-2 border-solid ${activeTab === tab.path ? "border-[#7400E0]" : "border-transparent"
                            } rounded-full w-[46px] h-[46px]`}
                        onClick={() => handleTabClick(tab.path)}
                    >
                        <div
                            className="rounded-full w-[42px] h-[42px] items-center flex justify-center border-2 border-solid border-[#FFFFFF]"
                            style={{ backgroundColor: tab.color }}
                        >
                            <h1 className="text-base font-bold" style={{ color: tab.textColor }}>
                                {tab.id}
                            </h1>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default DiscussionForm;

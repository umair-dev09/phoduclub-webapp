"use client";
import { ReactNode, useState } from 'react';
import { useRouter } from "next/navigation";

interface DashboardGroupProps {
    children: ReactNode;
}
function DiscussionForm({ children }: DashboardGroupProps) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(""); // Track active tab

    const handleTabClick = (path: any) => {
        setActiveTab(path); // Set the active tab state
        router.push(path); // Navigate to the specified route
    };

    return (
        <div className="w-full bg-slate-500">
            <div className="w-[90px] h-full bg-slate-50 p-6 flex flex-col gap-2">
                <button
                    className={`border-2 border-solid ${activeTab === "/admin/discussionform/course" ? "border-[#7400E0]" : "border-transparent"
                        } rounded-full w-[46px] h-[46px]`}
                    onClick={() => handleTabClick("/admin/discussionform/courses")}>
                    <div className="rounded-full w-[42px] h-[42px] bg-[#FFECC0] items-center flex justify-center border-2 border-solid border-[#FFFFFF]">
                        <h1 className="text-[#624C18] text-base font-bold">B</h1>
                    </div>
                </button>
                <div className=" border-2 border-solid border-[#7400E0] rounded-full w-[46px] h-[46px]">
                    <div className="rounded-full w-[42px] h-[42px] bg-[#C0D5FF] items-center flex justify-center border-2 border-solid border-[#FFFFFF] ">
                        <h1 className="text-[#122368] text-base font-bold">C</h1>
                    </div>
                </div>
                <div className=" border-2 border-solid border-[#7400E0] rounded-full w-[46px] h-[46px]">
                    <div className="rounded-full w-[42px] h-[42px] bg-[#C0EAFF] items-center flex justify-center border-2 border-solid border-[#FFFFFF]">
                        <h1 className="text-[#124B68] text-base font-bold">S</h1>
                    </div>
                </div>
                <div className=" border-2 border-solid border-[#7400E0] rounded-full w-[46px] h-[46px]">
                    <div className="rounded-full w-[42px] h-[42px] bg-[#FFC0C5] items-center flex justify-center border-2 border-solid border-[#FFFFFF]">
                        <h1 className="text-[#681219] text-base font-bold">V</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiscussionForm;

"use client";
import { ReactNode, useState, useEffect } from 'react';
import { usePathname, useRouter } from "next/navigation";
interface DiscussionFormProps {
    children: ReactNode;
}

function DiscussionForm({ children }: DiscussionFormProps) {
    const router = useRouter();
    const pathname = usePathname();  // Use the usePathname hook to get the current path
    const [activeTab, setActiveTab] = useState<string>(pathname || "");

    // Sync the activeTab with the current route when the pathname changes
    useEffect(() => {
        setActiveTab(pathname || "");  // Update activeTab with the current path
    }, [pathname]);

    const handleTabClick = (path: string) => {
        setActiveTab(path); // Set the active tab state
        router.push(path); // Navigate to the specified route
    };

    return (
        <div className="flex flex-1 flex-row">
            <div className="w-[90px] h-full bg-[#FFFFFF] p-6 flex flex-col gap-2 border-r border-solid border-[#EAECF0]">
                {/* Button 1 */}
                <button
                    className={`border-2 border-solid ${activeTab === "/admin/discussionform/courses" ? "border-[#7400E0]" : "border-transparent"
                        } rounded-full w-[46px] h-[46px]`}
                    onClick={() => handleTabClick("/admin/discussionform/courses")}>
                    <div className="rounded-full w-[42px] h-[42px] bg-[#FFECC0] items-center flex justify-center border-2 border-solid border-[#FFFFFF]">
                        <h1 className="text-[#624C18] text-base font-bold">B</h1>
                    </div>
                </button>

                {/* Button 2 */}
                <button
                    className={`border-2 border-solid ${activeTab === "/admin/discussionform/course" ? "border-[#7400E0]" : "border-transparent"
                        } rounded-full w-[46px] h-[46px]`}
                    onClick={() => handleTabClick("/admin/discussionform/course")}>
                    <div className="rounded-full w-[42px] h-[42px] bg-[#C0D5FF] items-center flex justify-center border-2 border-solid border-[#FFFFFF]">
                        <h1 className="text-[#122368] text-base font-bold">C</h1>
                    </div>
                </button>

                {/* Button 3 */}
                <button
                    className={`border-2 border-solid ${activeTab === "/admin/discussionform/session" ? "border-[#7400E0]" : "border-transparent"
                        } rounded-full w-[46px] h-[46px]`}
                    onClick={() => handleTabClick("/admin/discussionform/session")}>
                    <div className="rounded-full w-[42px] h-[42px] bg-[#C0EAFF] items-center flex justify-center border-2 border-solid border-[#FFFFFF]">
                        <h1 className="text-[#124B68] text-base font-bold">S</h1>
                    </div>
                </button>

                {/* Button 4 */}
                <button
                    className={`border-2 border-solid ${activeTab === "/admin/discussionform/video" ? "border-[#7400E0]" : "border-transparent"
                        } rounded-full w-[46px] h-[46px]`}
                    onClick={() => handleTabClick("/admin/discussionform/video")}>
                    <div className="rounded-full w-[42px] h-[42px] bg-[#FFC0C5] items-center flex justify-center border-2 border-solid border-[#FFFFFF]">
                        <h1 className="text-[#681219] text-base font-bold">V</h1>
                    </div>
                </button>
            </div>
            <div className=' bg-[#FFFFFF] flex-1'>
                {children}
            </div>
        </div>
    );
}

export default DiscussionForm;

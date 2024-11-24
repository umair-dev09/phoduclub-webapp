"use client";
import { ReactNode, useState, useEffect } from 'react';
import { usePathname, useRouter } from "next/navigation";
import Image from 'next/image';
interface CommunityProps {
    children: ReactNode;
}

function Community({ children }: CommunityProps) {
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
        <div className="flex flex-1 flex-row ">

            <div className="w-[90px] h-full bg-[#FFFFFF] flex flex-col gap-2 border-r-2 border-solid border-[#EAECF0]">
                <button className='flex items-center justify-center h-[72px] border-b border-solid border-[#EAECF0]'>
                    <div className="flex items-center justify-center w-[2.75rem] h-[2.75rem] bg-[#C74FE6] rounded-full">
                        <Image src="/icons/messageIcon.svg" alt="messages" width={18} height={18} />
                    </div>
                </button>
                <div className='flex flex-col gap-2 w-full items-center justify-center'>
                    {/* Button 1 */}
                    <button
                        className={`border-2 border-solid ${activeTab === "/admin/community/chatinfo" ? "border-[#7400E0]" : "border-transparent"
                            } rounded-full w-[46px] h-[46px]`}
                        onClick={() => handleTabClick("/admin/community/chatinfo")}>
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
                    <button className='flex items-center justify-center '>
                        <div className="flex items-center justify-center w-[2.75rem] h-[2.75rem] bg-[#EAECF0] rounded-full">
                            <Image src="/icons/plus-dark.svg" alt="plus-dark" width={18} height={18} />
                        </div>
                    </button>
                </div>
            </div>
            <div className='  flex-1 '>
                {children}
            </div>
        </div>
    );
}

export default Community;

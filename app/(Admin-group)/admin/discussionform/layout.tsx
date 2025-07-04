"use client";
import { ReactNode, useState, useEffect } from 'react';
import { usePathname, useRouter } from "next/navigation";
import CourseIcons from '@/components/AdminComponents/DiscussionForum/CourseIcons';
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
            {/* Left Sidebar */}
            <div className="flex flex-col w-[90px] bg-white  border-r border-b border-lightGrey">
                <CourseIcons />
            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}

export default DiscussionForm;

"use client";
import { ReactNode, useState, useEffect } from 'react';
import { usePathname, useRouter } from "next/navigation";
import Image from 'next/image';
import GroupIcons from '@/components/AdminComponents/Community/GroupIcons';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
interface CommunityProps {
    children: ReactNode;
}

function Community({ children }: CommunityProps) {
    const router = useRouter();
    const pathname = usePathname();  // Use the usePathname hook to get the current path
    const [activeTab, setActiveTab] = useState<string>(pathname || "");
    const [creategroup, setcreategroup] = useState(false);
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

                <div className="flex flex-col w-[90px] bg-white  border-r border-b border-lightGrey">
                <GroupIcons />
               
        </div>
        <div className='  flex-1 '>
            {children}

        </div>
        <ToastContainer />
    </div>
    );
}

export default Community;

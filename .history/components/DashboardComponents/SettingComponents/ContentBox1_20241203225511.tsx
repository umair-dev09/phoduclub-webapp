"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";


function ContentBox1() {
    const [activeTab, setActiveTab] = useState<string>('');
    const router = useRouter();
    const pathname = usePathname();
    const handleTabClick = (tabName: string, path: string) => {
        setActiveTab(tabName);
        router.push(path);
    };
    useEffect(() => {
        if (pathname) {
            const currentPath = pathname.split('/')[2]
            if (currentPath === 'profile') {
                setActiveTab('profile')
            } else if (currentPath === 'purchase') {
                setActiveTab('purchase')
            }
            else {
                setActiveTab('profile')
            }

        }
    }, [pathname]);



    return (
        <div className="space-y-2">
            <div>
                <button
                    onClick={() => handleTabClick('profile', '/settings/profile')}
                    className={`flex items-center justify-start w-full px-4 py-2 rounded-lg border-2 font-medium 
                ${activeTab === 'profile' ? 'text-purple-700 bg-purple-100 border-purple-300' : 'text-gray-800 bg-white border-white'} 
                hover:bg-purple-100 hover:text-purple-700 transition duration-150`}
                >
                    <Image
                        className={`mr-2 w-6 h-6 transition-colors ${pathname === '/profile' ? 'text-purple-700' : 'text-gray-800'}`}
                        src={activeTab === "profile" ? "/icons/profile-voilet.svg" : "/icons/profile.svg"}
                        alt="Profile Icon"
                        width={24}
                        height={25}
                    />
                    <p className="flex items-center justify-start overflow-hidden text-left">My Profile</p>
                </button>
            </div>

            <div>
                <button
                    onClick={() => handleTabClick('purchase', '/settings/purchase')}
                    className={`flex items-center justify-start w-full px-4 py-2 rounded-lg border-2 font-medium 
                ${activeTab === 'purchase' ? 'text-purple-700 bg-purple-100 border-purple-300' : 'text-gray-800 bg-white border-white'} 
                hover:bg-purple-100 hover:text-purple-700 transition duration-150`}
                >
                    <Image
                        className={`mr-2 w-6 h-6 transition-colors ${pathname === '/purchase' ? 'text-purple-700' : 'text-gray-800'}`}
                        src={activeTab === "purchase" ? "/icons/purchase-voilet.svg" : "/icons/purchase.svg"}
                        alt="Purchase Icon"
                        width={25}
                        height={25}
                    />
                    <p className="flex items-center justify-start overflow-hidden text-left">Purchase History</p>
                </button>
            </div>
        </div>
    );
}
export default ContentBox1;
"use client";

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Collapsible from 'react-collapsible';
import { Tooltip } from "@nextui-org/react";
import { onAuthStateChanged, User } from 'firebase/auth'; // Import the User type from Firebase
import { auth } from '@/firebase';
import { getFirestore, doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';

type CurrentUserData = {
    role: string;
    adminId: string;
}

interface TabCompsProps {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

function TabComps({ isCollapsed, setIsCollapsed }: TabCompsProps) {
    const router = useRouter();
    const pathname = usePathname();
    // const [isCollapsed, setIsCollapsed] = useState(false);
    const [isOpenArray, setIsOpenArray] = useState([false, false, false]);
    const [currentUserData, setCurrentUserData] = useState<CurrentUserData | null>(null);
    const [loading, setLoading] = useState(true); // Track loading state
    const [user, setUser] = useState<User | null>(null);
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                console.error('No user is logged in');
                router.push("/admin-login");
                setLoading(false); // Ensure loading is set to false even when no user is found
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        let unsubscribeFromSnapshot: () => void;
        if (user) {
            const uniqueId = user.uid;
            const userDocRef = doc(db, `admin/${uniqueId}`);

            unsubscribeFromSnapshot = onSnapshot(userDocRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data() as CurrentUserData;
                    setCurrentUserData(data);
                    setLoading(false);
                } else {
                    console.error('No user data found!');
                    setLoading(false);
                }
            }, (err) => {
                console.error('Error fetching real-time updates:', err);
                setLoading(false);
            });
        }

        return () => {
            if (unsubscribeFromSnapshot) {
                unsubscribeFromSnapshot();
            }
        };
    }, [user, db]);

    useEffect(() => {
        const savedState = localStorage.getItem('isSidebarCollapsed');
        setIsCollapsed(savedState === 'true');
    }, []);

    useEffect(() => {
        localStorage.setItem('isSidebarCollapsed', isCollapsed.toString());
    }, [isCollapsed]);

    const [activeTab, setActiveTab] = useState('');

    const handleTabClick = (tabName: string, path: string) => {
        setActiveTab(tabName);
        router.push(path);
    };

    useEffect(() => {
        if (pathname) {
            const pathParts = pathname.split('/');
            const currentPath = pathParts[2];
            const subPath = pathParts[3];

            // Set active tab for both main sections and subsections
            if (subPath && currentPath === 'content') {
                setActiveTab(subPath);
            } else {
                setActiveTab(currentPath || '');
            }
        }
    }, [pathname]);

    const handleCollapseClick = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleCollapsible = (index: number) => {
        setIsOpenArray(prev => prev.map((open, i) => (i === index ? !open : open)));
    };

    // Helper function to check if current path is within content section
    const isContentSection = () => {
        return activeTab === 'quizzesmanagement' ||
            activeTab === 'testseriesmanagement' ||
            activeTab === 'coursecreation';
    };

    const renderButtonWith = (
        label: string,
        icon: string,
        activeIcon: string,
        isActive: boolean,
        onClick: () => void
    ) => (
        <div className="relative group">
            {isCollapsed ? (
                <Tooltip
                    content={label}
                    placement="right"
                    offset={15}
                    closeDelay={100}
                    classNames={{
                        content: [
                            "bg-[#222222] text-white text-sm py-2 px-4 rounded-md",
                        ],
                    }}
                >
                    <button
                        onClick={onClick}
                        className={`flex w-full py-2 px-3 text-[14px] text-left font-normal rounded-md mb-2 transition-all 
                        ${isActive ? 'bg-[#7400E0] text-white' : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'}`}
                    >
                        <Image
                            src={isActive ? activeIcon : icon}
                            width={22}
                            height={22}
                            alt={`${label} Icon`}
                        />
                    </button>
                </Tooltip>
            ) : (
                <button
                    onClick={onClick}
                    className={`flex w-full py-2 px-3 text-[14px] text-left font-normal rounded-md mb-2 transition-all h-auto overflow-hidden
                    ${isActive ? 'bg-[#7400E0] text-white' : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'}`}
                >
                    <Image
                        src={isActive ? activeIcon : icon}
                        width={22}
                        height={22}
                        alt={`${label} Icon`}
                    />
                    {!isCollapsed && <span className="ml-2 whitespace-nowrap">{label}</span>}
                </button>
            )}
        </div>
    );


    return (
        <div className={`flex flex-col relative transition-all duration-[500ms] ease-in-out ${isCollapsed ? 'w-[3.5rem]' : 'w-[16rem]'} pl-2 py-[0.625rem] bg-[#131313]`}>
            {/* Logo Section */}
            <div className='overflow-hidden'>
                {/* <button className={`items-center justify-center w-10 h-10 mt-3 mb-[0.73rem] ml-[0.2rem] text-white font-bold bg-[#3c2f40] rounded-[0.375rem] transition-all ${isCollapsed ? 'flex' : 'hidden'}`}
                    onClick={() => { router.push("/admin") }}
                >
                    P
                </button> */}
                <p className={`items-center justify-start mt-3 mb-[0.73rem] ml-[0.2rem] transition-all ${isCollapsed ? 'flex' : 'hidden'}`}
                    onClick={() => { router.push("/admin") }}
                >
                    {/* P */}
                    <Image src='/icon.jpg' alt='phodu logo' width={40} height={40} />
                </p>
                <div className={`flex-col mt-2 mb-[0.475rem] ml-2 transition-all ${!isCollapsed ? 'flex' : 'hidden'}`}>
                    <p className='text-white text-left text-lg font-bold'>
                        <button
                            onClick={() => { router.push("/admin") }}
                        >
                            phodu
                            <span className='text-[#e29ff5] text-lg font-bold'>
                                .club
                            </span>
                        </button>
                    </p>
                    <p className='text-sm text-[#98A2B3] font-normal'>Admin</p>
                </div>
            </div>

            {/* Divider */}
            <hr className="border-t border-gray-700 mb-4" />

            {/* Dashboard Tab */}
            <div className='flex flex-col overflow-y-auto'>
                {/* Content Section with Collapsible Menu */}
                {(currentUserData?.role === 'Admin' || currentUserData?.role === 'Editor') && (
                    <Collapsible
                        trigger=
                        {isCollapsed ? (
                            <Tooltip
                                content="Content"
                                placement="right"
                                offset={15}
                                closeDelay={100}
                                classNames={{
                                    content: [
                                        "bg-[#222222] text-white text-sm py-2 px-4 rounded-md",
                                    ],
                                }}
                            >
                                <div
                                    className={`flex items-center justify-between w-full relative group mb-2 py-2 px-3 h-11 overflow-hidden rounded-md
                                ${isContentSection()
                                            ? 'bg-[#7400E0] text-white'
                                            : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'
                                        }`}
                                    onClick={() => toggleCollapsible(0)}
                                >
                                    <Image
                                        src={
                                            isContentSection()
                                                ? '/icons/admin-content.svg'
                                                : '/icons/admin-content-2.svg'
                                        }
                                        width={22}
                                        height={22}
                                        alt="Content"
                                    />
                                </div>
                            </Tooltip>
                        ) : (
                            <div
                                className={`flex items-center justify-between w-full relative group mb-2 py-2 px-3 h-11 overflow-hidden rounded-md
                            ${isContentSection()
                                        ? 'bg-[#7400E0] text-white'
                                        : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'
                                    }`}
                                onClick={() => toggleCollapsible(0)}
                            >
                                {/* Left section: Icon and label */}
                                <div className="flex items-center">
                                    <Image
                                        src={
                                            isContentSection()
                                                ? '/icons/admin-content.svg'
                                                : '/icons/admin-content-2.svg'
                                        }
                                        width={22}
                                        height={22}
                                        alt="Content"
                                    />
                                    <span className="ml-2 whitespace-nowrap">Content</span>
                                </div>

                                {/* Right section: Arrow icon */}
                                <Image
                                    src={
                                        isOpenArray[0]
                                            ? isContentSection()
                                                ? '/icons/white-arrow-up.svg'
                                                : '/icons/arrow-up-01-round.svg'
                                            : isContentSection()
                                                ? '/icons/white-arrow-down.svg'
                                                : '/icons/arrow-down-02-round.svg'
                                    }
                                    width={20}
                                    height={20}
                                    alt="Toggle"
                                />

                            </div>
                        )}



                        open={isOpenArray[0]}
                        transitionTime={300}
                    >
                        {/* Quizzes Management Button */}
                        {isCollapsed && (
                            <Tooltip content="Quizzes Management" placement='right' offset={15} closeDelay={100}
                                classNames={{
                                    content: [
                                        "bg-[#222222] text-white text-sm py-2 px-4 rounded-md",
                                    ],
                                }}>
                                <button
                                    onClick={() =>
                                        handleTabClick('quizzesmanagement', '/admin/content/quizzesmanagement')
                                    }
                                    className={` tooltip relative group flex items-center w-full h-11 overflow-hidden py-2 px-3 text-left rounded-md mb-2 transition-colors ${activeTab === 'quizzesmanagement'
                                        ? 'bg-[#444444] text-white'
                                        : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'
                                        }`}
                                >
                                    <span className='ml-1 font-medium text-base'>
                                        Q
                                    </span>
                                </button>
                            </Tooltip>
                        )}
                        {!isCollapsed && (
                            <button
                                onClick={() =>
                                    handleTabClick('quizzesmanagement', '/admin/content/quizzesmanagement')
                                }
                                className={`relative group flex items-center w-full h-11 overflow-hidden py-2 px-3 text-left rounded-md mb-2 transition-colors ${activeTab === 'quizzesmanagement'
                                    ? 'bg-[#444444] text-white'
                                    : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'
                                    }`}
                            >
                                <span className='ml-7 text-[0.813rem] whitespace-nowrap'>
                                    Quizzes Management
                                </span>
                            </button>
                        )}

                        {isCollapsed && (
                            <Tooltip content="Test Series Management" placement='right' offset={15} closeDelay={100}
                                classNames={{
                                    content: [
                                        "bg-[#222222] text-white text-sm py-2 px-4 rounded-md",
                                    ],
                                }}>
                                <button
                                    onClick={() =>
                                        handleTabClick(
                                            'testseriesmanagement',
                                            '/admin/content/testseriesmanagement'
                                        )
                                    }
                                    className={`relative group flex items-center w-full h-11 overflow-hidden py-2 px-3 text-left rounded-md mb-2 transition-colors ${activeTab === 'testseriesmanagement'
                                        ? 'bg-[#444444] text-white'
                                        : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'
                                        }`}
                                >
                                    <span className='ml-[6px] font-medium text-base'>
                                        T
                                    </span>

                                </button>
                            </Tooltip>
                        )}

                        {!isCollapsed && (
                            <button
                                onClick={() =>
                                    handleTabClick(
                                        'testseriesmanagement',
                                        '/admin/content/testseriesmanagement'
                                    )
                                }
                                className={`relative group flex items-center w-full h-10 py-2 px-3 text-left rounded-md mb-2 transition-colors ${activeTab === 'testseriesmanagement'
                                    ? 'bg-[#444444] text-white'
                                    : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'
                                    }`}
                            >
                                <span className='ml-7 text-[0.813rem] whitespace-nowrap'>
                                    Test Series Management
                                </span>

                            </button>
                        )}


                        {/* Test Series Management Button */}

                        {/* Course Creation Button */}

                        {isCollapsed && (
                            <Tooltip content="Course Creation" placement='right' offset={15} closeDelay={100}
                                classNames={{
                                    content: [
                                        "bg-[#222222] text-white text-sm py-2 px-4 rounded-md",
                                    ],
                                }}>
                                <button
                                    onClick={() =>
                                        handleTabClick('coursecreation', '/admin/content/coursecreation')
                                    }
                                    className={`relative group flex items-center w-full h-10 py-2 px-3 text-left rounded-md mb-2 transition-colors ${activeTab === 'coursecreation'
                                        ? 'bg-[#444444] text-white'
                                        : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'
                                        }`}
                                >
                                    <span className='ml-1 font-medium text-base'>
                                        C
                                    </span>
                                </button>
                            </Tooltip>
                        )}

                        {!isCollapsed && (
                            <button
                                onClick={() =>
                                    handleTabClick('coursecreation', '/admin/content/coursecreation')
                                }
                                className={`relative group flex items-center w-full h-10 py-2 px-3 text-left rounded-md mb-2 transition-colors ${activeTab === 'coursecreation'
                                    ? 'bg-[#444444] text-white'
                                    : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'
                                    }`}
                            >
                                <span className='ml-7 text-[0.813rem] whitespace-nowrap'>
                                    Course Creation
                                </span>
                            </button>
                        )}

                    </Collapsible>

                )}


                {/* Additional Tabs */}
                {(currentUserData?.role === 'Admin') && (
                    <>
                        {renderButtonWith('Role Management', '/icons/Role Management-2.svg', '/icons/Role Management.svg', activeTab === 'rolemanagement', () => handleTabClick('rolemanagement', '/admin/rolemanagement'))}
                        {renderButtonWith('User Database', '/icons/community-2.svg', '/icons/community.svg', activeTab === 'userdatabase', () => handleTabClick('userdatabase', '/admin/userdatabase'))}
                        {renderButtonWith('Marketing Integration', '/icons/Marketing Integration-2.svg', '/icons/Marketing Integration.svg', activeTab === 'marketingintegration', () => handleTabClick('marketingintegration', '/admin/marketingintegration'))}
                        {renderButtonWith('All Subject Chapters', '/icons/Subject Chapters-2.svg', '/icons/Subject Chapters-1.svg', activeTab === 'allsubjectchapters', () => handleTabClick('allsubjectchapters', '/admin/allsubjectchapters'))}
                    </>
                )}
                {(currentUserData?.role === 'Admin' || currentUserData?.role === 'Customer Care') && (
                    <>
                        {renderButtonWith('Customer Care', '/icons/community-2.svg', '/icons/community.svg', activeTab === 'customercare', () => handleTabClick('customercare', '/admin/customercare'))}
                    </>
                )}
                {(currentUserData?.role === 'Admin' || currentUserData?.role === 'Cheif Moderator') && (
                    <>
                        {renderButtonWith('Role Management Guide', '/icons/Role Management-2.svg', '/icons/Role Management.svg', activeTab === 'rolemanagementguide', () => handleTabClick('rolemanagementguide', '/admin/rolemanagementguide'))}
                    </>
                )}
                {(currentUserData?.role === 'Admin' || currentUserData?.role === 'Teacher') && (
                    <>
                        {renderButtonWith('Discussion Forum', '/icons/discussion-form.svg', '/icons/discussion-form-2.svg', activeTab === 'discussionform', () => handleTabClick('discussionform', '/admin/discussionform'))}
                    </>
                )}
                {(currentUserData?.role === 'Admin' || currentUserData?.role === 'Teacher' || currentUserData?.role === 'Cheif Moderator') && (
                    <>
                        {renderButtonWith('Community', '/icons/community-2.svg', '/icons/community.svg', activeTab === 'community', () => handleTabClick("community", '/admin/community'))}
                    </>
                )}
                <div className='w-full h-[1px] bg-[#E2E5E91A] mb-[6px]' />
                {renderButtonWith('Internal Chat', '/icons/internal-chat-1.svg', '/icons/internal-chat-2.svg', activeTab === 'internalchat', () => handleTabClick('internalchat', '/admin/internalchat'))}
            </div>
        </div>
    );
}

export default TabComps;


"use client";
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Tooltip } from "@nextui-org/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";

function TabComps() {

    const router = useRouter();
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('');

    const [showQuizDialog, setShowQuizDialog] = useState(false);
    const onStartQuiz = () => {
        setShowQuizDialog(true);
    };

    useEffect(() => {
        const savedState = localStorage.getItem('isSidebarCollapsed');
        setIsCollapsed(savedState === 'true');
    }, []);

    useEffect(() => {
        localStorage.setItem('isSidebarCollapsed', isCollapsed.toString());
    }, [isCollapsed]);



    const handleTabClick = (tabName: string, path: string) => {
        setActiveTab(tabName);
        router.push(path);
    };
    useEffect(() => {
        if (pathname) {
            const currentPath = pathname.split('/')[1];
            setActiveTab(currentPath || 'dashboard');
        }
    }, [pathname]);

    const handleCollapseClick = () => {
        setIsCollapsed(!isCollapsed);
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
            {/* Sidebar Toggle Button */}
            <button className={`flex items-center justify-center absolute top-[3.6rem] left-[97.5%] w-8 h-8 bg-white border-[0.106rem] border-lightGrey rounded-full transition-all ${isCollapsed ? ' -translate-x-1' : ''}`} onClick={handleCollapseClick}>
                {isCollapsed ? (
                    <Image className='flex flex-row items-center justify-center mr-[2px]' alt='Collapse Icon Right' src="/icons/collapse-right.svg" width={8} height={8} />
                ) : (
                    <Image className='flex flex-row items-center justify-center mr-[2px]' alt="Collapse Icon Left" src="/icons/collapse-left.svg" width={8} height={8} />
                )}
            </button>

            {/* Logo Section */}
            <div className='overflow-hidden'>
                <p className={`items-center justify-center w-10 h-10 mt-3 mb-[0.73rem] ml-[0.2rem] text-white font-bold bg-[#3c2f40] rounded-[0.375rem] transition-all ${isCollapsed ? 'flex' : 'hidden'}`}>P</p>
                <div className={`flex-col mt-2 mb-[0.475rem] ml-2 transition-all ${!isCollapsed ? 'flex' : 'hidden'}`}>
                    <p className='text-white text-lg font-bold'>phodu<span className='text-[#e29ff5] text-lg font-bold'>.club</span></p>
                    <p className='text-sm text-[#131313] font-normal'>xxxxx</p>
                </div>
            </div>

            {/* Divider */}
            <hr className="border-t border-gray-700 mb-4" />
            {/* Additional Tabs */}
            {renderButtonWith('Dashboard', '/icons/dashboard-2.svg', '/icons/dashboard.svg', activeTab === 'dashboard', () => {
                handleTabClick('dashboard', '/dashboard',); // Handles tab click logic
                setShowQuizDialog(true);
            })}
            {renderButtonWith('Learn', '/icons/learn-2.svg', '/icons/learn.svg', activeTab === 'learn', () => handleTabClick('learn', '/learn/courses'))}
            {renderButtonWith('Community', '/icons/community-2.svg', '/icons/community.svg', activeTab === 'community', () => handleTabClick('community', '/community'))}
            {renderButtonWith('Analytics', '/icons/Analytics-2.svg', '/icons/Analytics.svg', activeTab === 'analytics', () => handleTabClick('analytics', '/analytics/test-series'))}
            {renderButtonWith('Settings', '/icons/settings-2.svg', '/icons/settings.svg', activeTab === 'settings', () => handleTabClick('settings', '/settings/profile'))}

            {/* <Dialog open={showQuizDialog}  isDismissable={false} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30 " />
                <div className="fixed inset-0 flex items-center justify-center ">
                    <DialogPanel transition className="bg-[#FFFFFF] rounded-2xl w-[37.5rem]">
                        <div className="flex flex-1 relative w-full  flex-col rounded-xl">
                            <div className="absolute right-6 top-6">
                                <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">

                                </button>
                            </div>
                            <div className="flex flex-col w-full mt-8">
                                <div className="flex justify-center">
                                    <Image src='/images/physicDailogImg.svg' alt="cool image" width={120} height={120} />
                                </div>
                                <div className="flex justify-center text-xl font-bold">
                                    <h2>Lauching Soon!!!!!!!!</h2>
                                </div>
                            </div>
                            <div className="flex flex-col mt-9 mb-6 font-medium text-base text-[#1D2939]">
                                <div className="flex flex-row w-full pl-8 mb-6">
                                    <div className="flex flex-row w-1/2"><div><Image className="mr-2" src='/icons/checkmark-circle-02.svg' alt="tick circle" width={24} height={24} /></div><p>Unlock the premiun <br /> Analytics</p></div>
                                    <div className="flex flex-row w-1/2 ml-6"><div><Image className="mr-2" src='/icons/checkmark-circle-02.svg' alt="tick circle" width={24} height={24} /></div><p>Special badge for  <br /> premiun users</p></div>
                                </div>
                                <div className="flex flex-row w-full pl-8">
                                    <div className="flex flex-row w-1/2"><div><Image className="mr-2" src='/icons/checkmark-circle-02.svg' alt="tick circle" width={24} height={24} /></div><p>Be part of the premium  <br /> groups</p></div>
                                    <div className="flex flex-row w-1/2 ml-6"><div><Image className="mr-2" src='/icons/checkmark-circle-02.svg' alt="tick circle" width={24} height={24} /></div><p>Get dedicated  <br /> mentorship by IIT/NITians</p></div>
                                </div>
                            </div>
                        </div>

                    </DialogPanel>
                </div>
            </Dialog> */}
            <Modal
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                isOpen={showQuizDialog}}
            onClose={() => setShowQuizDialog(false)}
      >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                        <ModalBody>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                                risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                                quam.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                                risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                                quam.
                            </p>
                            <p>
                                Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                                adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                                officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                                nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                                deserunt nostrud ad veniam.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Action
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
        </div >
    );
}

export default TabComps;


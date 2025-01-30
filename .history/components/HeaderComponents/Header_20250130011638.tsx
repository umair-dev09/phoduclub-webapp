"use client";
import NotficationDropDown from './NotificationDropdown';
import Image from 'next/image';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import { auth } from '@/firebase';
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { Skeleton } from "@nextui-org/skeleton";
import LoadingData from '../Loading';
import HeaderLoading from './HeaderLoading';
import HelpDropDown from './HelpDropdown';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
type UserData = {
    name: string | null;
    userId: string | null;
    profilePic: string | null;
    isPremium: boolean | null;
};

function Header() {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [logoutdialog, setLogoutdialog] = useState(false);
    const db = getFirestore();

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userDocRef = doc(db, `users/${currentUser.uid}`);

                const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnapshot) => {
                    if (docSnapshot.exists()) {
                        setUserData(docSnapshot.data() as UserData);
                        setLoading(false);
                    } else {
                        setError(true);
                        router.push("/login");
                    }
                }, (err) => {
                    console.error("Error fetching user data:", err);
                    setError(true);
                });

                return () => unsubscribeSnapshot();
            } else {
                setError(true);
                router.push("/login");
            }
            setLoading(false);
        });

        return () => unsubscribeAuth();
    }, [db, router]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success("Logged out successfully!");
            router.push("/login");
        } catch (error) {
            toast.error("Error logging out. Please try again.");
            console.error("Error logging out:", error);
        }
    };

    if (loading || error) {
        return <HeaderLoading />;
    }
    return (
        <div>
            <div className="flex w-[100%] flex-row items-center justify-between pl-[25px] pr-[25px] bg-[#FFFFFF] h-[65px] rounded-t-md border border-t-white border-r-white border-l-white border-b-gray-200">
                <div className="text-lg">
                    <h2>
                        <span id="hi">Hey, <span>{userData?.name}</span>,</span> Keep up the great work!
                    </h2>
                </div>
                <div className=" flex flex-row items-center">
                    <HelpDropDown />
                    <NotficationDropDown />
                    <div className="w-[1.5px] h-[14px] bg-[#eaecf0] border-none ml-[14px] mr-[14px]" />
                    <Popover placement="bottom" isOpen={open} onOpenChange={(open) => setOpen(open)} onClose={() => setOpen(false)}>
                        <PopoverTrigger>
                            <button className='flex flex-row items-center focus:outline-none'>
                                <div className="relative">
                                    <Image className="rounded-[50%] ml-[8px]" src={userData?.profilePic || "/defaultDP.svg"} width={38} height={38} quality={100} alt="Profile Picture" />
                                    {userData?.isPremium && (
                                        <Image
                                            className="absolute right-[-2px] bottom-0"
                                            src="/icons/winnerBatch.svg"
                                            alt="Batch"
                                            width={18}
                                            height={18}
                                        />
                                    )}
                                </div>
                                <div className='flex flex-col ml-1 mr-1'>
                                    <p className='font-semibold text-[14px] mb-[-2px] text-start'>{userData?.name}</p>
                                    <p className='text-[13px] text-[#667085]'>{userData?.userId}</p>
                                </div>
                                <button className="w-[22px] h-[22px] flex items-center justify-center ml-[12px] mb-[2px]">
                                    <Image className="w-[15px] h-[15px] min-h-[15px] max-h-[15px]" src="/icons/arrowHeader.svg" width={15} height={15} alt="Arrow Icon" />
                                </button>
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col bg-white border border-lightGrey rounded-md w-[167px] px-0 shadow-md">
                            <button
                                className="flex items-center p-3 hover:bg-[#F2F4F7] w-full" onClick={() => { router.push('/settings/profile'); setOpen(false) }}>
                                <Image src="/icons/profile.svg" width={18} height={18} alt="Edit-profile" />
                                <p className="text-sm text-[#0C111D] ml-2">My profile</p>
                            </button>
                            <button className="flex items-center p-3 hover:bg-[#FEE4E2] w-full" onClick={() => {
                                setOpen(false);
                                setLogoutdialog(true);
                            }}>
                                <Image src="/icons/logout-03.svg" width={18} height={18} alt="Log out" />
                                <p className="text-sm text-[#DE3024] ml-2">Logout</p>
                            </button>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <Modal isOpen={logoutdialog} onOpenChange={(isOpen) => !isOpen && setLogoutdialog(false)} hideCloseButton
            >

                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-row justify-between items-center gap-1">
                            <h3 className=" font-bold text-[#1D2939]">Logout</h3>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                <button onClick={() => setLogoutdialog(false)}>
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                </button>
                            </button>
                        </ModalHeader>
                        <ModalBody>
                            <div className=" h-auto   flex flex-col">
                                <span className="text-sm font-normal text-[#667085]">
                                    Are you sure you want to log out? You will need to log in again to access your account.</span>
                            </div>

                        </ModalBody>
                        <ModalFooter className="border-t border-lightGrey">
                            <Button variant="light" className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey font-semibold text-sm text-[#1D2939] rounded-md" onClick={() => setLogoutdialog(false)}>Cancel</Button>
                            <Button className="py-[0.625rem] px-6 text-white font-semibold shadow-inner-button  hover:bg-[#B0201A] bg-[#BB241A] border border-white rounded-md " onClick={handleLogout} > Logout</Button>

                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal >
        </div>
    );
}

export default Header;

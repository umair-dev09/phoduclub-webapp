"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import General from '@/components/DashboardComponents/CommunityComponents/general';
import MockTest from '@/components/DashboardComponents/CommunityComponents/mockTest';
import DetailsHead from '@/components/DashboardComponents/CommunityComponents/detailsHead';
import DetailsContent from '@/components/DashboardComponents/CommunityComponents/detailsContent';
import Bottomtext from '@/components/DashboardComponents/CommunityComponents/BottomText';
import ChatHead from '@/components/DashboardComponents/CommunityComponents/chatHead';
import ChartArea from '@/components/DashboardComponents/CommunityComponents/ChatArea';
import GroupName from '@/components/DashboardComponents/CommunityComponents/groupName';
import { useRouter, useSearchParams } from 'next/navigation';
import LoadingData from '@/components/Loading';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
type GroupData = {
    communityName: string | null;
    membersId: string[] | null;
  };
export default function CommunityName({ params }: { params: { communityName: string } }) {
    const router = useRouter();
    const searchParams = useSearchParams(); // Use useSearchParams to get the search params
    const communityId = searchParams.get('communityId'); // Extract communityId from query
    const { communityName } = params; // Extract communityName from params
    const [groupData, setGroupData] = useState<GroupData | null>(null);
    const [user, setUser] = useState<User | null>(null); 
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(false); // Track error state
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMounted, setIsMounted] = useState(false); // Track if component has mounted
    useEffect(() => { 
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
            } else {
                console.error('No user is logged in');
                 router.push("/login");
                setError(true); // Set error if no user is logged in
                setLoading(false); // Ensure loading is set to false even when no user is found
            }
        });
    
        return () => unsubscribe();
    }, []);
    useEffect(() => {
        const fetchGroupData = async () => {
          try {
            if (user) {
              const groupDoc = doc(db, `communities/${communityId}`);
              const groupSnapshot = await getDoc(groupDoc);
    
              if (groupSnapshot.exists()) {
                const data = groupSnapshot.data() as GroupData;
                setGroupData(data);
                setLoading(false);
              } else {
                console.error('No user data found!');
                setError(true);
                setLoading(false);
              }
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
            setError(true);
          } finally {
            setLoading(false);
          }
        };
    
        if (user) {
          fetchGroupData();
        }
      }, [user, communityId]);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Prevent rendering until mounted and communityName is available
    if (!isMounted || !communityName) {
        return <LoadingData/>; // You can show a loading spinner or message here if desired
    }

    if (loading || error) {
        return <LoadingData />;
    }
    return (
        <div className="flex h-full flex-row">
            {/* Middle Section */}
            <div className="flex flex-col w-[250px] bg-white border-r border-b border-lightGrey">
                <GroupName communityId={communityId}/>
                <div className="flex flex-col justify-start items-center mx-4 mt-[15px] gap-6">
                    <General />
                    <MockTest />
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex flex-1 flex-col border-r border-b border-lightGrey h-auto">
                <div className="flex items-center justify-between h-[72px] bg-white border-b border-lightGrey">
                    <ChatHead />
                    <div className="flex flex-row mr-6 gap-4">
                        <button>
                            <Image src="/icons/search.svg" alt="search icon" width={18} height={18} />
                        </button>
                        <button className="transition-colors hover:bg-neutral-100" onClick={() => setIsCollapsed(!isCollapsed)}>
                            <Image src="/icons/collapseDetails.svg" alt="collapse details icon" width={24} height={24} />
                        </button>
                    </div>
                </div>
                <div className="flex flex-1">
                    <ChartArea />
                </div>
                <div>
                    <Bottomtext />
                </div>
            </div>

            {/* Right Sidebar with smoother collapse transition */}
            <div
                className={`flex flex-col bg-white border-lightGrey overflow-hidden transition-all duration-500 ease-in-out transform ${isCollapsed ? 'max-w-0 opacity-0' : 'w-[270px] max-w-[270px] opacity-100'}`}
            >
                <div className="flex items-center justify-center min-h-[72px] border-b border-lightGrey">
                    <div className="flex flex-row justify-between w-full mx-6">
                        <h3 className="text-base">Details</h3>
                        <div className="flex flex-row items-center gap-[6px]">
                            <Image src="/icons/membersIcon.svg" alt="members icon" width={18} height={18} />
                            <p className="text-sm text-[#4B5563]">57</p>
                        </div>
                    </div>
                </div>
                <div className="overflow-y-auto">
                    <DetailsHead />
                    <DetailsContent />
                </div>
            </div>
        </div>
    );
}

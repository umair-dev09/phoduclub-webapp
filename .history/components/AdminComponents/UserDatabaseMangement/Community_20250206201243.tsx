import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import Image from "next/image";
import Collapsible from 'react-collapsible';
import { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { collection, query, where, getDocs, doc, updateDoc, arrayRemove, getDoc } from 'firebase/firestore';
import { db } from "@/firebase";
import LoadingData from "@/components/Loading";
type Community = {
    id: string;
    communityName: string;
    communityImg: string;
    channels: Channel[];
}

type Channel = {
    id: string;
    headingId: string;  // Add headingId to track the parent heading
    channelName: string;
    channelEmoji: string;
}

type CommunityProps = {
    userId: string;
}

function Community({ userId }: CommunityProps) {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [loading, setLoading] = useState(true);
    const [remove, setRemove] = useState(false);
    const [removeAction, setRemoveAction] = useState<{
        type: 'group' | 'channel' | null;
        communityId?: string;
        channelId?: string;
    }>({ type: null });
    const [popoveropen1, setPopoveropen1] = useState<number | null>(null);
    const [popoveropen2, setPopoveropen2] = useState<{ groupIndex: number | null, channelIndex: number | null }>({
        groupIndex: null,
        channelIndex: null
    });
    const [isOpenArray, setIsOpenArray] = useState<boolean[]>([]);
    const [userData, setUserData] = useState<{
        name: string;
        profilePic: string;
        userId: string;
        isPremium: boolean;
    }>({
        name: '',
        profilePic: '',
        userId: '',
        isPremium: false
    });
    // Modified fetch function with proper path handling
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch user data
                const userRef = doc(db, 'users', userId);
                const userSnap = await getDoc(userRef);
                const userData = userSnap.data();
                if (userData) {
                    setUserData({
                        name: userData.name || '',
                        profilePic: userData.profilePic || '',
                        userId: userData.userId || '',
                        isPremium: userData.isPremium || false
                    });
                }

                // Query communities where user is a member
                const communitiesQuery = query(
                    collection(db, 'communities'),
                    where('members', 'array-contains', { id: userId, isAdmin: false })
                );

                const communitiesSnapshot = await getDocs(communitiesQuery);
                const communitiesData: Community[] = [];

                // Process each community
                for (const communityDoc of communitiesSnapshot.docs) {
                    const communityData = communityDoc.data();

                    // Get channels for this community
                    const channelsRef = collection(db, `communities/${communityDoc.id}/channelsHeading`);
                    const channelsSnapshot = await getDocs(channelsRef);

                    const channels: Channel[] = [];

                    // Process each channel heading
                    for (const headingDoc of channelsSnapshot.docs) {
                        const channelsCollectionRef = collection(db, `communities/${communityDoc.id}/channelsHeading/${headingDoc.id}/channels`);
                        const channelsQuery = query(
                            channelsCollectionRef,
                            where('members', 'array-contains', { id: userId, isAdmin: false })
                        );

                        const channelsDataSnapshot = await getDocs(channelsQuery);

                        channelsDataSnapshot.forEach(channelDoc => {
                            const channelData = channelDoc.data();
                            channels.push({
                                id: channelDoc.id,
                                headingId: headingDoc.id,  // Store the headingId
                                channelName: channelData.channelName,
                                channelEmoji: channelData.channelEmoji
                            });
                        });
                    }

                    communitiesData.push({
                        id: communityDoc.id,
                        communityName: communityData.communityName,
                        communityImg: communityData.communityImg,
                        channels: channels
                    });
                }

                setCommunities(communitiesData);
                setIsOpenArray(new Array(communitiesData.length).fill(false));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    // Updated remove handler with proper path handling
    const handleRemove = async () => {
        try {
            if (!removeAction.type || !removeAction.communityId) return;

            if (removeAction.type === 'group') {
                // Remove user from community
                const communityRef = doc(db, 'communities', removeAction.communityId);
                await updateDoc(communityRef, {
                    members: arrayRemove({ id: userId, isAdmin: false })
                });

                // Update local state
                setCommunities(prev => prev.filter(community => community.id !== removeAction.communityId));
            } else if (removeAction.type === 'channel' && removeAction.channelId) {
                // Find the community and channel
                const communityIndex = communities.findIndex(c => c.id === removeAction.communityId);
                const channel = communities[communityIndex]?.channels.find(c => c.id === removeAction.channelId);

                if (!channel) return;

                // Use the complete path including headingId
                const channelDocRef = doc(
                    db,
                    'communities',
                    removeAction.communityId,
                    'channelsHeading',
                    channel.headingId,
                    'channels',
                    removeAction.channelId
                );

                await updateDoc(channelDocRef, {
                    members: arrayRemove({ id: userId, isAdmin: false })
                });

                // Update local state
                setCommunities(prev => {
                    const newCommunities = [...prev];
                    const community = newCommunities[communityIndex];
                    if (community) {
                        community.channels = community.channels.filter(
                            channel => channel.id !== removeAction.channelId
                        );
                    }
                    return newCommunities;
                });
            }

            setRemove(false);
            setRemoveAction({ type: null });
        } catch (error) {
            console.error("Error removing user:", error);
        }
    };

    // Other handler functions remain similar but adapted to new data structure
    const handlePopoverOpen1 = (index: number) => {
        setPopoveropen1(index);
    };

    const handlePopoverOpen2 = (groupIndex: number, channelIndex: number) => {
        setPopoveropen2({ groupIndex, channelIndex });
    };

    const toggleCollapsible = (index: number) => {
        const newIsOpenArray = [...isOpenArray];
        newIsOpenArray[index] = !newIsOpenArray[index];
        setIsOpenArray(newIsOpenArray);
    };

    if (loading) {
        return <LoadingData />;
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Profile section remains the same */}
            <div className="flex flex-row gap-3 border-b border-solid border-[#EAECF0] p-8">
                <div className="relative">
                    <Image className="rounded-full w-[72px] h-[72px]" src={userData.profilePic || "/images/DP_Lion.svg"} alt="DP" width={72} height={72} />
                    {userData.isPremium && (
                        <Image
                            className="absolute right-0 bottom-0"
                            src="/icons/winnerBatch.svg"
                            alt="Batch"
                            width={32}
                            height={32}
                        />
                    )}
                </div>
                <div className="flex items-start flex-col justify-center">
                    <div className="font-semibold text-[#1D2939] text-2xl">{userData.name || "phodu user"}</div>
                    <div className="flex justify-start items-start text-[16px] font-medium text-[#667085]">{userData.userId || "phodu Id"}</div>
                </div>
            </div>

            <p className="font-semibold text-[#1D2939] text-lg px-8">Community</p>

            <div className="border border-solid border-[#F7F8FB] rounded-xl h-auto px-8">
                <div className="px-6 py-3 flex items-center text-[#667085] font-medium text-sm">Groups</div>
                {communities.map((community, index) => (
                    <Collapsible
                        key={community.id}
                        trigger={
                            <div
                                className={`h-[76px] w-full px-6 flex flex-row justify-between items-center border-t border-lightGrey transition-colors hover:bg-[#F9FAFB] ${isOpenArray[index] ? "" : "rounded-b-xl"
                                    }`}
                                onClick={() => toggleCollapsible(index)}
                            >
                                <div className="flex flex-row gap-2">
                                    <Image
                                        src={isOpenArray[index] ? "/icons/Arrow-up.svg" : "/icons/Arrow-down-1.svg"}
                                        width={20}
                                        height={20}
                                        alt="Arrow-toggle"
                                    />
                                    <Image className="w-[40px] h-[40px] rounded-full"
                                        src={community.communityImg || "/icons/default-community"}
                                        width={40}
                                        height={40}
                                        alt="community"
                                    />
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-sm text-[#182230]">
                                            {community.communityName || "phodu channel"}
                                        </span>
                                        <span className="font-normal text-sm text-[#667085]">
                                            {community.channels.length || "-"} Channels
                                        </span>
                                    </div>
                                </div>
                                <Popover
                                    placement="bottom-end"
                                    isOpen={popoveropen1 === index}
                                    onOpenChange={(open) => open ? handlePopoverOpen1(index) : setPopoveropen1(null)}
                                >
                                    <PopoverTrigger>
                                        <button className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                            <Image
                                                src="/icons/more-vertical.svg"
                                                alt="more"
                                                width={24}
                                                height={24}
                                            />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto px-0 py-1 rounded-md">
                                        <button
                                            className="flex flex-row items-center w-full px-4 py-[0.625rem] gap-2 transition-colors hover:bg-[#FEE4E2]"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setPopoveropen1(null);
                                                setRemoveAction({
                                                    type: 'group',
                                                    communityId: community.id
                                                });
                                                setRemove(true);
                                            }}
                                        >
                                            <Image
                                                src="/icons/delete.svg"
                                                alt="delete"
                                                width={18}
                                                height={18}
                                            />
                                            <p className="text-sm text-[#DE3024] font-normal">
                                                Remove from group
                                            </p>
                                        </button>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        }
                        transitionTime={350}
                        open={isOpenArray[index]}
                    >
                        <div className="rounded-lg h-auto border border-solid border-[#EAECF0] mx-6 mb-4">
                            {community.channels.map((channel, channelIndex) => (
                                <div
                                    key={channel.id}
                                    className={`flex flex-row h-[50px] hover:bg-[#F9FAFB] justify-between items-center p-6 ${channelIndex !== 0 ? "border-t border-solid border-[#EAECF0]" : ""
                                        }`}
                                >
                                    <div className="flex flex-row gap-2">
                                        <span className="w-6 text-center">{channel.channelEmoji}</span>
                                        <span className="font-normal text-sm text-[#475467]">
                                            {channel.channelName}
                                        </span>
                                    </div>
                                    <Popover
                                        placement="bottom-end"
                                        isOpen={popoveropen2.groupIndex === index && popoveropen2.channelIndex === channelIndex}
                                        onOpenChange={(open) => {
                                            if (open) {
                                                handlePopoverOpen2(index, channelIndex);
                                            } else {
                                                setPopoveropen2({ groupIndex: null, channelIndex: null });
                                            }
                                        }}
                                    >
                                        <PopoverTrigger>
                                            <button className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                                <Image
                                                    src="/icons/more-vertical.svg"
                                                    alt="more"
                                                    width={24}
                                                    height={24}
                                                />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto px-0 py-1 rounded-md">
                                            <button
                                                className="flex flex-row items-center w-full px-4 py-[0.625rem] gap-2 transition-colors hover:bg-[#FEE4E2]"
                                                onClick={() => {
                                                    setPopoveropen2({ groupIndex: null, channelIndex: null });
                                                    setRemoveAction({
                                                        type: 'channel',
                                                        communityId: community.id,
                                                        channelId: channel.id
                                                    });
                                                    setRemove(true);
                                                }}
                                            >
                                                <Image
                                                    src="/icons/delete.svg"
                                                    alt="delete"
                                                    width={18}
                                                    height={18}
                                                />
                                                <p className="text-sm text-[#DE3024] font-normal">
                                                    Remove from channel
                                                </p>
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            ))}
                        </div>
                    </Collapsible>
                ))}
            </div>
            <Modal
                isOpen={remove}
                onOpenChange={(isOpen) => !isOpen && setRemove(false)}
                hideCloseButton
            >
                <ModalContent>
                    <>
                        {/* Modal Header */}
                        <ModalHeader className="flex flex-row justify-between items-center gap-1">
                            <h3 className=" font-bold task-[#1D2939]">
                                {removeAction.type === 'group' ? 'Remove from Group' : 'Remove from Channel'}


                            </h3>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] ">
                                <button className="" onClick={() => setRemove(false)}>
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                </button>
                            </button>


                        </ModalHeader>

                        {/* Modal Body */}
                        <ModalBody className="">
                            <p className=" text-sm  pb-2 font-normal text-[#667085]">
                                Are you sure you want to {removeAction.type === 'group' ? 'remove the user from group' : 'remove the user from channel'}? This action cannot be undone.
                            </p>
                        </ModalBody>

                        {/* Modal Footer */}
                        <ModalFooter className="border-t border-lightGrey">
                            <Button variant="light" className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md font-semibold text-sm hover:bg-[#F2F4F7] " onClick={() => setRemove(false)}>Cancel</Button>
                            <Button onClick={() => handleRemove()} className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#BB241A] hover:bg-[#B0201A] font-semibold text-sm  rounded-md">Remove</Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </div>
    )
}
export default Community;
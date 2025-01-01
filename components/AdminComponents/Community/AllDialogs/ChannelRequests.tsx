import React, { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import { Checkbox } from "@nextui-org/react";
import { arrayUnion, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";
import MessageLoading from "@/components/MessageLoading";
import LoadingData from "@/components/Loading";
import { toast } from "react-toastify";

// Type Definitions
interface Member {
    id: string;
    name: string;
    userId: string;
    profilePic: string;
    isPremium: boolean;
    requestDate: string;
    checked: boolean;
}

interface ChannelRequestsProps {
    requestedUsers: { id: string; requestDate: Timestamp | string; }[];
    open: boolean;
    onClose: () => void;
    communityId: string;
    headingId: string;
    channelId: string;
}

interface SelectionBarProps {
    members: Member[];
    setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
    setSelectAll: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
    handleAcceptSelected: () => Promise<void>;
    handleDeclineSelected: () => Promise<void>;
}

// SelectionBar Component with updated accept functionality
const SelectionBar: React.FC<SelectionBarProps> = ({
    members,
    setMembers,
    setSelectAll,
    onClose,
    handleAcceptSelected,
    handleDeclineSelected
}) => {
    const selectedMembers = members.filter(member => member.checked);

    const handleSelectAll = (selectAll: boolean) => {
        setMembers(members.map(member => ({ ...member, checked: selectAll })));
        setSelectAll(selectAll);
    };

    if (selectedMembers.length === 0) return null;

    return (
        <div className="flex justify-center absolute w-full bottom-8 right-0">
            <div className="z-auto flex flex-row items-center p-4 gap-4 bg-white border border-[#D0D5DD] rounded-xl shadow-[4px_8px_13px_0_rgba(0,0,0,0.05), 4px_4px_12px_0_rgba(0,0,0,0.05), 4px_8px_14px_0_rgba(0,0,0,0.04)]">
                <p className="text-balance text-[#1D2939] font-semibold">
                    {selectedMembers.length} Selected
                </p>
                <div className="flex flex-row gap-2">
                    <button
                        onClick={() => handleSelectAll(true)}
                        className="px-4 py-[0.625rem] text-sm text-[#1D2939] font-medium border border-lightGrey rounded-md"
                    >
                        Select all
                    </button>
                    <button
                        onClick={() => handleSelectAll(false)}
                        className="px-4 py-[0.625rem] text-sm text-[#1D2939] font-medium border border-lightGrey rounded-md"
                    >
                        Unselect all 
                    </button>
                </div>
                <div className="w-0 h-9 border-[0.5px] border-lightGrey rounded-full"></div>
                <button
                    onClick={handleDeclineSelected}
                    className="flex flex-row px-4 py-[0.625rem] gap-2 border border-r-lightGrey rounded-md"
                >
                    <Image src='/icons/multiplication-sign.svg' alt="deny" width={18} height={18} />
                    <p className="text-sm text-[#1D2939] font-medium leading-[18px]">Decline</p>
                </button>
                <button
                    onClick={handleAcceptSelected}
                    className="flex flex-row px-4 py-[0.625rem] gap-2 border border-r-lightGrey rounded-md"
                >
                    <Image src='/icons/tick-green-02.svg' alt="Accept" width={18} height={18} />
                    <p className="text-sm text-[#1D2939] font-medium leading-[18px]">Accept</p>
                </button>
            </div>
        </div>
    );
};

// GroupInfo Component
const ChannelRequests: React.FC<ChannelRequestsProps> = ({ requestedUsers, open, onClose , communityId, headingId, channelId}) => {
    const [members, setMembers] = useState<Member[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const memberPromises = requestedUsers.map(async (request) => {
                    const userRef = doc(db, 'users', request.id);
                    const userSnap = await getDoc(userRef);
                    
                    if (userSnap.exists()) {
                        const userData = userSnap.data();
                        return {
                            id: request.id,
                            name: userData.name || 'Unknown User',
                            userId: userData.userId || '',
                            profilePic: userData.profilePic || '/images/default-avatar.svg',
                            isPremium: userData.isPremium || false,
                            requestDate: request.requestDate instanceof Timestamp ? 
                            request.requestDate.toDate().toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            }) : 
                            new Date(request.requestDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            }),
                            checked: false
                        };
                    }
                    return null;
                });

                const fetchedMembers = (await Promise.all(memberPromises)).filter((member): member is Member => member !== null);
                setMembers(fetchedMembers);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        if (open && requestedUsers.length > 0) {
            fetchUserData();
        }
    }, [requestedUsers, open]);
    const updateChannelData = async (
        memberIds: string[], 
        action: 'accept' | 'decline'
    ) => {
        try {
            const channelRef = doc(db, `communities/${communityId}/channelsHeading/${headingId}/channels`, channelId);
            const channelDoc = await getDoc(channelRef);
            const existingData = channelDoc.exists() ? channelDoc.data() : {};
            
            if (action === 'accept') {
                // Add new members and remove from channelRequests
                const newMembers = memberIds.map(id => ({
                    id,
                    isAdmin: false
                }));
                
                const updatedMembers = [
                    ...(existingData.members || []),
                    ...newMembers
                ];

                const updatedChannelRequests = (existingData.channelRequests || [])
                    .filter((request: { id: string }) => !memberIds.includes(request.id));

                await setDoc(channelRef, {
                    members: updatedMembers,
                    channelRequests: updatedChannelRequests
                }, { merge: true });
                onClose();
                toast.success('Requests Accepted');
            } else if (action === 'decline') {
                // Remove from channelRequests and add to declinedRequests
                const updatedChannelRequests = (existingData.channelRequests || [])
                    .filter((request: { id: string }) => !memberIds.includes(request.id));

                const existingDeclinedRequests = existingData.declinedRequests || [];
                const updatedDeclinedRequests = [
                    ...existingDeclinedRequests,
                    ...memberIds
                ];

                await setDoc(channelRef, {
                    channelRequests: updatedChannelRequests,
                    declinedRequests: updatedDeclinedRequests
                }, { merge: true });
                onClose();
                toast.success('Requests Declined');
            }

            // Update local state
            setMembers(prevMembers => 
                prevMembers.filter(member => !memberIds.includes(member.id))
            );
        } catch (error) {
            console.error('Error updating channel data:', error);
            throw error;
        }
    };

    const handleAcceptSelected = async () => {
        try {
            const selectedMemberIds = members
                .filter(member => member.checked)
                .map(member => member.id);

            if (selectedMemberIds.length > 0) {
                await updateChannelData(selectedMemberIds, 'accept');
                setSelectAll(false);
            }
        } catch (error) {
            console.error('Error accepting selected members:', error);
        }
    };

    const handleSingleAccept = async (memberId: string) => {
        try {
            await updateChannelData([memberId], 'accept');
        } catch (error) {
            console.error('Error accepting single member:', error);
        }
    };

    const handleDeclineSelected = async () => {
        try {
            const selectedMemberIds = members
                .filter(member => member.checked)
                .map(member => member.id);

            if (selectedMemberIds.length > 0) {
                await updateChannelData(selectedMemberIds, 'decline');
                setSelectAll(false);
            }
        } catch (error) {
            console.error('Error declining selected members:', error);
        }
    };

    const handleSingleDecline = async (memberId: string) => {
        try {
            await updateChannelData([memberId], 'decline');
        } catch (error) {
            console.error('Error declining single member:', error);
        }
    };

    const handleHeaderCheckboxToggle = () => {
        const newCheckedState = !selectAll;
        setSelectAll(newCheckedState);
        setMembers(prevMembers => 
            prevMembers.map(member => ({ ...member, checked: newCheckedState }))
        );
    };

    const handleRowCheckboxToggle = (index: number) => {
        setMembers(prevMembers => {
            const updatedMembers = [...prevMembers];
            updatedMembers[index].checked = !updatedMembers[index].checked;
            
            // Update selectAll state based on whether all checkboxes are checked
            const allChecked = updatedMembers.every(member => member.checked);
            setSelectAll(allChecked);
            
            return updatedMembers;
        });
    };
    return (
        <>
              <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel className="max-h-[92%] overflow-y-auto">
                    <div className="flex flex-col p-6 gap-4 bg-white rounded-2xl w-[38.375rem] h-auto overflow-hidden">
                        <div className="flex flex-row justify-between items-center">
                            <h3 className="font-medium text-[#1D2939]">Channel Requests</h3>
                            <button 
                                className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]"
                                onClick={onClose}
                            >
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                            </button>
                        </div>
                        {requestedUsers.length < 1 ? (
                               <>
                               <p>No requests</p>
                               </>
                        ) : (
                <div className="border border-[#EAECF0] rounded-xl overflow-hidden">
                            <div className="max-h-[30rem] overflow-y-auto">
                                {loading ? (
                                    <LoadingData />
                                ) : (
                                    <table className="w-full">
                                        <thead className="sticky top-0 z-10 bg-white shadow-sm">
                                            <tr>
                                                <td className="w-[10%] pl-8 pb-1">
                                                    <Checkbox
                                                        size="sm"
                                                        color="primary"
                                                        isSelected={selectAll}
                                                        onChange={handleHeaderCheckboxToggle}
                                                    />
                                                </td>
                                                <td className="w-[40%] pl-2 py-3">
                                                    <p className="text-sm text-[#667085] font-medium leading-6">
                                                        Name
                                                    </p>
                                                </td>
                                                <td className="w-[30%] text-center py-3">
                                                    <div className="flex flex-row items-center justify-center gap-1 text-sm text-[#667085] font-medium leading-6">
                                                        Request Sent
                                                        <Image src='/icons/unfold-more-round.svg' alt="more" width={16} height={16} />
                                                    </div>
                                                </td>
                                                <td className="w-[20%] py-3">
                                                    <p className="text-sm text-[#667085] font-medium leading-6">
                                                        Action
                                                    </p>
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {members.map((member, index) => (
                                                <tr
                                                    key={member.id}
                                                    className="border-t border-lightGrey"
                                                >
                                                    <td className="pl-8 pb-1">
                                                        <Checkbox
                                                            size="sm"
                                                            color="primary"
                                                            isSelected={member.checked}
                                                            onChange={() => handleRowCheckboxToggle(index)}
                                                        />
                                                    </td>
                                                    <td className="pl-2 py-3">
                                                        <div className="flex flex-row gap-2 items-center">
                                                            <div className="relative">
                                                                <Image
                                                                    src={member.profilePic}
                                                                    alt="Profile Picture"
                                                                    width={40}
                                                                    height={40}
                                                                />
                                                                {member.isPremium && (
                                                                    <Image
                                                                        className="absolute right-0 bottom-0"
                                                                        src="/icons/winnerBatch.svg"
                                                                        alt="Premium"
                                                                        width={18}
                                                                        height={18}
                                                                    />
                                                                )}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-semibold whitespace-nowrap">
                                                                    {member.name}
                                                                </span>
                                                                <span className="text-[13px] text-[#667085]">
                                                                    {member.userId}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-center py-3">
                                                        <p className="text-sm text-[#1D2939] font-normal leading-6">
                                                            {member.requestDate}
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <div className="flex flex-row gap-2">
                                                            <button className="flex items-center justify-center w-[2.375rem] h-[2.375rem] border border-lightGrey rounded-full" onClick={() => handleSingleDecline(member.id)}>
                                                                <Image src='/icons/multiplication-sign.svg' alt="deny" width={18} height={18} />
                                                            </button>
                                                            <button className="flex items-center justify-center w-[2.375rem] h-[2.375rem] border border-[#0B9055] rounded-full" onClick={() => handleSingleAccept(member.id)}>
                                                                <Image src='/icons/tick-green-02.svg' alt="accept" width={18} height={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                        )}
                        
                    </div>
                    <SelectionBar
                        members={members}
                        setMembers={setMembers}
                        setSelectAll={setSelectAll}
                        onClose={onClose}
                        handleAcceptSelected={handleAcceptSelected}
                        handleDeclineSelected={handleDeclineSelected}
                    />
                </DialogPanel>
            </div>
        </Dialog>
        </>
    );
};

export default ChannelRequests;


import DashboardLoading from '@/components/DashboardLoading';
import { auth, db } from '@/firebase';
import { collection, doc, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
// Define an interface for the announcement object
interface Announcement {
    announcementId: string;
    channelEmoji: string;
    channelId: string;
    channelName: string;
    chatId: string;
    communityId: string;
    headingId: string;
    message: string;
    senderId: string;
    timestamp: Timestamp;
    communityName?: string;
    senderName?: string;
    senderProfilePic?: string;
}
function Announcement() {
    const router = useRouter();
    const currentUserId = auth.currentUser?.uid;
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchAnnouncements = async () => {
            if (!currentUserId) return;

            const communitiesRef = collection(db, 'communities');
            const communitiesSnapshot = await getDocs(communitiesRef);

            const relevantCommunities = communitiesSnapshot.docs.filter(doc => {
                const members = doc.data().members || [];
                return members.some((member: { id: string, isAdmin: false }) => member.id === currentUserId);
            });

            const announcementPromises = relevantCommunities.map(async (community) => {
                const announcementsRef = collection(doc(db, 'communities', community.id), 'Announcements');
                const announcementsSnapshot = await getDocs(announcementsRef);

                const announcements = await Promise.all(announcementsSnapshot.docs.map(async (docSnapshot) => {
                    const data = docSnapshot.data();

                    // Fetch sender details from admin collection
                    const senderRef = doc(db, 'admin', data.senderId);
                    const senderDoc = await getDoc(senderRef);
                    const senderProfile = senderDoc.exists() ? senderDoc.data() : {};

                    return {
                        announcementId: docSnapshot.id,
                        channelEmoji: data.channelEmoji,
                        channelId: data.channelId,
                        channelName: data.channelName,
                        chatId: data.chatId,
                        communityId: data.communityId,
                        headingId: data.headingId,
                        message: data.message,
                        senderId: data.senderId,
                        senderName: senderProfile.name || 'Unknown',
                        senderProfilePic: senderProfile.profilePic,
                        timestamp: data.timestamp,
                        communityName: community.data().communityName,
                    } as Announcement;
                }));

                return announcements;
            });

            const allAnnouncements = await Promise.all(announcementPromises);
            setAnnouncements(allAnnouncements.flat().sort((a, b) =>
                b.timestamp.toMillis() - a.timestamp.toMillis()
            ));
            setLoading(false);
        };

        fetchAnnouncements();
    }, [currentUserId]);

    if (loading) {
        return <DashboardLoading />
    }

    return (
        <div className="flex-col flex rounded-b-lg">
            {announcements.length > 0 ? (
                // Display announcements if they exist
                announcements.map((announcement, index) => (
                    <div key={index} className=' flex flex-col gap-4 pt-6 px-6 items-start  h-auto cursor-pointer hover:bg-[#F9FAFB]'
                        onClick={() => router.push(`/community/${(announcement.communityName || 'default').toLowerCase().replace(/\s+/g, '-')}?communityId=${announcement.communityId}`)}>
                        <div className=' flex flex-row gap-3 items-start'>
                            <div className='flex flex-row gap-3 items-center'>
                                <Image className='rounded-full w-10 h-10'
                                    src={announcement.senderProfilePic || '/defaultDP.svg'}
                                    alt={'sender image'}
                                    height={40}
                                    width={40}
                                />
                                <div className='flex flex-col gap-[2px]'>
                                    <span className='font-medium text-sm text-[#1F2937]'>{announcement.senderName || 'John'}</span>
                                    <span className='font-normal text-xs text-[#475467]'>
                                        {announcement.timestamp.toDate().toLocaleTimeString('en-US', {
                                            hour: 'numeric',
                                            minute: '2-digit',
                                            hour12: true
                                        })}
                                    </span>
                                </div>
                            </div>
                            <div className='flex flex-row gap-1 bg-[#F8E9FE] rounded-[19px] h-[26px] w-auto px-3 items-center justify-center'>
                                <Image
                                    src="/icons/community-pink-color.svg"
                                    height={16}
                                    width={16}
                                    alt="community-pink-color"
                                />
                                <span className='font-normal text-xs text-[#791F89]'>{announcement.communityName}</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h1 className='text-[#1F2937] font-semibold text-sm'>{announcement.channelEmoji + " " + announcement.channelName}</h1>
                            <span className='text-sm font-normal text-[#475467] ml-1 line-clamp-2'>{announcement.message}</span>
                        </div>
                        <hr className='bg-[#EAECF0] w-full' />
                    </div>
                ))
            ) : (
                // Show this message if there are no announcements
                <div className="flex flex-col justify-center items-center flex-1">
                    <Image
                        src="/images/no_announcement_img.svg"
                        alt="No announcement image"
                        width={140}
                        height={140}
                    />
                    <h3 className="text-lg font-bold text-gray-800 ">No announcements for now</h3>
                    <p className="text-sm text-gray-600 font-normal text-center">Will show relevant announcements here</p>
                </div>
            )}
        </div>
    );
}

export default Announcement;

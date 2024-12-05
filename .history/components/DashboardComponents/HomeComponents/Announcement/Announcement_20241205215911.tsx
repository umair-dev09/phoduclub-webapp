import Image from 'next/image';
// Define an interface for the announcement object
interface AnnouncementItem {
    id: number;
    name: string;
    time: string;
    title: string;
    body: string;
    imageUrl: string;
}
function Announcement() {
    const announcements: AnnouncementItem[] = [
        {
            id: 1,
            name: "Robert Fox",
            time: "3:24 PM",
            title: "Mock test series are LIVE",
            body: "Our new mock test series is now live. Check it out now.",
            imageUrl: "/icons/RobertFox.png",
        },
        // {
        //     id: 1,
        //     name: "Robert Fox",
        //     time: "3:24 PM",
        //     title: "Mock test series are LIVE",
        //     body: "Our new mock test series is now live. Check it out now.",
        //     imageUrl: "/icons/RobertFox.png",
        // },
        // {
        //     id: 1,
        //     name: "Robert Fox",
        //     time: "3:24 PM",
        //     title: "Mock test series are LIVE",
        //     body: "Our new mock test series is now live. Check it out now.",
        //     imageUrl: "/icons/RobertFox.png",
        // },

    ];

    return (
        <div className="h-[300px]  flex-col  flex   rounded-b-lg">
            {announcements.length > 0 ? (
                // Display announcements if they exist
                announcements.map((announcement, index: number) => (
                    <div key={announcement.id} className=' flex flex-col gap-4 pt-6 px-6 items-start  h-auto '>
                        <div className=' flex flex-row gap-3 items-center'>
                            <Image
                                src={announcement.imageUrl}
                                alt={announcement.name}
                                height={40}
                                width={40}
                            />
                            <div className='flex flex-col gap-[2px]'>
                                <span className='font-medium text-sm text-[#1F2937]'>{announcement.name}</span>
                                <span className='font-normal text-xs text-[#475467]'>{announcement.time}</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h1 className='text-[#1F2937] font-semibold text-sm'>{announcement.title}</h1>
                            <span className='text-sm font-normal text-[#475467]'>{announcement.body}</span>
                        </div>
                        <hr className='bg-[#EAECF0] w-full' />
                    </div>
                ))
            ) : (
                // Show this message if there are no announcements
                <div className="flex flex-col items-center  flex-1 ">
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

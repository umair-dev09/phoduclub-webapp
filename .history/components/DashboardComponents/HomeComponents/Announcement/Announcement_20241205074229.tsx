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
        {
            id: 2,
            name: "Jenny Wilson",
            time: "4:10 PM",
            title: "New course material available",
            body: "Updated course materials have been uploaded.",
            imageUrl: "/icons/JennyWillsion.png",
        },
    ];

    return (
        <div className="h-[300px] flex-col pt-5  flex  flex-1 overflow-y-auto rounded-b-lg">
            {announcements.length > 0 ? (
                // Display announcements if they exist
                announcements.map((announcement, index) => (
                    <div key={announcement.id} className="ml-6">
                        <div className="flex items-start mb-5 pb-5 w-full box-border ">
                            <Image
                                className="w-10 h-10 rounded-full mr-4"
                                src={announcement.imageUrl}
                                alt={announcement.name}
                                height={40}
                                width={40}
                            />
                            <div className="flex flex-col flex-1">
                                <p className="font-medium text-sm text-gray-800 m-0">{announcement.name}</p>
                                <p className="text-xs text-gray-600 font-normal mt-0.5">{announcement.time}</p>
                                <h3 className="font-semibold text-sm text-gray-800 mt-2">{announcement.title}</h3>
                                <p className="text-sm text-gray-600 font-normal mt-1">{announcement.body}</p>
                            </div>
                            {index < announcements.length - 1 && <hr className="w-full border-t border-gray-200 mt-4" />}
                        </div>
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
            <div>
                jabir
            </div>
        </div>
    );
}

export default Announcement;

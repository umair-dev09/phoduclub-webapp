import Image from 'next/image';
import styles from './announcementComp/announcementComp.module.css';
function Announcement() {
    const announcements = [
        //BACKEND 

        {
            id: 1,
            name: "Robert Fox",
            time: "3:24 PM",
            title: "Mock test series are LIVE",
            body: "Our new mock test series is now live. Check it out now.",
            imageUrl: "/icons/RobertFox.png",


        },
        {
            id: 1,
            name: "Robert Fox",
            time: "3:24 PM",
            title: "Mock test series are LIVE",
            body: "Our new mock test series is now live. Check it out now.",
            imageUrl: "/icons/RobertFox.png",
        },
        {
            id: 1,
            name: "Robert Fox",
            time: "3:24 PM",
            title: "Mock test series are LIVE",
            body: "Our new mock test series is now live. Check it out now.",
            imageUrl: "/icons/JennyWillsion.png",
        },


    ];
    return (
        <div className="flex flex-1">
            <div className="flex flex-1 flex-col items-center justify-center ">
                <Image
                    src='/images/no_announcement_img.svg'
                    alt='No announcement image'
                    width={140}
                    height={140}
                />
                <h3 className="text-lg font-bold">No announcements for now</h3>
                <p className="text-sm font-normal text-center">Will show relevant announcements here</p>
            </div>
            <div className={styles.announcementContainer}>
                {announcements.map((announcement, index) => (
                    <div key={announcement.id} className={styles.allinone}>
                        <div className={styles.announcement}>
                            <Image
                                className={styles.profileImg}
                                src={announcement.imageUrl}
                                alt={announcement.name}
                                height={40}
                                width={40}
                            />
                            <div className={styles.announcementContent}>
                                <p className={styles.announcementName}>{announcement.name}</p>
                                <p className={styles.announcementTime}>{announcement.time}</p>
                                <h3 className={styles.announcementTitle}>{announcement.title}</h3>
                                <p className={styles.announcementBody}>{announcement.body}</p>
                            </div>
                            {index < announcements.length - 1 && <hr className={styles.divider} />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Announcement;

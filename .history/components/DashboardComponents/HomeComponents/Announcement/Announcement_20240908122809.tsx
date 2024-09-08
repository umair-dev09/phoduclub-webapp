"use client";

import AnnouncementList from '@/components/DashboardComponents/HomeComponents/Announcement/announcementComp/AnnounceComp';
import styles from '../homeComponents.module.css';
import Image from 'next/image';

const Announcement = () => {
    const announcements = []; // If empty, show "No announcements" message

    return (
        <div className={styles.announcementComp}>
            {announcements.length === 0 ? (
                <div className={styles.noAnnouncements}>
                    <Image src='/images/no_announcement_img.svg' alt='No announcement image' width={140} height={140} />
                    <h3 className={styles.noAnnouncement1}>No announcements for now</h3>
                    <p className={styles.noAnnouncement2}>Will show relevant announcements here</p>
                </div>
            ) : (
                <AnnouncementList />
            )}
        </div>
    );
}

export default Announcement;

"use client";

import announcemComp from '@components/DashboardComponents/HomeComponents/Announcement/announcementComp/announceComp';
import styles from '../homeComponents.module.css';
import Image from 'next/image';

function Announcement() {
    return (
        <div className={styles.announcementComp}>
            <div className={styles.noAnnouncements}>
                <Image src='/images/no_announcement_img.svg' alt='No announcement image' width={140} height={140} />
                <h3 className={styles.noAnnouncement1}>No announcements for now</h3>
                <p className={styles.noAnnouncement2}>Will show relevant announcements here</p>
            </div>
            <div>
                <announcementComp />
            </div>
        </div>
    )
}

export default Announcement;
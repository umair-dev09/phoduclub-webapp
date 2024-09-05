"use client";

import styles from '../homeComponents.module.css';

function Announcement(){
    return(
        <div className={styles.AnnouncementComp}>
            <h3 className={styles.noAnnouncement1}>No announcements for now</h3>
            <p className={styles.noAnnouncement2}>Will show relevant announcements here</p>
        </div>
    )
}

export default Announcement;
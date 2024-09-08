import React from 'react';
import styles from './announcementComp.module.css';
import Image from 'next/image';


const announcements = [
  {}



];

const Announcement = () => {
  return (
    <div className={styles.announcementContainer}>
      {announcements.length === 0 ? (
        <p><Announcement /></p>
      ) : (
        announcements.map((announcement, index) => (
          <div key={announcement.id}
            className={`${styles.announcement} ${index === 0 ? styles.firstAnnouncement : ''}`}>
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
          </div>
        ))
      )}
    </div>
  );
};

export default Announcement;
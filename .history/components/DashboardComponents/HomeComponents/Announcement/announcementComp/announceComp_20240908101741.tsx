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
        <div className={styles.noAnnouncements}>
          <Image src='/images/no_announcement_img.svg' alt='No announcement image' width={140} height={140} />
          <h3>No announcements for now</h3>
          <p>Will show relevant announcements here</p>
        </div>
      ) : (
        announcements.map(announcement => (
          <div key={announcement.id} className={styles.announcement}>
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

import React from 'react';
import styles from './announcementComp.module.css';
import Image from 'next/image';

const announcements = [
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
  // Your announcement data
];

const AnnouncementList = () => {
  return (
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
  );
};

export default AnnouncementList;

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
    image: "/icons/RobertFox.png",
  },
  {
    id: 2,
    name: "Jenny Wilson",
    time: "Yesterday",
    title: "Mentorship Program Launch",
    body: "Get one-on-one guidance from top engineers and educators.",
    imageUrl: "https://example.com/profile2.jpg",
  },
  {
    id: 2,
    name: "Jenny Wilson",
    time: "Yesterday",
    title: "Mentorship Program Launch",
    body: "Get one-on-one guidance from top engineers and educators.",
    imageUrl: "https://example.com/profile2.jpg",
  }
  ,
  {
    id: 2,
    name: "Jenny Wilson",
    time: "Yesterday",
    title: "Mentorship Program Launch",
    body: "Get one-on-one guidance from top engineers and educators.",
    imageUrl: "https://example.com/profile2.jpg",
  }
];

const Announcement = () => {
  return (
    <div className={styles.announcementcontainer}>
      {announcements.map(announcement => (
        <div key={announcement.id} className={styles.announcement}>
          <Image
            className={styles.profileImg}
            src="announcement.imageUrl"
            alt={announcement.name}
            height={40}
            width={40}
          />



          <div className={styles.announcementcontent}>
            <p className={styles.announcementname}>{announcement.name}</p>
            <p className={styles.announcementtime}>{announcement.time}</p>
            <h3 className={styles.announcementtitle}>{announcement.title}</h3>
            <p className={styles.announcementbody}>{announcement.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Announcement;
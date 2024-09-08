import styles from './announcementComp.module.css';
import { useState } from 'react';

// Announcements component that renders a scrollable list
const Announcements = () => {
  const announcements = [
    {
      name: "Robert Fox",
      time: "3:24 PM",
      title: "Mock test series are LIVE",
      message: "Our new mock test series is now live. Check it out now.",
      img: "/robert.png", // image paths
    },
    {
      name: "Jenny Wilson",
      time: "Yesterday",
      title: "Mentorship Program Launch",
      message: "Get one-on-one guidance from top engineers and educators.",
      img: "/jenny.png",
    },
    // Add more announcements here...
    {
      name: "Mark Smith",
      time: "2 Days Ago",
      title: "Important Update",
      message: "The course deadline has been extended.",
      img: "/mark.png",
    },
    {
      name: "Samantha Doe",
      time: "3 Days Ago",
      title: "New Resources Available",
      message: "New learning resources have been uploaded.",
      img: "/samantha.png",
    },
  ];

  return (
    <div className={styles.announcementContainer}>
      <div className={styles.scrollableAnnouncements}>
        {announcements.map((announcement, index) => (
          <div key={index} className={styles.announcement}>
            <img
              src={announcement.img}
              alt={${announcement.name} profile}
            className={styles.profilePic}
            />
            <div className={styles.textContent}>
              <h4>{announcement.name}</h4>
              <span>{announcement.time}</span>
              <h3>{announcement.title}</h3>
              <p>{announcement.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// AnnounceComp component that renders Announcements
function AnnounceComp() {
  return (
    <div>
      <h1>Admin Announcements</h1>
      <Announcements />
    </div>
  );
}

export default AnnounceComp;
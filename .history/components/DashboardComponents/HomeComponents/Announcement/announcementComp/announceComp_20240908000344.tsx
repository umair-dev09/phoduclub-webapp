import styles from './announcementComp.module.css';
import { useState, useEffect } from 'react';

// Define Announcements as its own component
const Announcements = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
  ];

  // Loop through announcements
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 5000); // change every 5 seconds

    return () => clearInterval(interval); // cleanup interval on unmount
  }, [announcements.length]);

  return (
    <div className={styles.announcementContainer}>
      <div className={styles.announcement}>
        <img
          src={announcements[currentIndex].img}
          alt="admin profile"
          className={styles.profilePic}
        />
        <div className={styles.textContent}>
          <h4>{announcements[currentIndex].name}</h4>
          <span>{announcements[currentIndex].time}</span>
          <h3>{announcements[currentIndex].title}</h3>
          <p>{announcements[currentIndex].message}</p>
        </div>
      </div>
    </div>
  );
};

// AnnounceComp component that renders Announcements
function AnnounceComp() {
  return (
    <div>
      {/* You can add any additional content here */}
      <Announcements />
    </div>
  );
}

export default AnnounceComp;
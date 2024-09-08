import React from 'react';
import styles from './announcementComp.module.css';

interface AnnouncementProps {
  announcements: {
    name: string;
    profilePic: string;
    time: string;
    title: string;
    body: string;
  }[];
}

const Announcement: React.FC<AnnouncementProps> = ({ announcements }) => {
  return (
    <div className={styles.announcement}>
      {announcements.map((announcement, index) => (
        <div key={index}>
          <div className={styles.adminmessage}>
            <div className={styles.admindetails}>
              <img src={announcement.profilePic} alt="Admin Profile" className={styles.adminpic} />
              <div className={styles.admininfo}>
                <h4>{announcement.name}</h4>
                <p className={styles.time}>{announcement.time}</p>
              </div>
            </div>
            <div className={styles.message}>
              <h5>{announcement.title}</h5>
              <p>{announcement.body}</p>
            </div>
          </div>
          {index < announcements.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
};

const AnnounceComp: React.FC = () => {
  const announcements = [
    {
      name: 'Robert Fox',
      profilePic: 'announceProfile.svg', // Use actual image URLs or local images
      time: '3:24 PM',
      title: 'Mock test series are LIVE',
      body: 'Our new mock test series is now live. Check it out now.',
    },
    {
      name: 'Jenny Wilson',
      profilePic: 'announceProfile.svg',
      time: 'Yesterday',
      title: 'Mentorship Program Launch',
      body: 'Get one-on-one guidance from top engineers and educators.',
    },
    {
      name: 'Jenny Wilson',
      profilePic: 'announceProfile.svg',
      time: 'Yesterday',
      title: 'Mentorship Program Launch',
      body: 'Get one-on-one guidance from top engineers and educators.',
    },
    {
      name: 'Jenny Wilson',
      profilePic: 'announceProfile.svg',
      time: 'Yesterday',
      title: 'Mentorship Program Launch',
      body: 'Get one-on-one guidance from top engineers and educators.',
    },
    {
      name: 'Jenny Wilson',
      profilePic: 'announceProfile.svg',
      time: 'Yesterday',
      title: 'Mentorship Program Launch',
      body: 'Get one-on-one guidance from top engineers and educators.',
    },
    {
      name: 'Robert Fox',
      profilePic: 'announceProfile.svg', // Use actual image URLs or local images
      time: '3:24 PM',
      title: 'Mock test series are LIVE',
      body: 'Our new mock test series is now live. Check it out now.',
    },
    {
      name: 'Jenny Wilson',
      profilePic: 'announceProfile.svg',
      time: 'Yesterday',
      title: 'Mentorship Program Launch',
      body: 'Get one-on-one guidance from top engineers and educators.',
    },
    {
      name: 'Jenny Wilson',
      profilePic: 'announceProfile.svg',
      time: 'Yesterday',
      title: 'Mentorship Program Launch',
      body: 'Get one-on-one guidance from top engineers and educators.',
    },
    {
      name: 'Jenny Wilson',
      profilePic: 'announceProfile.svg',
      time: 'Yesterday',
      title: 'Mentorship Program Launch',
      body: 'Get one-on-one guidance from top engineers and educators.',
    },
    {
      name: 'Jenny Wilson',
      profilePic: 'announceProfile.svg',
      time: 'Yesterday',
      title: 'Mentorship Program Launch',
      body: 'Get one-on-one guidance from top engineers and educators.',
    },
  ];

  return (
    <div>
      <Announcement announcements={announcements} />
    </div>
  );
};

export default AnnounceComp;

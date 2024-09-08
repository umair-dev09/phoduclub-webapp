import styles from './announcementComp.module.css';
import React from 'react';
function announce() {

  const announcements = [
    {
      name: 'Robert Fox',
      profilePic: 'profile-pic-1.jpg', // Use actual image URLs or local images
      time: '3:24 PM',
      title: 'Mock test series are LIVE',
      body: 'Our new mock test series is now live. Check it out now.',
    },
    {
      name: 'Jenny Wilson',
      profilePic: 'profile-pic-2.jpg',
      time: 'Yesterday',
      title: 'Mentorship Program Launch',
      body: 'Get one-on-one guidance from top engineers and educators.',
    },
  ];

  // Define the type for the announcement props
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
      <div className="announcement">
        {announcements.map((announcement, index) => (
          <div key={index}>
            <div className="admin-message">
              <div className="admin-details">
                <img src={announcement.profilePic} alt="Admin Profile" className="admin-pic" />
                <div className="admin-info">
                  <h4>{announcement.name}</h4>
                  <p className="time">{announcement.time}</p>
                </div>
              </div>
              <div className="message">
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



}
export default announce;
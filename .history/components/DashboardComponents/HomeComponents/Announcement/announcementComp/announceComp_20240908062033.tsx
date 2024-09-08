
import styles from './announcementComp.module.css';
import Image from 'next/image';




function AnnounceComp() {
  return (
    <div className={styles.main}>
      <div className={styles.announce1}>

        <div className={styles.announcement}>
          <img src="profile1.jpg" alt="Robert Fox" className={styles.profileImg} />
          <div className={styles.details}>
            <div className={styles.header}>
              <span className={styles.name}>Robert Fox</span>
              <span className={styles.time}>3:24 PM</span>
            </div>
            <div className={styles.title}>Mock test series are LIVE</div>
            <div className={styles.description}>Our new mock test series is now live. Check it out now.</div>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.announcement}>
          <img src="profile2.jpg" alt="Jenny Wilson" className={styles.profileImg} />
          <div className={styles.details}>
            <div className={styles.header}>
              <span className={styles.name}>Jenny Wilson</span>
              <span className={styles.time}>Yesterday</span>
            </div>
            <div className={styles.title}>Mentorship Program Launch</div>
            <div className={styles.description}>Get one-on-one guidance from top engineers and educators.</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AnnounceComp;

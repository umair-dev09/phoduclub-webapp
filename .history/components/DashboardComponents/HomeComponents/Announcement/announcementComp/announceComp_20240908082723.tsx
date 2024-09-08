
import styles from './announcementComp.module.css';
import Image from 'next/image';




function AnnounceComp() {
  return (
    <div className={styles.main}>
      <div className={styles.announce1}>

        <div className={styles.announcement}>
          <Image src="/icons/RobertFox.png" alt="Robert Fox" className={styles.profileImg} width={34} height={34} />
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





      </div>
    </div>
  )
}

export default AnnounceComp;

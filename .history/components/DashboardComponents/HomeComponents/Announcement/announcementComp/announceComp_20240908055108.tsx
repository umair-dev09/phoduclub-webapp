
import styles from './announcementComp.module.css';
import Image from 'next/image';




function AnnounceComp() {
  return (
    <div className={styles.main}>
      <div className={styles.announce1}>
        <Image
          src="/icons/RobertFox.png"
          alt="announce-profile-image"
          width={34}
          height={34}
        />
        <span>Robert Fox</span>
        <span>3:24PM</span>
      </div>
    </div>
  )
}

export default AnnounceComp;

import styles from './ExamType.module.css';

const ExamType = () => {
    return (
        <div className={styles.ExamType}>
            <div className={styles.button}>
                <span className={`${styles.dot} ${styles.red}`}></span> JEE
            </div>
            <div className={styles.button}>
                <span className={`${styles.dot} ${styles.orange}`}></span> BITSAT
            </div>
            <div className={styles.button}>
                <span className={`${styles.dot} ${styles.green}`}></span> VITEEE
            </div>
            <div className={styles.button}>
                <span className={`${styles.dot} ${styles.blue}`}></span> SRMJEEE
            </div>
            <div className={styles.button}>
                <span className={`${styles.dot} ${styles.blue}`}></span> KCET
            </div>
            <div className={styles.button}>
                <span className={`${styles.dot} ${styles.red}`}></span> COMEDK
            </div>
            <div className={styles.button}>
                <span className={`${styles.dot} ${styles.orange}`}></span> MET
            </div>
        </div>
    );
};

export default ExamType;

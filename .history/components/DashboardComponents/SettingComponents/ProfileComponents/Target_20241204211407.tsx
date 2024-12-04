import styles from './Profile.module.css';

const ExamType = () => {

    return (
        <div className={styles.ExamType}>
            <div className={styles.button}>
                <span className={`${styles.dot} ${styles.red}`}></span> <p className={styles.examText}>JEE</p>
            </div>
            <div className={styles.button}>
                <span className={`${styles.dot} ${styles.orange}`}></span> <p className={styles.examText}>BITSAT</p>
            </div>
            <div className={styles.button}>
                <span className={`${styles.dot} ${styles.green}`}></span> <p className={styles.examText}>VITEEE</p>
            </div>
            <div className={styles.button}>
                <span className={`${styles.dot} ${styles.blue}`}></span> <p className={styles.examText}>SRMJEEE</p>
            </div>
            <div className={styles.button}>
                <span className={`${styles.dot} ${styles.blue}`}></span> <p className={styles.examText}>KCET</p>
            </div>
            <div className={styles.button}>
                <span className={`${styles.dot} ${styles.red}`}></span> <p className={styles.examText}>COMEDK</p>
            </div>
            <div className={styles.button}>
                <span className={`${styles.dot} ${styles.orange}`}></span> <p className={styles.examText}>MET</p>
            </div>
        </div>
    );
};

export default ExamType;

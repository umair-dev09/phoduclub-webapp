'use client';

import styles from './testSeriesComp.module.css';
import Image from 'next/image';

function testSeriesComp() {
    return (
        <div className={styles.messageComp}>
            <div className={styles.sub}>
                <div className={styles.theSub}>
                    <h3>Phodu Super Power JEE</h3>
                    &nbsp;
                    <span>/</span>
                    &nbsp;
                    <p>Physics</p>
                </div>
                <div className={styles.nextButton}>
                    <Image src='/icons/collapse-right.svg' alt='more icon' width={10} height={10} />
                </div>
            </div>
            <div className={styles.progresses}>
                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: '62%' }}></div>
                </div>
                <div className={styles.progressPercent}><span>62%</span></div>
            </div>
            <div className={styles.theScores}>
                <div className={styles.attempted}>
                    <p>Attempted</p>
                    <div className={styles.outoff}>
                        <h3><span>5</span></h3>
                        <h3>/</h3>
                        <h3><span>10</span></h3>
                    </div>
                </div>
                <div className={styles.score}>
                    <p className={styles.scoreText}>Score</p>
                    <div className={styles.outoff}>
                        <h3><span>60</span></h3>
                        <h3>/</h3>
                        <h3><span>100</span></h3>
                    </div>
                </div>
                <div className={styles.timeLeft}>
                    <p>Time Left</p>
                    <h3><span>13</span>&nbsp;<span>Days</span></h3>
                </div>
            </div>
        </div>
    );
}

export default testSeriesComp;
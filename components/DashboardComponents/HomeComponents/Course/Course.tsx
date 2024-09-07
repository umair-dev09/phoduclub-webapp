"use client";

import styles from '../homeComponents.module.css';
import Image from 'next/image';

function Course(){
    return(
        <div className={styles.courseComp}>
            <div className={styles.course1}>
                <div>
                    <div className={styles.suggestion}>
                        <Image
                            className={styles.suggestionIcon}
                            src="/icons/suggestion_icon.svg"
                            alt="suggestion icon"
                            width={16}
                            height={16}
                        />
                        <p>Suggested for you</p>
                    </div>
                    <div className={styles.image}>
                        <Image
                            className={styles.courseImage}
                            src="/images/course_img.svg"
                            alt="course image"
                            width={239}
                            height={160}
                        />
                    </div>
                </div>
                <div className={styles.courseInfo}>
                    <div className={styles.aboutCourse}>
                        <div className={styles.courseName}>
                            <p>BITSET Full Course</p>
                        </div>
                        <div className={styles.courseLength}>
                            <p className={styles.courseLength1}>3 Lessons </p>&#x2022;<p className={styles.courseLength2}>3hr 14m</p>
                        </div>
                    </div>
                    <div className={styles.coursePrice}>
                        <div className={styles.courseAmount}>
                            <h4>&#8377; 2400</h4>
                        </div>
                        <div className={styles.courseBuy}>
                            <button className={styles.buyButton}>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.course2}>
                <div>
                    <div className={styles.suggestion}>
                        <Image
                            className={styles.suggestionIcon}
                            src="/icons/suggestion_icon.svg"
                            alt="suggestion icon"
                            width={16}
                            height={16}
                        />
                        <p>Suggested for you</p>
                    </div>
                    <div className={styles.image}>
                        <Image
                            className={styles.courseImage}
                            src="/images/course_img.svg"
                            alt="course image"
                            width={239}
                            height={160}
                        />
                    </div>
                </div>
                <div className={styles.courseInfo}>
                    <div className={styles.aboutCourse}>
                        <div className={styles.courseName}>
                            <p>BITSET Full Course</p>
                        </div>
                        <div className={styles.courseLength}>
                            <p>3 Lessons</p>&#x2022;<p>3hr 14m</p>
                        </div>
                    </div>
                    <div className={styles.coursePrice}>
                        <div className={styles.courseAmount}>
                            <h4>&#8377; 2400</h4>
                        </div>
                        <div className={styles.courseBuy}>
                            <button className={styles.buyButton}>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Course;
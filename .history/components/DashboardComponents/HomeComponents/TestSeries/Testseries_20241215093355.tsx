"use client";

import styles from "../homeComponents.module.css";
import Image from "next/image";
import TestSeriesComp from "@/components/DashboardComponents/HomeComponents/TestSeries/testSeriesComp/testSeriesComp";

function TestSeries() {
    return (
        <div className={styles.testSeriesComp}>

            {/* --------------------------- BEFORE BUYING COURSES --------------------------- */}

            <div className={styles.beforeBuying}>
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
                            <img
                                className={styles.courseImage}
                                src="/images/course_img.svg"
                            />
                        </div>
                    </div>
                    <div className={styles.courseInfo}>
                        <div className={styles.aboutCourse}>
                            <div className={styles.courseName}>
                                <p>BITSET Full Course</p>
                            </div>
                            <div className={styles.courseLength}>
                                <p>3 Lessons</p>
                                <span>&#x2022;</span>
                                <p>3hr 14m</p>
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
                                <p>3 Lessons</p>
                                <span>&#x2022;</span>
                                <p>3hr 14m</p>
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

            {/* --------------------------- BEFORE BUYING COURSES --------------------------- */}



            {/* --------------------------- AFTER BUYING COURSES --------------------------- */}

            <div className={styles.afterBuying}>
                <TestSeriesComp />
            </div>

            {/* --------------------------- AFTER BUYING COURSES --------------------------- */}


        </div>
    );
}

export default TestSeries;
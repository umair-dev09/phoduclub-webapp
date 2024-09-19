"use client";

import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./maincourse2.module.css";

function ClientMain2() {
    const router = useRouter();

    const handleClick = () => {
        router.push("/CourseComponents/DynamicCourse/page");
    };

    return (
        <div className="flex flex-row w-full">
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
                    <div>
                        <img
                            src="/images/course_img.svg"
                            alt="Course image"
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
                        <div>
                            <button
                                className={styles.buyButton}
                                onClick={handleClick}
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

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
                    <div>
                        <img
                            src="/images/course_img.svg"
                            alt="Course image"
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
                        <div>
                            <button
                                className={styles.buyButton}
                                onClick={handleClick}
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientMain2;

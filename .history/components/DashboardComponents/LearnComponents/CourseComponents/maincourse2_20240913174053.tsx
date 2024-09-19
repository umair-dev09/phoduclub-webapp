"use client";

import Image from "next/image";
import { useRouter } from "next/router"; // To handle routing
import styles from "./maincourse2.module.css";
import { Url } from "next/dist/shared/lib/router/router";

function main2() {
    const router = useRouter(); // Initialize Next.js router for navigation

    const handleTabClick = (DynamicCourse: string, path: Url) => {
        console.log(`Navigating to ${DynamicCourse} at ${path}`);
        router.push(path); // This will navigate to the specified path
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
                            <span>&#x2022;</span> {/* This adds a bullet between */}
                            <p>3hr 14m</p>
                        </div>
                    </div>
                    <div className={styles.coursePrice}>
                        <div className={styles.courseAmount}>
                            <h4>&#8377; 2400</h4>
                        </div>
                        <div>
                            <button className={styles.buyButton} onClick={() => handleTabClick('DynamicCourse', '/CourseComponents/DynamicCourse')}>
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* The second course block - You can make it dynamic if you want */}
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
                            <button className={styles.buyButton}>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default main2;
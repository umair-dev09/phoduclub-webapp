"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter hook
import styles from "./maincourse2.module.css";

function Main2() {
    // Initialize state and router inside the component
    const [activeTab, setActiveTab] = useState<string>('');
    const router = useRouter();

    // Handle tab click to navigate to a new route
    const handleTabClick = (tabName: string, path: string) => {
        setActiveTab(tabName);
        router.push(path);
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
                            <span>&#x2022;</span> {/* Adds a bullet between */}
                            <p>3hr 14m</p>
                        </div>
                    </div>
                    <div className={styles.coursePrice}>
                        <div className={styles.courseAmount}>
                            <h4>&#8377; 2400</h4>
                        </div>
                        <div>
                            {/* Corrected the button click handler */}
                            <button
                                className={styles.buyButton}
                                onClick={() => handleTabClick('buy', '/LearnComponents/CourseComponents/page')}
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
                            <span>&#x2022;</span> {/* Adds a bullet between */}
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
                                onClick={() => handleTabClick('buy', '/LearnComponents/CourseComponents/DynamicCourse/page')}
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

export default Main2;

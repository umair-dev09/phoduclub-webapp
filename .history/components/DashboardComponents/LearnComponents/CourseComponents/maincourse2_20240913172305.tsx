"use client";

import Image from "next/image";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./maincourse2.module.css";

function main2() {
    const [activeTab, setActiveTab] = useState<string>('');
    const router = useRouter();
    const pathname = usePathname();
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
                            <button className={styles.buyButton} onClick={() => handleTabClick('collaspe', '/DynamicCourse/collaspe')}
                            >Buy Now</button>
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
                            <button className={styles.buyButton}>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default main2;



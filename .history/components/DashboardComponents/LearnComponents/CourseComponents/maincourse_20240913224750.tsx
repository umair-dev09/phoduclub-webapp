"use client";

import Image from "next/image";
import styles from "./maincourse.module.css";

function main() {
    return (
        <div className="flex flex-1 flex-row">
            <div className={styles.course1}>
                <div className="flex flex-1">
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
                        <img src="/images/course_img.svg" alt="Course" />
                    </div>
                </div>

                <div className={styles.courseInfo}>
                    <div className="flex h-[60%] items-center flex-col">
                        <div className={styles.courseName}>
                            <div>
                                <p>BITSET Full Course</p>
                            </div>
                            <div className="mr-4">
                                <Image src='/icons/collaps-right.svg' alt="expand icon" width={24} height={24} />
                            </div>
                        </div>
                        <div className={styles.courseLength}>
                            <p>3 Lessons</p>
                            <span>&#x2022;</span> {/* Bullet point */}
                            <p>3hr 14m</p>
                        </div>
                    </div>

                    <div className="flex h-[40%] flex-col">
                        <div className="flex relative w-11/12 h-2 rounded-full bg-gray-200 mb-1">
                            <div
                                className="absolute top-0 left-0 h-2 rounded-full bg-progressPurple"
                                style={{ width: "43%" }}
                            ></div>
                        </div>

                        <div className="flex flex-1 flex-row justify-between mt-2 text-xs">
                            <div className="flex flex-row gap-1">Completed: <h4>43%</h4></div>
                            <div className="flex flex-row gap-1">Time Left: <h4>28 days left</h4></div>
                        </div>
                    </div>
                </div>
                <div className={styles.courseInfo}>
                    <div className="flex h-[60%] items-center flex-col">
                        <div className={styles.courseName}>
                            <div>
                                <p>BITSET Full Course</p>
                            </div>
                            <div className="mr-4">
                                <Image src='/icons/collaps-right.svg' alt="expand icon" width={24} height={24} />
                            </div>
                        </div>
                        <div className={styles.courseLength}>
                            <p>3 Lessons</p>
                            <span>&#x2022;</span> {/* Bullet point */}
                            <p>3hr 14m</p>
                        </div>
                    </div>

                    <div className="flex h-[40%] flex-col">
                        <div className="flex relative w-11/12 h-2 rounded-full bg-gray-200 mb-1">
                            <div
                                className="absolute top-0 left-0 h-2 rounded-full bg-progressPurple"
                                style={{ width: "43%" }}
                            ></div>
                        </div>

                        <div className="flex flex-1 flex-row justify-between mt-2 text-xs">
                            <div className="flex flex-row gap-1">Completed: <h4>43%</h4></div>
                            <div className="flex flex-row gap-1">Time Left: <h4>28 days left</h4></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default main;

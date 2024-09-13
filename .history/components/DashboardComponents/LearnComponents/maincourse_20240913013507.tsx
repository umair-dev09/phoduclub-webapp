"use client";

import Image from "next/image";
import styles from "./maincourse.module.css";


function main() {
    return (
        <div className="flex flex-1 flex-row ">
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
                    <div className="flex flex-1 items-center flex-col">
                        <div className={styles.courseName}>
                            <p>BITSET Full Course</p>
                        </div>
                        <div className={styles.courseLength}>
                            <p>3 Lessons</p>
                            <span>&#x2022;</span> {/* This adds a bullet between */}
                            <p>3hr 14m</p>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-evenly">
                        <div>
                            <progress className="h-[8px] w-10/12 decoration-red" />
                        </div>
                        <div className="flex flex-1 flex-row justify-between">
                            <div className="flex flex-row">Completed:<h4>43%</h4></div>
                            <div className="flex flex-row">Time Left:<h4>28 days left</h4></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default main;
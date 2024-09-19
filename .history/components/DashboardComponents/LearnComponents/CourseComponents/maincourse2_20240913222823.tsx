// "use client";

// import Image from "next/image";


// import styles from "./maincourse2.module.css";





// function main2() {



//     return (
//         <div className="flex flex-row w-full">
//             <div className={styles.course1}>
//                 <div>
//                     <div className={styles.suggestion}>
//                         <Image
//                             className={styles.suggestionIcon}
//                             src="/icons/suggestion_icon.svg"
//                             alt="suggestion icon"
//                             width={16}
//                             height={16}
//                         />
//                         <p>Suggested for you</p>
//                     </div>
//                     <div>
//                         <img
//                             src="/images/course_img.svg"
//                         />
//                     </div>
//                 </div>
//                 <div className={styles.courseInfo}>
//                     <div className={styles.aboutCourse}>
//                         <div className={styles.courseName}>
//                             <p>BITSET Full Course</p>
//                         </div>
//                         <div className={styles.courseLength}>
//                             <p>3 Lessons</p>
//                             <span>&#x2022;</span> {/* This adds a bullet between */}
//                             <p>3hr 14m</p>
//                         </div>
//                     </div>
//                     <div className={styles.coursePrice}>
//                         <div className={styles.courseAmount}>
//                             <h4>&#8377; 2400</h4>
//                         </div>
//                         <div>
//                             <button
//                                 className={styles.buyButton}

//                             >
//                                 Buy Now
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className={styles.course1}>
//                 <div>
//                     <div className={styles.suggestion}>
//                         <Image
//                             className={styles.suggestionIcon}
//                             src="/icons/suggestion_icon.svg"
//                             alt="suggestion icon"
//                             width={16}
//                             height={16}
//                         />
//                         <p>Suggested for you</p>
//                     </div>
//                     <div>
//                         <img
//                             src="/images/course_img.svg"
//                         />
//                     </div>
//                 </div>
//                 <div className={styles.courseInfo}>
//                     <div className={styles.aboutCourse}>
//                         <div className={styles.courseName}>
//                             <p>BITSET Full Course</p>
//                         </div>
//                         <div className={styles.courseLength}>
//                             <p>3 Lessons</p>
//                             <span>&#x2022;</span> {/* This adds a bullet between */}
//                             <p>3hr 14m</p>
//                         </div>
//                     </div>
//                     <div className={styles.coursePrice}>
//                         <div className={styles.courseAmount}>
//                             <h4>&#8377; 2400</h4>
//                         </div>
//                         <div>
//                             <button className={styles.buyButton}>Buy Now</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default main2;


"use client";

import Image from "next/image";
import { useRouter } from "next/router"; // Import useRouter
import styles from "./maincourse2.module.css";

function Main2() {
    const router = useRouter(); // Initialize useRouter

    const handleClick = ("/CourseComponents/DynamicCourse/page.tsx") => {
        router.push("/CourseComponents/DynamicCourse/page.tsx"); // Navigate to the specified URL
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
                                onClick={() => handleClick('("/CourseComponents/DynamicCourse/page.tsx"')} // Pass the route URL
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
                            // Pass the route URL
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

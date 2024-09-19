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

// "use client";

// import Image from "next/image";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react"; // Import useEffect and useState
// import styles from "./maincourse2.module.css";

// function Main2() {
//     const router = useRouter();
//     const [mounted, setMounted] = useState(false); // State to track mounting

//     // Ensure that the component is only rendered on the client side
//     useEffect(() => {
//         setMounted(true); // Set mounted to true once the component is rendered
//     }, []);

//     const handleClick = () => {
//         if (mounted) {
//             router.push("/CourseComponents/DynamicCourse/page"); // Navigate to the specified URL
//         }
//     };

//     if (!mounted) return null; // Return null if the component is not mounted yet

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
//                             alt="Course image"
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
//                             <span>&#x2022;</span>
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
//                                 onClick={handleClick}
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
//                             alt="Course image"
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
//                             <span>&#x2022;</span>
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
//                                 onClick={handleClick}
//                             >
//                                 Buy Now
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Main2;

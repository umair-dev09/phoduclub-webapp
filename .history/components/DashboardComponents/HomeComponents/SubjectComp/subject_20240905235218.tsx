"use client"

import styles from '../homeComponents.module.css';

function subject() {
    // const handleNavigation = (path: string) => {
    //     router.push(path); // Navigate to the specified path
    //   };


    return (
        <div>
            <div className={styles.container}>
                <button className={styles.overall}>

                    overall
                </button>
            </div>


            {/* <button className={styles.maths}>
                maths
            </button>

            <button className={styles.physics}>
                physics

            </button>
            
            <button className={styles.chemistry}>
                chemistry
            </button> */}

        </div>
    )

}

export default subject;

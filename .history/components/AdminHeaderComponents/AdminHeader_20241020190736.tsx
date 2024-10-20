"use client";
import styles from '../../components/DashboardComponents/TabComps.module.css';





function Header() {




    return (
        <div>
            <div className={styles.headtab}>
                <div className={styles.greeting}>
                    <h2>
                        Keep up the great work!
                    </h2>
                </div>

                <div className={styles.profileParentLyt}>

                    <div className={styles.divider1} />

                </div>
            </div>
        </div>
    );
}

export default Header;

"use client";

import styles from '../../components/DashboardComponents/TabComps.module.css';

interface HeaderProps {
    currentPage: string;
}

function Header({ currentPage }: HeaderProps) {
    return (
        <div>
            <div className={styles.headtab}>
                <div className={styles.greeting}>
                    <h2>
                        {currentPage}
                    </h2>
                </div>
                <div className={styles.profileParentLyt}>
                    <div className={styles.divider1} />
                    <span>jabir ali</span> {/* Display the current page name */}
                </div>
            </div>
        </div>
    );
}

export default Header;


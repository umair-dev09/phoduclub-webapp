import NotficationDropDown from './NotificationDropdown';
import styles from '/components/DashboardComponents/TabComps.module.css'
import Image from 'next/image';
<<<<<<< HEAD:components/DashboardComponents/Header.tsx
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
function Header() {

    return (
        <div className={styles.headtab}>
            <div className="greeting">
                <h2><span id="hi">Hey, <span>Siraj Dhanani</span>,</span> Keep up the great work!</h2>
            </div>
            <div className={styles.help}>
                <button className={styles.headerButton}>
                    <Image src="/icons/help-.svg" width={16} height={16} alt="Help Icon" />
                </button>
            </div>
            <div className={styles.notification}>
                <div className={styles.notificationIndicator} />
                <button className={styles.headerButton}>
                    <Image src="/icons/notification.svg" width={16} height={16} alt="Notification Icon" />
                </button>
            </div>
            <div className={styles.divider1} />

            <div className={styles.profileParentLyt}>
                {/* <div className={styles.profileChildLyt}> */}
                <Popover placement="bottom">
                    <PopoverTrigger>
=======
import { Popover,PopoverTrigger, PopoverContent } from '@nextui-org/popover';

function Header() {

    return(
     <div className={styles.headtab}>
           <div className="greeting">
                            <h2><span id="hi">Hey, <span>Siraj Dhanani</span>,</span> Keep up the great work!</h2>
                        </div>
                        <div className={styles.help}>
                        <button className={styles.headerButton}>
                        <Image src="/icons/help-circle.svg" width={16} height={16} alt="Help Icon" />
                               </button>
                        </div>
                        <NotficationDropDown/> 
                        
                        <div className={styles.divider1}/>

                        <div className={styles.profileParentLyt}>
                        {/* <div className={styles.profileChildLyt}> */}
                        <Popover backdrop='opaque' placement="bottom">
                        <PopoverTrigger>
>>>>>>> e1aaec5f9b6fe0e739895d25a59c3e3b80a0bb94:components/HeaderComponents/Header.tsx
                        <div className={styles.profileChildLyt}>
                            <Image className={styles.profilePic} src="/dp1.jpg" width={32} height={32} alt="Notification Icon" />
                            <div className={styles.headerInfo}>
                                <div className="name">John Smith</div>
                                <div className="email">john@acme.com</div>
                            </div>
                            <button className={styles.arrowButton}>
                                <Image className={styles.arrowIcon} src="/icons/arrowHeader.svg" width={15} height={15} alt="Notification Icon" />
                            </button>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className={styles.profilePopup}>
                            <button className={styles.myProfButton}>
                                <Image className={styles.profPopupIcon} src="/icons/user-circle.svg" width={18} height={18} alt="Notification Icon" />
                                <p className={styles.profPopupText1}>My profile</p>
                            </button>
                            <button className={styles.logoutProfButton}>
                                <Image className={styles.profPopupIcon} src="/icons/logout.svg" width={18} height={18} alt="Notification Icon" />
                                <p className={styles.profPopupText2}>Log out</p>
                            </button>
                        </div>
                    </PopoverContent>
                </Popover>

                {/* </div> */}
                {/* <div className={styles.test}/> */}
            </div>



        </div>
    );

}
export default Header;
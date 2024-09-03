
import { Icon } from '@/components/Icon';
import styles from './TabComps.module.css';
import Image from 'next/image';
import { Popover,PopoverTrigger, PopoverContent } from '@nextui-org/popover';
function Header() {

<<<<<<< HEAD
    return(
     <div className={styles.headtab}>
           <div className="greeting">
                            <h2><span id="hi">Hey, <span>Siraj Dhanani</span>,</span> Keep up the great work!</h2>
                        </div>
                        <div className={styles.help}>
                        <button className={styles.headerButton}>
                        <Icon name="help-circle" width={16} height={16} color="--c-crimson-red-500" />
                               </button>
                        </div>
                        <div className={styles.notification}>
                        <div className={styles.notificationIndicator}/>
                        <button className={styles.headerButton}>
                        <Image src="/icons/notification.svg" width={16} height={16} alt="Notification Icon" />
                        </button>
                        </div>
                        <div className={styles.divider1}/>

                        <div className={styles.profileParentLyt}>
                        {/* <div className={styles.profileChildLyt}> */}
                        <Popover placement="bottom">
                        <PopoverTrigger>
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
                            <Image className={styles.profPopupIcon}  src="/icons/user-circle.svg" width={18} height={18} alt="Notification Icon" />
                                <p className={styles.profPopupText1}>My profile</p>
                            </button>
                            <button className={styles.logoutProfButton}>
                            <Image className={styles.profPopupIcon}  src="/icons/logout.svg" width={18} height={18} alt="Notification Icon" />
                                <p className={styles.profPopupText2}>Log out</p>
                            </button>
                            </div> 
                        </PopoverContent>
                        </Popover>
                        
                        {/* </div> */}
                        {/* <div className={styles.test}/> */}
                        </div>
                        
                        

     </div>
=======
    return (
        <div className={styles.headtab}>
            <div className="greeting">
                <p><span id="hi">Hey, <span>Siraj Dhanani</span>,</span> Keep up the great work!</p>
            </div>
            <div className={styles.help}>
                <button className={styles.headerButton}>

                </button>
            </div>
            <div className={styles.notification}>
                <button className={styles.headerButton}>

                </button>
            </div>
            <div className="dp"><p className="actual-dp">JS</p></div>
            <div className="info">
                <div className="name">John Smith</div>
                <div className="email">john@acme.com</div>
            </div>
        </div>
>>>>>>> 87397df3560460a07dc8c6aca4f20fbd702810d9
    );

}
export default Header;
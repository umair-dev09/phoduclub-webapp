import styles from '../../components/DashboardComponents/TabComps.module.css';
import Image from 'next/image';
import { Popover,PopoverTrigger, PopoverContent } from '@nextui-org/popover';

function NotficationDropDown(){
 
    return(
        <div >   
            <Popover  backdrop='blur' placement='bottom-end'>
            <PopoverTrigger > 
            <div className={styles.notification}>
            <div className={styles.notificationIndicator}/>
            <button className={styles.headerButton}>
            <Image src="/icons/notification.svg" width={15} height={15} alt="Notification Icon" />
             </button> 
            </div>
             </PopoverTrigger>
             <PopoverContent>
             <div className={styles.notificationDropDownLyt}>
             <div className={styles.notiHeadLyt}>
             <h3 className={styles.notiText}>Notifications</h3>
             <button>
               <p className={styles.markAllText}> Mark all as read</p>
             </button>        
             </div>
             <div className={styles.notiDivider}/>  
             <div className={styles.emptyNotificationLyt}>
             <Image src="/icons/empty-notification.svg" width={100} height={100} alt="Empty Notification" />
             <h3 className={styles.notiText2}>You're all caught up</h3>     
             <p className='text-sm text-center'>We’ll keep you updated on any future notifications</p>
             </div>
             </div>                 
              </PopoverContent>
            </Popover> 
         </div>
    );
}
export default NotficationDropDown;
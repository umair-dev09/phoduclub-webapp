import styles from '../../components/DashboardComponents/TabComps.module.css';
import Image from 'next/image';
import { Popover,PopoverTrigger, PopoverContent } from '@nextui-org/popover';

function HelpDropDown(){
 
    return(
        <div >   
            <Popover  backdrop='blur' placement='bottom-end'>
            <PopoverTrigger > 
            <div className={styles.help}>
                        <button className={styles.headerButton}>
                            <Image src="/icons/help-circle.svg" width={16} height={16} alt="Help Icon" />
                        </button>
                    </div>
             </PopoverTrigger>
             <PopoverContent>
             <div className='flex flex-col bg-white rounded-[8px] border-[1px] border-solid border-[#EAECF0] p-3 w-[180px] shadow-[0_2px_4px_#EAECF0] h-auto'>
                                <button className='flex flex-row items-center mb-[2px]'>
                                    <Image className={styles.profPopupIcon} src="/icons/message-question.svg" width={18} height={18} alt="Get more help Icon" />
                                    <p className={styles.profPopupText1}>Get more help</p>
                                </button>
                                <button className={styles.logoutProfButton}>
                                    <Image className={styles.profPopupIcon} src="/icons/feedback.svg" width={18} height={18} alt="Send feedback Icon" />
                                    <p className={styles.profPopupText1}>Send feedback</p>
                                </button>
                            </div>               
              </PopoverContent>
            </Popover> 
         </div>
    );
}
export default HelpDropDown;
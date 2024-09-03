
import { Icon } from '@/components/Icon';
import styles from './TabComps.module.css';
function Header() {

    return(
     <div className={styles.headtab}>
           <div className="greeting">
                            <p><span id="hi">Hey, <span>Siraj Dhanani</span>,</span> Keep up the great work!</p>
                        </div>
                        <div className={styles.help}>
                        <button className={styles.headerButton}>
                        <Icon name="help-circle" width={20} height={20} color="--c-crimson-red-500" />
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
    );

}
export default Header;
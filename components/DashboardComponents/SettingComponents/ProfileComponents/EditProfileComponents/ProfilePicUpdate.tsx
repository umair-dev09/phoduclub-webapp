import styles from '../Profile.module.css';
import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel} from '@headlessui/react';
import Image from 'next/image';
function ProfilePicUpdate(){
    let [isOpen, setIsOpen] = useState(false)

    return(
        <div>
       <button className={styles.changeButton} onClick={() => setIsOpen(true)}> 
       <Image className={styles.editIcon} src="/icons/pencil-edit.svg" alt="edit-icon" width={20} height={20} />
       <p className={styles.changeText}>Change</p>
      </button>        
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}  className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
          <DialogPanel transition className={styles.commonDialogBox}>
           <div className={styles.commonUpdateHeader}> 
            <h3>Select an Image</h3>
            <button onClick={() => setIsOpen(false)}><Image src='/icons/cancel.svg' alt="profile-image" width={18} height={18} /></button>
           </div>
           <div className={styles.commonDivider}/> 
           <div className={styles.picBox}>
           <button className={styles.profOptionBox}>
           <Image src="/images/uploadImage.svg" alt="edit-icon" width={110} height={110} />
           <p className='text-sm font-medium'>Upload Image</p>
           </button>
           <button className={styles.profOptionBox}>
           <Image src="/images/chooseAvatar.svg" alt="edit-icon" width={110} height={110} />
           <p className='text-sm font-medium'>Choose Avatar</p>
           </button>
           </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
    );
}
export default ProfilePicUpdate;
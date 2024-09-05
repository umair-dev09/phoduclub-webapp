import styles from '../Profile.module.css';
import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel} from '@headlessui/react';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function PhoneUpdate(){
    let [isOpen, setIsOpen] = useState(false)

    return(
        <div className={styles.updateMob}>
        <button className={styles.updateMobButton} onClick={() => setIsOpen(true)}>Update</button>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}  className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
          <DialogPanel transition className={styles.commonDialogBox}>
           <div className={styles.commonUpdateHeader}> 
            <h3>Update Phone Number</h3>
            <button onClick={() => setIsOpen(false)}><Image src='/icons/cancel.svg' alt="profile-image" width={18} height={18} /></button>
           </div>
           <p className='text-sm mx-6 text-[#667085] mb-4'>Lorem ipsum is a dummy text widely used in digital industry will be used here in as a preview</p>
           <div className={styles.commonDivider}/> 
           <div className='mt-4 mb-6 ml-6 mr-6 gap-4 flex flex-col'>
           <div>
            <label htmlFor="Number">Enter Old Number</label>
            <div>
            <PhoneInput
             country={'in'}
            //  value={phone}
            //  onChange={(value: any) => handleInputChange('phone', value)}
             placeholder="+91 000000000"
             inputProps={{
             name: 'phone',
             required: true,
             autoFocus: true
             }}
             containerClass={styles.phoneinputcontainer}
             inputClass={styles.forminput}
             />
             {/* {isSubmitted && errors.phone && <div id="phone_error" className={styles.error}>{errors.phone}</div>} */}
             </div>
             </div>
             <div>
            <label htmlFor="Number">Enter New Number</label>
            <div>
            <PhoneInput
             country={'in'}
            //  value={phone}
            //  onChange={(value: any) => handleInputChange('phone', value)}
             placeholder="+91 000000000"
             inputProps={{
             name: 'phone',
             required: true,
             autoFocus: true
             }}
             containerClass={styles.phoneinputcontainer}
             inputClass={styles.forminput}
             />
             {/* {isSubmitted && errors.phone && <div id="phone_error" className={styles.error}>{errors.phone}</div>} */}
             </div>
             </div>
          </div>
          <div className={styles.commonDivider}/> 

          <div className={styles.commonButtons}>
           <button className={styles.emailCancelBtn}>Cancel</button>
           <button className={styles.emailVerifyBtn}>Verify</button>
          </div>      
          </DialogPanel>
        </div>
      </Dialog>
      </div>
    );
}
export default PhoneUpdate;
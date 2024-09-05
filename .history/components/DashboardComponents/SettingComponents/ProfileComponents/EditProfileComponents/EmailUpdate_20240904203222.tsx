"use client";
import styles from '../Profile.module.css';
import { useState } from 'react';
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import Image from 'next/image';
function EmailUpdate() {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.updateEmail}>
      <button className={styles.updateEmailButton} onClick={() => setIsOpen(true)}>Update</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
          <DialogPanel transition className={styles.emailDialogBox}>
            <div className={styles.emailHeader}>
              <h3>Update Email Address</h3>
              <button onClick={() => setIsOpen(false)}><Image src='/icons/cancel.svg' alt="profile-image" width={18} height={18} /></button>
            </div>
            <p className='text-sm mx-6'>Lorem ipsum is a dummy text widely used in digital industry will be used here in as a preview</p>
            <div className={styles.emailDivider} />

            <div className={styles.emailInputDiv}>
              <label className='text-sm font-medium' htmlFor="Email">Enter Old Email Id</label>
              <div>
                <input
                  type="email"
                  id='Email'
                  placeholder='Email Id'
                  //  value={email}
                  //  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={styles.emailInput}
                />
                {/* {isSubmitted && errors.email && <div id="email_error" className={styles.error}>{errors.email}</div>} */}
              </div>
            </div>
            <div className={styles.emailInputDiv}>
              <label className='text-sm font-medium ' htmlFor="Email">Enter New Email Id</label>
              <div>
                <input
                  type="email"
                  id='Email'
                  placeholder='Email Id'
                  //  value={email}
                  //  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={styles.emailInput}
                />
                {/* {isSubmitted && errors.email && <div id="email_error" className={styles.error}>{errors.email}</div>} */}
              </div>
            </div>
            <div className={styles.emailDivider} />

            <div className={styles.emailButtons}>
              <button className={styles.emailCancelBtn}>Cancel</button>
              <button className={styles.emailVerifyBtn}>Verify</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>

  );
}
export default EmailUpdate;
import styles from '../Profile.module.css';
import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel} from '@headlessui/react';
import Image from 'next/image';
import Select, { MultiValue, SingleValue } from 'react-select';

function TargetYearUpdate(){
    type Option = {
        value: string;
        label: string;
      };
      
      type CustomState = {
        isSelected: boolean;
        isFocused: boolean;
      };
      
      const years: Option[] = [
        { value: '2024', label: '2024' },
        { value: '2025', label: '2025' },
        { value: '2026', label: '2026' },
      ];
      let [isOpen, setIsOpen] = useState(false)
      const [selectedYear, setSelectedYear] = useState<SingleValue<Option>>(null);

 return(
    <div className={styles.updateYear}>
    <button className={styles.updateYearButton} onClick={() => setIsOpen(true)}>Update</button>
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}  className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
          <DialogPanel transition className={styles.commonDialogBox}>
           <div className={styles.commonUpdateHeader}> 
            <h3>Update Target Year</h3>
            <button onClick={() => setIsOpen(false)}><Image src='/icons/cancel.svg' alt="profile-image" width={18} height={18} /></button>
           </div>
           <p className='text-sm mx-6 text-[#667085] mb-4'>Lorem ipsum is a dummy text widely used in digital industry will be used here in as a preview</p>
           <div className={styles.commonDivider}/> 

           <div className={styles.dropdownWrapper}>
        <label htmlFor="target-year" className={styles.label}>Target Year</label>
        <Select
          id="target-year"
          value={selectedYear}
          onChange={setSelectedYear}
          options={years}
          placeholder="Select year..."
          className={styles.yearSelect}
          styles={{
            option: (provided, state: CustomState) => ({
              ...provided,
              color: 'black',
              backgroundColor: state.isFocused ? '#E39FF6' : 'white', // Purple color when focused
            }),
            singleValue: (provided) => ({
              ...provided,
              color: 'black',
              fontWeight: '500'
            }),
            control: (provided) => ({
              ...provided,
              border: '1px solid #e6e6e6',
              borderRadius: '8px',
              padding: '4px',
              boxShadow: 'none',
              '&:hover': {
                outline: '1px solid #e5a1f5',
              },
            }),
            
          }}
        />
      </div>
          <div className={styles.commonDivider}/> 

          <div className={styles.commonButtons}>
           <button className={styles.tExamCancelBtn}>Cancel</button>
           <button className={styles .tExamContinueBtn}>Continue</button>
          </div>      
          </DialogPanel>
        </div>
      </Dialog>
    </div>
 );
}
export default TargetYearUpdate;
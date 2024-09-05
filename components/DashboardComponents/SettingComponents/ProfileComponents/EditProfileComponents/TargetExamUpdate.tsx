import styles from '../Profile.module.css';
import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel} from '@headlessui/react';
import Image from 'next/image';
import Select, { MultiValue, SingleValue } from 'react-select';
function TargetExamUpdate(){
    type Option = {
        value: string;
        label: string;
      };
      type CustomState = {
        isSelected: boolean;
        isFocused: boolean;
      };
    const exams: Option[] = [
        { value: 'BITSAT', label: 'BITSAT' },
        { value: 'JEE', label: 'JEE' },
        { value: 'SRMJEEE', label: 'SRMJEEE' },
        { value: 'COMEDK', label: 'COMEDK' },
        { value: 'KCET', label: 'KCET' },
        { value: 'VITEEE', label: 'VITEEE' },
        { value: 'MET', label: 'MET' },
      ];
      
    let [isOpen, setIsOpen] = useState(false)
    const [selectedExams, setSelectedExams] = useState<MultiValue<Option>>([]);

    return(
        <div className={styles.updateIcon}>
            <button className={styles.updateIconButton} onClick={() => setIsOpen(true)}>Update</button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}  className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
          <DialogPanel transition className={styles.commonDialogBox}>
           <div className={styles.commonUpdateHeader}> 
            <h3>Update Exam</h3>
            <button onClick={() => setIsOpen(false)}><Image src='/icons/cancel.svg' alt="profile-image" width={18} height={18} /></button>
           </div>
           <p className='text-sm mx-6 text-[#667085] mb-4'>Lorem ipsum is a dummy text widely used in digital industry will be used here in as a preview</p>
           <div className={styles.commonDivider}/> 

           <div className={styles.dropdownWrapper}>
        <label  htmlFor="target-exam" className={styles.label}>Target Exam</label>
        <Select
          id="target-exam"
          value={selectedExams}
          onChange={setSelectedExams}
          options={exams}
          isMulti
          placeholder="Select exams..."
          className={styles.examSelect}
          styles={{
            option: (provided, state: CustomState) => ({
              ...provided,
              color: 'black',
              backgroundColor: state.isFocused ? '#E39FF6' : 'white', // Purple color when focused
            }),
            multiValue: (provided) => ({
              ...provided,
              backgroundColor: 'white',
              border: '1.2px solid #D0D5DD',
              borderRadius: '8px',
              fontWeight: '500',
              marginRight: '7px',
            }),
            multiValueLabel: (provided) => ({
              ...provided,
              color: 'black',
            }),
            multiValueRemove: (provided) => ({
              ...provided,
              color: 'gray', // Color of the "x" button
              cursor: 'pointer',
              ':hover': {
                backgroundColor: '#ffffff',
                borderRadius: '8px',  // Optional: background color on hover
              },
            }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: 'white',
              
            }),
            menuList: (provided) => ({
              ...provided,
              padding: '0',
              
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
export default TargetExamUpdate;
import React, { useState } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';
import styles from './Dropdown.module.css'; // Ensure you import the CSS module

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

const exams: Option[] = [
  { value: 'BITSAT', label: 'BITSAT' },
  { value: 'JEE', label: 'JEE' },
  { value: 'SRMJEEE', label: 'SRMJEEE' },
  { value: 'COMEDK', label: 'COMEDK' },
  { value: 'KCET', label: 'KCET' },
  { value: 'VITEEE', label: 'VITEEE' },
  { value: 'MET', label: 'MET' },
];

const Dropdown = () => {
  const [selectedYear, setSelectedYear] = useState<SingleValue<Option>>(null);
  const [selectedExams, setSelectedExams] = useState<MultiValue<Option>>([]);

  return (
    <div className={styles.dropdownContainer}>
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
            }),
            multiValue: (provided) => ({
              ...provided,
              backgroundColor: 'white',
              border: '2px solid gray',
              borderRadius: '8px',
              fontWeight: '500',
            }),
            multiValueLabel: (provided) => ({
              ...provided,
              color: 'black',
              fontWeight: '500',
            }),
            multiValueRemove: (provided) => ({
              ...provided,
              color: 'gray', // Color of the "x" button
              cursor: 'pointer',
              ':hover': {
                backgroundColor: '#f0f0f0', // Optional: background color on hover
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
          }}
        />
      </div>
      <div className={styles.dropdownWrapper}>
        <label htmlFor="target-exam" className={styles.label}>Target Exam</label>
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
            singleValue: (provided) => ({
              ...provided,
              color: 'black',
            }),
            control: (provided) => ({
              ...provided,
              border: '1px solid #e6e6e6',
              borderRadius: '8px',
              padding: '4px',
              boxShadow: 'none',
            }),
            multiValue: (provided) => ({
              ...provided,
              backgroundColor: 'white',
              border: '1.2px solid #D0D5DD',
              borderRadius: '8px',
              fontWeight: '500'
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
          }}
        />
      </div>
    </div>
  );
};

export default Dropdown;

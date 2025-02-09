// Use the "use client" directive at the top of the file
"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';
import { useRouter, useSearchParams } from "next/navigation";
import { auth, db } from '../../../firebase'; // Adjust path as needed
import { getFirestore, doc, updateDoc } from "firebase/firestore"; // Import Firestore functions
import { toast } from "react-toastify";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId') || ''; // Retrieve the userId from the URL

  const [selectedYear, setSelectedYear] = useState<SingleValue<Option>>(null);
  const [selectedExams, setSelectedExams] = useState<MultiValue<Option>>([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    // Enable the button if a year and at least one exam are selected
    if (selectedYear && selectedExams.length > 0) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [selectedYear, selectedExams]);

  const handleSignUp = async () => {
    if (!userId) {
      toast.error("User ID not found. Please retry the process.");
      return;
    }

    try {
      // Store the selected year and exams in Firestore
      await updateDoc(doc(db, "users", userId), {
        targetYear: selectedYear?.value,
        targetExams: selectedExams.map(exam => exam.value),
      });

      toast.success("Data saved successfully.");
      router.push('/dashboard'); // Adjust the route as needed
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Error saving data. Please try again.");
    }
  };


  return (
    <div className="flex flex-col gap-[20px] w-full ">
      <div className=" flex flex-col gap-2">
        <label htmlFor="target-year" className=" font-medium text-sm text-[#344054]">Target Year</label>
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
      <div className="flex flex-col gap-2">
        <label htmlFor="target-exam" className=" font-medium text-sm text-[#344054]">Target Exam</label>
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
              marginTop: "4px",
              marginBottom: "4px"

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
      <div className="mt-6">
        <button
          className={` w-[375px] h-10 rounded-lg text-white font-medium text-sm 
                             ${isButtonEnabled ? 'bg-[#7400e0] hover:bg-[#6D0DCC]  cursor-pointer' : 'bg-[#d4a9fc] cursor-not-allowed'} 
                       transition-all duration-150 
                             ${isButtonEnabled ? 'hover:bg-[#6D0DCC] ' : ''}
                                active:opacity-50`}
          onClick={handleSignUp}
          disabled={!isButtonEnabled}
        >
          Sign Up
        </button>
      </div>

    </div>
  );
};

// Wrap the Dropdown component with Suspense when rendering it
const WrappedDropdown = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Dropdown />
  </Suspense>
);

export default WrappedDropdown;

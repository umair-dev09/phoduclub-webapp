"use client";

import React, { useState } from "react";
import Select from "react-select";
import './lastStep.css';

const targetExamOptions = [
  { value: 'BITSAT', label: 'BITSAT' },
  { value: 'JEE', label: 'JEE' },
  { value: 'SRMJEEE', label: 'SRMJEEE' },
  { value: 'COMEDK', label: 'COMEDK' },
  { value: 'KCET', label: 'KCET' },
  { value: 'VITEEE', label: 'VITEEE' },
  { value: 'MET', label: 'MET' }
];

export default function Home() {
  const [selectedExams, setSelectedExams] = useState([]);

  const handleExamChange = (selectedOptions) => {
    setSelectedExams(selectedOptions);
  };

  return (
    <div className="container">
      <div className="verify">
        <div className="logo">
          <p>phodu.club</p>
        </div>
        <div className="return">
          <a href="">&larr; Back</a>
        </div>
        <div className="container-2">
          <div className="heading">
            <p className="head">One Last Step</p>
          </div> 
          <div className="targetyear"><p>Target Year</p></div>
          <div className="targetyearselection">
            <select name="year" id="targetyear" className="yearselector" aria-multiline>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
          <div className="targetexam"><p>Target Exam</p></div>
          <div className="targetexamselection">
            <Select
              isMulti
              name="exams"
              options={targetExamOptions}
              className="examselector"
              classNamePrefix="select"
              value={selectedExams}
              onChange={handleExamChange}
            />
          </div>
          <div className="buttons">
            <button className="button">Sign Up</button>
          </div>
        </div>
      </div>
      <div className="quote-section">
        <div className="inv_comma"></div>
        <div className="quote">
          <p>Education is the foundation upon which we build our future.</p>
        </div>
        <div className="teller">
          <p>— Christine Gregoire</p>
        </div>
      </div>
    </div>
  );
}
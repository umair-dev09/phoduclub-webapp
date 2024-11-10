"use client";
import React from 'react';
import Image from 'next/image';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// Receving the data from CreateQuiz
interface Options {
    A: string;
    B: string;
    C: string;
    D: string;
}

interface Question {
    question: string;
    isChecked: boolean;
    isActive: boolean;
    options: Options;
    correctAnswer: string | null;
    explanation: string;
}

interface ReviewProps {
    questionsList: Question[];
}
// --------------------------------------------------------------------------------------------------------------
function Review({ questionsList }: ReviewProps) {
    return (

        <div className='flex flex-col w-full h-auto overflow-y-auto pt-5 pb-8 gap-4'>
       
        </div>
    );
};

export default Review;
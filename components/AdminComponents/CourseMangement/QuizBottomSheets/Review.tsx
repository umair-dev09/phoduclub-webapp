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
    order: number;
}

interface ReviewProps {
    questionsList: Question[];
}
// --------------------------------------------------------------------------------------------------------------
function Review({ questionsList }: ReviewProps) {
    return (
        <div className='flex flex-col w-full h-auto overflow-y-auto pt-5 pb-8 gap-4'>
            {questionsList
            .sort((a, b) => a.order - b.order)
            .map((question, index) => (
                <div key={index} className='flex flex-col bg-white p-6 rounded-xl'>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-row items-start justify-start gap-1'>
                            <h3 className='text-base font-semibold'>Q{index + 1}.</h3>
                            <div className='flex flex-col gap-4'>
                                <h3 className='text-base font-semibold'
                                    dangerouslySetInnerHTML={{
                                        __html: (question?.question || ''),
                                    }}>
                                </h3>
                            </div>
                        </div>
                        {/* <div className='flex items-start'>
                            <Image src='/icons/edit-icon.svg' alt='edit' width={18} height={18} />
                        </div> */}
                    </div>
                    {question.isChecked && (
                        <div className='flex pt-4 items-start justify-start'>
                            <Image
                                className='border border-lightGrey rounded-sm'
                                src='/images/Rectangle 2338.png'
                                alt='img'
                                width={264}
                                height={214}
                            />
                        </div>
                    )}
                    <RadioGroup className='mt-4' value={question.correctAnswer}>
                        {Object.entries(question.options).map(([key, value]) => (
                            <FormControlLabel
                                key={key}
                                value={key}
                                control={
                                    <Radio
                                        checked={question.correctAnswer === key}
                                        sx={{
                                            color: '#D0D5DD',
                                            '&.Mui-checked': {
                                                color: '#0B9055',
                                            },
                                        }}
                                    />
                                }
                                label={<h3 className='text-base font-normal'>{value}</h3>}
                            />
                        ))}
                    </RadioGroup>
                    <hr className='my-4' />
                    <div className='flex flex-row items-center gap-1'>
                        <p className='text-[#667085] text-base font-normal'>Correct Answer :</p>
                        <h3 className='text-base font-semibold text-[#1D2939]'>
                            {question.correctAnswer && `${question.correctAnswer}. ${question.options[question.correctAnswer as keyof Options]}`}
                        </h3>
                    </div>
                    {question.explanation && (
                        <p className='w-full h-auto text-left text-sm text[#1D2939] leading-[25px] font-normal italic mt-4 p-4 bg-[#F9FAFB] border border-[#F2F4F7] rounded-md'>
                            <h3 className='text-base font-semibold'
                                dangerouslySetInnerHTML={{
                                    __html: (question?.explanation || ''),
                                }}>
                            </h3>
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Review;
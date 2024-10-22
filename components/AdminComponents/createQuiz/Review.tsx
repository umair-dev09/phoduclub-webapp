import React from 'react'
import Image from 'next/image'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Publish = () => {
    return (
        <div className='flex flex-col w-full h-auto overflow-y-auto pt-5 pb-8 gap-4'>
            <div className='flex flex-col bg-white p-6 rounded-xl'>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-row items-start justify-start gap-1'>
                        <h3 className='text-base font-semibold'>Q4.</h3>
                        <h3 className='text-base font-semibold'> What is the result of the bitwise AND operation between 1010 and 1100?</h3>
                    </div>
                    <div className='flex items-start'>
                        <Image src='/icons/edit-icon.svg' alt='edit' width={18} height={18} />
                    </div>
                </div>
                <RadioGroup className='mt-4'>
                    <FormControlLabel
                        value="option1"
                        control={
                            <Radio
                                sx={{
                                    color: '#D0D5DD',
                                    '&.Mui-checked': {
                                        color: '#0B9055',
                                    },
                                }}
                            />
                        }
                        label={<h3 className='text-base font-normal'>1000</h3>}
                    />
                    <FormControlLabel
                        value="option2"
                        control={
                            <Radio
                                sx={{
                                    color: '#D0D5DD',
                                    '&.Mui-checked': {
                                        color: '#0B9055',
                                    },
                                }}
                            />
                        }
                        label={<h3 className='text-base font-normal'>1010</h3>}
                    />
                    <FormControlLabel
                        value="option4"
                        control={
                            <Radio
                                sx={{
                                    color: '#D0D5DD',
                                    '&.Mui-checked': {
                                        color: '#0B9055',
                                    },
                                }}
                            />
                        }
                        label={<h3 className='text-base font-normal'>1100</h3>}
                    />
                    <FormControlLabel
                        value="option3"
                        control={
                            <Radio
                                sx={{
                                    color: '#D0D5DD',
                                    '&.Mui-checked': {
                                        color: '#0B9055',
                                    },
                                }}
                            />
                        }
                        label={<h3 className='text-base font-normal'>0000</h3>}
                    />
                </RadioGroup>
                <hr className='my-4' />
                <div className='flex flex-row items-center gap-1'>
                    <p className='text-[#667085] text-base font-normal'>Correct Answer :</p>
                    <h3 className='text-base font-semibold text-[#1D2939]'>A. 1000</h3>
                </div>
                <p className='w-full h-auto text-left text-sm text[#1D2939] leading-[25px] font-normal italic mt-4 p-4 bg-[#F9FAFB] border border-[#F2F4F7] rounded-md'>
                    The bitwise AND operation compares each corresponding bit of two binary numbers and returns a new binary number where each bit is 1 if both corresponding bits are 1, and 0 otherwise.
                </p>
            </div>
            <div className='flex flex-col bg-white p-6 rounded-xl'>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-row items-start justify-start gap-1'>
                        <h3 className='text-base font-semibold'>Q4.</h3>
                        <h3 className='text-base font-semibold'> What is the result of the bitwise AND operation between 1010 and 1100?</h3>
                    </div>
                    <div className='flex items-start'>
                        <Image src='/icons/edit-icon.svg' alt='edit' width={18} height={18} />
                    </div>
                </div>
                <RadioGroup className='mt-4'>
                    <FormControlLabel
                        value="option1"
                        control={
                            <Radio
                                sx={{
                                    color: '#D0D5DD',
                                    '&.Mui-checked': {
                                        color: '#0B9055',
                                    },
                                }}
                            />
                        }
                        label={<h3 className='text-base font-normal'>1000</h3>}
                    />
                    <FormControlLabel
                        value="option2"
                        control={
                            <Radio
                                sx={{
                                    color: '#D0D5DD',
                                    '&.Mui-checked': {
                                        color: '#0B9055',
                                    },
                                }}
                            />
                        }
                        label={<h3 className='text-base font-normal'>1010</h3>}
                    />
                    <FormControlLabel
                        value="option4"
                        control={
                            <Radio
                                sx={{
                                    color: '#D0D5DD',
                                    '&.Mui-checked': {
                                        color: '#0B9055',
                                    },
                                }}
                            />
                        }
                        label={<h3 className='text-base font-normal'>1100</h3>}
                    />
                    <FormControlLabel
                        value="option3"
                        control={
                            <Radio
                                sx={{
                                    color: '#D0D5DD',
                                    '&.Mui-checked': {
                                        color: '#0B9055',
                                    },
                                }}
                            />
                        }
                        label={<h3 className='text-base font-normal'>0000</h3>}
                    />
                </RadioGroup>
                <hr className='my-4' />
                <div className='flex flex-row items-center gap-1'>
                    <p className='text-[#667085] text-base font-normal'>Correct Answer :</p>
                    <h3 className='text-base font-semibold text-[#1D2939]'>A. 1000</h3>
                </div>
                <p className='w-full h-auto text-left text-sm text[#1D2939] leading-[25px] font-normal italic mt-4 p-4 bg-[#F9FAFB] border border-[#F2F4F7] rounded-md'>
                    The bitwise AND operation compares each corresponding bit of two binary numbers and returns a new binary number where each bit is 1 if both corresponding bits are 1, and 0 otherwise.
                </p>
            </div>
            <div className='flex flex-col bg-white p-6 rounded-xl'>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-row items-start justify-start gap-1'>
                        <h3 className='text-base font-semibold'>Q4.</h3>
                        <h3 className='text-base font-semibold'> What is the result of the bitwise AND operation between 1010 and 1100?</h3>
                    </div>
                    <div className='flex items-start'>
                        <Image src='/icons/edit-icon.svg' alt='edit' width={18} height={18} />
                    </div>
                </div>
                <RadioGroup className='mt-4'>
                    <FormControlLabel
                        value="option1"
                        control={
                            <Radio
                                sx={{
                                    color: '#D0D5DD',
                                    '&.Mui-checked': {
                                        color: '#0B9055',
                                    },
                                }}
                            />
                        }
                        label={<h3 className='text-base font-normal'>1000</h3>}
                    />
                    <FormControlLabel
                        value="option2"
                        control={
                            <Radio
                                sx={{
                                    color: '#D0D5DD',
                                    '&.Mui-checked': {
                                        color: '#0B9055',
                                    },
                                }}
                            />
                        }
                        label={<h3 className='text-base font-normal'>1010</h3>}
                    />
                    <FormControlLabel
                        value="option4"
                        control={
                            <Radio
                                sx={{
                                    color: '#D0D5DD',
                                    '&.Mui-checked': {
                                        color: '#0B9055',
                                    },
                                }}
                            />
                        }
                        label={<h3 className='text-base font-normal'>1100</h3>}
                    />
                    <FormControlLabel
                        value="option3"
                        control={
                            <Radio
                                sx={{
                                    color: '#D0D5DD',
                                    '&.Mui-checked': {
                                        color: '#0B9055',
                                    },
                                }}
                            />
                        }
                        label={<h3 className='text-base font-normal'>0000</h3>}
                    />
                </RadioGroup>
                <hr className='my-4' />
                <div className='flex flex-row items-center gap-1'>
                    <p className='text-[#667085] text-base font-normal'>Correct Answer :</p>
                    <h3 className='text-base font-semibold text-[#1D2939]'>A. 1000</h3>
                </div>
                <p className='w-full h-auto text-left text-sm text[#1D2939] leading-[25px] font-normal italic mt-4 p-4 bg-[#F9FAFB] border border-[#F2F4F7] rounded-md'>
                    The bitwise AND operation compares each corresponding bit of two binary numbers and returns a new binary number where each bit is 1 if both corresponding bits are 1, and 0 otherwise.
                </p>
            </div>
        </div>
    )
}

export default Publish
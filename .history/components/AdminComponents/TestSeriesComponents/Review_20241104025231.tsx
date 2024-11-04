import React, { useState } from 'react';
import Image from "next/image";
import TestSeriesStartQuiz from '../TestseriesDialogs/TestSeriesStartQuiz';

function Review() {
    const [showDetails, setShowDetails] = useState(false);
    const [isResumeQuizOpen, setIsResumeQuizOpen] = useState(false);

    const openResumeQuiz = () => setIsResumeQuizOpen(true);
    const closeResumeQuiz = () => setIsResumeQuizOpen(false);
    // this logic is for rating 
    interface StarIconProps {
        filled: boolean;
        isHalf: boolean;
    }
    const StarIcon: React.FC<StarIconProps> = ({ filled, isHalf }) => (
        <Image
            src={filled ? (isHalf ? "/icons/half-star.svg" : "/icons/full-star.svg") : "/icons/empty-star.svg"}
            width={20}
            height={20}
            alt={isHalf ? "half star" : filled ? "full star" : "empty star"}
        />
    );
    const rating = 1.5; // The rating value
    const totalStars = 5;
    // ----------------------------------------------------------------------------------------

    return (
        <div>
            {!showDetails ? (
                <div className='flex flex-1 flex-col ml-1 overflow-y-auto'>
                    <div className='flex flex-row gap-3 mt-6 mb-4'>
                        <h2 className='text-base font-bold text-[#1D2939]'>About Test Series</h2>
                        <button>
                            <Image src='/icons/edit-icon.svg' alt='edit' width={14} height={14} />
                        </button>
                    </div>
                    {/* <div className='flex flex-row gap-4 h-auto'>
                        <Image className='w-[19.375rem] h-[12.25rem]' src='/images/Frame.png' alt='course img' width={310} height={196} />
                        <div className='flex flex-col w-full h-auto p-6 rounded-2xl bg-white border border-lightGrey'>
                            <span className='text-base font-bold text-[#1D2939]'>Phodu JEE Mains Test Series 2025</span>
                            <div className='flex flex-row'>
                                <p className='text-sm text-[#667085] mt-2 font-normal'>
                                    The BITSET Full Course is designed to provide students with an in-depth understanding of bit manipulation techniques and the use of bitsets in data structures.
                                </p>
                            </div>
                        
                            <div className="flex items-center gap-2 flex-row h-[24px] ">
                                <div className="flex items-center">
                                    {[...Array(Math.floor(rating))].map((_, index) => (
                                        <StarIcon key={`filled-${index}`} filled={true} isHalf={false} />
                                    ))}
                                    {rating % 1 >= 0.5 && <StarIcon filled={true} isHalf={true} />}
                                    {[...Array(totalStars - Math.ceil(rating))].map((_, index) => (
                                        <StarIcon key={`empty-${index}`} filled={false} isHalf={false} />
                                    ))}
                                </div>
                                <div className="text-[#1D2939] text-sm font-bold flex items-center flex-row">
                                    {rating.toFixed(1)}
                                    <span className="text-[#1D2939] font-normal text-sm ml-1">
                                        <span className="flex items-center">
                                            <span className="inline-block">({`500+`}</span>
                                            <span className="inline-block">Ratings)</span>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className='flex flex-row items-center justify-between'>
                                <div className='flex flex-row items-center gap-2'>
                                    <p className='text-xl text-[#1D2939] font-semibold'>&#8377;3,990</p>
                                    <p className='text-base text-[#667085] font-normal'><s>&#8377;7,499</s></p>
                                    <p className='h-fit px-3 py-0.5 text-white text-xs font-semibold bg-[#DB6704] rounded-full'>86% off</p>
                                </div>
                                <button className='w-[11.375rem] h-[2.75rem] text-white text-sm font-normal bg-[#9012FF] border-[#800EE2] rounded-md shadow-inner-button'>
                                    Buy Course
                                </button>
                            </div>
                        </div>
                    </div> */}




                    {/* Course content */}
                    <div className=" flex flex-row  gap-6 h-auto">
                        <Image
                            src="/icons/image.png"
                            width={437}
                            height={271}
                            alt="left-arrow" />
                        <div className="flex flex-col gap-4 w-full bg-[#FFFFFF] p-6 border border-solid border-[#EAECF0] rounded-[16px] ">
                            <span className="text-[#1D2939] font-bold text-lg">BITSET Full Course</span>
                            <div className=' text-[#667085] text-sm font-normal '>
                                <p>The BITSET Full Course is designed to provide students with an in-depth understanding of bit manipulation techniques and the use of bitsets in data structures.</p>
                            </div>
                            {/* this code below is for rating  */}
                            <div className="flex items-center gap-2 flex-row h-[24px] ">
                                <div className="flex items-center">
                                    {[...Array(Math.floor(rating))].map((_, index) => (
                                        <StarIcon key={`filled-${index}`} filled={true} isHalf={false} />
                                    ))}
                                    {rating % 1 >= 0.5 && <StarIcon filled={true} isHalf={true} />}
                                    {[...Array(totalStars - Math.ceil(rating))].map((_, index) => (
                                        <StarIcon key={`empty-${index}`} filled={false} isHalf={false} />
                                    ))}
                                </div>
                                <div className="text-[#1D2939] text-sm font-bold flex items-center flex-row">
                                    {rating.toFixed(1)}
                                    <span className="text-[#1D2939] font-normal text-sm ml-1">
                                        <span className="flex items-center">
                                            <span className="inline-block">({`500+`}</span>
                                            <span className="inline-block">Ratings)</span>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row  items-center justify-between ">
                                <div className='flex flex-row items-center gap-2'>
                                    <div className="text-[#1D2939] text-2xl font-bold">
                                        ₹ 3,990
                                    </div>
                                    <div className="text-[#667085] text-base font-normal line-through">
                                        ₹ 7,499
                                    </div>
                                    <div className="bg-[#DB6704] w-[76px] h-[25px] flex items-center justify-center rounded-full text-white text-xs font-semibold">
                                        86% off
                                    </div>

                                </div>
                                <button className='w-[11.375rem] h-[2.75rem] text-white text-sm font-normal bg-[#9012FF] border-[#800EE2] rounded-md shadow-inner-button'>
                                    Buy Course
                                </button>
                            </div>
                        </div>
                    </div>




                    <div className='flex flex-row w-full my-6 gap-2'>
                        <div className='flex flex-col items-start w-full p-4 gap-1 bg-white border border-lightGrey rounded-xl'>
                            <p className='text-sm text-[#667085] font-normal'>Test Series starts</p>
                            <p className='text-base text-[#1D2939] font-medium'>-</p>
                        </div>
                        <div className='flex flex-col items-start w-full p-4 gap-1 bg-white border border-lightGrey rounded-xl'>
                            <p className='text-sm text-[#667085] font-normal'>Test Series ends</p>
                            <p className='text-base text-[#1D2939] font-medium'>-</p>
                        </div>
                        <div className='flex flex-col items-start w-full p-4 gap-1 bg-white border border-lightGrey rounded-xl'>
                            <p className='text-sm text-[#667085] font-normal'>Test Series starts</p>
                            <p className='text-base text-[#1D2939] font-medium'>95</p>
                        </div>
                    </div>
                    <div className='flex flex-col mb-4 gap-2'>
                        <div className='flex flex-row gap-2'>
                            <h2 className='text-base text-[#1D2939] font-bold'>Total Questions</h2>
                            <button>
                                <Image src='/icons/edit-icon.svg' alt='edit' width={14} height={14} />
                            </button>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <Image src='/icons/idea-01.svg' alt='tests' width={20} height={20} />
                            <p className='text-base text-[#1D2939] font-normal'>18 Tests</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 mb-8'>
                        <button className='flex flex-row items-center justify-between px-6 py-4 bg-white border border-lightGrey rounded-xl'
                            onClick={() => setShowDetails(true)}>
                            <div className='flex flex-col gap-1'>
                                <p className='text-left text-base text-[#1D2939] font-semibold'>Physics</p>
                                <p className='text-left text-sm text-[#667085] font-normal'>5 Tests</p>
                            </div>
                            <div>
                                <Image src='/icons/collapse-right-02.svg' alt='open this test series' width={24} height={24} />
                            </div>
                        </button>
                        <button className='flex flex-row items-center justify-between px-6 py-4 bg-white border border-lightGrey rounded-xl'
                            onClick={openResumeQuiz}>
                            <div className='flex flex-col gap-1'>
                                <p className='text-left text-base text-[#1D2939] font-semibold'>Physics</p>
                                <p className='text-left text-sm text-[#667085] font-normal'>15 Questions</p>
                            </div>
                            <div>
                                <Image src='/icons/collapse-right-02.svg' alt='open this test series' width={24} height={24} />
                            </div>
                        </button>
                    </div>
                </div>
            ) : (
                <div className='w-full ml-1'>
                    <div className='flex flex-row mt-4 gap-2'>
                        <button onClick={() => setShowDetails(false)}>
                            <p className='text-base text-[#667085] font-medium'>Phodu JEE Mains Test Series 2025</p>
                        </button>
                        <Image src='/icons/collapse-right-02.svg' alt='' width={24} height={24} />
                        <p className='text-base text-[#1D2939] font-semibold'>Physics</p>
                    </div>
                    <div className='flex flex-row mt-6 gap-2'>
                        <h3>Physics</h3>
                        <button>
                            <Image src='/icons/edit-icon.svg' alt='edit' width={14} height={14} />
                        </button>
                    </div>
                    <div className='flex flex-row w-full mt-4 p-4 bg-white border border-lightGrey rounded-xl'>
                        <div className='flex flex-col justify-between w-[18%]'>
                            <p className='text-sm text-[#667085] font-normal'>Attempted Questions</p>
                            <h4 className='text-[0.938rem] text-[#1D2939] font-semibold'>-</h4>
                        </div>
                        <div className='flex flex-col justify-between w-[18%] pl-2 border-l border-lightGrey'>
                            <p className='text-sm text-[#667085] font-normal'>Score</p>
                            <h4 className='text-[0.938rem] text-[#1D2939] font-semibold'>-</h4>
                        </div>
                        <div className='flex flex-col justify-between w-[18%] pl-2 border-l border-lightGrey'>
                            <p className='text-sm text-[#667085] font-normal'>Accuracy</p>
                            <h4 className='text-[0.938rem] text-[#1D2939] font-semibold'>-</h4>
                        </div>
                        <div className='flex flex-col justify-between w-[18%] pl-2 border-l border-lightGrey'>
                            <p className='text-sm text-[#667085] font-normal'>Answered Correct</p>
                            <h4 className='text-[0.938rem] text-[#1D2939] font-semibold'>-</h4>
                        </div>
                        <div className='flex flex-col justify-between w-[18%] pl-2 border-l border-lightGrey'>
                            <p className='text-sm text-[#667085] font-normal'>Answered Incorrect</p>
                            <h4 className='text-[0.938rem] text-[#1D2939] font-semibold'>-</h4>
                        </div>
                        <div className='flex flex-col justify-between w-[10%] pl-2 border-l border-lightGrey'>
                            <p className='text-sm text-[#667085] font-normal'>Time taken</p>
                            <h4 className='text-[0.938rem] text-[#1D2939] font-semibold'>-</h4>
                        </div>
                    </div>
                    <h2 className='mt-4 text-lg text-[#1D2939] font-bold'>Tests</h2>
                    <div className='flex flex-col mt-4 mb-8 gap-2'>
                        <div className='flex flex-row items-center justify-between px-6 py-4 bg-white border border-lightGrey rounded-xl'>
                            <div className='flex flex-col gap-1'>
                                <p className='text-left text-base text-[#1D2939] font-semibold'>Test 01</p>
                                <p className='text-left text-sm text-[#667085] font-normal'>40 Questions</p>
                            </div>
                            <button className='w-[7.25rem] h-9 px-[0.875rem] py-[0.625rem] text-white text-xs font-semibold bg-[#9012FF] border border-[#800EE2] rounded-[6px] shadow-inner-button'>Start Test</button>
                        </div>
                        <div className='flex flex-row items-center justify-between px-6 py-4 bg-white border border-lightGrey rounded-xl'>
                            <div className='flex flex-col gap-1'>
                                <p className='text-left text-base text-[#1D2939] font-semibold'>Test 01</p>
                                <p className='text-left text-sm text-[#667085] font-normal'>40 Questions</p>
                            </div>
                            <button className='w-[7.25rem] h-9 px-[0.875rem] py-[0.625rem] text-white text-xs font-semibold bg-[#9012FF] border border-[#800EE2] rounded-[6px] shadow-inner-button'>Start Test</button>
                        </div>
                        <div className='flex flex-row items-center justify-between px-6 py-4 bg-white border border-lightGrey rounded-xl'>
                            <div className='flex flex-col gap-1'>
                                <p className='text-left text-base text-[#1D2939] font-semibold'>Test 01</p>
                                <p className='text-left text-sm text-[#667085] font-normal'>40 Questions</p>
                            </div>
                            <button className='w-[7.25rem] h-9 px-[0.875rem] py-[0.625rem] text-white text-xs font-semibold bg-[#9012FF] border border-[#800EE2] rounded-[6px] shadow-inner-button'>Start Test</button>
                        </div>
                        <div className='flex flex-row items-center justify-between px-6 py-4 bg-white border border-lightGrey rounded-xl'>
                            <div className='flex flex-col gap-1'>
                                <p className='text-left text-base text-[#1D2939] font-semibold'>Test 01</p>
                                <p className='text-left text-sm text-[#667085] font-normal'>40 Questions</p>
                            </div>
                            <button className='w-[7.25rem] h-9 px-[0.875rem] py-[0.625rem] text-white text-xs font-semibold bg-[#9012FF] border border-[#800EE2] rounded-[6px] shadow-inner-button'>Start Test</button>
                        </div>
                        <div className='flex flex-row items-center justify-between px-6 py-4 bg-white border border-lightGrey rounded-xl'>
                            <div className='flex flex-col gap-1'>
                                <p className='text-left text-base text-[#1D2939] font-semibold'>Test 01</p>
                                <p className='text-left text-sm text-[#667085] font-normal'>40 Questions</p>
                            </div>
                            <button className='w-[7.25rem] h-9 px-[0.875rem] py-[0.625rem] text-white text-xs font-semibold bg-[#9012FF] border border-[#800EE2] rounded-[6px] shadow-inner-button'>Start Test</button>
                        </div>
                    </div>
                </div>
            )}
            {isResumeQuizOpen && < TestSeriesStartQuiz onClose={closeResumeQuiz} open={true} />}
        </div>
    );
}

export default Review;

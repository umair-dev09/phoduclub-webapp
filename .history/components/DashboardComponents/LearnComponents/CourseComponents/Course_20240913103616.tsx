
import '../Learn';
import Image from 'next/image';
import TopicsComp from './TopicsComp';
import { useState } from 'react';



function Course() {

    const [isOpen, setIsOpen] = useState(true);


    return (
        <div className='flex flex-col flex-1 px-8 overflow-auto'>
            <div className="my-5 flex items-center">
                <button className='flex items-center ml-1'>
                    <div
                        className="text-[#1D2939] h-[24px] w-auto"
                        style={{ fontSize: "16px", fontWeight: "600" }}
                    >
                        Courses
                    </div>
                    <div className="ml-3 w-[24px]">
                        <Image
                            src="/icons/course-left.svg"
                            width={6}
                            height={12}
                            alt="left-arrow"
                        />
                    </div>
                </button>

                <div
                    className="text-[#667085] h-full w-auto -ml-1"
                    style={{ fontSize: "16px", fontWeight: "500" }}
                >
                    BITSET Full Course
                </div>
            </div>

            {/* course buying */}
            <div className="h-[271px] flex items-center gap-4">
                <div>
                    <Image
                        src="/icons/image.png"
                        width={437}
                        height={271}
                        alt="left-arrow"
                    />
                </div>
                <div className="flex flex-col flex-1 h-full bg-[#FFFFFF] border border-lightGrey rounded-xl">
                    <div className="flex flex-1 flex-col h-full p-4 ">
                        <div className='text-[#1D2939] mt-2 ml-2'>
                            <h3>BITSET Full Course</h3>
                        </div>

                        <div className='mt=4 text-[#667085] text-sm font-normal mt-2 ml-2'>
                            <p>The BITSET Full Course is designed to provide students with an in-depth understanding of bit manipulation techniques and the use of bitsets in data structures.</p>
                        </div>
                    </div>
                    {/* Rating Section */}
                    <div className="flex items-center mt-2 ml-2 ">
                        {/* Star Icons */}
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-[#F79009]"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M9.049 2.927a1 1 0 011.902 0l1.518 4.674a1 1 0 00.95.69h4.901a1 1 0 01.592 1.809l-3.97 2.888a1 1 0 00-.364 1.118l1.518 4.674a1 1 0 01-1.539 1.118L10 15.348l-3.971 2.888a1 1 0 01-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.888A1 1 0 012.68 8.291h4.901a1 1 0 00.95-.69l1.518-4.674z" />
                                </svg>
                            ))}
                        </div>

                        {/* Rating and Reviews */}
                        <div className="text-[#1D2939] text-sm font-bold ml-2">
                            4.7 <span className="text-[#1D2939] font-normal">(500+ Ratings)</span>
                        </div>
                    </div>

                    {/* Price Section */}
                    <div className='flex items-center justify-between h-full'>
                        <div className='flex items-center ml-4 mb-7'>
                            <div className="text-[#1D2939] text-base font-bold mr-3">
                                ₹ 3,990
                            </div>
                            <div className="text-[#667085] text-sm font-normal line-through mr-3">
                                ₹ 7,499
                            </div>
                            <span
                                className="bg-[#DB6704] text-[#FFFFFF]  font-semibold  mr-3"
                                style={{

                                    padding: '2px 12px,2px,12px', // Custom padding
                                    borderRadius: '130px ',
                                    fontSize: '14px',


                                }}
                            >
                                86% off
                            </span>

                        </div>

                        {/* Buy Course Button */}
                        <div className='self-end mb-7 mr-4'>
                            <button
                                className="text-white text-sm font-semibold py-3 px-6 rounded-tl-md shadow-md"
                                style={{
                                    width: "182px",
                                    height: "44px",
                                    borderRadius: "8px 8px 8px 8px",
                                    borderWidth: "1px 0px 0px 0px",
                                    backgroundColor: "#9012FF",
                                    opacity: "1",
                                }}
                            >
                                Buy Course
                            </button>
                        </div>
                    </div>


                </div>
            </div>

            {/* ------------------------------------------------------------------------------------------------------------------------------------------> */}

            <div className='flex flex-col'>
                <div className='ml-2'>
                    <div className='mt-4 text-[#1D2939]'>
                        <h3>Course content</h3>
                    </div>
                    <div className='flex flex-row mt-3 text-xs'>
                        <div className='flex flex-row'>
                            <div className='mr-2'>
                                <Image
                                    src="/icons/course-learn.svg"
                                    alt="learn-icon"
                                    width={20}
                                    height={20} />

                            </div>
                            <div className='mr-3 font-normal text-sm text-[#1D2939]'>3 Lessons</div>
                        </div>
                        <div className='flex flex-row'>
                            <div className='mr-2'>
                                <Image
                                    src="/icons/vedio.svg"
                                    alt="vedio-icon"
                                    width={20}
                                    height={20} />
                            </div>
                            <div className='mr-3 font-normal text-sm text-[#1D2939]'>4 Videos</div>
                        </div>
                        <div className='flex flex-row'>
                            <div className='mr-2'>
                                <Image
                                    src="/icons/test.svg"
                                    alt="test-icon"
                                    width={20}
                                    height={20} />
                            </div>
                            <div className='mr-3 font-normal text-sm text-[#1D2939]'>2 Tests</div>
                        </div>
                    </div>

                </div>

                {/* Lesson section with dropdown */}
                <div className='flex flex-col bg-white border border-lightGrey rounded-xl mt-4'>
                    <div className='flex items-center justify-between h-[56px] mx-5 relative'>
                        <div className='test-base font-bold'>
                            <p>Lesson 1: Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>

                        <div className="relative flex flex-col items-center">
                            {/* Dropdown toggle button */}
                            <button onClick={() => setIsOpen((prev) => !prev)} className="p-2">
                                <Image
                                    src={isOpen ? '/icons/dropDownClose.svg' : '/icons/dropDownOpen.svg'}  // Toggle icons based on state
                                    alt={isOpen ? 'Up icon' : 'Dropdown open icon'}  // Descriptive alt text
                                    width={24}
                                    height={24}
                                />
                            </button>
                            {isOpen && (
                                <div>
                                    <TopicsComp />
                                </div>
                            )}
                        </div>
                    </div>
                    <div><hr /></div>
                    <div>
                        <TopicsComp />
                    </div>
                </div>
                <div className='flex flex-col bg-white border border-lightGrey rounded-xl mt-4'>
                    <div className='flex items-center justify-between h-[56px] mx-5 relative'>
                        <div className='test-base font-bold'>
                            <p>Lesson 1: Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>

                    </div>
                    <div><hr /></div>
                    <div className="relative flex flex-col items-center">
                        {/* Dropdown toggle button */}
                        <button onClick={() => setIsOpen((prev) => !prev)} className="p-2">
                            <Image
                                src={isOpen ? '/icons/dropDownClose.svg' : '/icons/dropDownOpen.svg'}  // Toggle icons based on state
                                alt={isOpen ? 'Up icon' : 'Dropdown open icon'}  // Descriptive alt text
                                width={24}
                                height={24}
                            />
                        </button>
                        {isOpen && (
                            <div>
                                <TopicsComp />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Course;

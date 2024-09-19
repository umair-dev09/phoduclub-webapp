import { useState } from 'react';
import '../Learn';
import Image from 'next/image';
import TopicsComp from './TopicsComp';

function Course() {
    // State to manage dropdown open/close
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Function to toggle dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

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

            {/* Course buying */}
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

                        <div className='text-[#667085] text-sm font-normal mt-2 ml-2'>
                            <p>The BITSET Full Course is designed to provide students with an in-depth understanding of bit manipulation techniques and the use of bitsets in data structures.</p>
                        </div>
                    </div>
                    <div>
                        rating
                    </div>
                    <div>
                        buy
                    </div>
                </div>
            </div>

            {/* Course content */}
            <div className='flex flex-col mx-8'>
                <div>
                    <h3>Course content</h3>
                </div>
                <div className='flex flex-row mt-3 text-xs'>
                    <div className='flex flex-row'>
                        <div className='mr-2'>O</div>
                        <div className='mr-3'>3 Lessons</div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='mr-2'>O</div>
                        <div className='mr-3'>4 Videos</div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='mr-2'>O</div>
                        <div className='mr-3'>2 Tests</div>
                    </div>
                </div>

                {/* Lesson section with dropdown */}
                <div className='flex flex-col bg-white border border-lightGrey rounded-xl mt-4'>
                    <div className='flex items-center justify-between h-[56px] mx-5'>
                        <div className='test-base font-semibold'>
                            <p>Lesson 1: Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        <div className='flex items-center relative'>
                            {/* Dropdown toggle buttons */}
                            {isDropdownOpen ? (
                                <button onClick={toggleDropdown} className='absolute right-4'>
                                    <Image src='/icons/dropDownclose.svg' alt='Close dropdown' width={24} height={24} />
                                </button>
                            ) : (
                                <button onClick={toggleDropdown} className='absolute right-4'>
                                    <Image src='/icons/dropDownopen.svg' alt='Open dropdown' width={24} height={24} />
                                </button>
                            )}
                        </div>
                    </div>
                    <div><hr /></div>

                    {/* TopicsComp will be shown or hidden based on the dropdown state */}
                    {isDropdownOpen && (
                        <div>
                            <TopicsComp />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Course;

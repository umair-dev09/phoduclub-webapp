"use client";

import Image from 'next/image';
import CoursesComp from '@/components/DashboardComponents/HomeComponents/Course/courseComp/coursesComp';

function Course() {
    return (
        <div className="flex flex-1">
            <div className="hidden flex-1 items-center justify-evenly">
                <div className="flex flex-col items-center justify-center flex-0.5 rounded-lg relative overflow-hidden transition-transform duration-300 ease-in-out m-6 ml-0">
                    <div>
                        <div className="flex items-center absolute top-3 left-5 bg-white bg-opacity-80 text-xs font-medium border border-white rounded-full px-3 py-1 z-10 transition-transform duration-300">
                            <Image
                                className="mr-1"
                                src="/icons/suggestion_icon.svg"
                                alt="suggestion icon"
                                width={16}
                                height={16}
                            />
                            <p>Suggested for you</p>
                        </div>
                        <div>
                            <Image
                                className="w-[239px] h-[160px]"
                                src="/images/course_img.svg"
                                alt="course image"
                                width={239}
                                height={160}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full border border-gray-200 border-t-0 rounded-b-lg">
                        <div className="mt-4">
                            <div className="text-lg font-semibold leading-6 ml-4">
                                <p>BITSET Full Course</p>
                            </div>
                            <div className="text-sm font-normal leading-[18px] text-gray-500 flex items-center gap-1 ml-4">
                                <p>3 Lessons</p>&#x2022;<p>3hr 14m</p>
                            </div>
                        </div>
                        <div className="flex justify-between mt-2 mb-4 mx-4 text-lg font-semibold">
                            <div className="flex items-end">
                                <h4>&#8377; 2400</h4>
                            </div>
                            <div>
                                <button className="text-xs font-semibold px-3 py-2 border-2 border-purple-600 text-purple-600 rounded-md">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Duplicate Course */}
                <div className="flex flex-col items-center justify-center flex-0.5 rounded-lg relative overflow-hidden transition-transform duration-300 ease-in-out m-6 mr-0">
                    <div>
                        <div className="flex items-center absolute top-3 left-5 bg-white bg-opacity-80 text-xs font-medium border border-white rounded-full px-3 py-1 z-10 transition-transform duration-300">
                            <Image
                                className="mr-1"
                                src="/icons/suggestion_icon.svg"
                                alt="suggestion icon"
                                width={16}
                                height={16}
                            />
                            <p>Suggested for you</p>
                        </div>
                        <div>
                            <Image
                                className="w-[239px] h-[160px]"
                                src="/images/course_img.svg"
                                alt="course image"
                                width={239}
                                height={160}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full border border-gray-200 border-t-0 rounded-b-lg">
                        <div className="mt-4">
                            <div className="text-lg font-semibold leading-6 ml-4">
                                <p>BITSET Full Course</p>
                            </div>
                            <div className="text-sm font-normal leading-[18px] text-gray-500 flex items-center gap-1 ml-4">
                                <p>3 Lessons</p>&#x2022;<p>3hr 14m</p>
                            </div>
                        </div>
                        <div className="flex justify-between mt-2 mb-4 mx-4 text-lg font-semibold">
                            <div className="flex items-end">
                                <h4>&#8377; 2400</h4>
                            </div>
                            <div>
                                <button className="text-xs font-semibold px-3 py-2 border-2 border-purple-600 text-purple-600 rounded-md">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col flex-1 items-start">
                <CoursesComp />
            </div>
        </div>
    );
}

export default Course;
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

function Main() {
    const [activeTab, setActiveTab] = useState<string>('');
    const router = useRouter();
    const pathname = usePathname();
    const handleTabClick = (tabName: string, path: string) => {

        setActiveTab(tabName);
        router.push(path);
    };
    useEffect(() => {
        if (pathname) {
            const currentPath = pathname.split('/')[3];
            if (currentPath === 'bit2') {
                setActiveTab('bit2');
            }
        }
    }, [pathname]);

    return (
        <div className="flex flex-1 flex-row">

            {/* ----------- Course Component ----------- */}
            {/* Main course container with flex layout and specified dimensions */}
            <button
                onClick={() => handleTabClick('bit2', '/learn/course/bit2')}
            >
                <div className="flex items-center justify-center flex-col rounded-lg relative overflow-hidden transition-transform duration-300 ease-in-out w-[22.333rem] h-[340px] mr-4">

                    {/* Course image and suggestion label container */}
                    <div className="flex flex-1 h-[60%] items-center flex-col">

                        {/* Suggestion label positioned absolutely within the container */}
                        <div className="flex items-center absolute top-3 left-5 mr-5 bg-white bg-opacity-80 text-xs font-medium border border-white rounded-full py-1 px-3 z-10 transition-transform duration-300 ease-in-out">
                            <Image
                                className="mr-[5px]"
                                src="/icons/suggestion_icon.svg"
                                alt="suggestion icon"
                                width={16}
                                height={16}
                            />
                            <p>Suggested for you</p>
                        </div>

                        {/* Course image */}
                        <div>
                            <img src="/images/course_img.svg" alt="Course" width={300} height={300} />
                        </div>
                    </div>

                    {/* Course details container */}
                    <div className="flex w-full h-full max-h-[9.625rem] flex-col bg-white border border-[#EAECF0] border-t-0 rounded-br-lg rounded-bl-lg px-6">

                        {/* Course title and details (lessons, duration) */}
                        <div className="flex h-[60%] items-center flex-col">

                            {/* Course name with a collapse icon */}
                            <div className="flex flex-1 text-lg font-semibold leading-6 w-full items-end justify-between mt-5">
                                <div>
                                    <p>BITSET Full Course</p>
                                </div>
                                <div>
                                    <Image alt="Collapse Icon Right" src="/icons/collapse-right.svg" width={8} height={8} />
                                </div>
                            </div>

                            {/* Course details - number of lessons and total duration */}
                            <div className="flex flex-1 text-xs font-normal leading-4 text-[#667085] gap-1 items-start w-full justify-start mt-1.5">
                                <p>3 Lessons</p>
                                <span>&#x2022;</span> {/* Bullet point separator */}
                                <p>3hr 14m</p>
                            </div>
                        </div>

                        {/* Progress bar and additional course info (completion, time left) */}
                        <div className="flex h-[40%] flex-col">

                            {/* Progress bar */}
                            <div className="flex relative w-full h-2 rounded-full bg-gray-200 mb-1">
                                <div
                                    className="absolute top-0 left-0 h-2 rounded-full bg-progressPurple"
                                    style={{ width: "43%" }}  // 43% progress is shown
                                ></div>
                            </div>

                            {/* Course status - completed percentage and time left */}
                            <div className="flex flex-1 flex-row justify-between mt-2 text-xs">
                                <div className="flex flex-row gap-1">Completed: <span className="font-semibold">43%</span></div>
                                <div className="flex flex-row gap-1">Time Left: <span className="font-semibold">28 days left</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </button>
            {/* End of course component */}

            {/* ----------- Course Component ----------- */}
            {/* Main course container with flex layout and specified dimensions */}
            <div className="flex items-center justify-center flex-col rounded-lg relative overflow-hidden transition-transform duration-300 ease-in-out w-[22.333rem] h-[340px] mr-4">

                {/* Course image and suggestion label container */}
                <div className="flex flex-1 h-[60%] items-center flex-col">

                    {/* Suggestion label positioned absolutely within the container */}
                    <div className="flex items-center absolute top-3 left-5 mr-5 bg-white bg-opacity-80 text-xs font-medium border border-white rounded-full py-1 px-3 z-10 transition-transform duration-300 ease-in-out">
                        <Image
                            className="mr-[5px]"
                            src="/icons/suggestion_icon.svg"
                            alt="suggestion icon"
                            width={16}
                            height={16}
                        />
                        <p>Suggested for you</p>
                    </div>

                    {/* Course image */}
                    <div>
                        <img src="/images/course_img.svg" alt="Course" width={300} height={300} />
                    </div>
                </div>

                {/* Course details container */}
                <div className="flex w-full h-full max-h-[9.625rem] flex-col bg-white border border-[#EAECF0] border-t-0 rounded-br-lg rounded-bl-lg px-6">

                    {/* Course title and details (lessons, duration) */}
                    <div className="flex h-[60%] items-center flex-col">

                        {/* Course name with a collapse icon */}
                        <div className="flex flex-1 text-lg font-semibold leading-6 w-full items-end justify-between mt-5">
                            <div>
                                <p>BITSET Full Course</p>
                            </div>
                            <div>
                                <Image alt="Collapse Icon Right" src="/icons/collapse-right.svg" width={8} height={8} />
                            </div>
                        </div>

                        {/* Course details - number of lessons and total duration */}
                        <div className="flex flex-1 text-xs font-normal leading-4 text-[#667085] gap-1 items-start w-full justify-start mt-1.5">
                            <p>3 Lessons</p>
                            <span>&#x2022;</span> {/* Bullet point separator */}
                            <p>3hr 14m</p>
                        </div>
                    </div>

                    {/* Progress bar and additional course info (completion, time left) */}
                    <div className="flex h-[40%] flex-col">

                        {/* Progress bar */}
                        <div className="flex relative w-full h-2 rounded-full bg-gray-200 mb-1">
                            <div
                                className="absolute top-0 left-0 h-2 rounded-full bg-progressPurple"
                                style={{ width: "43%" }}  // 43% progress is shown
                            ></div>
                        </div>

                        {/* Course status - completed percentage and time left */}
                        <div className="flex flex-1 flex-row justify-between mt-2 text-xs">
                            <div className="flex flex-row gap-1">Completed: <span className="font-semibold">43%</span></div>
                            <div className="flex flex-row gap-1">Time Left: <span className="font-semibold">28 days left</span></div>
                        </div>
                    </div>
                </div>
            </div> {/* End of course component */}

            {/* ----------- Course Component ----------- */}
            {/* Main course container with flex layout and specified dimensions */}
            <div className="flex items-center justify-center flex-col rounded-lg relative overflow-hidden transition-transform duration-300 ease-in-out w-[22.333rem] h-[340px] mr-4">

                {/* Course image and suggestion label container */}
                <div className="flex flex-1 h-[60%] items-center flex-col">

                    {/* Suggestion label positioned absolutely within the container */}
                    <div className="flex items-center absolute top-3 left-5 mr-5 bg-white bg-opacity-80 text-xs font-medium border border-white rounded-full py-1 px-3 z-10 transition-transform duration-300 ease-in-out">
                        <Image
                            className="mr-[5px]"
                            src="/icons/suggestion_icon.svg"
                            alt="suggestion icon"
                            width={16}
                            height={16}
                        />
                        <p>Suggested for you</p>
                    </div>

                    {/* Course image */}
                    <div>
                        <img src="/images/course_img.svg" alt="Course" width={300} height={300} />
                    </div>
                </div>

                {/* Course details container */}
                <div className="flex w-full h-full max-h-[9.625rem] flex-col bg-white border border-[#EAECF0] border-t-0 rounded-br-lg rounded-bl-lg px-6">

                    {/* Course title and details (lessons, duration) */}
                    <div className="flex h-[60%] items-center flex-col">

                        {/* Course name with a collapse icon */}
                        <div className="flex flex-1 text-lg font-semibold leading-6 w-full items-end justify-between mt-5">
                            <div>
                                <p>BITSET Full Course</p>
                            </div>
                            <div>
                                <Image alt="Collapse Icon Right" src="/icons/collapse-right.svg" width={8} height={8} />
                            </div>
                        </div>

                        {/* Course details - number of lessons and total duration */}
                        <div className="flex flex-1 text-xs font-normal leading-4 text-[#667085] gap-1 items-start w-full justify-start mt-1.5">
                            <p>3 Lessons</p>
                            <span>&#x2022;</span> {/* Bullet point separator */}
                            <p>3hr 14m</p>
                        </div>
                    </div>

                    {/* Progress bar and additional course info (completion, time left) */}
                    <div className="flex h-[40%] flex-col">

                        {/* Progress bar */}
                        <div className="flex relative w-full h-2 rounded-full bg-gray-200 mb-1">
                            <div
                                className="absolute top-0 left-0 h-2 rounded-full bg-progressPurple"
                                style={{ width: "43%" }}  // 43% progress is shown
                            ></div>
                        </div>

                        {/* Course status - completed percentage and time left */}
                        <div className="flex flex-1 flex-row justify-between mt-2 text-xs">
                            <div className="flex flex-row gap-1">Completed: <span className="font-semibold">43%</span></div>
                            <div className="flex flex-row gap-1">Time Left: <span className="font-semibold">28 days left</span></div>
                        </div>
                    </div>
                </div>
            </div> {/* End of course component */}
        </div>
    );
}

export default Main;

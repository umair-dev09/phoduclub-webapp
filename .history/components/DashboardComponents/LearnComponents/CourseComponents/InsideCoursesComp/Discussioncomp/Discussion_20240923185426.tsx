"use client";
import Image from "next/image";
import { useState } from "react";
function discussion() {

    return (
        <div className="flex flex-col overflow-y-auto h-auto  w-auto">
            <span className="ml-[24px] mt-[20px] w-[149px] h-[24px] text-1g text-[#1D2939] font-medium">Share your doubts</span>

            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {/* THIS HEADER PART OF THE DISCUSSION WHERE USER WRITES THE COMMENT */}
            <div className="mr-[24px] mt-[20px] ml-[24px] bg-[#F7F8FB] border border-solid border-[#EAECF0] rounded-[12px] h-auto">

                {/* Textarea for writing the comment */}
                <div className="bg-[#F7F8FB] border-b border-solid border-b-[#EAECF0] rounded-tl-[12px] rounded-tr-[12px]">
                    <textarea
                        placeholder="Type your response here..."
                        className="w-full bg-transparent border-0 text-[#1D2939] focus:outline-none resize-none"
                        style={{
                            padding: "1.5rem",
                            minHeight: "72px",      // Initial height
                            maxHeight: "200px",     // Maximum height before scrolling
                            overflowY: "auto",      // Enable scrolling once max height is reached
                        }}
                        onInput={(e) => {
                            const target = e.target;
                            target.style.height = "auto";  // Reset the height
                            target.style.height = `${target.scrollHeight}px`;  // Adjust height based on content
                        }}
                    />
                    <style jsx>{`
    textarea::placeholder {
      color: #667085;
      opacity: 0.5;
    }
  `}</style>
                </div>

                {/* ---------------------------------------------------------------- */}
                {/* THIS IS  THE PART WHERE WE CHANGE THE STYLING OF COMMENT AND SEND */}
                <div className="h-[66px] bg-[#F7F8FB] rounded-bl-[12px] rounded-br-[12px] flex justify-center items-center">
                    <div className="flex flex-row w-full justify-between items-center mx-5">
                        {/* First div with text */}
                        <div className="h-[24px] w-[288px] gap-[24px] flex flex-row">
                            {/* Icons */}
                            <div><Image src="/icons/Bold.svg" width={24} height={24} alt="bold-icon" /></div>
                            <div><Image src="/icons/italic-icon.svg" width={24} height={24} alt="italic-icon" /></div>
                            <div><Image src="/icons/underline-icon.svg" width={24} height={24} alt="underline-icon" /></div>
                            <div><Image src="/icons/dropdown-icon-1.svg" width={32} height={24} alt="dropdown-icon" /></div>
                            <div><Image src="/icons/dropdown-icon-2.svg" width={32} height={24} alt="dropdown-icon" /></div>
                            <div><Image src="/icons/dropdown-icon-3.svg" width={32} height={24} alt="dropdown-icon" /></div>
                        </div>
                        {/* Button */}
                        <button className="bg-[#9012FF] w-[88px] h-[36px] flex justify-center items-center border border-solid border-[#800EE2] rounded-md shadow-inner-button">
                            <span className="font-semibold text-[#FFFFFF] text-sm">Send</span>
                        </button>
                    </div>
                </div>

            </div>

            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {/* THIS IS THE MIDDLE-LINE */}

            <hr className="mt-[30px] border border-solid border-[#EAECF0]" />
            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {/* THE COMMENT SESSION STARTS HERE */}
            <div className="gap-[20px]">

                <div>
                    <div className="mr-[24px] ml-[24px]  mt-[24px] h-auto ">
                        <div className="h-[48px] justify-between flex flex-row">
                            <div className=" flex items-center">
                                <span>
                                    <Image
                                        src="/icons/profile-pic.png"
                                        width={46}
                                        height={46}
                                        alt=" Proflie -Image" />
                                </span>
                                <div className="flex flex-col ml-3">
                                    <span className="font-medium text-sm text-[#1D2939]">Devon Lane</span>
                                    <span className="font-normal text-sm text-[#1D2939] opacity-[50%]">devon#8852</span>

                                </div>
                            </div>

                            <span className="text-sm font-normal text-[#1D2939] opacity-[50%] flex items-center">
                                3 min ago
                            </span>



                        </div>

                    </div>
                    <div className="mr-[24px] ml-[24px] mt-[12px] font-normal text-[#1D2939] text-sm opacity-[70%] leading-relaxed">
                        <textarea
                            defaultValue="The BITSET Full Course is designed to provide students with an in-depth understanding of bit manipulation techniques and the use of bitsets in data structures. This course will cover fundamental concepts, practical applications, and advanced techniques used in competitive programming and software development. Students will learn how to efficiently solve problems using bitwise operations and gain hands-on experience through coding exercises and projects."
                            className="w-full h-24 bg-transparent"
                        />
                    </div>
                    <div className="flex flex-row  ml-[24px] mt-[10px]">
                        <button className="upvote-btn ">
                            <div className="flex flex-row">

                                <Image
                                    src="/icons/upvote.svg"
                                    width={20}
                                    height={20}
                                    alt="upvote_button"
                                    className=""

                                />
                                <span className="ml-2 font-normal text-[#141B34] text-sm">24</span>

                                <span className="ml-1  font-normal text-[#141B34] text-sm">upvote</span>
                            </div>
                        </button>

                        <div className="ml-12">

                            <button>
                                <span className="view-replies font-semibold text-sm text-[#9012FF]">View all 30 Reply</span>
                            </button>

                        </div>


                    </div>
                </div>

                <div>
                    <div className="mr-[24px] ml-[24px]  mt-[24px] h-auto ">
                        <div className="h-[48px] justify-between flex flex-row">
                            <div className=" flex items-center">
                                <span>
                                    <Image
                                        src="/icons/profile-pic.png"
                                        width={46}
                                        height={46}
                                        alt=" Proflie -Image" />
                                </span>
                                <div className="flex flex-col ml-3">
                                    <span className="font-medium text-sm text-[#1D2939]">Devon Lane</span>
                                    <span className="font-normal text-sm text-[#1D2939] opacity-[50%]">devon#8852</span>

                                </div>
                            </div>

                            <span className="text-sm font-normal text-[#1D2939] opacity-[50%] flex items-center">
                                3 min ago
                            </span>



                        </div>

                    </div>
                    <div className="mr-[24px] ml-[24px] mt-[12px] font-normal text-[#1D2939] text-sm opacity-[70%] leading-relaxed">
                        <textarea
                            defaultValue="The BITSET Full Course is designed to provide students with an in-depth understanding of bit manipulation techniques and the use of bitsets in data structures. This course will cover fundamental concepts, practical applications, and advanced techniques used in competitive programming and software development. Students will learn how to efficiently solve problems using bitwise operations and gain hands-on experience through coding exercises and projects."
                            className="w-full h-24 bg-transparent"
                        />
                    </div>
                    <div className="flex flex-row  ml-[24px] mt-[10px]">
                        <button className="upvote-btn ">
                            <div className="flex flex-row">

                                <Image
                                    src="/icons/upvote.svg"
                                    width={20}
                                    height={20}
                                    alt="upvote_button"
                                    className=""

                                />
                                <span className="ml-2 font-normal text-[#141B34] text-sm">24</span>

                                <span className="ml-1  font-normal text-[#141B34] text-sm">upvote</span>
                            </div>
                        </button>

                        <div className="ml-12">

                            <button>
                                <span className="view-replies font-semibold text-sm text-[#9012FF]">View all 30 Reply</span>
                            </button>

                        </div>


                    </div>
                </div>
            </div>

            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}




        </div>
    )
}
export default discussion; 
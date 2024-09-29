"use client";
import Image from 'next/image';
import Lesson from "./Lesson";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Collapsible from 'react-collapsible';


export default function Course() {
  const router = useRouter();

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

  const rating = 4; // The rating value
  const totalStars = 5;



  return (
    <div className="contianer flex flex-1 flex-col h-auto overflow-y-auto pb-5 mx-8">
      <div className="my-5 flex items-center">
        <button className="flex items-center ml-1" onClick={() => router.back()}>
          <div className="text-[#1D2939] h-[24px] w-auto" style={{ fontSize: "16px", fontWeight: "600" }}>
            Courses
          </div>
          <div className="ml-3 w-[24px]">
            <Image src="/icons/course-left.svg" width={6} height={12} alt="left-arrow" />
          </div>
        </button>
        <div className="text-[#667085] h-full w-auto -ml-1" style={{ fontSize: "16px", fontWeight: "500" }}>
          BITSET Full Course
        </div>
      </div>

      {/* Course content */}
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
          <div className="flex flex-1 flex-col h-[105px] p-4">
            <div className='text-[#1D2939] mt-2 ml-2'>
              <h3>BITSET Full Course</h3>
            </div>
            <div className=' text-[#667085] text-sm font-normal mt-4 ml-2'>
              <p>The BITSET Full Course is designed to provide students with an in-depth understanding of bit manipulation techniques and the use of bitsets in data structures.</p>
            </div>
          </div>

          {/* Rating Section */}
          <div className="flex items-center justify-between w-[255px] h-[24px] mt-10">
            <div className="flex items-center ml-5">
              {/* Render full stars */}
              {[...Array(Math.floor(rating))].map((_, index) => (
                <StarIcon key={`filled-${index}`} filled={true} isHalf={false} />
              ))}

              {/* Render half star if the decimal part is >= 0.5 */}
              {rating % 1 >= 0.5 && <StarIcon filled={true} isHalf={true} />}

              {/* Render remaining empty stars */}
              {[...Array(totalStars - Math.ceil(rating))].map((_, index) => (
                <StarIcon key={`empty-${index}`} filled={false} isHalf={false} />
              ))}
            </div>

            {/* Rating and Reviews */}
            <div className="text-[#1D2939] text-sm font-bold flex items-center mt-1 ml-2">
              {rating.toFixed(1)}
              <span className="text-[#1D2939] font-normal text-sm ml-1">
                <span className="flex items-center">
                  <span className="inline-block">({`500+`}</span>
                  <span className="inline-block">Ratings)</span>
                </span>
              </span>
            </div>
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center ml-7 mb-7 mt-7 space-x-3">
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

            {/* Buy Course Button */}
            <div className="m-7">
              <button
                className="text-white text-sm font-semibold py-3 px-6 rounded-md shadow-inner-button"
                style={{
                  width: "182px",
                  height: "44px",
                  backgroundColor: "#9012FF",
                  borderWidth: "1px 0 0 0",
                  borderColor: "#9012FF",
                }}
              >
                Buy Course
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Course content */}
      <div className='flex flex-col  my-8'>
        <div className='ml-2'>
          <div className='mt-4 text-[#1D2939]'>
            <h3>Course content</h3>
          </div>
          <div className='flex flex-row mt-3 text-xs'>
            <div className='flex flex-row'>
              <div className='mr-2'>
                <Image src="/icons/read.svg" alt="learn-icon" width={20} height={20} />
              </div>
              <div className='mr-3 font-normal text-sm text-[#1D2939]'>3 Lessons</div>
            </div>
            <div className='flex flex-row'>
              <div className='mr-2'>
                <Image src="/icons/vedio.svg" alt="video-icon" width={20} height={20} />
              </div>
              <div className='mr-3 font-normal text-sm text-[#1D2939]'>4 Videos</div>
            </div>
            <div className='flex flex-row'>
              <div className='mr-2'>
                <Image src="/icons/test.svg" alt="test-icon" width={20} height={20} />
              </div>
              <div className='mr-3 font-normal text-sm text-[#1D2939]'>2 Tests</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Content */}
      <div className="gap-2 flex flex-col ">
        <div className='  bg-white border border-lightGrey rounded-xl '>
          <Collapsible className='flex flex-col'
            trigger={



              <div className=''>
                <div className="flex items-center justify-between h-[56px] mx-5 relative ">
                  <p className="text-base font-bold">Lesson: Lorem ipsum dolor sit amet.</p>
                  <Image
                    src="/icons/arrowdown.svg"
                    width={24}
                    height={24}
                    alt="arrow"
                  />
                </div>
              </div>
            }
            transitionTime={600}


          >
            <Lesson />

          </Collapsible>

        </div>
        <div className='  bg-white border border-lightGrey rounded-xl'>
          <Collapsible className='flex flex-col'
            trigger={


              <div className=''>
                <div className="flex items-center justify-between h-[56px] mx-5 relative">
                  <p className="text-base font-bold">Lesson: Lorem ipsum dolor sit amet.</p>
                  <Image
                    src="/icons/arrowdown.svg"
                    width={24}
                    height={24}
                    alt="arrow"
                  />
                </div>
              </div>
            }
            transitionTime={600}


          >
            <Lesson />

          </Collapsible>

        </div>
        <div className='  bg-white border border-lightGrey rounded-xl'>
          <Collapsible className='flex flex-col'
            trigger={


              <div className=''>
                <div className="flex items-center justify-between h-[56px] mx-5 relative">
                  <p className="text-base font-bold">Lesson: Lorem ipsum dolor sit amet.</p>
                  <Image
                    src="/icons/arrowdown.svg"
                    width={24}
                    height={24}
                    alt="arrow"
                  />
                </div>
              </div>
            }
            transitionTime={600}


          >
            <Lesson />

          </Collapsible>

        </div>
      </div>













    </div >
  );
}

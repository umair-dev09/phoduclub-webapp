
"use client";
import Image from 'next/image';
import Lesson from "./Lesson";
import React, { useState } from "react";
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import src from 'react-select/dist/declarations/src';
import { ArrowIcon } from '@/components/ArrowIcon';
import { ArrowIcon1 } from '@/components/ArrowIcon1';
import type { Selection } from "@nextui-org/react";
import { useRouter } from 'next/navigation';




export default function Course() {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["1"]));
  const itemClasses = {
    title: "font-normal text-lg focus:border-red-500 ",

  };


  interface CollapseState {
    [key: number]: boolean;
  }
  const [collapsed, setCollapsed] = useState<CollapseState>({
    1: true,
    2: true,
  });

  const toggleCollapse = (index: number) => {
    setCollapsed(prev => ({
      ...prev,
      [index]: !prev[index],  // This line handles the state toggle
    }));
  };
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (

    <div className="flex flex-col flex-1 h-full px-8 overflow-y-auto">
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

      {/* Main course content here */}



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
          <div className="flex flex-1 flex-col h-[105px] p-4 ">
            <div className='text-[#1D2939] mt-2 ml-2'>
              <h3>BITSET Full Course</h3>
            </div>

            <div className='mt=4 text-[#667085] text-sm font-normal mt-2 ml-2'>
              <p>The BITSET Full Course is designed to provide students with an in-depth understanding of bit manipulation techniques and the use of bitsets in data structures.
                The BITSET Full Course is designed to provide students with it


              </p>
            </div>
          </div>
          {/* Rating Section */}

          <div className="flex items-center justify-between w-[255px] h-[24px] mt-7 ">
            {/* Star Icons */}
            <div className="flex items-center ml-5">

              {[...Array(3)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#F78E09]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.472l1.886 5.805h6.113c.42 0 .596.536.256.808l-4.945 3.6 1.885 5.805c.134.412-.343.756-.692.493L12 16.19l-4.503 3.393c-.349.264-.826-.081-.692-.493l1.886-5.805-4.945-3.6c-.34-.272-.164-.808.256-.808h6.113L12 2.472z" />
                </svg>
              ))}
              {/* Half star */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#F78E09]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <defs>
                  <linearGradient id="half-grad" gradientUnits="userSpaceOnUse">
                    <stop offset="50%" stopColor="#F78E09" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#half-grad)"
                  d="M12 2.472l1.886 5.805h6.113c.42 0 .596.536.256.808l-4.945 3.6 1.885 5.805c.134.412-.343.756-.692.493L12 16.19l-4.503 3.393c-.349.264-.826-.081-.692-.493l1.886-5.805-4.945-3.6c-.34-.272-.164-.808.256-.808h6.113L12 2.472z"
                />
              </svg>


            </div>

            {/* Rating and Reviews */}
            <div className="text-[#1D2939] text-sm font-bold flex items-center  mt-1 ml-2">
              3.5
              <span className="text-[#1D2939] font-normal text-sm  ml-1">
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
                className="text-white text-sm font-semibold py-3 px-6 rounded-md shadow-md"
                style={{
                  width: "182px",
                  height: "44px",
                  backgroundColor: "#9012FF",
                  borderWidth: "1px 0 0 0",
                  borderColor: "#9012FF", // Ensure border color matches button background
                }}
              >
                Buy Course
              </button>
            </div>
          </div>



        </div>
      </div>

      {/* ------------------------------------------------------------------------------------------------------------------------------------------> */}
      <div className="overflow-y-auto h-[600px]"> {/* Adjust height as needed */}
        <div className='flex flex-col'>
          <div className='ml-2'>
            <div className='mt-4 text-[#1D2939]'>
              <h3>Course content</h3>
            </div>
            <div className='flex flex-row mt-3 text-xs'>
              <div className='flex flex-row'>
                <div className='mr-2'>
                  <Image src="/icons/course-learn.svg" alt="learn-icon" width={20} height={20} />
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

          {/* Lesson section with dropdown */}
          <div className='flex flex-col bg-white border border-lightGrey rounded-xl mt-4'>
            <div className='flex items-center justify-between h-[56px] mx-5 relative'>
              <div className='test-base font-bold'>
                <p>Lesson 1: Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
              <button onClick={() => toggleCollapse(1)}>
                <Image
                  src={collapsed[1] ? "/icons/arrowDown.svg" : "/icons/arrowUp.svg"}
                  width={20}
                  height={20}
                  alt="arrow"
                />
              </button>
            </div>
            <hr />
            <div className={`transition-all duration-300 ease-in-out ${collapsed[1] ? 'max-h-0 overflow-hidden' : 'max-h-[500px]'}`}>
              <Lesson />
            </div>
          </div>

          <div className='flex flex-col bg-white border border-lightGrey rounded-xl mt-4'>
            <div className='flex items-center justify-between h-[56px] mx-5 relative'>
              <div className='test-base font-bold'>
                <p>Lesson 2: Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
              <button onClick={() => toggleCollapse(2)}>
                <Image
                  src={collapsed[2] ? "/icons/arrowDown.svg" : "/icons/arrowUp.svg"}
                  width={20}
                  height={20}
                  alt="arrow"
                />
              </button>
            </div>
            <hr />
            <div className={`transition-all duration-300 ease-in-out ${collapsed[2] ? 'max-h-0 overflow-hidden' : 'max-h-[500px]'}`}>
              <Lesson />
            </div>
          </div>
          <div className='flex flex-col bg-white border border-lightGrey rounded-xl mt-4'>
            <div className='flex items-center justify-between h-[56px] mx-5 relative'>
              <div className='test-base font-bold'>
                <p>Lesson 2: Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
              <button onClick={() => toggleCollapse(2)}>
                <Image
                  src={collapsed[2] ? "/icons/arrowDown.svg" : "/icons/arrowUp.svg"}
                  width={20}
                  height={20}
                  alt="arrow"
                />
              </button>
            </div>
            <hr />
            <div className={`transition-all duration-300 ease-in-out ${collapsed[2] ? 'max-h-0 overflow-hidden' : 'max-h-[500px]'}`}>
              <Lesson />
            </div>
          </div>
          <div className='flex flex-col bg-white border border-lightGrey rounded-xl mt-4'>
            <div className='flex items-center justify-between h-[56px] mx-5 relative'>
              <div className='test-base font-bold'>
                <p>Lesson 2: Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
              <button onClick={() => toggleCollapse(2)}>
                <Image
                  src={collapsed[2] ? "/icons/arrowDown.svg" : "/icons/arrowUp.svg"}
                  width={20}
                  height={20}
                  alt="arrow"
                />
              </button>
            </div>
            <hr />
            <div className={`transition-all duration-300 ease-in-out ${collapsed[2] ? 'max-h-0 overflow-hidden' : 'max-h-[500px]'}`}>
              <Lesson />
            </div>
          </div>
        </div>
      </div>
      {/* <Accordion className='mb-2'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className='test-base font-bold'
                >
                    Lesson 1: Lorem ipsum dolor sit amet consectetur adipisicing elit
                </AccordionSummary>
                <AccordionDetails>
                    <Collaspe />
                </AccordionDetails>
            </Accordion> */}

      <Accordion selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys} variant='splitted' itemClasses={itemClasses}

      >
        <AccordionItem key="1" aria-label="Accordion 1" className='bg-white focus:!outline-none }' indicator={({ isOpen }) => (isOpen ? <ArrowIcon /> : <ArrowIcon1 />)}
          title="Accordion 1">
          {/* {defaultContent} */}
          Hii
        </AccordionItem>
        <AccordionItem className='bg-white' title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem className='bg-white' title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>

    </div >
  );
}


"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import { useState, useEffect } from "react";
// Import useRouter hook

function Main2() {
  const [activeTab, setActiveTab] = useState<string>('');
  const router = useRouter();
  const pathname = usePathname();
  const handleTabClick = (tabName: string, path: string) => {

    setActiveTab(tabName);
    router.push(path);
  };
  useEffect(() => {
    if (pathname) {
      const currentPath = pathname.split('/')[4];
      if (currentPath === 'Bit1') {
        setActiveTab('Bit1');
      }
    }
  }, [pathname]);


  return (
    <div className="flex flex-row flex-wrap w-full">
      {/* Start of Component */}
      <div className="flex items-center justify-center flex-col flex-[0.5] rounded-lg relative overflow-hidden transition-transform duration-300 w-[280px] h-auto mx-4">
        {/* Container for the suggestion badge and course image */}
        <div>
          {/* Suggestion badge with icon and text */}
          <div className="flex items-center absolute top-3 left-5 mr-5 bg-[#FFEC45] text-xs font-medium border border-[#FFEC45] rounded-full py-1 px-3 z-10 transition-transform transition-font-size duration-300 ease-in-out">
            <Image
              className="mr-[5px]"
              src="/icons/suggestion_icon.svg"
              alt="suggestion icon"
              width={16}
              height={16}
            />
            <p>Suggested for ysou</p>
          </div>
          {/* Course image */}
            <Image className="flex w-[280px] " src="/images/course_img.svg" alt="Course image" width={0} height={0}/>
        </div>

        {/* Container for course details and buy button */}
        <div className="flex w-full flex-col border border-[#EAECF0] bg-white border-t-0 rounded-br-lg rounded-bl-lg">
          {/* Course name and details */}
          <div className="mt-4">
            {/* Course name */}
            <div className="text-lg font-semibold leading-6 ml-4">
              <p>BITSET Full Course</p>
            </div>
            {/* Course details: lessons, duration */}
            <div className="text-xs mx-4 font-normal leading-4 text-[#667085] flex items-center gap-1">
              <p>3 Lessons</p>
              <span>&#x2022;</span> {/* Bullet point */}
              <p>3hr 14m</p>
            </div>
          </div>

          {/* Pricing and buy button */}
          <div className="flex justify-between mt-2 mb-4 mx-4 text-lg font-semibold">
            {/* Price */}
            <div className="flex items-end">
              <h4>&#8377; 2400</h4>
            </div>
            {/* Buy Now button */}
            <div>
              <button className="text-xs font-semibold py-2.5 px-3.5 rounded-md bg-[#9012FF] border-2 border-[#9012FF] text-white"
                onClick={() => handleTabClick('Bit1', '/learn/courses/purchase/Bit1')}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End of Component */}
       {/* Start of Component */}
       <div className="flex items-center justify-center flex-col flex-[0.5] rounded-lg relative overflow-hidden transition-transform duration-300 w-[280px] h-auto mx-4">
        {/* Container for the suggestion badge and course image */}
        <div>
          {/* Suggestion badge with icon and text */}
          <div className="flex items-center absolute top-3 left-5 mr-5 bg-[#FFEC45] text-xs font-medium border border-[#FFEC45] rounded-full py-1 px-3 z-10 transition-transform transition-font-size duration-300 ease-in-out">
            <Image
              className="mr-[5px]"
              src="/icons/suggestion_icon.svg"
              alt="suggestion icon"
              width={16}
              height={16}
            />
            <p>Suggested for ysou</p>
          </div>
          {/* Course image */}
            <Image className="flex w-[280px] " src="/images/course_img.svg" alt="Course image" width={0} height={0}/>
        </div>

        {/* Container for course details and buy button */}
        <div className="flex w-full flex-col border border-[#EAECF0] bg-white border-t-0 rounded-br-lg rounded-bl-lg">
          {/* Course name and details */}
          <div className="mt-4">
            {/* Course name */}
            <div className="text-lg font-semibold leading-6 ml-4">
              <p>BITSET Full Course</p>
            </div>
            {/* Course details: lessons, duration */}
            <div className="text-xs mx-4 font-normal leading-4 text-[#667085] flex items-center gap-1">
              <p>3 Lessons</p>
              <span>&#x2022;</span> {/* Bullet point */}
              <p>3hr 14m</p>
            </div>
          </div>

          {/* Pricing and buy button */}
          <div className="flex justify-between mt-2 mb-4 mx-4 text-lg font-semibold">
            {/* Price */}
            <div className="flex items-end">
              <h4>&#8377; 2400</h4>
            </div>
            {/* Buy Now button */}
            <div>
              <button className="text-xs font-semibold py-2.5 px-3.5 rounded-md bg-[#9012FF] border-2 border-[#9012FF] text-white"
                onClick={() => handleTabClick('Bit1', '/learn/courses/purchase/Bit1')}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End of Component */} {/* Start of Component */}
      <div className="flex items-center justify-center flex-col flex-[0.5] rounded-lg relative overflow-hidden transition-transform duration-300 w-[280px] h-auto mx-4">
        {/* Container for the suggestion badge and course image */}
        <div>
          {/* Suggestion badge with icon and text */}
          <div className="flex items-center absolute top-3 left-5 mr-5 bg-[#FFEC45] text-xs font-medium border border-[#FFEC45] rounded-full py-1 px-3 z-10 transition-transform transition-font-size duration-300 ease-in-out">
            <Image
              className="mr-[5px]"
              src="/icons/suggestion_icon.svg"
              alt="suggestion icon"
              width={16}
              height={16}
            />
            <p>Suggested for ysou</p>
          </div>
          {/* Course image */}
            <Image className="flex w-[280px] " src="/images/course_img.svg" alt="Course image" width={0} height={0}/>
        </div>

        {/* Container for course details and buy button */}
        <div className="flex w-full flex-col border border-[#EAECF0] bg-white border-t-0 rounded-br-lg rounded-bl-lg">
          {/* Course name and details */}
          <div className="mt-4">
            {/* Course name */}
            <div className="text-lg font-semibold leading-6 ml-4">
              <p>BITSET Full Course</p>
            </div>
            {/* Course details: lessons, duration */}
            <div className="text-xs mx-4 font-normal leading-4 text-[#667085] flex items-center gap-1">
              <p>3 Lessons</p>
              <span>&#x2022;</span> {/* Bullet point */}
              <p>3hr 14m</p>
            </div>
          </div>

          {/* Pricing and buy button */}
          <div className="flex justify-between mt-2 mb-4 mx-4 text-lg font-semibold">
            {/* Price */}
            <div className="flex items-end">
              <h4>&#8377; 2400</h4>
            </div>
            {/* Buy Now button */}
            <div>
              <button className="text-xs font-semibold py-2.5 px-3.5 rounded-md bg-[#9012FF] border-2 border-[#9012FF] text-white"
                onClick={() => handleTabClick('Bit1', '/learn/courses/purchase/Bit1')}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End of Component */} {/* Start of Component */}
      <div className="flex items-center justify-center flex-col flex-[0.5] rounded-lg relative overflow-hidden transition-transform duration-300 w-[280px] h-auto mx-4">
        {/* Container for the suggestion badge and course image */}
        <div>
          {/* Suggestion badge with icon and text */}
          <div className="flex items-center absolute top-3 left-5 mr-5 bg-[#FFEC45] text-xs font-medium border border-[#FFEC45] rounded-full py-1 px-3 z-10 transition-transform transition-font-size duration-300 ease-in-out">
            <Image
              className="mr-[5px]"
              src="/icons/suggestion_icon.svg"
              alt="suggestion icon"
              width={16}
              height={16}
            />
            <p>Suggested for ysou</p>
          </div>
          {/* Course image */}
            <Image className="flex w-[280px] " src="/images/course_img.svg" alt="Course image" width={0} height={0}/>
        </div>

        {/* Container for course details and buy button */}
        <div className="flex w-full flex-col border border-[#EAECF0] bg-white border-t-0 rounded-br-lg rounded-bl-lg">
          {/* Course name and details */}
          <div className="mt-4">
            {/* Course name */}
            <div className="text-lg font-semibold leading-6 ml-4">
              <p>BITSET Full Course</p>
            </div>
            {/* Course details: lessons, duration */}
            <div className="text-xs mx-4 font-normal leading-4 text-[#667085] flex items-center gap-1">
              <p>3 Lessons</p>
              <span>&#x2022;</span> {/* Bullet point */}
              <p>3hr 14m</p>
            </div>
          </div>

          {/* Pricing and buy button */}
          <div className="flex justify-between mt-2 mb-4 mx-4 text-lg font-semibold">
            {/* Price */}
            <div className="flex items-end">
              <h4>&#8377; 2400</h4>
            </div>
            {/* Buy Now button */}
            <div>
              <button className="text-xs font-semibold py-2.5 px-3.5 rounded-md bg-[#9012FF] border-2 border-[#9012FF] text-white"
                onClick={() => handleTabClick('Bit1', '/learn/courses/purchase/Bit1')}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End of Component */} {/* Start of Component */}
      <div className="flex items-center justify-center flex-col flex-[0.5] rounded-lg relative overflow-hidden transition-transform duration-300 w-[280px] h-auto mx-4">
        {/* Container for the suggestion badge and course image */}
        <div>
          {/* Suggestion badge with icon and text */}
          <div className="flex items-center absolute top-3 left-5 mr-5 bg-[#FFEC45] text-xs font-medium border border-[#FFEC45] rounded-full py-1 px-3 z-10 transition-transform transition-font-size duration-300 ease-in-out">
            <Image
              className="mr-[5px]"
              src="/icons/suggestion_icon.svg"
              alt="suggestion icon"
              width={16}
              height={16}
            />
            <p>Suggested for ysou</p>
          </div>
          {/* Course image */}
            <Image className="flex w-[280px] " src="/images/course_img.svg" alt="Course image" width={0} height={0}/>
        </div>

        {/* Container for course details and buy button */}
        <div className="flex w-full flex-col border border-[#EAECF0] bg-white border-t-0 rounded-br-lg rounded-bl-lg">
          {/* Course name and details */}
          <div className="mt-4">
            {/* Course name */}
            <div className="text-lg font-semibold leading-6 ml-4">
              <p>BITSET Full Course</p>
            </div>
            {/* Course details: lessons, duration */}
            <div className="text-xs mx-4 font-normal leading-4 text-[#667085] flex items-center gap-1">
              <p>3 Lessons</p>
              <span>&#x2022;</span> {/* Bullet point */}
              <p>3hr 14m</p>
            </div>
          </div>

          {/* Pricing and buy button */}
          <div className="flex justify-between mt-2 mb-4 mx-4 text-lg font-semibold">
            {/* Price */}
            <div className="flex items-end">
              <h4>&#8377; 2400</h4>
            </div>
            {/* Buy Now button */}
            <div>
              <button className="text-xs font-semibold py-2.5 px-3.5 rounded-md bg-[#9012FF] border-2 border-[#9012FF] text-white"
                onClick={() => handleTabClick('Bit1', '/learn/courses/purchase/Bit1')}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End of Component */}

     {/* Start of Component */}
     <div className="flex items-center justify-center flex-col flex-[0.5] rounded-lg relative overflow-hidden transition-transform duration-300 w-[280px] h-auto mx-4">
        {/* Container for the suggestion badge and course image */}
        <div>
          {/* Suggestion badge with icon and text */}
          <div className="flex items-center absolute top-3 left-5 mr-5 bg-[#FFEC45] text-xs font-medium border border-[#FFEC45] rounded-full py-1 px-3 z-10 transition-transform transition-font-size duration-300 ease-in-out">
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
            <Image className="flex w-[280px] " src="/images/course_img.svg" alt="Course image" width={0} height={0}/>
        </div>

        {/* Container for course details and buy button */}
        <div className="flex w-full flex-col border border-[#EAECF0] bg-white border-t-0 rounded-br-lg rounded-bl-lg">
          {/* Course name and details */}
          <div className="mt-4">
            {/* Course name */}
            <div className="text-lg font-semibold leading-6 ml-4">
              <p>BITSET Full Course</p>
            </div>
            {/* Course details: lessons, duration */}
            <div className="text-xs mx-4 font-normal leading-4 text-[#667085] flex items-center gap-1">
              <p>3 Lessons</p>
              <span>&#x2022;</span> {/* Bullet point */}
              <p>3hr 14m</p>
            </div>
          </div>

          {/* Pricing and buy button */}
          <div className="flex justify-between mt-2 mb-4 mx-4 text-lg font-semibold">
            {/* Price */}
            <div className="flex items-end">
              <h4>&#8377; 2400</h4>
            </div>
            {/* Buy Now button */}
            <div>
              <button className="text-xs font-semibold py-2.5 px-3.5 rounded-md bg-[#9012FF] border-2 border-[#9012FF] text-white"
                onClick={() => handleTabClick('Bit1', '/learn/courses/purchase/Bit1')}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End of Component */}
      {/* Start of Component */}
      <div className="flex items-center justify-center flex-col flex-[0.5] rounded-lg relative overflow-hidden transition-transform duration-300 w-[280px] h-auto mx-4">
        {/* Container for the suggestion badge and course image */}
        <div>
          {/* Suggestion badge with icon and text */}
          <div className="flex items-center absolute top-3 left-5 mr-5 bg-[#FFEC45] text-xs font-medium border border-[#FFEC45] rounded-full py-1 px-3 z-10 transition-transform transition-font-size duration-300 ease-in-out">
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
            <Image className="flex w-[280px] " src="/images/course_img.svg" alt="Course image" width={0} height={0}/>
        </div>

        {/* Container for course details and buy button */}
        <div className="flex w-full flex-col border border-[#EAECF0] bg-white border-t-0 rounded-br-lg rounded-bl-lg">
          {/* Course name and details */}
          <div className="mt-4">
            {/* Course name */}
            <div className="text-lg font-semibold leading-6 ml-4">
              <p>BITSET Full Course</p>
            </div>
            {/* Course details: lessons, duration */}
            <div className="text-xs mx-4 font-normal leading-4 text-[#667085] flex items-center gap-1">
              <p>3 Lessons</p>
              <span>&#x2022;</span> {/* Bullet point */}
              <p>3hr 14m</p>
            </div>
          </div>

          {/* Pricing and buy button */}
          <div className="flex justify-between mt-2 mb-4 mx-4 text-lg font-semibold">
            {/* Price */}
            <div className="flex items-end">
              <h4>&#8377; 2400</h4>
            </div>
            {/* Buy Now button */}
            <div>
              <button className="text-xs font-semibold py-2.5 px-3.5 rounded-md bg-[#9012FF] border-2 border-[#9012FF] text-white"
                onClick={() => handleTabClick('Bit1', '/learn/courses/purchase/Bit1')}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End of Component */}
    </div>
  );
}

export default Main2;

// "use client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState } from "react";




// function SideButton() {
//     const [activeTab, setActiveTab] = useState<string>('');
//     const [iconClicked, setIconClicked] = useState<boolean>(false);

//     const router = useRouter();

//     const handleTabClick = (tabName: string, path: string) => {
//         setActiveTab(tabName);
//         setIconClicked(!iconClicked); // Toggle the icon on click
//         router.push(path);
//     };
//     return (
//         <div className="relative flex flex-col flex-1 pb-8 ">
//             <div className="absolute top-0 right-0 w-[363px] h-full bg-[#FFFFFF] border border-b border-r">
//                 <div className="h-full bg-[#FFFFFF]" style={{ borderRight: '1px solid #EAECF0' }}>
//                     <div className="w-[331px] h-[70px] rounded-tl-lg m-3" style={{ paddingLeft: "10px", borderRadius: '8px 0 0 0' }}>
//                         {/* Use a flex container with `flex-col` to stack items vertically */}











//                         <div className="flex flex-col h-full justify-start ">
//                             <button
//                                 onClick={() => handleTabClick('bit2.1', '/bit2/bit2.1')}
//                                 className={`w-full h-[70px] bg-[#F8F0FF] text-[#1D2939] text-base font-medium rounded-lg flex items-start   ${activeTab === 'bit2.1' ? 'text-base font-bold  bg-[#F8F0FF]' : ''
//                                     }`}


//                             >
//                                 <div className="flex-1 flex  itmes-center flex-col">
//                                     <div className="flex items-center
//                                                 flex-1">

//                                         <Image
//                                             src={iconClicked ? '/icons/Green-tick.svg' : (activeTab === 'bit2.1' ? '/icons/course-circle.svg' : '/icons/course-circle2.svg')}

//                                             width={20}
//                                             height={20}
//                                             alt="circle-course"
//                                             className="" style={{ marginTop: "9px", marginLeft: '15px' }}
//                                             onClick={(event) => {
//                                                 event.stopPropagation(); // Prevents navigation to another page
//                                                 // Handle your icon click logic here
//                                                 setIconClicked(!iconClicked);
//                                             }}
//                                         />

//                                         <span
//                                             className={`flex ${activeTab === 'bit2.1' ? {/*'text-base font-bold text-[#000000]'*/ } : 'text-base font-bold text-[#000000]'
//                                                 }`}
//                                             style={{ marginTop: "9px", marginLeft: '15px' }}
//                                         >1. Welcome and Introduction</span>
//                                     </div>
//                                     <div className="flex items-center
//                                                    flex-1"
//                                         style={{ marginTop: "6px" }}>
//                                         <Image

//                                             src="/icons/course-learn.svg"
//                                             width={16}
//                                             height={16}
//                                             alt="circle-course"
//                                             className="" style={{ marginLeft: '45px' }}
//                                             onClick={(event) => {
//                                                 event.stopPropagation(); // Prevents navigation to another page
//                                                 // Handle your icon click logic here
//                                                 setIconClicked(!iconClicked);
//                                             }}
//                                         />
//                                         <span className=" flex font-normal text-[#667085]"
//                                             style={{ marginLeft: '10px' }}
//                                         >10:10</span>
//                                     </div>
//                                 </div>

//                             </button>
//                         </div>
//                         <div>
//                             <button className="w-full h-[70px] bg-[#FFFFFF] text-[#1D2939] text-base font-medium rounded-lg flex items-start"

//                             >
//                                 <div className="flex-1 flex  itmes-center flex-col">
//                                     <div className="flex items-center
//                                                               flex-1">

//                                         <Image
//                                             src={iconClicked ? '/icons/Green-tick.svg' : (activeTab === 'bit2.1' ? '/icons/course-circle.svg' : '/icons/course-circle2.svg')}
//                                             width={20}
//                                             height={20}
//                                             alt="circle-course"
//                                             className="" style={{ marginTop: "9px", marginLeft: '15px' }}
//                                         />


//                                         <span className=" flex "
//                                             style={{ marginTop: "9px", marginLeft: '15px' }}
//                                         >2. Chapter 01 Introduction</span>
//                                     </div>
//                                     <div className="flex items-center
//                                                            flex-1"
//                                         style={{ marginTop: "6px" }}>
//                                         <Image
//                                             src="/icons/vedio.svg"
//                                             width={16}
//                                             height={16}
//                                             alt="circle-course"
//                                             className="" style={{ marginLeft: '45px' }}
//                                         />
//                                         <span className=" flex font-normal text-[#667085]"
//                                             style={{ marginLeft: '10px' }}
//                                         >9:20</span>
//                                     </div>
//                                 </div>

//                             </button>
//                         </div>
//                         <div>
//                             <button className="w-full h-[70px] bg-[#FFFFFF] text-[#1D2939] text-base font-medium rounded-lg flex items-start"

//                             >
//                                 <div className="flex-1 flex  itmes-center flex-col">
//                                     <div className="flex items-center
//                                                               flex-1">
//                                         <Image
//                                             src="/icons/course-circle.svg"
//                                             width={20}
//                                             height={20}
//                                             alt="circle-course"
//                                             className="" style={{ marginTop: "9px", marginLeft: '15px' }}
//                                         />
//                                         <span className=" flex "
//                                             style={{ marginTop: "9px", marginLeft: '15px' }}
//                                         >3. Chapter 01 heading</span>
//                                     </div>
//                                     <div className="flex items-center
//                                                            flex-1"
//                                         style={{ marginTop: "6px" }}>
//                                         <Image
//                                             src="/icons/vedio.svg"
//                                             width={16}
//                                             height={16}
//                                             alt="circle-course"
//                                             className="" style={{ marginLeft: '45px' }}
//                                         />
//                                         <span className=" flex  font-normal text-[#667085]"
//                                             style={{ marginLeft: '10px' }}
//                                         >11:45</span>
//                                     </div>
//                                 </div>

//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>





//             <div className="h-[70px] ">
//                 <div className="my-5 flex items-center ml-7">


//                     <button className='flex items-center ml-5'
//                         onClick={() => router.back()}>
//                         <div
//                             className="text-[#1D2939] h-[24px] w-auto"
//                             style={{ fontSize: "16px", fontWeight: "600" }}

//                         >
//                             Courses
//                         </div>
//                         <div className="ml-3 w-[24px]">
//                             <Image
//                                 src="/icons/course-left.svg"
//                                 width={6}
//                                 height={12}
//                                 alt="left-arrow"
//                             />
//                         </div>
//                     </button>

//                     <div
//                         className="text-[#667085] h-full w-auto -ml-1"
//                         style={{ fontSize: "16px", fontWeight: "500" }}
//                     >
//                         BITSET Full Course
//                     </div>
//                 </div>
//             </div>
//             <div className="h-[70px] ">
//                 <div className="flex items-start ml-7 flex-col">
//                     <div className='flex items-start  '>   <span className="text-Ig text-[#1D2939] font-bold ml-5 ">1. Welcome and Introduction</span></div>
//                     <div className="flex ml-5 mt-3  flex-row items-center">

//                         <Image
//                             src="/icons/course-learn.svg"
//                             alt="course-learn"
//                             width={20}
//                             height={20}
//                         />
//                         <span className="text-sm font-semibold text-[#1D2939] ml-3">3h 20m</span>
//                         <span className="text-sm font-normal text-[#1D2939] ml-1">of readings left</span>



//                         <Image
//                             src="/icons/vedio.svg"
//                             alt="course-learn"
//                             width={20}
//                             height={20}
//                             className="ml-5"
//                         />
//                         <span className="text-sm font-semibold text-[#1D2939] ml-3">3h 20m</span>
//                         <span className="text-sm font-normal text-[#1D2939] ml-1">of readings left</span>



//                         <Image
//                             src="/icons/course-learn.svg"
//                             alt="course-learn"
//                             width={20}
//                             height={20}
//                             className="ml-5"
//                         />
//                         <span className="text-sm font-semibold text-[#1D2939] ml-3">3h 20m</span>
//                         <span className="text-sm font-normal text-[#1D2939] ml-1">of readings left</span>

//                     </div>



//                 </div>
//             </div>
//             <div className="h-[450px] ml-11 mr-96 mt-15 bg-blue-900" style={{ borderRadius: "5px" }}>
//                 <div>
//                     {/* <video
//                                 width="100%"
//                                 height="100%"
//                                 controls
//                             >
//                                 <source src="/icons/test.mp4" type="video/mp4" />
//                                 Your browser does not support the video tag.
//                             </video> */}


//                     <h1 className="font-bold flex items-center">VEDIO</h1>
//                 </div>
//             </div>
//             <div className="h-[65px] ml-11 mr-96" style={{ borderRadius: "5px", position: "relative" }}>
//                 <div className="flex justify-between items-end h-full">
//                     <button
//                         className="px-8 py-2 h-[44px] w-[118px]text-sm font-normal bg-[#FFFFFF] border rounded-lg shadow-sm text-[#667085] hover:bg-[#8501FF] hover:text-[#FFFFFF] hover:border-[1px] hover:border-[#800EE2] hover:font-semibold transition-opacity duration-300 ease-in-out"
//                         style={{ borderRadius: "5px", border: "1.5px solid #EAECF0" }}
//                     >
//                         Previous
//                     </button>
//                     <button
//                         className="px-8 py-2 h-[44px] w-[118px]text-sm font-normal bg-[#FFFFFF] border rounded-lg shadow-sm text-[#667085]   hover:bg-[#8501FF] hover:text-[#FFFFFF] hover:border-[1px] hover:border-[#800EE2]  hover:font-semibold transition-opacity duration-300 ease-in-out"
//                         style={{ borderRadius: "5px", border: "1.5px solid #EAECF0" }}
//                     >
//                         Next
//                     </button>
//                 </div>
//             </div>
//             <div className="overflow-y-auto p-5">
//                 <div className=" h-[32px] ml-6 mr-96 border-b border-[#EAECF0]  flex flex-row  gap-4">
//                     <button>
//                         <div className="relative h-[32px] w-[83px]">
//                             <span
//                                 className="relative text-base font-medium text-[#667085] hover:text-[#6941C6] hover:border-b-2 hover:border-[#6941C6]"
//                                 style={{
//                                     paddingBottom: '7px' // Adjust gap between text and line
//                                 }}
//                             >
//                                 Overview
//                             </span>
//                         </div>
//                     </button>

//                     <button>
//                         <div className="relative h-[32px] w-[83px]">
//                             <span
//                                 className="relative text-base font-medium text-[#667085] hover:text-[#6941C6] hover:border-b-2 hover:border-[#6941C6]"
//                                 style={{
//                                     paddingBottom: '7px',
//                                     // Adjust gap between text and line
//                                 }}
//                             >
//                                 Discussion
//                             </span>
//                         </div>
//                     </button>


//                 </div>
//                 <div className="overflow-y-auto p-5">
//                     <div className="h-[750px] ml-2  mt-15 bg-[#FFFFFF]" style={{ borderRadius: "5px" }}>
//                         <span className="bg-red-500">


//                         </span>


//                     </div>



//                 </div>




//             </div>

//         </div>

//     );
// }
// export default SideButton;
function SideButton() {
    return (
        <div className="flex h-screen">
            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto">
                {/* Your main content goes here */}
            </div>

            {/* Sidebar */}
            <div className="fixed right-0 w-[362px] h-full bg-slate-900">
                <p className="text-white p-4">Aligned to the bottom right</p>
                {/* You can add more content here if needed */}
            </div>
            <div className="fixed right-0 w-[362px] h-full bg-slate-900">
                <p className="text-white p-4">Aligned to the bottom right</p>
                {/* You can add more content here if needed */}
            </div>
            <div className="fixed right-0 w-[362px] h-full bg-slate-900">
                <p className="text-white p-4">Aligned to the bottom right</p>
                {/* You can add more content here if needed */}
            </div>
            <div className="fixed right-0 w-[362px] h-full bg-slate-900">
                <p className="text-white p-4">Aligned to the bottom right</p>
                {/* You can add more content here if needed */}
            </div>
            <div className="fixed right-0 w-[362px] h-full bg-slate-900">
                <p className="text-white p-4">Aligned to the bottom right</p>
                {/* You can add more content here if needed */}
            </div>
            <div className="fixed right-0 w-[362px] h-full bg-slate-900">
                <p className="text-white p-4">Aligned to the bottom right</p>
                {/* You can add more content here if needed */}
            </div>
            <div className="fixed right-0 w-[362px] h-full bg-slate-900">
                <p className="text-white p-4">Aligned to the bottom right</p>
                {/* You can add more content here if needed */}
            </div>
        </div>
    );
}

export default SideButton;








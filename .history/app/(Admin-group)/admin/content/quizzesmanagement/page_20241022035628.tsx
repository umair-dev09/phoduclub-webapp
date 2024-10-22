// "use client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import ReactPaginate from 'react-paginate';


// function Quizz() {
//     const router = useRouter();
//     // Function to handle tab click and navigate to a new route
//     const handleTabClick = (tab: string, path: string) => {
//         router.push(path);
//     };
//     const generateDummyData = () => {
//         const statusTypes = [
//             { text: "Saved", icon: "/icons/Saved.svg", width: 74 },
//             { text: "Live", icon: "/icons/Live.svg", width: 59 },
//             { text: "Cancelled", icon: "/icons/cancelled.svg", width: 95 },
//             { text: "Paused", icon: "/icons/Paused.svg", width: 73 },
//             { text: "Scheduled", icon: "/icons/secheduled.svg", width: 101 },
//             { text: "Finished", icon: "/icons/Finished.svg", width: 74 }
//         ];

//         return Array.from({ length: 50 }, (_, index) => ({
//             id: index + 1,
//             title: `Maths Quiz ${index + 1}`,
//             questions: Math.floor(Math.random() * 20) + 10,
//             publishedDate: new Date(2024, 0, Math.floor(Math.random() * 31) + 1).toLocaleDateString('en-US', {
//                 month: 'short',
//                 day: 'numeric',
//                 year: 'numeric'
//             }),
//             studentsAttempted: Math.floor(Math.random() * 3000) + 1000,
//             status: statusTypes[Math.floor(Math.random() * statusTypes.length)]
//         }));
//     };

//     // State management
//     const [currentPage, setCurrentPage] = useState(0);
//     const [data] = useState(generateDummyData());
//     const itemsPerPage = 10;
//     const pageCount = Math.ceil(data.length / itemsPerPage);

//     // Get current page's data
//     const getCurrentPageData = () => {
//         const startIndex = currentPage * itemsPerPage;
//         return data.slice(startIndex, startIndex + itemsPerPage);
//     };

//     // Handle page change
//     const handlePageClick = (event: { selected: any; }) => {
//         setCurrentPage(event.selected);
//     };


//     return (
//         <div className="flex flex-col px-[32px] mt-4 w-full gap-4 pb-4">
//             <div className="flex flex-row justify-between items-center">
//                 <span className="text-lg font-semibold text-[#1D2939]">Quizzes</span>

//                 <div className="flex flex-row gap-3">
//                     {/* Search Button */}
//                     <button className="h-[44px] w-[250px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center">
//                         <div className="flex flex-row items-center gap-2 pl-2">
//                             <Image
//                                 src="/icons/search-button.svg"
//                                 width={20}
//                                 height={20}
//                                 alt="Search Button"
//                             />
//                             <input
//                                 className="font-normal text-[#667085] text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
//                                 placeholder="Search"
//                                 type="text"
//                             />
//                         </div>
//                     </button>

//                     {/* Select Date Button */}
//                     <button className="h-[44px] w-[143px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center p-3">
//                         <Image
//                             src="/icons/select-date.svg"
//                             width={20}
//                             height={20}
//                             alt="Select-date Button"
//                         />
//                         <span className="font-medium text-sm text-[#667085] ml-2">Select dates</span>
//                     </button>

//                     {/* By Status Button */}
//                     <button className="h-[44px] w-[122px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center p-3">
//                         <span className="font-medium text-sm text-[#667085]">By status</span>
//                         <Image
//                             src="/icons/selectdate-Arrowdown.svg"
//                             width={20}
//                             height={20}
//                             alt="Arrow-Down Button"
//                             className="ml-2"
//                         />
//                     </button>

//                     {/* Create Quiz Button */}
//                     <button className="h-[44px] w-[135px] bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center"

//                         onClick={() => handleTabClick('createquiz', '/admin/content/quizzesmanagement/createquiz')}>
//                         <span className="text-[#FFFFFF] font-semibold text-sm">Create Quiz</span>
//                     </button>
//                 </div>
//             </div>
//             <div className="overflow-y-auto border border-solid border-[#EAECF0] rounded-md">
//                 <table className="w-full bg-white rounded-xl">
//                     <thead>
//                         <tr>
//                             <th className="w-1/4 text-left px-8 py-4 pl-8 rounded-tl-xl text-[#667085] font-medium text-sm">Quizzes</th>
//                             <th className="w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">Questions</th>
//                             <th className="w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">Published on</th>
//                             <th className="w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">Students Attempted</th>
//                             <th className="w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">Status</th>
//                             <th className="w-[7%] text-center px-8 py-4 pr-8 rounded-tr-xl text-[#667085] font-medium text-sm">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {getCurrentPageData().map((item) => (
//                             <tr key={item.id}>
//                                 <td className="w-1/4 text-left px-8 py-4 pl-8 border-t border-t-lightGrey text-[#9012FF] font-semibold text-sm underline">
//                                     {item.title}
//                                 </td>
//                                 <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
//                                     {item.questions}
//                                 </td>
//                                 <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
//                                     {item.publishedDate}
//                                 </td>
//                                 <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
//                                     {item.studentsAttempted}
//                                 </td>
//                                 <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
//                                     <div className="flex justify-center">
//                                         <img
//                                             src={item.status.icon}
//                                             style={{ width: item.status.width }}
//                                             height={24}
//                                             alt={item.status.text}
//                                         />
//                                     </div>
//                                 </td>
//                                 <td className="w-[7%] text-right px-8 py-4 pr-8 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
//                                     <div className="flex justify-end">
//                                         <img
//                                             src="/icons/three-dots.svg"
//                                             className="w-5 h-5"
//                                             alt="Three dots"
//                                         />
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>


//             </div>
//             {/* Pagination */}
//             <div className="flex justify-end py-4 ">
//                 <div className="flex gap-2">
//                     <button
//                         onClick={() => handlePageClick({ selected: currentPage - 1 })}
//                         disabled={currentPage === 0}
//                         className="px-3 py-1 rounded border disabled:opacity-50"
//                     >
//                         Previous
//                     </button>

//                     {Array.from({ length: Math.min(10, pageCount) }, (_, i) => (
//                         <button
//                             key={i}
//                             onClick={() => handlePageClick({ selected: i })}
//                             className={`px-3 py-1 rounded ${currentPage === i
//                                 ? 'bg-[#8501FF] text-white'
//                                 : 'border'
//                                 }`}
//                         >
//                             {i + 1}
//                         </button>
//                     ))}

//                     <button
//                         onClick={() => handlePageClick({ selected: currentPage + 1 })}
//                         disabled={currentPage === pageCount - 1}
//                         className="px-3 py-1 rounded border disabled:opacity-50"
//                     >
//                         Next
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Quizz;
"use client";
import Image from "next/image";
import { Pagination, PaginationItem, PaginationCursor } from "@nextui-org/pagination";
import { useRouter } from "next/navigation";

function Quizz() {
    const router = useRouter();

    // Function to handle tab click and navigate to a new route
    const handleTabClick = (tab: string, path: string) => {
        router.push(path);
    };

    return (
        <div className="flex flex-col px-[32px] mt-4 w-full gap-4">
            <div className="flex flex-row justify-between items-center">
                <span className="text-lg font-semibold text-[#1D2939]">Quizzes</span>

                <div className="flex flex-row gap-3">
                    {/* Search Button */}
                    <button className="h-[44px] w-[250px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center">
                        <div className="flex flex-row items-center gap-2 pl-2">
                            <Image src="/icons/search-button.svg" width={20} height={20} alt="Search Button" />
                            <input
                                className="font-normal text-[#667085] text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
                                placeholder="Search"
                                type="text"
                            />
                        </div>
                    </button>

                    {/* Select Date Button */}
                    <button className="h-[44px] w-[143px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center p-3">
                        <Image src="/icons/select-date.svg" width={20} height={20} alt="Select-date Button" />
                        <span className="font-medium text-sm text-[#667085] ml-2">Select dates</span>
                    </button>

                    {/* By Status Button */}
                    <button className="h-[44px] w-[122px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center p-3">
                        <span className="font-medium text-sm text-[#667085]">By status</span>
                        <Image
                            src="/icons/selectdate-Arrowdown.svg"
                            width={20}
                            height={20}
                            alt="Arrow-Down Button"
                            className="ml-2"
                        />
                    </button>

                    {/* Create Quiz Button */}
                    <button
                        className="h-[44px] w-[135px] bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center"
                        onClick={() => handleTabClick("createquiz", "/admin/content/quizzesmanagement/createquiz")}
                    >
                        <span className="text-[#FFFFFF] font-semibold text-sm">Create Quiz</span>
                    </button>
                </div>
            </div>

            <div className="overflow-y-auto border border-solid border-[#EAECF0] rounded-md">
                <table className="w-full bg-white rounded-xl">
                    <thead>
                        <tr>
                            <th className="w-1/4 text-left px-8 py-4 pl-8 rounded-tl-xl text-[#667085] font-medium text-sm">
                                Quizzes
                            </th>
                            <th className="w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                Questions
                            </th>
                            <th className="w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                Published on
                            </th>
                            <th className="w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                Students Attempted
                            </th>
                            <th className="w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                Status
                            </th>
                            <th className="w-[7%] text-center px-8 py-4 pr-8 rounded-tr-xl text-[#667085] font-medium text-sm">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { name: "Maths", questions: 10, date: "Jan 6, 2024", students: 2147, status: "Saved" },
                            { name: "Maths", questions: 10, date: "Jan 6, 2024", students: 2147, status: "Live" },
                            { name: "Maths", questions: 10, date: "Jan 6, 2024", students: 2147, status: "Cancelled" },
                            { name: "Maths", questions: 10, date: "Jan 6, 2024", students: 2147, status: "Paused" },
                            { name: "Maths", questions: 10, date: "Jan 6, 2024", students: 2147, status: "Scheduled" }
                            { name: "Maths", questions: 10, date: "Jan 6, 2024", students: 2147, status: "Saved" },
                            { name: "Maths", questions: 10, date: "Jan 6, 2024", students: 2147, status: "Live" },
                            { name: "Maths", questions: 10, date: "Jan 6, 2024", students: 2147, status: "Cancelled" },
                            { name: "Maths", questions: 10, date: "Jan 6, 2024", students: 2147, status: "Paused" },
                            { name: "Maths", questions: 10, date: "Jan 6, 2024", students: 2147, status: "Scheduled" }
                        ].map((quiz, index) => (
                            <tr key={index}>
                                <td className="w-1/4 text-left px-8 py-4 pl-8 rounded-bl-xl border-t border-t-lightGrey text-[#9012FF] font-semibold text-sm underline">
                                    {quiz.name}
                                </td>
                                <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
                                    {quiz.questions}
                                </td>
                                <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
                                    {quiz.date}
                                </td>
                                <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
                                    {quiz.students}
                                </td>
                                <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
                                    <div className="flex justify-center">
                                        <Image src={`/icons/${quiz.status}.svg`} width={74} height={24} alt={quiz.status} />
                                    </div>
                                </td>
                                <td className="w-[7%] text-right px-8 py-4 pr-8 rounded-br-xl border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
                                    <div className="flex justify-end">
                                        <Image src="/icons/three-dots.svg" width={20} height={20} alt="Three dots" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className=" flex justify-end">
                <Pagination total={10} initialPage={1} />
            </div>
        </div>
    );
}

export default Quizz;

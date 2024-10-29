// "use client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import ReactPaginate from 'react-paginate';

// function Quizz() {
//     const router = useRouter();
//     // Function to handle tab click and navigate to a new route
//     const handleTabClick = (tab: string, path: string) => {
//         router.push(path);
//     };
//     return (
//         <div className="flex flex-col px-[32px] mt-4 w-full gap-4">
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
//                         <tr className="">
//                             <td className="w-1/4 text-left px-8 py-4 pl-8 rounded-bl-xl border-t border-t-lightGrey text-[#9012FF] font-semibold text-sm underline">Maths</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">10</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">Jan 6, 2024</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">2147</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
//                                 <div className=" flex justify-center">
//                                     <Image
//                                         src="/icons/Saved.svg"
//                                         width={74}
//                                         height={24}
//                                         alt="saved"
//                                     />

//                                 </div>


//                             </td>
//                             <td className="w-[7%] text-right px-8 py-4 pr-8 rounded-br-xl border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
//                                 <div className="flex justify-end">
//                                     <Image
//                                         src="/icons/three-dots.svg"
//                                         width={20}
//                                         height={20}
//                                         alt="Three dots"
//                                     />
//                                 </div>
//                             </td>

//                         </tr>
//                         <tr className="">
//                             <td className="w-1/4 text-left px-8 py-4 pl-8 rounded-bl-xl border-t border-t-lightGrey text-[#9012FF] font-semibold text-sm underline">Maths</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">10</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">Jan 6, 2024</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">2147</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
//                                 <div className=" flex justify-center">
//                                     <Image
//                                         src="/icons/Live.svg"
//                                         width={59}
//                                         height={24}
//                                         alt="saved"
//                                     />

//                                 </div>


//                             </td>
//                             <td className="w-[7%] text-right px-8 py-4 pr-8 rounded-br-xl border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
//                                 <div className="flex justify-end">
//                                     <Image
//                                         src="/icons/three-dots.svg"
//                                         width={20}
//                                         height={20}
//                                         alt="Three dots"
//                                     />
//                                 </div>
//                             </td>

//                         </tr>
//                         <tr className="">
//                             <td className="w-1/4 text-left px-8 py-4 pl-8 rounded-bl-xl border-t border-t-lightGrey text-[#9012FF] font-semibold text-sm underline">Maths</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">10</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">Jan 6, 2024</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">2147</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
//                                 <div className=" flex justify-center">
//                                     <Image
//                                         src="/icons/cancelled.svg"
//                                         width={95}
//                                         height={24}
//                                         alt="saved"
//                                     />

//                                 </div>


//                             </td>
//                             <td className="w-[7%] text-right px-8 py-4 pr-8 rounded-br-xl border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
//                                 <div className="flex justify-end">
//                                     <Image
//                                         src="/icons/three-dots.svg"
//                                         width={20}
//                                         height={20}
//                                         alt="Three dots"
//                                     />
//                                 </div>
//                             </td>

//                         </tr>
//                         <tr className="">
//                             <td className="w-1/4 text-left px-8 py-4 pl-8 rounded-bl-xl border-t border-t-lightGrey text-[#9012FF] font-semibold text-sm underline">Maths</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">10</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">Jan 6, 2024</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">2147</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
//                                 <div className=" flex justify-center">
//                                     <Image
//                                         src="/icons/Paused.svg"
//                                         width={73}
//                                         height={24}
//                                         alt="saved"
//                                     />

//                                 </div>


//                             </td>
//                             <td className="w-[7%] text-right px-8 py-4 pr-8 rounded-br-xl border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
//                                 <div className="flex justify-end">
//                                     <Image
//                                         src="/icons/three-dots.svg"
//                                         width={20}
//                                         height={20}
//                                         alt="Three dots"
//                                     />
//                                 </div>
//                             </td>

//                         </tr>
//                         <tr className="">
//                             <td className="w-1/4 text-left px-8 py-4 pl-8 rounded-bl-xl border-t border-t-lightGrey text-[#9012FF] font-semibold text-sm underline">Maths</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">10</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">Jan 6, 2024</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">2147</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
//                                 <div className=" flex justify-center">
//                                     <Image
//                                         src="/icons/secheduled.svg"
//                                         width={101}
//                                         height={24}
//                                         alt="saved"
//                                     />

//                                 </div>


//                             </td>
//                             <td className="w-[7%] text-right px-8 py-4 pr-8 rounded-br-xl border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
//                                 <div className="flex justify-end">
//                                     <Image
//                                         src="/icons/three-dots.svg"
//                                         width={20}
//                                         height={20}
//                                         alt="Three dots"
//                                     />
//                                 </div>
//                             </td>

//                         </tr>
//                         <tr className="">
//                             <td className="w-1/4 text-left px-8 py-4 pl-8 rounded-bl-xl border-t border-t-lightGrey text-[#9012FF] font-semibold text-sm underline">Maths</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">10</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">Jan 6, 2024</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">2147</td>
//                             <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
//                                 <div className=" flex justify-center">
//                                     <Image
//                                         src="/icons/Finished.svg"
//                                         width={74}
//                                         height={24}
//                                         alt="saved"
//                                     />

//                                 </div>


//                             </td>
//                             <td className="w-[7%] text-right px-8 py-4 pr-8 rounded-br-xl border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
//                                 <div className="flex justify-end">
//                                     <Image
//                                         src="/icons/three-dots.svg"
//                                         width={20}
//                                         height={20}
//                                         alt="Three dots"
//                                     />
//                                 </div>
//                             </td>

//                         </tr>

//                     </tbody>
//                 </table>
//                 <ReactPaginate
//         breakLabel="..."
//         nextLabel="next >"
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={5}
//         pageCount={pageCount}
//         previousLabel="< previous"
//         renderOnZeroPageCount={null}
//       />
//             </div>
//         </div>
//     );
// }

// export default Quizz;
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ReactPaginate from 'react-paginate';

function Quizz() {
    const router = useRouter();

    // Mock data for quizzes (duplicated for pagination)
    const data = Array.from({ length: 50 }, (_, i) => ({
        quizName: `Maths ${i + 1}`,
        questions: 10,
        publishedOn: 'Jan 6, 2024',
        studentsAttempted: 2147,
        status: i % 2 === 0 ? 'Live' : 'Paused'
    }));

    // State to manage current page
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    // Get current page's data
    const offset = currentPage * itemsPerPage;
    const currentData = data.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(data.length / itemsPerPage);

    // Function to handle tab click and navigate to a new route
    const handleTabClick = (tab: string, path: string) => {
        router.push(path);
    };

    // Handle page change
    const handlePageClick = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
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
                    {/* Other buttons omitted for brevity */}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-y-auto border border-solid border-[#EAECF0] rounded-md">
                <table className="w-full bg-white rounded-xl">
                    <thead>
                        <tr>
                            <th className="w-1/4 text-left px-8 py-4 pl-8 rounded-tl-xl text-[#667085] font-medium text-sm">Quizzes</th>
                            <th className="w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">Questions</th>
                            <th className="w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">Published on</th>
                            <th className="w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">Students Attempted</th>
                            <th className="w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">Status</th>
                            <th className="w-[7%] text-center px-8 py-4 pr-8 rounded-tr-xl text-[#667085] font-medium text-sm">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((quiz, index) => (
                            <tr key={index} className="">
                                <td className="w-1/4 text-left px-8 py-4 pl-8 rounded-bl-xl border-t border-t-lightGrey text-[#9012FF] font-semibold text-sm underline">
                                    {quiz.quizName}
                                </td>
                                <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
                                    {quiz.questions}
                                </td>
                                <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
                                    {quiz.publishedOn}
                                </td>
                                <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
                                    {quiz.studentsAttempted}
                                </td>
                                <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
                                    {quiz.status}
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
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={10}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
        </div>
    );
}

export default Quizz;

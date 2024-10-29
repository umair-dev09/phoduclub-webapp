"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Quizz() {
    const router = useRouter();
    // Function to handle tab click and navigate to a new route
    const handleTabClick = (tab: string, path: string) => {
        router.push(path);
    };
    return (
        <div className="mx-[32px] mt-4 w-full h-auto flex overflow-y-auto flex-col ">
            <div className="flex flex-row justify-between items-center">
                <span className="text-lg font-semibold text-[#1D2939]">Quizzes</span>

                <div className="flex flex-row gap-3">
                    {/* Search Button */}
                    <button className="h-[44px] w-[250px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center">
                        <div className="flex flex-row items-center gap-2 pl-2">
                            <Image
                                src="/icons/search-button.svg"
                                width={20}
                                height={20}
                                alt="Search Button"
                            />
                            <input
                                className="font-normal text-[#667085] text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
                                placeholder="Search"
                                type="text"
                            />
                        </div>
                    </button>

                    {/* Select Date Button */}
                    <button className="h-[44px] w-[143px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center p-3">
                        <Image
                            src="/icons/select-date.svg"
                            width={20}
                            height={20}
                            alt="Select-date Button"
                        />
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
                    <button className="h-[44px] w-[135px] bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center"

                        onClick={() => handleTabClick('createquiz', '/admin/content/quizzesmanagement/createquiz')}>
                        <span className="text-[#FFFFFF] font-semibold text-sm">Create Quiz</span>
                    </button>
                </div>
            </div>
            <div className=" bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-md mt-3 flex h-[672px]">
                <table className="w-full rounded-xl bg-white text-sm font-medium">
                    <thead>
                        <tr className="text-[#667085]">
                            <th className="w-[30%] px-8 py-3 text-left">Quizzes</th>
                            <th className="w-[23%] text-center">Questions</th>
                            <th className="w-[23%] text-center">Published on</th>
                            <th className="w-[23%] text-center">Students Attempted</th>
                            <th className="w-[23%] text-center">Status</th>
                            <th className="w-[23%] text-center">Action</th>
                        </tr>
                    </thead>
                    {/* <tbody className="border-b border-[#EAECF0]">
                        <tr className="border-t border-[#EAECF0]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">First 30 mins</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">14</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">8</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">5</td>
                        </tr>

                    </tbody> */}
                </table>





            </div>

        </div>
    );
}

export default Quizz;

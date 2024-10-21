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
        <div className="flex flex-col px-[32px] mt-4 w-full gap-4">
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
            <div className="overflow-y-auto">
                <table className="w-full bg-white rounded-xl">
                    <thead>
                        <tr>
                            <th className="w-1/4 text-left px-8 py-4 pl-8 rounded-tl-xl">Quizzes</th>
                            <th className="w-[17%] text-center px-8 py-4">Questions</th>
                            <th className="w-[17%] text-center px-8 py-4">Published on</th>
                            <th className="w-[17%] text-center px-8 py-4">Students Attempted</th>
                            <th className="w-[17%] text-center px-8 py-4">Status</th>
                            <th className="w-[7%] text-center px-8 py-4 pr-8 rounded-tr-xl">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="">
                            <td className="w-1/4 text-left px-8 py-4 pl-8 rounded-bl-xl border-t border-t-lightGrey">Quizzes</td>
                            <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey">Questions</td>
                            <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey">Published on</td>
                            <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey">Students Attempted</td>
                            <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey">Status</td>
                            <td className="w-[7%] text-center px-8 py-4 pr-8 rounded-br-xl border-t border-t-lightGrey">Action</td>
                        </tr>
                        <tr className="">
                            <td className="w-1/4 text-left px-8 py-4 pl-8 rounded-bl-xl border-t border-t-lightGrey">Quizzes</td>
                            <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey">Questions</td>
                            <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey">Published on</td>
                            <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey">Students Attempted</td>
                            <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey">Status</td>
                            <td className="w-[7%] text-center px-8 py-4 pr-8 rounded-br-xl border-t border-t-lightGrey">Action</td>
                        </tr>
                        <tr className="">
                            <td className="w-1/4 text-left px-8 py-4 pl-8 rounded-bl-xl border-t border-t-lightGrey">Quizzes</td>
                            <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey">Questions</td>
                            <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey">Published on</td>
                            <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey">Students Attempted</td>
                            <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey">Status</td>
                            <td className="w-[7%] text-center px-8 py-4 pr-8 rounded-br-xl border-t border-t-lightGrey">Action</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Quizz;

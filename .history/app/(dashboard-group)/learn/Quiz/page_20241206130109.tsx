import Quiz from "@/components/DashboardComponents/LearnComponents/QuizComponents/Quiz";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import Image from "next/image";

export default function MyQuiz() {

    return (
        <div className="CONTAINER flex flex-1 flex-row">
            {/* Left side - Quizzes */}
            <div className="QUIZZES flex flex-1 flex-col p-8">
                <div className="mb-8">
                    {/* Quiz stats header */}
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-4">
                            <h3 className="flex items-center">Quiz Stats</h3>
                            <div className="flex items-center text-sm">August</div>
                        </div>

                        {/* Filter Popover */}
                        <Popover placement="bottom-end">
                            <PopoverTrigger>
                                <div className="flex w-[102px] h-[2.313rem] bg-white rounded-md px-3 py-2 text-sm justify-between">
                                    <div>All</div>
                                    <div>
                                        <div>
                                            <button>
                                                <Image src='/icons/arrowup.svg' alt="popup" width={20} height={20} />
                                            </button>
                                        </div>
                                        <div className="hidden">
                                            <button>
                                                <Image src='/icons/arrowdown.svg' alt="popup" width={20} height={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="flex flex-col bg-white w-[170px] h-auto px-0 items-start border border-lightGrey rounded-md">

                                <button className="flex w-full px-[10px] py-[10px] hover:bg-[#EAECF0] rounded-t-8">
                                    All
                                </button>
                                <button className="flex w-full px-[10px] py-[10px] hover:bg-[#EAECF0]">
                                    Physics
                                </button>
                                <button className="flex w-full px-[10px] py-[10px] hover:bg-[#EAECF0]">
                                    Chemistry
                                </button>
                                <button className="flex w-full px-[10px] py-[10px] hover:bg-[#EAECF0] rounded-b-8">
                                    Maths
                                </button>

                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Quiz Stats */}
                    <div className="bg-white p-4 flex flex-col rounded-2xl mt-4 border border-lightGrey">
                        <div className="flex flex-row justify-between">
                            {/* Total Questions */}
                            <div className="flex flex-1 flex-row justify-between pr-4">
                                <div className="flex flex-col gap-2">
                                    <div className="font-normal text-xs">Total Questions</div>
                                    <h3 className="text-[15px]">3000</h3>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="w-px bg-lightGrey h-4/5"></div>
                                </div>
                            </div>

                            {/* Attempted Questions */}
                            <div className="flex flex-1 flex-row justify-between pr-4">
                                <div className="flex flex-col gap-2">
                                    <div className="font-normal text-xs">Attempted Questions</div>
                                    <h3 className="text-[15px]">2000</h3>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="w-px bg-lightGrey h-4/5"></div>
                                </div>
                            </div>

                            {/* Time Taken */}
                            <div className="flex flex-1 flex-col gap-2">
                                <div className="font-normal text-xs">Time Taken</div>
                                <h3 className="text-[15px]">80 of 100 hrs</h3>
                            </div>
                        </div>

                        {/* Additional Stats */}
                        <div className="flex flex-row justify-between mt-9">
                            <div className="flex flex-1 flex-row justify-between pr-4">
                                <div className="flex flex-col gap-2">
                                    <div className="font-normal text-xs">Answered Correct</div>
                                    <h3 className="text-[15px]">800</h3>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="w-px bg-lightGrey h-4/5"></div>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-row justify-between pr-4">
                                <div className="flex flex-col gap-2">
                                    <div className="font-normal text-xs">Answered Incorrect</div>
                                    <h3 className="text-[15px]">200</h3>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="w-px bg-lightGrey h-4/5"></div>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col gap-2">
                                <div className="font-normal text-xs">Total Score</div>
                                <h3 className="text-[15px]">568</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Today's Quizzes */}
                <div className="flex flex-1 flex-col">
                    <div className="mb-4">
                        <h3>Todays Quizzes</h3>
                    </div>
                    <div className="flex flex-1">
                        <Quiz />
                    </div>
                </div>
            </div>

            {/* Right side - Leaderboard */}
            <div className="LEADERBOARD w-[360px] bg-white overflow-y-auto p-4 border-l border-l-lightGrey">
                {/* Leaderboard Header */}
                <div className="flex flex-row justify-between">
                    <h3>Leaderboard</h3>
                    <div className="flex items-center text-sm">August</div>
                </div>

                {/* Top 3 Users */}
                <div className="flex flex-row w-full h-40 mt-5 items-end justify-end">
                    <div className="flex flex-1 flex-col items-center justify-end rounded-tl-md bg-[#f9fafb] h-[4.75rem] pb-2">
                        <div className="text-2xl relative bottom-0 left-0">
                            <Image src='/images/DP_Lion.svg' alt="DP" width={51.5} height={51.5} />
                        </div>
                        <div className="relative left-0 bottom-[1rem]">
                            <Image src="/icons/rank-2.svg" alt="1st rank" width={22} height={22} />
                        </div>
                        <div className="text-xs font-semibold">Jerome Bell</div>
                        <div className="text-[0.688rem] font-medium">2876 Score</div>
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-end rounded-t-md bg-[#f2f4f7] h-[6.375rem] mt-3 pb-2">
                        <div className="mb-1 mr-1">
                            <Image src='/icons/actualCrown.svg' alt="crown" width={35.82} height={30} />
                        </div>
                        <div className="text-2xl relative bottom-0 left-0">
                            <Image src='/images/DP_Lion.svg' alt="DP" width={71} height={72} />
                        </div>
                        <div className="relative left-0 bottom-[1rem]">
                            <Image src="/icons/rank-1.svg" alt="1st rank" width={22} height={22} />
                        </div>
                        <div className="text-xs font-semibold">John Smith</div>
                        <div className="text-[0.688rem] font-medium">3000 Score</div>
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-end rounded-tr-md bg-[#f9fafb] h-[4.75rem] pb-2">
                        <div className="text-2xl relative bottom-0 left-0">
                            <Image src='/images/DP_Lion.svg' alt="DP" width={51.5} height={51.5} />
                        </div>
                        <div className="relative left-0 bottom-[1rem]">
                            <Image src="/icons/rank-3.svg" alt="3st rank" width={22} height={22} />
                        </div>
                        <div className="text-xs font-semibold">Robert Fox</div>
                        <div className="text-[0.688rem] font-medium">2706 Score</div>
                    </div>
                </div>

                {/* Remaining Leaderboard Entries */}
                <div className="flex justify-between w-full border-t border-lightGrey px-4 py-3">
                    <div className="flex flex-row gap-2">
                        <div className="flex items-center justify-center">
                            <Image src='/images/DP_Lion.svg' alt="DP" width={40} height={40} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-sm font-semibold">Jenny Wilson</div>
                            <div className="text-[0.813rem] font-medium">2684 Score</div>
                        </div>
                    </div>
                    <h4 className="flex justify-center items-center text-[0.938rem] font-semibold">4</h4>
                </div>

                <div className="flex justify-between w-full border-t border-lightGrey px-4 py-3">
                    <div className="flex flex-row gap-2">
                        <div className="flex items-center justify-center">
                            <Image src='/images/DP_Lion.svg' alt="DP" width={40} height={40} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-sm font-semibold">Robert Fox</div>
                            <div className="text-[0.813rem] font-medium">2684 Score</div>
                        </div>
                    </div>
                    <h4 className="flex justify-center items-center text-[0.938rem] font-semibold">5</h4>
                </div>

                <div className="flex justify-between w-full rounded-md bg-[#f8f0ff] px-4 py-1 my-1">
                    <div className="flex flex-row gap-2">
                        <div className="flex items-center justify-center">
                            <Image src='/images/DP_Lion.svg' alt="DP" width={40} height={40} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-sm font-semibold">You</div>
                            <div className="text-[0.813rem] font-medium">2684 Score</div>
                        </div>
                    </div>
                    <h4 className="flex justify-center items-center text-[0.938rem] font-semibold">10,545</h4>
                </div>
            </div>
        </div>
    );
}

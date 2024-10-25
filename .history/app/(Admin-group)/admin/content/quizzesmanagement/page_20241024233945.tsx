"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Pagination, PaginationCursor, PaginationItem } from "@nextui-org/react";
import { useState, useEffect } from "react";

// Define types for quiz data and response
interface Quiz {
    title: string;
    questions: number;
    date: string;  // Can be Date type if desired
    students: number;
    status: 'Live' | 'Paused' | 'Finished' | 'Scheduled' | 'Cancelled' | 'Saved';
}

interface FetchQuizzesResponse {
    quizzes: Quiz[];
    total: number;
}

// Mock fetchQuizzes function with types
const fetchQuizzes = async (page: number, pageSize: number): Promise<FetchQuizzesResponse> => {
    // Simulate API response with a fixed set of quizzes
    const allQuizzes: Quiz[] = [
        {
            title: 'Maths',
            questions: 10,
            date: 'Jan 6, 2024',
            students: 2147,
            status: 'Live',
        },
        {
            title: 'Science',
            questions: 8,
            date: 'Jan 8, 2024',
            students: 1875,
            status: 'Paused',
        },
        {
            title: 'History',
            questions: 12,
            date: 'Jan 10, 2024',
            students: 1290,
            status: 'Finished',
        },
        {
            title: 'Geography',
            questions: 6,
            date: 'Jan 12, 2024',
            students: 950,
            status: 'Cancelled',
        },
        {
            title: 'Physics',
            questions: 15,
            date: 'Feb 1, 2024',
            students: 1800,
            status: 'Scheduled',
        },
        {
            title: 'Chemistry',
            questions: 9,
            date: 'Feb 3, 2024',
            students: 1600,
            status: 'Live',
        },
        {
            title: 'English Literature',
            questions: 12,
            date: 'Feb 5, 2024',
            students: 1950,
            status: 'Paused',
        },
        {
            title: 'Biology',
            questions: 10,
            date: 'Feb 8, 2024',
            students: 2100,
            status: 'Finished',
        },
        {
            title: 'Computer Science',
            questions: 8,
            date: 'Feb 10, 2024',
            students: 2200,
            status: 'Cancelled',
        },
        {
            title: 'Art History',
            questions: 7,
            date: 'Feb 12, 2024',
            students: 1700,
            status: 'Live',
        },
        {
            title: 'Philosophy',
            questions: 10,
            date: 'Feb 15, 2024',
            students: 1300,
            status: 'Scheduled',
        },
        {
            title: 'Economics',
            questions: 11,
            date: 'Feb 18, 2024',
            students: 1450,
            status: 'Finished',
        },
        {
            title: 'Political Science',
            questions: 9,
            date: 'Feb 20, 2024',
            students: 1900,
            status: 'Paused',
        },
        {
            title: 'Sociology',
            questions: 12,
            date: 'Feb 25, 2024',
            students: 1750,
            status: 'Live',
        },
        {
            title: 'Psychology',
            questions: 8,
            date: 'Mar 1, 2024',
            students: 2000,
            status: 'Cancelled',
        },
        {
            title: 'Environmental Science',
            questions: 7,
            date: 'Mar 3, 2024',
            students: 1500,
            status: 'Scheduled',
        },
        {
            title: 'World History',
            questions: 10,
            date: 'Mar 5, 2024',
            students: 1850,
            status: 'Finished',
        },
        {
            title: 'Statistics',
            questions: 9,
            date: 'Mar 8, 2024',
            students: 1700,
            status: 'Live',
        },
        {
            title: 'Business Studies',
            questions: 8,
            date: 'Mar 10, 2024',
            students: 1400,
            status: 'Paused',
        },
        {
            title: 'Music Theory',
            questions: 6,
            date: 'Mar 12, 2024',
            students: 1200,
            status: 'Cancelled',
        }
    ];

    // Calculate the quizzes to return based on pagination
    const start = (page - 1) * pageSize;
    const paginatedQuizzes = allQuizzes.slice(start, start + pageSize);

    return {
        quizzes: paginatedQuizzes,
        total: allQuizzes.length, // Total number of quizzes
    };
};

function Quizz() {
    const router = useRouter();

    // State for quizzes and pagination
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [totalQuizzes, setTotalQuizzes] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 2; // Set page size to 2 quizzes per page

    // Fetch quizzes when component mounts or currentPage changes
    useEffect(() => {
        const loadQuizzes = async () => {
            const { quizzes, total } = await fetchQuizzes(currentPage, pageSize);
            setQuizzes(quizzes);
            setTotalQuizzes(total);
        };
        loadQuizzes();
    }, [currentPage]);

    // Function to handle tab click and navigate to a new route
    const handleTabClick = (tab: string, path: string) => {
        router.push(path);
    };

    return (
        <div className="flex flex-col px-[32px] w-full gap-4 overflow-y-auto h-auto my-5">
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
                    <button
                        className="h-[44px] w-[135px] bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center"
                        onClick={() => handleTabClick('createquiz', '/admin/content/quizzesmanagement/createquiz')}
                    >
                        <span className="text-[#FFFFFF] font-semibold text-sm">Create Quiz</span>
                    </button>
                </div>
            </div>

            <div className="border border-solid border-[#EAECF0] rounded-md">
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
                        {quizzes.map((quiz, index) => (
                            <tr key={index}>
                                <td className="w-1/4 text-left px-8 py-4 pl-8 rounded-bl-xl border-t border-t-lightGrey text-[#9012FF] font-semibold text-sm underline">{quiz.title}</td>
                                <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">{quiz.questions}</td>
                                <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">{quiz.date}</td>
                                <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">{quiz.students}</td>
                                <td className="w-[17%] text-center px-8 py-4 border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
                                    <div className="flex justify-center">
                                        <Image
                                            src={`/icons/${quiz.status}.svg`}
                                            width={74}
                                            height={24}
                                            alt={quiz.status}
                                        />
                                    </div>
                                </td>
                                <td className="w-[7%] text-right px-8 py-4 pr-8 rounded-br-xl border-t border-t-lightGrey text-[#1D2939] font-normal text-sm">
                                    <div className="flex justify-end">
                                        <Image
                                            src="/icons/three-dots.svg"
                                            width={20}
                                            height={20}
                                            alt="Three dots"
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center">
                {/* Previous Button */}
                <button
                    className="bg-[#E5E5E5] text-[#667085] rounded-md px-4 py-2"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {/* Pagination Control */}
                {/* <Pagination
                    isCompact
                    total={Math.ceil(totalQuizzes / pageSize)}
                    initialPage={currentPage}
                    onChange={(page) => setCurrentPage(page)}
                >
                    {Array.from({ length: Math.ceil(totalQuizzes / pageSize) }, (_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            isActive={currentPage === index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination> */}
                <Pagination
                    isCompact
                    total={Math.ceil(totalQuizzes / pageSize)}
                    initialPage={currentPage}
                    onChange={(page) => setCurrentPage(page)}
                >
                    {Array.from({ length: Math.ceil(totalQuizzes / pageSize) }, (_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            isActive={currentPage === index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`transition-colors duration-200 rounded-full w-8 h-8 flex items-center justify-center mx-2 cursor-pointer ${currentPage === index + 1
                                    ? 'bg-[#8501FF] text-white'
                                    : 'hover:bg-gray-300'
                                }`}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>


                {/* Next Button */}
                <button
                    className="bg-[#E5E5E5] text-[#667085] rounded-md px-4 py-2"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(totalQuizzes / pageSize)))}
                    disabled={currentPage === Math.ceil(totalQuizzes / pageSize)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Quizz;


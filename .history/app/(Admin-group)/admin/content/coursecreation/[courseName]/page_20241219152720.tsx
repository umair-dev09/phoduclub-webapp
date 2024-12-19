"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react"
import CourseContent from "@/components/AdminComponents/CourseMangement/CourseContent";
import StudentsPurchased from "@/components/AdminComponents/CourseMangement/StudentsPurchased";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase"; // Adjust the path based on your project setup
import LoadingData from "@/components/Loading";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { DatePicker } from "@nextui-org/react";
import { now, today, CalendarDate, getLocalTimeZone, parseDateTime } from "@internationalized/date";
import StatusDisplay from "@/components/AdminComponents/StatusDisplay";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import StudentsAttemptedCourseInfo from '@/components/AdminComponents/Courseinfo/StudentsPurchasedCourseInfo';
import DeleteCourse from "@/components/AdminComponents/Courseinfo/DeleteCourse";

type priceprops = {
    Price: number;
    Discountprice: number;
}

type CourseData = {
    courseName: string | null;
    courseDescription: string | null;
    courseImage: string | null;
    price: string | null;
    discountPrice: string | null;
    rating: string | null;
    noOfRating: string | null;
    status: string | null;
};

const StarIcon: React.FC<{ filled: boolean; isHalf: boolean }> = ({ filled, isHalf }) => (
    <Image
        src={filled ? (isHalf ? "/icons/half-star.svg" : "/icons/full-star.svg") : "/icons/empty-star.svg"}
        width={20}
        height={20}
        alt={isHalf ? "half star" : filled ? "full star" : "empty star"}
    />
);

const totalStars = 5;

const RatingStars: React.FC<{ rating: string | null }> = ({ rating }) => {
    // Parse rating and ensure it's a valid number
    const parsedRating = parseFloat(rating || "0");
    const wholeStars = Math.floor(parsedRating); // Count of full stars
    const hasHalfStar = parsedRating % 1 >= 0.1 && parsedRating % 1 < 0.9; // Half star condition
    const emptyStars = totalStars - wholeStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

    return (
        <div className="flex items-center">
            {/* Render full stars */}
            {[...Array(wholeStars)].map((_, index) => (
                <StarIcon key={`filled-${index}`} filled={true} isHalf={false} />
            ))}

            {/* Render half star if applicable */}
            {hasHalfStar && <StarIcon filled={true} isHalf={true} />}

            {/* Render empty stars */}
            {[...Array(emptyStars)].map((_, index) => (
                <StarIcon key={`empty-${index}`} filled={false} isHalf={false} />
            ))}
        </div>
    );
};


function Courses() {
    const [publishDialogOpen, setPublishDialogOpen] = useState(false);
    const searchParams = useSearchParams();
    const courseId = searchParams.get('cId');
    const router = useRouter();
    const [courseData, setCourseData] = useState<CourseData | null>(null);
    const [loading, setLoading] = useState(true); // Track loading state
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [liveCourseNow, setLiveCourseNow] = useState(false);
    const [deleteCourseDialog, setDeleteCourseDialog] = useState(false);

    const isFormValid = endDate;
    // Check if dateString is not empty and in the correct format (YYYY-MM-DD)
    const dateValue = startDate && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(startDate)
        ? parseDateTime(startDate) // Correct format with date and time, use parsed date
        : today(getLocalTimeZone()); // Fallback to today's date if format is incorrect or empty

    const [activeTab, setActiveTab] = useState('CourseContent');

    const handleTabClick = (tabName: React.SetStateAction<string>) => {
        setActiveTab(tabName);
    };

    // Fetch course data from Firestore
    useEffect(() => {
        if (courseId) {
            const fetchCourseData = async () => {
                try {
                    const courseDocRef = doc(db, "course", courseId); // Replace "courses" with your Firestore collection name
                    const courseSnapshot = await getDoc(courseDocRef);
                    if (courseSnapshot.exists()) {
                        setCourseData(courseSnapshot.data() as CourseData);
                    } else {
                        console.error("No course found with the given ID.");
                    }
                } catch (error) {
                    console.error("Error fetching course data:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchCourseData();
        } else {
            setLoading(false);
        }
    }, [courseId]);



    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19); // Converts to the format "YYYY-MM-DDTHH:MM:SS"

    const handlePublishCourse = async () => {
        if (courseId) {
            try {
                const courseRef = doc(db, 'course', courseId); // Reference to the course document

                // Directly update the course document with new data
                await updateDoc(courseRef, {
                    status: liveCourseNow ? 'live' : 'scheduled',
                    publishDate: new Date().toISOString(),
                    startDate: liveCourseNow ? formattedDate : startDate,
                    endDate: endDate,
                });
                toast.success('Course Published Successfully!');
                setPublishDialogOpen(false);
            } catch (error) {
                console.error('Error updating course:', error);
            }
        }


    }


    if (loading) {
        return <LoadingData />
    }

    return (
        <div className="px-[32px] pt-[25px] w-full h-auto overflow-y-auto pb-24 flex flex-col gap-5 ">
            <div className="flex items-center">
                <button className="flex items-center ml-1" onClick={() => router.back()}>
                    <div className="text-[#1D2939] h-[24px] w-auto text-[16px] font-semibold">
                        Courses
                    </div>
                    <div className="ml-3 w-[24px]">
                        <Image src="/icons/course-left.svg" width={6} height={12} alt="left-arrow" />
                    </div>
                </button>
                <div className="text-[#667085] h-full w-auto -ml-1 text-[16px] font-semibold">
                    {courseData?.courseName}
                </div>
            </div>
            {/* Course content */}
            <div className="bg-[#FFFFFF] p-6 border border-solid border-[#EAECF0] rounded-[16px] flex flex-row  gap-6 h-auto items-center justify-center">
                <Image
                    className="min-w-[350px] h-[280px] rounded-[16px] object-cover"
                    src={courseData?.courseImage || "/icons/image.png"}
                    width={437}
                    height={271}
                    alt="course-image" />
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-row justify-between items-center h-[40px]">
                        <StatusDisplay status={courseData?.status || ''} />
                        <div className="flex flex-row gap-2">
                            {/* FOR SAVED--> */}
                            {courseData?.status === 'saved' && (
                                <>
                                    <button className="w-auto p-3 gap-2  hover:bg-[#F2F4F7] flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center">
                                        <Image src="/icons/publish-quiz.svg" width={18} height={18} alt="publish-quiz" />
                                        <span className="text-sm text-[#0C111D] font-normal">Publish</span>
                                    </button>
                                </>
                            )}
                            {courseData?.status === 'live' && (
                                <>
                                    {/* Button for Pause  */}
                                    <button className="w-auto p-3 gap-2 flex-row flex  hover:bg-[#F2F4F7] bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                                    // onClick={() => setIsPausedDialogOpen(true)}
                                    >
                                        <Image src="/icons/pausequiz.svg" width={18} height={18} alt="Paused-icon" />
                                        <span className="text-sm text-[#0C111D] font-normal">Pause</span>
                                    </button>
                                    {/* Button for End */}
                                    <button className="w-auto p-3 gap-2 flex-row flex hover:bg-[#F2F4F7] bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                                    // onClick={() => setIsEndDialogOpen(true)}
                                    >
                                        <Image src="/icons/endquiz.svg" width={18} height={18} alt="End-icon" />
                                        <span className="text-sm text-[#DE3024]  font-normal">End</span>
                                    </button>
                                </>
                            )}


                            {courseData?.status === 'paused' && (
                                <>
                                    {/* Button for Resume  */}
                                    <button
                                        className="w-auto p-3 gap-2 flex-row flex  hover:bg-[#F2F4F7] rounded-[8px] h-[40px] items-center"
                                    // onClick={() => setIsResumeOpen(true)}
                                    >
                                        <Image src="/icons/resume.svg" width={18} height={18} alt="Resume -icon" />
                                        <span className="text-sm text-[#9012FF]  font-medium">Resume</span>
                                    </button>
                                    {/* Button for Scheduled  */}
                                    <button
                                        className="w-auto p-3 gap-2 flex-row flex hover:bg-[#F2F4F7] bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                                    // onClick={() => setIsScheduledDialogOpen(true)}
                                    >
                                        <Image src="/icons/select-date.svg" width={18} height={18} alt="Calendar" />
                                        <span className="text-sm text-[#0C111D]  font-medium">Schedule</span>
                                    </button>
                                </>
                            )}

                            {courseData?.status === 'finished' && (
                                <>
                                    {/* Button for Delete */}
                                    <button
                                        className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] hover:bg-[#F2F4F7] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                                    // onClick={() => setIsDeleteDialogOpen(true)}
                                    >
                                        <Image src="/icons/delete.svg" width={18} height={18} alt="Delete" />
                                        <span className="text-sm text-[#DE3024]  font-medium">Delete</span>
                                    </button>
                                </>
                            )}

                            {(courseData?.status === 'scheduled' || courseData?.status === 'saved' || courseData?.status === 'paused') && (
                                <>
                                    <Popover placement="bottom-end">
                                        <PopoverTrigger>
                                            <button
                                                className="w-10 p-[10px] h-[40px] gap-1 flex-row  hover:bg-[#F2F4F7] flex  bg-[#FFFFFF] rounded-md  focus:outline-none
                                        border border-solid border-[#EAECF0] shadow-none">
                                                <Image src="/icons/three-dots.svg" width={18} height={18} alt="three-dots" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[10.438rem] py-1 px-0 bg-white border border-lightGrey rounded-md">
                                            <button className="flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]"
                                                onClick={() => router.push(`/admin/content/coursecreation/createcourse/?s=${courseData.status}&cId=${courseId}`)}>
                                                <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-icon" />
                                                <p className="text-sm text-[#0C111D] font-normal">Edit</p>
                                            </button>
                                            <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]"
                                                onClick={() => setDeleteCourseDialog(true)}
                                            >
                                                <Image src='/icons/delete.svg' alt="Delete-icon" width={18} height={18} />
                                                <p className="text-sm text-[#DE3024] font-normal">Delete</p>
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </>
                            )}
                        </div>
                    </div>
                    {courseData?.status === 'scheduled' && (
                        <div className="flex flex-row gap-2">
                            <div className="bg-[#EAECF0] rounded-[8px] p-2 flex flex-row gap-1">
                                <Image
                                    src="/icons/information-circle.svg"
                                    width={20}
                                    height={20}
                                    alt="information-icon"
                                />
                                <span className="text-[#475467] font-normal text-[13px]">Course will be live on 12 Jan, 2024   05:30 PM</span>
                            </div>
                            <button
                            >
                                <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-icon" />
                            </button>
                        </div>
                    )}

                    <span className="text-[#1D2939] font-bold text-lg">{courseData?.courseName}</span>
                    <div className=' text-[#667085] text-sm font-normal break-all' dangerouslySetInnerHTML={{
                        __html: courseData?.courseDescription || '',
                    }} />
                    {/* this code below is for rating  */}
                    <div className="flex items-center gap-2 flex-row h-[24px] ">
                        <RatingStars rating={courseData?.rating || ''} />
                        <div className="text-[#1D2939] text-sm font-bold flex items-center flex-row">
                            {courseData?.rating || 0}
                            <span className="text-[#1D2939] font-normal text-sm ml-1">
                                <span className="flex items-center">
                                    <span className="inline-block">({courseData?.noOfRating + '+'}</span>
                                    <span className="inline-block">Ratings)</span>
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <div className="text-[#1D2939] text-2xl font-bold">
                            ₹{courseData?.discountPrice && new Intl.NumberFormat('en-IN').format(parseFloat(courseData.discountPrice))}
                        </div>
                        <div className="text-[#667085] text-base font-normal line-through">
                            ₹{courseData?.price && new Intl.NumberFormat('en-IN').format(parseFloat(courseData.price))}
                        </div>
                        {courseData?.price && courseData?.discountPrice && (
                            <div className="bg-[#DB6704] w-[76px] h-[25px] flex items-center justify-center rounded-full text-white text-xs font-semibold">
                                {`${Math.round(
                                    ((parseFloat(courseData.price) - parseFloat(courseData.discountPrice)) /
                                        parseFloat(courseData.price)) *
                                    100
                                )}% off`}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* <div className="flex flex-col">
                <div className="relative flex">
                    <div className="pt-[10px]">
                        <button
                            onClick={() => handleTabClick('CourseContent')}
                            className={`relative py-2 pr-4 text-base transition  text-[16px] font-semibold duration-200 ${activeTab === 'CourseContent' ? 'text-[#7400E0]' : 'text-[#667085] hover:text-[#7400E0]'
                                } focus:outline-none`}>
                            Course Content
                        </button>
                    </div>
                    <div className="pt-[10px]">
                        <button
                            onClick={() => handleTabClick('StudentsPurchased ')}
                            className={`relative py-2 px-4 text-base transition text-[16px] font-semibold duration-200 ${activeTab === 'StudentsPurchased ' ? 'text-[#7400E0]' : 'text-[#667085] hover:text-[#7400E0]'
                                } focus:outline-none`}>
                            Students Purchased
                            <span
                                className="ml-2 px-2 py-[0px] text-[#9012FF] bg-[#EDE4FF] rounded-full relative"
                                style={{ fontSize: '14px', fontWeight: '500', minWidth: '24px', textAlign: 'center', top: '-1px' }}
                            >10</span>
                        </button>
                    </div>
                    <div
                        className="absolute bg-[#7400E0] transition-all duration-300"
                        style={{
                            height: '1.8px',
                            width: activeTab === 'CourseContent' ? '123px' : '195px', // Adjusted width to match the text
                            left: activeTab === 'CourseContent' ? '0px' : '157px', // Adjust left position to match each button
                            bottom: '-8px',
                        }}
                    />
                </div>
                <hr className="h-px bg-[#EAECF0] mt-2" />
            </div>
            {activeTab === 'CourseContent' && (
                <div>
                    <CourseContent courseId={courseId || ''} />
                </div>
            )}
            {activeTab === 'StudentsPurchased ' && (
                <div>
                    <StudentsAttemptedCourseInfo />
                </div>
            )} */}

            <Dialog open={publishDialogOpen} onClose={() => setPublishDialogOpen(false)} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-auto h-auto">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-row items-center justify-between px-6 pb-4 pt-5">
                                <h3 className="text-2xl font-semibold text-[#1D2939]">Publish Course</h3>
                                <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                    <button onClick={() => setPublishDialogOpen(false)} className="">
                                        <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                    </button>
                                </button>
                            </div>
                            <div className='flex flex-row w-[600px] gap-5 px-6'>
                                <div className='flex flex-col w-1/2 gap-1'>
                                    <span className='font-medium text-[#1D2939] text-sm'>Start Date & Time</span>
                                    <DatePicker
                                        granularity="minute"
                                        isDisabled={liveCourseNow}  // Disable the DatePicker if liveQuizNow is true
                                        minValue={today(getLocalTimeZone())}
                                        showMonthAndYearPickers
                                        onChange={(date) => {
                                            // Convert the date object to a string in your desired format
                                            const dateString = date ? date.toString() : ""; // Customize format if needed
                                            setStartDate(dateString);

                                        }}
                                    />

                                </div>
                                <div className='flex flex-col w-1/2 gap-1'>
                                    <span className='font-medium text-[#1D2939] text-sm'>End Date & Time</span>
                                    <DatePicker
                                        granularity="minute"
                                        minValue={dateValue}
                                        showMonthAndYearPickers
                                        onChange={(date) => {
                                            // Convert the date object to a string in your desired format
                                            const dateString = date ? date.toString() : ""; // Customize format if needed
                                            setEndDate(dateString);
                                        }}
                                    />
                                </div>
                            </div>

                            <div
                                className="flex flex-row items-center w-auto py-1 gap-2 cursor-pointer transition-colors px-[28px]"
                                onClick={() => setLiveCourseNow(liveCourseNow => !liveCourseNow)}
                            >
                                <div
                                    className={`flex items-center justify-center w-4 h-4 border border-[#D0D5DE] rounded-sm ${liveCourseNow ? 'bg-purple border-purple' : 'bg-white'}`}
                                >
                                    {liveCourseNow && (
                                        <Image src="/icons/check.svg" alt="choose" width={12} height={12} />
                                    )}
                                </div>
                                <p className="text-sm text-[#0C111D] font-medium">Make the Course live now</p>
                            </div>

                            <hr />
                            <div className="flex flex-row justify-end mx-6 my-2 items-center gap-4 pb-2">
                                <button onClick={() => setPublishDialogOpen(false)} className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm hover:bg-[#F2F4F7]">Cancel</button>
                                <button
                                    onClick={() => handlePublishCourse()}
                                    disabled={!isFormValid}
                                    className={`py-[0.625rem] px-6 text-white shadow-inner-button border border-white ${!isFormValid ? 'bg-[#CDA0FC]' : 'bg-[#9012FF]'} rounded-md font-semibold text-sm`}>
                                    Publish Course
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            <ToastContainer />
            {deleteCourseDialog && <DeleteCourse open={deleteCourseDialog} onClose={() => setDeleteCourseDialog(false)} courseId={courseId || ''} courseName={courseData?.courseName || ''} />}
        </div>
    )
}
export default Courses;









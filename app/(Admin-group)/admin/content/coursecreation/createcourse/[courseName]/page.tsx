"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react"
import CourseContent from "@/components/AdminComponents/CourseMangement/CourseContent";
import StudentsPurchased from "@/components/AdminComponents/CourseMangement/StudentsPurchased";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase"; // Adjust the path based on your project setup
import LoadingData from "@/components/Loading";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
type priceprops ={
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


function courses() {
    const [isprice, setIsprice] = useState("");
    const searchParams = useSearchParams();
    const courseId = searchParams.get('cId');
    const router = useRouter();
    const [courseData, setCourseData] = useState<CourseData | null>(null); 
    const [loading, setLoading] = useState(true); // Track loading state
   
    // ----------------------------------------------------------------------------------------
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

if(loading){
    return <LoadingData />
} 

    return (
        <div className="px-[32px] pt-[25px] w-full h-auto overflow-y-auto pb-24 flex flex-col gap-5 ">
            {/* Course content */}
            <div className="bg-[#FFFFFF] p-6 border border-solid border-[#EAECF0] rounded-[16px] flex flex-row  gap-6 h-auto">
                <Image
                  className="w-[440px] h-[280px] rounded-[16px]"
                    src={courseData?.courseImage || "/icons/image.png"}
                    width={437}
                    height={271}
                    alt="left-arrow" />
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-row justify-between items-center h-[40px]">
                        <div className="bg-[#F2F4F7] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                            <span className="w-[6px] h-[6px] bg-[#182230] rounded-full "></span>
                            <span className="font-medium text-[#182230] text-xs">{courseData?.status}</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                            >
                                <Image src="/icons/publish-quiz.svg" width={18} height={18} alt="publish-quiz" />
                                <span className="text-sm text-[#0C111D] font-normal">Publish</span>
                            </button>
                            <button
                                className="w-10 p-[10px] h-[40px] gap-1 flex-row flex  bg-[#FFFFFF] rounded-md 
                                        border border-solid border-[#EAECF0] shadow-none"
                                style={{ outline: "none" }}
                            >
                                <Image src="/icons/three-dots.svg" width={18} height={18} alt="three-dots" />
                            </button>
                        </div>
                    </div>
                    <span className="text-[#1D2939] font-bold text-lg">{courseData?.courseName}</span>
                    <div className=' text-[#667085] text-sm font-normal ' dangerouslySetInnerHTML={{
                    __html: courseData?.courseDescription || '',
                }}/>
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
            <div className="flex flex-col">
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
                    <CourseContent courseId={courseId || ''}/>
                </div>
            )}
            {activeTab === 'StudentsPurchased ' && (
                <div>
                    < StudentsPurchased />
                </div>
            )}

        <ToastContainer/>
        </div>
    )
}
export default courses;









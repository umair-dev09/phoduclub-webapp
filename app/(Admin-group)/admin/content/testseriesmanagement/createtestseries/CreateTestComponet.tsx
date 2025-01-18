'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import Image from "next/image";
import TestSeriesInfo from "@/components/AdminComponents/TestSeriesComponents/TestSeriesInfo";
import Sections from "@/components/AdminComponents/TestSeriesComponents/Sections";
import Review from "@/components/AdminComponents/TestSeriesComponents/Review";
import Perference from "@/components/AdminComponents/TestSeriesComponents/Perference";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { collection, addDoc, updateDoc, doc, getDoc, getDocs, writeBatch, arrayUnion, arrayRemove } from 'firebase/firestore';
import { auth, storage, db } from '@/firebase'; // Adjust path if needed
import LoadingData from "@/components/Loading";
import { set } from "date-fns";

// Define an enum for the steps with updated names
enum Step {
    TestSeriesInfo = 0,
    Sections = 1,
    Review = 2,
    Perference = 3,
}
type Option = {
    value: string;
    label: string;
};

const CreateTestSeries = () => {
    const [sectionScheduleDate, setSectionScheduleDate] = useState<string>("");
    const [sectionName, setSectionName] = useState<string>("");
    const [isPublished, setIsPublished] = useState(false);
    const [currentStep, setCurrentStep] = useState<Step>(Step.TestSeriesInfo);
    const [name, setName] = useState('');
    const [originalName, setOriginalName] = useState('');
    const [originalDescription, setOriginalDescription] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [originalImage, setOriginalImage] = useState('');
    const [price, setPrice] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    const [originalDiscountPrice, setOriginalDiscountPrice] = useState('');
    const [rating, setRating] = useState('');
    const [originalRating, setOriginalRating] = useState('');
    const [noOfRating, setNoOfRating] = useState('');
    const [originalNoOfRating, setOriginalNoOfRating] = useState('');
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    const [isCreateSection, setIsCreateSection] = useState(false);
    const searchParams = useSearchParams();
    const testId = searchParams.get('tId');
    const status = searchParams.get('s');
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    let [liveQuizNow, setLiveQuizNow] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [isSectionEditing, setIsSectionEditing] = useState(false);
    const [isInCourse, setIsInCourse] = useState<boolean>(false);
    const [originalIsInCourse, setOriginalIsInCourse] = useState<boolean>(false);
      const [coursesList, setCoursesList] = useState<Option[]>([]);
      const [selectedCourses, setSelectedCourses] = useState<Option[]>([]);
      const [originalSelectedCourses, setOriginalSelectedCourses] = useState<Option[]>([]);
     const [selectedYears, setSelectedYears] = useState<Option[]>([]);
     const [selectedExams, setSelectedExams] = useState<Option[]>([]);

        
      useEffect(() => {
        const fetchCourses = async () => {
            try {
                const coursesSnapshot = await getDocs(collection(db, "course"));
                const coursesData = coursesSnapshot.docs.map(doc => ({
                    value: doc.id,
                    label: doc.data().courseName
                }));
                setCoursesList(coursesData);
            } catch (error) {
                console.error("Error fetching courses:", error);
                toast.error("Error loading courses.");
            }
        };
        fetchCourses();
    }, []);
      
    const router = useRouter();

    useEffect(() => {
        if (testId) {
            fetchTestData(testId);
        }

    }, [testId]);

   

    const fetchTestData = async (testId: string) => {
        setLoading(true);
        try {
            const testDocRef = doc(db, "testseries", testId);
            const testDocSnap = await getDoc(testDocRef);

            if (testDocSnap.exists()) {
                const testData = testDocSnap.data();
                setName(testData.testName || "");
                setDescription(testData.testDescription || "");
                setImage(testData.testImage || "");
                setOriginalImage(testData.testImage || "");
                setOriginalName(testData.testName || "");
                setOriginalDescription(testData.testDescription || "");
                setStartDate(testData.startDate || "");
                setEndDate(testData.endDate || "");
                setPrice(testData.price || "");
                setOriginalPrice(testData.price || "");
                setDiscountPrice(testData.discountPrice || "");
                setOriginalDiscountPrice(testData.discountPrice || "");
                setRating(testData.rating || "");
                setOriginalRating(testData.rating || "");
                setNoOfRating(testData.noOfRating || "");
                setOriginalNoOfRating(testData.noOfRating || "");
                setLoading(false);
                setIsInCourse(testData.isInCourse || false);
                setOriginalIsInCourse(testData.isInCourse || false);
                setSelectedCourses(testData.selectedCourses || []);
                setOriginalSelectedCourses(testData.selectedCourses || []);
                
                if(testData.forExams){
                    const defaultExams = testData.forExams.map((years: any) => ({
                        value: years,
                        label: years,
                    }));
                    setSelectedExams(defaultExams);
                }
                if(testData.forYears){
                    const defaultYears = testData.forYears.map((years: any) => ({
                        value: years,
                        label: years,
                    }));
                    setSelectedYears(defaultYears);
                }
            } else {
                toast.error("Test series not found!");
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching test data:", error);
            toast.error("Error loading test data.");
        }
    };
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19); // Converts to the format "YYYY-MM-DDTHH:MM:SS"
    const handleNextClick = async () => {

        if (currentStep === Step.Perference) {
            if (testId) {
                try {
                    const testRef = doc(db, "testseries", testId);

                    // Prepare updated quiz data
                    const testData = {
                        startDate: liveQuizNow ? formattedDate : startDate,
                        endDate,
                        status: liveQuizNow ? "live" : "scheduled", // You can change this as needed
                        forExams: selectedExams.map(exam => exam.value),
                        forYears: selectedYears.map(year => year.value),
                    };

                    // Update the existing quiz data
                    await updateDoc(testRef, testData);
                    setStartDate('');
                    setEndDate('');
                    setLiveQuizNow(false);
                    setSelectedExams([]);
                    setSelectedYears([]);
                    toast.success('Test Series updated succesfully!');
                    setTimeout(() => {
                        router.back();
                    }, 500);
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
        else if (currentStep < Step.Sections) {
            if (testId) {
                setCurrentStep(currentStep + 1);
            }
            else {
                toast.promise(
                    new Promise(async (resolve, reject) => {
                        try {
                            const docRef = await addDoc(collection(db, 'testseries'), {
                                testName: name,
                                testDescription: description,
                                testImage: image,
                                price: !isInCourse ? price : null,
                                discountPrice: !isInCourse ? discountPrice : null,
                                rating: !isInCourse ? rating : null,
                                noOfRating:  !isInCourse ? noOfRating : null,
                                publishDate: new Date().toISOString(),
                                status: 'saved',
                                isInCourse: isInCourse,
                                selectedCourses: selectedCourses,
                                createdBy: userId,
                            });

                            await updateDoc(doc(db, 'testseries', docRef.id), {
                                testId: docRef.id,
                            });

                            if (isInCourse) {
                                const batch = writeBatch(db);
                                selectedCourses.forEach(course => {
                                    const courseRef = doc(db, 'course', course.value);
                                    batch.update(courseRef, {
                                        bundleTestIds: arrayUnion(docRef.id),
                                        hasTests: true,
                                    });
                                });
                                await batch.commit();
                            }
                            resolve("Test Series Created!");
                            setCurrentStep(currentStep + 1);
                            router.replace(`/admin/content/testseriesmanagement/createtestseries/?tId=${docRef.id}`)
                        } catch (error) {
                            reject("Failed to Create Test Series!")
                            // Handle errors in both image upload and Firestore update
                            // toast.error("Failed to upload image or update profile.");
                            console.error("Error:", error);
                        }

                    }),
                    {
                        pending: 'Creating Test Series...',
                        success: 'Test Series Created!',
                        error: 'Error Creating Test Series'
                    }
                );
            }
        }

        else if (currentStep < Step.Perference) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePreviousClick = () => {
        if (currentStep > Step.TestSeriesInfo) {
            setCurrentStep(currentStep - 1);
        }
    };

    const isFormValid = () => {
        if (currentStep === Step.TestSeriesInfo) {
            return name.trim() !== '' && description.trim() !== '' && image.trim() !== '' && (isInCourse ? (selectedCourses.length >= 1) : (price.trim() !== '' && discountPrice.trim() !== ''  && rating.trim() !== '' && noOfRating.trim() !== ''));
        }
        else if (currentStep === Step.Perference) {
            return endDate.trim() !== '' && selectedExams.length >= 1 && selectedYears.length >= 1; 
        }
        else {
            return true;
        }
    };

    const isNextButtonDisabled = !isFormValid();

    const handleBackClick = () => {
        router.back(); // Navigate to the previous page in the browser history
    };



    const renderStepContent = () => {
        switch (currentStep) {
            case Step.TestSeriesInfo:
                return <TestSeriesInfo selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} coursesList={coursesList} isInCourse={isInCourse} setIsInCourse={setIsInCourse} name={name} setName={setName} description={description} setDescription={setDescription} imageUrl={image} setImageUrl={setImage} price={price} setPrice={setPrice} discountPrice={discountPrice} setDiscountPrice={setDiscountPrice} rating={rating} setRating={setRating} noOfRating={noOfRating} setNoOfRating={setNoOfRating} />;
            case Step.Sections:
                return <Sections isCreateSection={isCreateSection} setIsCreateSection={setIsCreateSection} testId={testId || ''} sectionName={sectionName} sectionScheduleDate={sectionScheduleDate} setSectionName={setSectionName} setSectionScheduleDate={setSectionScheduleDate} isSectionEditing={isSectionEditing} setIsSectionEditing={setIsSectionEditing} />;
            case Step.Review:
                return <Review testId={testId || ''} name={name} description={description} testImage={image} price={price} discountPrice={discountPrice} rating={rating} noOfRating={noOfRating} />;
            case Step.Perference:
                return <Perference selectedExams={selectedExams} setSelectedExams={setSelectedExams} selectedYears={selectedYears} setSelectedYears={setSelectedYears} startDate={startDate} endDate={endDate} setEndDate={setEndDate} setLiveQuizNow={setLiveQuizNow} liveQuizNow={liveQuizNow} setStartDate={setStartDate} />;
            default:
                return <TestSeriesInfo  selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses}  coursesList={coursesList} isInCourse={isInCourse} setIsInCourse={setIsInCourse} name={name} setName={setName} description={description} setDescription={setDescription} imageUrl={image} setImageUrl={setImage} price={price} setPrice={setPrice} discountPrice={discountPrice} setDiscountPrice={setDiscountPrice} rating={rating} setRating={setRating} noOfRating={noOfRating} setNoOfRating={setNoOfRating} />;
        }
    };

    const getStepStyles = (step: Step) => {
        if (currentStep > step) {
            return "bg-[#9012FF]";
        } else if (currentStep === step) {
            return "bg-[#9012FF] ring-4 ring-[#E8DFFB]";
        } else {
            return "border-2 border-[#D0D5DE]";
        }
    };



    if (loading) {
        return <LoadingData />
    }

    return (
        <div className="flex flex-row flex-1 ">
            <div className="ml-8 w-[17.125rem] my-8 bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-md overflow-y-auto">
                <div className="flex flex-row items-center justify-between m-4">
                    <span className="text-[#1D2939] text-base font-semibold">Create Test Series</span>
                    <div className="flex items-center justify-center w-10 h-8 text-sm text-[#475467] font-medium bg-[#F9FAFB] border border-lightGrey rounded-[6px]">
                        {currentStep + 1}/4
                    </div>
                </div>
                <div className="flex flex-col mx-4">
                    {["Test Series Info", "Sections", "Review", "Perference"].map((label, index) => (
                        <div key={index}>
                            <div className="flex flex-row items-center mr-2 gap-2">
                                <div className={`flex items-center justify-center w-8 h-8 transition-all ${getStepStyles(index as Step)} rounded-full`}>
                                    {currentStep > index ? (
                                        <Image src='/icons/Tick.svg' alt="done" width={16} height={14.01} />
                                    ) : (
                                        <div className={`${currentStep === index ? "bg-white" : "bg-[#D0D5DE]"} w-[0.625rem] h-[0.625rem] rounded-full`}></div>
                                    )}
                                </div>
                                <p className={`text-sm font-semibold transition-all ${currentStep === index ? "text-[#9012FF]" : "text-[#344054]"}`}>{label}</p>
                            </div>
                            {index < Step.Perference && (
                                <div className={`w-0 h-5 my-1 ml-[15px] transition-all ${currentStep > index ? "border-[#9012FF]" : "border-lightGrey"} border rounded-full`}></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col w-full ml-[20px]  mt-8 ">
                <div className="h-15 ml-1 w-full border-b border-solid border-[#D0D5DD] ">
                    <div className="flex flex-row justify-between pr-6">
                        <span className="text-lg font-semibold text-[#1D2939] flex items-center">
                            {["Test Series Info", "Sections", "Review", "Perference"][currentStep]}
                        </span>
                        <div className="flex flex-row gap-3 mb-3">
                            {testId && (isInCourse ? (selectedCourses.length >= 1) : (price.trim() !== '' && discountPrice.trim() !== '' && rating.trim() !== '' && noOfRating.trim() !== '' ) )  && (
                                name !== originalName || description !== originalDescription || image !== originalImage || price !== originalPrice || discountPrice !== originalDiscountPrice || rating !== originalRating || noOfRating !== originalNoOfRating || isInCourse !== originalIsInCourse || selectedCourses !== originalSelectedCourses 
                            ) && (
                                <button
                                    onClick={async () => {
                                        try {
                                            const testRef = doc(db, "testseries", testId);
                                            await updateDoc(testRef, {
                                                testName: name,
                                                testDescription: description,
                                                testImage: image,
                                                price: !isInCourse ? price : null,
                                                discountPrice: !isInCourse ? discountPrice : null,
                                                rating: !isInCourse ? rating : null,
                                                noOfRating:  !isInCourse ? noOfRating : null,
                                                isInCourse: isInCourse,
                                                selectedCourses: isInCourse ? selectedCourses : [],
                                            });

                                            const batch = writeBatch(db);

                                            if (isInCourse) {
                                                // Get arrays of course IDs
                                                const newCourseIds = selectedCourses.map(c => c.value);
                                                const oldCourseIds = originalSelectedCourses.map(c => c.value);
                                                
                                                // Add testId to newly selected courses
                                                selectedCourses.forEach(course => {
                                                    if (!oldCourseIds.includes(course.value)) {
                                                        const courseRef = doc(db, 'course', course.value);
                                                        batch.update(courseRef, {
                                                            bundleTestIds: arrayUnion(testId),
                                                            hasTests: true,
                                                        });
                                                    }
                                                });

                                                // Remove testId from unselected courses
                                                originalSelectedCourses.forEach(course => {
                                                    if (!newCourseIds.includes(course.value)) {
                                                        const courseRef = doc(db, 'course', course.value);
                                                        batch.update(courseRef, {
                                                            bundleTestIds: arrayRemove(testId),
                                                            hasTests: false,
                                                        });
                                                    }
                                                });
                                            } else {
                                                // Remove testId from all previously selected courses
                                                originalSelectedCourses.forEach(course => {
                                                    const courseRef = doc(db, 'course', course.value);
                                                    batch.update(courseRef, {
                                                        bundleTestIds: arrayRemove(testId),
                                                        hasTests: false,
                                                    });
                                                });
                                            }

                                            await batch.commit();
                                            
                                            setOriginalName(name);
                                            setOriginalDescription(description);
                                            setOriginalImage(image);
                                            setOriginalPrice(price);
                                            setOriginalDiscountPrice(discountPrice);
                                            setOriginalRating(rating);
                                            setOriginalNoOfRating(noOfRating);
                                            setOriginalIsInCourse(isInCourse);
                                            setOriginalSelectedCourses(selectedCourses);
                                            toast.success('Changes saved successfully!');
                                        } catch (error) {
                                            console.error("Error saving changes:", error);
                                            toast.error('Failed to save changes');
                                        }
                                    }}
                                    className="flex flex-row gap-1 items-center h-[44px] w-auto justify-center mr-1"
                                >
                                    <span className="text-[#9012FF] font-semibold text-sm">Save Changes</span>
                                </button>
                            )}
                            {currentStep === Step.Sections && (
                                <button
                                    onClick={() => { setIsCreateSection(true); setSectionName(''); setSectionScheduleDate(''); setIsSectionEditing(false) }}
                                    className="flex flex-row gap-1 items-center h-[44px] w-auto justify-center mr-1"
                                >
                                    <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                                    <span className="text-[#9012FF] font-semibold text-sm">Add Section</span>
                                </button>
                            )}
                            {currentStep > Step.TestSeriesInfo && (
                                <button
                                    className="h-[44px] w-[135px] bg-[#FFFFFF] rounded-md shadow-inner-button border border-solid border-[#EAECF0] flex items-center justify-center"
                                    onClick={handlePreviousClick}
                                >
                                    <span className="text-[#1D2939] font-semibold text-sm">Previous</span>
                                </button>
                            )}
                            {/* {(currentStep !== Step.Perference || status === 'saved') && ( */}
                            <button
                                className={`h-[44px] w-[135px] rounded-md shadow-inner-button border text-white ${currentStep === Step.Review ? 'mr-7' : ''} ${isNextButtonDisabled ? 'opacity-35' : 'opacity-100 hover:bg-[#6D0DCC]'} transition-all duration-150 border-[#800EE2] bg-[#8501FF] `}
                                onClick={handleNextClick}
                                disabled={isNextButtonDisabled}
                            >
                                <span className="font-semibold text-sm text-[#FFFFFF]">
                                    {(currentStep === Step.Perference && status !== 'saved') ? 'Save' : currentStep === Step.Perference ? "Publish" : "Next"}
                                </span>
                            </button>
                            {/* )} */}
                        </div>
                    </div>
                </div>
                <div className="overflow-y-auto h-full pr-8">
                    {renderStepContent()}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default CreateTestSeries;
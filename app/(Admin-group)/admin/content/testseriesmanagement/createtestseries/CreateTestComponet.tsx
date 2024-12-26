import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import Image from "next/image";
import TestSeriesInfo from "@/components/AdminComponents/TestSeriesComponents/TestSeriesInfo";
import Sections from "@/components/AdminComponents/TestSeriesComponents/Sections";
import Review from "@/components/AdminComponents/TestSeriesComponents/Review";
import Perference from "@/components/AdminComponents/TestSeriesComponents/Perference";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import { auth, storage, db } from '@/firebase'; // Adjust path if needed
import LoadingData from "@/components/Loading";

// Define an enum for the steps with updated names
enum Step {
    TestSeriesInfo = 0,
    Sections = 1,
    Review = 2,
    Perference = 3,
}

const CreateTestSeries = () => {
    const [sectionScheduleDate, setSectionScheduleDate] = useState<string>("");
    const [sectionName, setSectionName] = useState<string>("");
    const [isPublished, setIsPublished] = useState(false);
    const [currentStep, setCurrentStep] = useState<Step>(Step.TestSeriesInfo);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    const [rating, setRating] = useState('');
    const [noOfRating, setNoOfRating] = useState('');
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    const [isCreateSection, setIsCreateSection] = useState(false);
    const searchParams = useSearchParams();
    const testId = searchParams.get('tId');
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    let [liveQuizNow, setLiveQuizNow] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [isSectionEditing, setIsSectionEditing] = useState(false);

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
                // setStartDate(testData.startDate || "");
                // setEndDate(testData.endDate || "");
                setPrice(testData.price || "");
                setDiscountPrice(testData.discountPrice || "");
                setRating(testData.rating || "");
                setNoOfRating(testData.noOfRating || "");
                setLoading(false);
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
                    };

                    // Update the existing quiz data
                    await updateDoc(testRef, testData);
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
                                price: price,
                                discountPrice: discountPrice,
                                rating: rating,
                                noOfRating: noOfRating,
                                publishDate: new Date().toISOString(),
                                status: 'saved',
                                isInCourse: false,
                                inCourseId: '',
                                createdBy: userId,
                            });

                            await updateDoc(doc(db, 'testseries', docRef.id), {
                                testId: docRef.id,
                            });
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
            return name.trim() !== '' && description.trim() !== '' && image.trim() !== '' && price.trim() !== '' && discountPrice.trim() !== '' && rating.trim() !== '' && noOfRating.trim() !== '';
        }
        else if (currentStep === Step.Perference) {
            return endDate.trim() !== '';
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
                return <TestSeriesInfo name={name} setName={setName} description={description} setDescription={setDescription} imageUrl={image} setImageUrl={setImage} price={price} setPrice={setPrice} discountPrice={discountPrice} setDiscountPrice={setDiscountPrice} rating={rating} setRating={setRating} noOfRating={noOfRating} setNoOfRating={setNoOfRating} />;
            case Step.Sections:
                return <Sections isCreateSection={isCreateSection} setIsCreateSection={setIsCreateSection} testId={testId || ''} sectionName={sectionName} sectionScheduleDate={sectionScheduleDate} setSectionName={setSectionName} setSectionScheduleDate={setSectionScheduleDate} isSectionEditing={isSectionEditing} setIsSectionEditing={setIsSectionEditing} />;
            case Step.Review:
                return <Review testId={testId || ''} name={name} description={description} testImage={image} price={price} discountPrice={discountPrice} rating={rating} noOfRating={noOfRating} />;
            case Step.Perference:
                return <Perference startDate={startDate} endDate={endDate} setEndDate={setEndDate} setLiveQuizNow={setLiveQuizNow} liveQuizNow={liveQuizNow} setStartDate={setStartDate} />;
            default:
                return <TestSeriesInfo name={name} setName={setName} description={description} setDescription={setDescription} imageUrl={image} setImageUrl={setImage} price={price} setPrice={setPrice} discountPrice={discountPrice} setDiscountPrice={setDiscountPrice} rating={rating} setRating={setRating} noOfRating={noOfRating} setNoOfRating={setNoOfRating} />;
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
                        <div className="flex flex-row gap-3 mb-3 ">
                            {currentStep === Step.Sections && (
                                <button
                                    onClick={() => { setIsCreateSection(true); setSectionName(''); setSectionScheduleDate(''); setIsSectionEditing(false) }}
                                    className="flex flex-row gap-1 items-center h-[44px] w-[162px] justify-center"
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
                            <button
                                className={`h-[44px] w-[135px] rounded-md shadow-inner-button border text-white ${currentStep === Step.Review ? 'mr-7' : ''} ${isNextButtonDisabled ? 'bg-[#CDA0FC]' : 'bg-[#8501FF]'}  border-white `}
                                onClick={handleNextClick}
                                disabled={isNextButtonDisabled}
                            >
                                <span className="font-semibold text-sm text-[#FFFFFF]">
                                    {currentStep === Step.Perference ? "Publish" : "Next"}
                                </span>
                            </button>
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
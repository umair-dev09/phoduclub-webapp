"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { DatePicker, Tab, Tabs } from "@nextui-org/react";
import { now, today, CalendarDate, getLocalTimeZone, parseDateTime } from "@internationalized/date";
import { Checkbox } from "@nextui-org/react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { set } from "date-fns";

type PublishProps = {
    startDate: string;
    setStartDate: (startDate: string) => void;
    endDate: string;
    setEndDate: (endDate: string) => void;
    marksPerQ: number;
    setMarksPerQ: (marksPerQ: number) => void;
    nMarksPerQ: number;
    setnMarksPerQ: (nMarksPerQ: number) => void;
    // timeDuration: string;
    timeNumber: string;
    setTimeNumber: (timeNumber: string) => void;
    timeText: string;
    setTimeText: (timeText: string) => void;
    liveQuizNow: boolean;
    setLiveQuizNow: React.Dispatch<React.SetStateAction<boolean>>;  // Explicit type for setter
    status: string | null;
    isPremiumQuiz: boolean;
    setIsPremiumQuiz: React.Dispatch<React.SetStateAction<boolean>>;
    product: { productId: string; productName: string; productType: string } | null;
    setProduct: React.Dispatch<React.SetStateAction<{ productId: string; productName: string; productType: string  } | null>>;
}
const formatScheduleDate = (dateString: string | null): string => {
    if (!dateString) return "-"; // Return "-" if the date is null or undefined

    try {
        const dateObj = new Date(dateString);

        if (isNaN(dateObj.getTime())) {
            // If date is invalid
            return "-";
        }

        // Extract date components
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");

        // Extract time components
        let hours = dateObj.getHours();
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";

        // Convert hours to 12-hour format
        hours = hours % 12 || 12; // Convert 0 to 12 for midnight
        const formattedHours = String(hours).padStart(2, "0");

        // Combine formatted components
        return `${month}/${day}/${year},${formattedHours}:${minutes} ${ampm}`;
    } catch (error) {
        console.error("Error formatting date:", error);
        return "-";
    }
};

// startDate, endDate, marksPerQ, nMarksPerQ, timeDuration,forExam, forProduct
const Publish = ({ liveQuizNow, status, setLiveQuizNow, isPremiumQuiz, setIsPremiumQuiz, product, setProduct, marksPerQ, setMarksPerQ, nMarksPerQ, setnMarksPerQ, timeNumber, setTimeNumber, timeText, setTimeText, startDate, setStartDate, endDate, setEndDate }: PublishProps) => {
    const [isOpenT, setIsOpenT] = useState(false);
    const [productDialog, setProductDialog] = useState(false);
    const [activeTab, setActiveTab] = useState("Courses");
    const [allCourses, setAllCourses] = useState<{ courseId: string; courseName: string }[]>([]);
    const [allTests, setAllTests] = useState<{ testId: string; testName: string }[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const coursesRef = collection(db, 'course');
                const querySnapshot = await getDocs(coursesRef);
                const coursesData = querySnapshot.docs.map(doc => ({
                    courseId: doc.id,
                    courseName: doc.data().courseName
                }));
                setAllCourses(coursesData);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const testsRef = collection(db, 'testseries');
                const querySnapshot = await getDocs(testsRef);
                const testsData = querySnapshot.docs.map(doc => ({
                    testId: doc.id,
                    testName: doc.data().testName
                }));
                setAllTests(testsData);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchTests();
    }, []);


    // Check if dateString is not empty and in the correct format (YYYY-MM-DD)
    const dateValue = startDate && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(startDate)
        ? parseDateTime(startDate) // Correct format with date and time, use parsed date
        : today(getLocalTimeZone()); // Fallback to today's date if format is incorrect or empty



    const selectedColor = "text-[#182230]";

    const [datapickerforEnd, setDatapickerforEnd] = useState(false);
    const [datapickerforStart, setDatapickerforStart] = useState(false);


    return (
        <div className='flex flex-col pt-4 pb-8 gap-4'>
            { (status === 'saved' || status === null) && (
            <div className='flex flex-col w-full h-auto p-6 bg-white border border-lightGrey rounded-xl gap-4'>
                <div className="flex flex-row justify-between w-full items-center">
                    <span className='font-semibold text-lg text-[#1D2939]'>Set Quiz Time</span>
                    <div className="flex flex-row items-center w-[250px] py-[0.625rem] px-4 gap-1 cursor-pointer transition-colors">
                        <Checkbox
                            size="md"
                            color="primary"
                            checked={liveQuizNow}          // Bind the state to the checkbox
                            onChange={() => setLiveQuizNow((prev) => !prev)}  // Toggle state on change
                        />
                        <p className="text-sm text-[#0C111D] font-normal">Make the quiz live now</p>
                    </div>
                </div>

                <div className='flex flex-row w-full gap-4'>
                    <div className='flex flex-col w-1/2 gap-1'>
                        <span className='font-medium text-[#1D2939] text-sm'>Start Date & Time</span>

                        <DatePicker
                            granularity="minute"
                            minValue={today(getLocalTimeZone())}
                            isDisabled={liveQuizNow}
                            value={startDate ? parseDateTime(startDate) : undefined}
                            hideTimeZone
                            onChange={(date) => {
                                const dateString = date ? date.toString() : "";
                                setStartDate(dateString);

                            }}

                        />


                    </div>
                    <div className='flex flex-col w-1/2 gap-1'>
                        <span className='font-medium text-[#1D2939] text-sm'>End Date & Time</span>

                        <DatePicker
                            granularity="minute"
                            minValue={today(getLocalTimeZone())}
                            value={endDate ? parseDateTime(endDate) : undefined}
                            hideTimeZone
                            onChange={(date) => {
                                const dateString = date ? date.toString() : "";
                                setEndDate(dateString);

                            }}

                        />

                    </div>
                </div>

            </div>
            )}
            <div className='flex flex-col w-full h-auto p-5 bg-white border border-lightGrey rounded-xl gap-3'>
                <span className='font-semibold text-lg text-[#1D2939]'>About quiz</span>
                <div className='flex flex-row w-full gap-4'>
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Time Duration</p>
                        <div className='flex flex-row items-center w-full py-2 px-3 border border-lightGrey rounded-md gap-1 focus-within:border-[#D7BBFC] focus-within:ring-4 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'>
                            <input type="text" placeholder="0"
                                maxLength={3} // Limits input to 2 characters
                                pattern="\d*" // Restricts input to numbers only
                                value={timeNumber}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9]/g, ""); // Allows only numbers
                                    setTimeNumber(value); // Stores the input value as a string
                                }}
                                className="w-full text-sm text-[#1D2939] font-normal placeholder:text-[#667085] outline-none" />
                            {/* <p className="text-sm text-[#1D2939] font-medium">Min</p> */}
                            <Popover placement='bottom' isOpen={isOpenT} onOpenChange={(open) => setIsOpenT(open)}>
                                <PopoverTrigger>
                                    <button className='flex flex-row w-[150px] gap-1 '>
                                        <div className={`w-full text-sm text-start`}>{timeText}</div>
                                        <Image src='/icons/arrow-down-01-round.svg' alt='open popup' width={20} height={20} />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className='flex flex-col justify-start w-[120px] h-auto py-1 px-0 bg-white '>
                                    {["Minutes", "Hours"].map(time => (
                                        <button
                                            key={time}
                                            onClick={() => { setTimeText(time); setIsOpenT(false); }}
                                            className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </PopoverContent>
                            </Popover>
                        </div>
                        <p className="mt-1 text-[0.813rem] text-[#475467] font-normal">
                            Students must finish the quiz in time.
                        </p>
                    </div>
                    {/* EXAM */}
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Marks per question</p>
                        <input type="text" placeholder="0"
                            maxLength={2} // Limits input to 2 characters
                            pattern="\d*" // Restricts input to numbers only
                            value={marksPerQ}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, ""); // Allows only numbers
                                setMarksPerQ(Number(value)); // Convert string to number before setting
                            }}
                            className="w-full py-2 px-3 text-sm text-[#1D2939] font-normal placeholder:text-[#667085] border border-lightGrey rounded-md focus:border-[#D7BBFC] focus:ring-4 focus:ring-[#E8DEFB] outline-none transition-colors" />
                        <p className="mt-1 text-[0.813rem] text-[#475467] font-normal">
                            Applies only to the correct answers.
                        </p>
                    </div>
                    {/* PRODUCT */}
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Negative marks per question (-)</p>
                        <input type="text" placeholder="0"
                            maxLength={2} // Limits input to 2 characters
                            pattern="\d*" // Restricts input to numbers only
                            value={nMarksPerQ}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, ""); // Allows only numbers
                                setnMarksPerQ(Number(value)); // Convert string to number before setting
                            }}
                            className="w-full py-2 px-3 text-sm text-[#1D2939] font-normal placeholder:text-[#667085] border border-lightGrey rounded-md focus:border-[#D7BBFC] focus:ring-4 focus:ring-[#E8DEFB] outline-none transition-colors" />
                        <p className="mt-1 text-[0.813rem] text-[#475467] font-normal">
                            Applies only to the incorrect answers.
                        </p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col w-full h-auto p-5 bg-white border border-lightGrey rounded-xl gap-3 pb-7'>
                <span className='font-semibold text-lg text-[#1D2939] pb-1'>Quiz available for<span className="font-normal text-sm"> (By default available for all users)</span></span>
                <Checkbox
                                className=" font-normal"
                                isSelected={isPremiumQuiz}
                                onChange={(e) => setIsPremiumQuiz(e.target.checked)}
                            >
                                <span className="text-sm">Make it available for only premium users with specific product</span>
                            </Checkbox>
                {isPremiumQuiz && !product && (
                 <button onClick={() => setProductDialog(true)}
                 className="flex flex-row gap-1 items-center h-[44px] w-auto justify-start mr-1 outline-none">
                 <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                 <span className="text-[#9012FF] font-semibold text-sm">Select Product</span>
                 </button>
                )}
                {isPremiumQuiz && product && (
                    <div className="flex flex-row gap-2 px-4 py-2 rounded-[60px] bg-[#EDE4FF] w-fit h-auto items-center justify-center">
                        <span className="text-[#182230] font-medium text-sm">{product.productName}</span>
                        <button onClick={() => setProduct(null)}><Image src="/icons/cancel.svg" height={15} width={15} alt="Clear" /></button>
                    </div>
                )}
            </div>

        <Dialog open={productDialog} onClose={() => setProductDialog(false)} className="relative z-50">
          <DialogBackdrop className="fixed inset-0 bg-black/30" />
          <div className="fixed inset-0 flex items-center justify-center">
            <DialogPanel className="bg-white rounded-2xl w-[500px] h-auto px-6 pb-2 max-h-[92%] overflow-y-auto">
              <div className=''>
                <div className="flex flex-row justify-between my-4 ">
                  <h3 className="text-lg font-bold text-[#1D2939]">
                    Select Product
                  </h3>
                    <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]" 
                    onClick={() => setProductDialog(false)}>
                      <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                    </button>
                </div>
                <Tabs
                 aria-label="Market Integration Tabs"
                 color="primary"
                 variant="underlined"
                 selectedKey={activeTab}
                 onSelectionChange={(key) => setActiveTab(key as string)}
                 classNames={{
                     tabList: "gap-6 w-full relative rounded-none p-0 border-b border-solid border-[#EAECF0]",
                     cursor: "w-full bg-[#7400E0]",
                     tab: "max-w-fit px-0 h-12",
                     tabContent: "group-data-[selected=true]:text-[#7400E0] hover:text-[#7400E0] ",
                 }}
                 >
                <Tab
                  key="Courses"
                  title={
                      <div className="flex items-center space-x-2">
                          <span className="font-medium text-base">
                              Courses
                          </span>
                      </div>
                  }
                  >
                   {allCourses.map((course, index) => (
                    <div key={index} className='flex flex-row w-full py-3 border-b justify-start items-center hover:bg-[#EAECF0] cursor-pointer'
                    onClick={() => {setProduct({ productId: course.courseId, productName: course.courseName, productType: "course" });
                    setProductDialog(false)}}>
                      <span className='text-[#0C111D] font-normal text-sm'>{course.courseName}</span>
                    </div>
                  ))}
                  </Tab>
                  <Tab
                  key="TestSeries"
                  title={
                      <div className="flex items-center space-x-2">
                          <span className="font-medium text-base">
                              Test Series
                          </span>
                      </div>
                  }
                  >
                    {allTests.map((test, index) => (
                    <div key={index} className='flex flex-row w-full py-3 border-b justify-start cursor-pointer items-center hover:bg-[#EAECF0]'
                     onClick={() => {setProduct({ productId: test.testId, productName: test.testName, productType: 'testseries' }); setProductDialog(false)}}>
                      <span className='text-[#0C111D] font-normal text-sm'>{test.testName}</span>
                    </div>
                  ))}             
                  </Tab>
                 </Tabs>
                            

              </div>
            </DialogPanel>
          </div >
        </Dialog >

        </div>
    );
};

export default Publish;
{/* <div className='flex flex-row w-full gap-4'>
<div className='flex flex-col w-full gap-1'>
    <p className='text-sm font-medium text-[#1D2939]'>Year</p>
    <Popover placement='bottom' isOpen={isOpenY} onOpenChange={(open) => setIsOpenY(open)}>
        <PopoverTrigger>
            <button className='flex flex-row w-full py-2 px-3 border border-lightGrey rounded-md gap-1 focus-within:border-[#D7BBFC] focus-within:ring-2 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'>
                <div className={`w-full text-sm text-start ${forYear !== "Select Year" ? selectedColor : "text-[#667085]"}`}>{forYear}</div>
                <Image src='/icons/arrow-down-01-round.svg' alt='open popup' width={20} height={20} />
            </button>
        </PopoverTrigger>
        <PopoverContent className='flex flex-col justify-start w-[15.625rem] h-auto py-1 px-0 bg-white border border-lightGrey rounded-md'>
            {["2025", "2026", "2027", "2028"].map(year => (
                <button
                    key={year}
                    onClick={() => { setForYear(year); setIsOpenY(false); }}
                    className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'
                >
                    {year}
                </button>
            ))}
        </PopoverContent>
    </Popover>
</div>

<div className='flex flex-col w-full gap-1'>
    <p className='text-sm font-medium text-[#1D2939]'>Exam</p>
    <Popover placement='bottom' isOpen={isOpenE} onOpenChange={(open) => setIsOpenE(open)}>
        <PopoverTrigger>
            <button className='flex flex-row w-full py-2 px-3 border border-lightGrey rounded-md gap-1 focus-within:border-[#D7BBFC] focus-within:ring-2 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'>
                <div className={`w-full text-sm text-start ${forExam !== "Select Exam" ? selectedColor : "text-[#667085]"}`}>{forExam}</div>
                <Image src='/icons/arrow-down-01-round.svg' alt='open popup' width={20} height={20} />
            </button>
        </PopoverTrigger>
        <PopoverContent className='flex flex-col justify-start w-[15.625rem] h-auto py-1 px-0 bg-white border border-lightGrey rounded-md'>
            {["JEE", "BITSAT", "VITEEE", "WBJEE"].map(exam => (
                <button
                    key={exam}
                    onClick={() => { setForExam(exam); setIsOpenE(false); }}
                    className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'
                >
                    {exam}
                </button>
            ))}
        </PopoverContent>
    </Popover>
</div>

<div className='flex flex-col w-full gap-1'>
    <p className='text-sm font-medium text-[#1D2939]'>Product</p>
    <Popover placement='bottom' isOpen={isOpenP} onOpenChange={(open) => setIsOpenP(open)}>
        <PopoverTrigger>
            <button className='flex flex-row w-full py-2 px-3 border border-lightGrey rounded-md gap-1 focus-within:border-[#D7BBFC] focus-within:ring-2 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'
            >
                <div className={`w-full text-sm text-start ${forProduct !== "Select Product" ? selectedColor : "text-[#667085]"}`}>{forProduct}</div>
                <Image src='/icons/arrow-down-01-round.svg' alt='open popup' width={20} height={20} />
            </button>
        </PopoverTrigger>
        <PopoverContent className='flex flex-col justify-start w-[17.063rem] h-auto py-1 px-0 bg-white border border-lightGrey rounded-md'>
            {["BITSAT Mastery Crash Course 2025", "BITSAT Sprint Crash Course 2025", "Phodu BITSAT Crash Course 2025", "BITSAT Pro Crash Course 2025"].map(product => (
                <button
                    key={product}
                    onClick={() => { setForProduct(product); setIsOpenP(false); }}

                    className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'
                >
                    {product}
                </button>
            ))}
        </PopoverContent>
    </Popover>
</div>
</div> */}
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import Collapsible from 'react-collapsible';
import Text from "./Text";
import Quiz from "./QuizBottomSheets/Quiz";
import Video from "./Video";
import { DatePicker, DateValue } from "@nextui-org/react";
import { now, today, CalendarDate, getLocalTimeZone, parseAbsoluteToLocal, ZonedDateTime } from "@internationalized/date";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc, query, deleteDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "@/firebase";
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import LoadingData from "@/components/Loading";
import { DateTime } from 'luxon';  // Import luxon
import { Calendar } from "@nextui-org/calendar";
import { TimeInput } from "@nextui-org/date-input";
type Sections = {
    sectionName: string;
    sectionId: string;
    sectionScheduleDate: string;
    noOfLessons: string;
    content?: Content[];
}

type Content = {
    type: string;
    contentId: string;
    isDisscusionOpen: boolean;
    lessonContent: string;
    lessonHeading: string;
    lessonOverView: string;
    lessonScheduleDate: string;
    pdfLink: string;
    videoLink: string;
    marksPerQuestion: string;
    nMarksPerQuestion: string;
    quizTime: string;
}

type CourseContentProps = {
    // sectionsList: Sections[];
    // setSectionsList: React.Dispatch<React.SetStateAction<Sections[]>>;
    courseId: string;
}

const formatScheduleDate = (dateString: string | null): string => {
    if (!dateString) return "-"; // Return "-" if the date is null or undefined

    try {
        const dateObj = new Date(dateString);

        if (isNaN(dateObj.getTime())) {
            // If date is invalid
            return "-";
        }

        // Format the date as per your required format
        let formattedDate = dateObj.toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });

        // Adjust the comma placement manually
        formattedDate = formattedDate.replace(" ", ", "); // Add a comma between the day and the month
        formattedDate = formattedDate.replace(", ", " "); // Remove the unwanted comma between year and time

        return formattedDate;
    } catch (error) {
        console.error("Error formatting date:", error);
        return "-";
    }
};

function CourseContent({ courseId }: CourseContentProps) {
    const [openSectionDialog, setOpenSectionDialog] = useState(false);
    const [hasClickedCreate, setHasClickedCreate] = useState(false);
    const [contentPopupOpen, setContentPopupOpen] = useState(false);
    const [name, setName] = useState("");
    const [sectionScheduleDate, setSectionScheduleDate] = useState("");
    const [showDrawerfortest, setShowDrawerfortest] = useState(false);
    const [showDrawerforQuiz, setShowDrawerforQuiz] = useState(false);
    const [showDrawerforVideo, setShowDrawerforVideo] = useState(false);
    const [sections, setSections] = useState<Sections[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSectionEditing, setIsSectionEditing] = useState(false);
    const [passedSectionId, setPassedSectionId] = useState('');
    const [isContentEditing, setIsContentEditing] = useState(false);
    const [contentId, setContentId] = useState('');
    const [dateForPicker, setDateForPicker] = useState<DateValue | null>(null);

    useEffect(() => {
        const sectionsRef = collection(db, 'course', courseId, 'sections');
        const q = query(sectionsRef);

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const sectionsData: Sections[] = snapshot.docs.map((doc) => ({
                    sectionName: doc.data().sectionName,
                    sectionScheduleDate: doc.data().sectionScheduleDate,
                    noOfLessons: doc.data().noOfLessons,
                    sectionId: doc.data().sectionId,
                    content: [], // Initialize an empty content array
                }));
                setSections(sectionsData);
                setLoading(false);

                // Fetch content for each section
                snapshot.docs.forEach((doc) => {
                    const sectionId = doc.id;
                    const contentRef = collection(db, 'course', courseId, 'sections', sectionId, 'content');
                    const contentQuery = query(contentRef);

                    onSnapshot(contentQuery, (contentSnapshot) => {
                        const contentData: Content[] = contentSnapshot.docs.map((contentDoc) => ({
                            lessonHeading: contentDoc.data().lessonHeading,
                            lessonScheduleDate: contentDoc.data().lessonScheduleDate,
                            type: contentDoc.data().type,
                            contentId: contentDoc.id,
                            isDisscusionOpen: contentDoc.data().isDisscusionOpen,
                            lessonContent: contentDoc.data().lessonContent,
                            lessonOverView: contentDoc.data().lessonOverView,
                            pdfLink: contentDoc.data().pdfLink,
                            videoLink: contentDoc.data().videoLink,
                            marksPerQuestion: contentDoc.data().marksPerQuestion,
                            nMarksPerQuestion: contentDoc.data().nMarksPerQuestion,
                            quizTime: contentDoc.data().quizTime,

                        }));

                        setSections((prevSections) =>
                            prevSections.map((section) =>
                                section.sectionId === sectionId ? { ...section, content: contentData } : section
                            )
                        );
                    });
                });
            },
            (error) => {
                console.error('Error fetching sections:', error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [courseId]);



    const openCreateSection = () => {
        setOpenSectionDialog(true);
        setName('');
        setSectionScheduleDate('');
        setPassedSectionId('');
        setDateForPicker(null);
    };
    const editCreateSection = async (secName: string, secDate: string, secId: string) => {
        setIsSectionEditing(true);
        setOpenSectionDialog(true);
        setName(secName);
        setSectionScheduleDate(secDate);
        setPassedSectionId(secId);
    };
    const closeCreateSection = () => {
        setOpenSectionDialog(false);
        setHasClickedCreate(true);
    };


    const openDrawerfortest = () => {
        setShowDrawerfortest(true); // Open the for test
        // setOpen(false);

    };
    const openDrawerforQuiz = () => {
        setShowDrawerforQuiz(true); // Open the Quiz
        // setOpen(false);

    };
    const openDrawerforVideo = () => {
        setShowDrawerforVideo(true); // Open the Video
        // setOpen(false);

    };

    const isCreateSectionFilled = name && sectionScheduleDate;

    const handleAddSection = async () => {

        if (isSectionEditing) {
            try {
                if (!courseId || !passedSectionId) {
                    throw new Error("Invalid course ID or section ID");
                }

                // Generate a valid document reference
                const newSectionRef = doc(db, `course/${courseId}/sections/${passedSectionId}`);

                // Update the section
                await updateDoc(newSectionRef, {
                    sectionName: name,
                    sectionScheduleDate: sectionScheduleDate,
                });

                toast.success('Changes saved successfully');
                closeCreateSection();

                // Reset the form and states
                setName('');
                setSectionScheduleDate('');
                setPassedSectionId('');
                setIsSectionEditing(false);
                setDateForPicker(null);
            } catch (error) {
                console.error('Error adding section:', error);
                toast.error('Failed to save changes. Please try again.');
            }
        }
        else {
            try {
                // Generate a unique section ID (Firestore will auto-generate if you use addDoc)
                const newSectionRef = doc(collection(db, 'course', courseId, 'sections')); // No need for custom sectionId generation if using Firestore auto-ID
                await setDoc(newSectionRef, {
                    sectionName: name,
                    sectionScheduleDate: sectionScheduleDate,
                    sectionId: newSectionRef.id,
                });
                toast.success('Section added successfully');
                closeCreateSection();
                setName('');
                setSectionScheduleDate('');
            } catch (error) {
                console.error('Error adding section: ', error);
            }
        }

    };

    const handleDeleteSection = async (sectionId: string) => {
        try {
            // Create a reference to the specific section document
            const sectionRef = doc(db, 'course', courseId, 'sections', sectionId);

            // Delete the section document
            await deleteDoc(sectionRef);

            toast.success('Section deleted successfully!');
        } catch (error) {
            console.error('Error deleting section:', error);
        }
    };

    const handleDeleteContent = async (sectionId: string, contentId: string) => {
        try {
            // Create a reference to the specific section document
            const sectionRef = doc(db, 'course', courseId, 'sections', sectionId, 'content', contentId);

            // Delete the section document
            await deleteDoc(sectionRef);

            toast.success('Content deleted successfully!');
        } catch (error) {
            console.error('Error deleting section:', error);
        }
    };

    if (loading) {
        return <LoadingData />
    }

    // Initial placeholder value
    const [selectedDateTime, setSelectedDateTime] = useState("Select Date and Time");

    // Function to handle date change
    const handleDateChange = (date) => {
        // If date is selected, update it with the current time (keep placeholder if no time is selected yet)
        const formattedDate = `${date.toLocaleDateString()}, ${selectedDateTime.split(', ')[1] || '12:00 AM'}`;
        setSelectedDateTime(formattedDate);
    };

    // Function to handle time change
    const handleTimeChange = (time) => {
        // Update only the time portion of the selectedDateTime
        const formattedTime = `${selectedDateTime.split(', ')[0]}, ${time}`;
        setSelectedDateTime(formattedTime);
    };

    return (
        <div className="flex flex-col gap-4 ">
            <div className="flex flex-row justify-between h-16">
                <div className="flex flex-col justify-between">
                    <span className="text-[#1D2939] font-semibold text-lg">Course Content</span>
                    <div className="flex flex-row gap-4">
                        <div className="flex items-center ">
                            <Image src="/icons/read.svg" alt="learn-icon" width={20} height={20} className="mr-2" />
                            <span className="font-normal text-base text-[#1D2939]">
                                {sections.reduce((total, section) => total + (section.content?.length || 0), 0)} Lessons
                            </span>
                        </div>
                        <div className="flex items-center ">
                            <Image src="/icons/vedio.svg" alt="video-icon" width={20} height={20} className="mr-2" />
                            <span className="font-normal text-base text-[#1D2939]">
                                {sections.reduce(
                                    (total, section) =>
                                        total + (section.content?.filter((item) => item.type === 'Video').length || 0),
                                    0
                                )} Videos
                            </span>
                        </div>
                        <div className="flex items-center">
                            <Image src="/icons/test.svg" alt="test-icon" width={20} height={20} className="mr-2" />
                            <span className="font-normal text-base text-[#1D2939]">
                                {sections.reduce(
                                    (total, section) =>
                                        total + (section.content?.filter((item) => item.type === 'Quiz').length || 0),
                                    0
                                )} Quizzes
                            </span>
                        </div>
                    </div>
                </div>
                {/* Add section Button - Only show after clicking Create Section in dialog */}
                <button
                    className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF]  bg-[#FFFFFF] h-[44px] w-[162px] justify-center"
                    onClick={openCreateSection}>
                    <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                    <span className="text-[#9012FF] font-semibold text-sm">Add Section</span>
                </button>
            </div>


            {/* content to show on Add Section */}

            {sections.map((section, index) => (
                <div key={index} className="border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md h-auto">
                    <Collapsible key={index}
                        trigger={
                            <div className="flex flex-row justify-between items-center p-4 w-full ">
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-[16px] text-[#1D2939]">{section.sectionName}</span>
                                    <span className="text-[#667085] font-normal text-sm">{section.content?.length || 0} Lessons</span>
                                </div>
                                <div className="flex flex-row gap-16">
                                    <div className="flex flex-col gap-[2px]">
                                        <span className="text-[#667085] font-normal text-sm">Schedule</span>
                                        <span className="font-semibold text-[15px] text-[#1D2939]">{formatScheduleDate(section.sectionScheduleDate)}</span>
                                    </div>
                                    <div className="flex flex-row items-center">


                                        <Popover
                                            placement="bottom" >
                                            <PopoverTrigger>
                                                <button
                                                    className="flex flex-row gap-1 items-center rounded-md  h-[44px] w-auto justify-center"
                                                >
                                                    <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                                                    <span className="text-[#9012FF] font-semibold text-sm">Add Content</span>
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex flex-col px-0 text-sm font-normal bg-white border border-lightGrey rounded-md w-[167px] shadow-md">
                                                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                                    onClick={() => { openDrawerfortest(); setPassedSectionId(section.sectionId); setIsContentEditing(false) }}>
                                                    <Image src="/icons/read.svg" alt="learn-icon" width={20} height={20} />
                                                    <span className="text-sm text-[#0C111D] font-normal">Text</span>
                                                </button>
                                                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                                    onClick={() => { openDrawerforVideo(); setPassedSectionId(section.sectionId); setIsContentEditing(false) }}>
                                                    <Image src="/icons/vedio.svg" alt="video-icon" width={20} height={20} />
                                                    <span className="text-sm text-[#0C111D] font-normal">Video</span>
                                                </button>
                                                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                                    onClick={() => { openDrawerforQuiz(); setPassedSectionId(section.sectionId); setIsContentEditing(false) }}>
                                                    <Image src="/icons/test.svg" alt="test-icon" width={20} height={20} />
                                                    <span className="text-sm text-[#0C111D] font-normal">Quiz</span>
                                                </button>
                                            </PopoverContent>
                                        </Popover>



                                        <Popover
                                            placement="bottom-end">
                                            <PopoverTrigger>
                                                <button
                                                    className="w-10 p-[10px] h-[40px] gap-1 flex-row flex  bg-[#FFFFFF] rounded-md 
                                                                            shadow-none"
                                                    style={{ outline: "none" }}
                                                >
                                                    <Image src="/icons/three-dots.svg" width={18} height={18} alt="three-dots" />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex flex-col px-0 text-sm font-normal bg-white border border-lightGrey rounded-md w-[167px] shadow-md"
                                            >
                                                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                                    onClick={() => editCreateSection(section.sectionName, section.sectionScheduleDate, section.sectionId)
                                                    }>
                                                    <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                                                    <span className="text-sm text-[#0C111D] font-normal">Edit Section</span>
                                                </button>
                                                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full" onClick={() => handleDeleteSection(section.sectionId)}>
                                                    <Image src="/icons/delete.svg" width={18} height={18} alt="delete-quiz" />
                                                    <span className="text-sm text-[#DE3024] font-normal">Delete Section</span>
                                                </button>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>



                            </div>

                        }

                    >
                        {section.content && section.content.length > 0 ? (
                            <table className="w-full bg-white border-t-[2px] border-[#EAECF0]">
                                <thead className="bg-[#F2F4F7]">
                                    <tr>
                                        <th className="w-[58%] text-left px-5 py-4   text-[#667085] font-medium text-sm">Lessons</th>
                                        <th className="w-[25%] text-start px-5 py-4 text-[#667085] font-medium text-sm">Schedule Date</th>
                                        <th className="w-[12%] text-start px-5 py-4 text-[#667085] font-medium text-sm">Type</th>
                                        <th className="w-[5%] text-start px-5 py-4 text-[#667085] font-medium text-sm">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {section.content?.map((content, index) => (
                                        <tr key={content.contentId} className="border-t border-solid border-[#EAECF0]">
                                            <td className="px-5 py-4 text-start text-[#101828] text-sm ">
                                                <div className="flex flex-row gap-[10px] items-center">
                                                    <span className="bg-[#EAECF0] rounded-[4px] text-[12px] font-medium w-auto h-auto px-[7px] py-[1px] min-w-[22px] text-center">{index + 1}</span>
                                                    {content.lessonHeading}
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 text-start text-[#101828] text-sm">{formatScheduleDate(content.lessonScheduleDate)}</td>
                                            <td className="px-5 py-4 text-start text-[#101828] text-sm">{content.type}</td>
                                            <td className="flex items-center justify-center px-8 py-4 text-[#101828] text-sm">
                                                <Popover placement="bottom-end"  >
                                                    <PopoverTrigger>
                                                        <button>
                                                            <Image
                                                                src="/icons/three-dots.svg"
                                                                width={20}
                                                                height={20}
                                                                alt="More Actions"
                                                            />
                                                        </button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="flex px-0 rounded-md w-auto py-2">
                                                        <div >
                                                            <button className="flex flex-row items-center justify-start w-full py-2 gap-2 hover:bg-[#F2F4F7] pl-4 pr-9"
                                                                onClick={() => {
                                                                    if (content.type === 'Quiz') {
                                                                        setShowDrawerforQuiz(true);
                                                                    }
                                                                    else if (content.type === 'Video') {
                                                                        setShowDrawerforVideo(true);
                                                                    }
                                                                    else if (content.type === 'Text') {
                                                                        setShowDrawerfortest(true);
                                                                    }
                                                                    setPassedSectionId(section.sectionId); setIsContentEditing(true); setContentId(content.contentId)
                                                                }} >
                                                                <Image src="/icons/edit-02.svg" width={18} height={18} alt="edit" />
                                                                <span className="text-sm text-[#0C111D] font-normal">Edit</span>
                                                            </button>
                                                            <button className=" flex flex-row items-center justify-start w-full py-2 gap-2 hover:bg-[#F2F4F7] pl-4 pr-9"
                                                                onClick={() => handleDeleteContent(section.sectionId, content.contentId)}>
                                                                <Image src='/icons/delete.svg' alt="user profile" width={18} height={18} />
                                                                <p className="text-sm text-[#DE3024] font-normal">Remove</p>
                                                            </button>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="flex flex-col px-6 py-8 items-center gap-3  border-t-[1px]">
                                <span className="text-[#1D2939] font-semibold text-lg">Create Content</span>
                                <span className="font-normal text-xs text-[#667085]">
                                    Test Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
                                </span>
                                <Popover
                                    placement="bottom">
                                    <PopoverTrigger>
                                        <button
                                            className="flex flex-row gap-1 items-center px-5 rounded-md border-[2px] border-solid border-[#9012FF] h-[44px] w-auto justify-center "
                                        >
                                            <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                                            <span className="text-[#9012FF] font-semibold text-sm">Add Content</span>
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="flex flex-col px-0 text-sm font-normal bg-white border border-lightGrey rounded-md w-[167px] shadow-md">
                                        <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                            onClick={() => { setShowDrawerfortest(true); setPassedSectionId(section.sectionId); setIsContentEditing(false) }}>
                                            <Image src="/icons/read.svg" alt="learn-icon" width={20} height={20} />
                                            <span className="text-sm text-[#0C111D] font-normal">Text</span>
                                        </button>
                                        <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                            onClick={() => { openDrawerforVideo(); setPassedSectionId(section.sectionId); setIsContentEditing(false) }}>
                                            <Image src="/icons/vedio.svg" alt="video-icon" width={20} height={20} />
                                            <span className="text-sm text-[#0C111D] font-normal">Video</span>
                                        </button>
                                        <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                            onClick={() => { openDrawerforQuiz(); setPassedSectionId(section.sectionId); setIsContentEditing(false) }}>
                                            <Image src="/icons/test.svg" alt="test-icon" width={20} height={20} />
                                            <span className="text-sm text-[#0C111D] font-normal">Quiz</span>
                                        </button>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        )
                        }
                    </Collapsible>
                </div>
            ))}

            <Dialog open={openSectionDialog} onClose={closeCreateSection} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-[559px] h-auto">
                        <div className="flex flex-col relative gap-6">
                            <div className="flex flex-row items-center justify-between px-5 pt-4">
                                <h3 className="text-2xl font-semibold text-[#1D2939]">{isSectionEditing ? 'Edit Section' : 'Create Section'}</h3>
                                <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">

                                    <button onClick={closeCreateSection} className="">
                                        <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                    </button>
                                </button>
                            </div>
                            <div className="flex flex-col w-full gap-1 px-6">
                                <p className="text-start text-sm text-[#1D2939] font-medium">Name</p>
                                <div className="flex flex-row w-full h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">
                                    <input
                                        type="text"
                                        className="w-full  text-sm text-[#182230] font-normal outline-none rounded-md"
                                        placeholder="Enter Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}

                                    />
                                </div>
                            </div>
                            <div className="flex flex-col w-full gap-2 px-6 mb-2">
                                <p className="text-start text-lg text-[#1D2939] font-semibold">Schedule Section</p>
                                <p className="text-sm">Selected Date: {formatScheduleDate(sectionScheduleDate) || 'Date not set'}</p>
                                <DatePicker
                                    granularity="minute"
                                    minValue={today(getLocalTimeZone())}
                                    // value={dateForPicker}
                                    hideTimeZone
                                    onChange={(date) => {
                                        const dateString = date ? date.toString() : ""; // Customize format if needed
                                        setSectionScheduleDate(dateString);
                                    }}
                                />
                            </div>
                            <div className="flex flex-row items-center justify-between h-10 mx-6 rounded-md gap-2 mb-2 bg-[#f4f4f5]">
                                <p className="text-sm">{selectedDateTime}</p>
                                <Popover placement="top-start">
                                    <PopoverTrigger>
                                        <button className="flex flex-row gap-1 items-center px-5 rounded-md border-[2px] border-solid border-[#9012FF] h-[44px] w-auto justify-center">
                                            <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                                            <span className="text-[#9012FF] font-semibold text-sm">Add Content</span>
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="flex flex-col bg-white border border-lightGrey rounded-xl w-auto shadow-md">
                                        <div className="flex flex-col gap-4 p-4">
                                            {/* Calendar Component */}
                                            <div className="rounded-lg">
                                                <Calendar
                                                    onChange={handleDateChange} // When a date is selected, update the state
                                                    value={selectedDateTime !== "Select Date and Time" ? new Date(selectedDateTime.split(',')[0]) : new Date()} // Reflect the current selected date in the calendar
                                                    showMonthAndYearPickers
                                                />
                                            </div>

                                            {/* Time Input Component */}
                                            <div className="rounded-lg">
                                                <TimeInput
                                                    label="Event Time"
                                                    className="bg-[#FFFFFF] rounded-none"
                                                    onChange={handleTimeChange} // Pass the time change handler
                                                />
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <hr />
                            <div className="flex flex-row justify-end mx-6 my-2 items-center gap-4 pb-2">
                                <button onClick={closeCreateSection} className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm hover:bg-[#F2F4F7]">Cancel</button>
                                <button
                                    onClick={() => handleAddSection()}
                                    disabled={!isCreateSectionFilled}
                                    className={`py-[0.625rem] px-6 text-white shadow-inner-button border border-white ${!isCreateSectionFilled ? 'bg-[#CDA0FC]' : 'bg-[#9012FF]'} rounded-md font-semibold text-sm`}>
                                    {isSectionEditing ? 'Save Changes' : 'Create Section'}
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            {/* Drawer for Test */}
            <Text isOpen={showDrawerfortest} toggleDrawer={() => setShowDrawerfortest(!showDrawerfortest)} sectionId={passedSectionId} courseId={courseId} isEditing={isContentEditing} contentId={contentId} />
            {/* Drawer for Quiz */}
            <Quiz isOpen={showDrawerforQuiz} toggleDrawer={() => setShowDrawerforQuiz(!showDrawerforQuiz)} sectionId={passedSectionId} courseId={courseId} isEditing={isContentEditing} contentId={contentId} />
            {/* Drawer for Video */}
            <Video isOpen={showDrawerforVideo} toggleDrawer={() => setShowDrawerforVideo(!showDrawerforVideo)} sectionId={passedSectionId} courseId={courseId} isEditing={isContentEditing} contentId={contentId} />
        </div>
    );
}

export default CourseContent;

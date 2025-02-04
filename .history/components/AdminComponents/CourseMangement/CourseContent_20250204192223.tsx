import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import Collapsible from 'react-collapsible';
import Text from "./Text";
import Quiz from "./QuizBottomSheets/Quiz";
import Video from "./Video";
import { DatePicker, DateValue } from "@nextui-org/react";
import { now, today, CalendarDate, getLocalTimeZone, parseZonedDateTime, parseAbsoluteToLocal, ZonedDateTime, parseDateTime } from "@internationalized/date";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc, query, deleteDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "@/firebase";
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import LoadingData from "@/components/Loading";
import { DateTime } from 'luxon';  // Import luxon
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { set } from "date-fns";

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
    const [showDatepicker, setShowDatepicker] = useState(false);
    const [popoveropen1, setPopoveropen1] = useState<number | null>(null);
    const [popoveropen2, setPopoveropen2] = useState<number | null>(null);
    const [popoveropen3, setPopoveropen3] = useState<number | null>(null);
    const [popoverOpen4, setPopoverOpen4] = useState<string | null>(null);
    const [deletedialog, setDeletedialog] = useState(false);
    const [sectionToDelete, setSectionToDelete] = useState<string | null>(null);
    const [contentToDelete, setContentToDelete] = useState<{ sectionId: string, contentId: string } | null>(null);
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                if (openSectionDialog && isCreateSectionFilled) {
                    handleAddSection(); // ✅ Trigger create/edit section
                } else if (deletedialog && (sectionToDelete || contentToDelete)) {
                    if (sectionToDelete) {
                        handleDeleteSection(sectionToDelete); // ✅ Delete section
                    } else if (contentToDelete) {
                        handleDeleteContent(contentToDelete.sectionId, contentToDelete.contentId); // ✅ Delete content
                    }
                    setDeletedialog(false);
                    setSectionToDelete(null);
                    setContentToDelete(null);
                }
            }
        };

        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [openSectionDialog, deletedialog, isCreateSectionFilled, sectionToDelete, contentToDelete]);

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


    // let [date, setDate] = React.useState<DateValue | null>(
    //     parseAbsoluteToLocal("2021-04-07T18:45:22Z"),
    //   );

    const openCreateSection = () => {
        setOpenSectionDialog(true);
        setName('');
        setSectionScheduleDate('');
        setPassedSectionId('');
        setDateForPicker(null);
        setShowDatepicker(false);
        setIsSectionEditing(false);

    };
    const editCreateSection = async (secName: string, secDate: string, secId: string) => {
        setIsSectionEditing(true);
        setOpenSectionDialog(true);
        setName(secName);
        setSectionScheduleDate(secDate);
        setPassedSectionId(secId);
        setShowDatepicker(false);
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
            setSectionToDelete(null);
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
            setContentToDelete(null);
        } catch (error) {
            console.error('Error deleting section:', error);
        }
    };

    if (loading) {
        return <LoadingData />
    }
    const handlePopoverOpen1 = (index: number) => {
        setPopoveropen1(index);
    };
    const handlePopoverOpen2 = (index: number) => {
        setPopoveropen2(index);
    };
    const handlePopoverOpen3 = (index: number) => {
        setPopoveropen3(index);
    };
    const handlePopoverOpen4 = (sectionId: string) => {
        setPopoverOpen4(sectionId);
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
                    className="flex flex-row gap-1 outline-none items-center rounded-md border-[2px] border-solid border-[#9012FF] hover:bg-[#F5F0FF] bg-[#FFFFFF] h-[44px] w-[162px] justify-center"
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
                                            isOpen={popoveropen1 === index}
                                            onOpenChange={(open) => open ? handlePopoverOpen1(index) : setPopoveropen1(null)}
                                            placement="bottom" >
                                            <PopoverTrigger

                                            >
                                                <button

                                                    className="flex flex-row gap-1 items-center rounded-md hover:bg-[#F5F0FF] outline-none hover:rounded-full px-3 py-1 transition duration-200 ease-in-out h-[44px] w-auto justify-center"
                                                >
                                                    <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                                                    <span className="text-[#9012FF] font-semibold text-sm">Add Content</span>
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex flex-col px-0 text-sm font-normal bg-white border border-lightGrey rounded-md w-[167px] shadow-md">
                                                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full outline-none"
                                                    onClick={(e) => {
                                                        openDrawerfortest(); setPassedSectionId(section.sectionId); setIsContentEditing(false);
                                                        setPopoveropen1(null); e.stopPropagation(); setContentId('');
                                                    }}>
                                                    <Image src="/icons/read.svg" alt="learn-icon" width={20} height={20} />
                                                    <span className="text-sm text-[#0C111D] font-normal">Text</span>
                                                </button>
                                                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full outline-none"
                                                    onClick={(e) => {
                                                        openDrawerforVideo(); setPassedSectionId(section.sectionId); setIsContentEditing(false);
                                                        setPopoveropen1(null);
                                                        e.stopPropagation(); setContentId('');
                                                    }}>
                                                    <Image src="/icons/vedio.svg" alt="video-icon" width={20} height={20} />
                                                    <span className="text-sm text-[#0C111D] font-normal">Video</span>
                                                </button>
                                                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full outline-none"
                                                    onClick={(e) => {
                                                        openDrawerforQuiz(); setPassedSectionId(section.sectionId); setIsContentEditing(false);
                                                        setPopoveropen1(null);
                                                        e.stopPropagation(); setContentId('');
                                                    }}>
                                                    <Image src="/icons/test.svg" alt="test-icon" width={20} height={20} />
                                                    <span className="text-sm text-[#0C111D] font-normal">Quiz</span>
                                                </button>
                                            </PopoverContent>
                                        </Popover>



                                        <Popover
                                            placement="bottom-end"
                                            isOpen={popoveropen2 === index}
                                            onOpenChange={(open) => open ? handlePopoverOpen2(index) : setPopoveropen2(null)}>
                                            <PopoverTrigger
                                                onClick={(event) => event.stopPropagation()}>
                                                <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] outline-none">

                                                    <Image src="/icons/three-dots.svg" width={18} height={18} alt="three-dots" className="outline-none" />

                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex flex-col px-0 text-sm font-normal bg-white border border-lightGrey rounded-md w-[167px] shadow-md"
                                                onClick={(event) => event.stopPropagation()}  >
                                                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                                    onClick={() => {
                                                        editCreateSection(section.sectionName, section.sectionScheduleDate, section.sectionId);
                                                        setPopoveropen2(null);
                                                    }
                                                    }>
                                                    <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                                                    <span className="text-sm text-[#0C111D] font-normal">Edit Section</span>
                                                </button>
                                                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#FEE4E2] w-full" onClick={() => {
                                                    setSectionToDelete(section.sectionId);
                                                    setDeletedialog(true); setPopoveropen2(null);
                                                }}>

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
                                    {section.content?.map((content, index1) => (
                                        <tr key={content.contentId} className="border-t border-solid border-[#EAECF0]">
                                            <td className="px-5 py-4 text-start text-[#101828] text-sm ">
                                                <div className="flex flex-row gap-[10px] items-center">
                                                    <span className="bg-[#EAECF0] rounded-[4px] text-[12px] font-medium w-auto h-auto px-[7px] py-[1px] min-w-[22px] text-center">{index1 + 1}</span>
                                                    {content.lessonHeading}
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 text-start text-[#101828] text-sm">{formatScheduleDate(content.lessonScheduleDate)}</td>
                                            <td className="px-5 py-4 text-start text-[#101828] text-sm">{content.type}</td>
                                            <td className="flex items-center justify-center px-8 py-4 text-[#101828] text-sm">
                                                <Popover
                                                    placement="bottom-end"
                                                    isOpen={popoverOpen4 === content.contentId}
                                                    onOpenChange={(open) => open ? handlePopoverOpen4(content.contentId) : setPopoverOpen4(null)}
                                                >
                                                    <PopoverTrigger>
                                                        <button
                                                            onClick={() => setPopoverOpen4(content.contentId)}
                                                        >

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
                                                                    setPassedSectionId(section.sectionId); setIsContentEditing(true); setContentId(content.contentId); setPopoverOpen4(null);
                                                                }} >
                                                                <Image src="/icons/edit-02.svg" width={18} height={18} alt="edit" />
                                                                <span className="text-sm text-[#0C111D] font-normal">Edit</span>
                                                            </button>
                                                            <button className=" flex flex-row items-center justify-start w-full py-2 gap-2 hover:bg-[#FEE4E2] pl-4 pr-9"
                                                                onClick={() => {
                                                                    setDeletedialog(true); setContentToDelete({ sectionId: section.sectionId, contentId: content.contentId }); setPopoverOpen4(null);
                                                                }}>
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
                                    isOpen={popoveropen3 === index}
                                    onOpenChange={(open) => open ? handlePopoverOpen3(index) : setPopoveropen3(null)}
                                    placement="bottom">
                                    <PopoverTrigger>
                                        <button
                                            className="flex flex-row gap-1 items-center px-5 rounded-md border-[2px] border-solid hover:bg-[#F5F0FF] border-[#9012FF] h-[44px] w-auto justify-center "
                                        >
                                            <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                                            <span className="text-[#9012FF] font-semibold text-sm">Add Content</span>
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="flex flex-col px-0 text-sm font-normal bg-white border border-lightGrey rounded-md w-[167px] shadow-md">
                                        <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                            onClick={() => {
                                                setShowDrawerfortest(true); setPassedSectionId(section.sectionId); setIsContentEditing(false);
                                                setPopoveropen3(null); setContentId('');
                                            }}>
                                            <Image src="/icons/read.svg" alt="learn-icon" width={20} height={20} />
                                            <span className="text-sm text-[#0C111D] font-normal">Text</span>
                                        </button>
                                        <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                            onClick={() => {
                                                openDrawerforVideo(); setPassedSectionId(section.sectionId); setIsContentEditing(false);
                                                setPopoveropen3(null); setContentId('');
                                            }}>
                                            <Image src="/icons/vedio.svg" alt="video-icon" width={20} height={20} />
                                            <span className="text-sm text-[#0C111D] font-normal">Video</span>
                                        </button>
                                        <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                            onClick={() => {
                                                openDrawerforQuiz(); setPassedSectionId(section.sectionId); setIsContentEditing(false);
                                                setPopoveropen3(null); setContentId('');
                                            }}>
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
            {/* DIALOG FOR CREATING SECTION */}
            <Modal
                isOpen={openSectionDialog}
                onOpenChange={(isOpen) => !isOpen && closeCreateSection()}
                hideCloseButton
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-row justify-between items-center gap-1">
                            <h3 className="text-2xl font-semibold text-[#1D2939]">{isSectionEditing ? 'Edit Section' : 'Create Section'}</h3>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">

                                <button onClick={closeCreateSection} className="">
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                </button>
                            </button>
                        </ModalHeader>

                        <ModalBody>
                            <div className="flex flex-col w-full gap-1 ">
                                <p className="text-start text-sm text-[#1D2939] font-medium">Name</p>
                                <div className="flex flex-row w-full h-10 px-3 outline-none border border-lightGrey  focus-within:border-[#D7BBFC] focus-within:ring-4 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors rounded-md">
                                    <input
                                        type="text"
                                        className="w-full  text-sm text-[#182230] font-normal outline-none rounded-md"
                                        placeholder="Enter Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}

                                    />
                                </div>
                            </div>
                            <div className="flex flex-col w-full gap-2  mb-2">
                                <p className="text-start text-lg text-[#1D2939] font-semibold">Schedule Section</p>
                                <DatePicker
                                    granularity="minute"
                                    minValue={today(getLocalTimeZone())}
                                    value={sectionScheduleDate ? parseDateTime(sectionScheduleDate) : undefined}
                                    hideTimeZone
                                    onChange={(date) => {
                                        const dateString = date ? date.toString() : "";
                                        setSectionScheduleDate(dateString);

                                    }}

                                />



                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={closeCreateSection} variant="light" className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm hover:bg-[#F2F4F7]">Cancel</Button>
                            <Button
                                onClick={() => handleAddSection()}
                                disabled={!isCreateSectionFilled}
                                className={`py-[0.625rem] px-6 text-white shadow-inner-button border border-white ${!isCreateSectionFilled ? 'bg-[#CDA0FC]' : 'bg-[#9012FF] transition-colors duration-150 hover:bg-[#6D0DCC]'} rounded-md font-semibold text-sm`}>
                                {isSectionEditing ? 'Save Changes' : 'Create Section'}
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
            {/* DIALOG FOR DELETE */}
            <Modal
                isOpen={deletedialog}
                onOpenChange={(isOpen) => {
                    if (!isOpen) {
                        setDeletedialog(false);
                        setSectionToDelete(null); // Reset on close
                        setContentToDelete(null);
                    }
                }}
                hideCloseButton  >

                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-row justify-between items-center gap-1">
                            <h1 className="text-[#1D2939] font-bold text-lg">
                                {contentToDelete ? "Remove Content" : "Delete Section"}
                            </h1>
                            <button
                                className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]"
                                onClick={() => setDeletedialog(false)}
                            >
                                <Image
                                    src="/icons/cancel.svg"
                                    alt="Cancel"
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </ModalHeader>
                        <ModalBody >
                            <span className="text-sm font-normal text-[#667085]"> {contentToDelete
                                ? "Removing this content will permanently delete it from the section. This action cannot be undone."
                                : "Deleting the section will permanently remove all its contents from the platform. This action cannot be undone."}</span>

                        </ModalBody>
                        <ModalFooter className="border-t border-lightGrey">
                            <Button variant="light" className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]" onClick={() => setDeletedialog(false)} >Cancel</Button>
                            <Button className="py-[0.625rem] px-6 text-white font-semibold shadow-inner-button   hover:bg-[#B0201A] bg-[#BB241A] border border-white rounded-md"
                                onClick={() => {
                                    if (sectionToDelete) {
                                        handleDeleteSection(sectionToDelete);
                                    } else if (contentToDelete) {
                                        handleDeleteContent(contentToDelete.sectionId, contentToDelete.contentId);
                                    }
                                    setDeletedialog(false);
                                    setSectionToDelete(null);
                                    setContentToDelete(null);
                                }}
                            >{contentToDelete ? "Remove Content" : "Delete Section"}</Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal >

            {/* Drawer for Test */}
            <Text isOpen={showDrawerfortest} toggleDrawer={() => setShowDrawerfortest(!showDrawerfortest)} sectionId={passedSectionId} courseId={courseId} isEditing={isContentEditing} contentId={contentId || ''} />
            {/* Drawer for Quiz */}
            <Quiz isOpen={showDrawerforQuiz} toggleDrawer={() => setShowDrawerforQuiz(!showDrawerforQuiz)} sectionId={passedSectionId} courseId={courseId} isEditing={isContentEditing} contentId={contentId} />
            {/* Drawer for Video */}
            <Video isOpen={showDrawerforVideo} toggleDrawer={() => setShowDrawerforVideo(!showDrawerforVideo)} sectionId={passedSectionId} courseId={courseId} isEditing={isContentEditing} contentId={contentId} />
        </div>
    );
}

export default CourseContent;

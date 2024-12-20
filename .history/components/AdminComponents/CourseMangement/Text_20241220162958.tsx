"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef, SetStateAction, Dispatch } from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill-new'; // Ensure correct import
import Quill from 'quill'; // Import Quill to use it for types
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Switch } from "antd";
import { DatePicker } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "@/firebase";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import LoadingData from "@/components/Loading";

// Define the props interface
interface TestProps {
    isOpen: boolean;           // isOpen should be a boolean
    toggleDrawer: () => void;  // toggleDrawer is a function that returns void
    courseId: string;
    sectionId: string;
    isEditing: boolean;
    contentId: string;
}
function Text({ isOpen, toggleDrawer, sectionId, courseId, isEditing, contentId }: TestProps) {
    // state for ReactQuill
    const quillRef = useRef<ReactQuill | null>(null); // Ref to hold ReactQuill instance
    const [quill, setQuill] = useState<Quill | null>(null);
    const [alignment, setAlignment] = useState<string | null>(null); // State to hold alignment
    const [isWriting, setIsWriting] = useState(false); // Track if text is being written
    const [lessonHeading, setLessonHeading] = useState('');
    const [lessonOverView, setLessonOverView] = useState('');
    const [lessonContent, setLessonContent] = useState('');
    const [pdfLink, setPdfLink] = useState<string | null>(null);
    const [contentScheduleDate, setContentScheduleDate] = useState('');
    const [disscusionOpen, setDisscusionOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(lessonContent);
    const [fileName, setFileName] = useState<string | null>(null); // State to hold the file name
    const [progress, setProgress] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadTaskRef, setUploadTaskRef] = useState<any>(null); // State to hold the upload task reference
    const [showDatepicker, setShowDatepicker] = useState(false);
    const [sectionScheduleDate, setSectionScheduleDate] = useState("");

    const isFormValid = lessonHeading && lessonOverView && lessonContent && contentScheduleDate;



    const formatScheduleDate = (dateString: string | null): string => {
        if (!dateString) return "-"; // Return "-" if the date is null or undefined

        try {
            const dateObj = new Date(dateString);

            if (isNaN(dateObj.getTime())) {
                // If date is invalid
                return "-";
            }

            // Format the date manually to match "MM/DD/YYYY,HH:mm"
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, "0");
            const day = String(dateObj.getDate()).padStart(2, "0");
            const hours = String(dateObj.getHours()).padStart(2, "0");
            const minutes = String(dateObj.getMinutes()).padStart(2, "0");

            return `${month}/${day}/${year},${hours}:${minutes}`;
        } catch (error) {
            console.error("Error formatting date:", error);
            return "-";
        }
    };


    useEffect(() => {
        if (isEditing) {
            setLoading(true);
            fetchContentData(contentId || '');
        }
        else {
            setLessonHeading('');
            setLessonOverView('');
            setLessonContent('');
            setPdfLink(null);
            setProgress(null); // Reset progress
            setFileName(null);
            setContentScheduleDate('');
            setDisscusionOpen(false);
            setValue('');
            formatScheduleDate
        }
    }, [isEditing, contentId]);

    const fetchContentData = async (contentId: string) => {
        try {
            const contentDocRef = doc(db, "course", courseId, 'sections', sectionId, 'content', contentId);
            const contentDocSnap = await getDoc(contentDocRef);

            if (contentDocSnap.exists()) {
                const content = contentDocSnap.data();
                setLessonHeading(content.lessonHeading || '');
                setLessonOverView(content.lessonOverView || '');
                setLessonContent(content.lessonContent || '');
                setPdfLink(content.pdfLink || '');
                setContentScheduleDate(content.lessonScheduleDate || '');
                setDisscusionOpen(content.isDisscusionOpen || '');
                setLoading(false);
            } else {
                toast.error("Content not found!");
            }
        } catch (error) {
            console.error("Error fetching quiz data:", error);
            toast.error("Error loading content data.");
        }
    };

    const handleChange = (content: string) => {
        checkTextContent(content);
        setLessonContent(content);
    };

    const checkTextContent = (content: string) => {
        // Trim the content and check if there's actual text (excluding HTML tags like <p></p>)
        const plainText = content.replace(/<[^>]+>/g, '').trim();
        setIsWriting(plainText.length > 0);
    };
    const handleBlur = () => {
        setIsWriting(false); // Reset isWriting when user clicks outside
    };


    const handleIconClick = (format: string) => {
        if (quill) {
            const range = quill.getSelection();
            if (range) {
                const currentFormats = quill.getFormat(range);
                if (format === 'ordered') {
                    // Toggle ordered list
                    quill.format('list', currentFormats.list === 'ordered' ? false : 'ordered');
                } else if (format.startsWith('align')) {
                    if (format === 'align-left') {
                        quill.format('align', false); // Remove alignment for 'left'
                        setAlignment('left'); // Update alignment state to 'left'
                    } else {
                        quill.format('align', format.split('-')[1]);
                        setAlignment(format.split('-')[1]);
                    }
                } else {
                    const isActive = currentFormats[format];
                    quill.format(format, !isActive); // Toggle other formatting options
                }
            }
        }
    };

    useEffect(() => {
        if (quillRef.current) {
            setQuill(quillRef.current.getEditor());
        }
    }, []);

    const handleKeyDown = () => {
        if (quill) {
            const range = quill.getSelection();
            if (range) {
                const currentFormats = quill.getFormat(range);
                if (currentFormats.bold) {
                    quill.format('bold', false); // Clear bold formatting when typing starts
                }
                if (currentFormats.italic) {
                    quill.format('italic', false); // Clear italic formatting when typing starts
                }
                if (currentFormats.underline) {
                    quill.format('underline', false);
                }
            }
        }
    };
    // -----------------------------------------------------------------------------------------------------------------------------------------------------

    const togglebutton = (checked: boolean | ((prevState: boolean) => boolean)) => {
        setDisscusionOpen(checked);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const file = event.dataTransfer.files?.[0]; // Get the first dropped file
        if (file) {
            if (file.type === "application/pdf") { // Check if the file is a PDF
                setFileName(file.name); // Set file name when a file is selected
                setPdfLink(null); // Reset file URL until the upload is complete
                try {
                    const storageRef = ref(storage, `CourseContentFiles/${courseId}/${sectionId}/${file.name}`);
                    const uploadTask = uploadBytesResumable(storageRef, file);
                    setUploadTaskRef(uploadTask); // Set the upload task reference

                    setSelectedFile(file); // Store the selected file to access its size

                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const progressPercentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            setProgress(progressPercentage);
                        },
                        (error) => {
                            console.error("Upload error:", error);
                            setProgress(null);
                        },
                        async () => {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            setPdfLink(downloadURL);
                            setProgress(null);
                        }
                    );
                } catch (error) {
                    console.error("Error uploading file:", error);
                }
            } else {
                console.error("Invalid file type. Only PDFs are allowed.");
                alert("Please upload a valid PDF file.");
            }
        }
    };


    const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name); // Set file name when a file is selected
            setPdfLink(null); // Reset file URL until the upload is complete
            try {
                const storageRef = ref(storage, `CourseContentFiles/${courseId}/${sectionId}/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);
                setUploadTaskRef(uploadTask); // Set the upload task reference

                setSelectedFile(file); // Store the selected file to access its size

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progressPercentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setProgress(progressPercentage);
                    },
                    (error) => {
                        console.error("Upload error:", error);
                        setProgress(null);
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        setPdfLink(downloadURL);
                        // setFileType(type);
                        setProgress(null);
                    }
                );
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }

    };

    const handleSaveText = async () => {
        try {
            if (isEditing) {
                const contentRef = doc(db, "course", courseId, 'sections', sectionId, 'content', contentId);
                const courseData = {
                    lessonHeading: lessonHeading,
                    lessonOverView: lessonOverView,
                    lessonContent: lessonContent,
                    pdfLink: pdfLink ? pdfLink : null,
                    lessonScheduleDate: contentScheduleDate,
                    isDisscusionOpen: disscusionOpen,
                };
                await updateDoc(contentRef, courseData);
                toast.success('Changes saved!');
                toggleDrawer();

            }
            else {
                // Generate a unique section ID (Firestore will auto-generate if you use addDoc)
                const newContentRef = doc(collection(db, 'course', courseId, 'sections', sectionId, 'content')); // No need for custom sectionId generation if using Firestore auto-ID
                await setDoc(newContentRef, {
                    contentId: newContentRef.id,
                    type: 'Text',
                    lessonHeading: lessonHeading,
                    lessonOverView: lessonOverView,
                    lessonContent: lessonContent,
                    pdfLink: pdfLink ? pdfLink : null,
                    lessonScheduleDate: contentScheduleDate,
                    isDisscusionOpen: disscusionOpen,

                });
                toast.success('Test Content added!');
                toggleDrawer();
                setLessonHeading('');
                setLessonOverView('');
                setLessonContent('');
                setPdfLink(null);
                setProgress(null); // Reset progress
                setFileName(null);
                setContentScheduleDate('');
                setDisscusionOpen(false);
                setValue('');
            }
        } catch (error) {
            console.error('Error adding content: ', error);
        }

    };

    if (loading) {
        return <LoadingData />
    }

    return (
        <div>
            <Drawer
                open={isOpen}

                direction="bottom"
                className="rounded-tl-md rounded-tr-md "
                style={{ height: "98vh" }}
            >
                {/* Drawer content goes here */}
                <div className="flex flex-col h-full "> {/* Change 1: Wrap everything in a flex column container */}
                    {/* Top Section - Fixed */}
                    <div className="p-5 flex justify-between items-center h-[69px] w-auto border-b-[1.5px] border-t-[1.5px] border-[#EAECF0] rounded-tl-[18px] rounded-tr-[16px]">
                        <span className="text-lg font-semibold text-[#1D2939]">Lesson</span>
                        <div className={`w-auto h-[44px]  rounded-[8px] flex items-center justify-center flex-row gap-4  `}>
                            <button
                                onClick={toggleDrawer}
                                className="w-[103px] h-[40px] flex items-center justify-center text-sm  border border-solid border-[#EAECF0] font-semibold text-[#1D2939] rounded-[8px] p-4 hover:bg-[#F2F4F7]">
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveText}
                                disabled={!isFormValid}
                                className={`w-[90px] h-[40px] flex items-center justify-center text-sm shadow-inner-button ${!isFormValid ? 'bg-[#CDA0FC]' : 'bg-[#9012FF]'} border border-solid border-white font-semibold text-[#FFFFFF] rounded-md p-4 `}>
                                Save
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center h-auto overflow-y-auto ">
                        <div className="h-auto gap-4 p-6 rounded-md w-[684px] flex flex-col">
                            <div className='flex flex-col gap-2'>
                                <span className='text-[#1D2939] text-sm font-semibold'>Lesson Heading</span>
                                <input
                                    className="font-normal pl-3 text-[#1D2939] text-sm placeholder:text-[#A1A1A1] rounded-md placeholder:font-normal h-10 overflow-y-auto
                                    border border-gray-300 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] focus-within:border-[#D7BBFC] focus-within:ring-4 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors"
                                    placeholder="Lesson"
                                    type="text"
                                    value={lessonHeading}
                                    onChange={(e) => setLessonHeading(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className='text-[#1D2939] text-sm font-semibold '>Lesson Overview</span>
                                <textarea
                                    className="w-full h-auto py-2 px-3 min-h-[100px] text-sm text-[#1D2939] placeholder:text-[#A1A1A1]  rounded-md focus:outline-none focus:ring-0 resize-none break-all max-h-[120px] 
                                    border border-gray-300 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] focus-within:border-[#D7BBFC] focus-within:ring-4 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors
                                    focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                                    placeholder="Overview"
                                    value={lessonOverView}
                                    onChange={(e) => setLessonOverView(e.target.value)}
                                />
                            </div>
                            {/* Description of Courses */}
                            <div className="flex flex-col gap-2">
                                <span className='text-[#1D2939] text-sm font-semibold '>Content</span>
                                <div
                                    className={`pt-2 bg-[#FFFFFF] border ${isWriting ? 'border-[#D6BBFB]  shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]' : 'border-[#EAECF0]'
                                        } rounded-[12px] h-auto`}>
                                    <div className="bg-[#FFFFFF] ">
                                        <ReactQuill
                                            ref={quillRef}
                                            onBlur={handleBlur}
                                            value={lessonContent}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                            modules={{ toolbar: false }}
                                            placeholder="Content"
                                            className="text-[#1D2939] focus:outline-none rounded-b-[12px] custom-quill placeholder:not-italic min-h-[10px] max-h-[150px] overflow-y-auto border-none font-normal"
                                        />
                                    </div>
                                    <div className="h-[66px] bg-[#FFFFFF] rounded-bl-[12px] rounded-br-[12px] flex justify-center items-center">
                                        <div className="flex flex-row w-full justify-between items-center mx-5">
                                            <div className="h-[24px] w-[288px] gap-[24px] flex flex-row">
                                                <button onClick={() => handleIconClick('bold')}>
                                                    <Image src="/icons/Bold.svg" width={24} height={24} alt="bold" />
                                                </button>
                                                <button onClick={() => handleIconClick('italic')}>
                                                    <Image src="/icons/italic-icon.svg" width={24} height={24} alt="italic-icon" />
                                                </button>
                                                <button onClick={() => handleIconClick('underline')}>
                                                    <Image src="/icons/underline-icon.svg" width={24} height={24} alt="underline-icon" />
                                                </button>
                                                <Popover placement="bottom-start" className="flex flex-row justify-end">
                                                    <PopoverTrigger className="">
                                                        <button className="flex items-center justify-center p-1">
                                                            {alignment === 'center' ? (
                                                                <Image src="/icons/align-middle.svg" width={24} height={26} alt="align-center" />
                                                            ) : alignment === 'right' ? (
                                                                <Image src="/icons/align-right.svg" width={24} height={26} alt="align-right" />
                                                            ) : (
                                                                <Image src="/icons/dropdown-icon-1.svg" width={32} height={32} alt="align-left" />
                                                            )}
                                                        </button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="flex flex-row bg-white rounded-[8px] border-[1px] border-solid border-[#EAECF0] p-2 w-[120px] shadow-[0_2px_4px_#EAECF0] gap-2 ">

                                                        <button onClick={() => handleIconClick("align-left")} className="flex items-center justify-center hover:bg-[#F2F4F7]">
                                                            <Image src="/icons/align-left.svg" width={30} height={30} alt="align-left" />
                                                        </button>
                                                        <button onClick={() => handleIconClick("align-center")} className="flex items-center justify-center hover:bg-[#F2F4F7]">
                                                            <Image src="/icons/align-middle.svg" width={30} height={30} alt="align-center" />
                                                        </button>
                                                        <button onClick={() => handleIconClick("align-right")} className="flex items-center justify-center hover:bg-[#F2F4F7]">
                                                            <Image src="/icons/align-right.svg" width={30} height={30} alt="align-right" />
                                                        </button>

                                                    </PopoverContent>
                                                </Popover>
                                                <button onClick={() => handleIconClick('ordered')}>
                                                    <Image src="/icons/dropdown-icon-2.svg" width={27} height={27} alt="ordered-list" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Upload the Image */}
                            <div className=" flex flex-col gap-2">
                                <span className="text-[#1D2939] font-semibold text-sm">Upload PDF</span>
                                {!fileName && (
                                    <div className="h-[148px] rounded-xl bg-[#F9FAFB] border-2 border-dashed border-[#D0D5DD]"
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop}>
                                        <button className="flex flex-col items-center justify-center gap-4 h-full w-full">
                                            <div className="flex flex-col items-center">
                                                <div className="h-10 w-10 rounded-md border border-solid border-[#EAECF0] bg-[#FFFFFF] p-[10px]">
                                                    <Image
                                                        src="/icons/upload-cloud.svg"
                                                        width={20}
                                                        height={20}
                                                        alt="upload icon"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                <label className="font-semibold text-sm text-[#9012FF] hover:text-black cursor-pointer">
                                                    <input
                                                        type="file"
                                                        id="upload"
                                                        className="hidden"
                                                        accept=".pdf"
                                                        onChange={handlePdfUpload}
                                                    />
                                                    Click to upload
                                                </label>
                                                <span className="text-[#182230] text-sm font-medium">or drag and drop</span>
                                            </div>
                                        </button>
                                    </div>
                                )}

                                {fileName && (
                                    <div className="border border-solid border-[#EAECF0] rounded-md h-[58px] flex flex-row justify-between items-center px-4">
                                        <div className="flex flex-row  items-center">
                                            <Image className="w-[40px] h-[32px]" src='/icons/pdf-icon.svg' alt="PDF" width={42} height={20} />
                                            <span className="text-[#1D2939] font-normal text-sm ">{fileName}</span>
                                        </div>
                                        <div className="flex flex-row gap-3 items-center">
                                            {progress === 100 && (
                                                <div className="flex relative w-6 h-6 items-center justify-center">
                                                    <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                                        <path
                                                            className="text-gray-300"
                                                            strokeLinecap="round"
                                                            fill="none"
                                                            strokeWidth="3"
                                                            stroke="currentColor"
                                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        />
                                                        <path
                                                            className="text-[#9012FF]" // Change color to purple
                                                            strokeLinecap="round"
                                                            fill="none"
                                                            strokeWidth="3"
                                                            strokeDasharray={`${progress}, 100`}
                                                            stroke="currentColor"
                                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        />
                                                    </svg>
                                                </div>
                                            )}

                                            <button onClick={() => {
                                                if (uploadTaskRef) {
                                                    uploadTaskRef.cancel(); // Cancel the upload if it is ongoing
                                                    setProgress(null); // Reset progress
                                                }
                                                setPdfLink(null);
                                                setFileName(null); // Reset file name on cancel
                                            }}>
                                                <Image
                                                    src="/icons/delete.svg"
                                                    alt="cancel icon"
                                                    width={14}
                                                    height={14}
                                                    className="w-[16px] h-[16px]" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </div>
                            <div className="flex flex-col gap-2 mb-3 mt-1">
                                <span className="text-[#1D2939] font-semibold text-sm">Schedule Lesson</span>
                                {isEditing ? (
                                    <>

                                        <div className="flex flex-row justify-between items-center">
                                            <p className="text-[#1D2939] text-sm font-medium">  {formatScheduleDate(sectionScheduleDate) || " "}</p>
                                            <button
                                                className="flex flex-row gap-1 rounded-md border-[2px] border-solid border-[#9012FF] hover:bg-[#F5F0FF] bg-[#FFFFFF] p-2 "
                                                onClick={() => setShowDatepicker(true)}>
                                                <span className="text-[#9012FF] font-semibold text-sm">Change Date</span>
                                            </button>
                                        </div>
                                        {(showDatepicker &&
                                            <DatePicker
                                                granularity="minute"
                                                minValue={today(getLocalTimeZone())}
                                                hideTimeZone
                                                onChange={(date) => {
                                                    const dateString = date ? date.toString() : "";
                                                    setSectionScheduleDate(dateString);
                                                    setShowDatepicker(true); // Return to button view after selecting date
                                                }}

                                            />
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-row justify-end">
                                            <button
                                                className="flex flex-row gap-1 rounded-md border-[2px] border-solid border-[#9012FF]  bg-[#FFFFFF] p-2 hover:bg-[#F5F0FF] "
                                                onClick={() => setShowDatepicker(true)}>
                                                <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                                                <span className="text-[#9012FF] font-semibold text-sm">Select Date</span>
                                            </button>
                                        </div>

                                        {showDatepicker && (
                                            <DatePicker
                                                granularity="minute"
                                                minValue={today(getLocalTimeZone())}
                                                hideTimeZone
                                                onChange={(date) => {
                                                    const dateString = date ? date.toString() : "";
                                                    setSectionScheduleDate(dateString);

                                                }}
                                            />
                                        )}
                                    </>
                                )}
                            </div>

                            <div className="flex flex-row justify-between border border-solid border-[#EAECF0] h-12 p-3 bg-[#F9FAFB] rounded-md">
                                <span className="text-[#1D2939] font-semibold text-sm">Discussion forum</span>
                                <div className="flex flex-row gap-3">
                                    <span className="text-sm font-medium text-[#344054]">Close</span>
                                    <Switch
                                        checked={disscusionOpen}
                                        onChange={togglebutton}
                                        checkedChildren=""  // You can leave it empty or add any icon/text
                                        unCheckedChildren=""
                                        style={{
                                            backgroundColor: disscusionOpen ? '#8501FF' : '#D0D5DD',
                                        }}
                                    />
                                    <span className="text-sm font-medium text-[#667085]">Open</span>
                                </div>
                            </div>

                        </div>



                    </div>
                </div>
            </Drawer>
        </div>
    )
}
export default Text;
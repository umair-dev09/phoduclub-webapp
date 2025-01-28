"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef, SetStateAction, Dispatch } from "react";
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill-new'; // Ensure correct import
import Quill from 'quill'; // Import Quill to use it for types
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Switch } from "antd";
import { DatePicker } from "@nextui-org/react";
import { today, getLocalTimeZone, DateValue, parseDate, parseDateTime } from "@internationalized/date";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "@/firebase";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import video from "@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/VideoComp/CourseVideoPlayer"
// Define the props interface
interface VideoProps {
    isOpen: boolean;           // isOpen should be a boolean
    toggleDrawer: () => void;  // toggleDrawer is a function that returns void
    courseId: string;
    sectionId: string;
    isEditing: boolean;
    contentId: string;
}
interface VdoCipherResponse {
    otp: string;
    playbackInfo: string;
}
function Video({ isOpen, toggleDrawer, sectionId, courseId, isEditing, contentId }: VideoProps) {
    // ALL RELATED TO VIDEOCIPHER FUNCTION
    const [videocipherid, setVideocipherid] = useState('');
    const [videoData, setVideoData] = useState<VdoCipherResponse | null>(null);
    const [error, setError] = useState<string>('');
    const [uploading, setUploading] = useState(false);

    const fetchVideoData = async () => {
        if (!videocipherid) {
            setError('Please enter a video ID');
            return;
        }

        setUploading(true);
        setError('');
        setVideoData(null);

        try {
            const response = await fetch('/api/Videocipher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ videoId: videocipherid }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch video data');
            }

            const data: VdoCipherResponse = await response.json();

            // Log otp and playbackInfo to console
            console.log('Frontend: OTP:', data.otp);
            console.log('Frontend: PlaybackInfo:', data.playbackInfo);

            setVideoData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setUploading(false);
        }
    };




    // state for ReactQuill
    const quillRef = useRef<ReactQuill | null>(null); // Ref to hold ReactQuill instance
    const [quill, setQuill] = useState<Quill | null>(null);
    const [alignment, setAlignment] = useState<string | null>(null); // State to hold alignment
    const [lessonHeading, setLessonHeading] = useState('');
    const [lessonOverView, setLessonOverView] = useState('');
    const [videoId, setVideoId] = useState('');
    const [videoDuration, setVideoDuration] = useState<number | null>(null);
    const [videoLink, setVideoLink] = useState<string | null>(null);
    const [contentScheduleDate, setContentScheduleDate] = useState('');
    const [disscusionOpen, setDisscusionOpen] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null); // State to hold the file name
    const [progress, setProgress] = useState<number | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadTaskRef, setUploadTaskRef] = useState<any>(null); // State to hold the upload task reference
    const [loading, setLoading] = useState(false);
    const [showDatepicker, setShowDatepicker] = useState(false);
    const [value, setValue] = useState(lessonOverView);
    const openVideoUploadTab = () => {
        // navigator.clipboard.writeText(pId || '');
        // alert('Video Id is copied you can close this tab now.');
        window.open("http://localhost:3000/admin/uploadVideo", "_blank", "noopener,noreferrer");
    };

    const isFormValid = lessonHeading && lessonOverView && contentScheduleDate && videoLink;

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


    useEffect(() => {
        if (isEditing) {
            setLoading(true);
            fetchContentData(contentId || '');
        }
        else {
            setLessonHeading('');
            setLessonOverView('');
            setVideoLink(null);
            setProgress(null); // Reset progress
            setFileName(null);
            setContentScheduleDate('');
            setDisscusionOpen(false);
            setVideoId('');
            setSelectedFile(null);

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
                setVideoLink(content.videoLink || '');
                setContentScheduleDate(content.lessonScheduleDate || '');
                setDisscusionOpen(content.isDisscusionOpen || '');
                setFileName(content.videoFileName);
                setVideoId(content.videoId);
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
        setLessonOverView(content);
        setValue(content);

        // If content is effectively empty (just contains whitespace or is an empty HTML tag)
        if (!content || content.trim() === '<p><br></p>') {
            setValue('');
            setLessonOverView('');
        }
    };




    const modules = {
        toolbar: false, // We're using custom toolbar
        resize: {
            locale: {},
        },

    };
    useEffect(() => {
        setValue(lessonOverView);
    }, [lessonOverView]);

    const handleIconClick = (format: string) => {
        if (quill) {
            const range = quill.getSelection();
            if (range) {
                const currentFormats = quill.getFormat(range);
                if (format === 'ordered') {
                    // Toggle ordered list
                    quill.format('list', currentFormats.list === 'ordered' ? false : 'ordered');
                } else if (format === 'image') {
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.accept = 'image/*';
                    fileInput.onchange = () => {
                        const file = fileInput.files?.[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                if (e.target?.result && quill) {
                                    quill.insertEmbed(range.index, 'image', e.target.result as string);
                                }
                            };
                            reader.readAsDataURL(file);
                        }
                    };
                    fileInput.click();
                }
                else if (format.startsWith('align')) {
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

    const [checkedState, setCheckedState] = useState(false);

    // Toggle function to change the checked state
    const handleToggle = () => {
        setCheckedState((prevState) => !prevState);
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
            if (file.type.startsWith("video/")) { // Check if the file is a video
                setFileName(file.name); // Set file name when a file is selected
                setVideoLink(null); // Reset file URL until the upload is complete

                // Create a video element to extract duration
                const videoElement = document.createElement("video");
                videoElement.src = URL.createObjectURL(file);
                videoElement.onloadedmetadata = () => {
                    setVideoDuration(videoElement.duration); // Set the duration in seconds
                    URL.revokeObjectURL(videoElement.src); // Clean up the object URL
                };

                try {
                    const storageRef = ref(storage, `CourseContentFiles/${courseId}/${sectionId}/${file.name}`);
                    const uploadTask = uploadBytesResumable(storageRef, file);
                    setUploadTaskRef(uploadTask); // Set the upload task reference
                    setSelectedFile(file); // Store the selected file to access its size

                    // Wrap the upload process with toast.promise
                    toast.promise(
                        new Promise((resolve, reject) => {
                            uploadTask.on(
                                "state_changed",
                                (snapshot) => {
                                    const progressPercentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    setProgress(progressPercentage);
                                },
                                (error) => {
                                    console.error("Upload error:", error);
                                    setProgress(null);
                                    reject("Failed to upload video. Please try again.");
                                },
                                async () => {
                                    try {
                                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                                        setVideoLink(downloadURL);
                                        setProgress(null);
                                        resolve("Video uploaded successfully!");
                                    } catch (error) {
                                        console.error("Error fetching download URL:", error);
                                        reject("Failed to fetch video URL. Please try again.");
                                    }
                                }
                            );
                        }),
                        {
                            pending: "Uploading video...",
                            success: "Video uploaded successfully! 🎉",
                            error: "Failed to upload video. Please try again.",
                        }
                    );
                } catch (error) {
                    console.error("Error uploading file:", error);
                    toast.error("An unexpected error occurred during upload.");
                }
            } else {
                console.error("Invalid file type. Only Videos are allowed.");
                alert("Only videos are allowed!");
            }
        }
    };

    const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name); // Set file name when a file is selected
            setVideoLink(null); // Reset file URL until the upload is complete

            // Create a video element to extract duration
            const videoElement = document.createElement("video");
            videoElement.src = URL.createObjectURL(file);
            videoElement.onloadedmetadata = () => {
                setVideoDuration(videoElement.duration); // Set the duration in seconds
                URL.revokeObjectURL(videoElement.src); // Clean up the object URL
            };

            try {
                const storageRef = ref(storage, `CourseContentFiles/${courseId}/${sectionId}/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);
                setUploadTaskRef(uploadTask); // Set the upload task reference
                setSelectedFile(file); // Store the selected file to access its size

                // Wrap the upload process with toast.promise
                toast.promise(
                    new Promise((resolve, reject) => {
                        uploadTask.on(
                            "state_changed",
                            (snapshot) => {
                                const progressPercentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                setProgress(progressPercentage);
                            },
                            (error) => {
                                console.error("Upload error:", error);
                                setProgress(null);
                                reject("Failed to upload video. Please try again.");
                            },
                            async () => {
                                try {
                                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                                    setVideoLink(downloadURL);
                                    setProgress(null);
                                    resolve("Video uploaded successfully!");
                                } catch (error) {
                                    console.error("Error fetching download URL:", error);
                                    reject("Failed to fetch video URL. Please try again.");
                                }
                            }
                        );
                    }),
                    {
                        pending: "Uploading video...",
                        success: "Video uploaded successfully!",
                        error: "Failed to upload video. Please try again.",
                    }
                );
            } catch (error) {
                console.error("Error uploading file:", error);
                toast.error("An unexpected error occurred during upload.");
            }
        }
    };

    const handleSaveVideo = async () => {
        try {

            if (isEditing) {
                const contentRef = doc(db, "course", courseId, 'sections', sectionId, 'content', contentId);
                const courseData = {
                    lessonHeading: lessonHeading,
                    lessonOverView: lessonOverView,
                    videoLink: videoLink ? videoLink : null,
                    lessonScheduleDate: contentScheduleDate,
                    isDisscusionOpen: disscusionOpen,
                    videoFileName: fileName,
                    videoDuration,
                    // videoId,
                };
                await updateDoc(contentRef, courseData);
                toast.success('Changes saved!');
                toggleDrawer();
                setLessonHeading('');
                setLessonOverView('');
                setVideoLink(null);
                setProgress(null); // Reset progress
                setFileName(null);
                setContentScheduleDate('');
                setDisscusionOpen(false);
                setSelectedFile(null);
            }
            else {
                // Generate a unique section ID (Firestore will auto-generate if you use addDoc)
                const newContentRef = doc(collection(db, 'course', courseId, 'sections', sectionId, 'content')); // No need for custom sectionId generation if using Firestore auto-ID
                await setDoc(newContentRef, {
                    contentId: newContentRef.id,
                    type: 'Video',
                    lessonHeading: lessonHeading,
                    lessonOverView: lessonOverView,
                    videoLink: videoLink ? videoLink : null,
                    lessonScheduleDate: contentScheduleDate,
                    isDisscusionOpen: disscusionOpen,
                    videoFileName: fileName,
                    videoDuration,
                    //   videoId,
                });
                toast.success('Video Content added!');
                toggleDrawer();
                setLessonHeading('');
                setLessonOverView('');
                setVideoLink(null);
                setProgress(null); // Reset progress
                setFileName(null);
                setContentScheduleDate('');
                setDisscusionOpen(false);
                setSelectedFile(null);
            }
        } catch (error) {
            console.error('Error adding content: ', error);
        }

    };

    return (
        <div>
            <Drawer
                open={isOpen}

                direction="bottom"
                className="rounded-tl-md rounded-tr-md "
                style={{ height: "98vh" }}
            >
                {/* Drawer content goes here */}
                <div className="flex flex-col h-full pb-6"> {/* Change 1: Wrap everything in a flex column container */}
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
                                onClick={handleSaveVideo}
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

                            {/* Description of Courses */}
                            <div className="flex flex-col gap-2">
                                <span className='text-[#1D2939] text-sm font-semibold '> Lesson Overview</span>
                                <div
                                    className="pt-2 bg-[#FFFFFF] border border-gray-300 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] focus-within:border-[#D7BBFC] focus-within:ring-4 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors rounded-[12px] h-auto">
                                    <div className="bg-[#FFFFFF] ">
                                        <ReactQuill
                                            ref={quillRef}
                                            value={value}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                            modules={modules}
                                            placeholder="Overview"
                                            className="text-[#1D2939] focus:outline-none rounded-b-[12px] custom-quill placeholder:not-italic min-h-[10px] max-h-[350px] overflow-y-auto border-none font-normal text-sm"
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
                                                <button onClick={() => handleIconClick('image')}>
                                                    <Image src="/icons/upload-image-icon.svg" width={24} height={24} alt="upload-image-icon" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Upload the video */}
                            <div className=" flex flex-col gap-2">
                                <span className="text-[#1D2939] font-semibold text-sm">Upload Video</span>
                                {(!selectedFile) && (
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
                                                        accept="video/*"
                                                        onChange={handleVideoUpload}
                                                    />
                                                    Click to upload
                                                </label>
                                                <span className="text-[#182230] text-sm font-medium">or drag and drop</span>
                                            </div>
                                        </button>
                                    </div>
                                )}

                                {(selectedFile || videoLink) && (
                                    <div className="border border-solid border-[#EAECF0] rounded-md h-[58px] flex flex-row justify-between items-center px-4">
                                        <div className="flex flex-row gap-1 items-center">
                                            <Image className="w-[30px] h-[20px]" src='/icons/play.svg' alt="Video" width={32} height={15} />
                                            <span className="text-[#1D2939] font-normal text-sm ">{fileName}</span>
                                        </div>
                                        <div className="flex flex-row gap-3 items-center">
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

                                            <button onClick={() => {
                                                if (uploadTaskRef) {
                                                    uploadTaskRef.cancel(); // Cancel the upload if it is ongoing
                                                    setProgress(null); // Reset progress
                                                }
                                                setVideoLink(null);
                                                setFileName(null); // Reset file name on cancel
                                                setSelectedFile(null);
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
                            <div className="max-w-4xl mx-auto p-4">
                                <h1 className="text-xl font-bold mb-4">VdoCipher Video Player</h1>

                                <div className="flex items-center mb-4">
                                    <input
                                        type="text"
                                        value={videocipherid}
                                        onChange={(e) => setVideocipherid(e.target.value)}
                                        placeholder="Enter Video ID"
                                        className="border rounded-lg p-2 flex-1 mr-4"
                                    />
                                    <button
                                        onClick={fetchVideoData}
                                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                                    >
                                        Load Video
                                    </button>
                                </div>

                                {uploading && <div className="text-center">Uploading video...</div>}

                                {error && <div className="text-red-500 mb-4">{error}</div>}

                                <video videoData={videoData} />

                            </div>

                            {/* <div className='flex flex-col gap-2'>
                                <div className="flex flex-row justify-between items-center">
                                    <div className="flex flex-col">
                                    <span className='text-[#1D2939] text-sm font-semibold'>Video Id</span>
                                    <span className='text-[#1D2939] text-[12px] font-normal'>To get the video id click on the upload video button.</span>
                                    </div>
                                <button
                                className="text-white text-sm font-semibold rounded-md shadow-inner-button"
                                style={{
                                width: "150px",
                                height: "38px",
                                backgroundColor: "#9012FF",
                                borderWidth: "1px 0 0 0",
                                borderColor: "#9012FF",
                                }} onClick={openVideoUploadTab}>Upload Video</button>
                                </div>
                                <input
                                    className="font-normal pl-3 text-[#1D2939] text-sm placeholder:text-[#A1A1A1] rounded-md placeholder:font-normal min-h-[10px] max-h-[150px] overflow-y-auto 
                                    focus:outline-none focus:ring-0 
                                       border border-solid border-[#D0D5DD] h-[40px] 
                                       shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] 
                                         transition duration-200 ease-in-out "
                                    placeholder="Enter the video Id here"
                                    type="text"
                                    value={videoId}
                                    onChange={(e) => setVideoId(e.target.value)}
                                />
                            </div> */}


                            <div className="flex flex-col gap-2 mb-3 mt-1">
                                <span className="text-[#1D2939] font-semibold text-sm">Schedule Lesson</span>


                                <DatePicker
                                    granularity="minute"
                                    minValue={today(getLocalTimeZone())}
                                    value={contentScheduleDate ? parseDateTime(contentScheduleDate) : undefined}
                                    hideTimeZone
                                    onChange={(date) => {
                                        const dateString = date ? date.toString() : "";
                                        setContentScheduleDate(dateString);

                                    }}

                                />



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
export default Video;
"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import Quill from 'quill';
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { auth, db } from "@/firebase";
import { collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import LoadingData from "@/components/Loading";
import DiscussionDisplay from "@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/Discussioncomp/DiscussionDisplay";
import QuillResizeImage from 'quill-resize-image';
Quill.register("modules/resize", QuillResizeImage);

interface DiscussionProps {
    courseId: string;
    sectionId: string;
    contentId: string;
}

interface DiscussionData {
    message: string;
    isAdmin: boolean;
    userId: string;
    timestamp: string;
    messageId: string;
}

function Discussion({ courseId, sectionId, contentId }: DiscussionProps) {

    const [value, setValue] = useState('');
    const quillRef = useRef<ReactQuill | null>(null); // Ref to hold ReactQuill instance
    const [quill, setQuill] = useState<Quill | null>(null);
    const [alignment, setAlignment] = useState<string | null>(null); // State to hold Quill instance
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(true);

    const handleChange = (content: string) => {
        setValue(content);
    };

    const [discussions, setDiscussions] = useState<DiscussionData[]>([]);
    useEffect(() => {
        if (courseId && sectionId && contentId) {
            const fetchChats = async () => {
                try {
                    const discussionRef = collection(
                        db,
                        `course/${courseId}/sections/${sectionId}/content/${contentId}/Disscussion`
                    );
                    const discussionQuery = query(discussionRef, orderBy('timestamp', 'asc')); // Order by timestamp

                    const unsubscribe = onSnapshot(discussionQuery, (snapshot) => {
                        const discussionData: DiscussionData[] = snapshot.docs.map((doc) => ({
                            ...doc.data(),
                            messageId: doc.id, // Include the document ID
                        })) as DiscussionData[];
                        setDiscussions(discussionData); // Update state with the retrieved data
                        setLoading(false);
                    });

                    return () => unsubscribe();
                } catch (error) {
                    console.error("Error fetching chats: ", error);
                }
            };

            fetchChats();
        }
    }, [courseId, sectionId, contentId]);

    const handleSendMessage = async () => {
        if (auth.currentUser?.uid) {
            try {
                const ref = doc(collection(db, 'course', courseId, 'sections', sectionId, 'content', contentId, 'Disscussion'));

                const currentUserId = auth.currentUser.uid;

                const disscusionData = {
                    message: value,
                    userId: currentUserId,
                    timestamp: new Date().toISOString(),
                    messageId: ref.id,
                    isAdmin: true,
                };
                await setDoc(ref, disscusionData);
                setValue('');
                toast.success('Message sent!');
            } catch (error) {
                console.error('Error updating course document:', error);
                toast.error('Failed to mark lesson completed');
            }
        }
    };

    const handleIconClick = (format: string) => {
        if (quill) {
            const range = quill.getSelection();
            if (range) {
                const currentFormats = quill.getFormat(range);

                if (format === 'ordered') {
                    // Toggle ordered list
                    quill.format('list', currentFormats.list === 'ordered' ? false : 'ordered');
                }
                else if (format === 'image') {
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.accept = 'image/*';
                    fileInput.onchange = () => {
                        const file = fileInput.files?.[0];  // Safely access file
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                if (e.target && e.target.result) {  // Validate e.target
                                    const imageUrl = e.target.result as string;  // Type assertion
                                    quill.insertEmbed(range.index, 'image', imageUrl);
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
                }
                else {
                    const isActive = currentFormats[format];
                    quill.format(format, !isActive); // Toggle other formatting options
                }
            }
        }
    };

    const modules = {
        toolbar: false, // We're using custom toolbar
        resize: {
            locale: {},
        },

    };
    useEffect(() => {
        if (quillRef.current) {
            setQuill(quillRef.current.getEditor());
        }
    }, []);


    // This will clear formatting when the user types
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
    useEffect(() => {
        if (value.trim() === '') {
            setIsButtonDisabled(true); // Disable the button if the input is empty
        } else {
            setIsButtonDisabled(false); // Enable the button if there is content
        }
    }, [value]);
    return (
        <div className="flex flex-col h-[calc(100vh-200px)]">
            <div className="flex-1 overflow-y-auto px-6 gap-4 py-4">
                {loading ? (
                    <LoadingData />
                ) : (
                    <>
                        {discussions.map((d) => (
                            <div key={d.messageId} >
                                <DiscussionDisplay userId={d.userId} message={d.message} messageId={d.userId} isAdmin={d.isAdmin} timestamp={d.timestamp} courseId={""} sectionId={""} contentId={""} upvotes={[]} />
                            </div>
                        ))}
                    </>
                )}
                {/* <div className="flex flex-col gap-4 pb-4">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-2">
                            <Image
                                src="/images/photo.png"
                                width={36}
                                height={36}
                                alt="profile-icon" />
                            <div className="flex flex-col">
                                <h1 className="font-semibold text-sm text-[#182230]">Marvin McKinney</h1>
                                <span className="font-normal text-sm text-[#667085]">devon#8852</span>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <span className="text-xs font-normal text-[#475467]">3:24 PM</span>

                            <Popover placement="bottom-end">
                                <PopoverTrigger>
                                    <button className='focus:outline-none'>
                                        <Image src="/icons/three-dots.svg" width={24} height={24} alt="three-icon" />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto py-1 px-0 bg-white border border-lightGrey rounded-md flex flex-col">
                                    <button className='flex flex-row gap-2 items-center h-10 w-[173px] px-4 hover:bg-[#EAECF0]'>
                                        <Image
                                            src="/icons/pin-icon.svg"
                                            width={18}
                                            height={18}
                                            alt="pin-icon"
                                        />
                                        <span className='font-normal text-[#0C111D] text-sm'>Pin</span>
                                    </button>
                                    <button className='flex flex-row gap-2 items-center h-10 w-[173px] px-4 hover:bg-[#EAECF0]'>
                                        <Image
                                            src="/icons/delete.svg"
                                            width={18}
                                            height={18}
                                            alt="delete-icon"
                                        />
                                        <span className='font-normal text-[#DE3024] text-sm'>Delete message</span>
                                    </button>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="border border-solid border-[#EAECF0] rounded-[16px] bg-[#FFFFFF] px-4 py-3 h-auto ml-10">
                        <p className="font-normal text-sm text-[#182230]">The BITSET Full Course is designed to provide students with an in-depth understanding of bit manipulation techniques and the use of bitsets in data structures. This course will cover fundamental concepts, practical applications, and advanced techniques used in competitive programming and software development. Students will learn how to efficiently solve problems using bitwise operations and gain hands-on experience through coding exercises and projects.</p>
                    </div>
                    <button className="ml-10 flex flex-row gap-2 items-center">
                        <Image
                            src="/icons/comment-icon.svg"
                            width={20}
                            height={20}
                            alt="three-icon" />
                        <span className="text-[#1D2939] font-normal text-sm">30 Reply</span>
                    </button>
                </div> */}
                {/* <div className="flex flex-col gap-4 ml-10">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-2">
                            <Image
                                src="/images/photo.png"
                                width={36}
                                height={36}
                                alt="profile-icon" />
                            <div className="flex flex-col">
                                <h1 className="font-semibold text-sm text-[#182230]">Marvin McKinney</h1>
                                <span className="font-normal text-sm text-[#667085]">devon#8852</span>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <span className="text-xs font-normal text-[#475467]">3:24 PM</span>
                            <Image
                                src="/icons/three-dots.svg"
                                width={24}
                                height={24}
                                alt="three-icon" />
                        </div>
                    </div>
                    <div className="border border-solid border-[#EAECF0] rounded-[16px] bg-[#FFFFFF] px-4 py-3 h-auto ml-10">
                        <p className="font-normal text-sm text-[#182230]">The BITSET Full Course is designed to provide students with an in-depth understanding of bit manipulation techniques and the use of bitsets in data structures. This course will cover fundamental concepts, practical applications, and advanced techniques used in competitive programming and software development. Students will learn how to efficiently solve problems using bitwise operations and gain hands-on experience through coding exercises and projects.</p>
                    </div>
                    <div className="flex flex-row gap-6">
                        <button className=" ml-10 flex flex-row gap-2 items-center">
                            <Image
                                src="/icons/unpin-icon.svg"
                                width={20}
                                height={20}
                                alt="three-icon" />
                            <span className="text-[#9012FF] font-normal text-sm">Unpin</span>
                        </button>
                        <button className="flex flex-row gap-2 items-center">
                            <Image
                                src="/icons/comment-icon.svg"
                                width={20}
                                height={20}
                                alt="three-icon" />
                            <span className="text-[#1D2939] font-normal text-sm">30 Reply</span>
                        </button>
                    </div>
                </div> */}
            </div>
            <div className="sticky bottom-0 bg-white z-10 p-6">
                <div className=" bg-[#F7F8FB] w-full border border-solid border-[#EAECF0] rounded-[12px] h-auto">
                    <div className="bg-[#F7F8FB] border-b border-solid border-b-[#EAECF0] rounded-tl-[12px] rounded-tr-[12px]">
                        <ReactQuill
                            ref={quillRef}
                            value={value}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            modules={modules}
                            placeholder="Type your response here..."
                            className="text-[#1D2939] focus:outline-none rounded-b-[12px] custom-quill  placeholder:not-italic min-h-[66px] max-h-[350px] overflow-y-auto border-none font-normal"

                        />



                    </div>

                    {/* ---------------------------------------------------------------- */}
                    {/* THIS IS  THE PART WHERE WE CHANGE THE STYLING OF COMMENT AND SEND */}
                    <div className="h-[66px] bg-[#F7F8FB] rounded-bl-[12px] rounded-br-[12px] flex justify-center items-center">
                        <div className="flex flex-row w-full justify-between items-center mx-5">
                            {/* First div with text */}
                            <div className="h-[24px] w-[288px] gap-[24px] flex flex-row ">
                                {/* Icons */}
                                <button
                                    onClick={() => handleIconClick('bold')}
                                    className="hover:bg-[#EAECF0]"
                                >
                                    <Image src="/icons/Bold.svg" width={24} height={24} alt="bold" />



                                </button>
                                <button
                                    className="hover:bg-[#EAECF0]"
                                    onClick={() => handleIconClick('italic')}>

                                    <Image src="/icons/italic-icon.svg" width={24} height={24} alt="italic-icon" />
                                </button>

                                <button
                                    className="hover:bg-[#EAECF0]"
                                    onClick={() => handleIconClick('underline')}>
                                    <Image src="/icons/underline-icon.svg" width={24} height={24} alt="underline-icon" />
                                </button>
                                {/* -------------------------------------------------------------------------------------------------------------------------------- */}
                                <Popover placement="bottom-start" className="flex flex-row justify-end">
                                    <PopoverTrigger className="">
                                        {/* Display the current alignment icon in the trigger */}
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

                                    <PopoverContent className="flex flex-row bg-white rounded-[8px] border-[1px] border-solid border-[#EAECF0] px-2 w-[120px] shadow-[0_2px_4px_#EAECF0] gap-2">
                                        {/* These buttons will be inside the popover */}

                                        <button onClick={() => handleIconClick("align-left")} className="flex items-center justify-center hover:bg-[#EAECF0]">
                                            <Image src="/icons/align-left.svg" width={30} height={30} alt="align-left" />
                                        </button>
                                        <button onClick={() => handleIconClick("align-center")} className="flex items-center justify-center hover:bg-[#EAECF0]">
                                            <Image src="/icons/align-middle.svg" width={30} height={30} alt="align-center" />
                                        </button>
                                        <button onClick={() => handleIconClick("align-right")} className="flex items-center justify-center hover:bg-[#EAECF0]">
                                            <Image src="/icons/align-right.svg" width={30} height={30} alt="align-right" />
                                        </button>

                                    </PopoverContent>
                                </Popover>




                                {/* --------------------------------------------------------------------------------------------------------------------------------- */}

                                <button
                                    className="hover:bg-[#EAECF0]"
                                    onClick={() => handleIconClick('ordered')}>
                                    <Image src="/icons/dropdown-icon-2.svg" width={27} height={27} alt="dropdown-icon" />
                                </button>
                                <button onClick={() => handleIconClick('image')}
                                    className="hover:bg-[#EAECF0]">
                                    <Image src="/icons/upload-image-icon.svg" width={24} height={24} alt="upload-image-icon" />
                                </button>
                            </div>
                            {/* Button */}
                            <button
                                className={` w-[88px] h-[36px] flex justify-center items-center rounded-md shadow-inner-button 
                                                        ${isButtonDisabled ? 'bg-[#d8acff] cursor-not-allowed' : 'bg-[#8501FF] hover:bg-[#6D0DCC]'} 
                                                        ${isButtonDisabled ? '' : 'border border-solid border-[#800EE2]'}`}

                                disabled={isButtonDisabled} // Disable button if needed
                                onClick={handleSendMessage}
                            >
                                <span className="font-semibold text-[#FFFFFF] text-sm">Send</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
export default Discussion;
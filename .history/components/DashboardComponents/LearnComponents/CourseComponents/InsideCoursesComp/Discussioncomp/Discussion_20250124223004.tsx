"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill-new'; // Ensure correct import
import Quill from 'quill'; // Import Quill to use it for types
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import DiscussionDisplay from "./DiscussionDisplay";
import LoadingData from "@/components/Loading";

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
    upvotes: string[];
}


function Discussion({ courseId, sectionId, contentId }: DiscussionProps) {

    const [value, setValue] = useState('');
    const quillRef = useRef<ReactQuill | null>(null); // Ref to hold ReactQuill instance
    const [quill, setQuill] = useState<Quill | null>(null);
    const [alignment, setAlignment] = useState<string | null>(null); // State to hold Quill instance
    const [loading, setLoading] = useState(true);

    const isFormValid = value.trim();

    const handleChange = (content: string) => {
        if (quill && quill.getText().trim() === '') {
            setValue('');
        } else {
            setValue(content);
        }
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
                    const discussionQuery = query(discussionRef, orderBy('timestamp', 'desc')); // Order by timestamp

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
        if (value === '') { return; }
        if (auth.currentUser?.uid) {
            try {
                const ref = doc(collection(db, 'course', courseId, 'sections', sectionId, 'content', contentId, 'Disscussion'));
                const currentUserId = auth.currentUser.uid;
                const disscusionData = {
                    message: value,
                    userId: currentUserId,
                    timestamp: new Date().toISOString(),
                    messageId: ref.id,
                    isAdmin: false,
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

    // ------------------------------------------------------------------------------------------------------------------------------
    // Below logic for the "SHOW MORE AND SHOW LESS"

    const content = `The BITSET Full Course is designed to provide students with an in-depth understanding  of bit manipulation techniques and the use of bitsets in data structures. This course will cover fundamental concepts, practical applications, and advanced techniques used in competitive programming and software development. Students will learn how to efficiently solve problems using bitwise operations and gain hands-on experience through coding exercises and    The BITSET Full Course is designed to provide students with an in-depth understanding  of bit manipulation techniques and the use of bitsets in data structures. This course will cover fundamental concepts, practical applications, and advanced techniques used in competitive programming and software development. Students will learn how to efficiently solve problems using bitwise operations and gain hands-on experience through coding exercises and projects.`;
    //   ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ 
    return (

        <div className="flex flex-col overflow-y-auto h-auto  w-auto">
            <span className="ml-[24px] mt-[20px] w-[149px] h-[24px] text-1g text-[#1D2939] font-medium">Share your doubts</span>

            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {/* THIS HEADER PART OF THE DISCUSSION WHERE USER WRITES THE COMMENT */}
            <div className="mr-[24px] mt-[20px] ml-[24px] bg-[#F7F8FB] border border-solid border-[#EAECF0] rounded-[12px] h-auto">


                {/* Textarea for writing the comment */}
                <div className="bg-[#F7F8FB] border-b border-solid border-b-[#EAECF0] rounded-tl-[12px] rounded-tr-[12px]">
                    <ReactQuill
                        ref={quillRef}
                        value={value}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        modules={{ toolbar: false }}
                        placeholder="Type your response here..."
                        className=" text-[#1D2939] focus:outline-none rounded-b-[12px] break-all custom-quill placeholder:not-italic min-h-[10px] max-h-[150px] overflow-y-auto p-4 border-none not-italic"
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
                        </div>
                        {/* Button */}
                        <button
                            className={` w-[88px] h-[36px] flex justify-center items-center rounded-md shadow-inner-button 
                                        ${!isFormValid ? 'bg-[#d8acff] cursor-not-allowed' : 'border border-[#800EE2] bg-[#8501FF] transition-colors duration-150 hover:bg-[#6D0DCC]'}`}
                            disabled={!isFormValid} // Disable button if needed
                            onClick={handleSendMessage}
                        >
                            <span className="font-semibold text-[#FFFFFF] text-sm">Send</span>
                        </button>
                    </div>
                </div>

            </div>

            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {/* THIS IS THE MIDDLE-LINE */}
            <div className="mt-[30px]" />
            {loading ? (
                <LoadingData />
            ) : (
                <>
                    {discussions.map((d) => (
                        <div key={d.messageId} >
                            <DiscussionDisplay userId={d.userId} message={d.message} messageId={d.messageId} isAdmin={d.isAdmin} timestamp={d.timestamp} contentId={contentId} courseId={courseId} sectionId={sectionId} upvotes={d.upvotes || []} />
                        </div>
                    ))}
                </>
            )}


            {/* second comment */}
            {/* <div className="flex flex-row w-full justify-between">
                    <div className=" flex flex-row gap-3">
                        <Image
                            src="/images/photo.png"
                            width={46}
                            height={46}
                            alt=" Proflie -Image" />
                        <div className="flex flex-col gap-2">
                            <span className="font-medium text-sm text-[#1D2939]">Devon Lane</span>
                            <span className="font-normal text-sm text-[#1D2939] opacity-[50%]">devon#8852</span>
                        </div>
                    </div>
                    <span className="text-sm font-normal text-[#1D2939] opacity-[50%] flex items-center">
                        3 min ago
                    </span>
                </div>
                <div className=" flex flex-col ml-12 gap-3">
                    <div className="font-normal text-[#1D2939] text-sm opacity-[70%] leading-relaxed">
                        <ExpandableText content={content} />
                    </div>
                    <div className=" flex flex-row gap-6 items-center">
                        <button className="flex flex-row gap-1">
                            <Image
                                src="/icons/upvote.svg"
                                width={20}
                                height={20}
                                alt="upvote_button"
                                className=""

                            />
                            <span className="font-normal text-[#141B34] text-sm">24</span>
                            <span className=" font-normal text-[#141B34] text-sm">upvote</span>
                        </button>
                        <button className="flex flex-row gap-1 items-center">
                            <Image
                                src="/icons/comment-icon.svg"
                                width={20}
                                height={20}
                                alt="three-icon" />
                            <span className="text-[#1D2939] font-normal text-sm">30 Reply</span>
                        </button>
                    </div>
                    <div className="flex flex-col gap-3 mt-2">
                        <div className="flex flex-row gap-3">
                            <div className="flex items-center">
                                <div className="relative">
                                    <Image src='/images/DP_Lion.svg' alt="DP" width={40} height={40} />
                                    <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={18} height={18} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-row gap-2">
                                    <span className="font-semibold text-sm text-[#1D2939]">John Smith</span>
                                    <div className="w-[66px] h-6 rounded-sm bg-[#EAECF0] flex items-center justify-center">
                                        <span className="text-[#1D2939] font-semibold text-xs">Teacher</span>
                                    </div>
                                </div>
                                <span className="font-normal text-sm text-[#1D2939] opacity-[50%]">jhon#2355asas</span>
                            </div>
                        </div>
                        <p className="text-[#1D2939] font-normal text-sm">Students will learn how to efficiently solve problems using bitwise operations and gain hands-on experience through coding exercises and projects.</p>
                        <div className=" flex flex-row gap-6 items-center">
                            <button className="flex flex-row gap-1">
                                <Image
                                    src="/icons/upvote.svg"
                                    width={20}
                                    height={20}
                                    alt="upvote_button"
                                    className=""

                                />
                                <span className="font-normal text-[#141B34] text-sm">24</span>
                                <span className=" font-normal text-[#141B34] text-sm">upvote</span>
                            </button>
                            <button className="flex flex-row gap-1 items-center">
                                <Image
                                    src="/icons/comment-icon.svg"
                                    width={20}
                                    height={20}
                                    alt="three-icon" />
                                <span className="text-[#1D2939] font-normal text-sm">30 Reply</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-2">
                        <div className="flex flex-row gap-3">
                            <div className="flex items-center">
                                <div className="relative">
                                    <Image src='/images/DP_Lion.svg' alt="DP" width={40} height={40} />
                                    <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={18} height={18} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-row gap-2">
                                    <span className="font-semibold text-sm text-[#1D2939]">Cameron Williamson</span>
                                </div>
                                <span className="font-normal text-sm text-[#1D2939] opacity-[50%]">jhon#2355asas</span>
                            </div>
                        </div>
                        <p className="text-[#1D2939] font-normal text-sm">Students will learn how to efficiently solve problems using bitwise operations and gain hands-on experience through coding exercises and projects.</p>
                        <div className=" flex flex-row gap-6 items-center">
                            <button className="flex flex-row gap-1">
                                <Image
                                    src="/icons/upvote.svg"
                                    width={20}
                                    height={20}
                                    alt="upvote_button"
                                    className=""

                                />
                                <span className="font-normal text-[#141B34] text-sm">0</span>
                                <span className=" font-normal text-[#141B34] text-sm">Like</span>
                            </button>
                            <button className="flex flex-row gap-1 items-center">
                                <Image
                                    src="/icons/comment-icon.svg"
                                    width={20}
                                    height={20}
                                    alt="three-icon" />
                                <span className="text-[#1D2939] font-normal text-sm">30 Reply</span>
                            </button>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col  gap-3 ">
                    <div className="flex flex-row w-full justify-between">
                        <div className=" flex flex-row gap-3">
                            <Image
                                src="/icons/profile-pic.png"
                                width={46}
                                height={46}
                                alt=" Proflie -Image" />
                            <div className="flex flex-col gap-2">
                                <span className="font-medium text-sm text-[#1D2939]">Devon Lane</span>
                                <span className="font-normal text-sm text-[#1D2939] opacity-[50%]">devon#8852</span>
                            </div>
                        </div>
                        <span className="text-sm font-normal text-[#1D2939] opacity-[50%] flex items-center">
                            1 hr ago
                        </span>
                    </div>
                    <div className="  font-normal text-[#1D2939] text-sm opacity-[70%] leading-relaxed">
                        <ExpandableText content={content} />
                    </div>
                    <div className="flex flex-row gap-6 items-center">
                        <button className="flex flex-row gap-1">
                            <Image
                                src="/icons/upvote.svg"
                                width={20}
                                height={20}
                                alt="upvote_button"
                                className=""

                            />
                            <span className="font-normal text-[#141B34] text-sm">24</span>
                            <span className=" font-normal text-[#141B34] text-sm">upvote</span>
                        </button>
                        <button>
                            <span className="view-replies font-semibold text-sm text-[#9012FF]">View all 30 Reply</span>
                        </button>
                    </div>
                </div> */}
        </div>
    )
}
export default Discussion;


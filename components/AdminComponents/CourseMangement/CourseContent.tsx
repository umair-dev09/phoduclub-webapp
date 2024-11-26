import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import Collapsible from 'react-collapsible';
import Text from "./Text";
import Quiz from "./QuizBottomSheets/Quiz";
import Video from "./Video";
import {DatePicker, DateValue} from "@nextui-org/react";
import {now, today, CalendarDate, getLocalTimeZone,parseAbsoluteToLocal, ZonedDateTime} from "@internationalized/date";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc, query,deleteDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "@/firebase";
import {toast} from 'react-toastify';
import {useEffect} from 'react';
import LoadingData from "@/components/Loading";
import { DateTime } from 'luxon';  // Import luxon

type Sections = {
  sectionName: string;
  sectionId: string;
  sectionScheduleDate: string;
  noOfLessons: string;
  content?: Content[]; 
} 

type Content ={
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

type CourseContentProps ={
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

function CourseContent({courseId}:CourseContentProps) {
    const [isCreateSection, setIsCreateSection] = useState(false);
    const [hasClickedCreate, setHasClickedCreate] = useState(false);
    const [name, setName] = useState("");
    const [sectionScheduleDate, setSectionScheduleDate] = useState("");
    const [showDrawerfortest, setShowDrawerfortest] = useState(false);
    const [showDrawerforQuiz, setShowDrawerforQuiz] = useState(false);
    const [showDrawerforVideo, setShowDrawerforVideo] = useState(false);    
    const [sections, setSections] = useState<Sections[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSectionEditing, setIsSectionEditing] = useState(false);
    const [passedSectionId, setPassedSectionId] = useState('');

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
        setIsCreateSection(true);
    };
    const editCreateSection = async (secName: string, secDate: string, secId: string) => {
        setIsCreateSection(true);
        setName(secName);
        setSectionScheduleDate(secDate);
        const parsedDate = parseAbsoluteToLocal(secDate); // Converts string to DateValue
       setDateForPicker(parsedDate);
       setIsSectionEditing(true);
       setPassedSectionId(secId);
    };
    const closeCreateSection = () => {
        setIsCreateSection(false);
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
       
        if(isSectionEditing){
            try {
                // Generate a unique section ID (Firestore will auto-generate if you use addDoc)
                const newSectionRef = doc(db, 'course', courseId, 'sections',passedSectionId); // No need for custom sectionId generation if using Firestore auto-ID
                await updateDoc(newSectionRef, {
                  sectionName: name,
                  sectionScheduleDate: sectionScheduleDate,
                });
                toast.success('Section added successfully');
                closeCreateSection();
                setName('');
                setSectionScheduleDate('');
                setPassedSectionId('');
                setIsSectionEditing(false);
                setDateForPicker(null);
              } catch (error) {
                console.error('Error adding section: ', error);
              }
        }
        else{
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

    if (loading) {
        return <LoadingData/>
      }
      


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
            
            {sections.map((section, index)  => (
                <div key={index} className="border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md h-auto">
                <Collapsible  key={index}
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
                                placement="bottom">
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
                                        onClick={() => {openDrawerfortest(); setPassedSectionId(section.sectionId)}}>
                                        <Image src="/icons/read.svg" alt="learn-icon" width={20} height={20} />
                                        <span className="text-sm text-[#0C111D] font-normal">Text</span>
                                    </button>
                                    <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                        onClick={() => {openDrawerforVideo(); setPassedSectionId(section.sectionId)}}>
                                        <Image src="/icons/vedio.svg" alt="video-icon" width={20} height={20} />
                                        <span className="text-sm text-[#0C111D] font-normal">Video</span>
                                    </button>
                                    <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                        onClick={() => {openDrawerforQuiz(); setPassedSectionId(section.sectionId)}}>
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
                                                        >
                                                        <Image src="/icons/edit-02.svg" width={18} height={18} alt="edit" />
                                                        <span className="text-sm text-[#0C111D] font-normal">Edit</span>
                                                    </button>
                                                    <button className=" flex flex-row items-center justify-start w-full py-2 gap-2 hover:bg-[#F2F4F7] pl-4 pr-9"
                                                     >
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
                                        onClick={() => {setShowDrawerfortest(true); setPassedSectionId(section.sectionId)}}>
                                        <Image src="/icons/read.svg" alt="learn-icon" width={20} height={20} />
                                        <span className="text-sm text-[#0C111D] font-normal">Text</span>
                                    </button>
                                    <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                        onClick={() => {openDrawerforVideo(); setPassedSectionId(section.sectionId)}}>
                                        <Image src="/icons/vedio.svg" alt="video-icon" width={20} height={20} />
                                        <span className="text-sm text-[#0C111D] font-normal">Video</span>
                                    </button>
                                    <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                        onClick={() => {openDrawerforQuiz(); setPassedSectionId(section.sectionId)}}>
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

            <Dialog open={isCreateSection} onClose={closeCreateSection} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-[559px] h-auto">
                        <div className="flex flex-col relative gap-6">
                            <div className="flex flex-row items-center justify-between px-5 pt-4">
                            <h3 className="text-2xl font-semibold text-[#1D2939]">Create Section</h3>
                            <button onClick={closeCreateSection} className="">
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
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
                                <DatePicker 
                                    granularity="minute" 
                                    minValue={today(getLocalTimeZone())}
                                    value={dateForPicker}
                                    hideTimeZone
                                    onChange={(date) => {
                                        if (date) {
                                            // Get timezone offset in minutes
                                            const timezoneOffset = new Date().getTimezoneOffset() * -1; // Offset in minutes
                                            const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
                                            const offsetMinutes = Math.abs(timezoneOffset) % 60;
                                            const sign = timezoneOffset >= 0 ? "+" : "-";
                                    
                                            // Format offset as +hh:mm or -hh:mm
                                            const formattedOffset = `${sign}${String(offsetHours).padStart(2, "0")}:${String(offsetMinutes).padStart(2, "0")}`;
                                    
                                            // Combine ISO string with the offset
                                            const isoString = date.toString().split(".")[0]; // Remove milliseconds
                                            const dateString = `${isoString}${formattedOffset}`;
                                    
                                            // Set the formatted string
                                            setSectionScheduleDate(dateString);
                                            
                                            const parsedDate = parseAbsoluteToLocal(sectionScheduleDate); // Converts string to DateValue
                                            setDateForPicker(parsedDate);
                                        } else {
                                            setSectionScheduleDate("");
                                        }
                                    }}
                                />       
                            </div>
                            <hr />
                            <div className="flex flex-row justify-end mx-6 my-2 items-center gap-4 pb-2">
                                <button onClick={closeCreateSection} className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm">Cancel</button>
                                <button
                                    onClick={() => handleAddSection()}
                                    disabled={!isCreateSectionFilled}
                                    className={`py-[0.625rem] px-6 text-white shadow-inner-button border border-white ${!isCreateSectionFilled? 'bg-[#CDA0FC]' : 'bg-[#9012FF]'} rounded-md font-semibold text-sm`}>
                                    Create Section
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            {/* Drawer for Test */}
            <Text isOpen={showDrawerfortest} toggleDrawer={() => setShowDrawerfortest(!showDrawerfortest)} sectionId={passedSectionId} courseId={courseId}/>
            {/* Drawer for Quiz */}
            <Quiz isOpen={showDrawerforQuiz} toggleDrawer={() => setShowDrawerforQuiz(!showDrawerforQuiz)} sectionId={passedSectionId} courseId={courseId}/>
            {/* Drawer for Video */}
            <Video isOpen={showDrawerforVideo} toggleDrawer={() => setShowDrawerforVideo(!showDrawerforVideo)} sectionId={passedSectionId} courseId={courseId}/>
        </div>
    );
}

export default CourseContent;

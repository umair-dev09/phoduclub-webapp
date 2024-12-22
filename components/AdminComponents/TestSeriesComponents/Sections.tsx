'use client'
import React, { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Checkbox, DatePicker, DateValue } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "react-toastify";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import Collapsible from 'react-collapsible';
import LoadingData from "@/components/Loading";
import TestQuestions from "./TestQuestions";

interface Section {
  id: string;
  sectionName: string;
  sectionScheduleDate: string;
  parentSectionId?: string | null;
  order?: number;
  hasQuestions: boolean;
  sections?: Section[];
}
 interface Question {
    question: string;
    isChecked: boolean;
    isActive: boolean;
    options: Options;
    correctAnswer: string | null;
    explanation: string;
    questionId: string;
}
interface Options {
  A: string;
  B: string;
  C: string;
  D: string;
}

interface SectionsProps {
  isCreateSection: boolean;
  setIsCreateSection: (value: boolean) => void;
  testId: string;
}

const Sections: React.FC<SectionsProps> = ({
  isCreateSection,
  setIsCreateSection,
  testId,
}) => {
  const [dateForPicker, setDateForPicker] = useState<DateValue | null>(null);
  const [sectionScheduleDate, setSectionScheduleDate] = useState<string>("");
  const [sectionName, setSectionName] = useState<string>("");
  const [sectionss, setSections] = useState<Section[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<{ id: string; name: string }[]>([]);
  const [showAddOptions, setShowAddOptions] = useState<string | null>(null);
  const [questionText, setQuestionText] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [showQuestionInput, setShowQuestionInput] = useState(false);
  const [loading, setLoading] = useState(false);
 const [questionsList, setQuestionsList] = useState<Question[]>([{
        question: '',
        isChecked: false,
        isActive: false,
        options: { A: '', B: '', C: '', D: '' },
        correctAnswer: null,
        explanation: '',
        questionId: ''
    }]);
 
    useEffect(() => {
      if (!testId) return;
    
      // Fetch sections and subsections in real-time
      const fetchSections = async (): Promise<() => void> => {
        try {
          setLoading(true); // Start loading
    
          const path = currentPath.reduce(
            (acc, id) => `${acc}/sections/${id}`,
            `testseries/${testId}`
          );
    
          const sectionCollection = collection(db, `${path}/sections`);
    
          const unsubscribe = onSnapshot(sectionCollection, async (snapshot) => {
            const fetchedSections = await Promise.all(
              snapshot.docs.map(async (doc) => {
                const sectionData = doc.data();
    
                // Fetching subsections (nested subcollection)
                const subsectionsCollection = collection(doc.ref, 'sections');
                const subsectionsSnapshot = await getDocs(subsectionsCollection);
                const subsections = await Promise.all(
                  subsectionsSnapshot.docs.map(async (subsectionDoc) => {
                    const subsectionData = subsectionDoc.data();
                    return {
                      id: subsectionDoc.id,
                      sectionName: subsectionData.sectionName,
                      sectionScheduleDate: subsectionData.sectionScheduleDate,
                      parentSectionId: subsectionData.parentSectionId || null,
                      order: subsectionData.order || 0,
                      hasQuestions: subsectionData.hasQuestions || false,
                      sections: [] // Additional nesting if needed
                    };
                  })
                );
    
                // Check if section has questions
                const questionsCollection = collection(doc.ref, 'questions');
                const questionsSnapshot = await getDocs(questionsCollection);
    
                return {
                  id: doc.id,
                  sectionName: sectionData.sectionName,
                  sectionScheduleDate: sectionData.sectionScheduleDate,
                  parentSectionId: sectionData.parentSectionId || null,
                  order: sectionData.order || 0,
                  hasQuestions: sectionData.hasQuestions,
                  sections: subsections
                };
              })
            );
    
            // Sort sections and update state
            setSections(fetchedSections.sort((a, b) => (a.order || 0) - (b.order || 0)));
            setLoading(false); // End loading when data is fetched
          });
    
          return unsubscribe; // Return unsubscribe function
        } catch (error) {
          console.error('Error fetching sections: ', error);
          setLoading(false); // Ensure loading stops in case of error
          return () => {}; // Return a no-op unsubscribe in case of error
        }
      };
    
      // Async wrapper for fetchSections
      const getUnsubscribe = async (): Promise<() => void> => {
        const unsubscribe = await fetchSections();
        return unsubscribe;
      };
    
      let unsubscribeFn: () => void; // Explicitly typed as a function that returns void
    
      getUnsubscribe()
        .then((unsubscribe) => {
          unsubscribeFn = unsubscribe; // Store the unsubscribe function
        })
        .catch((err) => {
          console.error('Error initializing sections listener:', err);
        });
    
      return () => {
        if (unsubscribeFn) unsubscribeFn(); // Cleanup on unmount or dependency change
      };
    }, [currentPath, testId]);
    
  
  const handleAddSection = async () => {
    if (!testId || !sectionName || !sectionScheduleDate) return;

    try {
      const path = currentPath.reduce(
        (acc, id) => `${acc}/sections/${id}`,
        `testseries/${testId}`
      );
      const sectionCollection = collection(db, `${path}/sections`);
      const newSectionRef = doc(sectionCollection);

      await setDoc(newSectionRef, {
        sectionName,
        sectionScheduleDate,
        sectionId: newSectionRef.id,
        parentSectionId: currentPath[currentPath.length - 1] || null,
        order: sectionss.length + 1,
        hasQuestions: false,
        createdAt: new Date().toISOString()
      });

      toast.success("Section added successfully");
      resetForm();
    } catch (error) {
      console.error("Error adding section: ", error);
      toast.error("Failed to add section");
    }
  };

  const handleAddQuestion = async (sectionId: string) => {
    if (!questionText.trim()) return;

    try {
      const path = currentPath.reduce(
        (acc, id) => `${acc}/sections/${id}`,
        `testseries/${testId}`
      );
      
      const questionCollection = collection(db, `${path}/sections/${sectionId}/questions`);
      const newQuestionRef = doc(questionCollection);

      await setDoc(newQuestionRef, {
        questionText,
        createdAt: new Date().toISOString()
      });

      // Update section to indicate it has questions
      await updateDoc(doc(db, `${path}/sections/${sectionId}`), {
        hasQuestions: true
      });

      toast.success("Question added successfully");
      setQuestionText("");
      setShowQuestionInput(false);
      setSelectedSectionId(null);
    } catch (error) {
      console.error("Error adding question: ", error);
      toast.error("Failed to add question");
    }
  };

  const resetForm = () => {
    setIsCreateSection(false);
    setSectionName("");
    setSectionScheduleDate("");
    setDateForPicker(null);
  };

  const handleDateChange = (date: DateValue | null) => {
    if (date) {
      setSectionScheduleDate(date.toString());
      setDateForPicker(date);
    }
  };

  const navigateToSection = (sectionId: string, sectionName: string) => {
    setCurrentPath((prev) => [...prev, sectionId]);
    setBreadcrumbs((prev) => [...prev, { id: sectionId, name: sectionName }]);
  };

  const handleDeleteSection = async (sectionId: string) => {
    try {
      const path = currentPath.reduce(
        (acc, id) => `${acc}/sections/${id}`,
        `testseries/${testId}`
      );
      await deleteDoc(doc(db, `${path}/sections/${sectionId}`));
      toast.success("Section deleted successfully");
    } catch (error) {
      console.error("Error deleting section: ", error);
      toast.error("Failed to delete section");
    }
  };

  const handleDeleteSubSection = async (parentSectionId: string, sectionId: string) => {
    try {
      const path = currentPath.reduce(
        (acc, id) => `${acc}/sections/${id}`,
        `testseries/${testId}`
      );
      await deleteDoc(doc(db, `${path}/sections/${parentSectionId}/sections/${sectionId}`));
      toast.success("Section deleted successfully");
    } catch (error) {
      console.error("Error deleting section: ", error);
      toast.error("Failed to delete section");
    }
  };

  if(loading){
    return <LoadingData />
  }
  

  return (
    <div className="my-3">
      {/* Breadcrumb Navigation */}
      <div className="flex flex-row items-center gap-2 mb-4">
        <button
          onClick={() => {
            setCurrentPath([]);
            setBreadcrumbs([]);
          }}
          className="font-medium text-[#667085] hover:underline"
        >
          Sections
        </button>
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={breadcrumb.id} className="flex flex-row items-center gap-2">
            <Image src="/icons/course-left.svg" width={6} height={6} alt="arrow" className="w-[10px] h-[10px]" />
            <button
              onClick={() => {
                setCurrentPath(prev => prev.slice(0, index + 1));
                setBreadcrumbs(prev => prev.slice(0, index + 1));
              }}
              className={index === breadcrumbs.length - 1 ? "text-black font-medium" : "font-medium text-[#667085] hover:underline"}
            >
              {breadcrumb.name}
            </button>
          </div>
        ))}
      </div>

      {/* Sections List */}
      {sectionss.length <= 0 ? (
          <div className="w-full h-auto flex flex-col gap-2 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md mb-3 items-center justify-center p-6">
            <h3 className="text-base">Create section/subsection</h3>
            <p className="text-sm text-center">Click on the add section button on the top if you want to add a section or subsection. If you are inside a section a new subsection will be added to the current section.</p>
          </div>  
      ) : (
        <>
        {sectionss.map((section) => (
          <div key={section.id} className="border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-[16px] mb-3">
            <Collapsible
              trigger={
                <div className="flex flex-row justify-between items-start w-full p-4 bg-[#FCFCFD] rounded-[16px]">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-medium">{section.sectionName}</h3>
                    <div className="flex flex-row gap-1 items-center">
                      <Image src="/icons/schedule.svg" width={12} height={12} alt="schedule" />
                      <p className="text-sm">
                        Schedule: <span className="font-medium ml-[2px]">{section.sectionScheduleDate}</span>
                      </p>
                    </div>
                      {section.hasQuestions && (
                        <>
                         <p className="text-[#475467] text-sm">Lorem ipsum is a dummy text widely used in digital industry and lore is anptsu</p>
                      <div className="flex flex-row gap-[6px] items-center mt-1">
                      <Image src="/icons/clock-01.svg" width={12} height={12} alt="schedule" />
                      <p className="text-[#475467] text-xs">Overall Time :</p>
                      <p className="text-xs font-medium">10 min</p>
                      <hr className="h-4 w-[1.5px] bg-[#D0D5DD] mx-2"/>
                      <Image src="/icons/book-m.svg" width={12} height={12} alt="schedule" />
                      <p className="text-[#475467] text-xs">Marks per Question :</p>
                      <p className="text-xs font-medium">3</p>
                      <hr className="h-4 w-[1.5px] bg-[#D0D5DD] mx-2"/>
                      <Image src="/icons/book-n.svg" width={12} height={12} alt="schedule" />
                      <p className="text-[#475467] text-xs">Negative Marks per Question :</p>
                      <p className="text-xs font-medium">-1</p>
                      </div>  
                        </>
                      )}
                     
                   
                    
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    {!section.hasQuestions && (
                      <button
                        className="flex flex-row gap-1 items-center"
                        onClick={() => setShowAddOptions(section.id)}
                      >
                        <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                        <span className="text-[#9012FF] font-semibold text-sm">Add</span>
                      </button>
                    )}
                    {showAddOptions === section.id && !section.hasQuestions && (
                      <div className="absolute mt-8 bg-white shadow-lg rounded-md">
                        <button
                          className="w-full px-4 py-2 text-left hover:bg-gray-100"
                          onClick={() => {
                            navigateToSection(section.id, section.sectionName);
                            setShowAddOptions(null);
                          }}
                        >
                          Add Subsection
                        </button>
                        <button
                          className="w-full px-4 py-2 text-left hover:bg-gray-100"
                          onClick={() => {
                            setSelectedSectionId(section.id);
                            setShowQuestionInput(true);
                            setShowAddOptions(null);
                          }}
                        >
                          Add Questions
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row gap-3 mt-2 items-center">
                  {section.hasQuestions ? (
                    <button
                        className="flex flex-row gap-1 items-center"
                        // onClick={() => setShowAddOptions(section.id)}
                      >
                        <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                        <span className="text-[#9012FF] font-semibold text-sm">Add Questions</span>
                  </button>
                  ) : (
                    <button
                    className="flex flex-row gap-1 items-center"
                    onClick={() => {
                      navigateToSection(section.id, section.sectionName);
                      setShowAddOptions(null);
                    }}                      >
                    <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                    <span className="text-[#9012FF] font-semibold text-sm">Add Section</span>
              </button>
                  )}
                 
                   <Popover placement="bottom-end">
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
                    <PopoverContent className="p-0 rounded-md">
                        <div>
                        <button className="flex flex-row gap-1 items-center px-4 py-2 rounded-none w-auto h-auto"
                         onClick={() => handleDeleteSection(section.id)}>
                        <Image
                                src="/icons/delete.svg"
                                width={16}
                                height={16}
                                alt="Delete Actions"
                            />
                          <p className="text-sm text-[#DE3024]">Delete</p>  
                        </button>
                        </div>
                    </PopoverContent>
                   </Popover>
  
                  </div>
                </div>
              }
            >
              {selectedSectionId === section.id && showQuestionInput && (
                <div className="p-4 border-t border-[#EAECF0]">
                  <input
                    type="text"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Enter question text"
                    className="w-full p-2 border rounded-md mb-2"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setShowQuestionInput(false);
                        setSelectedSectionId(null);
                      }}
                      className="px-4 py-2 text-gray-600 border rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleAddQuestion(section.id)}
                      className="px-4 py-2 text-white bg-[#9012FF] rounded-md"
                    >
                      Add Question
                    </button>
                  </div>
                </div>
              )}
                <TestQuestions
                        questionsList={questionsList}
                        setQuestionsList={setQuestionsList}
                    />
               <table className="w-full bg-white border-t-[2px] border-[#EAECF0] ">
           <thead className="bg-[#F2F4F7] ">
               <tr>
               <th className="w-[3%] pl-2 py-4">
                 <Checkbox
                     size="sm"
                     color="primary"
                     // isSelected={selectAll}
                     // onChange={handleHeaderCheckboxToggle}
                 />
                                                </th>
                   <th className="w-[80%] text-left pr-5 py-4   text-[#667085] font-medium text-sm">Questions</th>
                   <th className="w-[12%] text-start px-5 py-4 text-[#667085] font-medium text-sm">Difficulty</th>
                   <th className="w-[5%] text-start px-5 py-4 text-[#667085] font-medium text-sm">Action</th>
               </tr>
           </thead>
           <tbody>
               {/* {section.content?.map((content, index) => ( */}
                   <tr
                    // key={content.contentId}
                    className="border-t border-solid border-[#EAECF0]">
                       <td className="px-5 py-4 text-start text-[#101828] text-sm ">
                           <div className="flex flex-row gap-[10px] items-center">
                               {/* <span className="bg-[#EAECF0] rounded-[4px] text-[12px] font-medium w-auto h-auto px-[7px] py-[1px] min-w-[22px] text-center">{index + 1}</span>
                               {content.lessonHeading} */}
                           </div>
                       </td>
                       {/* <td className="px-5 py-4 text-start text-[#101828] text-sm">{formatScheduleDate(content.lessonScheduleDate)}</td>
                       <td className="px-5 py-4 text-start text-[#101828] text-sm">{content.type}</td> */}
                       <td className="flex items-center justify-center px-8 py-4 text-[#101828] text-sm">
                           {/* <Popover placement="bottom-end"  >
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
                           </Popover> */}
                       </td>
       
                   </tr>
               {/* ))}  */}
                  </tbody>
              </table>
  
      {section.sections && section.sections.length > 0 ? (
        <>
          {section.sections.map((subsection) => (
            <div key={subsection.id} className="border-t flex flex-row justify-between p-4">
              <h3 className="font-medium">{subsection.sectionName}</h3>
              <div className="flex flex-row gap-[6px] items-center">
              <Image src="/icons/schedule.svg" width={14} height={14} alt="schedule" />   
              <p className="text-sm text-[#475467]">Schedule: <span className="font-medium ml-1 text-black">{subsection.sectionScheduleDate}</span></p>
              <Popover placement="bottom-end">
                    <PopoverTrigger>
                        <button className="ml-[6px]">
                            <Image
                                src="/icons/three-dots.svg"
                                width={20}
                                height={20}
                                alt="More Actions"
                            />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 rounded-md">
                        <div>
                        <button className="flex flex-row gap-1 items-center px-4 py-2 rounded-none w-auto h-auto"
                         onClick={() => handleDeleteSubSection(section.id, subsection.id)}>
                        <Image
                                src="/icons/delete.svg"
                                width={16}
                                height={16}
                                alt="Delete Actions"
                            />
                          <p className="text-sm text-[#DE3024]">Delete</p>  
                        </button>
                        </div>
                    </PopoverContent>
                   </Popover>
              </div>
            </div>
          ))}
          </>
      ) : (
        <div className="border-t w-full h-auto flex flex-col gap-2 items-center justify-center p-8">
        <h3>Create section/questions</h3>
        
        <p className="text-sm text-center w-[90%] text-[#667085]">Test Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups. Name</p>
        <div className="flex flex-row gap-5 mt-1">
         <button
           onClick={() => {
            navigateToSection(section.id, section.sectionName);
            setShowAddOptions(null);
          }}
         className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF] hover:bg-[#F5F0FF] bg-[#FFFFFF] h-[44px] w-[162px] justify-center">
         <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
         <span className="text-[#9012FF] font-semibold text-sm">Add Section</span>
         </button>
         <button
         className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF] hover:bg-[#F5F0FF] bg-[#FFFFFF] h-[44px] w-[162px] justify-center">
         <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
         <span className="text-[#9012FF] font-semibold text-sm">Add Question</span>
         </button>
        </div>
        </div>
            )}
  
            </Collapsible>
          </div>
        ))}
        </>
      )}

     

      {/* Create Section Dialog */}
      {/* Your existing Dialog component code remains the same */}
      {/* Create Section Dialog */}
      <Dialog open={isCreateSection} onClose={() => setIsCreateSection(false)}>
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center">
          <DialogPanel className="bg-white rounded-2xl w-[559px] h-auto">
            <div className="flex flex-col gap-6">
              <div className="flex flex-row justify-between items-center px-6 pt-4">
                <h3 className="text-2xl font-semibold text-[#1D2939]">Create Section</h3>
                <button onClick={() => setIsCreateSection(false)}>
                  <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                </button>
              </div>
              <div className="flex flex-col w-full gap-2 px-6">
                <p className="text-start text-sm text-[#1D2939] font-medium">Name</p>
                <div className="flex flex-row w-full h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">
                  <input
                    type="text"
                    className="w-full text-sm text-[#182230] font-normal outline-none rounded-md"
                    placeholder="Enter Name"
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
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
                  onChange={handleDateChange}
                />       
              </div>
              <hr />
              <div className="flex flex-row justify-end mx-6 my-2 items-center gap-4 pb-2">
                <button 
                  onClick={() => setIsCreateSection(false)} 
                  className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSection}
                  disabled={!isCreateSection}
                  className={`py-[0.625rem] px-6 text-white shadow-inner-button border border-white ${
                    !isCreateSection ? 'bg-[#CDA0FC]' : 'bg-[#9012FF]'
                  } rounded-md font-semibold text-sm`}
                >
                  Create Section
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default Sections;

// old code
// 'use client';
// import { db } from "@/firebase";
// import { collection, doc, getDoc, getDocs } from "firebase/firestore";
// import Image from "next/image";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';

// interface Section {
//     id: string;
//     sectionName: string;
//     sectionScheduleDate: string;
//     parentSectionId?: string | null;
//     order?: number;
//     hasQuestions: boolean;
//     description: string;
//     marksPerQ: string;
//     nMarksPerQ: string;
//     testTime: string;
//     isUmbrellaTest: boolean;
//   }
//    interface Question {
//       question: string;
//       isChecked: boolean;
//       isActive: boolean;
//       options: Options;
//       correctAnswer: string | null;
//       explanation: string;
//       questionId: string;
//       difficulty: string;
//   }
//   interface Options {
//     A: string;
//     B: string;
//     C: string;
//     D: string;
//   }

// function ReviewTestView() {
//     const searchParams = useSearchParams();

//   const tId = searchParams.get("tId");
//   const sectionIds = searchParams.get("sectionIds");

//   // Ensure sectionIds is properly parsed
//   const sections = sectionIds ? JSON.parse(decodeURIComponent(sectionIds)) : [];

//   const [isInitialLoading, setIsInitialLoading] = useState(true);
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [currentSection, setCurrentSection] = useState<Section | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const dataFetched = useRef(false);

//   useEffect(() => {
//     // Add protection against multiple fetches
//     if (dataFetched.current) return;

//     let isMounted = true;

//     const fetchQuestions = async () => {
//         if (!tId || sections.length === 0) {
//             setError("Missing test ID or section IDs");
//             setIsInitialLoading(false);
//             return;
//         }

//         try {
//             // Build the complete path by iterating through all section IDs
//             let currentPath = `testseries/${tId}`;
//             const allQuestions: Question[] = [];

//             // Get the last section ID since that's where the questions are
//             const lastSectionId = sections[sections.length - 1];
            
//             // Build the complete path for nested sections
//             for (const sectionId of sections) {
//                 currentPath += `/sections/${sectionId}`;
//             }

//             const sectionRef = doc(db, currentPath);
//             const sectionSnap = await getDoc(sectionRef);

//             if (!sectionSnap.exists()) {
//                 throw new Error(`Section not found: ${lastSectionId}`);
//             }

//             const sectionData = sectionSnap.data() as Section;
            
//             if (isMounted) {
//                 setCurrentSection(sectionData);
//             }

//             if (sectionData.hasQuestions) {
//                 const questionsRef = collection(sectionRef, 'Questions');
//                 const questionsSnap = await getDocs(questionsRef);
                
//                 questionsSnap.forEach((questionDoc) => {
//                     const questionData = questionDoc.data() as Question;
//                     allQuestions.push({
//                         ...questionData,
//                         questionId: questionDoc.id,
//                         isChecked: false,
//                         isActive: false
//                     });
//                 });
//             }

//             if (isMounted) {
//                 setQuestions(allQuestions);
//                 setError(null);
//                 dataFetched.current = true; // Mark as fetched
//             }
//         } catch (error) {
//             console.error("Error fetching questions:", error);
//             if (isMounted) {
//                 setError("Failed to load questions. Please try again.");
//             }
//         } finally {
//             if (isMounted) {
//                 setIsInitialLoading(false);
//             }
//         }
//     };

//     fetchQuestions();

//     return () => {
//         isMounted = false;
//     };
// }, [tId, sectionIds]);

// const handleQuestionSelect = (index: number) => {
//     if (index >= 0 && index < questions.length) {
//         setCurrentQuestionIndex(index);
//     }
// };

// const handleNextQuestion = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//         setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//     }
// };

// const getQuestionButtonStatus = (index: number) => {
//     const question = questions[index];
//     if (!question) return 'not-visited';
//     if (question.isChecked && question.isActive) return 'answered-marked';
//     if (question.isChecked) return 'answered';
//     if (question.isActive) return 'marked';
//     return 'not-visited';
// };

// // Current question being displayed
// const currentQuestion = questions[currentQuestionIndex];


//     return(
//        <div className="Main Layout flex flex-col w-full h-screen overflow-y-hidden">
//         <div className="flex w-full h-12 bg-[#3b56c0] pl-3 items-center">
//          <h3 className="text-white text-[18px] font-bold font-[Inter]">{currentSection?.sectionName || "Test Series"}
//          </h3>
//         </div>
//         <div className="Container flex flex-row h-full">
//         <div className="flex flex-col flex-1 pb-[80px]">
//         <div className="flex flex-row  border-b border-[#a1a1a1] h-8 pl-2 pr-5 py-2 justify-between items-center">
//             <p className="font-[Inter] font-medium text-[12px] text-[#868686]">
//                 {/* Section */}
//             </p>
//             <div className="flex flex-row gap-3">
//             <button className="flex flex-row gap-1 items-center">
//               <Image src="/icons/instructions.svg" alt="Instructions Icon" width={12} height={12}/> 
//               <p className="font-[Inter] font-medium text-[12px] ">Instructions</p> 
//             </button>
//             <p className="font-[Inter] font-semibold text-[12px] ">Time Left: 178:41</p>
//             </div>
//         </div> 
//         {/*Section switching area if its an umbrella test*/}
//         <div className="flex flex-row h-8 border-b border-[#A1A1A199]">
//         <button className="flex flex-row gap-1 border-r border-[#A1A1A199] h-8 items-center justify-center px-2 bg-[#4871CB]">
//         <span className="font-[Inter] font-semibold text-[11px] text-white ">Phy sec 1</span>
//         <Image src="/icons/instructions.svg" alt="Instructions Icon" width={12} height={12}/> 
//         </button>
//         </div>
        
//         <div className="flex h-8 border-b border-[#A1A1A199] items-center px-3">
//         <h3 className="font-[Inter] font-semibold text-[14px] ">Question No {currentQuestionIndex + 1}.</h3>
//         </div>

//         <div className="Question Area flex flex-col flex-1 overflow-y-auto p-3">
//         {isInitialLoading ? (
//                             <div className="flex items-center justify-center h-full">
//                                 <p className="text-gray-600">Loading questions...</p>
//                             </div>
//                         ) : error ? (
//                             <div className="flex items-center justify-center h-full text-red-500">
//                                 {error}
//                             </div>
//                         ) : questions.length === 0 ? (
//                             <div className="flex items-center justify-center h-full">
//                                 <p className="text-gray-600">No questions available</p>
//                             </div>
//                         ) : (
//                             <div className="flex flex-col gap-5 pb-14">
//                                <div 
//                                 className="question-content"
//                                 dangerouslySetInnerHTML={{ 
//                                     __html: currentQuestion?.question || 'Question not available' 
//                                 }} 
//                             />  
//                             <hr className="border-black"/>
//                             <div>
//                             <RadioGroup value={currentQuestion.correctAnswer}>
//                                 {Object.entries(currentQuestion.options).map(([key, value]) => (
//                                     <FormControlLabel
//                                         key={key}
//                                         value={key}
//                                         control={
//                                             <Radio
//                                                 checked={currentQuestion.correctAnswer === key}
//                                                 sx={{
//                                                     color: '#D0D5DD',
//                                                     '&.Mui-checked': {
//                                                         color: '#0B9055',
//                                                     },
//                                                 }}
//                                             />
//                                         }
//                                         label={<h3 className='text-base font-normal'>{value}</h3>}
//                                     />
//                                 ))}
//                             </RadioGroup>
//                             </div>
//                             </div>
                           
//                         )}
                        
//         </div> 

//         </div>

//         <div className="flex flex-col w-[365px]  border-l border-r border-[#A1A1A199] pb-[77px] bg-[#DEF7FE]">

//          <div className="flex flex-row bg-[#DEF7FE] h-[120px] border-t border-b border-[#A1A1A199] items-center pl-6">
//          <Image className="w-20 h-20 rounded-[100px] border border-black  " src="/defaultDP.svg" alt="Profile Pic" width={80} height={80}/> 
//          <div className="flex flex-col ml-3 items-center justify-center h-20">
//             <p className="font-semibold font-['Inter'] text-[16px] text-[#131313] ml-[-2px]">John Smith</p>
//             <p className="font-normal font-['Inter'] text-[14px] text-[#667085]">shaiumai6807</p>
//          </div>
//          </div>

//         <div className="flex flex-col h-fit bg-[#f5f5f5] p-4 gap-5">
//         <div className="flex flex-row gap-6">
//         <div className="flex flex-row gap-[6px] items-center">
//         <Image src="/icons/answered.svg" alt="Answered Icon" width={28} height={28}/> 
//         <p className="font-medium font-['Inter'] text-[14px] text-[#131313]">Answered</p>
//         </div>
//         <div className="flex flex-row gap-[6px] items-center">
//         <Image src="/icons/not-answered.svg" alt="Answered Icon" width={28} height={28}/> 
//         <p className="font-medium font-['Inter'] text-[14px] text-[#131313]">Not Answered</p>
//         </div>
//         </div>

//         <div className="flex flex-row gap-5">
//         <div className="flex flex-row gap-[6px] items-center">
//         <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
//         <p className="font-medium font-['Inter'] text-[14px] text-[#131313]">Not Visited</p>
//         </div>
//         <div className="flex flex-row gap-[6px] items-center">
//         <Image src="/icons/marked.svg" alt="Answered Icon" width={28} height={28}/> 
//         <p className="font-medium font-['Inter'] text-[14px] text-[#131313]">Marked for Review</p>
//         </div>
//         </div>

//         <div className="flex flex-row ">
//         <div className="flex flex-row gap-[6px] items-center">
//         <Image src="/icons/answered-marked.svg" alt="Answered Icon" width={28} height={28}/> 
//         <p className="font-medium font-['Inter'] text-[14px] text-[#131313] w-[250px]">Answered and Marked for Review
//         (Will be considered for evaluation)</p>
//         </div>
//         </div>
//         </div>

//         <div className="flex h-9 bg-[#4871CB] pl-3 border-t border-b border-[#A1A1A199] items-center">
//         <h3 className="text-white text-[14px] font-bold font-[Inter]">Phy sec 1</h3>
//         </div>
 
//         <div className="flex flex-col flex-1 bg-[#DEF7FE] overflow-y-auto px-4 py-2">
//         <p className=" text-[14px] font-medium font-[Inter]">Choose a Question</p>
//         <div className="flex flex-row flex-wrap mt-2 gap-3">
//          {/*button for selecting question*/}   
//          {questions.map((_, index) => (
//                                 <button 
//                                     key={index}
//                                     onClick={() => handleQuestionSelect(index)}
//                                 >
//                                     <div className="relative w-[28px] h-[28px]">
//                                     <Image
//                                         src={`/icons/${getQuestionButtonStatus(index)}.svg`}
//                                         alt={`Question ${index + 1}`}
//                                         width={28}
//                                         height={28}
//                                     />
//                                     <span className="absolute inset-0 text-sm font-bold text-[#242424] flex items-center justify-center">
//                                         {index + 1}
//                                     </span>
//                                     </div>

//                                 </button>
//                             ))}
//           </div>
//         </div>       
//         </div>
//         </div>
'use client';
import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

interface Section {
    id: string;
    sectionName: string;
    sectionScheduleDate: string;
    parentSectionId?: string | null;
    order?: number;
    hasQuestions: boolean;
    description: string;
    marksPerQ: string;
    nMarksPerQ: string;
    testTime: string;
    isUmbrellaTest: boolean;
}

interface SubSection extends Section {
    questions?: Question[];
}

interface Question {
    question: string;
    isChecked: boolean;
    isActive: boolean;
    options: Options;
    correctAnswer: string | null;
    explanation: string;
    questionId: string;
    difficulty: string;
}

interface Options {
    A: string;
    B: string;
    C: string;
    D: string;
}

function ReviewTestView() {
    const searchParams = useSearchParams();
    const tId = searchParams.get("tId");
    const sectionIds = searchParams.get("sectionIds");
    const sections = sectionIds ? JSON.parse(decodeURIComponent(sectionIds)) : [];

    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentSection, setCurrentSection] = useState<Section | null>(null);
    const [subSections, setSubSections] = useState<SubSection[]>([]);
    const [activeSubSectionIndex, setActiveSubSectionIndex] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const dataFetched = useRef(false);

    const fetchQuestionsForSection = async (path: string) => {
        const sectionRef = doc(db, path);
        const questionsRef = collection(sectionRef, 'Questions');
        const questionsSnap = await getDocs(questionsRef);
        
        const fetchedQuestions: Question[] = [];
        questionsSnap.forEach((questionDoc) => {
            const questionData = questionDoc.data() as Question;
            fetchedQuestions.push({
                ...questionData,
                questionId: questionDoc.id,
                isChecked: false,
                isActive: false
            });
        });
        
        return fetchedQuestions;
    };

    const fetchSubSections = async (path: string) => {
        const sectionRef = doc(db, path);
        const subSectionsRef = collection(sectionRef, 'sections');
        const subSectionsSnap = await getDocs(subSectionsRef);
        
        const fetchedSubSections: SubSection[] = [];
        for (const subSectionDoc of subSectionsSnap.docs) {
            const subSectionData = subSectionDoc.data() as SubSection;
            const subSectionPath = `${path}/sections/${subSectionDoc.id}`;
            const questions = await fetchQuestionsForSection(subSectionPath);
            
            fetchedSubSections.push({
                ...subSectionData,
                id: subSectionDoc.id,
                questions
            });
        }
        
        return fetchedSubSections.sort((a, b) => (a.order || 0) - (b.order || 0));
    };
    useEffect(() => {
        if (dataFetched.current) return;
        let isMounted = true;

        const fetchData = async () => {
            if (!tId || sections.length === 0) {
                setError("Missing test ID or section IDs");
                setIsInitialLoading(false);
                return;
            }

            try {
                let currentPath = `testseries/${tId}`;
                for (const sectionId of sections) {
                    currentPath += `/sections/${sectionId}`;
                }

                const sectionRef = doc(db, currentPath);
                const sectionSnap = await getDoc(sectionRef);

                if (!sectionSnap.exists()) {
                    throw new Error(`Section not found`);
                }

                const sectionData = sectionSnap.data() as Section;
                
                if (isMounted) {
                    setCurrentSection(sectionData);
                    
                    if (sectionData.isUmbrellaTest) {
                        const fetchedSubSections = await fetchSubSections(currentPath);
                        console.log('Fetched subsections:', fetchedSubSections);
                        setSubSections(fetchedSubSections);
                        if (fetchedSubSections.length > 0) {
                            console.log('Setting questions from first subsection:', fetchedSubSections[0].questions);
                            setQuestions(fetchedSubSections[0].questions || []);
                        }
                    } else {
                        const fetchedQuestions = await fetchQuestionsForSection(currentPath);
                        console.log('Setting direct questions:', fetchedQuestions);
                        setQuestions(fetchedQuestions);
                    }
                    
                    setError(null);
                    dataFetched.current = true;
                    setIsInitialLoading(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                if (isMounted) {
                    setError("Failed to load questions. Please try again.");
                }
            } finally {
                if (isMounted) {
                    console.log('Setting isInitialLoading to false');
                    setIsInitialLoading(false);
                }
            }
        };

        fetchData();
        return () => {
            isMounted = false;
        };
    }, [tId, sections]);

    const handleSubSectionChange = (index: number) => {
        setActiveSubSectionIndex(index);
        setQuestions(subSections[index].questions || []);
        setCurrentQuestionIndex(0);
    };

    const handleQuestionSelect = (index: number) => {
        if (index >= 0 && index < questions.length) {
            setCurrentQuestionIndex(index);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }
    };

    const getQuestionButtonStatus = (index: number) => {
        const question = questions[index];
        if (!question) return 'not-visited';
        if (question.isChecked && question.isActive) return 'answered-marked';
        if (question.isChecked) return 'answered';
        if (question.isActive) return 'marked';
        return 'not-visited';
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="Main Layout flex flex-col w-full h-screen overflow-hidden">
                    {/* Header remains the same */}
                    <div className="flex w-full h-12 bg-[#3b56c0] pl-3 items-center">
                        <h3 className="text-white text-[18px] font-bold font-[Inter]">
                            {currentSection?.sectionName || "Test Series"}
                        </h3>
                    </div>
                    
                    <div className="Container flex h-full">
                        {/* Left section with fixed width to ensure it doesn't grow beyond available space */}
                        <div className="flex flex-col min-w-0 flex-1">
                            {/* Timer and instructions row */}
                            <div className="flex flex-row border-b border-[#a1a1a1] h-8 pl-2 pr-5 py-2 justify-between items-center">
                                <p className="font-[Inter] font-medium text-[12px] text-[#868686]" />
                                <div className="flex flex-row gap-3">
                                    <button className="flex flex-row gap-1 items-center">
                                        <Image src="/icons/instructions.svg" alt="Instructions Icon" width={12} height={12}/> 
                                        <p className="font-[Inter] font-medium text-[12px]">Instructions</p> 
                                    </button>
                                    <p className="font-[Inter] font-semibold text-[12px]">Time Left: 178:41</p>
                                </div>
                            </div>

                            {/* Section switching area for umbrella tests - Now with flex-wrap */}
                            {currentSection?.isUmbrellaTest && (
                                <div className="flex border-b border-[#A1A1A199]">
                                    <div className="flex flex-wrap">
                                        {subSections.map((subSection, index) => (
                                            <button
                                                key={subSection.id}
                                                className={`flex flex-row gap-[6px] border-r  border-[#A1A1A199] h-8 items-center justify-center px-2 ${
                                                    index === activeSubSectionIndex ? 'bg-[#4871CB]' : 'bg-white'
                                                }`}
                                                onClick={() => handleSubSectionChange(index)}
                                            >
                                                <span className={`font-[Inter] font-semibold text-[11px] ${
                                                    index === activeSubSectionIndex ? 'text-white' : 'text-[#4871CB]'
                                                }`}>
                                                    {subSection.sectionName}
                                                </span>
                                             <Image src="/icons/instructions.svg" alt="Instructions Icon" width={12} height={12}/> 
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Rest of the content remains the same but with adjusted containers */}
                            <div className="flex h-8 border-b border-[#A1A1A199] items-center px-3">
                                <h3 className="font-[Inter] font-semibold text-[14px]">
                                    Question No {currentQuestionIndex + 1}.
                                </h3>
                            </div>

                            <div className="Question Area flex flex-col flex-1 overflow-y-auto p-3">
                            {isInitialLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-600">Loading questions...</p>
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center h-full text-red-500">
                            {error}
                        </div>
                    ) : !questions.length ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-600">No questions available</p>
                        </div>
                    ) : !currentQuestion ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-600">
                                Current question is undefined (Index: {currentQuestionIndex})
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-5 pb-14">
                                                
                            <div 
                                className="question-content"
                                dangerouslySetInnerHTML={{ 
                                    __html: currentQuestion.question
                                }} 
                            />
                            <hr className="border-black"/>
                            <div>
                                {currentQuestion.options ? (
                                    <RadioGroup value={currentQuestion.correctAnswer || ''}>
                                        {Object.entries(currentQuestion.options).map(([key, value]) => (
                                            <FormControlLabel
                                                key={key}
                                                value={key}
                                                control={
                                                    <Radio
                                                        checked={currentQuestion.correctAnswer === key}
                                                        sx={{
                                                            color: '#D0D5DD',
                                                            '&.Mui-checked': {
                                                                color: '#0B9055',
                                                            },
                                                        }}
                                                    />
                                                }
                                                label={<h3 className='text-base font-normal'>{value}</h3>}
                                            />
                                        ))}
                                    </RadioGroup>
                                ) : (
                                    <p>No options available for this question</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                        </div>

                        {/* Right sidebar with fixed width */}
                        <div className="flex-none w-[365px] border-l border-r border-[#A1A1A199] bg-[#DEF7FE] flex flex-col">
                        <div className="flex flex-row bg-[#DEF7FE] h-[120px] border-t border-b border-[#A1A1A199] items-center pl-6">
                        <Image 
                            className="w-20 h-20 rounded-[100px] border border-black" 
                            src="/defaultDP.svg" 
                            alt="Profile Pic" 
                            width={80} 
                            height={80}
                        /> 
                        <div className="flex flex-col ml-3 items-center justify-center h-20">
                            <p className="font-semibold font-['Inter'] text-[16px] text-[#131313] ml-[-2px]">
                                John Smith
                            </p>
                            <p className="font-normal font-['Inter'] text-[14px] text-[#667085]">
                                shaiumai6807
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col h-fit bg-[#f5f5f5] p-4 gap-5">
                   <div className="flex flex-row gap-6">
                   <div className="flex flex-row gap-[6px] items-center">
                   <Image src="/icons/answered.svg" alt="Answered Icon" width={28} height={28}/> 
                   <p className="font-medium font-['Inter'] text-[14px] text-[#131313]">Answered</p>
                   </div>
                   <div className="flex flex-row gap-[6px] items-center">
                   <Image src="/icons/not-answered.svg" alt="Answered Icon" width={28} height={28}/> 
                   <p className="font-medium font-['Inter'] text-[14px] text-[#131313]">Not Answered</p>
                   </div>
                   </div>           
                   <div className="flex flex-row gap-5">
                   <div className="flex flex-row gap-[6px] items-center">
                   <Image src="/icons/not-visited.svg" alt="Answered Icon" width={28} height={28}/> 
                   <p className="font-medium font-['Inter'] text-[14px] text-[#131313]">Not Visited</p>
                   </div>
                   <div className="flex flex-row gap-[6px] items-center">
                   <Image src="/icons/marked.svg" alt="Answered Icon" width={28} height={28}/> 
                   <p className="font-medium font-['Inter'] text-[14px] text-[#131313]">Marked for Review</p>
                   </div>
                   </div>           
                   <div className="flex flex-row ">
                   <div className="flex flex-row gap-[6px] items-center">
                   <Image src="/icons/answered-marked.svg" alt="Answered Icon" width={28} height={28}/> 
                   <p className="font-medium font-['Inter'] text-[14px] text-[#131313] w-[250px]">Answered and Marked for Review
                   (Will be considered for evaluation)</p>
                   </div>
                   </div>
                   </div>           
                    {/* Section header */}
                    <div className="flex h-9 bg-[#4871CB] pl-3 border-t border-b border-[#A1A1A199] items-center">
                        <h3 className="text-white text-[14px] font-bold font-[Inter]">
                            {currentSection?.isUmbrellaTest 
                                ? subSections[activeSubSectionIndex]?.sectionName 
                                : currentSection?.sectionName}
                        </h3>
                    </div>

                    {/* Question selection grid */}
                    <div className="flex flex-col flex-1 bg-[#DEF7FE] overflow-y-auto px-4 py-2">
                        <p className="text-[14px] font-medium font-[Inter]">Choose a Question</p>
                        <div className="flex flex-row flex-wrap mt-2 gap-3">
                            {questions.map((_, index) => (
                                <button 
                                    key={index}
                                    onClick={() => handleQuestionSelect(index)}
                                >
                                    <div className="relative w-[28px] h-[28px]">
                                        <Image
                                            src={`/icons/${getQuestionButtonStatus(index)}.svg`}
                                            alt={`Question ${index + 1}`}
                                            width={28}
                                            height={28}
                                        />
                                        <span className="absolute inset-0 text-sm font-bold text-[#242424] flex items-center justify-center">
                                            {index + 1}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="flex flex-none h-16 border-t border-[#A1A1A199]">
                        <div className="flex flex-1 py-2 px-2 justify-between items-center">
                            <div className="flex gap-2">
                                <button className="flex border border-[#A1A1A199] items-center justify-center h-[28px] px-4">
                                    <span className="font-bold font-['Inter'] text-[12px] text-[#717171]">Mark for Review and Next</span>
                                </button>   
                                <button className="flex border border-[#A1A1A199] items-center justify-center h-[28px] px-4">
                                    <span className="font-bold font-['Inter'] text-[12px] text-[#717171]">Clear Response</span>
                                </button>   
                            </div> 
                            <button 
                                className="flex items-center justify-center h-[36px] rounded-[3px] bg-[#4871CB] border border-[#A1A1A199] px-3"
                                onClick={handleNextQuestion}
                            >
                                <span className="font-bold font-['Inter'] text-[12px] text-[#F5F5F5]">Save & Next</span>
                            </button>
                        </div>

                        <div className="flex-none w-[365px] border-l border-[#A1A1A199] bg-[#def7fe] flex items-center justify-center">
                            <button className="flex items-center justify-center w-[74px] h-[36px] rounded-[3px] bg-[#4298EB] border border-[#A1A1A199]">
                                <span className="font-bold font-['Inter'] text-[12px] text-[#F5F5F5]">Submit</span>
                            </button>
                        </div>
                    </div>
                </div>
        


    );
}
export default ReviewTestView;
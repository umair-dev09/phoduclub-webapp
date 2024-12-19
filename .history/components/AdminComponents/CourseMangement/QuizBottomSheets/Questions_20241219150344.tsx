// "use client";
// import Image from "next/image";
// import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
// import Collapsible from 'react-collapsible';
// import React, { useState, useEffect, useRef, SetStateAction, Dispatch } from "react";
// import 'react-quill/dist/quill.snow.css';
// import ReactQuill from 'react-quill-new'; // Ensure correct import
// import Quill from 'quill'; // Import Quill to use it for types
// // Define interfaces outside the component
// interface Question {
//     question: string;
//     isChecked: boolean;
//     isActive: boolean;
//     options: Options;
//     correctAnswer: string | null;
//     explanation: string;
//     questionId: string;
// }

// interface Options {
//     A: string;
//     B: string;
//     C: string;
//     D: string;
// }
// // Sending the Data to the CreateQuiz
// interface QuestionsProps {
//     questionsList: Question[];
//     setQuestionsList: React.Dispatch<React.SetStateAction<Question[]>>;
//     anyQuestionAdded: string;
//     setAnyQuestionAdded: (anyQuestionAdded: string) => void;
// }

// function Questions({ questionsList, setQuestionsList, anyQuestionAdded, setAnyQuestionAdded }: QuestionsProps) {

//     // Handler for input change
//     const handleInputChange = (index: number, value: string | React.ChangeEvent<HTMLInputElement>) => {
//         const newQuestionsList = [...questionsList];

//         // Check if value is a string (from ReactQuill) or a ChangeEvent (from input)
//         if (typeof value === 'string') {
//             newQuestionsList[index].question = value;
//         } else {
//             newQuestionsList[index].question = value.target.value;
//         }

//         setQuestionsList(newQuestionsList);
//     };
//     // -----------------------------------------------------------------------------------------------------------
//     // Handler for checkbox change
//     const handleCheckboxChange = (index: number) => {
//         const newQuestionsList = [...questionsList];
//         newQuestionsList[index].isChecked = !newQuestionsList[index].isChecked;
//         setQuestionsList(newQuestionsList);
//     };
//     // -----------------------------------------------------------------------------------------------------------
//     // Handler for adding new question
//     const handleAddQuestion = () => {
//         setAnyQuestionAdded('Yes');
//         setQuestionsList([
//             ...questionsList,
//             {
//                 question: '',
//                 isChecked: false,
//                 isActive: false,
//                 options: { A: '', B: '', C: '', D: '' },
//                 correctAnswer: null,
//                 explanation: '',
//                 questionId: '',
//             }
//         ]);
//     };
//     // -----------------------------------------------------------------------------------------------------------
//     // Handler for adding the Questions
//     const handleAddQuestionduplicate = (duplicateQuestion?: Question) => {
//         const newQuestion = duplicateQuestion
//             ? { ...duplicateQuestion } // Duplicate all properties of the question
//             : {
//                 question: '',
//                 isChecked: false,
//                 isActive: false,
//                 options: { A: '', B: '', C: '', D: '' },
//                 correctAnswer: null,
//                 explanation: '',
//                 questionId: '',
//             };

//         setQuestionsList([...questionsList, newQuestion]);
//     };
//     // -----------------------------------------------------------------------------------------------------------
//     // Handler for deleting question
//     const handleDeleteQuestion = (index: number) => {
//         console.log("Deleting question at index:", index); // Debugging
//         setQuestionsList((prevList) => {
//             // Set isActive to false for the question being deleted
//             const updatedList = prevList.map((q, i) => (i === index ? { ...q, isActive: false } : q));
//             return updatedList.filter((_, i) => i !== index); // Delete the question
//         });
//     };
//     // -----------------------------------------------------------------------------------------------------------
//     // Handler for option change
//     const handleOptionChange = (questionIndex: number, optionKey: keyof Options, value: string) => {
//         const newQuestionsList = [...questionsList];
//         newQuestionsList[questionIndex].options[optionKey] = value;
//         setQuestionsList(newQuestionsList);
//     };
//     // -----------------------------------------------------------------------------------------------------------
//     // Handler for explanation change
//     const handleExplanationChange = (index: number, value: string) => {
//         const newQuestionsList = [...questionsList];
//         newQuestionsList[index].explanation = value;
//         setQuestionsList(newQuestionsList);
//     };
//     // -----------------------------------------------------------------------------------------------------------
//     // STATE MANGEMENT FOR SELECT ANSWER AND POPOVER 
//     // Track popover state for each question
//     const [popoverOpenStates, setPopoverOpenStates] = useState<boolean[]>([]);

//     // Handler for setting correct answer
//     const handleCorrectAnswerSelect = (questionIndex: number, optionKey: keyof Options) => {
//         const newQuestionsList = [...questionsList];
//         newQuestionsList[questionIndex].correctAnswer = optionKey;
//         setQuestionsList(newQuestionsList);
//         handlePopoverClose(questionIndex);
//     };

//     const getSelectedAnswerDisplay = (question: Question) => {
//         if (!question.correctAnswer) return "Select correct answer";

//         // Assert that correctAnswer is a valid key in the options object
//         const selectedAnswer = question.options[question.correctAnswer as keyof Options];

//         return selectedAnswer
//             ? `${question.correctAnswer}. ${selectedAnswer}`
//             : `Option ${question.correctAnswer}`;
//     };

//     // Handle click on select button for a specific question
//     const handleclickonselectbutton = (questionIndex: number) => {
//         const updatedPopoverStates = [...popoverOpenStates];
//         updatedPopoverStates[questionIndex] = !popoverOpenStates[questionIndex];
//         setPopoverOpenStates(updatedPopoverStates); // Toggle the popover for the specific question
//     };

//     const handlePopoverClose = (questionIndex: number) => {
//         const updatedPopoverStates = [...popoverOpenStates];
//         updatedPopoverStates[questionIndex] = false;
//         setPopoverOpenStates(updatedPopoverStates);
//     };

//     const isActive = (questionIndex: number) =>
//         popoverOpenStates[questionIndex];
//     // -----------------------------------------------------------------------------------------------------------
//     // state for ReactQuill 1 FOR QUESTIONS
//     const [value1, setValue1] = useState('');
//     const quillRef1 = useRef<ReactQuill | null>(null); // Ref to hold ReactQuill instance
//     const [quill1, setQuill1] = useState<Quill | null>(null);
//     const [alignment1, setAlignment1] = useState<string | null>(null); // State to hold alignment
//     const [isWriting1, setIsWriting1] = useState(false); // Track if text is being written

//     const handleChange1 = (content: string) => {
//         setValue1(content);
//         checkTextContent1(content);
//     };

//     const checkTextContent1 = (content: string) => {
//         const plainText = content.replace(/<[^>]+>/g, '').trim();
//         setIsWriting1(plainText.length > 0);
//     };

//     const handleIconClick1 = (format: string) => {
//         if (quill1) {
//             const range = quill1.getSelection();
//             if (range) {
//                 const currentFormats = quill1.getFormat(range);
//                 if (format === 'ordered') {
//                     quill1.format('list', currentFormats.list === 'ordered' ? false : 'ordered');
//                 } else if (format === 'image') {
//                     const fileInput = document.createElement('input');
//                     fileInput.type = 'file';
//                     fileInput.accept = 'image/*';
//                     fileInput.onchange = () => {
//                         const file = fileInput.files?.[0];
//                         if (file) {
//                             const reader = new FileReader();
//                             reader.onload = (e) => {
//                                 if (e.target && e.target.result) {
//                                     const imageUrl = e.target.result as string;
//                                     quill1.insertEmbed(range.index, 'image', imageUrl);
//                                 }
//                             };
//                             reader.readAsDataURL(file);
//                         }
//                     };
//                     fileInput.click();
//                 } else if (format === 'bullet') {
//                     quill1.format('list', currentFormats.list === 'bullet' ? false : 'bullet');
//                 } else if (format.startsWith('align')) {
//                     if (format === 'align-left') {
//                         quill1.format('align', false);
//                         setAlignment1('left');
//                     } else {
//                         quill1.format('align', format.split('-')[1]);
//                         setAlignment1(format.split('-')[1]);
//                     }
//                 } else {
//                     const isActive = currentFormats[format];
//                     quill1.format(format, !isActive);
//                 }
//             }
//         }
//     };

//     useEffect(() => {
//         if (quillRef1.current) {
//             setQuill1(quillRef1.current.getEditor());
//         }
//     }, []);

//     const handleKeyDown1 = () => {
//         if (quill1) {
//             const range = quill1.getSelection();
//             if (range) {
//                 const currentFormats = quill1.getFormat(range);
//                 if (currentFormats.bold) {
//                     quill1.format('bold', false);
//                 }
//                 if (currentFormats.italic) {
//                     quill1.format('italic', false);
//                 }
//                 if (currentFormats.underline) {
//                     quill1.format('underline', false);
//                 }
//             }
//         }
//     };

//     // ------------------------------------------------------------------------------------------------------------------------------------
//     // state for ReactQuill 1 FOR EXPLAINTION
//     const [value2, setValue2] = useState('');
//     const quillRef2 = useRef<ReactQuill | null>(null); // Ref to hold ReactQuill instance
//     const [quill2, setQuill2] = useState<Quill | null>(null);
//     const [alignment2, setAlignment2] = useState<string | null>(null); // State to hold alignment
//     const [isWriting2, setIsWriting2] = useState(false); // Track if text is being written

//     const handleChange2 = (content: string) => {
//         setValue2(content);
//         checkTextContent2(content);
//     };

//     const checkTextContent2 = (content: string) => {
//         const plainText = content.replace(/<[^>]+>/g, '').trim();
//         setIsWriting2(plainText.length > 0);
//     };

//     const handleIconClick2 = (format: string) => {
//         if (quill2) {
//             const range = quill2.getSelection();
//             if (range) {
//                 const currentFormats = quill2.getFormat(range);
//                 if (format === 'ordered') {
//                     quill2.format('list', currentFormats.list === 'ordered' ? false : 'ordered');
//                 } else if (format === 'image') {
//                     const fileInput = document.createElement('input');
//                     fileInput.type = 'file';
//                     fileInput.accept = 'image/*';
//                     fileInput.onchange = () => {
//                         const file = fileInput.files?.[0];
//                         if (file) {
//                             const reader = new FileReader();
//                             reader.onload = (e) => {
//                                 if (e.target && e.target.result) {
//                                     const imageUrl = e.target.result as string;
//                                     quill2.insertEmbed(range.index, 'image', imageUrl);
//                                 }
//                             };
//                             reader.readAsDataURL(file);
//                         }
//                     };
//                     fileInput.click();
//                 } else if (format === 'bullet') {
//                     quill2.format('list', currentFormats.list === 'bullet' ? false : 'bullet');
//                 } else if (format.startsWith('align')) {
//                     if (format === 'align-left') {
//                         quill2.format('align', false);
//                         setAlignment2('left');
//                     } else {
//                         quill2.format('align', format.split('-')[1]);
//                         setAlignment2(format.split('-')[1]);
//                     }
//                 } else {
//                     const isActive = currentFormats[format];
//                     quill2.format(format, !isActive);
//                 }
//             }
//         }
//     };

//     useEffect(() => {
//         if (quillRef2.current) {
//             setQuill2(quillRef2.current.getEditor());
//         }
//     }, []);

//     const handleKeyDown2 = () => {
//         if (quill2) {
//             const range = quill2.getSelection();
//             if (range) {
//                 const currentFormats = quill2.getFormat(range);
//                 if (currentFormats.bold) {
//                     quill2.format('bold', false);
//                 }
//                 if (currentFormats.italic) {
//                     quill2.format('italic', false);
//                 }
//                 if (currentFormats.underline) {
//                     quill2.format('underline', false);
//                 }
//             }
//         }
//     };

//     return (
//         <div className="pb-4 h-auto">
//             {questionsList.map((question, index) => (
//                 <div key={index} className="rounded-md border border-solid border-[#EAECF0] mt-4 h-auto bg-[#FFFFFF]">
//                     <Collapsible
//                         trigger={
//                             <div className='h-auto bg-[#FFFFFF] flex flex-col p-5 gap-2 rounded-md'>
//                                 <div className="h-auto flex flex-row justify-between">
//                                     <div className="flex gap-2">
//                                         <div className="h-6 w-6 rounded-[4px] bg-[#EAECF0] flex justify-center">
//                                             <span className="text-[#1D2939] font-semibold text-base">{index + 1}</span>
//                                         </div>
//                                         <div className="font-semibold text-base break-all text-[#1D2939] ml-1" dangerouslySetInnerHTML={{ __html: question.question || "Question" }}></div>
//                                     </div>
//                                     <Popover placement="bottom-end">
//                                         <PopoverTrigger
//                                             onClick={(event) => event.stopPropagation()}>
//                                             <button>
//                                                 <Image
//                                                     src="/icons/three-dots.svg"
//                                                     width={20}
//                                                     height={20}
//                                                     alt="Three-dots"
//                                                 />
//                                             </button>
//                                         </PopoverTrigger>
//                                         <PopoverContent className="h-[88px] w-[167px] px-0 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md flex flex-col py-[4px] shadow-lg"
//                                             onClick={(event) => event.stopPropagation()}>

//                                             <button

//                                                 className="flex flex-row h-[40px] w-full px-3 gap-2 hover:bg-[#F2F4F7] items-center"
//                                                 onClick={() => handleAddQuestionduplicate(question)}
//                                             >
//                                                 <Image
//                                                     src="/icons/duplicate.svg"
//                                                     width={18}
//                                                     height={18}
//                                                     alt="Duplicate"
//                                                 />
//                                                 <span className="text-[#0C111D] text-sm font-medium">Duplicate</span>
//                                             </button>
//                                             <button
//                                                 className="flex flex-row h-[40px] w-full px-3 gap-2 hover:bg-[#F2F4F7] items-center"
//                                                 onClick={() => handleDeleteQuestion(index)}
//                                             >
//                                                 <Image
//                                                     src="/icons/delete.svg"
//                                                     width={18}
//                                                     height={18}
//                                                     alt="Delete"
//                                                 />
//                                                 <span className="text-[#DE3024] text-sm font-medium">Delete</span>
//                                             </button>

//                                         </PopoverContent>
//                                     </Popover>
//                                 </div>
//                             </div>
//                         }

//                     >
//                         <div className='h-auto bg-[#FFFFFF] flex flex-col pb-5 px-5 gap-2 rounded-br-md rounded-bl-md'>
//                             <div className="flex flex-col gap-2">
//                                 <span className="font-semibold text-base text-[#1D2939]">Question</span>
//                                 <div
//                                     className={`pt-2 bg-[#FFFFFF] border ${isWriting1 ? 'border-[#D6BBFB]  shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]' : 'border-[#EAECF0]'
//                                         } rounded-[12px] h-auto`}>
//                                     <div className="bg-[#FFFFFF] ">
//                                         <ReactQuill
//                                             ref={quillRef1}
//                                             value={question.question}
//                                             onChange={(value) => handleInputChange(index, value)}
//                                             onKeyDown={handleKeyDown1}
//                                             modules={{ toolbar: false }}
//                                             placeholder="Description"
//                                             className="text-[#1D2939] focus:outline-none rounded-b-[12px] custom-quill placeholder:not-italic min-h-[10px] max-h-[150px] overflow-y-auto border-none font-normal break-all"
//                                         />
//                                     </div>
//                                     <div className="h-[66px] bg-[#FFFFFF] rounded-bl-[12px] rounded-br-[12px] flex justify-center items-center">
//                                         <div className="flex flex-row w-full justify-between items-center mx-5">
//                                             <div className="h-[24px] w-[288px] gap-[24px] flex flex-row">
//                                                 <button onClick={() => handleIconClick1('bold')}>
//                                                     <Image src="/icons/Bold.svg" width={24} height={24} alt="bold" />
//                                                 </button>
//                                                 <button onClick={() => handleIconClick1('italic')}>
//                                                     <Image src="/icons/italic-icon.svg" width={24} height={24} alt="italic-icon" />
//                                                 </button>
//                                                 <button onClick={() => handleIconClick1('underline')}>
//                                                     <Image src="/icons/underline-icon.svg" width={24} height={24} alt="underline-icon" />
//                                                 </button>
//                                                 <Popover placement="bottom-start" className="flex flex-row justify-end">
//                                                     <PopoverTrigger className="">
//                                                         <button className="flex items-center justify-center p-1">
//                                                             {alignment1 === 'center' ? (
//                                                                 <Image src="/icons/align-middle.svg" width={24} height={26} alt="align-center" />
//                                                             ) : alignment1 === 'right' ? (
//                                                                 <Image src="/icons/align-right.svg" width={24} height={26} alt="align-right" />
//                                                             ) : (
//                                                                 <Image src="/icons/dropdown-icon-1.svg" width={32} height={32} alt="align-left" />
//                                                             )}
//                                                         </button>
//                                                     </PopoverTrigger>
//                                                     <PopoverContent className="flex flex-row bg-white rounded-[8px] border-[1px] border-solid border-[#EAECF0] p-2 w-[120px] shadow-[0_2px_4px_#EAECF0] gap-2 ">

//                                                         <button onClick={() => handleIconClick1("align-left")} className="flex items-center justify-center">
//                                                             <Image src="/icons/align-left.svg" width={30} height={30} alt="align-left" />
//                                                         </button>
//                                                         <button onClick={() => handleIconClick1("align-center")} className="flex items-center justify-center">
//                                                             <Image src="/icons/align-middle.svg" width={30} height={30} alt="align-center" />
//                                                         </button>
//                                                         <button onClick={() => handleIconClick1("align-right")} className="flex items-center justify-center">
//                                                             <Image src="/icons/align-right.svg" width={30} height={30} alt="align-right" />
//                                                         </button>

//                                                     </PopoverContent>
//                                                 </Popover>
//                                                 <button onClick={() => handleIconClick1('ordered')}>
//                                                     <Image src="/icons/dropdown-icon-2.svg" width={27} height={27} alt="ordered-list" />
//                                                 </button>
//                                                 <button onClick={() => handleIconClick1('image')}
//                                                     className="hover:bg-[#EAECF0]">
//                                                     <Image src="/icons/upload-image-icon.svg" width={24} height={24} alt="upload-image-icon" />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>



//                             <span className="font-semibold text-base text-[#1D2939]">Options</span>
//                             <div className="flex flex-col gap-3">
//                                 {(Object.keys(question.options) as Array<keyof Options>).map((optionKey) => (
//                                     <div key={optionKey} className="flex flex-row items-center gap-2">
//                                         <div className="h-8 w-8 bg-[#F9FAFB] border border-solid border-[#D0D5DD] rounded-[6px]">
//                                             <span className="text-[#475467] text-sm font-medium flex justify-center items-center h-full w-full">
//                                                 {optionKey}
//                                             </span>
//                                         </div>
//                                         <input
//                                             className="font-medium pl-3 text-[#101828] text-sm placeholder:text-[#A1A1A1] rounded-md w-full placeholder:font-normal
//                                                 focus:outline-none focus:ring-0 border border-solid border-[#D0D5DD] h-[40px] focus:border-[#D6BBFB]
//                                               focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]"
//                                             placeholder={`Option ${optionKey}`}
//                                             value={question.options[optionKey]}
//                                             onChange={(e) => handleOptionChange(index, optionKey, e.target.value)}
//                                         />
//                                     </div>
//                                 ))}
//                             </div>

//                             <span className="font-semibold text-base text-[#1D2939]">Correct answer</span>
//                             <Popover
//                                 key={index}
//                                 placement="bottom"
//                                 isOpen={popoverOpenStates[index]} // Check the specific state for this question
//                                 onClose={() => handlePopoverClose(index)}
//                             >
//                                 <PopoverTrigger>
//                                     <button
//                                         className={`h-[40px] px-3 items-center w-full justify-between flex flex-row rounded-md border border-solid ${isActive(index)
//                                             ? 'border-[#D6BBFB] shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]'
//                                             : 'border-[#D0D5DD]'
//                                             } bg-[#FFFFFF] focus:outline-none`}
//                                         onClick={() => handleclickonselectbutton(index)} // Pass the index
//                                     >
//                                         <span
//                                             className={`font-normal text-sm ${questionsList[index].correctAnswer ? 'text-[#101828]' : 'text-[#667085]'
//                                                 }`}
//                                         >
//                                             {getSelectedAnswerDisplay(question)}
//                                         </span>
//                                     </button>
//                                 </PopoverTrigger>
//                                 <PopoverContent className="w-[60.813rem] rounded-md border border-solid border-[#EAECF0] bg-[#FFFFFF] px-0 flex flex-col pt-[8px] shadow-lg">

//                                     {(Object.keys(question.options) as Array<keyof Options>).map((optionKey) => (
//                                         <div
//                                             key={optionKey}
//                                             className="flex flex-row justify-between w-full h-[40px] items-center hover:bg-[#F2F4F7] px-2 cursor-pointer"
//                                             onClick={() => handleCorrectAnswerSelect(index, optionKey)} // Pass the index
//                                         >
//                                             <span className="font-normal text-[#0C111D] text-sm">
//                                                 {optionKey}. {question.options[optionKey] || `Option ${optionKey}`}
//                                             </span>
//                                             {questionsList[index].correctAnswer === optionKey && (
//                                                 <Image
//                                                     src="/icons/tick-02.svg"
//                                                     width={18}
//                                                     height={18}
//                                                     alt="right mark"
//                                                 />
//                                             )}
//                                         </div>
//                                     ))}

//                                 </PopoverContent>
//                             </Popover>
//                             <div
//                                 className={`pt-2 bg-[#FFFFFF] border ${isWriting2 ? 'border-[#D6BBFB]  shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]' : 'border-[#EAECF0]'
//                                     } rounded-[12px] h-auto`}>
//                                 {/* Textarea for writing the description */}
//                                 <div className="bg-[#FFFFFF] ">
//                                     <ReactQuill
//                                         ref={quillRef2}
//                                         value={question.explanation}
//                                         onChange={(value) => handleExplanationChange(index, value)} // Use `value` directly
//                                         onKeyDown={handleKeyDown2}
//                                         modules={{ toolbar: false }}
//                                         placeholder="Description"
//                                         className="text-[#1D2939] focus:outline-none rounded-b-[12px] custom-quill placeholder:not-italic min-h-[10px] max-h-[150px] overflow-y-auto border-none font-normal break-all"
//                                     />

//                                 </div>

//                                 <div className="h-[66px] bg-[#FFFFFF] rounded-bl-[12px] rounded-br-[12px] flex justify-center items-center">
//                                     <div className="flex flex-row w-full justify-between items-center mx-5">
//                                         {/* Formatting options */}
//                                         <div className="h-[24px] w-[288px] gap-[24px] flex flex-row">
//                                             {/* Icons for formatting */}
//                                             <button onClick={() => handleIconClick2('bold')}>
//                                                 <Image src="/icons/Bold.svg" width={24} height={24} alt="bold" />
//                                             </button>
//                                             <button onClick={() => handleIconClick2('italic')}>
//                                                 <Image src="/icons/italic-icon.svg" width={24} height={24} alt="italic-icon" />
//                                             </button>
//                                             <button onClick={() => handleIconClick2('underline')}>
//                                                 <Image src="/icons/underline-icon.svg" width={24} height={24} alt="underline-icon" />
//                                             </button>
//                                             {/* Alignment options in a popover */}
//                                             <Popover placement="bottom-start" className="flex flex-row justify-end">
//                                                 <PopoverTrigger className="">
//                                                     <button className="flex items-center justify-center p-1">
//                                                         {alignment2 === 'center' ? (
//                                                             <Image src="/icons/align-middle.svg" width={24} height={26} alt="align-center" />
//                                                         ) : alignment2 === 'right' ? (
//                                                             <Image src="/icons/align-right.svg" width={24} height={26} alt="align-right" />
//                                                         ) : (
//                                                             <Image src="/icons/dropdown-icon-1.svg" width={32} height={32} alt="align-left" />
//                                                         )}
//                                                     </button>
//                                                 </PopoverTrigger>
//                                                 <PopoverContent className="flex flex-row bg-white rounded-[8px] border-[1px] border-solid border-[#EAECF0] p-2 w-[120px] shadow-[0_2px_4px_#EAECF0] gap-2 ">
//                                                     {/* Alignment options inside the popover */}
//                                                     <button onClick={() => handleIconClick2("align-left")} className="flex items-center justify-center hover:bg-[#EAECF0]">
//                                                         <Image src="/icons/align-left.svg" width={30} height={30} alt="align-left" />
//                                                     </button>
//                                                     <button onClick={() => handleIconClick2("align-center")} className="flex items-center justify-center hover:bg-[#EAECF0]">
//                                                         <Image src="/icons/align-middle.svg" width={30} height={30} alt="align-center" />
//                                                     </button>
//                                                     <button onClick={() => handleIconClick2("align-right")} className="flex items-center justify-center hover:bg-[#EAECF0]">
//                                                         <Image src="/icons/align-right.svg" width={30} height={30} alt="align-right" />
//                                                     </button>

//                                                 </PopoverContent>
//                                             </Popover>
//                                             <button
//                                                 onClick={() => handleIconClick2('ordered')}>
//                                                 <Image src="/icons/dropdown-icon-2.svg" width={27} height={27} alt="dropdown-icon" />
//                                             </button>
//                                             <button onClick={() => handleIconClick2('image')}
//                                                 className="hover:bg-[#EAECF0]">
//                                                 <Image src="/icons/upload-image-icon.svg" width={24} height={24} alt="upload-image-icon" />
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </Collapsible>
//                 </div>
//             ))}

//             <div className="flex justify-center items-center mt-4">
//                 <button
//                     className="h-[36px] w-[127px] rounded-[8px] bg-[#FFFFFF] border border-solid border-[#8501FF] flex justify-center items-center"
//                     onClick={handleAddQuestion}
//                 >
//                     <span className="text-[#8501FF] text-sm font-semibold">Add Question</span>
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Questions;

"use client";
import Image from "next/image";
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
import Collapsible from 'react-collapsible';
import { Checkbox } from "@nextui-org/react";
import React, { useState, useEffect, useRef, SetStateAction, Dispatch } from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill-new'; // Ensure correct import
import Quill from 'quill'; // Import Quill to use it for types
// Define interfaces outside the component
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
// Sending the Data to the CreateQuiz
interface QuestionsProps {
    questionsList: Question[];
    setQuestionsList: React.Dispatch<React.SetStateAction<Question[]>>;
    anyQuestionAdded: string;
    setAnyQuestionAdded: (anyQuestionAdded: string) => void;
}

function Questions({ questionsList, setQuestionsList, anyQuestionAdded, setAnyQuestionAdded }: QuestionsProps) {

    // Handler for input change
    const handleInputChange = (index: number, value: string | React.ChangeEvent<HTMLInputElement>) => {
        const newQuestionsList = [...questionsList];

        // Check if value is a string (from ReactQuill) or a ChangeEvent (from input)
        if (typeof value === 'string') {
            newQuestionsList[index].question = value;
        } else {
            newQuestionsList[index].question = value.target.value;
        }

        setQuestionsList(newQuestionsList);
    };
    // -----------------------------------------------------------------------------------------------------------
    // Handler for checkbox change
    const handleCheckboxChange = (index: number) => {
        const newQuestionsList = [...questionsList];
        newQuestionsList[index].isChecked = !newQuestionsList[index].isChecked;
        setQuestionsList(newQuestionsList);
    };
    // -----------------------------------------------------------------------------------------------------------
    // Handler for adding new question
    const handleAddQuestion = () => {
        setAnyQuestionAdded('Yes');
        setQuestionsList([
            ...questionsList,
            {
                question: '',
                isChecked: false,
                isActive: false,
                options: { A: '', B: '', C: '', D: '' },
                correctAnswer: null,
                explanation: '',
                questionId: '',
            }
        ]);
    };
    // -----------------------------------------------------------------------------------------------------------
    // Handler for adding the Questions
    const handleAddQuestionduplicate = (duplicateQuestion?: Question) => {
        const newQuestion = duplicateQuestion
            ? { ...duplicateQuestion } // Duplicate all properties of the question
            : {
                question: '',
                isChecked: false,
                isActive: false,
                options: { A: '', B: '', C: '', D: '' },
                correctAnswer: null,
                explanation: '',
                questionId: '',
            };

        setQuestionsList([...questionsList, newQuestion]);
    };
    // -----------------------------------------------------------------------------------------------------------
    // Handler for deleting question
    const handleDeleteQuestion = (index: number) => {
        console.log("Deleting question at index:", index); // Debugging
        setQuestionsList((prevList) => {
            // Set isActive to false for the question being deleted
            const updatedList = prevList.map((q, i) => (i === index ? { ...q, isActive: false } : q));
            return updatedList.filter((_, i) => i !== index); // Delete the question
        });
    };
    // -----------------------------------------------------------------------------------------------------------
    // Handler for option change
    const handleOptionChange = (questionIndex: number, optionKey: keyof Options, value: string) => {
        const newQuestionsList = [...questionsList];
        newQuestionsList[questionIndex].options[optionKey] = value;
        setQuestionsList(newQuestionsList);
    };
    // -----------------------------------------------------------------------------------------------------------
    // Handler for explanation change
    const handleExplanationChange = (index: number, value: string) => {
        const newQuestionsList = [...questionsList];
        newQuestionsList[index].explanation = value;
        setQuestionsList(newQuestionsList);
    };
    // -----------------------------------------------------------------------------------------------------------
    // STATE MANGEMENT FOR SELECT ANSWER AND POPOVER 
    // Track popover state for each question
    const [popoverOpenStates, setPopoverOpenStates] = useState<boolean[]>([]);

    // Handler for setting correct answer
    const handleCorrectAnswerSelect = (questionIndex: number, optionKey: keyof Options) => {
        const newQuestionsList = [...questionsList];
        newQuestionsList[questionIndex].correctAnswer = optionKey;
        setQuestionsList(newQuestionsList);
        handlePopoverClose(questionIndex);
    };

    const getSelectedAnswerDisplay = (question: Question) => {
        if (!question.correctAnswer) return "Select correct answer";

        // Assert that correctAnswer is a valid key in the options object
        const selectedAnswer = question.options[question.correctAnswer as keyof Options];

        return selectedAnswer
            ? `${question.correctAnswer}. ${selectedAnswer}`
            : `Option ${question.correctAnswer}`;
    };

    // Handle click on select button for a specific question
    const handleclickonselectbutton = (questionIndex: number) => {
        const updatedPopoverStates = [...popoverOpenStates];
        updatedPopoverStates[questionIndex] = !popoverOpenStates[questionIndex];
        setPopoverOpenStates(updatedPopoverStates); // Toggle the popover for the specific question
    };

    const handlePopoverClose = (questionIndex: number) => {
        const updatedPopoverStates = [...popoverOpenStates];
        updatedPopoverStates[questionIndex] = false;
        setPopoverOpenStates(updatedPopoverStates);
    };

    const isActive = (questionIndex: number) =>
        popoverOpenStates[questionIndex];
    // -----------------------------------------------------------------------------------------------------------
    // state for ReactQuill 1 FOR QUESTIONS
    const [value1, setValue1] = useState('');
    const quillRef1 = useRef<ReactQuill | null>(null); // Ref to hold ReactQuill instance
    const [quill1, setQuill1] = useState<Quill | null>(null);
    const [alignment1, setAlignment1] = useState<string | null>(null); // State to hold alignment
    const [isWriting1, setIsWriting1] = useState(false); // Track if text is being written

    const handleChange1 = (content: string) => {
        setValue1(content);
        checkTextContent1(content);
    };

    const checkTextContent1 = (content: string) => {
        const plainText = content.replace(/<[^>]+>/g, '').trim();
        setIsWriting1(plainText.length > 0);
    };

    const handleIconClick1 = (format: string) => {
        if (quill1) {
            const range = quill1.getSelection();
            if (range) {
                const currentFormats = quill1.getFormat(range);
                if (format === 'ordered') {
                    quill1.format('list', currentFormats.list === 'ordered' ? false : 'ordered');
                } else if (format === 'image') {
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.accept = 'image/*';
                    fileInput.onchange = () => {
                        const file = fileInput.files?.[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                if (e.target && e.target.result) {
                                    const imageUrl = e.target.result as string;
                                    quill1.insertEmbed(range.index, 'image', imageUrl);
                                }
                            };
                            reader.readAsDataURL(file);
                        }
                    };
                    fileInput.click();
                } else if (format === 'bullet') {
                    quill1.format('list', currentFormats.list === 'bullet' ? false : 'bullet');
                } else if (format.startsWith('align')) {
                    if (format === 'align-left') {
                        quill1.format('align', false);
                        setAlignment1('left');
                    } else {
                        quill1.format('align', format.split('-')[1]);
                        setAlignment1(format.split('-')[1]);
                    }
                } else {
                    const isActive = currentFormats[format];
                    quill1.format(format, !isActive);
                }
            }
        }
    };

    useEffect(() => {
        if (quillRef1.current) {
            setQuill1(quillRef1.current.getEditor());
        }
    }, []);

    const handleKeyDown1 = () => {
        if (quill1) {
            const range = quill1.getSelection();
            if (range) {
                const currentFormats = quill1.getFormat(range);
                if (currentFormats.bold) {
                    quill1.format('bold', false);
                }
                if (currentFormats.italic) {
                    quill1.format('italic', false);
                }
                if (currentFormats.underline) {
                    quill1.format('underline', false);
                }
            }
        }
    };

    // ------------------------------------------------------------------------------------------------------------------------------------
    // state for ReactQuill 1 FOR EXPLAINTION
    const [value2, setValue2] = useState('');
    const quillRef2 = useRef<ReactQuill | null>(null); // Ref to hold ReactQuill instance
    const [quill2, setQuill2] = useState<Quill | null>(null);
    const [alignment2, setAlignment2] = useState<string | null>(null); // State to hold alignment
    const [isWriting2, setIsWriting2] = useState(false); // Track if text is being written

    const handleChange2 = (content: string) => {
        setValue2(content);
        checkTextContent2(content);
    };

    const checkTextContent2 = (content: string) => {
        const plainText = content.replace(/<[^>]+>/g, '').trim();
        setIsWriting2(plainText.length > 0);
    };

    const handleIconClick2 = (format: string) => {
        if (quill2) {
            const range = quill2.getSelection();
            if (range) {
                const currentFormats = quill2.getFormat(range);
                if (format === 'ordered') {
                    quill2.format('list', currentFormats.list === 'ordered' ? false : 'ordered');
                } else if (format === 'image') {
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.accept = 'image/*';
                    fileInput.onchange = () => {
                        const file = fileInput.files?.[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                if (e.target && e.target.result) {
                                    const imageUrl = e.target.result as string;
                                    quill2.insertEmbed(range.index, 'image', imageUrl);
                                }
                            };
                            reader.readAsDataURL(file);
                        }
                    };
                    fileInput.click();
                } else if (format === 'bullet') {
                    quill2.format('list', currentFormats.list === 'bullet' ? false : 'bullet');
                } else if (format.startsWith('align')) {
                    if (format === 'align-left') {
                        quill2.format('align', false);
                        setAlignment2('left');
                    } else {
                        quill2.format('align', format.split('-')[1]);
                        setAlignment2(format.split('-')[1]);
                    }
                } else {
                    const isActive = currentFormats[format];
                    quill2.format(format, !isActive);
                }
            }
        }
    };

    useEffect(() => {
        if (quillRef2.current) {
            setQuill2(quillRef2.current.getEditor());
        }
    }, []);

    const handleKeyDown2 = () => {
        if (quill2) {
            const range = quill2.getSelection();
            if (range) {
                const currentFormats = quill2.getFormat(range);
                if (currentFormats.bold) {
                    quill2.format('bold', false);
                }
                if (currentFormats.italic) {
                    quill2.format('italic', false);
                }
                if (currentFormats.underline) {
                    quill2.format('underline', false);
                }
            }
        }
    };

    return (
        <div className="pb-4 h-auto">
            {questionsList.map((question, index) => (
                <div key={index} className="rounded-md border border-solid border-[#EAECF0] mt-4 h-auto bg-[#FFFFFF]">
                    <Collapsible
                        trigger={
                            <div className='h-auto bg-[#FFFFFF] flex flex-col p-5 gap-2 rounded-md'>
                                <div className="h-auto flex flex-row justify-between gap-4 items-start">
                                    <div className="flex gap-2 ">
                                        <div className="h-6 min-w-[24px] rounded-[4px] mt-[2px] bg-[#EAECF0] flex justify-center ">
                                            <span className="text-[#1D2939] font-semibold text-base">{index + 1}</span>
                                        </div>
                                        <div className="font-semibold text-base break-all text-[#1D2939] ml-1" dangerouslySetInnerHTML={{ __html: question.question || "Question" }}></div>
                                    </div>
                                    <Popover placement="bottom-end">
                                        <PopoverTrigger onClick={(event) => event.stopPropagation()}>
                                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                                <button className="min-w-[20px] min-h-[20px] mt-[2px]">
                                                    <Image
                                                        src="/icons/three-dots.svg"
                                                        width={20}
                                                        height={20}
                                                        alt="Three-dots"
                                                    />
                                                </button>
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="h-[88px] w-[167px] px-0 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md flex flex-col py-[4px] shadow-lg"
                                            onClick={(event) => event.stopPropagation()}>
                                            <button

                                                className="flex flex-row h-[40px] w-full px-3 gap-2 hover:bg-[#F2F4F7] items-center"
                                                onClick={() => handleAddQuestionduplicate(question)}
                                            >
                                                <Image
                                                    src="/icons/duplicate.svg"
                                                    width={18}
                                                    height={18}
                                                    alt="Duplicate"
                                                />
                                                <span className="text-[#0C111D] text-sm font-medium">Duplicate</span>
                                            </button>
                                            <button
                                                className="flex flex-row h-[40px] w-full px-3 gap-2 hover:bg-[#F2F4F7] items-center"
                                                onClick={() => handleDeleteQuestion(index)}
                                            >
                                                <Image
                                                    src="/icons/delete.svg"
                                                    width={18}
                                                    height={18}
                                                    alt="Delete"
                                                />
                                                <span className="text-[#DE3024] text-sm font-medium">Delete</span>
                                            </button>

                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        }

                    >
                        <div className='h-auto bg-[#FFFFFF] flex flex-col pb-5 px-5 gap-2 rounded-br-md rounded-bl-md'>
                            <div className="flex flex-col gap-2">
                                <span className="font-semibold text-base text-[#1D2939]">Question</span>
                                {/*  QUILL 1 for QUESTIONS*/}
                                <div
                                    className={`pt-2 bg-[#FFFFFF] border ${isWriting1 ? 'border-[#D6BBFB]  shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]' : 'border-[#EAECF0]'
                                        } rounded-[12px] h-auto`}>
                                    <div className="bg-[#FFFFFF] ">
                                        <ReactQuill
                                            ref={quillRef1}
                                            value={question.question}
                                            onChange={(value) => handleInputChange(index, value)}
                                            onKeyDown={handleKeyDown1}
                                            modules={{ toolbar: false }}
                                            placeholder="Description"
                                            className="text-[#1D2939] focus:outline-none rounded-b-[12px] custom-quill placeholder:not-italic min-h-[10px] max-h-[150px] overflow-y-auto border-none font-normal break-all"
                                        />
                                    </div>
                                    <div className="h-[66px] bg-[#FFFFFF] rounded-bl-[12px] rounded-br-[12px] flex justify-center items-center">
                                        <div className="flex flex-row w-full justify-between items-center mx-5">
                                            <div className="h-[24px] w-[288px] gap-[24px] flex flex-row">
                                                <button onClick={() => handleIconClick1('bold')}>
                                                    <Image src="/icons/Bold.svg" width={24} height={24} alt="bold" />
                                                </button>
                                                <button onClick={() => handleIconClick1('italic')}>
                                                    <Image src="/icons/italic-icon.svg" width={24} height={24} alt="italic-icon" />
                                                </button>
                                                <button onClick={() => handleIconClick1('underline')}>
                                                    <Image src="/icons/underline-icon.svg" width={24} height={24} alt="underline-icon" />
                                                </button>
                                                <Popover placement="bottom-start" className="flex flex-row justify-end">
                                                    <PopoverTrigger className="">
                                                        <button className="flex items-center justify-center p-1">
                                                            {alignment1 === 'center' ? (
                                                                <Image src="/icons/align-middle.svg" width={24} height={26} alt="align-center" />
                                                            ) : alignment1 === 'right' ? (
                                                                <Image src="/icons/align-right.svg" width={24} height={26} alt="align-right" />
                                                            ) : (
                                                                <Image src="/icons/dropdown-icon-1.svg" width={32} height={32} alt="align-left" />
                                                            )}
                                                        </button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="flex flex-row bg-white rounded-[8px] border-[1px] border-solid border-[#EAECF0] p-2 w-[120px] shadow-[0_2px_4px_#EAECF0] gap-2 ">

                                                        <button onClick={() => handleIconClick1("align-left")} className="flex items-center justify-center">
                                                            <Image src="/icons/align-left.svg" width={30} height={30} alt="align-left" />
                                                        </button>
                                                        <button onClick={() => handleIconClick1("align-center")} className="flex items-center justify-center">
                                                            <Image src="/icons/align-middle.svg" width={30} height={30} alt="align-center" />
                                                        </button>
                                                        <button onClick={() => handleIconClick1("align-right")} className="flex items-center justify-center">
                                                            <Image src="/icons/align-right.svg" width={30} height={30} alt="align-right" />
                                                        </button>

                                                    </PopoverContent>
                                                </Popover>
                                                <button onClick={() => handleIconClick1('ordered')}>
                                                    <Image src="/icons/dropdown-icon-2.svg" width={27} height={27} alt="ordered-list" />
                                                </button>
                                                <button onClick={() => handleIconClick1('image')}
                                                    className="hover:bg-[#EAECF0]">
                                                    <Image src="/icons/upload-image-icon.svg" width={24} height={24} alt="upload-image-icon" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <span className="font-semibold text-base text-[#1D2939]">Options</span>
                            <div className="flex flex-col gap-3">
                                {(Object.keys(question.options) as Array<keyof Options>).map((optionKey) => (
                                    <div key={optionKey} className="flex flex-row items-center gap-2">
                                        <div className="h-8 w-8 bg-[#F9FAFB] border border-solid border-[#D0D5DD] rounded-[6px]">
                                            <span className="text-[#475467] text-sm font-medium flex justify-center items-center h-full w-full">
                                                {optionKey}
                                            </span>
                                        </div>
                                        <input
                                            className="font-medium pl-3 text-[#101828] text-sm placeholder:text-[#A1A1A1] rounded-md w-full placeholder:font-normal
                                                focus:outline-none focus:ring-0 border border-solid border-[#D0D5DD] h-[40px] focus:border-[#D6BBFB]
                                              focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                                            placeholder={`Option ${optionKey}`}
                                            value={question.options[optionKey]}
                                            onChange={(e) => handleOptionChange(index, optionKey, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <span className="font-semibold text-base text-[#1D2939]">Correct answer</span>
                            <Popover
                                key={index}
                                placement="bottom"
                                isOpen={popoverOpenStates[index]} // Check the specific state for this question
                                onClose={() => handlePopoverClose(index)}
                            >
                                <PopoverTrigger>
                                    <button
                                        className={`h-[40px] px-3 items-center w-full justify-between flex flex-row rounded-md border border-solid ${isActive(index)
                                            ? 'border-[#D6BBFB] shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]'
                                            : 'border-[#D0D5DD]'
                                            } bg-[#FFFFFF] focus:outline-none`}
                                        onClick={() => handleclickonselectbutton(index)} // Pass the index
                                    >
                                        <span
                                            className={`font-normal text-sm ${questionsList[index].correctAnswer ? 'text-[#101828]' : 'text-[#667085]'
                                                }`}
                                        >
                                            {getSelectedAnswerDisplay(question)}
                                        </span>
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="px-0 w-[60.813rem] rounded-md border border-solid border-[#EAECF0] bg-[#FFFFFF] flex flex-col pt-[8px] shadow-lg">

                                    {(Object.keys(question.options) as Array<keyof Options>).map((optionKey) => (
                                        <div
                                            key={optionKey}
                                            className="flex flex-row justify-between w-full h-[40px] items-center hover:bg-[#F2F4F7] px-2 cursor-pointer"
                                            onClick={() => handleCorrectAnswerSelect(index, optionKey)} // Pass the index
                                        >
                                            <span className="font-normal text-[#0C111D] text-sm">
                                                {optionKey}. {question.options[optionKey] || `Option ${optionKey}`}
                                            </span>
                                            {questionsList[index].correctAnswer === optionKey && (
                                                <Image
                                                    src="/icons/tick-02.svg"
                                                    width={18}
                                                    height={18}
                                                    alt="right mark"
                                                />
                                            )}
                                        </div>
                                    ))}

                                </PopoverContent>
                            </Popover>
                            <div
                                className={`pt-2 bg-[#FFFFFF] border ${isWriting2 ? 'border-[#D6BBFB]  shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]' : 'border-[#EAECF0]'
                                    } rounded-[12px] h-auto`}>
                                {/* Textarea for writing the description */}
                                <div className="bg-[#FFFFFF] ">
                                    <ReactQuill
                                        ref={quillRef2}
                                        value={question.explanation}
                                        onChange={(value) => handleExplanationChange(index, value)} // Use `value` directly
                                        onKeyDown={handleKeyDown2}
                                        modules={{ toolbar: false }}
                                        placeholder="Description"
                                        className="text-[#1D2939] focus:outline-none rounded-b-[12px] custom-quill placeholder:not-italic min-h-[10px] max-h-[150px] overflow-y-auto border-none font-normal break-all"
                                    />

                                </div>

                                <div className="h-[66px] bg-[#FFFFFF] rounded-bl-[12px] rounded-br-[12px] flex justify-center items-center">
                                    <div className="flex flex-row w-full justify-between items-center mx-5">
                                        {/* Formatting options */}
                                        <div className="h-[24px] w-[288px] gap-[24px] flex flex-row">
                                            {/* Icons for formatting */}
                                            <button onClick={() => handleIconClick2('bold')}>
                                                <Image src="/icons/Bold.svg" width={24} height={24} alt="bold" />
                                            </button>
                                            <button onClick={() => handleIconClick2('italic')}>
                                                <Image src="/icons/italic-icon.svg" width={24} height={24} alt="italic-icon" />
                                            </button>
                                            <button onClick={() => handleIconClick2('underline')}>
                                                <Image src="/icons/underline-icon.svg" width={24} height={24} alt="underline-icon" />
                                            </button>
                                            {/* Alignment options in a popover */}
                                            <Popover placement="bottom-start" className="flex flex-row justify-end">
                                                <PopoverTrigger className="">
                                                    <button className="flex items-center justify-center p-1">
                                                        {alignment2 === 'center' ? (
                                                            <Image src="/icons/align-middle.svg" width={24} height={26} alt="align-center" />
                                                        ) : alignment2 === 'right' ? (
                                                            <Image src="/icons/align-right.svg" width={24} height={26} alt="align-right" />
                                                        ) : (
                                                            <Image src="/icons/dropdown-icon-1.svg" width={32} height={32} alt="align-left" />
                                                        )}
                                                    </button>
                                                </PopoverTrigger>
                                                <PopoverContent className="flex flex-row bg-white rounded-[8px] border-[1px] border-solid border-[#EAECF0] p-2 w-[120px] shadow-[0_2px_4px_#EAECF0] gap-2 ">
                                                    {/* Alignment options inside the popover */}
                                                    <button onClick={() => handleIconClick2("align-left")} className="flex items-center justify-center hover:bg-[#EAECF0]">
                                                        <Image src="/icons/align-left.svg" width={30} height={30} alt="align-left" />
                                                    </button>
                                                    <button onClick={() => handleIconClick2("align-center")} className="flex items-center justify-center hover:bg-[#EAECF0]">
                                                        <Image src="/icons/align-middle.svg" width={30} height={30} alt="align-center" />
                                                    </button>
                                                    <button onClick={() => handleIconClick2("align-right")} className="flex items-center justify-center hover:bg-[#EAECF0]">
                                                        <Image src="/icons/align-right.svg" width={30} height={30} alt="align-right" />
                                                    </button>

                                                </PopoverContent>
                                            </Popover>
                                            <button
                                                onClick={() => handleIconClick2('ordered')}>
                                                <Image src="/icons/dropdown-icon-2.svg" width={27} height={27} alt="dropdown-icon" />
                                            </button>
                                            <button onClick={() => handleIconClick2('image')}
                                                className="hover:bg-[#EAECF0]">
                                                <Image src="/icons/upload-image-icon.svg" width={24} height={24} alt="upload-image-icon" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Collapsible>
                </div>
            ))}

            <div className="flex justify-center items-center mt-4">
                <button
                    className="h-[36px] w-[127px] rounded-[8px] bg-[#FFFFFF] border border-solid border-[#8501FF] flex justify-center items-center"
                    onClick={handleAddQuestion}
                >
                    <span className="text-[#8501FF] text-sm font-semibold">Add Question</span>
                </button>
            </div>
        </div>
    );
}

export default Questions;

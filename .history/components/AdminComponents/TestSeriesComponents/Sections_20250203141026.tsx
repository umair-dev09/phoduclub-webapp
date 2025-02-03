'use client'
import React, { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Checkbox, DatePicker, DateValue, Switch } from "@nextui-org/react";
import { today, getLocalTimeZone, parseDate, parseDateTime } from "@internationalized/date";
import { collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc, getDocs, writeBatch, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "react-toastify";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import Collapsible from 'react-collapsible';
import LoadingData from "@/components/Loading";
import TestQuestions from "./TestQuestions";
import { parse } from 'papaparse'; // For CSV parsing
import { format } from "date-fns";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

interface Section {
  id: string;
  sectionName: string;
  sectionScheduleDate: string;
  parentSectionId?: string | null;
  order?: number;
  hasQuestions: boolean;
  sections?: Section[];
  description: string;
  marksPerQ: string;
  nMarksPerQ: string;
  testTime: string;
  isUmbrellaTest: boolean;
  isParentUmbrellaTest: boolean;
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
  order: number;
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
  isSectionEditing: boolean;
  setIsSectionEditing: (value: boolean) => void;
  testId: string;
  sectionName: string;
  sectionScheduleDate: string;
  setSectionName: (value: string) => void;
  setSectionScheduleDate: (value: string) => void;
}
function convertToSeconds(timeString: string): number {
  const [value, unit] = timeString.split(' ');
  const numValue = parseInt(value, 10);

  if (isNaN(numValue)) {
    throw new Error("Invalid time value. Must be a number.");
  }

  if (unit === 'Minutes') {
    return numValue * 60; // Convert minutes to seconds
  } else if (unit === 'Hours') {
    return numValue * 3600; // Convert hours to seconds
  } else {
    throw new Error("Invalid time unit. Only 'Minutes' and 'Hours' are allowed.");
  }
}

function formatTimeLeft(seconds: number | string): string {
  const minutes = Number(seconds) / 60;

  if (minutes < 60) {
    return `${Math.round(minutes)} Minutes`;
  } else {
    const hours = minutes / 60;
    return `${hours % 1 === 0 ? hours : hours.toFixed(1)} Hours`;
  }
}

const Sections: React.FC<SectionsProps> = ({
  isCreateSection,
  setIsCreateSection,
  testId,
  sectionName,
  sectionScheduleDate,
  setSectionName,
  setSectionScheduleDate,
  isSectionEditing,
  setIsSectionEditing,
}) => {
  const [dateForPicker, setDateForPicker] = useState<DateValue | null>(null);
  const [isUpdating, setIsUpdating] = useState<string>('');
  const [sectionss, setSections] = useState<Section[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<{ id: string; name: string; isUmbrellaTest: boolean; isParentUmbrellaTest: boolean }[]>([]);
  const [questionText, setQuestionText] = useState("");
  const [timeNumber, setTimeNumber] = useState("");
  const [timeText, setTimeText] = useState("Minutes");
  const [marksPerQ, setMarksPerQ] = useState(0);
  const [description, setDescription] = useState("");
  const [editSectionId, setEditSectionId] = useState("");
  const [nMarksPerQ, setnMarksPerQ] = useState(0);
  const [isUmbrellaTest, setIsUmbrellaTest] = useState(false);
  const [isParentUmbrellaTest, setIsParentUmbrellaTest] = useState(false);
  const [saveQuestionSectionId, setSaveQuestionSectionId] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [showQuestionInput, setShowQuestionInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpenT, setIsOpenT] = useState(false);
  const [saveQuestionDialog, setSaveQuestionDialog] = useState(false);
  const [csvUploadDialog, setCsvUploadDialog] = useState(false);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [deletedialog, setDeletedialog] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState<{ id: string } | null>(null);
  const [subsectionToDelete, setSubsectionToDelete] = useState<{ parentSectionId: string, sectionId: string } | null>(null);
  const [popoveropen, setPopoveropen] = useState(false);
  const isSectionButtonDisabled = !sectionName || !sectionScheduleDate;
  const [scrollBehavior, setScrollBehavior] = useState<"inside" | "outside">("outside");
  const [isOpen, setIsOpen] = useState(true); // true to be open by default

  const formatScheduleDate = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, 'dd MMM, yyyy  hh:mm a');
  };
  // opening popover for section
  const [popoveropen1, setPopoveropen1] = useState<string | null>(null);
  const handlePopoverOpen1 = (sectionId: string) => {
    setPopoveropen1(sectionId);
  };
  // opening popover for Subsection
  const [popoveropen2, setPopoveropen2] = useState<{ sectionId: string, subsectionId: string } | null>(null);
  const handlePopoverOpen2 = (sectionId: string, subsectionId: string) => {
    setPopoveropen2({ sectionId, subsectionId });
  };
  // opening delete modal of section
  const openDeleteSectionModal = (section: { id: string }) => {
    setSectionToDelete(section);
    setSubsectionToDelete(null);
    setDeletedialog(true);
  };
  // opening delete modal of Subsection
  const openDeleteSubsectionModal = (sectionId: string, parentSectionId: string) => {
    setSubsectionToDelete({ sectionId, parentSectionId });
    setSectionToDelete(null);
    setDeletedialog(true);
  };

  const [showQuestions, setShowQuestions] = useState(false);
  const [questionsList, setQuestionsList] = useState<Question[]>([{
    question: '',
    isChecked: false,
    isActive: false,
    options: { A: '', B: '', C: '', D: '' },
    correctAnswer: null,
    explanation: '',
    questionId: '',
    difficulty: 'Easy',
    order: 1,
  }]);

  const isAnyQuestionsAdded = () => {
    return questionsList.every(question =>
      question.question.trim() !== '' &&
      question.options.A.trim() !== '' &&
      question.options.B.trim() !== '' &&
      question.options.C.trim() !== '' &&
      question.options.D.trim() !== '' &&
      question.correctAnswer !== null &&
      question.explanation.trim() !== ''
    );
  };
  const isSaveButtonDisabled = !isAnyQuestionsAdded();
  const isDoneWithQuestionDetailsButton = description && marksPerQ && timeNumber && timeText;
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
                    sections: [],
                    description: sectionData.description,
                    marksPerQ: sectionData.marksPerQ,
                    nMarksPerQ: sectionData.nMarksPerQ,
                    testTime: sectionData.testTime,
                    isUmbrellaTest: subsectionData.isUmbrellaTest || false,
                    isParentUmbrellaTest: subsectionData.isParentUmbrellaTest || false,
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
                sections: subsections,
                description: sectionData.description,
                marksPerQ: sectionData.marksPerQ,
                nMarksPerQ: sectionData.nMarksPerQ,
                testTime: sectionData.testTime,
                isUmbrellaTest: sectionData.isUmbrellaTest || false,
                isParentUmbrellaTest: sectionData.isParentUmbrellaTest || false,
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
        return () => { }; // Return a no-op unsubscribe in case of error
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
  const [questionsBreadcrumb, setQuestionsBreadcrumb] = useState<{ id: string; name: string } | null>(null);

  const fetchQuestions = async (sectionId: string, sectionName: string) => {
    setLoading(true); // Start loading before fetching data

    try {
      const path = currentPath.reduce(
        (acc, id) => `${acc}/sections/${id}`,
        `testseries/${testId}`
      );

      const questionsPath = `${path}/sections/${sectionId}/Questions`;
      const questionsCollection = collection(db, questionsPath);

      const questionsSnapshot = await getDocs(questionsCollection);

      const fetchedQuestions = questionsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          questionId: doc.id,
          question: data.question || '',
          isChecked: false,
          isActive: false,
          options: data.options || { A: '', B: '', C: '', D: '' },
          correctAnswer: data.correctAnswer || null,
          explanation: data.answerExplanation || '',
          difficulty: data.difficulty || 'Easy',
          order: data.order || 1,
        };
      });

      if (fetchedQuestions.length === 0) {
        setQuestionsList([
          {
            question: '',
            isChecked: false,
            isActive: false,
            options: { A: '', B: '', C: '', D: '' },
            correctAnswer: null,
            explanation: '',
            questionId: '',
            difficulty: 'Easy',
            order: 1,
          },
        ]);
      } else {
        setQuestionsList(fetchedQuestions);
      }

      const section = sectionss.find((s) => s.id === sectionId);
      setSelectedSection(section || null);
      setShowQuestions(true);
      setQuestionsBreadcrumb({ id: sectionId, name: `${sectionName} -> Questions` });
    } catch (error) {
      console.error('Error fetching questions: ', error);
      toast.error('Failed to fetch questions');
    } finally {
      setLoading(false); // End loading after fetch attempt
    }
  };


  const handleAddSection = async () => {
    if (!testId || !sectionName) return;
    if (isSectionEditing) {
      try {
        const path = currentPath.reduce(
          (acc, id) => `${acc}/sections/${id}`,
          `testseries/${testId}`
        );
        const newSectionRef = doc(db, `${path}/sections/${editSectionId}`);
        await updateDoc(newSectionRef, {
          sectionName,
          sectionScheduleDate: isParentUmbrellaTest ? null : sectionScheduleDate,
        });

        toast.success("Section update successfully");
        resetForm();
      } catch (error) {
        console.error("Error adding section: ", error);
        toast.error("Failed to update section");
      }
    }
    else {
      try {
        const path = currentPath.reduce(
          (acc, id) => `${acc}/sections/${id}`,
          `testseries/${testId}`
        );

        // Get the parent section's isUmbrellaTest status if there's a parent
        let parentIsUmbrella = false;
        const parentSectionId = currentPath[currentPath.length - 1];
        if (parentSectionId) {
          const parentPath = currentPath.slice(0, -1).reduce(
            (acc, id) => `${acc}/sections/${id}`,
            `testseries/${testId}`
          );
          const parentDoc = await getDoc(doc(db, `${parentPath}/sections/${parentSectionId}`));
          parentIsUmbrella = parentDoc.exists() ? (parentDoc.data().isUmbrellaTest || false) : false;
        }

        const sectionCollection = collection(db, `${path}/sections`);
        const newSectionRef = doc(sectionCollection);

        await setDoc(newSectionRef, {
          sectionName,
          sectionScheduleDate: isParentUmbrellaTest ? null : sectionScheduleDate,
          sectionId: newSectionRef.id,
          parentSectionId: currentPath[currentPath.length - 1] || null,
          order: sectionss.length + 1,
          hasQuestions: false,
          isParentUmbrellaTest: parentIsUmbrella,
          createdAt: new Date().toISOString()
        });

        toast.success("Section added successfully");
        resetForm();
      } catch (error) {
        console.error("Error adding section: ", error);
        toast.error("Failed to add section");
      }
    }
  };

  interface FirestoreQuestion {
    difficulty: string;
    questionId: string;
    question: string;
    options: Options;
    correctAnswer: string | null;
    answerExplanation: string;
  }

  const handleSaveQuestionsWithoutDetails = async (sectionId: string) => {
    try {
      // First fetch existing questions to compare
      const path = currentPath.reduce(
        (acc, id) => `${acc}/sections/${id}`,
        `testseries/${testId}`
      );

      const sectionRef = doc(db, `${path}/sections/${sectionId}`);
      const questionsCollectionRef = collection(sectionRef, 'Questions');

      // Get existing questions
      const existingQuestionsSnapshot = await getDocs(questionsCollectionRef);
      const existingQuestions = existingQuestionsSnapshot.docs.map(doc => ({
        questionId: doc.id,
        ...doc.data()
      })) as FirestoreQuestion[];

      // Check for changes
      let hasChanges = false;

      // Check if number of questions changed
      if (existingQuestions.length !== questionsList.length) {
        hasChanges = true;
      } else {
        // Compare each question for changes
        for (const newQuestion of questionsList) {
          const existingQuestion = existingQuestions.find(q =>
            q.questionId === newQuestion.questionId
          );

          if (!existingQuestion) {
            // New question added
            hasChanges = true;
            break;
          }

          // Check if any fields changed
          if (
            existingQuestion.question !== newQuestion.question ||
            existingQuestion.correctAnswer !== newQuestion.correctAnswer ||
            existingQuestion.answerExplanation !== newQuestion.explanation ||
            existingQuestion.difficulty !== newQuestion.difficulty ||
            JSON.stringify(existingQuestion.options) !== JSON.stringify(newQuestion.options)
          ) {
            hasChanges = true;
            break;
          }
        }
      }

      if (!hasChanges) {
        toast.info("No changes found in questions");
        return;
      }

      // If there are changes, proceed with saving
      const batch = writeBatch(db);

      // Process each question in the list
      for (const question of questionsList) {
        let questionRef;

        if (!question.questionId || question.questionId.startsWith('temp-')) {
          questionRef = doc(questionsCollectionRef);
        } else {
          questionRef = doc(questionsCollectionRef, question.questionId);
        }

        const questionData = {
          questionId: questionRef.id,
          question: question.question,
          options: question.options,
          correctAnswer: question.correctAnswer,
          answerExplanation: question.explanation,
          difficulty: question.difficulty,
          order: question.order !== undefined ? question.order : 0,
        };

        batch.set(questionRef, questionData);
      }

      // Delete questions that were removed
      const currentQuestionIds = new Set(questionsList.map(q => q.questionId));
      existingQuestions.forEach(existingQuestion => {
        if (!currentQuestionIds.has(existingQuestion.questionId)) {
          const questionRef = doc(questionsCollectionRef, existingQuestion.questionId);
          batch.delete(questionRef);
        }
      });

      // Update section to indicate it has questions
      batch.update(sectionRef, {
        hasQuestions: true,
      });

      // Commit all changes
      await batch.commit();
      toast.success("Questions saved successfully");

      // Refresh the questions list with updated IDs
      fetchQuestions(sectionId, selectedSection?.sectionName || '');

    } catch (error) {
      console.error("Error saving questions: ", error);
      toast.error("Failed to save questions");
    }
  };
  const handleSaveQuestionsWithDetails = async (sectionId: string, isUmbrellaTest: boolean) => {
    try {
      // Construct the base path
      const path = currentPath.reduce(
        (acc, id) => `${acc}/sections/${id}`,
        `testseries/${testId}`
      );

      // Create a reference to the section document
      const sectionRef = doc(db, `${path}/sections/${sectionId}`);

      // Create a reference to the Questions subcollection
      const questionsCollectionRef = collection(sectionRef, 'Questions');

      // Start a batch write
      const batch = writeBatch(db);
      if (isUmbrellaTest) {
        batch.update(sectionRef, {
          description,
          marksPerQ,
          nMarksPerQ,
          testTime: convertToSeconds(timeNumber + " " + timeText),
        });
        await batch.commit();
        toast.success("Details added successfully");
        setMarksPerQ(0);
        setnMarksPerQ(0);
        setDescription('');
        setTimeNumber('');
        setTimeText('Minutes');
        setSaveQuestionSectionId('');
        setSaveQuestionDialog(false);
        setIsUmbrellaTest(false);
      }
      else {
        // Process each question in the list
        for (const question of questionsList) {
          let questionRef;

          if (!question.questionId || question.questionId.startsWith('temp-')) {
            // For new questions, create a new document reference in the Questions collection
            questionRef = doc(questionsCollectionRef);
          } else {
            // For existing questions, use their current ID
            questionRef = doc(questionsCollectionRef, question.questionId);
          }

          // Prepare question data
          const questionData = {
            questionId: questionRef.id,
            question: question.question,
            options: question.options,
            correctAnswer: question.correctAnswer,
            answerExplanation: question.explanation,
            difficulty: question.difficulty,
            order: question.order !== undefined ? question.order : 0,
          };

          // Add to batch
          batch.set(questionRef, questionData);
        }

        // Update section to indicate it has questions
        batch.update(sectionRef, {
          hasQuestions: true,
          description,
          marksPerQ,
          nMarksPerQ,
          testTime: convertToSeconds(timeNumber + " " + timeText),
        });

        // Commit all changes
        await batch.commit();
        await fetchQuestions(sectionId, selectedSection?.sectionName || '');
        toast.success("Questions and details added successfully");
        setMarksPerQ(0);
        setnMarksPerQ(0);
        setDescription('');
        setTimeNumber('');
        setTimeText('Minutes');
        setSaveQuestionSectionId('');
        setSaveQuestionDialog(false);

        // Navigate back to the previous section
        handleNavigationClick(currentPath.length - 1);
      }


    } catch (error) {
      console.error("Error saving questions: ", error);
      toast.error("Failed to save questions");
    }
  };
  const handleCancelQuestions = () => {
    setShowQuestions(false);
    setSelectedSection(null);
    setQuestionsList([{
      question: '',
      isChecked: false,
      isActive: false,
      options: { A: '', B: '', C: '', D: '' },
      correctAnswer: null,
      explanation: '',
      questionId: '',
      difficulty: 'Easy',
      order: 1,
    }]);
  };
  const handleAddQuestion = () => {
    const newQuestion = {
      question: '',
      isChecked: false,
      isActive: false,
      options: { A: '', B: '', C: '', D: '' },
      correctAnswer: null,
      explanation: '',
      difficulty: 'Easy',
      questionId: `temp-${Date.now()}`, // Temporary ID for new questions
      order: questionsList.length + 1,
    };
    setQuestionsList(prevList => [...prevList, newQuestion]);
  };

  const handleCSV_QuestionUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validExtensions = ['csv', 'xlsx'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (!validExtensions.includes(fileExtension || '')) {
      toast.error("Invalid file type. Please upload a CSV or XLSX file.");
      return;
    }

    if (fileExtension === 'csv') {
      parse(file, {
        header: true,
        complete: (results) => {
          const newQuestions = results.data
            .filter((row: any) => row.question && row.optionA && row.optionB && row.optionC && row.optionD && row.correctAnswer && row.explanation)
            .map((row: any, index: number) => ({
              question: row.question || '',
              isChecked: false,
              isActive: false,
              options: {
                A: row.optionA || '',
                B: row.optionB || '',
                C: row.optionC || '',
                D: row.optionD || '',
              },
              correctAnswer: row.correctAnswer || null,
              explanation: row.explanation || '',
              difficulty: row.difficulty || 'Easy',
              questionId: doc(collection(db, 'questions')).id,
              order: index + 1, // Assign order based on position in CSV
            }));

          if (newQuestions.length === 0) {
            toast.error("No valid questions found in the file.");
            return;
          }

          setQuestionsList(prev => [...prev, ...newQuestions]);
          setCsvUploadDialog(false);
          toast.success("Questions Added!");
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          toast.error("Failed to add questions, Please check your file formatting!");
        }
      });
    } else if (fileExtension === 'xlsx') {
      const XLSX = await import('xlsx');
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

        const headers = jsonData[0] as string[];
        const rows = jsonData.slice(1);

        const newQuestions = rows
          .filter((row: any[]) => row[headers.indexOf('question')] && row[headers.indexOf('optionA')] && row[headers.indexOf('optionB')] && row[headers.indexOf('optionC')] && row[headers.indexOf('optionD')] && row[headers.indexOf('correctAnswer')] && row[headers.indexOf('explanation')])
          .map((row: any[], index: number) => ({
            question: row[headers.indexOf('question')] || '',
            isChecked: false,
            isActive: false,
            options: {
              A: row[headers.indexOf('optionA')] || '',
              B: row[headers.indexOf('optionB')] || '',
              C: row[headers.indexOf('optionC')] || '',
              D: row[headers.indexOf('optionD')] || '',
            },
            correctAnswer: row[headers.indexOf('correctAnswer')] || null,
            explanation: row[headers.indexOf('explanation')] || '',
            difficulty: row[headers.indexOf('difficulty')] || 'Easy',
            questionId: doc(collection(db, 'questions')).id,
            order: index + 1, // Assign order based on position in XLSX
          }));

        if (newQuestions.length === 0) {
          toast.error("No valid questions found in the file.");
          return;
        }

        setQuestionsList(prev => [...prev, ...newQuestions]);
        setCsvUploadDialog(false);
        toast.success("Questions Added!");
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const renderQuestionsView = () => {
    if (!showQuestions || !selectedSection) return null;

    return (
      <div className="border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-[16px] mb-3">
        <div className="p-4">
          <div className="flex flex-col">
            {selectedSection.hasQuestions ? (
              <div className={`flex ${selectedSection.isParentUmbrellaTest ? 'justify-end' : 'justify-between'} mb-4`}>
                {!selectedSection.isParentUmbrellaTest && (
                  <div className="flex flex-col gap-1">
                    <p className="text-[#475467] text-sm">{selectedSection.description || ''}</p>
                    <div className="flex flex-row gap-[6px] items-center mt-1">
                      <Image src="/icons/clock-01.svg" width={12} height={12} alt="schedule" />
                      <p className="text-[#475467] text-xs">Overall Time :</p>
                      <p className="text-xs font-medium">{formatTimeLeft(selectedSection.testTime) || ''}</p>
                      <hr className="h-4 w-[1.5px] bg-[#D0D5DD] mx-2" />
                      <Image src="/icons/book-m.svg" width={12} height={12} alt="schedule" />
                      <p className="text-[#475467] text-xs">Marks per Question :</p>
                      <p className="text-xs font-medium">{selectedSection.marksPerQ || ''}</p>
                      <hr className="h-4 w-[1.5px] bg-[#D0D5DD] mx-2" />
                      <Image src="/icons/book-n.svg" width={12} height={12} alt="schedule" />
                      <p className="text-[#475467] text-xs">Negative Marks per Question :</p>
                      <p className="text-xs font-medium">{selectedSection.nMarksPerQ || ''}</p>
                    </div>
                  </div>
                )}
                <Popover placement="bottom"
                  isOpen={popoveropen}
                  onOpenChange={(open) => setPopoveropen(open)}>
                  <PopoverTrigger>
                    <button
                      className="flex flex-row gap-1 items-center"
                    >
                      <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                      <span className="text-[#9012FF] font-semibold text-sm">Add Question</span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 rounded-md">
                    <div className="flex flex-col w-[180px] justify-center items-center py-1">
                      <button className="flex flex-row gap-1 items-center px-4 py-2 rounded-none w-full h-auto hover:bg-[#F2F4F7] "
                        onClick={() => {
                          handleAddQuestion();
                          setPopoveropen(false);
                        }}
                      >
                        <p className="text-sm">Add manually</p>
                      </button>
                      <button className="flex flex-row gap-1 items-center px-4 py-2 rounded-none w-full h-auto hover:bg-[#F2F4F7]"
                        onClick={() => {
                          setCsvUploadDialog(true);
                          setPopoveropen(false);
                        }} >
                        <p className="text-sm">Upload CSV File</p>
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>

              </div>

            ) : (
              <div className="flex justify-end mb-4">
                <Popover placement="bottom"
                  isOpen={popoveropen}
                  onOpenChange={(open) => setPopoveropen(open)}>
                  <PopoverTrigger>
                    <button
                      className="flex flex-row gap-1 items-center"
                    >
                      <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                      <span className="text-[#9012FF] font-semibold text-sm">Add Question</span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 rounded-md">
                    <div className="flex flex-col w-[180px] justify-center items-center py-1">
                      <button className="flex flex-row gap-1 items-center px-4 py-2 rounded-none w-full h-auto hover:bg-[#F2F4F7] "
                        onClick={() => {
                          handleAddQuestion();
                          setPopoveropen(false);
                        }}
                      >
                        <p className="text-sm">Add manually</p>
                      </button>
                      <button className="flex flex-row gap-1 items-center px-4 py-2 rounded-none w-full h-auto hover:bg-[#F2F4F7]"
                        onClick={() => {
                          setCsvUploadDialog(true);
                          setPopoveropen(false);
                        }} >
                        <p className="text-sm">Upload CSV File</p>
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}

            <TestQuestions
              questionsList={questionsList}
              setQuestionsList={setQuestionsList}
            />
            <div className="flex flex-row justify-end p-4 gap-3">
              <button
                onClick={handleCancelQuestions}
                className="py-2 px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm hover:bg-[#F2F4F7]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedSection.isParentUmbrellaTest) {
                    handleSaveQuestionsWithoutDetails(selectedSection.id); // Perform this action if hasQuestions is true
                  }
                  else {
                    if (selectedSection.hasQuestions) {
                      handleSaveQuestionsWithoutDetails(selectedSection.id); // Perform this action if hasQuestions is true
                    } else {
                      setSaveQuestionDialog(true); // Open dialog if hasQuestions is false
                      setSaveQuestionSectionId(selectedSection.id);
                    }
                  }
                }}
                disabled={isSaveButtonDisabled}
                className={`py-2 px-7 text-white shadow-inner-button border border-white ${isSaveButtonDisabled ? 'bg-[#CDA0FC]' : 'bg-[#9012FF] hover:bg-[#6D0DCC]'
                  } rounded-md font-semibold text-sm`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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


  const navigateToSection = (sectionId: string, sectionName: string, isUmbrellaTest: boolean, isParentUmbrellaTest: boolean) => {
    setCurrentPath((prev) => [...prev, sectionId]);
    setBreadcrumbs((prev) => [...prev, { id: sectionId, name: sectionName, isUmbrellaTest: isUmbrellaTest, isParentUmbrellaTest: isParentUmbrellaTest }]);
  };

  const handleEditSection = (sectionId: string, sectionName: string, sectionScheduleDate: string) => {
    setIsCreateSection(true);
    setEditSectionId(sectionId);
    setIsSectionEditing(true);
    setSectionName(sectionName);
    setSectionScheduleDate(sectionScheduleDate);
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
  const handleNavigationClick = (index: number) => {
    if (showQuestions && index === breadcrumbs.length) {
      // If clicking on the questions breadcrumb, do nothing
      return;
    } else if (showQuestions) {
      // If in questions view and clicking on a section, exit questions view
      setShowQuestions(false);
      setSelectedSection(null);
      setQuestionsBreadcrumb(null);
    }

    // Handle regular section navigation
    setCurrentPath(prev => prev.slice(0, index + 1));
    setBreadcrumbs(prev => prev.slice(0, index + 1));
  };

  // Update the main navigation reset
  const resetNavigation = () => {
    setCurrentPath([]);
    setBreadcrumbs([]);
    setIsParentUmbrellaTest(false);
    setShowQuestions(false);
    setSelectedSection(null);
    setQuestionsBreadcrumb(null);
  };

  const handleUmbrellaToggle = async (sectionId: string, currentValue: boolean) => {
    try {
      setIsUpdating(sectionId);
      // Construct the base path
      const path = currentPath.reduce(
        (acc, id) => `${acc}/sections/${id}`,
        `testseries/${testId}`
      );

      // Create a reference to the section document
      const sectionRef = doc(db, `${path}/sections/${sectionId}`);
      await updateDoc(sectionRef, {
        isUmbrellaTest: !currentValue,
      });
      setSaveQuestionDialog(true); // Open dialog if hasQuestions is false
      setSaveQuestionSectionId(sectionId);
      setIsUmbrellaTest(true);
    } catch (error) {
      console.error('Error updating umbrella test status:', error);
    } finally {
      setIsUpdating('');
    }
  };

  if (loading) {
    return <LoadingData />
  }


  return (
    <div className="my-3 pb-5">
      {/* Breadcrumb Navigation */}
      <div className="flex flex-row items-center gap-2 mb-4">
        <button
          onClick={resetNavigation}
          className="font-medium text-[#667085] hover:underline"
        >
          Sections
        </button>
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={breadcrumb.id} className="flex flex-row items-center gap-2">
            <Image src="/icons/course-left.svg" width={6} height={6} alt="arrow" className="w-[10px] h-[10px]" />
            <button
              onClick={() => {
                handleNavigationClick(index);
                if (breadcrumb.isUmbrellaTest || breadcrumb.isParentUmbrellaTest) {
                  setIsParentUmbrellaTest(true);
                }
                else {
                  setIsParentUmbrellaTest(false);
                }
              }}
              className={
                index === breadcrumbs.length - 1 && !showQuestions
                  ? "text-black font-medium"
                  : "font-medium text-[#667085] hover:underline"
              }
            >
              {breadcrumb.name}
            </button>
          </div>
        ))}
        {questionsBreadcrumb && (
          <div className="flex flex-row items-center gap-2">
            <Image src="/icons/course-left.svg" width={6} height={6} alt="arrow" className="w-[10px] h-[10px]" />
            <span className="text-black font-medium">
              {questionsBreadcrumb.name}
            </span>
          </div>
        )}
      </div>
      {showQuestions ? (
        renderQuestionsView()
      ) : (
        <>
          {sectionss.length <= 0 ? (
            <>

              <div className="w-full h-auto flex flex-col gap-2 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md mb-3 items-center justify-center p-6">
                <h3 className="text-base">Create section/subsection</h3>
                <p className="text-sm text-center">Click on the add section button on the top if you want to add a section or subsection. If you are inside a section a new subsection will be added to the current section.</p>
              </div>

            </>
          ) : (
            <>
              {sectionss.map((section) => (
                <div key={section.id} className="border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-[16px] mb-3">
                  <Collapsible
                    open={isOpen}
                    onChange={() => setIsOpen(prev => !prev)}
                    trigger={
                      <div className="flex flex-row justify-between items-start w-full p-4 bg-[#FCFCFD] rounded-[16px]">
                        <div className="flex flex-col gap-1">
                          <h3 className="font-medium">{section.sectionName}</h3>
                          {!section.isParentUmbrellaTest && (
                            <div className="flex flex-row gap-1 items-center">
                              <Image src="/icons/schedule.svg" width={12} height={12} alt="schedule" />
                              <p className="text-sm">
                                Schedule: <span className="font-medium ml-[2px]">{formatScheduleDate(section.sectionScheduleDate)}</span>
                              </p>
                            </div>
                          )}

                          {((section.hasQuestions && !section.isParentUmbrellaTest) || section.isUmbrellaTest) && (
                            <>
                              <p className="text-[#475467] text-sm">{section.description || ''}</p>
                              <div className="flex flex-row gap-[6px] items-center mt-1">
                                <Image src="/icons/clock-01.svg" width={12} height={12} alt="schedule" />
                                <p className="text-[#475467] text-xs">Overall Time :</p>
                                <p className="text-xs font-medium">{formatTimeLeft(section.testTime) || ''}</p>
                                <hr className="h-4 w-[1.5px] bg-[#D0D5DD] mx-2" />
                                <Image src="/icons/book-m.svg" width={12} height={12} alt="schedule" />
                                <p className="text-[#475467] text-xs">Marks per Question :</p>
                                <p className="text-xs font-medium">{section.marksPerQ || ''}</p>
                                <hr className="h-4 w-[1.5px] bg-[#D0D5DD] mx-2" />
                                <Image src="/icons/book-n.svg" width={12} height={12} alt="schedule" />
                                <p className="text-[#475467] text-xs">Negative Marks per Question :</p>
                                <p className="text-xs font-medium">{section.nMarksPerQ || ''}</p>
                              </div>
                            </>
                          )}



                        </div>
                        <div className={`flex flex-row gap-3 ${section.isParentUmbrellaTest ? 'mt-1' : 'mt-2'} items-center `}>
                          {!section.isParentUmbrellaTest && (section.isUmbrellaTest || (section.sections && section.sections.length < 1 && !section.hasQuestions)) && (
                            <div className="flex flex-row items-center">
                              <Switch size="sm"
                                isSelected={section.isUmbrellaTest || false}
                                isDisabled={isUpdating === section.id || section.isUmbrellaTest}
                                onValueChange={() => {
                                  if (!section.isUmbrellaTest) {
                                    handleUmbrellaToggle(section.id, section.isUmbrellaTest || false)
                                  }
                                }}
                              />
                              <span className="text-[#1D2939] text-[12px] font-semibold">Mark as umbrella Test</span>
                              <div className="bg-[#D0D5DD] w-[1px] h-[20px] ml-2" />
                            </div>
                          )}
                          {section.hasQuestions ? (
                            <button
                              className="flex flex-row gap-1 items-center"
                              onClick={() => {
                                fetchQuestions(section.id, section.sectionName);
                                if (section.isUmbrellaTest || section.isParentUmbrellaTest) {
                                  setIsParentUmbrellaTest(true);
                                }
                                else {
                                  setIsParentUmbrellaTest(false);
                                }
                              }}
                            >

                              <span className=" px-3 py-1 transition duration-200 ease-in-out text-[#9012FF] hover:bg-[#F5F0FF] font-semibold rounded-xl text-sm">View Questions</span>
                            </button>
                          ) : (
                            !section.isParentUmbrellaTest && (
                              <button
                                className="flex flex-row gap-1 items-center"
                                onClick={() => {
                                  navigateToSection(section.id, section.sectionName, section.isUmbrellaTest, section.isParentUmbrellaTest);
                                  if (section.isUmbrellaTest || section.isParentUmbrellaTest) {
                                    setIsParentUmbrellaTest(true);
                                  }
                                  else {
                                    setIsParentUmbrellaTest(false);
                                  }
                                }}
                              >
                                <span className="text-[#9012FF] px-3 py-1 transition duration-200 ease-in-out font-semibold  hover:bg-[#F5F0FF]  rounded-xl text-sm">View Section</span>
                              </button>
                            )
                          )}

                          <Popover placement="bottom-end"
                            isOpen={popoveropen1 === section.id}
                            onOpenChange={(open) => open ? handlePopoverOpen1(section.id) : setPopoveropen1(null)}>
                            <PopoverTrigger>
                              <button className="outline-none">
                                <Image
                                  src="/icons/three-dots.svg"
                                  width={20}
                                  height={20}
                                  alt="More Actions"
                                />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[10.438rem] py-1 px-0 bg-white border border-lightGrey rounded-md">
                              <button className="flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7] outline-none"
                                onClick={(e) => { { handleEditSection(section.id, section.sectionName, section.sectionScheduleDate) }; e.stopPropagation(); setPopoveropen1(null); }}>
                                <Image
                                  src="/icons/edit-icon.svg"
                                  width={14}
                                  height={14}
                                  alt="Edit Actions"
                                />
                                <p className="text-sm ">Edit Section</p>
                              </button>
                              <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#FEE4E2] outline-none"
                                onClick={(e) => { setDeletedialog(true); e.stopPropagation(); openDeleteSectionModal(section); setPopoveropen1(null); }}>
                                <Image
                                  src="/icons/delete.svg"
                                  width={16}
                                  height={16}
                                  alt="Delete Actions"
                                />
                                <p className="text-sm text-[#DE3024]">Delete</p>
                              </button>
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
                          {/* <button
                      onClick={() => handleAddQuestion(section.id)}
                      className="px-4 py-2 text-white bg-[#9012FF] rounded-md"
                    >
                      Add Question
                    </button> */}
                        </div>
                      </div>
                    )}

                    {section.sections && section.sections.length > 0 ? (
                      <>
                        {section.sections.map((subsection) => (
                          <div key={subsection.id} className="border-t flex flex-row justify-between p-4">
                            <h3 className="font-medium">{subsection.sectionName}</h3>
                            <div className="flex flex-row gap-[6px] items-center">
                              <Image src="/icons/schedule.svg" width={14} height={14} alt="schedule" />
                              <p className="text-sm text-[#475467]">Schedule: <span className="font-medium ml-1 text-black">{formatScheduleDate(subsection.sectionScheduleDate)}</span></p>
                              <Popover placement="bottom-end"
                                isOpen={popoveropen2?.sectionId === section.id && popoveropen2?.subsectionId === subsection.id}
                                onOpenChange={(open) =>
                                  open
                                    ? handlePopoverOpen2(section.id, subsection.id)
                                    : setPopoveropen2(null)
                                }>
                                <PopoverTrigger>
                                  <button className="ml-[6px] outline-none">
                                    <Image
                                      src="/icons/three-dots.svg"
                                      width={20}
                                      height={20}
                                      alt="More Actions"
                                    />
                                  </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[10.438rem] py-1 px-0 bg-white border border-lightGrey rounded-md">
                                  <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#FEE4E2] outline-none"
                                    onClick={() => { openDeleteSubsectionModal(section.id, subsection.id); setDeletedialog(true); setPopoveropen2(null) }}>
                                    <Image
                                      src="/icons/delete.svg"
                                      width={16}
                                      height={16}
                                      alt="Delete Actions"
                                    />
                                    <p className="text-sm text-[#DE3024]">Delete</p>
                                  </button>

                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {!section.hasQuestions && (
                          <div className="border-t w-full h-auto flex flex-col gap-2 items-center justify-center p-8">
                            <h3>
                              {section.isParentUmbrellaTest
                                ? 'Create Questions'
                                : section.isUmbrellaTest
                                  ? 'Create Section'
                                  : 'Create section/questions'}
                            </h3>

                            <p className="text-sm text-center w-[90%] text-[#667085]">Test Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups. Name</p>
                            <div className="flex flex-row gap-5 mt-1">
                              {!section.isParentUmbrellaTest && (
                                <button
                                  onClick={() => {
                                    navigateToSection(section.id, section.sectionName, section.isUmbrellaTest, section.isParentUmbrellaTest);
                                    if (section.isUmbrellaTest || section.isParentUmbrellaTest) {
                                      setIsParentUmbrellaTest(true);
                                    }
                                    else {
                                      setIsParentUmbrellaTest(false);
                                    }

                                  }}
                                  className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF] hover:bg-[#F5F0FF] bg-[#FFFFFF] h-[44px] w-[162px] justify-center">
                                  <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                                  <span className="text-[#9012FF] font-semibold text-sm">Add Section</span>
                                </button>
                              )}

                              {!section.isUmbrellaTest && (
                                <button
                                  onClick={() => {
                                    fetchQuestions(section.id, section.sectionName);
                                    if (section.isUmbrellaTest || section.isParentUmbrellaTest) {
                                      setIsParentUmbrellaTest(true);
                                    }
                                    else {
                                      setIsParentUmbrellaTest(false);
                                    }
                                  }}
                                  className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF] hover:bg-[#F5F0FF] bg-[#FFFFFF] h-[44px] w-[162px] justify-center">
                                  <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                                  <span className="text-[#9012FF] font-semibold text-sm">Add Question</span>
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                      </>
                    )}

                  </Collapsible>
                </div>
              ))}
            </>
          )}
        </>

      )}
      {/* Sections List */}




      {/* Create Section Dialog */}
      {/* Your existing Dialog component code remains the same */}
      {/* Create Section Dialog */}
      <Modal isOpen={isCreateSection} onOpenChange={(isOpen) => !isOpen && setIsCreateSection(false)} hideCloseButton
        size="lg"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-row justify-between items-center gap-1">
              <h3 className="text-2xl font-semibold text-[#1D2939]">{isSectionEditing ? 'Edit Section' : 'Create Section'}</h3>
              <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                <button onClick={() => setIsCreateSection(false)}>
                  <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                </button>
              </button>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col w-full gap-2">
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
              {!isParentUmbrellaTest && (
                <div className="flex flex-col w-full gap-2 mb-2">
                  <p className="text-start text-lg text-[#1D2939] font-semibold">Schedule Section</p>
                  <DatePicker
                    granularity="minute"
                    minValue={today(getLocalTimeZone())}
                    // value={dateForPicker}
                    value={sectionScheduleDate ? parseDateTime(sectionScheduleDate) : undefined}
                    hideTimeZone
                    onChange={handleDateChange}
                  />
                </div>
              )}

            </ModalBody>
            <ModalFooter className="border-t border-lightGrey">
              <Button variant="light" className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]" onClick={() => setIsCreateSection(false)}>Cancel</Button>
              <Button
                onClick={handleAddSection}
                disabled={(isParentUmbrellaTest ? sectionName.length === 0 : isSectionButtonDisabled)}
                className={`py-[0.625rem] px-6 text-white shadow-inner-button border border-white ${(isParentUmbrellaTest ? sectionName.length === 0 : isSectionButtonDisabled) ? 'bg-[#CDA0FC]' : 'bg-[#9012FF] hover:bg-[#6D0DCC] '
                  } rounded-md font-semibold text-sm`}
              >
                {isSectionEditing ? 'Save Changes' : 'Create Section'}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal >



      {/* Delete section Dialog */}
      <Modal
        isOpen={deletedialog}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setDeletedialog(false);
            setSectionToDelete(null);
            setSubsectionToDelete(null);
          }
        }}
        hideCloseButton
      >
        <ModalContent>
          <>
            {/* Modal Header */}
            <ModalHeader className="flex flex-row justify-between gap-1">
              <h1 className="text-[#1D2939] font-bold text-lg">
                Delete
              </h1>
              <button
                className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-[#F2F4F7]"
                onClick={() => setDeletedialog(false)}
                aria-label="Close dialog"
              >
                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
              </button>
            </ModalHeader>

            {/* Modal Body */}
            <ModalBody>
              <div className="flex flex-col pb-2 gap-2">
                <span className="text-sm font-normal text-[#667085]">
                  Are you sure you want to delete this? This action cannot be undone.
                </span>
              </div>
            </ModalBody>

            {/* Modal Footer */}
            <ModalFooter className="border-t border-lightGrey">
              <button
                className="py-[0.625rem] px-6 border-2 border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] hover:bg-[#F2F4F7] rounded-md"
                onClick={() => setDeletedialog(false)}
              >
                Cancel
              </button>
              <button
                className="py-[0.625rem] px-6 text-white shadow-inner-button font-semibold bg-[#BB241A] hover:bg-[#B0201A]  border border-[#DE3024] rounded-md"
                onClick={async () => {
                  if (sectionToDelete) {
                    await handleDeleteSection(sectionToDelete.id);
                  } else if (subsectionToDelete) {
                    await handleDeleteSubSection(
                      subsectionToDelete.sectionId,
                      subsectionToDelete.parentSectionId
                    );
                  }
                  setDeletedialog(false);
                }}
              >
                Delete
              </button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
      {/*Question Save Dialog */}
      {/* <Dialog open={saveQuestionDialog} onClose={() => setSaveQuestionDialog(false)}>
        <DialogBackdrop className="fixed inset-0 bg-black/30 " />
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <DialogPanel className="bg-white rounded-2xl w-[559px] h-auto ">
            <div className="flex flex-col gap-6">
              <div className="flex flex-row justify-between items-center px-6 pt-4">
                <h3 className="text-xl font-semibold text-[#1D2939]">Set Time and Marks</h3>
                <button onClick={() => setSaveQuestionDialog(false)}>
                  <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                </button>
              </div>
              <div className="flex flex-col px-6 gap-5">
                <div className='flex flex-col w-full gap-1'>
                  <p className='text-sm font-medium text-[#1D2939]'>Description</p>
                  <input type="text" placeholder="Description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value); // Stores the input value as a string
                    }}
                    className="w-full py-2 px-3 text-sm text-[#1D2939] break-words font-normal placeholder:text-[#667085] border border-lightGrey rounded-md focus:border-[#D7BBFC] focus:ring-4 focus:ring-[#E8DEFB] outline-none transition-colors" />

                </div>
                <div className='flex flex-col w-full gap-1'>
                  <p className='text-sm font-medium text-[#1D2939]'>Time Duration</p>
                  <div className='flex flex-row items-center w-[200px] py-2 px-3 border border-lightGrey rounded-md gap-1 focus-within:border-[#D7BBFC] focus-within:ring-4 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'>
                    <input type="text" placeholder="0"
                      maxLength={3} // Limits input to 2 characters
                      pattern="\d*" // Restricts input to numbers only
                      value={timeNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, ""); // Allows only numbers
                        setTimeNumber(value); // Stores the input value as a string
                      }}
                      className="w-full text-sm text-[#1D2939] font-normal placeholder:text-[#667085] outline-none" />
                    {/* <p className="text-sm text-[#1D2939] font-medium">Min</p> 
                    <Popover placement='bottom' isOpen={isOpenT} onOpenChange={(open) => setIsOpenT(open)}>
                      <PopoverTrigger>
                        <button className='flex flex-row w-[150px] gap-1 pr-2'>
                          <div className={`w-full text-sm text-start`}>{timeText}</div>
                          <Image src='/icons/arrow-down-01-round.svg' alt='open popup' width={20} height={20} />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className='flex flex-col justify-start w-[120px] h-auto py-1 px-0  bg-white '>
                        {["Minutes", "Hours"].map(time => (
                          <button
                            key={time}
                            onClick={() => { setTimeText(time); setIsOpenT(false); }}
                            className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'
                          >
                            {time}
                          </button>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </div>
                  <p className="mt-1 text-[0.813rem] text-[#475467] font-normal">
                    Students must finish the quiz in time.
                  </p>
                </div>
                <div className="flex flex-row gap-3">
                  <div className='flex flex-col w-full gap-1'>
                    <p className='text-sm font-medium text-[#1D2939]'>Marks per question</p>
                    <input type="text" placeholder="0"
                      maxLength={2} // Limits input to 2 characters
                      pattern="\d*" // Restricts input to numbers only
                      value={marksPerQ}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, ""); // Allows only numbers
                        setMarksPerQ(Number(value)); // Convert string to number before setting state
                      }}
                      className="w-full py-2 px-3 text-sm text-[#1D2939] font-normal placeholder:text-[#667085] border border-lightGrey rounded-md focus:border-[#D7BBFC] focus:ring-4 focus:ring-[#E8DEFB] outline-none transition-colors" />
                    <p className="mt-1 text-[0.813rem] text-[#475467] font-normal">
                      Applies only to the correct answers.
                    </p>
                  </div>
                  <div className='flex flex-col w-full gap-1'>
                    <p className='text-sm font-medium text-[#1D2939]'>Negative marks per question (-)</p>
                    <input type="text" placeholder="0"
                      maxLength={2} // Limits input to 2 characters
                      pattern="\d*" // Restricts input to numbers only
                      value={nMarksPerQ}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, ""); // Allows only numbers
                        setnMarksPerQ(Number(value)); // Convert string to number before setting state
                      }}
                      className="w-full py-2 px-3 text-sm text-[#1D2939] font-normal placeholder:text-[#667085] border border-lightGrey rounded-md focus:border-[#D7BBFC] focus:ring-4 focus:ring-[#E8DEFB] outline-none transition-colors" />
                    <p className="mt-1 text-[0.813rem] text-[#475467] font-normal">
                      Applies only to the incorrect answers.
                    </p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex flex-row justify-end mx-6 my-2 items-center gap-4 pb-2">
                <button
                  onClick={() => setSaveQuestionDialog(false)}
                  className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSaveQuestionsWithDetails(saveQuestionSectionId, isUmbrellaTest)}
                  disabled={!isDoneWithQuestionDetailsButton}
                  className={`py-[0.625rem] px-6 text-white shadow-inner-button border border-white ${!isDoneWithQuestionDetailsButton ? 'bg-[#CDA0FC]' : 'bg-[#9012FF]'
                    } rounded-md font-semibold text-sm`}
                >
                  Done
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog> */}


      <Modal
        isOpen={saveQuestionDialog}
        onOpenChange={(isOpen) => !isOpen && setSaveQuestionDialog(false)}
        size="lg"
        hideCloseButton
        scrollBehavior={scrollBehavior}
        isDismissable={false}
      >
        <ModalContent>
          <>
            {/* Modal Header */}
            <ModalHeader className="flex flex-row justify-between gap-1">
              <h3 className="text-xl font-semibold text-[#1D2939]">Set Section Time and Marks</h3>
              <button
                className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-[#F2F4F7]"
              >
                <button onClick={() => setSaveQuestionDialog(false)}>
                  <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                </button>
              </button>
            </ModalHeader>

            {/* Modal Body */}
            <ModalBody>
              <div className='flex flex-col w-full gap-1'>
                <p className='text-sm font-medium text-[#1D2939]'> Section Description</p>
                <input type="text" placeholder="Description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value); // Stores the input value as a string
                  }}
                  className="w-full py-2 px-3 text-sm text-[#1D2939] break-words font-normal placeholder:text-[#667085] border border-lightGrey rounded-md focus:border-[#D7BBFC] focus:ring-4 focus:ring-[#E8DEFB] outline-none transition-colors" />

              </div>
              <div className='flex flex-col w-full gap-1'>
                <p className='text-sm font-medium text-[#1D2939]'> Section Time Duration</p>
                <div className='flex flex-row items-center w-[200px] py-2 px-3 border border-lightGrey rounded-md gap-1 focus-within:border-[#D7BBFC] focus-within:ring-4 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'>
                  <input type="text" placeholder="0"
                    maxLength={3} // Limits input to 2 characters
                    pattern="\d*" // Restricts input to numbers only
                    value={timeNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, ""); // Allows only numbers
                      setTimeNumber(value); // Stores the input value as a string
                    }}
                    className="w-full text-sm text-[#1D2939] font-normal placeholder:text-[#667085] outline-none" />
                  {/* <p className="text-sm text-[#1D2939] font-medium">Min</p> */}
                  <Popover placement='bottom' isOpen={isOpenT} onOpenChange={(open) => setIsOpenT(open)}>
                    <PopoverTrigger>
                      <button className='flex flex-row w-[150px] gap-1 pr-2'>
                        <div className={`w-full text-sm text-start`}>{timeText}</div>
                        <Image src='/icons/arrow-down-01-round.svg' alt='open popup' width={20} height={20} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className='flex flex-col justify-start w-[120px] h-auto py-1 px-0  bg-white '>
                      {["Minutes", "Hours"].map(time => (
                        <button
                          key={time}
                          onClick={() => { setTimeText(time); setIsOpenT(false); }}
                          className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'
                        >
                          {time}
                        </button>
                      ))}
                    </PopoverContent>
                  </Popover>
                </div>
                <p className="mt-1 text-[0.813rem] text-[#475467] font-normal">
                  Students must finish the quiz in time.
                </p>
              </div>
              <div className="flex flex-row gap-3 w-full">
                <div className='flex flex-col w-1/2 gap-1'>
                  <p className='text-sm font-medium text-[#1D2939]'>Marks per question</p>
                  <input type="text" placeholder="0"
                    maxLength={2} // Limits input to 2 characters
                    pattern="\d*" // Restricts input to numbers only
                    value={marksPerQ}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, ""); // Allows only numbers
                      setMarksPerQ(Number(value)); // Convert string to number before setting state
                    }}
                    className="w-full py-2 px-3 text-sm text-[#1D2939] font-normal placeholder:text-[#667085] border border-lightGrey rounded-md focus:border-[#D7BBFC] focus:ring-4 focus:ring-[#E8DEFB] outline-none transition-colors" />
                  <p className="mt-1 text-[0.813rem] text-[#475467] font-normal">
                    Applies only to the correct answers.
                  </p>
                </div>
                <div className='flex flex-col w-1/2 gap-1'>
                  <p className='text-sm font-medium text-[#1D2939] text-left'>Negative marks per question(-)</p>
                  <input type="text" placeholder="0"
                    maxLength={2} // Limits input to 2 characters
                    pattern="\d*" // Restricts input to numbers only
                    value={nMarksPerQ}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, ""); // Allows only numbers
                      setnMarksPerQ(Number(value)); // Convert string to number before setting state
                    }}
                    className="w-full py-2 px-3 text-sm text-[#1D2939] font-normal placeholder:text-[#667085] border border-lightGrey rounded-md focus:border-[#D7BBFC] focus:ring-4 focus:ring-[#E8DEFB] outline-none transition-colors" />
                  <p className="mt-1 text-[0.813rem] text-[#475467] font-normal">
                    Applies only to the incorrect answers.
                  </p>
                </div>
              </div>

            </ModalBody>

            {/* Modal Footer */}
            <ModalFooter className="border-t border-lightGrey">
              <Button variant="light"
                onClick={() => setSaveQuestionDialog(false)}
                className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleSaveQuestionsWithDetails(saveQuestionSectionId, isUmbrellaTest)}
                disabled={!isDoneWithQuestionDetailsButton}
                className={`py-[0.625rem] px-6 text-white shadow-inner-button border border-white ${!isDoneWithQuestionDetailsButton ? 'bg-[#CDA0FC]' : 'bg-[#9012FF] hover:bg-[#6D0DCC]'
                  } rounded-md font-semibold text-sm`}
              >
                Done
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
      {/*CSV Upload Dialog */}
      {/* <Dialog open={csvUploadDialog} onClose={() => setCsvUploadDialog(false)}>
        <DialogBackdrop className="fixed inset-0 bg-black/30 " />
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <DialogPanel className="bg-white rounded-2xl w-[559px] h-auto ">
            <div className="flex flex-col gap-2 px-6">
              <div className="flex flex-row justify-between items-center pt-4">
                <h3 className="text-xl font-semibold text-[#1D2939]">Bulk Question creation</h3>
                <button onClick={() => setCsvUploadDialog(false)}>
                  <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                </button>
              </div>
              <p className="mt-2">Uplaod File</p>
              <div className="bg-[#F9FAFB] rounded-xl flex flex-col items-center justify-center px-2 py-5 border-dashed border ">
                <Image src="/icons/csv-upload-graphics.svg" alt="csv" width={42} height={42} />
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSV_QuestionUpload}
                  className="hidden"
                  id="csvUpload"
                />
                <label htmlFor="csvUpload" className="cursor-pointer text-purple text-sm font-semibold mt-2 mb-1">
                  Click to upload
                </label>
                <span className="text-[#667085] text-sm">.csv .xlsx</span>
              </div>
              <hr />
              <div className="flex flex-row justify-start my-2 items-center  pb-2">
                <button
                  className="flex flex-row gap-2 items-center"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/sample-file.csv'; // Replace with the actual path to your sample file
                    link.download = 'sample-file.csv';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <Image src="/icons/download-csv.svg" alt="Download CSV" width={18} height={18} />
                  <p className="text-[#344054] text-sm">Download Sample file</p>
                </button>

              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog> */}
      <Modal
        isOpen={csvUploadDialog}
        onOpenChange={(isOpen) => !isOpen && setCsvUploadDialog(false)}
        hideCloseButton
        size="lg"
      >
        <ModalContent>
          <>
            {/* Modal Header */}
            <ModalHeader className="flex flex-row justify-between gap-1">
              <h3 className="text-xl font-semibold text-[#1D2939]">Set Time and Marks</h3>
              <button onClick={() => setSaveQuestionDialog(false)}>
                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
              </button>
            </ModalHeader>

            {/* Modal Body */}
            <ModalBody>
              <p className="mt-2">Uplaod File</p>
              <div className="bg-[#F9FAFB] rounded-xl flex flex-col items-center justify-center px-2 py-5 border-dashed border ">
                <Image src="/icons/csv-upload-graphics.svg" alt="csv" width={42} height={42} />
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSV_QuestionUpload}
                  className="hidden"
                  id="csvUpload"
                />
                <label htmlFor="csvUpload" className="cursor-pointer text-purple text-sm font-semibold mt-2 mb-1">
                  Click to upload
                </label>
                <span className="text-[#667085] text-sm">.csv .xlsx</span>
              </div>
              <hr />
              <div className="flex flex-row justify-start my-2 items-center  pb-2">
                <button
                  className="flex flex-row gap-2 items-center"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/sample-file.csv'; // Replace with the actual path to your sample file
                    link.download = 'sample-file.csv';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <Image src="/icons/download-csv.svg" alt="Download CSV" width={18} height={18} />
                  <p className="text-[#344054] text-sm">Download Sample file</p>
                </button>

              </div>
            </ModalBody>


          </>
        </ModalContent>
      </Modal>

    </div>
  );
};

export default Sections;





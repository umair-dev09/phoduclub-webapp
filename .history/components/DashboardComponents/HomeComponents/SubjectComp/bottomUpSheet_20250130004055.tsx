import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Checkbox, Progress } from "@nextui-org/react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Calendar } from "@nextui-org/calendar";
import { auth } from '@/firebase';
import { collection, query, where, onSnapshot, doc, setDoc, getDoc, writeBatch } from 'firebase/firestore';
import { db } from '@/firebase';
import LoadingData from '@/components/Loading';
import { toast } from 'react-toastify';
import { getLocalTimeZone, today, parseDate } from '@internationalized/date';
import React from 'react';

// Interfaces
interface ChapterData {
  chapterId: string;
  chapterName: string;
  subject: string;
  priority: string;
}

interface StudentProgress {
  targetDate: string | null;
  theory: boolean;
  practice: boolean;
  pyqs: boolean;
  revision1: boolean;
  revision2: boolean;
}

interface ChapterWithProgress extends ChapterData {
  progress: StudentProgress;
  unsavedProgress?: StudentProgress; // For tracking local changes
}

interface BottomUpSheet {
  isOpen: boolean;
  closeModal: () => void;
  subjectName: string | null;
}

const defaultProgress: StudentProgress = {
  targetDate: null,
  theory: false,
  practice: false,
  pyqs: false,
  revision1: false,
  revision2: false,
};

const BottomSheet: React.FC<BottomUpSheet> = ({ closeModal, isOpen, subjectName }) => {
  const currentUserId = auth.currentUser?.uid;
  const [chapters, setChapters] = useState<ChapterWithProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSelcetDateOpen, setIsSelectDateOpen] = useState(false);

  // Fetch chapters and student progress
  useEffect(() => {
    if (!currentUserId) return;
    setIsLoading(true);

    // Create query based on subjectName
    const sptRef = collection(db, 'spt');
    const q = subjectName && subjectName !== 'overall'
      ? query(sptRef, where('subject', '==', subjectName))
      : sptRef;

    // Subscribe to chapters
    const unsubscribeChapters = onSnapshot(q, async (snapshot) => {
      const chaptersData: ChapterWithProgress[] = [];

      for (const docSnapshot of snapshot.docs) {
        const chapterData = docSnapshot.data() as ChapterData;

        // Get student progress
        const studentRef = doc(collection(db, 'spt', docSnapshot.id, 'students'), currentUserId);
        const studentSnap = await getDoc(studentRef);
        const progress = studentSnap.exists()
          ? studentSnap.data() as StudentProgress
          : defaultProgress;

        chaptersData.push({
          ...chapterData,
          chapterId: docSnapshot.id,
          progress,
          unsavedProgress: undefined // Initialize with no unsaved changes
        });
      }

      setChapters(chaptersData);
      setIsLoading(false);
    });

    return () => {
      unsubscribeChapters();
    };
  }, [currentUserId, subjectName]);

  // Handle local checkbox changes
  const handleCheckboxChange = (chapterId: string, field: keyof StudentProgress) => {
    setChapters(prevChapters =>
      prevChapters.map(chapter => {
        if (chapter.chapterId !== chapterId) return chapter;

        const currentProgress = chapter.unsavedProgress || chapter.progress;
        const updatedProgress = {
          ...currentProgress,
          [field]: !currentProgress[field]
        };

        return {
          ...chapter,
          unsavedProgress: updatedProgress
        };
      })
    );
    setHasUnsavedChanges(true);
  };

  // Handle local date changes
  const handleDateChange = (chapterId: string, date: string | null, index: number) => {
    setChapters(prevChapters =>
      prevChapters.map(chapter => {
        if (chapter.chapterId !== chapterId) return chapter;

        const currentProgress = chapter.unsavedProgress || chapter.progress;
        const updatedProgress = {
          ...currentProgress,
          targetDate: date
        };

        return {
          ...chapter,
          unsavedProgress: updatedProgress
        };
      })
    );
    setHasUnsavedChanges(true);
    closePopover(index)
  };

  // Save all changes to Firestore
  const handleSave = async () => {
    if (!currentUserId) return;

    const batch = writeBatch(db);

    chapters.forEach(chapter => {
      if (chapter.unsavedProgress) {
        const studentRef = doc(db, 'spt', chapter.chapterId, 'students', currentUserId);
        batch.set(studentRef, chapter.unsavedProgress, { merge: true });
      }
    });

    try {
      await batch.commit();

      // Update local state to reflect saved changes
      setChapters(prevChapters =>
        prevChapters.map(chapter => ({
          ...chapter,
          progress: chapter.unsavedProgress || chapter.progress,
          unsavedProgress: undefined
        }))
      );

      setHasUnsavedChanges(false);
      toast.success('Changes saved successfully!');
      closeModal();
    } catch (error) {
      console.error('Error saving changes:', error);
      // You might want to add error handling UI here
    }
  };

  // Calculate progress percentage
  const calculateProgress = (progress: StudentProgress): number => {
    const fields = ['theory', 'practice', 'pyqs', 'revision1', 'revision2'];
    const completed = fields.filter(field => progress[field as keyof StudentProgress]).length;
    return Math.round((completed / fields.length) * 100);
  };

  const [openPopovers, setOpenPopovers] = React.useState<{ [key: number]: boolean }>({});
  const togglePopover = (index: number) => {
    setOpenPopovers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const closePopover = (index: number) => {
    setOpenPopovers((prev) => ({
      ...prev,
      [index]: false,
    }));
  };


  return (
    <Drawer
      open={isOpen}
      direction="bottom"
      className="rounded-tl-md rounded-tr-md"
      style={{ height: "98vh" }}
    >
      {isLoading ? (
        <LoadingData />
      ) : (
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col h-full overflow-auto">
            <div className="flex flex-row items-center justify-between rounded-t-xl min-h-[69px]">
              <h3 className="ml-6">{subjectName === 'overall'
                ? 'Overall'
                : subjectName === 'physics'
                  ? 'Physics'
                  : subjectName === 'chemistry'
                    ? 'Chemistry'
                    : subjectName === 'maths'
                      ? 'Maths'
                      : subjectName || 'Subject'}</h3>

              <div className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                <button onClick={closeModal}>
                  <Image
                    className="mr-6"
                    src="/icons/VectorcloseButton.svg"
                    alt="close button"
                    width={14}
                    height={14}
                  />
                </button>
              </div>
            </div>

            <div className="overflow-auto h-auto">
              <table className="w-full table-fixed border-t border-[#EAECF0]">
                <thead className="bg-[#F9FAFB] h-11">
                  <tr className="text-xs text-gray-700">
                    <th className="text-left pl-6 w-1/4">Chapter</th>
                    <th className="w-1/8">Priority</th>
                    <th className="w-1/8">Target Date</th>
                    <th className="w-1/10">Theory</th>
                    <th className="w-1/10">Practice</th>
                    <th className="w-1/10">PYQs</th>
                    <th className="w-1/10">Revision 1</th>
                    <th className="w-1/10">Revision 2</th>
                  </tr>
                </thead>
                <tbody>
                  {chapters.map((chapter, index) => {
                    const displayProgress = chapter.unsavedProgress || chapter.progress;
                    return (
                      <tr key={index} className='h-[84px] border-t border-lightGrey'>
                        <td>
                          <div className='ml-6 text-[14px] font-medium'>
                            <p>{chapter.chapterName}</p>
                          </div>
                          <div className="flex flex-row items-center ml-6 mt-1 w-[80%]">
                            <Progress
                              aria-label="Progress"
                              className="w-full h-2"
                              value={calculateProgress(displayProgress)}
                            />
                            <div className="ml-2 text-sm font-normal">
                              {calculateProgress(displayProgress)}%
                            </div>
                          </div>
                        </td>
                        <td className="text-center"> {/* Add text-center to center the content in the cell */}
                          <div className="inline-flex items-center justify-center border border-gray-300 rounded-full bg-white text-sm font-medium text-gray-700 gap-1 px-[10px] py-1 whitespace-nowrap overflow-hidden shadow-sm mx-auto"> {/* Add mx-auto to center the div horizontally */}
                            <div className={`w-2 h-2 rounded-full ${chapter.priority === 'Low' ? 'bg-[#0B9055]' :
                              chapter.priority === 'Medium' ? 'bg-[#DB6704]' :
                                'bg-[#DE3024]'
                              }`}></div>
                            <p className="text-[13px] text-gray-700">{chapter.priority}</p>
                          </div>
                        </td>
                        <td>
                          <Popover placement="bottom"
                            isOpen={!!openPopovers[index]}
                            onOpenChange={() => closePopover(index)}>
                            <PopoverTrigger>
                              <button className="rounded-md bg-[#FFFFFF] flex items-center justify-center w-full p-3"
                                onClick={() => { setIsSelectDateOpen(true); togglePopover(index) }}>
                                <span className="font-normal text-sm text-[#475467] leading-5">
                                  {displayProgress.targetDate || 'Not set'}
                                </span>
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="flex flex-col gap-2 p-0 h-auto">
                              <Calendar
                                defaultValue={today(getLocalTimeZone())}
                                value={displayProgress.targetDate ? parseDate(displayProgress.targetDate.split('T')[0]) : undefined}
                                showMonthAndYearPickers
                                color="primary"
                                onChange={(date) => handleDateChange(chapter.chapterId, date?.toString() || null, index)}
                              />
                              <button
                                onClick={() => handleDateChange(chapter.chapterId, null, index)}
                                className="min-w-[84px] min-h-[30px] rounded-md bg-[#9012FF] text-[14px] font-medium text-white mb-2">
                                Clear
                              </button>
                            </PopoverContent>
                          </Popover>
                        </td>
                        {['theory', 'practice', 'pyqs', 'revision1', 'revision2'].map((field) => (
                          <td key={field} className='pl-[4.7%]'>
                            <Checkbox
                              color="primary"
                              size="md"
                              isSelected={!!displayProgress[field as keyof StudentProgress]}
                              onChange={() => handleCheckboxChange(chapter.chapterId, field as keyof StudentProgress)}
                            />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4 justify-end border-t border-[#EAECF0] h-[76px] pr-6">
            <button
              className="h-11 w-22 py-4 px-6 shadow-inner-button flex flex-row items-center justify-center rounded-md hover:bg-[#F2F4F7] bg-[#FFFFFF] border-2 border-solid border-[#EAECF0]"
              onClick={closeModal}
            >
              <p className="font-semibold text-sm text-[#1D2939]">Cancel</p>
            </button>
            <button
              className={`h-11 w-22 py-4 px-6 shadow-inner-button flex flex-row items-center justify-center rounded-md ${hasUnsavedChanges ? 'bg-[#9012FF] hover:bg-[#6D0DCC]' : 'bg-[#D8ACFF]'
                }`}
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
            >
              <p className="text-sm font-semibold text-[#FFFFFF]">Save</p>
            </button>
          </div>
        </div>
      )}

    </Drawer>
  );
};

export default BottomSheet;
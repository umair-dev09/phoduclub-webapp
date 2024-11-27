"use client";

import React, { useState, useEffect } from "react";
import { Dialog,DialogBackdrop,DialogPanel } from "@headlessui/react";
import { DatePicker, DateValue } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { collection, onSnapshot, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase"; // Adjust your import path for Firebase
import { toast } from "react-toastify";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import Collapsible from 'react-collapsible';

interface Section {
  id: string;
  sectionName: string;
  sectionScheduleDate: string;
  isUmbrella?: boolean;
  parentSectionId?: string | null;
  order?: number;
  sections?: Section[]; 
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
  const [sections, setSections] = useState<Section[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>([]); // For navigation breadcrumbs
  const [breadcrumbs, setBreadcrumbs] = useState<{ id: string; name: string }[]>(
    []
  );
  const isCreateSectionFilled = sectionName && sectionScheduleDate;

  // Fetch sections from Firestore
  useEffect(() => {
    const fetchSections = () => {
      const path = currentPath.reduce(
        (acc, id) => `${acc}/sections/${id}`,
        `testseries/${testId}`
      );
      const sectionCollection = collection(db, path, "sections");

      const unsubscribe = onSnapshot(sectionCollection, (snapshot) => {
        const fetchedSections = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Section[];
        setSections(fetchedSections);
      });

      return unsubscribe; // Cleanup on unmount
    };

    fetchSections();
  }, [currentPath, testId]);

  // Add a new section
  const handleAddSection = async () => {
    try {
      const path = currentPath.reduce(
        (acc, id) => `${acc}/sections/${id}`,
        `testseries/${testId}`
      );
      const sectionCollection = collection(db, path, "sections");
      const newSectionRef = doc(sectionCollection);

      await setDoc(newSectionRef, {
        sectionName,
        sectionScheduleDate,
        sectionId: newSectionRef.id,
        isUmbrella: false,
        parentSectionId: currentPath[currentPath.length - 1] || null,
        order: sections.length + 1,
      });

      toast.success("Section added successfully");
      setIsCreateSection(false);
      setSectionName("");
      setSectionScheduleDate("");
    } catch (error) {
      console.error("Error adding section: ", error);
      toast.error("Failed to add section. Please try again.");
    }
  };

  const navigateToSection = (sectionId: string, sectionName: string) => {
    setCurrentPath((prev) => [...prev, sectionId]);
    setBreadcrumbs((prev) => [...prev, { id: sectionId, name: sectionName }]);
  };
  
  const navigateToBreadcrumb = (index: number) => {
    setCurrentPath((prev) => prev.slice(0, index + 1));
    setBreadcrumbs((prev) => prev.slice(0, index + 1));
  };
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
      <Image className="w-[10px] h-[10px]" src="/icons/course-left.svg" width={6} height={6} alt="arrow"/>
      <button
        onClick={() => navigateToBreadcrumb(index)}
        className={`${
          index === breadcrumbs.length - 1
            ? "text-black font-medium" // Current breadcrumb
            : "font-medium text-[#667085] hover:underline" // Previous breadcrumbs
        }`}
      >
        {breadcrumb.name}
      </button>
    </div>
  ))}
      </div>

      {/* Section List */}
            {sections.map((section,index) => (
        <div
            key={section.id}
            className="border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md h-auto mb-3"
        >
            <Collapsible  key={index}
            trigger={
                <div className="flex flex-row justify-between items-center w-full p-4">
            <div className="flex flex-col gap-1">
            <h3 className="font-medium">{section.sectionName}</h3>
            <div className="flex flex-row gap-1 items-center">
            <Image src="/icons/schedule.svg" width={12} height={12} alt="arrow"/>
            <p className="text-sm ">
                Schedule: <span className="font-medium ml-[2px]">{section.sectionScheduleDate}</span>
            </p>
            </div>
           
            </div>
            <div className="flex flex-row items-center">
            <button
                className="flex flex-row gap-1 items-center rounded-md  h-[44px] w-auto justify-center"
                onClick={() => navigateToSection(section.id, section.sectionName)}  >
                <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
             <span className="text-[#9012FF] font-semibold text-sm">View Section</span>
            </button>
                              <Popover
                                    placement="bottom-end">
                                    <PopoverTrigger>
                                        <button
                                            className="w-10 p-[10px] h-[40px] gap-1 flex-row flex  rounded-md"
                                        >
                                            <Image src="/icons/three-dots.svg" width={18} height={18} alt="three-dots" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="flex flex-col px-0 text-sm font-normal bg-white border border-lightGrey rounded-md w-[167px] shadow-md"
                                    >
                                        <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                            // onClick={() => editCreateSection(section.sectionName, section.sectionScheduleDate, section.sectionId) }
                                            >
                                            <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                                            <span className="text-sm text-[#0C111D] font-normal">Edit Section</span>
                                        </button>
                                        <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full" 
                                        // onClick={() => handleDeleteSection(section.sectionId)}
                                        >
                                            <Image src="/icons/delete.svg" width={18} height={18} alt="delete-quiz" />
                                            <span className="text-sm text-[#DE3024] font-normal">Delete Section</span>
                                        </button>
                                    </PopoverContent>
                                </Popover>
            </div>
                </div>
            }
             >
                {/*Dummy Section */}
              <div 
              className="bg-white flex flex-row justify-between border-t border-[#EAECF0] px-3 py-4">
                <p className="font-medium">Dummy Section Name</p>
                <div className="flex flex-row gap-2">
                <div className="flex flex-row gap-1 items-center">
            <Image src="/icons/schedule.svg" width={12} height={12} alt="arrow"/>
            <p className="text-sm ">
                Schedule: <span className="font-medium ml-[2px]">Dummy Schedule Date</span>
            </p>
            </div>
                </div>
              </div>
             </Collapsible>
            
           
        </div>
        ))}

      {/* Create Section Dialog */}

 {/* THIS IS DAILOG INVOKED WHEN WE PRESS "ADD SECTION FROM "Create section/questions" */}
 <Dialog open={isCreateSection} onClose={() => setIsCreateSection(false)} >
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
                                    // value={dateForPicker}
                                    hideTimeZone
                                    onChange={(date) => {
                                     const dateString = date ? date.toString() : ""; // Customize format if needed
                                     setSectionScheduleDate(dateString);
                                    }}
                                />       
                            </div>
                            <hr />
                            <div className="flex flex-row justify-end mx-6 my-2 items-center gap-4 pb-2">
                                <button onClick={() => setIsCreateSection(false)} className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm">Cancel</button>
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

    </div>
  );
};

export default Sections;

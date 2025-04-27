"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "react-toastify";

interface DialogProps {
    open: boolean;
    onClose: () => void;
    chapterName: string;
    setChapterName: (chapterName: string) => void;
    priority: string;
    setPriority: (priority: string) => void;
    subject: string;
    chapterId: string;
}

const priorities = [
    { label: "Low", color: "#0B9055" },
    { label: "Medium", color: "#DB6704" },
    { label: "High", color: "#DE3024" },
];

function Allsubject({ onClose, open, subject, chapterId, chapterName, priority, setPriority, setChapterName }: DialogProps) {
    const [uniqueId, setUniqueId] = useState(false);
    const [priorityColor, setPriorityColor] = useState<string>("transparent");
    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state

    const handlePrioritySelection = (selectedPriority: string) => {
        setPriority(selectedPriority);
        const selectedColor = priorities.find((item) => item.label === selectedPriority)?.color || "transparent";
        setPriorityColor(selectedColor);
        setIsOpen(false); // Close the popover when selection is made
        setIsFocused(false); // Remove focus state
    };

    const handleAddChapter = async () => {

        if (!isFormValid || loading) return; // Prevent submission if fields are empty or loading

        setLoading(true); // Start loading
        try {
            if (chapterId) {
                // Update existing chapter data in Firestore
                await setDoc(doc(db, "spt", chapterId), {
                    chapterName,
                    priority,
                }, { merge: true });
                toast.success("Chapter Updated Successfully!");
            } else {
                // Add new user data to Firestore
                const docRef = await addDoc(collection(db, "spt"), {
                    chapterName,
                    subject,
                    priority,
                });

                // Update the document with the generated adminId
                await setDoc(docRef, { chapterId: docRef.id }, { merge: true });
                toast.success("Chapter Added Successfully!");
            }

            onClose(); // Close dialog after successful submission
        } catch (error) {
            console.error("Error updating or adding chapter in Firestore:", error);
            toast.error("Failed to save chapter. Please try again.");
        } finally {
            setLoading(false); // End loading
        }
    };

    const isFormValid = chapterName && priority;

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Enter" && isFormValid) {
                handleAddChapter();
            }
        };

        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [isFormValid, handleAddChapter]);

    return (
        <Modal isOpen={open} onOpenChange={(isOpen) => !isOpen && onClose()} hideCloseButton>
            <ModalContent>
                <ModalHeader className="flex flex-row justify-between items-center gap-1">
                    <h1 className="text-[#1D2939] font-bold text-lg">{chapterId ? "Edit Chapter" : "Create Chapter"}</h1>
                    <button
                        className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-[#F2F4F7]"
                        onClick={onClose}
                        aria-label="Close dialog"
                    >
                        <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                    </button>
                </ModalHeader>
                <ModalBody>
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold text-sm text-[#1D2939]">Chapter Name</span>
                        <div className="flex px-2 items-center h-[40px] border border-gray-300 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] focus-within:border-[#D7BBFC] focus-within:ring-4 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors rounded-md">
                            <input
                                className="font-normal text-[#101828] w-full text-sm placeholder:text-[#667085] rounded-md px-1 py-1 focus:outline-none"
                                value={chapterName}
                                type="text"
                                placeholder="Chapter Name"
                                onChange={(e) => setChapterName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full pb-2">
                        <label className="text-[#1D2939] text-sm font-semibold">Priority</label>
                        <Popover placement="bottom" isOpen={isOpen} onOpenChange={setIsOpen}>
                            <PopoverTrigger>
                                <div
                                    className={`flex flex-row py-2 px-4 w-full gap-2 border h-10 rounded-md items-center justify-between cursor-pointer
                                            ${isFocused
                                            ? "outline-none ring-0 border-[#D6BBFB] shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                                            : "border-gray-300"
                                        }`}
                                    onClick={() => {
                                        setIsOpen(isOpen);
                                        setIsFocused(true)
                                    }}
                                >
                                    <div className="flex flex-row gap-2 items-center justify-center">
                                        {!priority ? (
                                            <span className="text-sm font-normal text-[#667085]">Select Priority</span>
                                        ) : (
                                            <>
                                                <div
                                                    className={`w-2 h-2 rounded-full ${priority === 'Low' && 'bg-[#0B9055]' || priority === 'Medium' && 'bg-[#DB6704]' || priority === 'High' && 'bg-[#DE3024]'}`}
                                                ></div>
                                                <span className="font-normal text-sm text-[#182230]">
                                                    {priority}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <Image
                                        src="/icons/by-role-arrow-down.svg"
                                        width={20}
                                        height={20}
                                        alt="Select-role Button"
                                    />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className=" bg-white border border-lightGrey rounded-md shadow-md px-0 w-[395px]">
                                {priorities.map((item) => (
                                    <button
                                        key={item.label}
                                        className="flex justify-between items-center  w-full  px-4 py-2 hover:bg-[#F2F4F7] transition-colors"
                                        onClick={() => handlePrioritySelection(item.label)}

                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-2 h-2 rounded-full"
                                                style={{ backgroundColor: item.color }}
                                            ></div>
                                            <span className="text-[#0C111D] font-normal text-sm">
                                                {item.label}
                                            </span>
                                        </div>
                                        {priority === item.label && (
                                            <Image src="/icons/tick-02.svg" width={18} height={18} alt="Selected" />
                                        )}
                                    </button>
                                ))}

                            </PopoverContent>
                        </Popover>
                    </div>
                </ModalBody>
                <ModalFooter className="border-t border-lightGrey">
                    <Button
                        variant="light" className="py-[0.625rem] px-6 border-2 border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        className={`py-[0.625rem] px-6 rounded-md text-white text-sm shadow-inner-button font-semibold bg-[#9012FF]  transition-opacity  duration-150 ${!isFormValid
                            ? "bg-[#CDA0FC]"
                            : "hover:bg-[#6D0DCC] bg-[#9012FF]"
                            }`}
                        disabled={!isFormValid}
                        onClick={handleAddChapter}
                    >
                        {chapterId ? "Edit Chapter" : "Create Chapter"}
                    </Button>
                </ModalFooter>

            </ModalContent>
        </Modal>


    );
}

export default Allsubject;

import { db } from "@/firebase";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
// Define the props interface
interface ResumeQuizProps {
  open: boolean; // Prop to control dialog visibility
  onClose: () => void; // Define onClose as a function
  fromContent: string;
  contentId: string;
}

function Resume({ open, onClose, fromContent, contentId }: ResumeQuizProps) { // Use the interface
  const onResume = async () => {

    // Determine the Firestore collection based on `fromContent`
    const collectionPath =
      fromContent === "testseries"
        ? "testseries"
        : fromContent === "quiz"
          ? "quiz"
          : fromContent === "course"
            ? "course"
            : fromContent === "notifications"
              ? "notifications"
              : null;

    if (!collectionPath) {
      console.error("Invalid `fromContent` value.");
      return;
    }

    try {
      // Reference to the Firestore document
      const docRef = doc(db, collectionPath, contentId);

      // Update Firestore document with startDate and endDate
      await updateDoc(docRef, {
        status: 'live',
      });
      toast.success('Success!');
      console.log("Schedule updated successfully!");
      onClose(); // Close the dialog after a successful update
    } catch (error) {
      console.error("Error updating Firestore document:", error);
    }
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        onResume();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Modal
      isOpen={true}
      onOpenChange={(isOpen) => !isOpen && onClose()}
      hideCloseButton
    >
      <ModalContent>
        <>
          {/* Modal Header */}
          <ModalHeader className="flex flex-row justify-between items-center gap-1">
            <h3 className=" font-bold task-[#1D2939]">Live {fromContent === "testseries"
              ? "Testseries"
              : fromContent === "quiz"
                ? "Quiz"
                : fromContent === "course"
                  ? "Course"
                  : fromContent === "notifications"
                    ? "Notification"
                    : ""}?</h3>
            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] ">
              <button className="" onClick={onClose}>
                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
              </button>
            </button>
          </ModalHeader>

          {/* Modal Body */}
          <ModalBody className="">
            <p className=" text-sm  pb-2 font-normal text-[#667085]">Are you sure you want to live this {fromContent === "testseries"
              ? "Testseries"
              : fromContent === "quiz"
                ? "Quiz"
                : fromContent === "course"
                  ? "Course"
                  : fromContent === "notifications"
                    ? "Notification"
                    : ""}?</p>
          </ModalBody>

          {/* Modal Footer */}
          <ModalFooter className="border-t border-lightGrey">
            <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md font-semibold text-sm hover:bg-[#F2F4F7] " onClick={onClose}>Cancel</button>
            <Button onClick={onResume} className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#8501FF]  font-semibold text-sm border border-[#9012FF]  hover:bg-[#6D0DCC]  rounded-md">Make the {fromContent === "testseries"
              ? "Testseries"
              : fromContent === "quiz"
                ? "Quiz"
                : fromContent === "course"
                  ? "Course"
                  : fromContent === "notifications"
                    ? "Notification"
                    : ""} live now</Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>

  );
}

export default Resume;

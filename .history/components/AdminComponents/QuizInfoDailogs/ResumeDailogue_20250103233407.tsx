import { db } from "@/firebase";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import React from "react";
import { toast, ToastContainer } from 'react-toastify';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
// Define the props interface
interface ResumeQuizProps {
  open: boolean; // Prop to control dialog visibility
  onClose: () => void; // Define onClose as a function
  fromContent: string;
  contentId: string;
}

function ResumeQuiz({ open, onClose, fromContent, contentId }: ResumeQuizProps) { // Use the interface
  const onResume = async () => {

    // Determine the Firestore collection based on `fromContent`
    const collectionPath =
      fromContent === "testseries"
        ? "testseries"
        : fromContent === "quiz"
          ? "quiz"
          : fromContent === "course"
            ? "course"
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
  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30 " />
      <div className="fixed inset-0 flex items-center justify-center ">
        <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto">
          <div className="flex flex-col gap-2 p-6">
            <div className="flex flex-row justify-between items-center ">
              <h3 className=" font-bold task-[#1D2939]">Live {fromContent === "testseries"
                ? "Testseries"
                : fromContent === "quiz"
                  ? "Quiz"
                  : fromContent === "course"
                    ? "Course"
                    : ""}?</h3>
              <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] ">
                <button className="" onClick={onClose}>
                  <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                </button>
              </button>
            </div>
            <p className=" text-sm font-normal text-[#667085]">Are you sure you want to live this {fromContent === "testseries"
              ? "Testseries"
              : fromContent === "quiz"
                ? "Quiz"
                : fromContent === "course"
                  ? "Course"
                  : ""}?</p>
          </div>
          <hr />
          <div className="flex flex-row justify-end mx-6 my-4 gap-4">
            <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md font-semibold text-sm hover:bg-[#F2F4F7] " onClick={onClose}>Cancel</button>
            <button onClick={onResume} className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#8501FF]  font-semibold text-sm border border-[#9012FF] hover:bg-[#6D0DCC]  rounded-md">Make the {fromContent === "testseries"
              ? "Testseries"
              : fromContent === "quiz"
                ? "Quiz"
                : fromContent === "course"
                  ? "Course"
                  : ""} live now</button>
          </div>

        </DialogPanel>
      </div>
    </Dialog>

  );
}

export default ResumeQuiz;
//  <Modal
//             isOpen={true}
//             onOpenChange={(isOpen) => !isOpen && onClose()}
//             hideCloseButton
//         >
//             <ModalContent>
//                 <>
//                     {/* Modal Header */}
//                     <ModalHeader className="flex flex-row justify-between items-center gap-1">
//                       <h3 className=" font-bold task-[#1D2939]">Live {fromContent === "testseries"
//   ? "Testseries"
//   : fromContent === "quiz"
//     ? "Quiz"
//     : fromContent === "course"
//       ? "Course"
//       : ""}?</h3>
// <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] ">
//   <button className="" onClick={onClose}>
//     <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
//   </button>
// </button>
//                     </ModalHeader>

//                     {/* Modal Body */}
//                     <ModalBody>
//                          <p className=" text-sm font-normal text-[#667085]">Are you sure you want to live this {fromContent === "testseries"
// ? "Testseries"
// : fromContent === "quiz"
//   ? "Quiz"
//   : fromContent === "course"
//     ? "Course"
//     : ""}?</p>
//                     </ModalBody>

//                     {/* Modal Footer */}
//                     <ModalFooter className="border-t border-lightGrey">
//                          <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md font-semibold text-sm hover:bg-[#F2F4F7] " onClick={onClose}>Cancel</button>
// <Button onClick={onResume} className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#8501FF]  font-semibold text-sm border border-[#9012FF]  hover:bg-[#6D0DCC]  rounded-md">Make the {fromContent === "testseries"
//   ? "Testseries"
//   : fromContent === "quiz"
//     ? "Quiz"
//     : fromContent === "course"
//       ? "Course"
//       : ""} live now</Button>
//                     </ModalFooter>
//                 </>
//             </ModalContent>
//         </Modal>
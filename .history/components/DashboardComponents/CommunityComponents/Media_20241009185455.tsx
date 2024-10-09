"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";

interface ChatAreaProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<{ report: boolean; media: boolean }>>;
}


const ChatArea: React.FC<ChatAreaProps> = ({ isOpen, setIsOpen }) => {
    const [reasonVisible, setReasonVisible] = useState(false);
    const [selectedReason, setSelectedReason] = useState("");
    const [reasonText, setReasonText] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Button starts enabled by default
    const [activeButton, setActiveButton] = useState<string | null>(null);

    // Reset states when the dialog is opened
    useEffect(() => {
        if (isOpen) {
            setReasonVisible(false);
            setSelectedReason("");
            setReasonText("");
            setIsButtonDisabled(false);
            setActiveButton(null);
        }
    }, [isOpen]); // This effect runs when isOpen changes

    const handleReasonClick = (reason: string) => {
        setSelectedReason(reason);
        setActiveButton(reason);

        if (reason === "Something else") {
            setReasonVisible(true); // Show the textarea
            setIsButtonDisabled(true); // Disable the button until something is typed
        } else {
            setReasonVisible(true); // Hide the textarea
            setIsButtonDisabled(false); // Enable the button for other reasons
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReasonText(e.target.value);

        // Enable the button if there's text in the textarea
        if (e.target.value.trim() !== "") {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    };

    const handleCancel = () => {
        setIsOpen({ report: false, media: false })
    };
    return (
        <>
            <Dialog open={isOpen} onClose={() => setIsOpen({ report: false, media: false })} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30 " />

                <div className="fixed inset-0 flex items-center justify-center ">
                    <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto border border-[#EAECF0]">

                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}

export default ChatArea;

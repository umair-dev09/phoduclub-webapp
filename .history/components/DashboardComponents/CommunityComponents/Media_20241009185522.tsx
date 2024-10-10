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

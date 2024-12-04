"use client"
import { useState } from "react"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";


function HelpDropDown() {

    return (
        <div >

            <div className="mx-2">
                <button className="w-[32px] h-[32px] bg-[#F7F8FA] border-[1.5px] border-[#EAECF0] rounded-full flex items-center justify-center">
                    <Image src="/icons/help-circle.svg" width={16} height={16} alt="Help Icon" />
                </button>
            </div>

        </div>
    );
}
export default HelpDropDown;

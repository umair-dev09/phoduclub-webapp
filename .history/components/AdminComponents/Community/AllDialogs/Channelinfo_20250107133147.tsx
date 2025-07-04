"use client"
import { useState } from "react"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import Editgroup from "./Createchannel";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
// Define the props interface
interface channelinfoProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
    channelName: string;
    channelId: string;
    channelEmoji: string;
    channelDescription: string;
    communityId: string;
    categoryId: string;
}

const membersData = [
    { name: "Jenny Wilson", username: "jenny#8547", role: "Admin" },
    { name: "John Doe", username: "john#1234", role: "Teacher" },
    { name: "Alice Brown", username: "alice#9876", role: "Editor" },
    { name: "Jenny Wilson", username: "jenny#8547", role: "Admin" },
    { name: "John Doe", username: "john#1234", role: "Teacher" },
    { name: "Alice Brown", username: "alice#9876", role: "Editor" },
];
function ChannelInfo({ open, onClose, channelDescription, channelEmoji, channelId, channelName, categoryId, communityId }: channelinfoProps) {
    const [scrollBehavior, setScrollBehavior] = useState<"inside" | "outside">("outside");
    const [edigroupdetails, setEditgroupdetails] = useState(false);
    const [uniqueID, setUniqueID] = useState('');
    const [isOpen, setIsOpen] = useState(false); // Control popover visibility
    const [members, setMembers] = useState(
        membersData.map((member) => ({ ...member, checked: false }))
    );
    return (
        // <Dialog open={open} onClose={onClose} className="relative z-50">
        //     <DialogBackdrop className="fixed inset-0 bg-black/30" />
        //     <div className="fixed inset-0 flex items-center justify-center">
        //         <DialogPanel className="bg-white rounded-2xl w-[568px] h-auto flex flex-col  max-h-[92%] overflow-y-auto">
        //             <div className=' flex flex-col p-6 gap-2 rounded-t-2xl'>
        //                 <div className='flex flex-row justify-between items-center'>
        //                     <h1 className='text-[#1D2939] font-bold text-lg'>Channel info</h1>
        //                     <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
        //                         <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} />
        //                     </button>
        //                 </div>
        //                 <div className="flex flex-row items-center  justify-between group gap-2  mb-1">
        //                     <div className='flex flex-row gap-2 items-center'>
        //                         <p>{channelEmoji}</p>
        //                         <p className="text-xl font-semibold text-[#182230]">{channelName}</p>
        //                     </div>
        //                     <Popover placement="bottom-end">
        //                         <PopoverTrigger>
        //                             <button className='focus:outline-none flex items-center justify-center border border-solid border-[#EAECF0] rounded-md h-10 w-10 hover:bg-[#F2F4F7]'>
        //                                 <Image
        //                                     src="/icons/three-dots.svg"
        //                                     width={20}
        //                                     height={20}
        //                                     alt="threedots"
        //                                 />
        //                             </button>
        //                         </PopoverTrigger>
        //                         <PopoverContent className=" py-0 px-0 bg-white rounded-md  shadow-md flex flex-col border border-solid border-[#EAECF0] h-12 w-auto hover:bg-[#EAECF0]">
        //                             <button className="px-2  gap-2 flex flex-row justify-center items-center  rounded-md "
        //                                 onClick={() => setEditgroupdetails(true)}>
        //                                 <Image
        //                                     src="/icons/edit-02.svg"
        //                                     width={18}
        //                                     height={18}
        //                                     alt="edit-icon" />
        //                                 <p className="text-sm text-[#0C111D] font-normal">Edit Details</p>
        //                             </button>

        //                         </PopoverContent>
        //                     </Popover>
        //                 </div>
        //                 <span className='text-[#667085] font-normal text-sm'>{channelDescription}</span>
        //                 <div className=" flex flex-row justify-between items-center">
        //                     <p className="text-[#1D2939] font-semibold text-lg">Users</p>
        //                     <div className="flex flex-row gap-4">
        //                         <Popover placement="bottom">
        //                             <PopoverTrigger>
        //                                 <button className="w-[116px] h-10 rounded-md  justify-center border-2  gap-1 border-solid border-[#EAECF0] flex flex-row items-center hover:bg-[#F2F4F7] focus:outline-none">
        //                                     <span className="text-[#1D2939] text-sm font-semibold">All Users</span>
        //                                     <Image
        //                                         src="/icons/arrow-dark-down-1.svg"
        //                                         width={20}
        //                                         height={20}
        //                                         alt="Arrow-icon" />
        //                                 </button>
        //                             </PopoverTrigger>
        //                             <PopoverContent className="w-[137px] px-0 py-1 border border-lightGrey rounded-md shadow-[0_12px_16px_-4px_rgba(16,24,40,0.08)] flex flex-col">

        //                                 <button className="w-full flex  pl-4 items-center h-10 text-sm text-left text-primary-900 font-normal transition-colors hover:bg-[#F2F4F7]">All Students</button>
        //                                 <button className="w-full flex  pl-4 items-center h-10 text-sm text-left text-primary-900 font-normal transition-colors hover:bg-[#F2F4F7]">Free Users</button>
        //                                 <button className="w-full flex pl-4 items-center  h-10 text-sn text-left text-primary-900 font-normal transition-colors hover:bg-[#F2F4F7]">Premium Users</button>
        //                                 <button className="w-full flex pl-4 items-center h-10 text-sm text-left text-primary-900 font-normal transition-colors hover:bg-[#F2F4F7]">Muted Users</button>

        //                             </PopoverContent>
        //                         </Popover>

        //                         <Popover placement="bottom" >
        //                             <PopoverTrigger>
        //                                 <button className="w-[135px] h-10 rounded-md  justify-center border-2  focus:outline-none gap-1 border-solid border-[#EAECF0] hover:bg-[#F2F4F7] flex flex-row items-center">
        //                                     <Image
        //                                         src="/icons/plus-dark.svg"
        //                                         width={16}
        //                                         height={16}
        //                                         alt="plus-icon" />
        //                                     <span className="text-[#1D2939] text-sm font-semibold">Add user</span>
        //                                 </button>
        //                             </PopoverTrigger>
        //                             <PopoverContent className="w-[304px] p-6 bg-[#FFFFFF] border-solid border-[#EAECF0] rounded-md gap-4">
        //                                 <div className='flex flex-col gap-2 w-full'>
        //                                     <span className='font-medium text-[#1D2939] text-sm'>Unique ID</span>
        //                                     <div className='flex px-2 items-center h-[40px] border  border-gray-300   focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] shadow-sm rounded-md'>
        //                                         <input
        //                                             className="font-normal text-[#667085] w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
        //                                             placeholder="Enter Unique ID"
        //                                             type="text"
        //                                             value={uniqueID}
        //                                             onChange={(e) => setUniqueID(e.target.value)}
        //                                         />
        //                                     </div>
        //                                     <span className="text-[#F04438] text-sm font-normal">This is not Premium student ID.</span>
        //                                 </div>
        //                                 <div className='w-auto h-auto gap-4 flex flex-row'>
        //                                     <button className='h-11 w-[120px] border border-solid border-[#EAECF0] rounded-md bg-[#FFFFFF] flex items-center justify-center hover:bg-[#F2F4F7]'
        //                                         onClick={() => setIsOpen(false)}>
        //                                         <span className='font-semibold text-[#1D2939] text-sm'>Cancel</span>
        //                                     </button>
        //                                     <button
        //                                         className={`h-11 w-[120px]  rounded-md flex items-center justify-center shadow-inner-button ${uniqueID ? 'bg-[#8501FF] border border-solid border-[#800EE2]' : 'bg-[#CDA0FC] cursor-not-allowed'}`}
        //                                         disabled={!uniqueID}
        //                                         onClick={() => setIsOpen(false)}>
        //                                         <span className='font-semibold text-[#FFFFFF] text-sm'>Add</span>
        //                                     </button>
        //                                 </div>
        //                             </PopoverContent>
        //                         </Popover>
        //                     </div>
        //                 </div>
        //                 <div className=" mb-6 border border-[#EAECF0] rounded-xl overflow-hidden">
        //                     <div className="max-h-[300px] overflow-y-auto ">
        //                         <table className="w-full ">
        //                             <thead className="sticky top-0 z-10 bg-white shadow-sm flex flex-row justify-between">
        //                                 <tr>
        //                                     <td className="w-[50%] pl-2 py-3">
        //                                         <p className="text-sm text-[#667085] font-medium leading-6">
        //                                             Name
        //                                         </p>
        //                                     </td>
        //                                     <td className="  pl-60 py-3">
        //                                         <p className="text-sm text-[#667085] text-end font-medium leading-6">
        //                                             Action
        //                                         </p>
        //                                     </td>
        //                                 </tr>
        //                             </thead>
        //                             <tbody>
        //                                 {members.map((member, index) => (
        //                                     <tr
        //                                         key={index}
        //                                         className="border-t border-lightGrey"
        //                                     >

        //                                         <td className="pl-2 py-3">
        //                                             <div className="flex flex-row gap-2 items-center">
        //                                                 <div className="relative">
        //                                                     <Image
        //                                                         src="/images/DP_Lion.svg"
        //                                                         alt="DP"
        //                                                         width={40}
        //                                                         height={40}
        //                                                     />
        //                                                     <Image
        //                                                         className="absolute right-0 bottom-0"
        //                                                         src="/icons/winnerBatch.svg"
        //                                                         alt="Batch"
        //                                                         width={18}
        //                                                         height={18}
        //                                                     />
        //                                                 </div>
        //                                                 <div className="flex flex-col">
        //                                                     <span className="text-sm font-semibold whitespace-nowrap">
        //                                                         {member.name}
        //                                                     </span>
        //                                                     <span className="text-[13px] text-[#667085]">
        //                                                         {member.username}
        //                                                     </span>
        //                                                 </div>
        //                                             </div>
        //                                         </td>

        //                                         <td className="pl-2 py-3">
        //                                             <Popover placement="bottom-end">
        //                                                 <PopoverTrigger>
        //                                                     <button className="ml-[25%] outline-none">
        //                                                         <Image
        //                                                             src="/icons/three-dots.svg"
        //                                                             width={20}
        //                                                             height={20}
        //                                                             alt="More Actions"
        //                                                         />
        //                                                     </button>
        //                                                 </PopoverTrigger>
        //                                                 <PopoverContent className=" w-[167px] px-0 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md  shadow-lg">
        //                                                     <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]">
        //                                                         <Image src='/icons/green-color-umute.svg' alt="user profile" width={18} height={18} />
        //                                                         <p className="text-sm text-[#0B9055] font-normal">Umute</p>
        //                                                     </button>
        //                                                     <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]">
        //                                                         <Image src='/icons/delete.svg' alt="user profile" width={18} height={18} />
        //                                                         <p className="text-sm text-[#DE3024] font-normal">Delete</p>
        //                                                     </button>
        //                                                     <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]">
        //                                                         <Image src='/icons/user-block-red-01.svg' alt="user profile" width={18} height={18} />
        //                                                         <p className="text-sm text-[#DE3024] font-normal">Mute User</p>
        //                                                     </button>
        //                                                     <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]">
        //                                                         <Image src='/icons/delete.svg' alt="user profile" width={18} height={18} />
        //                                                         <p className="text-sm text-[#DE3024] font-normal">Remove User</p>
        //                                                     </button>
        //                                                 </PopoverContent>
        //                                             </Popover>
        //                                         </td>

        //                                     </tr>
        //                                 ))}
        //                             </tbody>
        //                         </table>
        //                     </div>
        //                 </div>
        //             </div>
        //         </DialogPanel>
        //     </div >

        // </Dialog >

        <Modal isOpen={open} onOpenChange={(isOpen) => !isOpen && onClose()} hideCloseButton
            scrollBehavior={scrollBehavior}
        >

            <ModalContent>
                <>
                    <ModalHeader className="flex flex-row justify-between items-center gap-1">
                        <h1 className='text-[#1D2939] font-bold text-lg'>Channel info</h1>
                        <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                            <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} />
                        </button>
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-row items-center  justify-between group gap-2  mb-1">
                            <div className='flex flex-row gap-2 items-center'>
                                <p>{channelEmoji}</p>
                                <p className="text-xl font-semibold text-[#182230]">{channelName}</p>
                            </div>
                            <Popover placement="bottom-end">
                                <PopoverTrigger>
                                    <button className='focus:outline-none flex items-center justify-center border border-solid border-[#EAECF0] rounded-md h-10 w-10 hover:bg-[#F2F4F7]'>
                                        <Image
                                            src="/icons/three-dots.svg"
                                            width={20}
                                            height={20}
                                            alt="threedots"
                                        />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className=" py-0 px-0 bg-white rounded-md  shadow-md flex flex-col border border-solid border-[#EAECF0] h-12 w-auto hover:bg-[#EAECF0]">
                                    <button className="px-2  gap-2 flex flex-row justify-center items-center  rounded-md "
                                        onClick={() => setEditgroupdetails(true)}>
                                        <Image
                                            src="/icons/edit-02.svg"
                                            width={18}
                                            height={18}
                                            alt="edit-icon" />
                                        <p className="text-sm text-[#0C111D] font-normal">Edit Details</p>
                                    </button>

                                </PopoverContent>
                            </Popover>
                        </div>
                        <span className='text-[#667085] font-normal text-sm'>{channelDescription}</span>
                        <div className=" flex flex-row justify-between items-center">
                            <p className="text-[#1D2939] font-semibold text-lg">Users</p>
                            <div className="flex flex-row gap-4">
                                <Popover placement="bottom">
                                    <PopoverTrigger>
                                        <button className="w-[116px] h-10 rounded-md  justify-center border-2  gap-1 border-solid border-[#EAECF0] flex flex-row items-center hover:bg-[#F2F4F7] focus:outline-none">
                                            <span className="text-[#1D2939] text-sm font-semibold">All Users</span>
                                            <Image
                                                src="/icons/arrow-dark-down-1.svg"
                                                width={20}
                                                height={20}
                                                alt="Arrow-icon" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[137px] px-0 py-1 border border-lightGrey rounded-md shadow-[0_12px_16px_-4px_rgba(16,24,40,0.08)] flex flex-col">

                                        <button className="w-full flex  pl-4 items-center h-10 text-sm text-left text-primary-900 font-normal transition-colors hover:bg-[#F2F4F7]">All Students</button>
                                        <button className="w-full flex  pl-4 items-center h-10 text-sm text-left text-primary-900 font-normal transition-colors hover:bg-[#F2F4F7]">Free Users</button>
                                        <button className="w-full flex pl-4 items-center  h-10 text-sn text-left text-primary-900 font-normal transition-colors hover:bg-[#F2F4F7]">Premium Users</button>
                                        <button className="w-full flex pl-4 items-center h-10 text-sm text-left text-primary-900 font-normal transition-colors hover:bg-[#F2F4F7]">Muted Users</button>

                                    </PopoverContent>
                                </Popover>

                                <Popover placement="bottom" >
                                    <PopoverTrigger>
                                        <button className="w-[135px] h-10 rounded-md  justify-center border-2  focus:outline-none gap-1 border-solid border-[#EAECF0] hover:bg-[#F2F4F7] flex flex-row items-center">
                                            <Image
                                                src="/icons/plus-dark.svg"
                                                width={16}
                                                height={16}
                                                alt="plus-icon" />
                                            <span className="text-[#1D2939] text-sm font-semibold">Add user</span>
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[304px] p-6 bg-[#FFFFFF] border-solid border-[#EAECF0] rounded-md gap-4">
                                        <div className='flex flex-col gap-2 w-full'>
                                            <span className='font-medium text-[#1D2939] text-sm'>Unique ID</span>
                                            <div className='flex px-2 items-center h-[40px] border  border-gray-300   focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] shadow-sm rounded-md'>
                                                <input
                                                    className="font-normal text-[#667085] w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
                                                    placeholder="Enter Unique ID"
                                                    type="text"
                                                    value={uniqueID}
                                                    onChange={(e) => setUniqueID(e.target.value)}
                                                />
                                            </div>
                                            <span className="text-[#F04438] text-sm font-normal">This is not Premium student ID.</span>
                                        </div>
                                        <div className='w-auto h-auto gap-4 flex flex-row'>
                                            <button className='h-11 w-[120px] border border-solid border-[#EAECF0] rounded-md bg-[#FFFFFF] flex items-center justify-center hover:bg-[#F2F4F7]'
                                                onClick={() => setIsOpen(false)}>
                                                <span className='font-semibold text-[#1D2939] text-sm'>Cancel</span>
                                            </button>
                                            <button
                                                className={`h-11 w-[120px]  rounded-md flex items-center justify-center shadow-inner-button ${uniqueID ? 'bg-[#8501FF] border border-solid border-[#800EE2]' : 'bg-[#CDA0FC] cursor-not-allowed'}`}
                                                disabled={!uniqueID}
                                                onClick={() => setIsOpen(false)}>
                                                <span className='font-semibold text-[#FFFFFF] text-sm'>Add</span>
                                            </button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div className="mb-6 border border-[#EAECF0] rounded-xl overflow-hidden">
                            <div className="max-h-[300px] overflow-y-auto">
                                <table className="w-full">
                                    <thead className="sticky top-0 z-10 bg-white shadow-sm">
                                        <tr className="flex w-full">
                                            <td className="w-1/2 pl-2 py-3">
                                                <p className="text-sm text-[#667085] font-medium leading-6 pl-2">
                                                    Name
                                                </p>
                                            </td>
                                            <td className="w-1/2 py-3">
                                                <p className="text-sm text-[#667085] font-medium leading-6 text-right pr-2">
                                                    Action
                                                </p>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {members.map((member, index) => (
                                            <tr
                                                key={index}
                                                className="flex w-full border-t border-lightGrey"
                                            >
                                                <td className="w-1/2 pl-2 py-3">
                                                    <div className="flex flex-row gap-2 items-center">
                                                        <div className="relative">
                                                            <Image
                                                                src="/images/DP_Lion.svg"
                                                                alt="DP"
                                                                width={40}
                                                                height={40}
                                                            />
                                                            <Image
                                                                className="absolute right-0 bottom-0"
                                                                src="/icons/winnerBatch.svg"
                                                                alt="Batch"
                                                                width={18}
                                                                height={18}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-semibold whitespace-nowrap">
                                                                {member.name}
                                                            </span>
                                                            <span className="text-[13px] text-[#667085]">
                                                                {member.username}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="w-1/2 py-3 pr-2">

                                                    <Popover placement="bottom-end" className="flex justify-end">
                                                        <PopoverTrigger>
                                                            <button className="w-[32px] h-[32px]  outline-none rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                                                <button>
                                                                    <Image
                                                                        src="/icons/three-dots.svg"
                                                                        width={20}
                                                                        height={20}
                                                                        alt="More Actions"
                                                                    />
                                                                </button>
                                                            </button>

                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[167px] px-0 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md shadow-lg">
                                                            <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]">
                                                                <Image src='/icons/green-color-umute.svg' alt="user profile" width={18} height={18} />
                                                                <p className="text-sm text-[#0B9055] font-normal">Umute</p>
                                                            </button>
                                                            <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]">
                                                                <Image src='/icons/delete.svg' alt="user profile" width={18} height={18} />
                                                                <p className="text-sm text-[#DE3024] font-normal">Delete</p>
                                                            </button>
                                                            <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]">
                                                                <Image src='/icons/user-block-red-01.svg' alt="user profile" width={18} height={18} />
                                                                <p className="text-sm text-[#DE3024] font-normal">Mute User</p>
                                                            </button>
                                                            <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]">
                                                                <Image src='/icons/delete.svg' alt="user profile" width={18} height={18} />
                                                                <p className="text-sm text-[#DE3024] font-normal">Remove User</p>
                                                            </button>
                                                        </PopoverContent>
                                                    </Popover>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* <div className="mb-6 border border-[#EAECF0] rounded-xl overflow-hidden">
                            <div className="max-h-[300px] overflow-y-auto">
                                <table className="w-full">
                                    <thead className="sticky top-0 z-10 bg-white shadow-sm">
                                        <tr className="flex w-full">
                                            <td className="w-1/2 pl-2 py-3">
                                                <p className="text-sm text-[#667085] font-medium leading-6">
                                                    Name
                                                </p>
                                            </td>
                                            <td className="w-1/2 py-3">
                                                <p className="text-sm text-[#667085] font-medium leading-6 text-right pr-2">
                                                    Action
                                                </p>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {members.map((member, index) => (
                                            <tr key={index} className="flex w-full border-t border-lightGrey">
                                                <td className="w-1/2 pl-2 py-3">
                                                    <div className="flex flex-row gap-2 items-center">
                                                        <div className="relative">
                                                            <Image
                                                                src="/images/DP_Lion.svg"
                                                                alt="DP"
                                                                width={40}
                                                                height={40}
                                                            />
                                                            <Image
                                                                className="absolute right-0 bottom-0"
                                                                src="/icons/winnerBatch.svg"
                                                                alt="Batch"
                                                                width={18}
                                                                height={18}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-semibold whitespace-nowrap">
                                                                {member.name}
                                                            </span>
                                                            <span className="text-[13px] text-[#667085]">
                                                                {member.username}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="w-1/2 py-3 pr-2">
                                                    <div className="flex justify-end">
                                                        <Popover placement="bottom-end">
                                                            <PopoverTrigger>
                                                                <button className="w-[32px] h-[32px]  outline-none rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                                                    <button>
                                                                        <Image
                                                                            src="/icons/three-dots.svg"
                                                                            width={20}
                                                                            height={20}
                                                                            alt="More Actions"
                                                                        />
                                                                    </button>
                                                                </button>

                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-[167px] px-0 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md shadow-lg">
                                                                <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]">
                                                                    <Image src='/icons/green-color-umute.svg' alt="user profile" width={18} height={18} />
                                                                    <p className="text-sm text-[#0B9055] font-normal">Umute</p>
                                                                </button>
                                                                <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]">
                                                                    <Image src='/icons/delete.svg' alt="user profile" width={18} height={18} />
                                                                    <p className="text-sm text-[#DE3024] font-normal">Delete</p>
                                                                </button>
                                                                <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]">
                                                                    <Image src='/icons/user-block-red-01.svg' alt="user profile" width={18} height={18} />
                                                                    <p className="text-sm text-[#DE3024] font-normal">Mute User</p>
                                                                </button>
                                                                <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]">
                                                                    <Image src='/icons/delete.svg' alt="user profile" width={18} height={18} />
                                                                    <p className="text-sm text-[#DE3024] font-normal">Remove User</p>
                                                                </button>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div> */}
                    </ModalBody>

                </>
            </ModalContent>
        </Modal >
    )
}
export default ChannelInfo;

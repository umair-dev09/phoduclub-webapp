import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
function CourseContent() {
    const [isCreateSection, setIsCreateSection] = useState(false);
    const [hasClickedCreate, setHasClickedCreate] = useState(false);
    const [name, setName] = useState("");

    const openCreateSection = () => {
        setIsCreateSection(true);
    };

    const closeCreateSection = () => {
        setIsCreateSection(false);
        setHasClickedCreate(true);
    };


    return (
        <div className="flex flex-col gap-4 ">
            <div className="flex flex-row justify-between h-16">
                <div className="flex flex-col justify-between">
                    <span className="text-[#1D2939] font-semibold text-lg">Course Content</span>
                    <div className="flex flex-row gap-4">
                        <div className="flex items-center ">
                            <Image src="/icons/read.svg" alt="learn-icon" width={20} height={20} className="mr-2" />
                            <span className="font-normal text-base text-[#1D2939]">3 Lessons</span>
                        </div>
                        <div className="flex items-center ">
                            <Image src="/icons/vedio.svg" alt="video-icon" width={20} height={20} className="mr-2" />
                            <span className="font-normal text-base text-[#1D2939]">4 Videos</span>
                        </div>
                        <div className="flex items-center">
                            <Image src="/icons/test.svg" alt="test-icon" width={20} height={20} className="mr-2" />
                            <span className="font-normal text-base text-[#1D2939]">2 Tests</span>
                        </div>
                    </div>
                </div>
                {/* Add section Button - Only show after clicking Create Section in dialog */}
                {hasClickedCreate && (
                    <button
                        className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF]  bg-[#FFFFFF] h-[44px] w-[162px] justify-center">
                        <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                        <span className="text-[#9012FF] font-semibold text-sm">Add Section</span>
                    </button>
                )}
            </div>
            {/* Creating Section/Content - Only show before clicking Create Section in dialog */}
            {!hasClickedCreate && (
                <div className="bg-[#FFFFFF] h-[184px] p-6 items-center flex flex-col gap-2 rounded-[16px] border border-solid border-[#EAECF0]">
                    <span className="text-[#1D2939] font-semibold text-lg">Create section/questions</span>
                    <span className="font-normal text-xs text-[#667085]">
                        Test Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
                    </span>
                    <div className="flex flex-row gap-4 mt-2">
                        <button onClick={openCreateSection}
                            className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF] h-[44px] w-[162px] justify-center">
                            <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                            <span className="text-[#9012FF] font-semibold text-sm">Add Section</span>
                        </button>
                        <button className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF] h-[44px] w-[162px] justify-center">
                            <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                            <span className="text-[#9012FF] font-semibold text-sm">Add Question</span>
                        </button>
                    </div>
                </div>
            )}
            {/* Course Content - Only show after clicking Create Section in dialog */}
            {hasClickedCreate && (
                <div className="bg-[#FFFFFF] h-auto items-center flex flex-col rounded-[16px] border border-solid border-[#EAECF0]">
                    <div className="flex flex-row justify-between items-center p-4 w-full border-b border-solid border-[#EAECF0]">
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-[16px] text-[#1D2939]">{name || "Name"}</span>
                            <span className="text-[#667085] font-normal text-sm">0 Lessons</span>
                        </div>
                        <Popover
                            placement="bottom-end"
                        >
                            <PopoverTrigger>
                                <button
                                    className="w-10 p-[10px] h-[40px] gap-1 flex-row flex  bg-[#FFFFFF] rounded-md 
                                                                        shadow-none"
                                    style={{ outline: "none" }}
                                >
                                    <Image src="/icons/three-dots.svg" width={18} height={18} alt="three-dots" />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="flex flex-col px-0 text-sm font-normal bg-white border border-lightGrey rounded-md w-[167px] shadow-md"
                            >
                                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full">
                                    <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                                    <span className="text-sm text-[#0C111D] font-normal">Edit Quiz</span>
                                </button>
                                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full">

                                    <Image src="/icons/duplicate.svg" width={18} height={18} alt="Edit-quiz" />
                                    <span className="text-sm text-[#0C111D] font-normal">Duplicate</span>
                                </button>
                                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full">
                                    <Image src="/icons/delete.svg" width={18} height={18} alt="delete-quiz" />
                                    <span className="text-sm text-[#DE3024] font-normal">Delete Quiz</span>
                                </button>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="flex flex-col p-6 items-center gap-2">
                        <span className="text-[#1D2939] font-semibold text-lg">Create section/questions</span>
                        <span className="font-normal text-xs text-[#667085]">
                            Test Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
                        </span>
                        <div className="flex flex-row gap-4 mt-2">
                            <button
                                className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF] h-[44px] w-[162px] justify-center">
                                <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                                <span className="text-[#9012FF] font-semibold text-sm">Add Section</span>
                            </button>
                            <button className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF] h-[44px] w-[162px] justify-center">
                                <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                                <span className="text-[#9012FF] font-semibold text-sm">Add Question</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Dialog open={isCreateSection} onClose={closeCreateSection} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-[559px] h-auto">
                        <div className="flex flex-col relative gap-6">
                            <button onClick={closeCreateSection} className="absolute right-4 top-4">
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                            </button>
                            <h3 className="mx-6 mt-6 text-2xl font-semibold text-[#1D2939]">Create Section</h3>
                            <div className="flex flex-col w-full gap-2 px-6">
                                <p className="text-start text-sm text-[#1D2939] font-medium"></p>
                                <div className="flex flex-row w-full h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">
                                    <input
                                        type="text"
                                        className="w-full px-2 text-sm text-[#182230] font-normal outline-none rounded-md"
                                        placeholder="Enter Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}

                                    />
                                </div>
                            </div>
                            <hr />
                            <div className="flex flex-row justify-end mx-6 my-2 items-center gap-4">
                                <button onClick={closeCreateSection} className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm">Cancel</button>
                                <button
                                    onClick={closeCreateSection}
                                    className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#9012FF] border border-[#8501FF] rounded-md font-semibold text-sm">
                                    Create Section
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}

export default CourseContent;

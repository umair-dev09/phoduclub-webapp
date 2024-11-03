import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
function CourseContent() {
    const [isCreateSection, setIsCreateSection] = useState(false);

    const openCreateSection = () => {
        setIsCreateSection(true);
    };

    const closeCreateSection = () => {
        setIsCreateSection(false);
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
                <button
                    className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF] h-[44px] w-[162px] justify-center">
                    <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                    <span className="text-[#9012FF] font-semibold text-sm">Add Section</span>
                </button>
            </div>
            <div className="bg-[#FFFFFF] h-[184px] p-6 items-center flex flex-col gap-2 rounded-[16px]">
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
                                <p className="text-start text-sm text-[#1D2939] font-medium">Name</p>
                                <div className="flex flex-row w-full h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">
                                    <input
                                        type="text"
                                        className="w-full px-2 text-sm text-[#182230] font-normal outline-none rounded-md"
                                        placeholder="Enter Name"
                                    />
                                </div>
                            </div>
                            <hr />
                            <div className="flex flex-row justify-end p-6 items-center gap-4">

                                <button onClick={closeCreateSection} className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm">Cancel</button>
                                <button
                                    className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#9012FF] border border-[#8501FF] rounded-md font-semibold text-sm">
                                    Create Section
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>

    )
}
export default CourseContent;
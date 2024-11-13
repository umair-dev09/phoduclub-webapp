import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import Image from "next/image";
import Collapsible from 'react-collapsible';
function Community() {
    return (
        <div className="flex flex-col gap-6 p-8">
            <div className="flex flex-row gap-3 border-b border-solid border-[#EAECF0]">
                <div className="relative">
                    <Image src="/images/DP_Lion.svg" alt="DP" width={72} height={72} />
                    <Image
                        className="absolute right-0 bottom-0"
                        src="/icons/winnerBatch.svg"
                        alt="Batch"
                        width={32}
                        height={32}
                    />
                </div>
                <div className="flex items-start flex-col justify-center">
                    <div className="font-semibold text-[#1D2939] text-2xl">Jenny Wilson</div>
                    <div className="flex justify-start items-start text-[16px] font-medium text-[#667085]">jenny#8547</div>
                </div>
            </div>
            <p className="font-semibold text-[#1D2939] text-lg">Community</p>
            {/* <div className="flex flex-row h-full px-8">
                <div className="w-full h-full border-y border-l border-r-[0.5px] border-lightGrey rounded-l-xl">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <td className="py-2 px-6">Groups</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="flex flex-row items-center justify-between w-full py-3 px-6 border-t border-lightGrey transition-all hover:bg-[#F8F0FF]">
                                    <div className="flex flex-row items-center gap-2">
                                        <h2 className="flex items-center justify-center w-10 h-10 text-base text-[#124B68] font-bold bg-[#C0EAFF] rounded-full">
                                            J
                                        </h2>
                                        <div className="flex flex-col">
                                            <p className="text-sm text-[#182230] font-semibold">JEE - 2024</p>
                                            <p className="text-sm text-[#667085] font-normal">5 Channels</p>
                                        </div>
                                    </div>
                                    <Popover placement="bottom-end">
                                        <PopoverTrigger>
                                            <Image src='/icons/more-vertical.svg' alt="more" width={24} height={24} />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[12.375rem] px-0 py-1 rounded-md">
                                            <button className="flex flex-row items-center w-full px-4 py-[0.625rem] gap-2 transition-colors hover:bg-[#F2F4F7]">
                                                <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                <p className="text-sm text-[#DE3024] font-normal">Remove from group</p>
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="w-full h-full border-y border-r border-l-[0.5px] border-lightGrey rounded-r-xl">
                    <table className="w-full h-full">
                        <thead>
                            <tr>
                                <td className="py-2 px-6">Channels</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="flex flex-row items-center justify-between w-full h-full py-5 px-6 border-t border-lightGrey transition-all hover:bg-[#F8F0FF]">
                                    <div className="flex flex-row items-center gap-2">
                                        <div>I</div>
                                        <p className="text-sm text-[#475467] font-normal">Study materials</p>
                                    </div>
                                    <Popover placement="bottom-end">
                                        <PopoverTrigger>
                                            <Image src='/icons/more-vertical.svg' alt="more" width={24} height={24} />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[12.375rem] px-0 py-1 rounded-md">
                                            <button className="flex flex-row items-center w-full px-4 py-[0.625rem] gap-2 transition-colors hover:bg-[#F2F4F7]">
                                                <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                <p className="text-sm text-[#DE3024] font-normal">Remove from group</p>
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </td>
                                <td className="flex flex-row items-center justify-between w-full h-full py-5 px-6 border-t border-lightGrey transition-all hover:bg-[#F8F0FF]">
                                    <div className="flex flex-row items-center gap-2">
                                        <div>I</div>
                                        <p className="text-sm text-[#475467] font-normal">Study materials</p>
                                    </div>
                                    <Popover placement="bottom-end">
                                        <PopoverTrigger>
                                            <Image src='/icons/more-vertical.svg' alt="more" width={24} height={24} />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[12.375rem] px-0 py-1 rounded-md">
                                            <button className="flex flex-row items-center w-full px-4 py-[0.625rem] gap-2 transition-colors hover:bg-[#F2F4F7]">
                                                <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                <p className="text-sm text-[#DE3024] font-normal">Remove from group</p>
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </td>
                                <td className="flex flex-row items-center justify-between w-full h-full py-5 px-6 border-t border-lightGrey transition-all hover:bg-[#F8F0FF]">
                                    <div className="flex flex-row items-center gap-2">
                                        <div>I</div>
                                        <p className="text-sm text-[#475467] font-normal">Study materials</p>
                                    </div>
                                    <Popover placement="bottom-end">
                                        <PopoverTrigger>
                                            <Image src='/icons/more-vertical.svg' alt="more" width={24} height={24} />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[12.375rem] px-0 py-1 rounded-md">
                                            <button className="flex flex-row items-center w-full px-4 py-[0.625rem] gap-2 transition-colors hover:bg-[#F2F4F7]">
                                                <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                <p className="text-sm text-[#DE3024] font-normal">Remove from group</p>
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div> */}
            <div className=" border border-solid border-[#F7F8FB rounded-xl h-auto">
                <div className="h-6 px-6 ">
                    <span className="text-[#667085] font-medium text-sm h-6 ">Groups</span>
                </div>


                < Collapsible
                    trigger={
                        <div className="h-[76px] w-full px-6 flex flex-row justify-between  items-center hover:bg-[#F9FAFB]">
                            <div className="flex flex-row gap-2">
                                <Image
                                    src='/icons/Arrow-down-1.svg'
                                    width={20}
                                    height={20}
                                    alt="Arrow-down" />
                                <Image
                                    src="/icons/elements (3).svg"
                                    width={40}
                                    height={40}
                                    alt="elements" />
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-sm text-[#182230]">JEE - 2024</span>
                                    <span className="font-normal text-sm text-[#667085]">5 Channels</span>
                                </div>
                            </div>
                            <Image src='/icons/more-vertical.svg' alt="more" width={24} height={24} />

                        </div>
                    }>
                    <div className="rounded-lg h-auto border border-solid border-[#EAECF0] mx-6 mb-4">
                        <div className="flex flex-row h-[50px] justify-between items-center p-6">
                            <div className="flex flex-row gap-2">
                                <Image
                                    src='/icons/studymaterial.png'
                                    width={14}
                                    height={20}
                                    alt="studymaterial.png" />
                                <span className="font-normal text-sm text-[#475467]">Study materials</span>
                            </div>
                            <Image src='/icons/more-vertical.svg' alt="more" width={24} height={24} />
                        </div>
                        <div className="flex flex-row h-[50px] justify-between items-center p-6 border-t border-solid border-[#EAECF0]">
                            <div className="flex flex-row gap-2">
                                <Image
                                    src='/icons/QuiqTalk.png'
                                    width={14}
                                    height={20}
                                    alt="Arrow-down" />
                                <span className="font-normal text-sm text-[#475467]">Quiz talk</span>
                            </div>
                            <Image src='/icons/more-vertical.svg' alt="more" width={24} height={24} />
                        </div>
                        <div className="flex flex-row h-[50px] justify-between items-center p-6  border-t border-solid border-[#EAECF0]">
                            <div className="flex flex-row gap-2">
                                <Image
                                    src='/icons/PhyiscsQuicktest.png'
                                    width={14}
                                    height={20}
                                    alt="PhyiscsQuicktest" />
                                <span className="font-normal text-sm text-[#475467]">Physics 101</span>
                            </div>
                            <Image src='/icons/more-vertical.svg' alt="more" width={24} height={24} />
                        </div>
                        <div className="flex flex-row h-[50px] justify-between items-center p-6  border-t border-solid border-[#EAECF0]">
                            <div className="flex flex-row gap-2">
                                <Image
                                    src='/icons/ChemistryQuicktest.png'
                                    width={14}
                                    height={20}
                                    alt="ChemistryQuicktest" />
                                <span className="font-normal text-sm text-[#475467]">Chemistry</span>
                            </div>
                            <Image src='/icons/more-vertical.svg' alt="more" width={24} height={24} />
                        </div>
                        <div className="flex flex-row h-[50px] justify-between items-center p-6  border-t border-solid border-[#EAECF0]">
                            <div className="flex flex-row gap-2">
                                <Image
                                    src='/icons/MathsQuicktest.png'
                                    width={14}
                                    height={20}
                                    alt="Maths-icon" />
                                <span className="font-normal text-sm text-[#475467]">Maths</span>
                            </div>
                            <Image src='/icons/more-vertical.svg' alt="more" width={24} height={24} />
                        </div>
                    </div>
                </Collapsible>
            </div>
        </div>
    )
}
export default Community;
import { useState } from 'react';
import Image from 'next/image';
function Chemisty() {
    const [addchapterdialog, setAddchapterdialog] = useState(false)
    return (
        <div className="flex flex-col w-full gap-4 ">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-lg font-semibold text-[#1D2939]">
                    Chapters
                </h2>
                <div className="flex flex-row gap-3">
                    {/* Search Button */}
                    <button className="h-[44px] w-[250px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center">
                        <div className="flex flex-row items-center gap-2 pl-2">
                            <Image
                                src="/icons/search-button.svg"
                                width={20}
                                height={20}
                                alt="Search Button"
                            />
                            <input
                                className="font-normal text-[#667085] text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
                                placeholder="Search"
                                type="text"

                            />
                        </div>
                    </button>
                    <button className=' w-[168px] h-11 flex items-center justify-center  rounded-md flex-row gap-2 shadow-inner-button bg-[#9012FF] border border-[#800EE2] border-solid'>
                        <Image
                            src="/icons/plus-white-sign.svg"
                            width={18}
                            height={18}
                            alt="plus-icon"
                        />
                        <span className='font-semibold text-[#FFFFFF] text-sm'
                            onClick={() => setAddchapterdialog(true)}>Add Chapter</span>
                    </button>

                </div>
            </div>
        </div>
    )
}
export default Chemisty;
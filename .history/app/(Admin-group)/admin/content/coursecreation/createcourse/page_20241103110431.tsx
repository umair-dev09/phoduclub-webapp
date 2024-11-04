function createcourse() {
    return (
        <div className="m-[20px] w-full">
            {/* Header part*/}
            <div className="flex flex-row justify-between h-[60px] border-b border-solid border-[#D0D5DD]">
                <div className="flex flex-row items-center">
                    <span className="text-[#1D2939] text-lg font-semibold ">Create course</span>
                </div>
                <div className="flex flex-row ">
                    <button className="h-[44px] w-[120px] rounded-md items-center flex border border-solid border-[#EAECF0] bg-[#FFFFFF] justify-center">
                        <span className="text-[#1D2939] font-semibold text-sm">Cancel</span>
                    </button>
                    <button className="h-[44px] w-[120px] ml-4 rounded-md items-center flex border border-solid border-[#800EE2] bg-[#9012FF] justify-center shadow-inner-button">
                        <span className="text-[#FFFFFF] font-semibold text-sm">Create</span>
                    </button>
                </div>
            </div>
            <div className="flex justify-center">
                {/* Name of Courses */}
                <div className="mt-4 h-auto p-6 gap-4  rounded-md bg-[#FFFFFF] border border-solid border-[#EAECF0] w-[684px]">
                    <div className='flex flex-col gap-2'>
                        <span className='text-[#1D2939] text-sm font-semibold'>Name</span>
                        <input
                            className="font-normal pl-3 text-[#1D2939] text-sm placeholder:text-[#A1A1A1] rounded-md placeholder:font-normal
                        focus:outline-none focus:ring-0 
                        border border-solid border-[#D0D5DD] h-[40px] 
                        shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] 
                        transition duration-200 ease-in-out "
                            placeholder="Name"
                            type="text"
                        />
                    </div>
                    {/* Description of Courses */}
                    <div className="flex flex-col gap-2">
                        <span className='text-[#1D2939] text-sm font-semibold pt-1'>Description</span>
                        <div
                            className={`pt-2 bg-[#FFFFFF] border ${isWriting ? 'border-[#D6BBFB]  shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]' : 'border-[#EAECF0]'
                                } rounded-[12px] h-auto`}>
                            <div className="bg-[#FFFFFF] ">
                                <ReactQuill
                                    ref={quillRef}
                                    onBlur={handleBlur}
                                    value={value}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    modules={{ toolbar: false }}
                                    placeholder="Description"
                                    className="text-[#1D2939] focus:outline-none rounded-b-[12px] custom-quill placeholder:not-italic min-h-[10px] max-h-[150px] overflow-y-auto border-none font-normal"
                                />
                            </div>
                            <div className="h-[66px] bg-[#FFFFFF] rounded-bl-[12px] rounded-br-[12px] flex justify-center items-center">
                                <div className="flex flex-row w-full justify-between items-center mx-5">
                                    <div className="h-[24px] w-[288px] gap-[24px] flex flex-row">
                                        <button onClick={() => handleIconClick('bold')}>
                                            <Image src="/icons/Bold.svg" width={24} height={24} alt="bold" />
                                        </button>
                                        <button onClick={() => handleIconClick('italic')}>
                                            <Image src="/icons/italic-icon.svg" width={24} height={24} alt="italic-icon" />
                                        </button>
                                        <button onClick={() => handleIconClick('underline')}>
                                            <Image src="/icons/underline-icon.svg" width={24} height={24} alt="underline-icon" />
                                        </button>
                                        <Popover backdrop="blur" placement="bottom-start" className="flex flex-row justify-end">
                                            <PopoverTrigger className="">
                                                <button className="flex items-center justify-center p-1">
                                                    {alignment === 'center' ? (
                                                        <Image src="/icons/align-middle.svg" width={24} height={26} alt="align-center" />
                                                    ) : alignment === 'right' ? (
                                                        <Image src="/icons/align-right.svg" width={24} height={26} alt="align-right" />
                                                    ) : (
                                                        <Image src="/icons/dropdown-icon-1.svg" width={32} height={32} alt="align-left" />
                                                    )}
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="ml-1 gap-4">
                                                <div className="flex flex-row bg-white rounded-[8px] border-[1px] border-solid border-[#EAECF0] p-2 w-[120px] shadow-[0_2px_4px_#EAECF0] gap-2 ">
                                                    <button onClick={() => handleIconClick("align-left")} className="flex items-center justify-center">
                                                        <Image src="/icons/align-left.svg" width={30} height={30} alt="align-left" />
                                                    </button>
                                                    <button onClick={() => handleIconClick("align-center")} className="flex items-center justify-center">
                                                        <Image src="/icons/align-middle.svg" width={30} height={30} alt="align-center" />
                                                    </button>
                                                    <button onClick={() => handleIconClick("align-right")} className="flex items-center justify-center">
                                                        <Image src="/icons/align-right.svg" width={30} height={30} alt="align-right" />
                                                    </button>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                        <button onClick={() => handleIconClick('ordered')}>
                                            <Image src="/icons/dropdown-icon-2.svg" width={27} height={27} alt="ordered-list" />
                                        </button>
                                        <button onClick={() => handleIconClick('bullet')}>
                                            <Image src="/icons/dropdown-icon-3.svg" width={27} height={27} alt="bullet-list" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default createcourse;
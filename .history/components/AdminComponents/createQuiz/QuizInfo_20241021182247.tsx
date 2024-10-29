import React from 'react';

const Publish = () => {
    return (
        <div className='mt-2 h-auto rounded-md border border-solid border-[#EAECF0] bg-[#FFFFFF]'>
            <div className='p-5 flex flex-col gap-1'>
                <span className='text-[#1D2939] text-sm font-medium'>Quiz Name</span>
                <input
                    className="font-normal pl-3 text-[#667085] text-sm placeholder:text-[#A1A1A1] rounded-md 
                        focus:outline-none focus:ring-0 
                        border border-solid border-[#D0D5DD] h-[40px] 
                        shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] 
                        transition duration-200 ease-in-out 
                        focus:border-[#D6BBFB] 
                        focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]
                        focus:text-[#1D2939]"
                    placeholder="Quiz Name"
                    type="text"
                />
            </div>
        </div>
    );
};

export default Publish;

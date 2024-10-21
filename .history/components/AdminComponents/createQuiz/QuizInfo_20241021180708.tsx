import React from 'react'

const Publish = () => {
    return (
        <div className='mt-2 h-auto rounded-md border border-solid border-[#EAECF0] bg-[#FFFFFF]'>
            <div className='p-5 flex flex-col'>
                <span className='text-[#1D2939] text-sm font-medium'></span>
                <input
                    className="font-normal text-[#667085] text-sm placeholder:text-[#A1A1A1] rounded-md  focus:outline-none focus:ring-0 border-none"
                    placeholder="Quiz Name"
                    type="text"
                />



            </div>


        </div>
    )
}

export default Publish

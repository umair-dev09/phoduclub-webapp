import Image from "next/image";
import Checkbox from '@mui/material/Checkbox';
function Questions() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    return (
        <div className='mt-2 h-auto rounded-md border border-solid border-[#EAECF0] bg-[#FFFFFF] flex flex-col p-5 gap-2'>
            <div className="h-auto  flex flex-row justify-between ">
                <div className="flex gap-2">
                    <span>1</span>
                    <span>Questions</span>

                </div>
                <Image
                    src="/icons/three-dots.svg"
                    width={20}
                    height={20}
                    alt="Three-dots"
                />

            </div>
            <div className="flex flex-col gap-2">
                <span className="font-semibold text-base text-[#1D2939]">Questions</span>
                <input
                    className="font-normal pl-3 text-[#667085] text-sm placeholder:text-[#A1A1A1] rounded-md 
                        focus:outline-none focus:ring-0 
                        border border-solid border-[#D0D5DD] h-[40px] 
                        shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] 
                        transition duration-200 ease-in-out 
                        focus:border-[#D6BBFB] 
                        focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]
                        focus:text-[#1D2939]
                        focus:font-medium"
                    placeholder="Enter questions"
                    type="text"
                />

            </div>
            <div className="flex flex-row gap-2">

                <input
                    type="Checkbox" />





                <span className="font-medium text-sm text-[#344054]">Upload image (optional)</span>

            </div>
            <div className="h-36 rounded-xl bg-[#F9FAFB] border-2 border-dashed border-[#EAECF0]">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center">
                        <div className="h-10 w-10 rounded-md border border-solid border-[#EAECF0]  bg-[#FFFFFF] p-[10px] shadow-[0px_1px_2px_0px_#1018280D]">
                            <Image
                                src="/icons/upload-cloud.svg"
                                width={20}
                                height={20}
                                alt="upload icon" />

                        </div>

                    </div>

                </div>

            </div>


        </div>

    )
}
export default Questions;
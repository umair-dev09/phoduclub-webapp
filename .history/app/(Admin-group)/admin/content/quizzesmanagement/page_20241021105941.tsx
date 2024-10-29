import Image from "next/image";
function Quizz() {
    return (

        <div className="mx-[32px]  h-[44px] mt-5 w-full">
            <div className="flex flex-row justify-between">
                <span className="text-lg font-semibold text-[#1D2939]">Quizzes</span>


                <div>
                    <button className="h-[44px] w-[250px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD]">
                        <div className="flex flex-row justify-start">
                            <Image
                                src="/icons/search-button.svg"
                                width={20}
                                height={20}
                                alt="Search Buttons" />
                            <span className="font-normal text-[#667085] text-sm">Search</span>

                        </div>


                    </button>
                    <button className="h-[44px] w-[143px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] mx-2">
                        select date

                    </button>
                    <button className="h-[44px] w-[122px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] mr-6">
                        by status


                    </button>


                    <button className="w-[135px] bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] h-[44px]">

                        <span className="text-[#FFFFFF] font-semibold text-sm">Create Quiz</span>

                    </button>

                </div>
            </div>




        </div>



    )
}
export default Quizz;
function Quizz() {
    return (

        <div className="mx-[32px]  h-[44px] mt-5 w-full">
            <div className="flex flex-row justify-between">
                <span className="text-lg font-semibold text-[#1D2939]">Quizzes</span>


                <div>
                    <button className="h-[44px] w-[250px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD]">
                        search
                    </button>
                    <button className="h-[44px] w-[143px]">
                        select date

                    </button>
                    <button className="h-[44px] w-[122px]">
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
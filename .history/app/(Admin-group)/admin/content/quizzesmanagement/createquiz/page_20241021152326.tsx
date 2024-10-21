import Quizinfo from "@/components/AdminComponents/createQuiz/QuizInfo";
import Questions from "@/components/AdminComponents/createQuiz/Questions"
import Review from "@/components/AdminComponents/createQuiz/Review";
import Publish from "@/components/AdminComponents/createQuiz/Publish";


function createquiz() {
    return (
        <>
            <div className="ml-[32px] w-[250px]  my-[32px] bg-slate-400 ">
                jabir

            </div>
            <div className="flex flex-col w-full mx-[32px]">
                <div className=" h-[44px]  ml-1 mr-[32px] bg-[#FFFFFF] mt-[32px] w-full">
                    <div className="flex flex-row justify-between">
                        <span className="text-lg font-semibold text-[#1D2939]">Quizzes</span>
                        <button className="h-[44px] w-[135px] bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center"

                        >
                            <span className="text-[#FFFFFF] font-semibold text-sm">Next</span>
                        </button>

                    </div>




                </div>
                <div className=" mx-[10px] bg-red-500 my-[32px] h-full">
                    <Quizinfo />
                    <Questions />
                    <Review />
                    <Publish />



                </div>

            </div>
        </>

    )
}
export default createquiz;
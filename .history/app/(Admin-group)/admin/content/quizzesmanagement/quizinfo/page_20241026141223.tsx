import Image from "next/image";
function Quizinfo() {
    return (
        <div className="flex w-full h-auto overflow-y-auto flex-col">

            <div className="w-full m-8 h-auto">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-3">
                        <span className="text-[#1D2939] text-2xl font-semibold">Maths</span>
                        <Image
                            src="/icons/saved.svg"
                            width={74}
                            height={24}
                            alt="saved "
                        />

                    </div>
                    <div>

                    </div>

                </div>

            </div>

        </div>
    )

}
export default Quizinfo;
import Image from "next/image";
function marketinfo() {
    return (
        <div className="p-8 flex flex-col">
            <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2">
                        <Image
                            src="/icons/idea-01.svg"
                            width={24}
                            height={24}
                            alt="idea-icon" />
                    </div>
                    <div className="flex flex-row gap-2">

                    </div>

                </div>

            </div>

        </div>

    )
}
export default marketinfo();
import Image from "next/image";

export default function Bit2() {
    return (
        <div className="relative flex flex-col flex-1 pb-8">
            <div className="absolute top-0 right-0 w-[363px] h-[581px] bg-[#FFFFFF] border border-b border-r">
                <div className="h-[480px] bg-[#FFFFFF] "
                    style={{ borderRight: '1px solid #EAECF0' }}>
                    <div className="w-[331px] h-[64px] p-2.5 gap-4 rounded-tl-lg">
                        <button className="w-full h-full bg-red-500 text-[#1D2939] rounded-lg">
                            Button Text
                        </button>
                    </div>


                </div>
            </div>
        </div>
    );
}

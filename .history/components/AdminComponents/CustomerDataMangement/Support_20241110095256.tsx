import Image from "next/image";
import { useState } from "react";
function Support() {
    const [activeTab, setActiveTab] = useState('Messenger');

    const handleTabClick = (tabName: React.SetStateAction<string>) => {
        setActiveTab(tabName);
    };
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-3 border-b border-solid border-[#EAECF0] p-8">
                <div className="relative">
                    <Image src="/images/DP_Lion.svg" alt="DP" width={72} height={72} />
                    <Image
                        className="absolute right-0 bottom-0"
                        src="/icons/winnerBatch.svg"
                        alt="Batch"
                        width={32}
                        height={32}
                    />
                </div>
                <div className="flex items-start flex-col justify-center">
                    <div className="font-semibold text-[#1D2939] text-2xl">Jenny Wilson</div>
                    <div className="flex justify-start items-start text-[16px] font-medium text-[#667085]">jenny#8547</div>
                </div>
            </div>
            <p className="font-semibold text-[#1D2939] text-lg px-8">Support</p>
            <div className="flex flex-col px-8">
                <div className="relative flex">
                    <div className="">
                        <button
                            onClick={() => handleTabClick('Messenger')}
                            className={`relative py-2 pr-4 text-base transition duration-200 ${activeTab === 'Messenger' ? 'text-[#7400E0]' : 'text-[#667085] hover:text-[#7400E0]'} focus:outline-none`}
                            style={{ fontSize: '16px', fontWeight: '500' }}
                        >
                            Messenger
                        </button>
                    </div>
                    <div className="pt-[10px]">
                        <button
                            onClick={() => handleTabClick('Coupons')}
                            className={`relative py-2 px-4 text-base transition duration-200 ${activeTab === 'Coupons' ? 'text-[#7400E0]' : 'text-[#667085] hover:text-[#7400E0]'} focus:outline-none`}
                            style={{ fontSize: '16px', fontWeight: '500' }}
                        >
                            Coupons
                            <span
                                className="ml-2 px-2 py-[0px] text-[#9012FF] bg-[#EDE4FF] rounded-full relative"
                                style={{ fontSize: '14px', fontWeight: '500', minWidth: '24px', textAlign: 'center', top: '-1px' }}
                            >
                                10
                            </span>
                        </button>
                    </div>
                    <div
                        className="absolute bg-[#7400E0] transition-all duration-300"
                        style={{
                            height: '1.8px',
                            width: activeTab === 'Messenger' ? '80px' : '100px', // Adjusted width to match text
                            left: activeTab === 'Messenger' ? '0px' : '113px', // Adjust left position for each tab
                            bottom: '-8px',
                        }}
                    />
                </div>
                <hr className="h-px bg-[#EAECF0] mt-2" />
            </div>
            {activeTab === 'Messenger' && (
                <div>
                    ali
                </div>
            )}
            {activeTab === 'Coupons' && (
                <div>
                    jabir
                </div>
            )}
        </div>

    )
}
export default Support;
import Image from "next/image";
import { useState } from "react";
function Support() {
    const [activeTab, setActiveTab] = useState('Queries');

    const handleTabClick = (tabName: React.SetStateAction<string>) => {
        setActiveTab(tabName);
    };
    return (
        <div className="flex flex-col">
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
            </div>
            <div className="flex flex-col px-8">
                <div className="relative flex">
                    <div className="pt-1">
                        <button
                            onClick={() => handleTabClick('Queries')}
                            className={`relative py-1 pr-4 text-base transition duration-200 ${activeTab === 'Queries' ? 'text-[#7400E0]' : 'text-[#667085] hover:text-[#7400E0]'} focus:outline-none`}
                            style={{ fontSize: '16px', fontWeight: '500' }}
                        >
                            Queries
                        </button>
                    </div>
                    <div className="pt-1">
                        <button
                            onClick={() => handleTabClick('Reporting')}
                            className={`relative py-1 px-4 text-base transition duration-200 ${activeTab === 'Reporting' ? 'text-[#7400E0]' : 'text-[#667085] hover:text-[#7400E0]'} focus:outline-none`}
                            style={{ fontSize: '16px', fontWeight: '500' }}
                        >
                            Reporting

                        </button>
                    </div>
                    <div
                        className="absolute bg-[#7400E0] transition-all duration-300"
                        style={{
                            height: '1.8px',
                            width: activeTab === 'Queries' ? '60px' : '122px', // Adjusted width to match text
                            left: activeTab === 'Queries' ? '0px' : '90px', // Adjust left position for each tab
                            bottom: '-8px',
                        }}
                    />
                </div>
                <hr className="h-px bg-[#EAECF0] mt-2" />
            </div>
            {activeTab === 'Queries' && (
                <div>
                    ali
                </div>
            )}
            {activeTab === 'Reporting' && (
                <div>
                    jabir
                </div>
            )}
        </div>

    )
}
export default Support;
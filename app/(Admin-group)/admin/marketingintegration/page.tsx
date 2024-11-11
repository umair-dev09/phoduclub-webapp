"use client";
import { useState } from "react";
import Coupons from "@/components/AdminComponents/MarketIntegration/Coupons";
import Messenger from "@/components/AdminComponents/MarketIntegration/Messenger";

function MarketIntegration() {
    const [activeTab, setActiveTab] = useState('Messenger');

    const handleTabClick = (tabName: React.SetStateAction<string>) => {
        setActiveTab(tabName);
    };

    return (
        <div className="p-8 flex flex-col overflow-y-auto w-full h-full">
            <div className="flex flex-col">
                <div className="relative flex">
                    <div className="pt-[10px]">
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
                <Messenger />
            )}
            {activeTab === 'Coupons' && (
                <Coupons />
            )}
        </div>
    );
}

export default MarketIntegration;

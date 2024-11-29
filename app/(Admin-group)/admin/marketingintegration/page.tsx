"use client";
import { Tabs, Tab } from "@nextui-org/react";
import Coupons from "@/components/AdminComponents/MarketIntegration/Coupons";
import Messenger from "@/components/AdminComponents/MarketIntegration/Messenger";

function MarketIntegration() {
    // Example counts for messenger and coupons
    const messengerCount = 0; // Replace with dynamic value if necessary
    const couponCount = 0; // Replace with dynamic value if necessary

    return (
        <div className="p-8 flex flex-col overflow-y-auto w-full h-full">
            <Tabs
                aria-label="Market Integration Tabs"
                color="primary"
                variant="underlined"
                classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-solid border-[#EAECF0]",
                    cursor: "w-full bg-[#7400E0]",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-[#7400E0]",
                }}
            >
                {/* Messenger Tab */}
                <Tab
                    key="Messenger"
                    title={
                        <div className="flex items-center space-x-2 hover:text-[#7400E0]">
                            <span className="font-medium text-base text-[#7400E0]">Messenger</span>
                            {messengerCount > 0 && (
                                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#EDE4FF] border border-[#EDE4FF] font-medium text-[#7400E0]">
                                    {messengerCount}
                                </div>
                            )}
                        </div>
                    }
                >
                    <Messenger />
                </Tab>

                {/* Coupons Tab */}
                <Tab
                    key="Coupons"
                    title={
                        <div className="flex items-center space-x-2 hover:text-[#7400E0]">
                            <span className="font-medium text-base text-[#7400E0]">Coupons</span>
                            {couponCount > 0 && (
                                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#EDE4FF] border border-[#EDE4FF] font-medium text-[#7400E0]">
                                    {couponCount}
                                </div>
                            )}
                        </div>
                    }
                >
                    <Coupons />
                </Tab>
            </Tabs>
        </div>
    );
}

export default MarketIntegration;

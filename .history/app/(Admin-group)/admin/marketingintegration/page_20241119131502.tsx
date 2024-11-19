"use client";

import { Tabs, Tab } from "@nextui-org/react";
import Coupons from "@/components/AdminComponents/MarketIntegration/Coupons";
import Messenger from "@/components/AdminComponents/MarketIntegration/Messenger";

function MarketIntegration() {
    return (
        <div className="p-8 flex flex-col overflow-y-auto w-full h-full">
            <Tabs
                aria-label="Market Integration Tabs"
                color="primary"
                variant="underlined"
                classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full bg-[#22d3ee]",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-[#9012FF]",
                }}

            >
                <Tab
                    key="Messenger"
                    title={
                        <div className="flex items-center space-x-2">
                            <span className="font-medium text-base hover:text-[#9012FF]">Messenger</span>
                            <div
                                className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-bold"
                                style={{
                                    backgroundColor: "#EDE4FF",
                                    color: "#9012FF",
                                    borderColor: "#EDE4FF",
                                    fontWeight: 500  // Using a valid font-weight value
                                }}
                            >
                                690000
                            </div>
                        </div>

                    }
                >
                    <Messenger />
                </Tab>
                <Tab
                    key="Coupons"
                    title={
                        <div className="flex items-center space-x-2">
                            <span className="font-medium text-base hover:text-[#9012FF]">Coupons</span>
                            <div
                                className="inline-flex items-center justify-center px-2 py-1 rounded-full text-sm  bg-[#EDE4FF] border border-[#EDE4FF] font-medium  text-[#9012FF]"

                            >
                                10
                            </div>
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

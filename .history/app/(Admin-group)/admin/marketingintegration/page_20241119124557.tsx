"use client";

import { Tabs, Tab, Chip } from "@nextui-org/react";
import Coupons from "@/components/AdminComponents/MarketIntegration/Coupons";
import Messenger from "@/components/AdminComponents/MarketIntegration/Messenger";

function MarketIntegration() {
    return (
        <div className="p-8 flex flex-col overflow-y-auto w-full h-full">
            <Tabs
                aria-label="Market Integration Tabs"
                color="primary"
                variant="underlined"
                // classNames={{
                //     tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                //     cursor: "w-full bg-[#22d3ee]",
                //     tab: "max-w-fit px-0 h-12",
                //     tabContent: "group-data-[selected=true]:text-[#9012FF]",
                // }}
                classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                    tab: "max-w-fit px-0 h-12 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:scale-x-0 after:bg-[#9012FF] group-data-[hover=true]:after:scale-x-100 after:transition-transform",
                    tabContent:
                        "group-data-[selected=true]:text-[#9012FF] group-data-[hover=true]:text-[#9012FF]",
                }}
            >
                <Tab
                    key="Messenger"
                    title={
                        <div className="flex items-center space-x-2">
                            <span>Messenger</span>
                            <Chip
                                size="sm"
                                variant="faded"
                                style={{
                                    backgroundColor: "#9012FF",
                                    color: "#fff",
                                    fontWeight: "500",
                                }}
                            >
                                1000
                            </Chip>
                        </div>

                    }
                >
                    <Messenger />
                </Tab>
                <Tab
                    key="Coupons"
                    title={
                        <div className="flex items-center space-x-2">
                            <span>Coupons</span>
                            <Chip
                                size="sm"
                                variant="faded"
                                style={{
                                    backgroundColor: "#9012FF",
                                    color: "#fff",
                                    fontWeight: "500",
                                }}
                            >
                                1000
                            </Chip>
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

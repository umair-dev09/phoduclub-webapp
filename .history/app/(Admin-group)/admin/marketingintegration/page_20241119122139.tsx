"use client";
import { useState } from "react";
import Coupons from "@/components/AdminComponents/MarketIntegration/Coupons";
import Messenger from "@/components/AdminComponents/MarketIntegration/Messenger";
import { Tabs } from 'antd';

function MarketIntegration() {
    return (
        <div className="p-8">
            <Tabs defaultActiveKey="Messenger">
                <Tabs.TabPane tab="Messenger" key="Messenger">
                    <Messenger />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Coupons" key="Coupons">
                    <Coupons />
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
}

export default MarketIntegration;
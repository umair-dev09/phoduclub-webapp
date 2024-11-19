"use client";
import { useState } from "react";
import Coupons from "@/components/AdminComponents/MarketIntegration/Coupons";
import Messenger from "@/components/AdminComponents/MarketIntegration/Messenger";

import { Tab, Tabs, Box } from '@mui/material';

function MarketIntegration() {
    const [activeTab, setActiveTab] = useState('Messenger');

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
    };

    return (
        <Box>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab label="Messenger" value="Messenger" />
                <Tab label="Coupons" value="Coupons" />
            </Tabs>
            {activeTab === 'Messenger' && <Messenger />}
            {activeTab === 'Coupons' && <Coupons />}
        </Box>
    );
}
export default MarketIntegration;
import React from 'react';

interface StatusProps {
    status: string;
}

function StatusDisplay({status}:StatusProps) {
    const renderStatus = () => {
        switch (status) {
            case 'finished': 
                return (
                    <div className="bg-[#D3F8E0] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#0A5B39] rounded-full "></span>
                        <span className="font-medium text-[#0A5B39] text-xs">Finished</span>
                    </div>
                );
            case 'saved':
                return (
                    <div className="bg-[#f0f0f0] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#182230] rounded-full "></span>
                        <span className="font-medium text-[#182230] text-xs">Saved</span>
                    </div>
                );
            case 'live':
                return (
                    <div className="bg-[#EDE4FF] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#7400E0] rounded-full "></span>
                        <span className="font-medium text-[#7400E0] text-xs">Live</span>
                    </div>
                );
            case 'scheduled':
                return (
                    <div className="bg-[#E5F4FF] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#175CD3] rounded-full "></span>
                        <span className="font-medium text-[#175CD3] text-xs">Scheduled</span>
                    </div>
                );
            case 'paused':
                return (
                    <div className="bg-[#FFEFC6] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#93360D] rounded-full "></span>
                        <span className="font-medium text-[#93360D] text-xs">Pause</span>
                    </div>
                );
            case 'ended':
                return (
                    <div className="bg-[#FEE4E2] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#9A221A] rounded-full "></span>
                        <span className="font-medium text-[#9A221A] text-xs">Ended</span>
                    </div>
                );
            default:
                return (
                    <div className="bg-[#f0f0f0] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                    <span className="w-[6px] h-[6px] bg-[#182230] rounded-full "></span>
                    <span className="font-medium text-[#182230] text-xs">Undefined</span>
                </div>
                );
        }
    };

    return <div>{renderStatus()}</div>;
};

export default StatusDisplay;
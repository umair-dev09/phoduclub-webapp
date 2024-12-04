import React from 'react';

interface CustomerCareStatusProps {
    status: string;
}

const CustomerCareStatus: React.FC<CustomerCareStatusProps> = ({ status }) => {
    const CustomerCareStatus = () => {
        switch (status) {
            case 'Resolved':
                return (
                    <div className="bg-[#D3F8E0] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#0A5B39] rounded-full "></span>
                        <span className="font-medium text-[#0A5B39] text-xs">Resolved</span>
                    </div>
                );
            case 'Latest':
                return (
                    <div className="bg-[#EDE4FF] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#7400E0] rounded-full "></span>
                        <span className="font-medium text-[#7400E0] text-xs">Latest</span>
                    </div>
                );
            case 'Replied':
                return (
                    <div className="bg-[#FFEFC6] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#93360D] rounded-full "></span>
                        <span className="font-medium text-[#93360D] text-xs">Replied</span>
                    </div>
                );
            case 'Reopened':
                return (
                    <div className="bg-[#F8D3F7] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#570A5B] rounded-full "></span>
                        <span className="font-medium text-[#570A5B] text-xs">Re-opened</span>
                    </div>
                );
            case 'Opened':
                return (
                    <div className="bg-[#C6F5FF] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#0D7A93] rounded-full "></span>
                        <span className="font-medium text-[#0D7A93] text-xs">Opened</span>
                    </div>
                );
            case 'Blocker':
                return (
                    <div className="bg-[#FEE4E2] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#9A221A] rounded-full "></span>
                        <span className="font-medium text-[#9A221A] text-xs">Blocker</span>
                    </div>
                );
            default:
                return null;
        }
    };

    return <div>{CustomerCareStatus()}</div>;
};

export default CustomerCareStatus;
import React from 'react';

interface CustomerCareImportanceProps {
    Priority: string;
}

const CustomerCareStatus: React.FC<CustomerCareImportanceProps> = ({ Priority }) => {
    const CustomerCareImportance = () => {
        switch (Priority) {
            case 'Medium':
                return (
                    <div className="bg-[#FFEFC6] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#93360D] rounded-full "></span>
                        <span className="font-medium text-[#93360D] text-xs">Medium</span>
                    </div>
                );
            case 'Hard':
                return (
                    <div className="bg-[#FEE4E2] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#9A221A] rounded-full "></span>
                        <span className="font-medium text-[#9A221A] text-xs">Hard</span>
                    </div>
                );
            case 'Low':
                return (
                    <div className="bg-[#F2F4F7] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#182230] rounded-full "></span>
                        <span className="font-medium text-[#182230] text-xs">Low</span>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='h-full'>
            {CustomerCareImportance()}
        </div>
    );
};

export default CustomerCareStatus;
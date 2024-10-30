import React from 'react';

interface QuizStatusProps {
    status: string;
}

const QuizStatus: React.FC<QuizStatusProps> = ({ status }) => {
    const renderStatus = () => {
        switch (status) {
            case 'Finished':
                return (
                    <div className="bg-[#D3F8E0] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#0A5B39] rounded-full "></span>
                        <span className="font-medium text-[#0A5B39] text-xs">Finished</span>
                    </div>
                );
            case 'Saved':
                return (
                    <div className="bg-[#F2F4F7] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#182230] rounded-full "></span>
                        <span className="font-medium text-[#182230] text-xs">Saved</span>
                    </div>
                );
            case 'Live':
                return (
                    <div className="bg-[#EDE4FF] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#7400E0] rounded-full "></span>
                        <span className="font-medium text-[#7400E0] text-xs">Live</span>
                    </div>
                );
            case 'Scheduled':
                return (
                    <div className="bg-[#E5F4FF] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#175CD3] rounded-full "></span>
                        <span className="font-medium text-[#175CD3] text-xs">Scheduled</span>
                    </div>
                );
            case 'Paused':
                return (
                    <div className="bg-[#FFEFC6] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#93360D] rounded-full "></span>
                        <span className="font-medium text-[#93360D] text-xs">Pause</span>
                    </div>
                );
            case 'Ended':
                return (
                    <div className="bg-[#FEE4E2] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#9A221A] rounded-full "></span>
                        <span className="font-medium text-[#9A221A] text-xs">Ended</span>
                    </div>
                );
            default:
                return null;
        }
    };

    return <div>{renderStatus()}</div>;
};

export default QuizStatus;
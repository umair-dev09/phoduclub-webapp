import React from 'react';

interface QueriesStatusProps {
    queriesstatus: string;
}

const QueriesStatus: React.FC<QueriesStatusProps> = ({ queriesstatus }) => {
    const renderQueriesStatus = () => {
        switch (queriesstatus) {
            case 'Resolved':
                return (
                    <div className="bg-[#D3F8E0] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#0A5B39] rounded-full "></span>
                        <span className="font-medium text-[#0A5B39] text-xs">Resolved</span>
                    </div>
                );
            case 'Open':
                return (
                    <div className="bg-[#EDE4FF] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#7400E0] rounded-full "></span>
                        <span className="font-medium text-[#7400E0] text-xs">Open</span>
                    </div>
                );
            default:
                return null;
        }
    };

    return <div>{renderQueriesStatus()}</div>;
};

export default QueriesStatus;
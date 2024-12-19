import React from 'react';

interface SubjectPriorityProps {
    Priority: string;
}

const SubjectPriority: React.FC<SubjectPriorityProps> = ({ Priority }) => {
    const SubjectPriority = () => {
        switch (Priority) {
            case 'Medium':
                return (
                    <div className="py-1 px-[10px] gap-1 flex flex-row rounded-full items-center border border-[#D0D5DD]">
                        <span className="w-2 h-2 bg-[#DB6704] rounded-full "></span>
                        <span className="font-medium text-[#344054] text-xs">Medium</span>
                    </div>
                );
            case 'High':
                return (
                    <div className="py-1 px-[10px] gap-1 flex flex-row rounded-full items-center border border-[#D0D5DD]">
                        <span className="w-2 h-2 bg-[#DE3024] rounded-full "></span>
                        <span className="font-medium text-[#344054] text-xs">High</span>
                    </div>
                );
            case 'Low':
                return (
                    <div className="py-1 px-[10px] gap-1 flex flex-row rounded-full items-center border border-[#D0D5DD]">
                        <span className="w-2 h-2 bg-[#0B9055] rounded-full "></span>
                        <span className="font-medium text-[#344054] text-xs">Low</span>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='h-full'>
            {SubjectPriority()}
        </div>
    );
};

export default SubjectPriority;
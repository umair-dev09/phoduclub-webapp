import React from 'react';

interface QuizStatusProps {
    role: string;
}

const UserRolesView: React.FC<QuizStatusProps> = ({ role }) => {
    const renderStatus = () => {
        switch (role) {
            case 'Admin': 
                return (
                    <div className="bg-[#EDE4FF] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-fit ">
                        <span className="w-[6px] h-[6px] bg-[#7400E0] rounded-full "></span>
                        <span className="font-medium text-[#7400E0] text-xs">Admin</span>
                    </div>
                );
            case 'Customer Care':
                return (
                    <div className="bg-[#FFEFC6] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-fit">
                        <span className="w-[6px] h-[6px] bg-[#93360D] rounded-full "></span>
                        <span className="font-medium text-[#93360D] text-xs">Customer Care</span>
                    </div>
                );
            case 'Teacher':
                return (
                    <div className="bg-[#E5F4FF] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-fit">
                        <span className="w-[6px] h-[6px] bg-[#175CD3] rounded-full "></span>
                        <span className="font-medium text-[#175CD3] text-xs">Teacher</span>
                    </div>
                );
            case 'Chief Moderator':
                return (
                    <div className="bg-[#F8E9FE] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-fit">
                        <span className="w-[6px] h-[6px] bg-[#791F89] rounded-full "></span>
                        <span className="font-medium text-[#791F89] text-xs">Chief Moderator</span>
                    </div>
                );
            case 'Guide':
                return (
                    <div className="bg-[#F2F4F7] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-fit">
                        <span className="w-[6px] h-[6px] bg-[#182230] rounded-full "></span>
                        <span className="font-medium text-[#182230] text-xs">Guide</span>
                    </div>
                );
            case 'Editor':
                return (
                    <div className="bg-[#D3F8E0] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-fit">
                        <span className="w-[6px] h-[6px] bg-[#0A5B39] rounded-full "></span>
                        <span className="font-medium text-[#0A5B39] text-xs">Editor</span>
                    </div>
                );
            default:
                return null;
        }
    };

    return <div>{renderStatus()}</div>;
};

export default UserRolesView;
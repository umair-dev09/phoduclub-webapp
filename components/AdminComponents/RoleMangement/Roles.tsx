import React from 'react';

interface RolesProps {
    roles: string;
}

const Roles: React.FC<RolesProps> = ({ roles }) => {
    const renderRoles = () => {
        switch (roles) {
            case 'Editor':
                return (
                    <div className="bg-[#D3F8E0] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#0A5B39] rounded-full "></span>
                        <span className="font-medium text-[#0A5B39] text-xs">Editor</span>
                    </div>
                );
            case 'Guide':
                return (
                    <div className="bg-[#f0f0f0] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#182230] rounded-full "></span>
                        <span className="font-medium text-[#182230] text-xs">Guide</span>
                    </div>
                );
            case 'Admin':
                return (
                    <div className="bg-[#EDE4FF] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#7400E0] rounded-full "></span>
                        <span className="font-medium text-[#7400E0] text-xs">Admin</span>
                    </div>
                );
            case 'Teacher':
                return (
                    <div className="bg-[#E5F4FF] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#175CD3] rounded-full "></span>
                        <span className="font-medium text-[#175CD3] text-xs">Teacher</span>
                    </div>
                );
            case 'Customer Care':
                return (
                    <div className="bg-[#FFEFC6] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#93360D] rounded-full "></span>
                        <span className="font-medium text-[#93360D] text-xs">Customer Care</span>
                    </div>
                );
            case 'Chief Moderator':
                return (
                    <div className="bg-[#F8E9FE] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                        <span className="w-[6px] h-[6px] bg-[#791F89] rounded-full "></span>
                        <span className="font-medium text-[#791F89] text-xs">Chief Moderator</span>
                    </div>
                );
            default:
                return null;
        }
    };

    return <div>{renderRoles()}</div>;
};

export default Roles;
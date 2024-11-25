import React from 'react';
import Image from 'next/image';
function rolemanagementguide() {
    const currentItems = [
        {
            adminId: 1,
            name: 'John Doe',
            userId: 'johndoe123',
            phone: '123-456-7890',
            role: 'Admin',
            profilePic: '/defaultAdminDP.jpg',
        },
        {
            adminId: 2,
            name: 'Jane Smith',
            userId: 'janesmith456',
            phone: '987-654-3210',
            role: 'User',
            profilePic: '/defaultAdminDP.jpg',
        },
        // Add more user objects here
    ];
    return (
        <div className="border border-[#EAECF0] rounded-xl ">
            <table className="w-full bg-white rounded-xl ">
                <thead>
                    <tr className="gap-[200px]">
                        <th className="w-[25%] text-left px-8 py-4 pl-8 rounded-tl-xl flex flex-row ">
                            <span className="text-[#667085] font-medium text-sm">Name</span>
                        </th>
                        <th className="w-[22%] text-start px-8 py-4 text-[#667085] font-medium text-sm">
                            <div className="flex flex-row justify-start gap-1">
                                <p>User Id</p>
                            </div>
                        </th>
                        <th className="w-[22%] text-strart px-8 py-4 text-[#667085] font-medium text-sm">
                            <div className="flex flex-row justify-start gap-1">
                                <p>Mobile No.</p>
                            </div>
                        </th>
                        <th className="w-[22%] px-8 py-4 text-[#667085] font-medium text-sm">
                            <div className="flex flex-row justify-start gap-1">
                                <p>Role</p>
                            </div>
                        </th>
                        <th className="w-[9%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((users, index) => (
                        <tr key={index} className="border-t border-solid border-[#EAECF0]">
                            <td className="py-[12px]">
                                <div className="flex flex-row ml-8 gap-[10px] min-w-[260px]">
                                    <Image className="rounded-full object-cover" src={users.profilePic || '/defaultAdminDP.jpg'} alt="DP" width={38} height={38} />
                                    <div className="flex items-start justify-center flex-col mb-[2px]">
                                        <span className="font-semibold text-sm text-[#9012FF]">{users.name}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-8 py-4 text-start text-[#101828] text-sm ">
                                <span className="flex min-w-fit">{users.userId}</span>
                            </td>
                            <td className="px-8 py-4 text-start text-[#101828] text-sm ">
                                <span className="flex min-w-fit">{users.phone}</span>
                            </td>
                            <td className="px-8 py-4 text-start text-[#101828] text-sm">
                                <span className="flex min-w-[200px]">
                                    {users.role}
                                </span>
                            </td>
                            <td className="flex items-center justify-center px-8 py-4 text-[#DE3024] font-normal text-sm">
                                Remove
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default rolemanagementguide;
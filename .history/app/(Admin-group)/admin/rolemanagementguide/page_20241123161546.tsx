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
            role: 'Admin',
            profilePic: '/defaultAdminDP.jpg',
        },
        // Add more user objects here
    ];
    return (
        <div className="flex flex-col w-full  gap-4 p-8">
            <div className="flex flex-row justify-between items-center">
                <span className="text-lg font-semibold text-[#1D2939]">Users</span>
                <div className="flex flex-row gap-3">
                    {/* Search Button */}
                    <button className="h-[44px] w-[250px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center">
                        <div className="flex flex-row items-center gap-2 pl-2">
                            <Image
                                src="/icons/search-button.svg"
                                width={20}
                                height={20}
                                alt="Search Button"
                            />
                            <input
                                className="font-normal text-[#667085] text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
                                placeholder="Search"
                                type="text"
                            />
                        </div>
                    </button>
                    <button
                        className="h-[44px] w-auto px-6 py-2 bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center">
                        <span className="text-[#FFFFFF] font-semibold text-sm">Add New User</span>
                    </button>
                </div>
            </div>
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
                                            <span className="font-semibold text-sm text-[#182230]">{users.name}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-4 text-start text-[#101828] text-sm ">
                                    <span className="flex min-w-fit">{users.userId}</span>
                                </td>
                                <td className="px-8 py-4 text-start text-[#101828] text-sm ">
                                    <span className="flex min-w-fit">{users.phone}</span>
                                </td>
                                <td className="px-8 py-4 ">

                                    <div className="bg-[#F2F4F7] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-[72px]">
                                        <span className="w-[10px] h-[6px] bg-[#182230] rounded-full"></span>
                                        <span className="font-medium text-[#182230] text-xs">{users.role}</span>
                                    </div>


                                </td>
                                <td className="flex items-center justify-center px-8 ">
                                    <span className="text-[#DE3024] font-normal text-sm">Remove</span>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default rolemanagementguide;
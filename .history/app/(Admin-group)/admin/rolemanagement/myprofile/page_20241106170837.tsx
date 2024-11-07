"use client";
import Image from "next/image";
import EditProfile from "@/components/AdminComponents/RoleMangement/EditProfile";
import Logout from "@/components/AdminComponents/RoleMangement/Logout";
import { useState } from "react";

function MyProfile() {
    const [isEdit, setIsEdit] = useState(false);
    const openEdit = () => setIsEdit(true);
    const closeEdit = () => setIsEdit(false);
    const [islogout, setIslogout] = useState(false);
    const openlogout = () => setIslogout(true);
    const closelogout = () => setIslogout(false);

    return (
        <div className="flex justify-center w-full h-full">
            <div className="mt-8 flex h-[298px] w-[588px] bg-[#FFFFFF] gap-6 flex-col border border-solid border-[#EAECF0] rounded-md p-6">
                <div className="flex flex-row justify-between h-[72px] w-auto items-center">
                    <div className="flex flex-row gap-2 h-10 items-center">
                        <Image src='/icons/Profile-pic.png' alt="DP" width={72} height={72} />
                        <div className="flex flex-col gap-1">
                            <span className="text-[#1D2939] font-semibold text-2xl">Jenny Wilson</span>
                            <span className="font-normal text-[#667085] text-base">Admin</span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3">
                        <button className="py-2 px-4 bg-[#FFFFFF] gap-2 h-[40px] w-auto items-center border border-solid border-[#EAECF0] rounded-[8px] flex flex-row justify-between"
                            onClick={openEdit} >
                            <Image src="/icons/edit-02.svg" width={18} height={18} alt="edit" />
                            <span className="text-sm text-[#0C111D] font-normal">Edit</span>
                        </button>
                        <button className="py-2 px-4 bg-[#FFFFFF] gap-2 h-[40px] w-auto items-center border border-solid border-[#EAECF0] rounded-[8px] flex flex-row justify-between"
                            onClick={openlogout}>
                            <Image src="/icons/logout-03.svg" width={18} height={18} alt="logout" />
                            <span className="text-sm text-[#DE3024] font-normal">Log out</span>
                        </button>
                    </div>
                </div>
                <hr />
                <div className="flex flex-row w-full">
                    <div className="flex flex-col w-1/2">
                        <span className="font-normal text-[#667085] text-[16px]">First Name</span>
                        <span className="font-semibold text-[#1D2939] text-[16px]">Jenny</span>
                    </div>
                    <div className="flex flex-col w-1/2">
                        <span className="font-normal text-[#667085] text-[16px]">Last Name</span>
                        <span className="font-semibold text-[#1D2939] text-[16px]">Wilson</span>
                    </div>
                </div>
                <div className="flex flex-row w-full">
                    <div className="flex flex-col w-1/2">
                        <span className="font-normal text-[#667085] text-[16px]">User ID</span>
                        <span className="font-semibold text-[#1D2939] text-[16px]">jenny#8745</span>
                    </div>
                    <div className="flex flex-col w-1/2">
                        <span className="font-normal text-[#667085] text-[16px]">Mobile No.</span>
                        <span className="font-semibold text-[#1D2939] text-[16px]">+918431823329</span>
                    </div>
                </div>
            </div>

            {/* Dialog Component  for Edit*/}

            {islogout && <Logout onclose={closelogout} open={true} />}
            {/* Dailog for Log out */}

            {isEdit && <EditProfile close={closeEdit} open={true} />}
        </div>
    );
}

export default MyProfile;

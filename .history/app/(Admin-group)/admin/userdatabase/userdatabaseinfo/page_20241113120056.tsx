"use client";
import { useState } from "react";
import PersonalDetails from "@/components/AdminComponents/UserDatabaseMangement/PersonalDetails";
import Products from "@/components/AdminComponents/UserDatabaseMangement/Products";
import Community from "@/components/AdminComponents/UserDatabaseMangement/Community";
import Support from "@/components/AdminComponents/UserDatabaseMangement/Support";

function UserInfo() {
    const [activeComponent, setActiveComponent] = useState("PersonalDetails");

    // Function to render the selected component
    const renderComponent = () => {
        switch (activeComponent) {
            case "PersonalDetails":
                return <PersonalDetails />;
            case "Products":
                return <Products />;
            case "Community":
                return <Community />;
            case "Support":
                return <Support />;
            default:
                return <PersonalDetails />;
        }
    };

    return (
        <div className="h-auto w-full overflow-y-auto p-8">
            <div className=" bg-[#FFFFFF] border border-solid border-[#E5E7EB] h-auto w-full rounded-[12px] flex flex-row ">
                <div className="w-[273px] border-r border-solid border-[#E5E7EB] px-8 pt-8 gap-2 flex flex-col">
                    <button
                        className={`h-12 hover:bg-[#F5F0FF] text-left ${activeComponent === "PersonalDetails" ? "bg-[#F5F0FF] border border-solid border-[#DDCDFF]" : ""
                            } rounded-md px-4 py-2`}
                        onClick={() => setActiveComponent("PersonalDetails")}
                    >
                        <span className={`font-medium ${activeComponent === "PersonalDetails" ? "text-[#7400E0]" : "text-[#1D2939]"
                            } text-base`}>Personal Details</span>
                    </button>
                    <button
                        className={`h-12 hover:bg-[#F5F0FF] text-left ${activeComponent === "Products" ? "bg-[#F5F0FF] border border-solid border-[#DDCDFF]" : ""
                            } rounded-md px-4 py-2`}
                        onClick={() => setActiveComponent("Products")}
                    >
                        <span className={`font-medium ${activeComponent === "Products" ? "text-[#7400E0]" : "text-[#1D2939]"
                            } text-base`}>Products</span>
                    </button>
                    <button
                        className={`h-12 hover:bg-[#F5F0FF] text-left ${activeComponent === "Community" ? "bg-[#F5F0FF] border border-solid border-[#DDCDFF]" : ""
                            } rounded-md px-4 py-2`}
                        onClick={() => setActiveComponent("Community")}
                    >
                        <span className={`font-medium ${activeComponent === "Community" ? "text-[#7400E0]" : "text-[#1D2939]"
                            } text-base`}>Community</span>
                    </button>
                    <button
                        className={`h-12 hover:bg-[#F5F0FF] text-left ${activeComponent === "Support" ? "bg-[#F5F0FF] border border-solid border-[#DDCDFF]" : ""
                            } rounded-md px-4 py-2`}
                        onClick={() => setActiveComponent("Support")}
                    >
                        <span className={`font-medium ${activeComponent === "Support" ? "text-[#7400E0]" : "text-[#1D2939]"
                            } text-base`}>Support & FeedBack</span>
                    </button>
                </div>
                <div className=" flex-grow ">
                    {renderComponent()}
                </div>
            </div>
        </div>

    );
}

export default UserInfo;

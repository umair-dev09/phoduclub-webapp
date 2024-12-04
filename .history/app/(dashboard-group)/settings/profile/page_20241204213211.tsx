import Image from "next/image";
import Profile from '@/components/DashboardComponents/SettingComponents/ProfileComponents/Profile';


export default function MyProfile() {

  return (
    <div className="container h-screen flex flex-col">
      {/* Header Section */}
      <div className="flex items-center w-full h-[60px] font-semibold mt-[15px] mb-[3px]">
        <div className="m-[30px] flex items-center">
          <Image
            className="mr-[15px]"
            src="/icons/profile-voilet.svg"
            width={32}
            height={32}
            alt="profile-icon"
          />
          <h3 className="text-[#1D2939] font-semibold"><span id="">My Profile</span></h3>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-[25px] mb-[8px]">
        <hr className="border-[1px] border-solid border-[#EAECF0]" />
      </div>

      {/* Profile Component */}
      <Profile />
    </div>



  );
}

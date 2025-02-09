import Image from "next/image";
import Purchase from '@/components/DashboardComponents/SettingComponents/PurchaseComponents/Purchase';

export default function MyPurchase() {
    return (
        <div className="flex flex-col flex-1">
            <div className="flex items-center w-full h-[60px] font-semibold mt-[15px] mb-[3px]">
                <div className="m-[30px] flex items-center">
                    <Image
                        className="mr-[15px]"
                        src="/icons/purchase-voilet.svg"
                        width={25}
                        height={25}
                        alt="profile-icon"
                    />
                    <span className="text-gray-900">My Purchase</span>
                </div>
            </div>
            {/* Divider */}
            <hr className="border-[1px] mx-[25px] border-solid border-[#EAECF0]" />
            <div className="w-full h-full py-8 overflow-x-auto overflow-y-auto">
                <Purchase />
            </div>
        </div>
    );
}

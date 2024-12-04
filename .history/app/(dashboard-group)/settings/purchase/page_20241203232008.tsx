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
            <div className="mx-[25px] mb-[8px]">
                <hr className="border-[1px] border-solid border-[#EAECF0]" />
            </div>
            <div className="mx-6 overflow-x-auto">
                <table className="w-full border-collapse border-spacing-0 rounded-t-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr className="text-gray-600">
                            <th className="text-left py-4 px-6 font-medium w-[30%]">ITEMS</th>
                            <th className="text-left py-4 px-6 font-medium w-[15%]">DATE</th>
                            <th className="text-left py-4 px-6 font-medium w-[15%]">PRICE</th>
                            <th className="text-left py-4 px-6 font-medium w-[20%]">PAYMENT TYPE</th>
                            <th className="text-left py-4 px-6 font-medium w-[20%]">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Purchase />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

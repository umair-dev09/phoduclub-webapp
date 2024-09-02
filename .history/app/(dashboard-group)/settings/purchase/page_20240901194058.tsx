import "./purchase.css";
import Image from "next/image";
import Purchase from '@/components/DashboardComponents/SettingComponents/PurchaseComponents/Purchase';

export default function MyPurchase() {
    return (
        <div className="container">
            <div className="heading">
                <div className="icon-text">
                    <Image
                        className="profile-icon"
                        src="/icons/purchase-icon.png"
                        width={25}
                        height={25}
                        alt="profile-icon"
                    />
                    <span id="profile">My Purchase</span>
                </div>
            </div>
            <div className="divider"><hr className="dividerLine" /></div>
            <div className="head-table">
                <thead>
                    <tr>
                        <th>items</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Payment Type</th>
                        <th>Actions</th>


                    </tr>
                </thead>

            </div>
            <div className="content">
                <Purchase />
            </div>
        </div>
    );
}


import "./setting.css";
import { ReactNode } from "react";
import ContentBox1 from '@/components/DashboardComponents/SettingComponents/ContentBox1';



interface SettingsLayoutProps {
    children: ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {

    return (
        <div className="content">
            <div className="content1-box">
                <ContentBox1 />
                {/* <Link href="/settings/profile">
                    <div className={`my-profile  ${pathname === '/settings/profile' ? 'active' : ''}`}>
                        <Image
                            className="profile-icon"
                            src="/icons/profile-icon.png"
                            alt="Profile Icon"
                            width={24}
                            height={24}
                        />
                        <p className="text">My Profile</p>
                    </div>
                </Link>
                <Link href="/settings/purchase">
                    <div className={`purchase-history  ${pathname === '/settings/purchase' ? 'active' : ''}`}>
                        <Image
                            className="purchase-icon"
                            src="/icons/purchase-icon.png"
                            alt="Purchase Icon"
                            width={24}
                            height={24}
                        />
                        <p className="text">Purchase History</p>
                    </div>
                </Link> */}
            </div>
            <div className="content2-box">
                {children}
            </div>


        </div>
    );
}

import "./profile.css";
import Image from "next/image";
import Profile from '@/components/DashboardComponents/SettingComponents/ProfileComponents/Profile';

export default function MyProfile() {
    return (
        <div className="container">
            <div className="heading">
                <div className="icon-text">
                    <Image
                        className="profile-icon"
                        src="/icons/profile-voilet.svg"
                        width={32}
                        height={32}
                        alt="profile-icon"
                    />
                    <h3><span id="profile">My Profile</span></h3>
                </div>
            </div>
            <div className="divider"><hr className="dividerLine" /></div>
            <div className="content">
                <Profile />
            </div>
        </div>
    );
}

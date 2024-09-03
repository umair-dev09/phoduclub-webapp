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
                        src="/icons/my-profile-voilet.svg"
                        width={25}
                        height={25}
                        alt="profile-icon"
                    />
                    <span id="profile">My Profile</span>
                </div>
            </div>
            <div className="divider"><hr className="dividerLine" /></div>
            <div className="content">
                <Profile />
            </div>
        </div>
    );
}

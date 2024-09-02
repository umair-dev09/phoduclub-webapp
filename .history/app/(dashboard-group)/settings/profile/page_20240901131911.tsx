import "./profile.css";
import Image from "next/image";

export default function MyProfile() {
    return (
        <div className="container">
            <div className="heading">
                <div className="icon-text">
                    <Image
                        className="profile-icon"
                        src="/icons/my-profile-icon.png"
                        width={24}
                        height={24}
                        alt="profile-icon"
                    />
                    <span id="profile">My Profile</span>
                </div>
            </div>
            <div className="divider"><hr className="dividerLine" /></div>
            <div className="content">this is profile page</div>
        </div>
    );
}

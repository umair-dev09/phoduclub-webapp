import "./setting.css";
import Image from "next/image";

export default function () {
    return (
        <div className="content">
            <div className="content1-box">
                <div className="my-profile">
                    <Image
                        className="profile-icon"
                        src="/icons/profile-icon.png"
                        alt="MY Profile Icon"
                        width={24}
                        height={24}
                    />


                </div>

                <div className="purchase-history">

                </div>




            </div>




        </div>



    )
}
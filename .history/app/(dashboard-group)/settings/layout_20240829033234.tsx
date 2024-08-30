import "./setting.css";
import Image from "next/image";
import Link from "next/link";

export default function () {
    return (
        <div className="content">
            <div className="content1-box">
                <Link href="">
                    <div className="my-profile">
                        <Image
                            className="profile-icon"
                            src="/icons/profile-icon.png"
                            alt="MY Profile Icon"
                            width={24}
                            height={24}
                        />
                        <span>My Profile</span>


                    </div>
                </Link>
                <Link href={""}>

                    <div className="purchase-history">
                        <Image
                            className="purchase-icon"
                            src="/icons/purchase-icon.png"
                            alt="purchase-icon"
                            width={22}
                            height={22}

                        />
                        <span>Purchase History</span>
                        {/* </Link */}



                    </div>
                </Link>




            </div>




        </div>



    )
}
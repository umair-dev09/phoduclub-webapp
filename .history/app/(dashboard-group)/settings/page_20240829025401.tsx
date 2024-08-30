import "./setting.css";
'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import React from "react";
import { usePathname } from "next/navigation";
interface settings {
    children: ReactNode;
}

export default function settings({ children }: settings) {
    const pathname = usePathname();
    return (
        <div className="content">
            <div className="content1-box">
                <Link href="profile">
                    <div className={`profile ${pathname === '/profile' ? 'active' : ''}`}>
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
                <Link href={"/purchase"}>

                    <div className={`purchase ${pathname === '/purchase' ? 'active' : ''}`}>
                        <Image
                            className="purchase-icon"
                            src="/icons/purchase-icon.png"
                            alt="purchase-icon"
                            width={22}
                            height={22}

                        />
                        <span>Purchase History</span>




                    </div>
                </Link>
                <div>
                    {children}
                </div>




            </div>




        </div>



    )
}
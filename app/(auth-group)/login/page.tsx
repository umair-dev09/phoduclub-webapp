"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Image from 'next/image';

export default function Login_Page() {
    const [phone, setPhone] = useState('');
    const router = useRouter(); // Initialize useRouter

    const handleSendVerificationCode = () => {
        // Assuming you want to pass the phone number to the verification page
        router.push(`/signup/verifyotp?phone=${encodeURIComponent(phone)}`);
    };

    return (
        <div className="mainpage">
            <div className="login">
                <div className="phodu_logo">
                    <Image
                        src="/images/phoduclublogo.png" // Path to your image file
                        alt="Description of image"
                        width={150} // Desired width
                        height={25} // Desired height
                    />
                </div>
                <div className="heading">
                    <p className="head">Welcome Back!</p>
                </div>
                <div className="tagLine">
                    <p>Make yourself prepared, before time ✌</p>
                </div>
                <div>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="inputdiv">
                            <label htmlFor="Number">Phone Number</label>
                            <div className="inputflex">
                                <PhoneInput
                                    country={'in'} // Set the default country here
                                    value={phone}
                                    onChange={(phone: any) => setPhone(phone)}
                                    inputProps={{
                                        name: 'phone',
                                        required: true,
                                        autoFocus: true,
                                        placeholder: "+91 00000-00000" // Set placeholder here
                                    }}
                                    containerClass="phone-input-container"
                                    inputClass="form-input"
                                />
                            </div>
                        </div>
                        <div className="buttons">
                            <button
                                type="button"
                                className="button"
                                onClick={handleSendVerificationCode}
                            >
                                Send Verification Code
                            </button>
                        </div>
                        {/* <span className="page_to_sign"><p>Don't have an account?<a href="#">Sign Up</a></p></span> */}
                    </form>
                </div>
                <span className="page_to_login">
                    <p>Don't have an account? <a href="./signup">Sign Up</a></p>
                </span>
            </div>
            <div className="motivation">
                <Image
                    src="/images/test1.png" // Path to your image file
                    alt="Description of image"
                    width={10000} // Desired width
                    height={10000} // Desired height
                />
            </div>
        </div>
    );
}

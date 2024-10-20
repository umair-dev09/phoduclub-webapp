"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Image from 'next/image';

function login() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [phone, setPhone] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [buttonColor, setButtonColor] = useState('#E39FF6'); // Default color
    const [firstName, setFirstName] = useState(''); // First name state

    useEffect(() => {
        if (phone.length >= 10) {
            setIsPhoneValid(true);
            setErrorMessage('');
            setButtonColor('purple');
        } else {
            setIsPhoneValid(false);
            setButtonColor('#E39FF6');
        }
    }, [phone]);

    return (
        <div className="bg-[#f7f8fb] h-screen w-screen flex justify-center items-center">
            <div className="flex justify-center items-center flex-col">
                <div>
                    <Image
                        src="/images/phoduclublogo.png"
                        alt="Description of image"
                        width={104}
                        height={20}
                    />
                </div>
                <div>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className='text-[14px] text-[#080808] font-medium'>Name</label>
                            <div className='flex flex-row w-[375px] justify-between'>
                                <div className='flex flex-col'>
                                    <input
                                        type="text"
                                        id='firstName'
                                        placeholder='First Name'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className='p-[7px] text-base rounded-[5px] border border-gray-300 text-gray-900 w-44 h-10 box-border mr-2 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB]'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="inputdiv">
                            <label htmlFor="Number">Phone Number</label>
                            <div className="inputflex">
                                <PhoneInput
                                    country={'in'}
                                    value={phone}
                                    onChange={(phone: any) => setPhone(phone)}
                                    inputProps={{
                                        name: 'phone',
                                        required: true,
                                        autoFocus: true,
                                        placeholder: "+91 00000-00000"
                                    }}
                                    containerClass="phone-input-container"
                                    inputClass="form-input"
                                />
                            </div>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </div>
                        <div id="recaptcha-container"></div> {/* Recaptcha container */}
                        <div className="buttons">
                            <button
                                type="button"
                                className="button"
                                style={{ backgroundColor: buttonColor }}
                                disabled={!isPhoneValid}
                            >
                                Send Verification Code
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default login;

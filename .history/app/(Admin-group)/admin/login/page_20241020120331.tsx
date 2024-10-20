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
            <div className=" flex-col w-[395px] h-[284px]">
                <div className="mb-10 flex justify-center items-center">
                    <Image
                        src="/images/phoduclublogo.png"
                        alt="Description of image"
                        width={104}
                        height={20}
                    />
                </div>
                <div>
                    <form >
                        <div>
                            <label className='text-[14px] text-[#344054] font-medium'>Username</label>

                            <div className='flex flex-col mt-1'>
                                <input
                                    type="text"
                                    id='firstName'
                                    placeholder='Jabir Ali '
                                    value={firstName}
                                    className=" w-full h-[40px] rounded-md pl-2 text-[#667085] font-normal text-sm"


                                />
                            </div>

                        </div>
                        {/* <div className="inputdiv">
                            <label htmlFor="Number">Phone Number</label>
                            <div className="inputflex ">
                                <PhoneInput
                                    country={'in'}
                                    value={phone}

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

                        </div> */}


                    </form>
                </div>
            </div>
        </div>
    );
}

export default login;

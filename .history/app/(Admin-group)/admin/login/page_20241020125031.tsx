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
                        <div className="mb-4">
                            <label className='text-[14px] text-[#344054] font-medium'>Username</label>

                            <div className='flex flex-col mt-1 border border-solid border-[#D0D5DD] rounded-md shadow-sm
                                 hover:border-[#D6BBFB] hover:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.12)]
                                  focus-within:border-[#D6BBFB] focus-within:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.12)]'>
                                <input
                                    type="text"
                                    id='firstName'
                                    placeholder='Jabir Ali'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full rounded-md h-[40px] pl-2 text-[#344054] font-normal text-sm
                                      border-none focus:ring-0 focus:border-black focus:outline-none 
                                     shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                                />
                            </div>



                        </div>

                        <div className="mb-4">
                            <label className='text-[14px] text-[#344054] font-medium'>Phone Number</label>

                            <PhoneInput
                                country={'in'}
                                value={phone}
                                onChange={(phone) => setPhone(phone)} // Ensure the onChange is handled
                                inputProps={{
                                    name: 'phone',
                                    required: true,
                                    autoFocus: true,
                                    placeholder: "+91 00000-00000"
                                }}
                                containerClass="phoneinputcontainer"
                                inputClass="forminput"
                                inputStyle={{
                                    width: '395px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    outline: 'none',
                                    padding: '8px', // Optional padding for better UX
                                    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)', // Default shadow
                                    transition: 'border-color 0.2s, box-shadow 0.2s', // Smooth transition
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#D6BBFB';
                                    e.target.style.boxShadow = '0px 0px 0px 4px rgba(158, 119, 237, 0.12)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'transparent'; // Resetting border on blur
                                    e.target.style.boxShadow = 'none'; // Resetting shadow on blur
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.borderColor = '#D6BBFB';
                                    e.target.style.boxShadow = '0px 0px 0px 4px rgba(158, 119, 237, 0.12)';
                                }}
                                onMouseLeave={(e) => {
                                    if (!e.target === document.activeElement) { // Check if the input is not focused
                                        e.target.style.borderColor = 'transparent'; // Resetting border
                                        e.target.style.boxShadow = 'none'; // Resetting shadow
                                    }
                                }}
                            />
                        </div>



                    </form>
                </div>
            </div>
        </div>
    );
}

export default login;

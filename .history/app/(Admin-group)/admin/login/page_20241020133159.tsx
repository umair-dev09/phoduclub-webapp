"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Image from 'next/image';

function Login() {
    const router = useRouter();

    const [phone, setPhone] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(false);

    const [Name, setName] = useState(''); // First name state
    const [buttonDisabled, setButtonDisabled] = useState(true); // Default to true

    useEffect(() => {
        // Enable button only if both fields are filled
        if (Name.trim() !== '' && phone.trim() !== '') {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [Name, phone]);

    return (
        <div className="bg-[#f7f8fb] h-screen w-screen flex justify-center items-center">
            <div className="flex-col w-[395px] h-[284px]">
                <div className="mb-10 flex justify-center items-center">
                    <Image
                        src="/images/phoduclublogo.png"
                        alt="Description of image"
                        width={104}
                        height={20}
                    />
                </div>
                <div>
                    <form>
                        <div className="mb-4">
                            <label className='text-[14px] text-[#344054] font-medium'>Username</label>
                            <div className='flex flex-col mt-1 border border-solid border-[#D0D5DD] rounded-md shadow-sm
                                hover:border-[#D6BBFB] hover:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.12)]
                                focus-within:border-[#D6BBFB] focus-within:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.12)]'>
                                <input
                                    type="text"
                                    id='firstName'
                                    placeholder='Jabir Ali'
                                    value={Name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-md h-[40px] pl-2 text-[#344054] font-normal text-sm
                                    border-none focus:ring-0 focus:border-black focus:outline-none 
                                    shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className='text-[14px] text-[#344054] font-medium '>Phone Number</label>
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
                                containerClass="phone-input-container"
                                inputClass="forminput"
                                inputStyle={{
                                    width: '395px', height: '40px', borderRadius: "8px", border: "1px solid #D0D5DD", boxShadow: "0px 1px 2px 0px #1018280D", marginTop: "4px"
                                }}
                            />
                        </div>

                        <button
                            className={`mt-3 h-[48px] w-full rounded-md shadow-inner-button 
                                ${buttonDisabled ? 'bg-[#d8acff]' : 'bg-[#8501FF]'} 
                               `}
                            disabled={buttonDisabled} // Disable button if needed
                        >
                            <span className="font-semibold text-sm text-[#FFFFFF]">Send Verification Code</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;

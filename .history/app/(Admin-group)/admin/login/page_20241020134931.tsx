"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Image from 'next/image';

function Login() {
    const router = useRouter();

    const [phone, setPhone] = useState('');
    const [Name, setName] = useState(''); // First name state
    const [buttonDisabled, setButtonDisabled] = useState(true); // Default to true
    const [usernameError, setUsernameError] = useState(''); // State for username error message
    const [phoneError, setPhoneError] = useState(''); // State for phone number error message

    useEffect(() => {
        // Enable button only if both fields are filled
        if (Name.trim() !== '' && phone.trim() !== '') {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [Name, phone]);

    // logic for  incorrect phone and name
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // Reset error messages
        setUsernameError('jabir');
        setPhoneError('8431823329');

        // Simple validation logic
        if (Name.trim() === '') {
            setUsernameError('Incorrect username');
        }

        if (phone.trim() === '') {
            setPhoneError('Please enter a correct mobile number');
        }

        // If both fields are valid, proceed with the form submission
        if (Name.trim() !== '' && phone.trim() !== '') {
            // Handle successful submission (e.g., routing)
            console.log('Form submitted with:', { Name, phone });
            // Optionally navigate to another page
            // router.push('/next-page');
        }
    };

    return (
        <div className="bg-[#f7f8fb] h-screen w-screen flex justify-center items-center">
            <div className="flex-col w-[395px] h-[auto]">
                <div className="mb-10 flex justify-center items-center">
                    <Image
                        src="/images/phoduclublogo.png"
                        alt="Description of image"
                        width={104}
                        height={20}
                    />
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className='text-[14px] text-[#344054] font-medium'>Username</label>
                            <div className={`flex flex-col mt-1 border border-solid ${usernameError ? 'border-red-500' : 'border-[#D0D5DD]'} rounded-md shadow-sm`}>
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
                            {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
                        </div>

                        <div className="mb-4">
                            <label className='text-[14px] text-[#344054] font-medium'>Phone Number</label>
                            <div className="mt-1">
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
                                        width: '395px',
                                        height: '42px',
                                        borderRadius: "8px",
                                        border: phoneError ? "1px solid red" : "1px solid #D0D5DD",
                                        boxShadow: "0px 1px 2px 0px #1018280D",
                                    }}
                                />
                            </div>
                            {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
                        </div>

                        <button
                            className={`mt-3 h-[48px] w-full rounded-md shadow-inner-button 
                                ${buttonDisabled ? 'bg-[#d8acff]' : 'bg-[#8501FF]'}`}
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

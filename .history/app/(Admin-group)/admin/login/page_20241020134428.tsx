"use client";
import { useState, useEffect } from 'react';

const Login = () => {
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);

    // Add error states
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    // Validation function for name
    const validateName = (value: string) => {
        if (!value.trim()) {
            setNameError('Incorrect username');
            return false;
        }
        setNameError('');
        return true;
    };

    // Validation function for phone
    const validatePhone = (value: string) => {
        const phoneRegex = /^\d{10}$/;  // Basic regex for 10 digit phone number
        if (!value || !phoneRegex.test(value.replace(/\D/g, ''))) {
            setPhoneError('Please enter correct mobile number');
            return false;
        }
        setPhoneError('');
        return true;
    };

    const handleNameChange = (e: { target: { value: any; }; }) => {
        const value = e.target.value;
        setName(value);
        validateName(value);
    };

    const handlePhoneChange = (e: { target: { value: any; }; }) => {
        const value = e.target.value;
        // Only allow numbers and basic formatting characters
        const formattedValue = value.replace(/[^\d-+() ]/g, '');
        setPhone(formattedValue);
        validatePhone(formattedValue);
    };

    useEffect(() => {
        if (name.trim() !== '' && phone.trim() !== '' && !nameError && !phoneError) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [name, phone, nameError, phoneError]);

    return (
        <div className="bg-[#f7f8fb] min-h-screen w-full flex justify-center items-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <div className="mb-8 flex justify-center items-center">
                    <div className="text-2xl font-bold text-gray-800">Login</div>
                </div>
                <div>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Username
                            </label>
                            <div
                                className={`relative rounded-md shadow-sm ${nameError ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            >
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={handleNameChange}
                                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none
                    ${nameError
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'
                                        }`}
                                />
                            </div>
                            {nameError && (
                                <p className="mt-1 text-sm text-red-500">{nameError}</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <input
                                    type="tel"
                                    placeholder="+91 00000-00000"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none
                    ${phoneError
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'
                                        }`}
                                />
                            </div>
                            {phoneError && (
                                <p className="mt-1 text-sm text-red-500">{phoneError}</p>
                            )}
                        </div>

                        <button
                            className={`w-full py-2 px-4 rounded-md text-white font-semibold
                ${buttonDisabled
                                    ? 'bg-purple-300 cursor-not-allowed'
                                    : 'bg-purple-600 hover:bg-purple-700'
                                }`}
                            disabled={buttonDisabled}
                        >
                            Send Verification Code
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
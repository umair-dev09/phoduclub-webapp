"use client";
import 'react-phone-input-2/lib/style.css';
import './signup.css';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import LoadingData from '@/components/Loading';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Checkbox } from "@nextui-org/react";

export default function Sign() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [phone, setPhone] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '', phone: '', terms: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             // If no user is logged in, redirect to the login page
    //             setTimeout(() => {
    //                 router.push("/dashboard");
    //             }, 0);
    //                   } else {
    //             // User is logged in, stop loading
    //             setLoading(false);
    //         }
    //     });

    //     return () => unsubscribe();
    // }, [router]);
    // if (loading) {
    //     return (
    //         <LoadingData/>
    //     );
    // }  
    onAuthStateChanged(auth, (user) => {
        if (user) {
            router.push("/dashboard");
        }
        else {
            setLoading(false);
        }
    });

    if (loading) {
        return (
            <LoadingData />
        );
    }


    const navigateLogin = () => {
        router.push('/login');
    }


    const validateForm = () => {
        let formIsValid = true;
        let newErrors = { firstName: '', lastName: '', email: '', phone: '', terms: '' };

        if (firstName.trim() === '') {
            formIsValid = false;
            newErrors.firstName = 'Please enter your First Name';
        }
        if (lastName.trim() === '') {
            formIsValid = false;
            newErrors.lastName = 'Please enter your Last Name';
        }
        if (email.trim() === '') {
            formIsValid = false;
            newErrors.email = 'Please enter your email';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formIsValid = false;
            newErrors.email = 'Please enter a valid email';
        }
        if (phone.trim() === '' || phone.length < 10) {
            formIsValid = false;
            newErrors.phone = 'Please enter a valid phone number';
        }
        if (!termsAccepted) {
            formIsValid = false;
            newErrors.terms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleInputChange = (field: string, value: string) => {
        let newErrors = { ...errors };
        switch (field) {
            case 'firstName':
                setFirstname(value);
                if (value.trim() === '') {
                    newErrors.firstName = 'Please enter your First Name';
                } else {
                    newErrors.firstName = '';
                }
                break;
            case 'lastName':
                setLastname(value);
                if (value.trim() === '') {
                    newErrors.lastName = 'Please enter your Last Name';
                } else {
                    newErrors.lastName = '';
                }
                break;
            case 'email':
                setEmail(value);
                if (value.trim() === '') {
                    newErrors.email = 'Please enter your email';
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    newErrors.email = 'Please enter a valid email';
                } else {
                    newErrors.email = '';
                }
                break;
            case 'phone':
                setPhone(value);
                if (value.trim() === '' || value.length < 10) {
                    newErrors.phone = 'Please enter a valid phone number';
                } else {
                    newErrors.phone = '';
                }
                break;
            case 'terms':
                const isChecked = !termsAccepted;
                setTermsAccepted(isChecked);
                if (!isChecked) {
                    newErrors.terms = 'You must agree to the terms and conditions';
                } else {
                    newErrors.terms = '';
                }
                break;
        }
        setErrors(newErrors);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitted(true);

        if (validateForm()) {
            setIsLoading(true); // Enable loading indicator
            const formattedPhone = `+${phone.replace(/\D/g, '')}`;
            setUpRecaptcha();

            try {
                const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
                window.confirmationResult = confirmationResult;
                window.localStorage.setItem('verificationId', confirmationResult.verificationId);

                // toast.success("OTP sent successfully!");
                setIsLoading(false); // Disable loading indicator
                // Navigate to verify OTP page with phone number as query parameter
                router.push(`/verifyotp?phone=${formattedPhone}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&email=${encodeURIComponent(email)}`);

            } catch (error: any) {
                console.error("Error sending OTP: ", error);
                // toast.error("Error sending OTP. Please try again.");
                setIsLoading(false); // Disable loading indicator
            }
        }
    };

    const setUpRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response: any) => {
                console.log("Recaptcha verified", response);
            }
        });
    };

    const isFormValid = () => {
        return firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== '' && /\S+@\S+\.\S+/.test(email) && phone.trim() !== '' && phone.length >= 10 && termsAccepted;
    };

    return (
        <div className='flex flex-row  w-full h-screen bg-[#f7f8fb]'>
            <div className='Left Area w-1/2 flex flex-col pt-6 pl-6'>
                <Image src="/images/phoduclublogo.png" width={140} height={10} quality={100} alt="Phodu Club Logo" />
                <div className='Signup Main Div flex flex-col self-center mt-20 items-center'>
                    <h3 className='font-bold text-[24px]'>Get Started</h3>
                    <p className='mt-2'>Make yourself prepared, before time ✌️</p>
                    <form className='flex flex-col items-center justify-center gap-4 pt-[40px]' onSubmit={handleSubmit}>
                        <div>
                            <label className='text-[14px] text-[#080808] font-medium'>Name</label>
                            <div className='flex flex-row w-[375px] justify-between'>
                                <div className='flex flex-col'>
                                    <input
                                        type="text"
                                        id='firstName'
                                        placeholder='First Name'
                                        value={firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        className='p-[7px] text-base rounded-[5px] border border-gray-300 text-gray-900 w-44 h-10 box-border mr-2  focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB]'
                                    />
                                    {isSubmitted && errors.firstName && <div id="firstName_error" className='text-red-500 text-[12px] mt-[2px]'>{errors.firstName}</div>}
                                </div>

                                <div className='flex flex-col'>
                                    <input
                                        type="text"
                                        id='lastName'
                                        placeholder='Last Name'
                                        value={lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        className='p-[7px] text-base rounded-[5px] border border-gray-300 text-gray-900 w-44 h-10 box-border focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB]'
                                    />
                                    {isSubmitted && errors.lastName && <div id="username_error" className='text-red-500 text-[12px] mt-[2px]'>{errors.lastName}</div>}
                                </div>

                            </div>
                        </div>
                        <div >
                            <label className='text-[14px] text-[#080808] font-medium' htmlFor="Email">Email</label>
                            <div >
                                <input
                                    type="email"
                                    id='Email'
                                    placeholder='Enter email'
                                    value={email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className='p-[7px] text-base rounded-[5px] border border-gray-300 w-[375px] h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB]'
                                />
                                {isSubmitted && errors.email && <div id="email_error" className='text-red-500 text-[12px] mt-[2px]'>{errors.email}</div>}
                            </div>
                        </div>
                        <div >
                            <label className='text-[14px] text-[#080808] font-medium' htmlFor="Number">Phone Number</label>
                            <div className='w-[375px] '>
                                <PhoneInput
                                    country={'in'}
                                    value={phone}
                                    onChange={(value: any) => handleInputChange('phone', value)}
                                    placeholder="+91 000000000"
                                    inputProps={{
                                        name: 'phone',
                                        required: true,
                                        autoFocus: true
                                    }}
                                    containerClass="phoneinputcontainer"
                                    inputClass="forminput"
                                    inputStyle={{ width: '375px' }} // Set specific width
                                />
                                {isSubmitted && errors.phone && <div id="phone_error" className='text-red-500 text-[12px] mt-[2px]'>{errors.phone}</div>}
                            </div>
                        </div>
                        <div id="recaptcha-container"></div> {/* Recaptcha container */}
                        <div className='w-[375px] ml-[10px]'>
                            <Checkbox
                                size="sm"
                                color="primary"
                                id="terms"
                                checked={termsAccepted}
                                onChange={() => handleInputChange('terms', '')}
                            />
                            <label className='text-sm text-gray-900 mb-1.5' htmlFor="terms">
                                I agree to the Phodu.club <a href="#" className="text-[#6646A2] underline">privacy policy</a> and <a href="#" className="text-[#6646A2] underline">terms of use</a>.
                            </label>
                            {isSubmitted && errors.terms && (
                                <div id="terms_error" className="text-red-500 text-[12px] mt-[2px]">
                                    {errors.terms}
                                </div>
                            )}
                        </div>
                        <div className='flex items-center justify-center mt-[12px]'>
                            <button
                                className='font-medium w-[375px] h-10 border-none bg-[#e39ff6] rounded-[7px] text-sm text-white cursor-pointer flex items-center justify-center hover:bg-[#7400e0] active:bg-[#7400e0] active:opacity-70 transition-colors duration-150'
                                type="submit"
                                style={{
                                    backgroundColor: isFormValid() ? '#7400e0' : '#E39FF6',
                                    cursor: 'pointer',
                                }}
                            >
                                Send verification code
                            </button>
                            {isLoading && (
                                <div className='flex items-center justify-center mt-2.5'>
                                    <div className='spinner border-4 border-gray-200 border-l-[#7400e0] rounded-full w-6 h-6 animate-spin ml-2'></div>
                                </div>
                            )}
                        </div>

                        <div className='flex flex-row mt-2 mb-4'>
                            <p className='text-[#7d7d8a] font-semibold text-[15px]'>Already have an account? <span className='text-[#9012ff] font-semibold text-[15px] cursor-pointer hover:underline' onClick={navigateLogin}>Log In</span></p>
                        </div>


                        {/* <ToastContainer /> */}
                    </form>
                </div>
            </div>
            <div className="w-1/2 flex items-center justify-center  bg-[#0E2138] rounded-lg m-2">
                <div className="absolute top-4 right-4 w-[400px] h-[400px] bg-[url('/icons/god-rays.png')] bg-cover bg-center bg-no-repeat mix-blend-plus-lighter blur-[12px] pointer-events-none"></div>
                <div className="w-[554px] flex flex-col gap-10 h-auto">
                    <Image
                        src="/icons/coma.svg"
                        width={80}
                        height={80}
                        alt="coma-image"
                    />
                    <h1 className="text-[#EAECF0CC] font-bold text-2xl">Education is the foundation upon which we build our future.</h1>
                    <span className=" text-[#667085] font-normal text-base text-right">- Christine Gregoire</span>
                </div>
            </div>


        </div>
    );
}


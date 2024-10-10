"use client";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Image from 'next/image';
import { auth } from "../../../firebase"; // Adjust the path according to your Firebase config
import { RecaptchaVerifier, signInWithPhoneNumber,onAuthStateChanged } from "firebase/auth";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import styles from './Singnup.module.css'; // Ensure you import the CSS module
import { useEffect } from "react";
import LoadingData from "@/components/Loading";
import Link from "next/link";

function Signup() {

    const router = useRouter();
    const [phone, setPhone] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState({ firstName: '',lastName: '', email: '', phone: '', terms: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    
   

    const validateForm = () => {
        let formIsValid = true;
        let newErrors = { firstName: '',lastName: '', email: '', phone: '', terms: '' };

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
        <div>
            <div className={styles.phodulogo}>
                <Image
                    src="/images/phoduclublogo.png" // Path to your image file
                    alt="Description of image"
                    width={150} // Desired width
                    height={25} // Desired height
                />
            </div>
            <div className={styles.heading}>
                <p className={styles.head}>Get Started</p>
            </div>
            <div className="tagLine">
                <p>Make yourself prepared, before time ✌</p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <div className={styles.nameDiv}>
                        <div className={styles.nameLayout}>
                        <input
                            type="text"
                            id='firstName'
                            placeholder='First Name'
                            value={firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className={styles.firstNameInput}
                        />
                        {isSubmitted && errors.firstName && <div id="firstName_error" className={styles.error}>{errors.firstName}</div>}
                        </div>

                        <div className={styles.nameLayout}>
                        <input
                            type="text"
                            id='lastName'
                            placeholder='Last Name'
                            value={lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className={styles.lastNameInput}
                        />
                        {isSubmitted && errors.lastName && <div id="username_error" className={styles.error}>{errors.lastName}</div>}
                        </div>
                       
                    </div>
                </div>
                <div >
                    <label htmlFor="Email">Email</label>
                    <div className={styles.input}>
                        <input
                            type="email"
                            id='Email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={styles.input}
                        />
                        {isSubmitted && errors.email && <div id="email_error" className={styles.error}>{errors.email}</div>}
                    </div>
                </div>
                <div>
                    <label htmlFor="Number">Phone Number</label>
                    <div>
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
                        />
                        {isSubmitted && errors.phone && <div id="phone_error" className={styles.error}>{errors.phone}</div>}
                    </div>
                </div>
                <div id="recaptcha-container"></div> {/* Recaptcha container */}
                <div className={styles.checkBoxContainer}>
                    <input className={styles.input}
                        type="checkbox"
                        id="terms"
                        checked={termsAccepted}
                        onChange={() => handleInputChange('terms', '')}
                    />
                    <label className={styles.label} htmlFor="terms">
                        I agree to the Phodu.club <a href="#">privacy policy</a> and <a href="#">terms of use</a>.
                    </label>
                    {isSubmitted && errors.terms && <div id="terms_error" className={styles.error}>{errors.terms}</div>}
                </div>
                <div className={styles.buttons}>
                    <button
                        className={styles.button}
                        type="submit"
                        style={{
                            backgroundColor: isFormValid() ? '#7400e0' : '#E39FF6',
                            cursor: 'pointer',
                        }}
                    >
                        Send verification code
                    </button>
                    {isLoading && (
                        <div className={styles.loadingContainer}>
                            <div className={styles.spinner}></div>
                        </div>
                    )} 
                </div>
                {/* <ToastContainer /> */}
            </form>
        </div>
    );
}

export default Signup;

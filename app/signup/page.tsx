"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/utils/supabase/client"; // Corrected import
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './signup.css';
import Image from 'next/image';

export default function Sign() {
    const router = useRouter();
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState({ username: '', email: '', phone: '', terms: '' });
    const [buttonColor, setButtonColor] = useState('#e39ff6'); // Default button color

    const validateForm = () => {
        let formIsValid = true;
        let newErrors = { username: '', email: '', phone: '', terms: '' };

        if (username.trim() === '') {
            formIsValid = false;
            newErrors.username = 'Please enter your name';
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
        setButtonColor(formIsValid ? 'purple' : 'gray'); // Update button color based on form validity

        return formIsValid;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (validateForm()) {
            // Remove hyphens and spaces from the phone number
            const formattedPhone = phone.replace(/\D/g, ''); // This will remove all non-digit characters

            try {
                const { error } = await supabase.auth.signInWithOtp({
                    phone: formattedPhone,
                    options: {
                        redirectTo: `${window.location.origin}/auth/callback`,
                    },
                });

                if (error) {
                    console.error(error.code + " " + error.message);
                    alert("Error sending OTP. Please try again.");
                } else {
                    // Navigate to verify OTP page with phone number as query parameter
                    router.push(`/signup/verifyotp?phone=${formattedPhone}`);
                }
            } catch (error) {
                console.error("An unexpected error occurred: ", error);
                alert("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="main_page">
            <div className="signup">
                <div className="phodu_logo">
                <Image
                src="/images/phoduclublogo.png" // Path to your image file
              alt="Description of image"
              width={150} // Desired width
               height={25} // Desired height
                 />
                </div>
                <div className="heading">
                    <p className="head">Get Started</p>
                </div>
                <div className="tagLine">
                    <p>Make yourself prepared, before time ✌</p>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="inputdiv">
                            <label htmlFor="username">Name</label>
                            <div className="input_flex">
                                <input
                                    type="text"
                                    id='username'
                                    placeholder='Username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="form-input"
                                />
                                {errors.username && <div id="username_error" className="error">{errors.username}</div>}
                            </div>
                        </div>
                        <div className="inputdiv">
                            <label htmlFor="Email">Email</label>
                            <div className="input flex">
                                <input
                                    type="email"
                                    id='Email'
                                    placeholder='Enter email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-input"
                                />
                                {errors.email && <div id="email_error" className="error">{errors.email}</div>}
                            </div>
                        </div>
                        <div className="inputdiv">
                            <label htmlFor="Number">Phone Number</label>
                            <div className="input flex">
                                <PhoneInput
                                    country={'in'}
                                    value={phone}
                                    onChange={(phone: any) => setPhone(phone)}
                                    placeholder="+91 0000000000"
                                    inputProps={{
                                        name: 'phone',
                                        required: true,
                                        autoFocus: true
                                    }}
                                    containerClass="phone-input-container"
                                    inputClass="form-input"
                                />
                                {errors.phone && <div id="phone_error" className="error">{errors.phone}</div>}
                            </div>
                        </div>
                        <div className="checkBoxContainer">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={termsAccepted}
                                onChange={() => setTermsAccepted(!termsAccepted)}
                            />
                            <label htmlFor="terms">
                                I agree to the Phodu.club <a href="#">privacy policy</a> and <a href="#">terms of use</a>.
                            </label>
                            {errors.terms && <div id="terms_error" className="error">{errors.terms}</div>}
                        </div>
                        <div className="buttons">
                            <button
                                className="button"
                                type="submit"
                                style={{ backgroundColor: buttonColor }}
                            >
                                Send Verification Code
                            </button>
                        </div>
                    </form>
                </div>
                <span className="page_to_login">
                    <p>Already have an account? <a href="./login">Log In</a></p>
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

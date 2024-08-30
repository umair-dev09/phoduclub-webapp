import 'react-phone-input-2/lib/style.css';
import './signup.css';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from '@/components/AuthComponents/SignupComponents/Signup';

export default function Sign() {

    return (
        <div className="main_page">
            <div className="signup">
                
                <div>
                  <Signup/>
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
            <ToastContainer /> {/* Toast container */}
        </div>
    );
}


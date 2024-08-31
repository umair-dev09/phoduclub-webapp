
import './verify.css';
import Image from 'next/image';
import VerifyOtp from '@/components/AuthComponents/OtpComponents/VerifyOtp';



export default function Verify() {
 

  return (
    <div className="container">
      <VerifyOtp/>
      <div className="quote-section">
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


import Image from 'next/image';
import Dropdown from '../../../../components/Dropdown';
import styles from '../styles/Dropdown.module.css';
import './lastStep.css';

export default function OneLastStep() {



  return (
    <div className="container">
      <div className="verify">
        <div className="logo">
          <Image
            src="/images/phoduclublogo.png" // Path to your image file
            alt="Description of image"
            width={150} // Desired width
            height={25} // Desired height
          />
        </div>
        <div className="return">
          <a href="">&larr; Back</a>
        </div>
        <div className="container-2">
          <div className="heading">
            <p className="head">One Last Step</p>
          </div>
          <div className="dropDowns">
            <Dropdown/>
          </div>
          
        </div>
      </div>
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

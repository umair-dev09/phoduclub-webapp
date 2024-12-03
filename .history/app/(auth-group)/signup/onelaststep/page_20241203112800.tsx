
import Image from 'next/image';
import Dropdown from '@/components/AuthComponents/OneLastStepComponents/Dropdown';
import './lastStep.css';

export default function OneLastStep() {



  return (
    <div className="flex flex-row w-full h-screen bg-[#F7F8FB]">
      <div className="w-1/2 flex flex-col">
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
            <Dropdown />
          </div>

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

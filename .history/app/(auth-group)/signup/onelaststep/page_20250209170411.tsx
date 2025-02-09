"use client"
import Image from 'next/image';
import Dropdown from '@/components/AuthComponents/OneLastStepComponents/Dropdown';
import { useRouter } from 'next/navigation';

export default function OneLastStep() {
  const router = useRouter();

  return (
    <div className="flex flex-row w-full h-screen bg-[#F7F8FB]">
      <div className="lg:w-1/2 w-full  m-6 flex flex-col">

        <Image
          src="/images/phoduclublogo.png"
          alt="Logo"
          width={150}
          height={25}
        />

        <div className="font-medium text-base mt-[20px]  text-[#98a2b3] cursor-pointer flex flex-row gap-2"
          onClick={() => router.back()}>

          <p>&larr;</p>
          <span className="font-medium text-base text-[#98a2b3]">Back</span>
        </div>
        <div className="h-full flex items-center   flex-col gap-8 mt-10 ">
          <div className="flex items-center justify-center">
            <p className="text-2xl font-bold text-[#101828]">One Last Step</p>
          </div>
          <div className="flex flex-col max-w-[420px]  items-center justify-center">
            <Dropdown />
          </div>

        </div>
      </div>
      <div className="hidden lg:flex w-1/2 items-center justify-center  bg-[#0E2138] rounded-lg m-2">
        <div className="absolute top-4 right-4 w-[400px] h-[400px] bg-[url('/icons/god-rays.png')] bg-cover bg-center bg-no-repeat mix-blend-plus-lighter blur-[12px] pointer-events-none"></div>
        <div className="w-[554px] mx-6 flex flex-col gap-10 h-auto">
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

// Mobile Application Users will be redirected to this page for payment
"use client";

import CashfreeCheckout from '@/components/CashfreeCheckout';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function MdPaymentContent() {
  // State to store the URL parameters
  const [params, setParams] = useState({
    pId: '',
    pType: '',
    pName: '',
    amount: 0,
    uName: '',
    uEmail: '',
    uPhone: '',
    uId: '',
  });
  
  // Get search params from URL
  const searchParams = useSearchParams();
  
  // Extract the parameters when the component mounts
  useEffect(() => {
    const pId = searchParams.get('pId') || '';
    const pType  = searchParams.get('pType') || '';
    const pName = searchParams.get('pName') || '';
    const amount = parseFloat(searchParams.get('amount') || '0');
    const uName = searchParams.get('uName') || '';
    const uEmail = searchParams.get('uEmail') || '';
    const uPhone = searchParams.get('uPhone') || '';
    const uId = searchParams.get('uId') || '';
    setParams({ pId, pType, pName, amount, uName, uEmail, uPhone, uId });

    // Log the parameters to verify they're being extracted correctly
    console.log('URL Parameters:', { pId, pType, pName, amount, uName, uEmail, uPhone, uId });
  }, [searchParams]);

  return (
    <div className="flex flex-col items-top justify-top min-h-screen overflow-hidden">
      <div className="w-screen h-[60px] flex flex-row items-center justify-between bg-[#131313]">
      <p className='text-left text-white text-lg font-bold ml-2'>phodu<span className='text-pink text-lg font-bold'>.club</span></p>
       <p className="text-center text-gray-200 font-normal text-[14px] mr-3">Payment Window</p>
      </div>
      <div className="flex flex-col w-screen h-full items-center justify-center">
        <h2 className="text-center text-black text-[24px] font-semibold">{params.pName || "JEE Dhamaka 2025"}</h2>
        <p className="text-center text-black font-medium mb-10">
          {params.pType === 'course' ? 'Course' : params.pType === 'testseries' ? 'Test Series' : params.pType}
        </p>

        <CashfreeCheckout
          amount={params.amount || 0}
          customerName={params.uName || ''}
          customerEmail={params.uEmail || ''}
          customerId={params.uId || ''}
          customerPhone={params.uPhone || ''}
          productType={params.pType || ''}
          productId={params.pId || ''}
          userId={params.uId || ''}
          deviceType='mobile'
          />

        <p className="text-center text-gray-500 font-normal text-[14px] mt-5 px-6 ">Please complete your payment using the button above. 
        Once done, you&apos;ll be notified and can return to the mobile app, where your course or test series will be automatically updated.
        </p>
      </div>
    </div>  );
}

export default function MdPayment() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <MdPaymentContent />
    </Suspense>
  );
}

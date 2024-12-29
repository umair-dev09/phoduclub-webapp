// File: page.tsx
"use client";

import dynamic from 'next/dynamic';

const PaymentStatus = dynamic(() => import('./PaymentStatusComponent'), {
  ssr: false,
});

const PaymentStatusPage = () => {
  return <PaymentStatus />;
};

export default PaymentStatusPage;

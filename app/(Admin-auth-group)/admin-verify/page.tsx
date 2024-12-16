// File: page.tsx
"use client";

import dynamic from 'next/dynamic';

const Verify = dynamic(() => import('./AdminVerifyComponent'), {
  ssr: false,
});

const VerifyPage = () => {
  return <Verify />;
};

export default VerifyPage;

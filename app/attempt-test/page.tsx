// File: page.tsx
"use client";

import dynamic from 'next/dynamic';

const AttemptTest = dynamic(() => import('./AttemptTestComponent'), {
  ssr: false,
});

const AttemptTestPage = () => {
  return <AttemptTest />;
};

export default AttemptTestPage;

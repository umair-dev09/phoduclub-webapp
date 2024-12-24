// File: page.tsx
"use client";

import dynamic from 'next/dynamic';

const Test = dynamic(() => import('./TestViewComponent'), {
  ssr: false,
});

const TestPage = () => {
  return <Test />;
};

export default TestPage;

// File: page.tsx
"use client";

import dynamic from 'next/dynamic';

const CreateTest = dynamic(() => import('./CreateTestComponet'), {
  ssr: false,
});

const CreateTestPage = () => {
  return <CreateTest />;
};

export default CreateTestPage;

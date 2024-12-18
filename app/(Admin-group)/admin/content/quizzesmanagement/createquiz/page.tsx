// File: page.tsx
"use client";

import dynamic from 'next/dynamic';

const CreateQuizComp = dynamic(() => import('./CreateQuizComp'), {
  ssr: false,
});

const CreateQuizPage = () => {
  return <CreateQuizComp />;
};

export default CreateQuizPage;

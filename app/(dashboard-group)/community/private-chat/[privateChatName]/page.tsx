// File: page.tsx
"use client";

import dynamic from 'next/dynamic';

const PChatComp = dynamic(() => import('./PrivateChatComp'), {
  ssr: false,
});

const pChatPage = () => {
  return <PChatComp />;
};

export default pChatPage;

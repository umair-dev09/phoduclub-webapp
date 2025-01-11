// File: page.tsx
"use client";

import dynamic from 'next/dynamic';

const AdminPrivateChat = dynamic(() => import('./PrivateChatComp'), {
  ssr: false,
});

const AdminPrivateChatPage = () => {
  return <AdminPrivateChat />;
};

export default AdminPrivateChatPage;

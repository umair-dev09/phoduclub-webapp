// app/settings/page.tsx
import { useRouter } from 'next/navigation';
import Layout from '../layout';  // Ensure this path matches the actual file location
import MyProfile from './profile/page';  // Import the MyProfile component
import Purchase from './purchase/page';  // Import the Purchase component
import { useState } from 'react';
import LoadingData from '@/components/Loading';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';

export default function SettingsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    onAuthStateChanged(auth, (user) => {
         if (!user) {
            router.push("/login");
         } 
         else{
        setLoading(false);
         }
       });
            
       if (loading) {
         return (
             <LoadingData/>
         );
     } 
    return (
        <div></div>
    );
}

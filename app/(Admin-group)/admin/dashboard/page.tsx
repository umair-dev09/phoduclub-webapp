"use client";
import { signOut } from "firebase/auth";
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';

function Dashboard() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/admin-login');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div>
            {/* Other component code */}
            <button onClick={handleLogout} className="text-white bg-red-500 px-4 py-2 rounded">
                Logout
            </button>
        </div>
    );
}

export default Dashboard;

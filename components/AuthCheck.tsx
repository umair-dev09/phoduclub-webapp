import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth } from '../firebase'; // Adjust the path to your firebase config

export const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                // Redirect to login if no user is found
                router.push('/login');
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [router]);

    return { loading };
};

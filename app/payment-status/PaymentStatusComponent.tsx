
// app/payment-status/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, setDoc, collection, getDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase'; // Ensure you have initialized Firebase in this file
import LoadingData from '@/components/Loading';
import { onAuthStateChanged, User } from '@firebase/auth';

interface PaymentStatus {
  order_status: string;
  order_amount: number;
  transaction_id?: string;
  payment_status: string;
  payment_message?: string;
  payment_time?: string;
  payment_method?: {
    netbanking?: any;
    upi?: any;
    card?: any;
    wallet?: any;
  };
  amount_paid: number;
}

const getMainPaymentMethod = (method: any): string => {
  if (!method) return '';
  if (method.netbanking) return 'Net Banking';
  if (method.upi) return 'UPI';
  if (method.card) return 'Card';
  if (method.wallet) return 'Wallet';
  return 'Unknown';
};

export default function PaymentStatusPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<PaymentStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isStoring, setIsStoring] = useState<boolean>(false);
  const productType = searchParams.get('product_type');
  const productId = searchParams.get('product_id');
    const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) {
              setUser(currentUser);
              const userDocRef = doc(db, `users/${currentUser.uid}`);

              try {
                  const docSnapshot = await getDoc(userDocRef);
                  if (docSnapshot.exists()) {
                    // router.push("/dashboard");
                  } else {
                      // console.error("User ID not found in Firestore!");
                      setError('User not authenticated');
                      router.push("/login");
                  }
              } catch (err) {
                  console.error("Error fetching user data:", err);
                  setError('Error fetching user data');
              }
          } else {
              // console.error('No user is logged in');
              setError('No user is logged in');
              router.push("/login");
          }
      });
      return () => unsubscribe();
  }, [db, router]);

  useEffect(() => {
    const orderId = searchParams.get('order_id');
    if (!orderId) return;

    const verifyPayment = async () => {
      try {
        const response = await fetch(`/api/verify-payment?order_id=${orderId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to verify payment');
        }

        setStatus(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Verification failed');
      }
    };

    verifyPayment();
  }, [searchParams]);


  useEffect(() => {
    const storeDataInFirestore = async () => {
      if (!status || !productType || !productId) return;

      setIsStoring(true);
      if (user){
      const userId = user.uid;
      const enrollmentData = {
        enrollmentType: status.amount_paid > 0 ? 'paid' : 'free',
        enrollmentDate: status.payment_time || new Date().toISOString(),
        userId: userId,
      };

      const transactionData = {
        contentType: productType,
        dateOfPurchase: status.payment_time || new Date().toISOString(),
        contentId: productId,
        purchasedPrice: status.amount_paid,
        paymentType: getMainPaymentMethod(status.payment_method),
        transactionId: status.transaction_id,
      };

      try {
        if (productType === 'course') {
          await setDoc(doc(collection(db, `course/${productId}/StudentsPurchased`), userId), enrollmentData);
        } else if (productType === 'testseries') {
          await setDoc(doc(collection(db, `testseries/${productId}/StudentsPurchased`), userId), enrollmentData);
        }

        await setDoc(doc(collection(db, `users/${userId}/transactions`), productId), transactionData);

        console.log('Transaction data stored in Firestore');
        if (productType === 'course') {
          router.replace(`/learn/courses`);
        } else if (productType === 'testseries') {
          router.replace(`/learn/test`);
        }
        
      } catch (error) {
        setError('Failed to store data in Firestore');
      } finally {
        setIsStoring(false);
      }
    }
    else{
      setError('User not authenticated!');
    }
  }
    storeDataInFirestore();
  }, [status, productType, productId, auth, db]);

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (!status || isStoring) {
    return <LoadingData />;
  }

  return (
    <div className="p-6 w-screen mx-auto flex items-center justify-center h-screen flex-col gap-2">
     <h3>Transaction Completed!</h3>
     <p className='italic'>Redirecting you to the product page.If not redirected please close this tab.</p>
    </div>
  );
} 
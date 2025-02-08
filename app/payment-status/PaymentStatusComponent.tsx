
// app/payment-status/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, setDoc, collection, getDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase'; // Ensure you have initialized Firebase in this file
import LoadingData from '@/components/Loading';
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
  const uid = searchParams.get('uid');
  const orderId = searchParams.get('order_id');
  const router = useRouter();

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

      // Check payment status first
      if (status.payment_status !== 'SUCCESS') {
      setError(`Payment ${status.payment_status.toLowerCase()}: Transaction was not successful. Please try again.`);
      router.replace(`/learn/courses`);
      return;
      }

      setIsStoring(true);
      if (uid){
      const enrollmentData = {
        enrollmentType: status.amount_paid > 0 ? 'paid' : 'free',
        enrollmentDate: status.payment_time || new Date().toISOString(),
        userId: uid,
      };

      const transactionData = {
        contentType: productType,
        dateOfPurchase: status.payment_time || new Date().toISOString(),
        contentId: productId,
        purchasedPrice: status.amount_paid,
        paymentType: getMainPaymentMethod(status.payment_method),
        transactionId: status.transaction_id,
        orderId: orderId,
      };

      try {
        if (productType === 'course') {
          // First check if course has hasTests
          const courseDoc = await getDoc(doc(db, `course/${productId}`));
          const courseData = courseDoc.data();

          if (courseData?.hasTests) {
            // Get bundleTestIds array
            const bundleTestIds = courseData.bundleTestIds || [];
            
            // Process each test series
            for (const testId of bundleTestIds) {
              const testDoc = await getDoc(doc(db, `testseries/${testId}`));
              const testData = testDoc.data();
              
              // Get current studentsFromCourse array or initialize if doesn't exist
              const studentsFromCourse = testData?.studentsFromCourse || [];
              
              // Check if user already exists in the array
              const userExists = studentsFromCourse.some((student: any) => student.id === uid);
              
              if (!userExists) {
                // Add new student entry
                await setDoc(doc(db, `testseries/${testId}`), {
                  studentsFromCourse: [...studentsFromCourse, {
                    id: uid,
                    courseId: productId,
                  }]
                }, { merge: true });
              }
            }
          }
          
          // Proceed with original enrollment
          await setDoc(doc(collection(db, `course/${productId}/StudentsPurchased`), uid), enrollmentData);
        } 
        else if (productType === 'testseries') {  
          await setDoc(doc(collection(db, `testseries/${productId}/StudentsPurchased`), uid), enrollmentData);
        }

        await setDoc(doc(collection(db, `users/${uid}/transactions`), productId), transactionData);
        await setDoc(doc(db, `users/${uid}`), { isPremium: true }, { merge: true });
        console.log('Transaction data stored in Firestore');
        if (productType === 'course') {
        router.replace(`/learn/courses`);
        } else if (productType === 'testseries') {
        router.replace(`/learn/test`);
        }
        
      } catch (error) {
        setError('Failed to complete transaction. Please try again.');
        console.log(error);
        router.replace(`/learn/courses`);
      } finally {
        setIsStoring(false);
      }
      }
      else{
      setError('User not authenticated');
      router.replace(`/learn/courses`);
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
     <p className='italic'>Redirecting you to the product page. If not redirected please close this tab.</p>
    </div>
  );
} 
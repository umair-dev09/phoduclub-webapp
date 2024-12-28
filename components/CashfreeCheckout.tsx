// components/CashfreeCheckout.tsx
'use client';

import { useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';

interface CheckoutProps {
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerId: string;
  productType: string;
  productId: string;
}

declare const Cashfree: any;

export default function CashfreeCheckout({
  amount,
  customerName,
  customerEmail,
  customerPhone,
  customerId,
  productType,
  productId,
}: CheckoutProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handlePayment = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          customerName,
          customerEmail,
          customerPhone,
          customerId,
        }),
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Payment initialization failed');
      }

      if (!data.payment_session_id) {
        console.error('Invalid response:', data);
        throw new Error('Payment session ID not found');
      }

      // Initialize Cashfree drop-in checkout
      const cashfree = new Cashfree({
        mode: 'sandbox' // or 'production'
      });

      cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        returnUrl: `${window.location.origin}/payment-status?order_id=${data.order_id}&product_type=${productType}&product_id=${productId}`,
      });
      

    } catch (error) {
      console.error('Payment error:', error);
      setError(error instanceof Error ? error.message : 'Payment initialization failed');
      setIsLoading(false);
    }
  };

  return (
    <>
      <Script 
        src="https://sdk.cashfree.com/js/v3/cashfree.js"
        strategy="beforeInteractive"
      />
      
      <div className="space-y-4">
        {error && (
          <div className="text-red-500 text-sm p-2 bg-red-50 rounded border border-red-200">
            {error}
          </div>
        )}
        <button
          onClick={handlePayment}
          disabled={isLoading}
          className="text-white text-sm font-semibold py-3 px-6 rounded-md shadow-inner-button w-auto bg-[#9012FF] hover:bg-[#6D0DCC] "
        >
          {isLoading ? 'Processing...' : 'Buy Now'}
        </button>
      </div>
    </>
  );
}
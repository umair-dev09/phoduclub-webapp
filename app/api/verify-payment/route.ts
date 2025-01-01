// app/api/verify-payment/route.ts
import { NextResponse } from 'next/server';

const CASHFREE_API_KEY = process.env.CASHFREE_API_KEY!;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY!;
const CASHFREE_BASE_URL = 'https://sandbox.cashfree.com/pg';

export async function GET(request: Request) {
  if (!CASHFREE_API_KEY || !CASHFREE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'Missing Cashfree credentials' },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('order_id');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Get order details
    const orderResponse = await fetch(`${CASHFREE_BASE_URL}/orders/${orderId}`, {
      headers: {
        'Accept': 'application/json',
        'x-api-version': '2022-09-01',
        'x-client-id': CASHFREE_API_KEY,
        'x-client-secret': CASHFREE_SECRET_KEY,
      },
    });

    const orderData = await orderResponse.json();

    // Get payment details
    const paymentResponse = await fetch(`${CASHFREE_BASE_URL}/orders/${orderId}/payments`, {
      headers: {
        'Accept': 'application/json',
        'x-api-version': '2022-09-01',
        'x-client-id': CASHFREE_API_KEY,
        'x-client-secret': CASHFREE_SECRET_KEY,
      },
    });

    const paymentData = await paymentResponse.json();

    if (!orderResponse.ok) {
      throw new Error(orderData.message || 'Failed to fetch order status');
    }

    // Combine order and payment data
    const paymentDetails = paymentData.length > 0 ? paymentData[0] : null;
    
    const status = {
        order_status: orderData.order_status,
        order_amount: orderData.order_amount,
        amount_paid: paymentDetails?.payment_amount || orderData.order_amount, // Actual amount paid
        payment_method: paymentDetails?.payment_method,
        transaction_id: paymentDetails?.cf_payment_id,
        payment_status: paymentDetails?.payment_status || 'PENDING',
        payment_message: paymentDetails?.payment_message,
        payment_time: paymentDetails?.payment_completion_time
      };
   
    return NextResponse.json(status);

  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

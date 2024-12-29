// app/api/create-session/route.ts
import { NextResponse } from 'next/server';

const CASHFREE_API_KEY = process.env.CASHFREE_API_KEY!;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY!;
const CASHFREE_API_URL = 'https://sandbox.cashfree.com/pg/orders';

export async function POST(request: Request) {
  if (!CASHFREE_API_KEY || !CASHFREE_SECRET_KEY) {
    console.error('Missing Cashfree credentials');
    return NextResponse.json(
      { error: 'Missing Cashfree credentials' },
      { status: 500 }
    );
  }

  try {
    const orderData = await request.json();
    const orderId = 'order_' + Date.now();

    const requestBody = {
      order_id: orderId,
      order_amount: orderData.amount,
      order_currency: "INR",
      customer_details: {
        customer_id: orderData.customerId,
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail,
        customer_phone: orderData.customerPhone
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-status?order_id={order_id}`,
        notify_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/cashfree-webhook`
      }
    };

    console.log('Request to Cashfree:', requestBody);
    
    const response = await fetch(CASHFREE_API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-version': '2022-09-01',
        'x-client-id': CASHFREE_API_KEY,
        'x-client-secret': CASHFREE_SECRET_KEY,
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();
    console.log('Cashfree API Response:', responseData);

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to create order');
    }

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
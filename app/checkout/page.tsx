// app/checkout/page.tsx
import CashfreeCheckout from '@/components/CashfreeCheckout';

export default function CheckoutPage() {
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <CashfreeCheckout
        amount={4000}
        customerName="Umair Doe"
        customerEmail="john@example.com"
        customerPhone="9299699999"
        customerId="CUST_0221"
        productType='course'
        productId='course_001'
      />
    </div>
  );
}
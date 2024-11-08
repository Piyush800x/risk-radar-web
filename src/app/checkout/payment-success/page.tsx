'use client';
import { useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');

  useEffect(() => {
    async function verifyPayment() {
        if (session_id) {
            const response = await fetch('/api/subscription/update-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId: session_id }),
            });

            if (!response.ok) {
            console.error('Failed to update subscription');
            }
        }
    }

    verifyPayment();
  }, [session_id]);

  return (
    <div>
        <h1>Payment Successful! Your subscription is now active.</h1>
        <Button><a href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/home`}>Go to dashboard</a></Button>
    </div>
  );
}

// components/SubscribeButton.tsx
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface SubscribeButtonProps {
  customerEmail: string;
  productName: string;
  unitAmount: number;
}

export default function SubscribeButton({ customerEmail, productName, unitAmount }: SubscribeButtonProps)  {
  const handleSubscription = async () => {
    const response = await fetch('/api/stripe/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customerEmail, productName, unitAmount }),
    });

    const { id } = await response.json();
    const stripe = await stripePromise;

    if (stripe) {
      await stripe.redirectToCheckout({ sessionId: id });
    }
  };

  return <button onClick={handleSubscription}>Subscribe Now</button>;
};


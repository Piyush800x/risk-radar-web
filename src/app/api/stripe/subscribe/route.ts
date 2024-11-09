// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
});

export async function POST(req: NextRequest) {
  const SITE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    const { customerEmail, productName, unitAmount, desc } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: 'usd',  // Specify currency, e.g., 'usd'
            product_data: {
              name: productName, // The name of your subscription product
            },
            recurring: { interval: 'month' }, // Set recurring interval
            unit_amount: unitAmount, // Price per billing cycle in cents (e.g., $10.00 = 1000)
          },
          quantity: 1,
        },
      ],
      metadata: {productName, desc},
      success_url: `${SITE_URL}/checkout/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/pricing`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create subscription session' }, { status: 500 });
  }
}

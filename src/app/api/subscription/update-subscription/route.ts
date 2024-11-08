import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Db, MongoClient } from 'mongodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
});

const client = new MongoClient(process.env.MONGODB_URI!);
const db: Db = client.db("UserData");

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log(`Session: ${JSON.stringify(session)}`);
    if (session.payment_status === 'paid') {
      const {productName} = session.metadata!;

    //   console.log(JSON.stringify(session.customer_email))
    //   console.log(`..........${productName}`)
      // Update MongoDB to activate the subscription
      await client.connect();
      await db.collection('userdata').updateOne(
        { authEmailId: session.customer_email },
        { $set: {"subscription": { subscriptionStatus: 'active', subscriptionId: session.subscription, planType: productName }} }, 
      );

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 });
  }
}

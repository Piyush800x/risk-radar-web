// app/api/cancel-subscription/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { MongoClient, Db, Collection } from 'mongodb';
import mongoClientPromise from '@/lib/mongodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-10-28.acacia',
});

export async function POST(req: NextRequest) {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("UserData");
    const collection: Collection = db.collection("userdata");

    try {
        const { subscriptionId, authId } = await req.json();

        // Cancel the subscription in Stripe
        const canceledSubscription = await stripe.subscriptions.cancel(subscriptionId);

        if (canceledSubscription.status !== 'canceled') {
            return NextResponse.json({ message: 'Failed to cancel subscription' }, { status: 500 });
        }

        // Update the subscription status in MongoDB
        const result = await collection.updateOne(
            { authId: authId },
            { $set: { "subscription.subscriptionStatus": "canceled" } }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: 'Failed to update subscription in db' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Subscription canceled successfully' });
    } catch (error) {
        console.error('Error canceling subscription:', error);
        return NextResponse.json({ message: 'Failed to cancel subscription' }, { status: 500 });
    } finally {
        await client.close();
  }
}

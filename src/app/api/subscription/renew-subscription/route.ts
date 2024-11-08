import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { MongoClient, Db, Collection } from 'mongodb';
import mongoClientPromise from '@/lib/mongodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-10-28.acacia',
});

// Renew not using
export async function POST(req: NextRequest) {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("UserData");
    const collection: Collection = db.collection("userdata");

    try {
        const { authId, subscriptionId } = await req.json();

        // Retrieve the existing subscription
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        if (subscription.status !== 'canceled') {
            return NextResponse.json({message: 'Subscription is not canceled; no need to renew.'});
        }
      
        // Get customer ID and product ID from the existing subscription
        const customerId = subscription.customer as string;
        const productId = subscription.items.data[0].price.product as string;

        // Fetch active prices for the product to find a valid price ID
        const activePrices = await stripe.prices.list({
        product: productId,
        active: true,
        limit: 1, // Get one active price
        });

        if (activePrices.data.length === 0) {
            return NextResponse.json({message: 'No active prices found for this product.'});
        }

        const activePriceId = activePrices.data[0].id;

        // Create a new subscription with the active price ID
        const newSubscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: activePriceId }],
            expand: ['latest_invoice.payment_intent'],
        });

        // Update the subscription status in MongoDB
        const result = await collection.updateOne(
        { authId: authId },
        {
            $set: {
                "subscription.subscriptionStatus": "active",
                "subscription.subscriptionId": newSubscription.id,
                "subscription.currentPeriodEnd": newSubscription.current_period_end,
            }
        }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({message: "Unable to update in db!"}, {status: 500})
        }

        return NextResponse.json({
            message: 'Subscription renewed successfully',
            currentPeriodEnd: newSubscription.current_period_end,
        });
    } catch (error) {
        console.error('Error renewing subscription:', error);
        return NextResponse.json({ message: 'Failed to renew subscription' }, { status: 500 });
    } finally {
        await client.close();
    }
}

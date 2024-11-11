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
    const { subscriptionId, newPriceId, authId } = await req.json();

    // Retrieve the subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    // Update the subscription to switch to a new price (plan)
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id, // The current subscription item ID
          price: newPriceId, // The new price ID
        },
      ],
      proration_behavior: 'create_prorations', // Options: 'create_prorations', 'none', 'always_invoice'
    });

    // Update the database to reflect the new plan

    const result = await collection.updateOne(
      { authId: authId },
      {
        $set: {
          "subscription.subscriptionStatus": updatedSubscription.status,
          "subscription.subscriptionId": updatedSubscription.id,
          "subscription.currentPeriodEnd": updatedSubscription.current_period_end,
          "subscription.planType": updatedSubscription.items.data[0].price.nickname, // Update with new plan nickname
        }
      }
    );

    if (result.modifiedCount === 0) {
      throw new Error('Failed to update subscription plan in the database.');
    }

    return NextResponse.json({
      message: 'Subscription plan updated successfully',
      currentPeriodEnd: updatedSubscription.current_period_end,
    });
  } catch (error) {
    console.error('Error updating subscription plan:', error);
    return NextResponse.json(
      { error: 'Failed to update subscription plan' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

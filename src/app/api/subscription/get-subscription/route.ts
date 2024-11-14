import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/lib/mongodb";
import { MongoClient, Db, Collection } from "mongodb";
import Stripe from 'stripe';

interface CardDetails {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
}
  
interface BillingMethod {
    card?: CardDetails;
}
  
interface SubscriptionResponse {
    status: string;
    billingMethod: CardDetails | null;
    currentPeriodEnd: number;
    items: Stripe.SubscriptionItem[];
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-10-28.acacia',
});

export async function POST(req: NextRequest) {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("UserData");
    const collection: Collection = db.collection("userdata");

    const data = await req.json();

    try {
        const result = await collection.findOne({"authId": data.authId});
        if (result) {
            const subscriptionId = result.subscription.subscriptionId;
            const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
                expand: ['default_payment_method'],
            });

            const billingMethod: BillingMethod | null =
                typeof subscription.default_payment_method === 'object' &&
                subscription.default_payment_method !== null &&
                'card' in subscription.default_payment_method
                    ? (subscription.default_payment_method as Stripe.PaymentMethod)
                    : null;

            const response: SubscriptionResponse = {
                status: subscription.status,
                billingMethod: billingMethod?.card || null,
                currentPeriodEnd: subscription.current_period_end,
                items: subscription.items.data,
            };
            console.log(JSON.stringify(response));
            
            return NextResponse.json({
                response,
                planType: result.subscription.planType,
                desc: result.subscription.desc,
                invoiceURL: result.subscription.invoiceURL,
                emailingStatus: result.emailingStatus,
                success: true
            });
        }
        else {
            NextResponse.json({success: false, message: "Data not found in db"});
        }
        
    }
    catch (error) {
        return NextResponse.json({success: false, message: error});
    }

}
'use client';
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SubscribeButton from "@/components/Stripe/SubscribeButton";

interface Pricing {
    planType: string;
    description: string;
    price: number;
    features: string[];
    available: boolean[];
    priceId: string;
}

export default function CheckoutPage() {
    const [pricing, setPricing] = useState<Pricing>();
    const {user, isAuthenticated} = useKindeBrowserClient();

    useEffect(() => {
        if (isAuthenticated) {
            const item = sessionStorage.getItem("selectedPlan")
            if (item) {
                setPricing(JSON.parse(item));
            }
            else {
                redirect('/')
            }
        }
        
    }, [isAuthenticated]);

    if (!pricing) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            <h1>Plan Details</h1>
            <h2>{pricing.planType}</h2>
            <p>{pricing.description}</p>
            <h3>Features:</h3>
            <div>
                {pricing.features.map((feature: string, index: number) => (
                    <div>
                        <ul>
                            <li>{feature as string} -- {pricing.available[index]}</li>
                        </ul>
                    </div>
                ))}
            </div>
            <h2>Price: {pricing.price}</h2>
            <SubscribeButton customerEmail={user?.email!} productName={pricing.planType} unitAmount={pricing.price * 100}/>
        </div>
    )
}
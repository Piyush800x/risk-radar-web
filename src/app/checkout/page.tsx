'use client';
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";


interface Pricing {
    planType: string;
    description: string;
    price: number;
    features: string[];
    available: boolean[];
}

export default function CheckoutPage() {
    const [pricing, setPricing] = useState<Pricing>();

    useEffect(() => {
        const item = sessionStorage.getItem("selectedPlan")
        if (item) {
            setPricing(JSON.parse(item));
        }
        else {
            redirect('/')
        }
    }, []);

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
            
        </div>
    )
}
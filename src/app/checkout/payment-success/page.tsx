"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ResponseData {
  price: string;
  planType: {
    desc: string;
    productName: string;
  };
  invoiceURL: string;
}

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');
  const [responseData, setResponseData] = useState<ResponseData>();

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

  if (!responseData) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
        <h1>Payment Successful! Your subscription is now active.</h1>
        <h1>{responseData.price}</h1>
        <h2>{responseData.planType.productName}</h2>
        <Button><a href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/home`}>Go to dashboard</a></Button>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
  const session_id = searchParams.get("session_id");
  const [responseData, setResponseData] = useState<ResponseData>();

  useEffect(() => {
    async function verifyPayment() {
      if (session_id) {
        const response = await fetch("/api/subscription/update-subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: session_id }),
        });
        const res = await response.json();
        // console.log(JSON.stringify(res.respData));
        setResponseData(res.respData);
        if (!response.ok) {
          console.error("Failed to update subscription");
        }
      }
    }

    verifyPayment();
  }, [session_id]);

  if (!responseData) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <div className="relative flex flex-col gap-4 bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-lg shadow border px-8 py-8 border-neutral-600">
        <Image
          src={"/payment_success/verified.svg"}
          height={200}
          width={200}
          alt="verified icon"
        />
        <h1>Payment success</h1>

        {/* Amount */}
        <div>
          <h1>{responseData?.price}</h1>
        </div>
        <Button>
          <a href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/home`}>
            Go to dashboard
          </a>
        </Button>
        <h2>{responseData.planType.productName}</h2>
      </div>
    </div>
  );
}

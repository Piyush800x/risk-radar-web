"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Suspense } from "react";

interface ResponseData {
  price: string;
  planType: {
    desc: string;
    productName: string;
  };
  invoiceURL: string;
}

function PaymentSuccessContent() {
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
        <div className="relative flex flex-col justify-center items-center gap-4 bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-lg shadow border px-8 py-8 border-neutral-600">
          <Image
            src={"/payment_success/verified.svg"}
            height={200}
            width={200}
            alt="verified icon"
          />
          <h1 className="text-2xl font-medium">Payment success</h1>

          {/* Amount */}
          <div className="flex flex-col items-center">
            <h1 className="text-stone-300 text-md font-normal">Amount</h1>
            <h1 className="font-semibold text-3xl">
              ${Number(responseData?.price) / 100}
            </h1>
          </div>
          <div className="w-28 h-10 px-7 py-2 rounded-3xl border border-neutral-500 justify-center items-center gap-2.5 inline-flex">
            <div className="text-white/80 text-md font-semibold uppercase">
              {responseData.planType.productName}
            </div>
          </div>
          <h2 className="text-stone-300 font-medium ">
            Your monthly subscription is now active.
          </h2>

          {/* CTAs */}
          <div>
            {/* CTA buttons */}
            <div className="flex sm:gap-5 gap-1 ">
              <Link
                href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/home`}
              >
                <Button size={"lg"} className="font-semibold">
                  Go to dashboard
                </Button>
              </Link>
              <Link href={responseData.invoiceURL} target="_blank">
                <Button
                  variant={"secondary"}
                  size={"lg"}
                  className="font-semibold border border-neutral-700 flex items-center gap-1"
                >
                  <span>Download Invoice</span>
                  <ArrowUpRight />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

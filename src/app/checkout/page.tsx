"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SubscribeButton from "@/components/Stripe/SubscribeButton";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
  const { user, isAuthenticated } = useKindeBrowserClient();

  useEffect(() => {
    if (isAuthenticated) {
      const item = sessionStorage.getItem("selectedPlan");
      if (item) {
        setPricing(JSON.parse(item));
      } else {
        redirect("/");
      }
    }
  }, [isAuthenticated]);

  if (!pricing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <div className="relative flex flex-col gap-4 bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-lg shadow border px-8 py-8 border-neutral-600">
        <div className="absolute top-0 right-0">
          <Image
            src={"/checkout/mandala_art.svg"}
            height={200}
            width={200}
            alt="mandala art"
            className="-z-50"
          />
        </div>
        <div className="z-50">
          <h1 className="font-semibold text-2xl">Plan Details</h1>
          <div className="w-3/4">
            <span className="text-zinc-400 text-md font-normal">
              Check every details of your plan here
              <br />
              Clicking on{" "}
            </span>
            <span className="text-zinc-400 text-md font-bold">
              Subscribe Now
            </span>
            <span className="text-zinc-400 text-md font-normal">
              {" "}
              will redirect you to a secure 3rd party payment gateway
            </span>
          </div>

          {/* Plan type */}
          <h2 className="w-max px-6 mt-8 py-2 uppercase font-semibold rounded-3xl border border-neutral-500 justify-center items-center gap-2.5 inline-flex">
            {pricing.planType}
          </h2>
        </div>

        {/* Features listing */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-2xl">Features included:</h3>
          <div className="w-full">
            {pricing.features.map((feature: string, index: number) => (
              <div key={pricing.price} className="flex flex-col gap-4">
                <div className="flex gap-3">
                  {pricing.available[index] ? <Check /> : <X />}
                  {feature as string}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Plan price and button */}
        <div className="w-full flex justify-between items-center">
          {/* Subscribe button */}
          <Button>
            <SubscribeButton
              customerEmail={`${user?.email}`}
              productName={pricing.planType}
              unitAmount={pricing.price * 100}
              desc={pricing.description}
            />
          </Button>

          {/* Plan price */}
          <div>
            <h2 className="text-stone-300 text-xl">Plan price:</h2>
            <h1 className="text-4xl font-semibold">
              ${pricing.price}
              <span className="text-2xl text-gray-500">/month</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

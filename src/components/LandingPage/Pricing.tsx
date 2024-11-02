import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, X, Infinity } from "lucide-react";

interface Pricing {
  planType: string;
  description: string;
  price: number;
  features: string[];
  available: boolean[];
}

const pricingPlans: Pricing[] = [
  {
    planType: "Basic",
    description: "For individuals or small businesses starting with security",
    price: 6.99,
    features: [
      "Upto 25 products",
      "Vulnerability check every 24 hours",
      "Instant Email Notifications",
      '"Check Now" Function',
    ],
    available: [true, true, false, false],
  },
  {
    planType: "Standard",
    description:
      "Perfect for growing businesses with an active product portfolio",
    price: 14.99,
    features: [
      "Upto 50 products",
      "Vulnerability check every 6 hours",
      "Instant Email Notifications",
      '"Check Now" Function',
    ],
    available: [true, true, true, true],
  },
  {
    planType: "Premium",
    description:
      "For enterprises and security-focused teams managing complex systems",
    price: 24.99,
    features: [
      "Infinity products",
      "Vulnerability check every 1 hour",
      "Instant Email Notifications",
      '"Check Now" Function',
    ],
    available: [true, true, true, true],
  },
];

export default function Pricing() {
  return (
    <div className="flex justify-center">
      {/* Card div */}
      <div className="flex justify-center items-center gap-2 h-[650px] ">
        {pricingPlans.map((plan) => (
          <div key={plan.planType}>
            <div className="bg-gradient-to-b w-max h-max p-4 from-neutral-800 to-neutral-900 rounded-2xl border border-zinc-500">
              {/* Plan type and description */}
              <div className="flex flex-col gap-3">
                {/* Plan type text */}
                <div className="w-max px-7 py-2 rounded-3xl border border-neutral-500 justify-center items-center gap-2.5 inline-flex">
                  <div className="text-white/80 text-sm font-semibold uppercase">
                    {plan.planType}
                  </div>
                </div>

                {/* Description */}
                <h1 className="w-[350px] text-zinc-400 text-md font-normal">
                  {plan.description}
                </h1>
              </div>

              {/* Price */}
              <div className="mt-20">
                <span className="text-white text-5xl font-extrabold ">
                  ${plan.price}
                </span>
                <span className="text-neutral-400 text-md font-normal">
                  /month
                </span>
              </div>

              <div className="my-3">
                <Separator className="dark:invert dark:bg-black/20" />
              </div>

              {/* Features */}
              <div className="flex flex-col gap-4">
                {plan.features.map((feature, index) => (
                  <div key={feature}>
                    <h1 className="flex gap-3">
                      {plan.available[index] ? <Check /> : <X />}
                      <span>{feature}</span>
                    </h1>
                  </div>
                ))}
              </div>

              {/* Button for buying */}
              <div className="w-full mt-20">
                <Button
                  variant={"outline"}
                  className="w-full bg-transparent border border-neutral-500 font-semibold"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

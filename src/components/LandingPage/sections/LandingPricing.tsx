import { Button } from "../../ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, X, Infinity } from "lucide-react";

interface Pricing {
  planType: string;
  description: string;
  price: number;
  features: string[];
  available: boolean[];
  colorScheme: string;
  margin: string;
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
    colorScheme: "bg-transparent",
    margin: "mt-20",
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
    colorScheme: "bg-white/90 hover:bg-white/80 text-black hover:text-black",
    margin: "mt-2",
  },
  {
    planType: "Premium",
    description:
      "For enterprises and security-focused teams managing complex systems",
    price: 24.99,
    features: [
      "Infinite products",
      "Vulnerability check every 1 hour",
      "Instant Email Notifications",
      '"Check Now" Function',
    ],
    available: [true, true, true, true],
    colorScheme: "bg-gradient-to-r from-stone-500 to-neutral-800 text-white",
    margin: "mt-20",
  },
];

export default function Pricing() {
  return (
    <div className="flex justify-center">
      {/* Card div */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:gird-cols-1 justify-center items-center gap-2  ">
        {pricingPlans.map((plan) => (
          <div
            key={plan.planType}
            className={`bg-gradient-to-b w-max ${
              plan.planType === "Standard"
                ? "lg:h-[650px] md:h-full sm:h-full"
                : ""
            } flex flex-col justify-between p-4 from-neutral-800 to-neutral-900 rounded-2xl border border-zinc-500`}
          >
            {/* Plan type and description */}
            <div className="flex flex-col gap-3">
              {/* Plan type text */}
              <div
                className={`w-max px-7 py-2 ${plan.colorScheme} rounded-3xl border border-neutral-500 justify-center items-center gap-2.5 inline-flex`}
              >
                <div className="text-sm font-semibold uppercase">
                  {plan.planType}
                </div>
              </div>

              {/* Description */}
              <h1 className="w-[350px] text-zinc-400 text-md font-normal">
                {plan.description}
              </h1>
            </div>

            <div>
              {/* Price */}
              <div className={plan.margin}>
                <span className="text-white text-5xl font-bold ">
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
            </div>

            {/* Button for buying */}
            <div className="w-full mt-20">
              <Button
                variant={"outline"}
                className={`w-full ${plan.colorScheme} border border-neutral-500 font-semibold`}
              >
                Buy Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

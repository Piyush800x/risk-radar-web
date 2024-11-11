import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";

interface Pricing {
  planType: string;
  description: string;
  price: number;
  features: string[];
  available: boolean[];
  colorScheme: string;
  margin: string;
  priceId: string;
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
    priceId: "price_1QIPJh09Nu4330lJAwZSHw5P",
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
    priceId: "price_1QIPK409Nu4330lJmUiJrOIy",
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
    priceId: "price_1QIPKK09Nu4330lJU0XdDVTO",
  },
];

export default function ChangePlan() {
  const { isAuthenticated } = useKindeBrowserClient();
  const router = useRouter();

  const handleSubmit = async (plan: Pricing) => {
    if (isAuthenticated) {
      sessionStorage.setItem("selectedPlan", JSON.stringify(plan));

      router.push("/checkout");
    } else {
      return toast.warning("Please login to purchase a subscription");
    }
  };
  return (
    <div className="w-full flex items-center justify-center">
      {/* Card div */}
      <div className="sm:flex grid grid-cols-1 sm:mx-0 mx-4 w-max gap-2">
        {pricingPlans.map((plan) => (
          <div
            key={plan.planType}
            className={`dark:bg-[#1B1B1B] bg-neutral-200 flex flex-col justify-between p-4 rounded-2xl border border-zinc-500`}
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
              <h1 className="sm:w-[350px] dark:text-zinc-400 sm:text-md text-sm font-normal">
                {plan.description}
              </h1>
            </div>

            <div>
              {/* Price */}
              <div className="mt-8">
                <span className="dark:text-white sm:text-4xl text-4xl font-bold ">
                  ${plan.price}
                </span>
                <span className="dark:text-neutral-400 text-md font-normal">
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
                      <span className="sm:text-base text-sm">{feature}</span>
                    </h1>
                  </div>
                ))}
              </div>
            </div>

            {/* Button for buying */}
            <div className="w-full mt-20">
              <Button
                variant={"outline"}
                onClick={() => handleSubmit(plan)}
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

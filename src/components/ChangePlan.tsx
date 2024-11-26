import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface Pricing {
  planType: string;
  description: string;
  price: number;
  features: string[];
  available: boolean[];
  colorScheme: string;
  margin: string;
  priceId: string;
  isEnterprise: boolean;
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
    isEnterprise: false,
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
    isEnterprise: false,
  },
  {
    planType: "Premium",
    description:
      "For enterprises and security-focused teams managing complex systems",
    price: 24.99,
    features: [
      "Upto 100 products",
      "Vulnerability check every 1 hour",
      "Instant Email Notifications",
      '"Check Now" Function',
    ],
    available: [true, true, true, true],
    colorScheme: "bg-gradient-to-r from-stone-500 to-neutral-800 text-white",
    margin: "mt-20",
    priceId: "price_1QIPKK09Nu4330lJU0XdDVTO",
    isEnterprise: false,
  },
  {
    planType: "Enterprise",
    description:
      "Tailored solutions with personalized pricing. Designed for large organizations with unique needs",
    price: 24.99,
    features: [
      "More than 100 products",
      "Everything included in premium",
      "24/7 Support",
    ],
    available: [true, true, true, true],
    colorScheme: "bg-indigo-200 text-stone-900",
    margin: "",
    priceId: "",
    isEnterprise: true,
  },
];

// interface Props {
//   authId: string;
//   subscriptionId: string;
// }

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

  // Not working
  // const handleChangePlan = async (newPriceId: string, desc: string, planType: string) => {
  //   try {
  //     const response = await fetch("/api/subscription/change-plan", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         authId: authId,
  //         subscriptionId: subscriptionId,
  //         newPriceId: newPriceId,
  //         desc: desc,
  //         planType: planType
  //       }),
  //     });

  //     const res = await response.json();
  //     console.log(JSON.stringify(res));

  //   }
  //   catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <div className="w-full flex items-center justify-center">
      <ScrollArea>
        {/* Card div */}
        <div className="sm:flex grid grid-cols-1 sm:mx-0 mx-4 sm:w-max gap-2">
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
                    {plan.isEnterprise ? "Contact Us" : `$${plan.price}`}
                  </span>
                  {plan.isEnterprise ? (
                    <p></p>
                  ) : (
                    <span className="text-neutral-400 text-md font-normal">
                      /month
                    </span>
                  )}
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
                  {plan.planType === "Enterprise"
                    ? "Schedule a meeting"
                    : "Buy Now"}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="vertical" />
        {/* <ScrollBar orientation="horizontal" /> */}
      </ScrollArea>
    </div>
  );
}

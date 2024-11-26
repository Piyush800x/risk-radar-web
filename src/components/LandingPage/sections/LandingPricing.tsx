import { Button } from "../../ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";

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
    margin: "",
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
    margin: "mt-20",
    priceId: "price_1QIPK409Nu4330lJmUiJrOIy",
    isEnterprise: false,
  },
  {
    planType: "Premium",
    description:
      "Best for organizations requiring extensive coverage and rapid insights",
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

export default function LandingPricing() {
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
    <div className="flex flex-col justify-center mt-[150px]">
      {/* Heading text */}
      <div>
        <h1 className="text-neutral-700 sm:text-md font-semibold uppercase">
          pricing
        </h1>
        <h1 className="text-3xl mb-6 font-semibold bg-gradient-to-r from-[#FFFFFF] to-[#9999998F]/55 bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h1>
      </div>
      {/* Card div */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:gird-cols-1 justify-center items-center gap-2 mt-8">
        {pricingPlans.map((plan) => (
          <>
            <div
              key={plan.planType}
              className={`relative bg-gradient-to-b h-full flex flex-col sm:mt-0 ${plan.margin} justify-between sm:min-w-auto  ${
                plan.planType === "Standard" ? "border-white/90" : ""
              } p-4 from-neutral-800 to-neutral-900 rounded-2xl border border-zinc-500`}
            >
            {plan.planType === "Standard" && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-50 w-full flex items-center justify-center bg-white/90 hover:bg-white/80 text-black hover:text-black pb-4 pt-2 rounded-t-xl shadow-lg">
              <h1 className="uppercase text-md font-bold">most popular</h1>
              </div>
            )}
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
                <h1 className=" text-zinc-400 sm:text-md text-sm font-normal">
                  {plan.description}
                </h1>
              </div>

              <div>
                {/* Price */}
                <div className="mt-20 flex flex-grow items-end">
                  <span className="text-white text-4xl font-bold ">
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
          </>
        ))}
      </div>
    </div>
  );
}

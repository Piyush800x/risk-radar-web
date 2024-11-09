"use client";
import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Stripe from "stripe";

interface CardDetails {
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
}

interface BillingMethod {
  card?: CardDetails;
  brand?: string;
  last4: string;
  country: string;
}

interface SubscriptionResponse {
  status: string;
  billingMethod: BillingMethod | null;
  currentPeriodEnd: number;
  items: Stripe.SubscriptionItem[];
}

export default function Billing() {
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionResponse>();
  const { isAuthenticated, user } = useKindeBrowserClient();
  const [loading, setLoading] = useState<boolean>(true);
  const [isRenewing, setIsRenewing] = useState<boolean>(false);
  const [planType, setPlanType] = useState<string>();
  const [planDesc, setPlanDesc] = useState<string>();
  const [invoiceURL, setInvoiceURL] = useState<string>();

  const fetchSubscriptionData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/subscription/get-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authId: user?.id }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(JSON.stringify(data.response));
        setSubscriptionData(data.response);
        setPlanType(data.planType);
        setPlanDesc(data.desc);
        setInvoiceURL(data.invoiceURL);
      } else {
        console.error("Failed to fetch subscription details");
      }
    } catch (error) {
      toast.error("Can't fetch Billing details\nTry again later");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscriptionCancel = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/subscription/cancel-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authId: user?.id,
          subscriptionId: subscriptionData?.items[0].subscription,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(JSON.stringify(data.response));
        toast.success(data.message);
      } else {
        toast.error("Can't cancel subscription\nTry again later");
        console.error("Failed to cancel subscription!");
      }
    } catch (error) {
      toast.error("Can't cancel subscription\nTry again later");
    } finally {
      setLoading(false);
    }
  };

  // const renewSubscription = async () => {
  //   setIsRenewing(true);
  //   try {
  //     const response = await fetch('/api/subscription/renew-subscription', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ subscriptionId: subscriptionData?.items[0].subscription, authId: user?.id }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setSubscriptionData(prev => prev ? { ...prev, status: "active", currentPeriodEnd: data.currentPeriodEnd } : prev);
  //       toast.success("Subscription renewed successfully");
  //     } else {
  //       toast.error("Failed to renew subscription");
  //     }
  //   } catch (error) {
  //     toast.error("An error occurred. Please try again.");
  //   } finally {
  //     setIsRenewing(false);
  //   }
  // };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubscriptionData();
    }
  }, [isAuthenticated]);

  if (!subscriptionData) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="py-4 px-5 w-full flex flex-col justify-center">
      {/* Heading text and tab info */}
      <div className="text-neutral-900 text-3xl font-semibold tracking-wide">
        <h1 className="text-neutral-600 text-lg font-semibold dark:invert">
          Home
        </h1>
        <div className="flex flex-col">
          <span className="dark:text-white">Welcome, {user?.given_name}</span>
          <span className="text-neutral-700 text-lg font-medium tracking-wide dark:invert">
            Manage your billings here
          </span>
        </div>
      </div>

      {/* Status and change plan */}
      <div>
        {/* Plan type name and status indicator */}
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold">{planType} plan</p>
          <div
            className={`w-20 h-8 px-4 py-1 ${
              subscriptionData.status === "active"
                ? "bg-green-500/5 border-lime-950"
                : "bg-red-500/5 border-red-600"
            } rounded-3xl border  justify-center items-center gap-2.5 inline-flex`}
          >
            <h1
              className={`${
                subscriptionData.status === "active"
                  ? "text-green-500"
                  : "text-red-500"
              } text-sm font-semibold tracking-tight uppercase`}
            >
              {subscriptionData.status}
            </h1>
          </div>
        </div>
      </div>

      <p>Desc: {planDesc}</p>
      <a href={`${invoiceURL}`}>Download Invoice</a>
      <p>Status: {subscriptionData.status}</p>
      <p>
        Billing Method:{" "}
        {subscriptionData.billingMethod?.brand
          ? `${subscriptionData.billingMethod.brand} ending in ${subscriptionData.billingMethod.last4}`
          : "No billing method found"}
      </p>
      <p>Amount -- {subscriptionData.items[0].plan.amount}</p>
      <p>Last invoice Date -- {subscriptionData.items[0].price.created}</p>
      <p>Country: {subscriptionData.billingMethod?.country}</p>
      <p>
        Current Period End:{" "}
        {new Date(
          subscriptionData.currentPeriodEnd * 1000
        ).toLocaleDateString()}
      </p>
      {/* {subscriptionData.status ? (<Button onClick={() => renewSubscription()}>Renew Membership</Button>) : (<Button onClick={() => handleSubscriptionCancel()}>Cancel Membership</Button>) } */}
      {/* <Button onClick={() => handleSubscriptionCancel()}>Cancel Membership</Button> */}
      {subscriptionData.status ? (
        <Button onClick={() => handleSubscriptionCancel()}>
          Cancel Membership
        </Button>
      ) : (
        <Button onClick={() => redirect("/pricing")}>Renew Membership</Button>
      )}
    </div>
  );
}

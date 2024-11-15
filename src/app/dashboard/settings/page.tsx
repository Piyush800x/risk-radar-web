"use client";
import { useState, useEffect } from "react";
import Stripe from "stripe";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import EmailNotificationButton from "@/components/Settings/EmailNotificationButton";

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

export default function Settings() {
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionResponse>();
  const { user, isAuthenticated } = useKindeBrowserClient();
  const [loading, setLoading] = useState<boolean>(true);
  // const [planType, setPlanType] = useState<string>();
  // const [planDesc, setPlanDesc] = useState<string>();
  // const [subsStatus, setSubsStatus] = useState<boolean>();
  const [emailingStatus, setEmailingStatus] = useState<boolean>();
  const [btnState, setBtnState] = useState<boolean>(false);
  // const getSubscriptioStatus = async (data: SubscriptionResponse) => {
  //   if (data?.status == "active") {
  //     setSubsStatus(true)
  //   }
  //   else {
  //     setSubsStatus(false);
  //   }
  // };

  const fetchSubscriptionData = async () => {
    console.log(loading);
    setLoading(true);
    try {
      const response = await fetch("/api/subscription/get-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authId: user?.id }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(JSON.stringify(data));
        setSubscriptionData(data.response);
        // setPlanType(data.planType);
        setBtnState(data.planType == "Standard" || data.planType == "Premium" ? false : true)
        // setPlanDesc(data.desc);
        // getSubscriptioStatus(data.response);
        setEmailingStatus(data.emailingStatus);
      } else {
        console.error("Failed to fetch subscription details");
      }
    } catch (error) {
      toast.error("Can't fetch Billing details\nTry again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubscriptionData();
    }
  }, [isAuthenticated]);

  if (!subscriptionData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-4 px-5 w-full flex flex-col justify-center">
      <h1 className="text-neutral-600 text-lg font-semibold dark:invert">
        Settings
      </h1>
      <div className="mt-6">
        <div className="flex justify-between items-center text-neutral-900 text-3xl font-semibold tracking-wide">
          <span className="dark:text-white">Welcome, {user?.given_name}</span>
        </div>
        <span className="text-neutral-700 text-lg font-medium tracking-wide dark:invert">
          Manage your all settings here
        </span>
      </div>

      <div className="flex justify-between items-center my-4 py-3 px-4 bg-[#F4F4F4] dark:bg-[#151515] rounded-lg border border-[#BCBCBC] dark:border-[#353535]">
        <h1 className="text-lg font-medium">Email notifications</h1>
        <EmailNotificationButton
          btnState={btnState}
          authId={user?.id ? user.id : ""}
          status={!emailingStatus!}
          activeStatus={emailingStatus!}
        />
      </div>
    </div>
  );
}

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
  const [planType, setPlanType] = useState<string>();
  const [planDesc, setPlanDesc] = useState<string>();
  const [subsStatus, setSubsStatus] = useState<boolean>();
  const [emailingStatus, setEmailingStatus] = useState<boolean>();

  const getSubscriptioStatus = async (data: SubscriptionResponse) => {
    if (data?.status == "active") {
      setSubsStatus(true);
    } else {
      setSubsStatus(false);
    }
  };

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
        console.log(JSON.stringify(data));
        setSubscriptionData(data.response);
        setPlanType(data.planType);
        setPlanDesc(data.desc);
        getSubscriptioStatus(data.response);
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
    <>
      <h1>Settings</h1>
      <EmailNotificationButton authId={user?.id!} planType={planType!} status={!emailingStatus!} activeStatus={emailingStatus!}/>
    </>
  );
}

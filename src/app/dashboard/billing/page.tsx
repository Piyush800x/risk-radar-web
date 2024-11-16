"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Stripe from "stripe";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import ChangePlan from "@/components/ChangePlan";

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

interface CardLogoProps {
  brand: string;
}

export default function Billing() {
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionResponse>();
  const { isAuthenticated, user } = useKindeBrowserClient();
  const [loading, setLoading] = useState<boolean>(true);
  const [planType, setPlanType] = useState<string>();
  const [planDesc, setPlanDesc] = useState<string>();
  const [invoiceURL, setInvoiceURL] = useState<string>();
  // const [subscriptionId, setSubscriptionId] = useState<string>();
  const [cardBrand, setCardBrand] = useState();
  const [subsStatus, setSubsStatus] = useState<boolean>();

  const getSubscriptioStatus = async (data: SubscriptionResponse) => {
    if (data?.status == "active") {
      setSubsStatus(true);
    } else {
      setSubsStatus(false);
    }
  };

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
        console.log(JSON.stringify(data.response));
        setSubscriptionData(data.response);
        setPlanType(data.planType);
        setPlanDesc(data.desc);
        setInvoiceURL(data.invoiceURL);
        // setSubscriptionId(data.response.items[0].subscription)
        setCardBrand(data.response.billingMethod.brand);
        getSubscriptioStatus(data.response);
      } else {
        console.error("Failed to fetch subscription details");
      }
    } catch (error) {
      toast.error("Can't fetch Billing details\nTry again later");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };
  // const date = new Date();

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

  // Need to use this in Popup of Change Plan: create ChangePlan.tsx

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
    return (
      <div className="py-4 px-5 w-full flex flex-col justify-center">
        {/* Titles and stuffs */}
        <h1 className="text-neutral-600 text-lg font-semibold dark:invert">
          Billing
        </h1>
        <div className="mt-6 flex flex-col text-neutral-900 text-3xl">
          <Skeleton className="dark:text-white font-semibold h-16 w-1/3"></Skeleton>
        </div>

        {/* Main skeleton */}
        <div className="m-2 grid grid-cols-1 gap-2 w-full mt-10">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 mt-4" />
          <Skeleton className="h-16 mt-9" />
          <Skeleton className="h-16 w-1/6 mt-4" />
          <div className="w-full flex justify-end">
            <Skeleton className="h-12 mt-4 w-1/5" />
          </div>
        </div>
      </div>
    );
  }

  // Mapping of card brands to logo image paths
  const cardLogos: { [key: string]: string } = {
    visa: "/card_brands/visa.svg",
    mastercard: "/card_brands/mastercard.svg",
    "american express": "/card_brands/american.svg",
    discover: "/card_brands/discover.svg",
    unknown: "/card_brands/ugnknwon.svg",
  };

  const CardLogo: React.FC<CardLogoProps> = ({ brand }) => {
    const logoPath =
      cardLogos[brand.toLowerCase()] || "/path/to/default-logo.png";

    return (
      <div className="flex items-center">
        <Image
          src={logoPath}
          alt={`${brand} logo`}
          width={40}
          height={40}
          className="h-10 w-10"
        />
      </div>
    );
  };

  // const cardBrand = subscriptionData.billingMethod.brand;

  return (
    <div className="py-4 px-8 w-full flex flex-col justify-center gap-8">
      {/* Heading text and tab info */}
      <div className="text-neutral-900 text-3xl font-semibold tracking-wide">
        <h1 className="text-neutral-600 text-lg font-semibold dark:invert">
          Billing
        </h1>
        <div className="flex flex-col mt-8">
          <span className="dark:text-white">Welcome, {user?.given_name}</span>
          <span className="text-neutral-700 text-lg font-medium tracking-wide dark:invert">
            Manage your billings here
          </span>
        </div>
      </div>

      <div className="flex w-full items-center justify-between">
        {/* Status and change plan */}
        <div className="">
          {/* Plantype name and description */}
          <div>
            {/* Plan type name and status indicator */}
            <div className="flex items-center gap-2">
              <p className="text-xl font-semibold">{planType} Plan</p>
              <div
                className={`w-max h-8 px-4 py-1 ${
                  subscriptionData.status === "active"
                    ? "bg-green-500/5 dark:border-lime-950"
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
          <p className="text-zinc-400 sm:w-max w-2/3">{planDesc}</p>
        </div>
        {/* Change plan button */}

        <Drawer>
          <DrawerTrigger>
            <Button variant={"secondary"}>Change Plan</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="flex flex-col items-center">
              <DrawerTitle>Select plan</DrawerTitle>
              <DrawerDescription>
                Click on buy now to change your current plan to another one
              </DrawerDescription>
            </DrawerHeader>
            <ChangePlan />
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      {/* period information */}
      <div className="flex justify-between items-center">
        {/* Period end date */}
        <div>
          <p className="text-2xl font-medium">
            {formatDate(new Date(subscriptionData.currentPeriodEnd * 1000))}
          </p>
          <p className="text-neutral-400">Current Period End</p>
        </div>

        {/* Last invoice date */}
        <div className="flex flex-col justify-end items-end">
          <p className="text-2xl font-medium">
            ${Number(subscriptionData.items[0].plan.amount) / 100}
          </p>
          <p className="text-neutral-400">
            {formatDate(
              new Date(subscriptionData.items[0].price.created * 1000)
            )}{" "}
            - Last invoice
          </p>
        </div>
      </div>

      <Separator />

      {/* Acc and card details */}
      <div className="flex justify-between items-center">
        {/* Full name and Email */}
        <div>
          <p className="sm:text-xl">
            {user?.given_name} {user?.family_name}
          </p>
          <p className="sm:text-lg">{user?.email}</p>
        </div>

        {/* Invoice download button */}
        <div>
          <Link target="_blank" href={`${invoiceURL}`}>
            <Button variant={"secondary"}> Download Invoice</Button>
          </Link>
        </div>
      </div>

      {/* Card details */}
      <div className="">
        <div className="flex gap-2 items-center">
          <CardLogo brand={cardBrand!} />
          <p className="font-medium">
            {subscriptionData.billingMethod?.brand
              ? `**** **** **** ${subscriptionData.billingMethod.last4}`
              : "No billing method found"}
          </p>
        </div>

        <p>Country: {subscriptionData.billingMethod?.country}</p>
      </div>

      {/* {subscriptionData.status ? (<Button onClick={() => renewSubscription()}>Renew Membership</Button>) : (<Button onClick={() => handleSubscriptionCancel()}>Cancel Membership</Button>) } */}
      {/* <Button onClick={() => handleSubscriptionCancel()}>Cancel Membership</Button> */}
      <div className="flex justify-end">
        {subsStatus ? (
          <Button
            className="text-red-500 dark:bg-red-900/20 bg-red-100"
            onClick={() => handleSubscriptionCancel()}
          >
            Cancel Membership
          </Button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

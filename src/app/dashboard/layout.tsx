"use client";

import NavBar from "@/components/NavBar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Loader } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, user } = useKindeBrowserClient();
  const [loading, setLoading] = useState<boolean>(true);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  // Map routes to tab titles
  const pageTitles: Record<string, string> = {
    "/dashboard/home": "Dashboard | Home",
    "/dashboard/settings": "Dashboard | Settings",
    "/dashboard/notifications": "Dashboard | Notifications",
    "/dashboard/billing": "Dashboard | Billing",
  };

  useEffect(() => {
    // Set the page title dynamically based on the route
    const defaultTitle = "Dashboard";
    document.title = pageTitles[pathname] || defaultTitle;
  }, [pathname]); // Update title whenever the route changes

  // Check if the subscription is valid
  const checkVerification = (unixTimestamp: number) => {
    const currentUnixTime = Math.floor(Date.now() / 1000); // Current Unix time in seconds
    if (unixTimestamp <= currentUnixTime) {
      setIsVerified(false); // Mark as unverified if the subscription has expired
    } else {
      setIsVerified(true); // Mark as verified
    }
  };

  // Fetch subscription details
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
        checkVerification(data.response.currentPeriodEnd);
      } else {
        setIsVerified(false);
        console.error("Failed to fetch subscription details");
      }
    } catch (error) {
      toast.error(
        "Unable to fetch subscription details. Please try again later."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubscriptionData();
    } else if (!isLoading) {
      // Redirect unauthenticated users to root
      toast.error("Please register/login to access the dashboard.");
      router.push("/");
    }
  }, [isAuthenticated, isLoading]);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      if (!isVerified) {
        toast.error(
          "You must have a valid subscription to access the dashboard!"
        );
        router.push("/"); // Redirect to root
      }
    }
  }, [isVerified, isAuthenticated, loading, router]);

  if (isLoading || loading) {
    return (
      <div className="flex flex-col w-full h-screen items-center justify-center">
        <Loader className="animate-spin size-10" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to root immediately if not authenticated
    return null;
  }

  return (
    <>
      <NavBar />
      <SidebarProvider>
        <AppSidebar />
        <div className="flex w-full">
          <div className="w-full">
            <SidebarTrigger className="fixed bottom-1/2 z-99" />
            {children}
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}

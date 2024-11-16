"use client";
import { useEffect, useState } from "react";
import { LandingPage } from "@/components/LandingPage/LandingPage";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Loader } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const { user, isAuthenticated } = useKindeBrowserClient();

  const checkuser = async () => {
    setLoading(true);
    const userData = {
      authId: user?.id,
      authEmailId: user?.email,
      userFirstName: user?.given_name,
      userLastName: user?.family_name,
    };

    try {
      const req = await fetch("/api/check-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      await req.json();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkuser();
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="flex flex-col w-full h-screen items-center justify-center">
        <Loader className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div>
      <LandingPage />
    </div>
  );
}

"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import * as React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";
import Pricing from "./Pricing";

export function LandingPage() {
  const { isAuthenticated } = useKindeBrowserClient();

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {isAuthenticated && (
        <>
          <h1>Successfully Logged in, redirecting you to Dashboard...</h1>
          {redirect("/dashboard/home")}
        </>
      )}

      {!isAuthenticated && (
        <>
          <Pricing/>  
        </>
      )}
    </div>
  );
}

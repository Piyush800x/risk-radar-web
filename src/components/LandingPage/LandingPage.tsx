"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import * as React from "react";
import { redirect } from "next/navigation";
import LandingNavBar from "./sections/LandingNavBar";
import Hero from "./sections/Hero";
import { useTheme } from "next-themes";
import NavBar from "../NavBar";
import Features from "./sections/Features";

export function LandingPage() {
  const { isAuthenticated } = useKindeBrowserClient();
  const { setTheme } = useTheme();

  setTheme("dark");

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {isAuthenticated && (
        <>
          <h1>Successfully Logged in, redirecting you to Dashboard...</h1>
          {redirect("/dashboard/home")}
        </>
      )}

      {!isAuthenticated && (
        // Main div
        <div>
          {/* ALl sections div without Footer */}
          <div className="sm:mx-40 mx-8 ">
            {/* <NavBar /> */}
            <LandingNavBar />
            <Hero />
            <Features />
          </div>
        </div>
      )}
    </div>
  );
}

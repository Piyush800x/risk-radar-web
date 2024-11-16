"use client";

import * as React from "react";
import LandingNavBar from "./sections/LandingNavBar";
import Hero from "./sections/Hero";
import { useTheme } from "next-themes";
import Features from "./sections/Features";
import Trust from "./sections/Trust";
import LandingPricing from "./sections/LandingPricing";
import Footer from "./sections/Footer";
import Faq from "./sections/Faq";

export function LandingPage() {
  const { setTheme } = useTheme();

  setTheme("dark");

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <div>
        {/* ALl sections div without Footer */}
        <div className="sm:mx-40 mx-4">
          {/* <NavBar /> */}
          <LandingNavBar />
          <Hero />
          <div id="features">
            <Features />
          </div>
          <div id="trust">
            <Trust />
          </div>
          <div id="pricing">
            <LandingPricing />
          </div>
          <Faq />
        </div>
        <Footer />
      </div>
    </div>
  );
}

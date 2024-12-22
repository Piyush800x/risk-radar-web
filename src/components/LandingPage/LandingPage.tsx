"use client";

import { useState, useEffect } from "react";
import LandingNavBar from "./sections/LandingNavBar";
import Hero from "./sections/Hero";
import { useTheme } from "next-themes";
import Features from "./sections/Features";
import Trust from "./sections/Trust";
import LandingPricing from "./sections/LandingPricing";
import Footer from "./sections/Footer";
import Faq from "./sections/Faq";
import { Button } from "../ui/button";
import { ChevronUp } from "lucide-react";
import Info from "./sections/Info";

export function LandingPage() {
  const { setTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  setTheme("dark");

  return (
    <div className="flex flex-col min-h-[100dvh] select-none">
      <div>
        {/* ALl sections div without Footer */}
        <div className="sm:mx-40 mx-4">
          {/* <NavBar /> */}
          <LandingNavBar />
          <Hero />
          <div id="info">
            <Info />
          </div>
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

      {isVisible && (
        <Button
          className="fixed w-10 h-10 bottom-5 right-5 bg-white/20 text-white p-3 rounded-full shadow-lg hover:bg-white/40 transition duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ChevronUp />
        </Button>
      )}
    </div>
  );
}

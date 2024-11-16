"use client";

import Footer from "@/components/LandingPage/sections/Footer";
import LandingNavBar from "@/components/LandingPage/sections/LandingNavBar";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function NotFound() {
  const { setTheme } = useTheme();

  setTheme("dark");
  return (
    <div className="flex flex-col justify-between h-dvh">
      <nav className="sm:mx-40 mx-4 h-full">
        <LandingNavBar />
        <div className="w-full h-full flex flex-col items-center justify-center text-center">
          <h1 className=" text-9xl font-bold bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF]/20 bg-clip-text text-transparent">
            404
          </h1>
          <h1 className="text-2xl font-medium">
            The requested page was not found.
          </h1>
          <h1 className="text-md">
            Consider checking the URL or trying again after few minutes
          </h1>
        </div>
      </nav>
      <Footer />
    </div>
  );
}

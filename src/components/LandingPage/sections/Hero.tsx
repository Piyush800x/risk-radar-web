import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

export default function Hero() {
  return (
    <div className="relative sm:mt-[120px] mt-[80px] flex flex-col justify-center items-center">
      {/* Hero text */}
      <div className="text-center">
        <h1 className="flex flex-col space-y-3">
          <span className="sm:text-7xl text-5xl font-medium">
            Stay Ahead of Threats
          </span>
          <span className="sm:text-6xl text-3xl font-medium">
            with{" "}
            <span className="font-bold bg-gradient-to-r from-[#FFFFFF] to-[#9999998F]/55 bg-clip-text text-transparent">
              Risk Radar
            </span>
          </span>
        </h1>
        <h1 className="text-zinc-400 mt-4 sm:text-md text-sm">
          Real-time Vulnerability Insights to Safeguard Your Products
        </h1>
      </div>

      {/* CTA buttons */}
      <div className="sm:mt-[70px] mt-[30px] flex sm:gap-5 gap-1 ">
        <Link href={"/#pricing"}>
          <Button size={"lg"} className="font-semibold">
            See Plans
          </Button>
        </Link>

        <RegisterLink>
          <Button
            variant={"secondary"}
            size={"lg"}
            className="font-semibold border border-neutral-700"
          >
            Get Started
          </Button>
        </RegisterLink>
      </div>

      {/* Gradient */}
      <div className="absolute sm:w-3/4 sm:h-96 w-1/2 h-60 bg-neutral-500/25 rounded-full blur-3xl -z-50" />

      {/* Hero image */}
      <div className="sm:mt-20 mt-10">
        <Image
          height={500}
          width={1200}
          alt="hero image"
          className=""
          src={"/hero_image.png"}
        />
      </div>
    </div>
  );
}

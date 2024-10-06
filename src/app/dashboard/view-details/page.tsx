"use client";

import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function ViewDetails() {
  const searchParams = useSearchParams();

  const productName = searchParams.get("product");
  const version = searchParams.get("version");
  return (
    <>
      <NavBar />
      <h1 className="text-xl pb-4">
        All vulnerabilities of <span className="font-bold">{productName}</span>{" "}
        version <span className="font-bold">{version}</span>:
      </h1>

      <div className="bg-[#FFBDBD] dark:bg-[#FF6565]/20 p-4 rounded-md flex flex-col justify-between mb-4">
        <div className="flex justify-between items-start w-full">
          <div>
            <h1 className="text-lg font-semibold">CVE ID: CVE-2023-25280</h1>
            <h1>
              OS Command injection vulnerability in D-Link DIR820LA1_FW105B03
              allows attackers to escalate privileges to root via a crafted
              payload with the ping_addr parameter to ping.ccp.
            </h1>
          </div>
          <div className="flex gap-1 items-center">
            <Image
              src={"/red_ellipse.svg"}
              height={20}
              width={20}
              alt="red_ellipse"
            />
            <h1 className="font-semibold">Critical</h1>
          </div>
        </div>
        <div className="flex w-full justify-end mt-8">
          <Button className="bg-[#fafafa] text-[#000000] hover:bg-[#fafafa]/90">
            Learn more
          </Button>
        </div>
      </div>

      <div className="bg-[#FFC986] dark:bg-[#DB8F00]/40 p-4 rounded-md flex flex-col justify-between">
        <div className="flex justify-between items-start w-full">
          <div>
            <h1 className="text-lg font-semibold">CVE ID: CVE-2023-25280</h1>
            <h1>
              OS Command injection vulnerability in D-Link DIR820LA1_FW105B03
              allows attackers to escalate privileges to root via a crafted
              payload with the ping_addr parameter to ping.ccp.
            </h1>
          </div>
          <div className="flex gap-1 items-center">
            <Image
              src={"/yellow_ellipse.svg"}
              height={20}
              width={20}
              alt="yellow_ellipse"
            />
            <h1 className="font-semibold">High</h1>
          </div>
        </div>
        <div className="flex w-full justify-end mt-8">
          <Button className="bg-[#fafafa] text-[#000000] hover:bg-[#fafafa]/90">
            Learn more
          </Button>
        </div>
      </div>
    </>
  );
}

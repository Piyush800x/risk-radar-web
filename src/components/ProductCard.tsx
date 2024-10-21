"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function ProductCard() {
  return (
    <>
      <div className="flex flex-wrap gap-14 p-4 bg-[#F4F4F4] dark:bg-[#2D2D2D] rounded-lg border border-[#BCBCBC] dark:border-[#434343] transition-transform transform hover:scale-105 hover:shadow-lg">
        <div className=" justify-between gap-16">
          <div>
            <h1 className="text-xl font-semibold max-w-30">
              Mircrosoft Edge
            </h1>
            <h1 className="">128.0.21451.8</h1>
          </div>

          <div className="font-semibold mt-3">
            <h1 className="flex gap-1 ">
              <Image
                src={"/red_ellipse.svg"}
                height={20}
                width={20}
                alt="red_ellipse"
              />
              Critical: 15
            </h1>
            <h1 className="flex gap-1">
              <Image
                src={"/yellow_ellipse.svg"}
                height={20}
                width={20}
                alt="yellow_ellipse"
              />
              High: 15
            </h1>
          </div>
        </div>

        <div className="w-full flex justify-end">
          <Link
            href={"/dashboard/view-details?product=google%20chrome&version=91"}
          >
            <Button>View Details</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

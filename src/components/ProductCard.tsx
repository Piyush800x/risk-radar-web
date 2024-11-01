"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";

interface Props {
  vendorName: string;
  productName: string;
  productVersion: string
  criticalCount: number
  highCount: number
  objId: string
}

export default function ProductCard({vendorName, productName, productVersion, criticalCount, highCount, objId}: Props) {
  const {isAuthenticated, user} = useKindeBrowserClient();

  const removeProduct = async () => {
    if (isAuthenticated) {
      const data = {
        userAuthId: user?.id,
        productObjId: objId,
        vendorName,
        productName,
        productVersion
      }

      const req = await fetch("/api/remove-product", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify(data)
      });

      const resp = await req.json();

      if (resp.success) {
        toast.success("Product deleted successfully!")
      }
      else {
        toast.error("Can't delete product!\nTry again later")
      }

    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-14 p-4 bg-[#F4F4F4] dark:bg-[#2D2D2D] rounded-lg border border-[#BCBCBC] dark:border-[#434343] transition-transform transform hover:scale-105 hover:shadow-lg">
        <div className=" justify-between gap-16">
          <div>
            <h1 className="text-xl font-semibold max-w-30">
              {vendorName} | {productName}
            </h1>
            <h1 className="">{productVersion}</h1>
          </div>

          <div className="font-semibold mt-3">
            <h1 className="flex gap-1 ">
              <Image
                src={"/red_ellipse.svg"}
                height={20}
                width={20}
                alt="red_ellipse"
              />
              Critical: {criticalCount}
            </h1>
            <h1 className="flex gap-1">
              <Image
                src={"/yellow_ellipse.svg"}
                height={20}
                width={20}
                alt="yellow_ellipse"
              />
              High: {highCount}
            </h1>
          </div>
        </div>

        <div className="w-full flex justify-end">
          <Link
            // href={"/dashboard/view-details?product=google%20chrome&version=91"}
            href={{
              pathname:"/dashboard/view-details", 
              query: {
                productName: productName,
                productVersion: productVersion,
                objId: objId
              }
            }}
          >
            <Button>View Details</Button>
          </Link>
        </div>

        <div>
          <button onClick={() => {
            removeProduct()
          }}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

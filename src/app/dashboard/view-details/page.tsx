"use client";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ObjectId } from "mongodb";
import { useState, useEffect } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface CVEData {
  cveId: string;
  aiSolution: string;
  epssScore: string;
  maxCvssBaseScore: string;
  nvdVulnStatus: string;
}

export default function ViewDetails() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const {isAuthenticated, user} = useKindeBrowserClient();

  const productName = searchParams.get("productName");
  const version = searchParams.get("productVersion");
  // const cveResultsString = searchParams.get("cveResults");
  const objId = searchParams.get("objId");

  const [cveResults, setCveResults] = useState<CVEData[]>([]);

  const fetchData = async () => {
    setLoading(true);
    if (user) {
      const data = {
        objId: objId
      }
      try {
        const req = await fetch("/api/get-cveresults", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        });
        const res = await req.json();
        setCveResults(res.data[0].cveResults);
        console.log(`cve: ${JSON.stringify(res.data[0].cveResults)}`);
  
        }
        catch (error) {
          console.error(error);
        }  
    }
    setLoading(false);
  }
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      console.log(objId);
    }
  
  }, [isAuthenticated, user]);

  // useEffect(() => {
  //   if (cveResultsString) {
  //     setCveResults(JSON.parse(cveResultsString));
  //     console.log(JSON.stringify(cveResultsString));
  //   }
  // }, [cveResultsString]);

  if (loading) {
    return <h1>Loading</h1>
  }

  return (
    <>
    <div>
      <NavBar />
      <h1 className="text-xl pb-4">
        All vulnerabilities of <span className="font-bold">{productName}</span>{" "}
        version <span className="font-bold">{version}</span>:
      </h1>

      {cveResults.map((cve, index) => (
        <div
          key={index}
          className={`p-4 rounded-md flex flex-col justify-between mb-4 ${
            Number(cve.maxCvssBaseScore) >= 9 ? "bg-[#FFBDBD] dark:bg-[#FF6565]/20" : "bg-[#FFC986] dark:bg-[#DB8F00]/40"
          }`}
        >
          <div className="flex justify-between items-start w-full">
            <div>
              <h1 className="text-lg font-semibold">CVE ID: {cve.cveId}</h1>
              <h1>{cve.aiSolution}</h1>
            </div>
            <div className="flex gap-1 items-center">
              <h1 className="font-semibold">{(Number(cve.maxCvssBaseScore))}</h1>
              <Image
                src={Number(cve.maxCvssBaseScore) >= 9 ? "/red_ellipse.svg" : "/yellow_ellipse.svg"}
                height={20}
                width={20}
                alt={Number(cve.maxCvssBaseScore) >= 9 ? "red_ellipse" : "yellow_ellipse"}
              />
              <h1 className="font-semibold">{(Number(cve.maxCvssBaseScore) >= 9) ? "Critical" : "High"}</h1>
            </div>
          </div>
          <div className="flex w-full justify-end mt-8">
            <Button className="bg-[#fafafa] text-[#000000] hover:bg-[#fafafa]/90">
              Learn more
            </Button>
          </div>
        </div>
      ))}
      {/* <div className="bg-[#FFBDBD] dark:bg-[#FF6565]/20 p-4 rounded-md flex flex-col justify-between mb-4">
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
      </div> */}
      </div>
    </>
  );
}

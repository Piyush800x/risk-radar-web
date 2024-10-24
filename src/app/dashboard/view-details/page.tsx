"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ObjectId } from "mongodb";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface CVEData {
  cveId: string;
  aiSolution: string;
  epssScore: string;
  maxCvssBaseScore: string;
  nvdVulnStatus: string;
}

export default function ViewDetails() {
  const searchParams = useSearchParams();

  const productName = searchParams.get("productName");
  const version = searchParams.get("productVersion");
  const cveResultsString = searchParams.get("cveResults");

  const [cveResults, setCveResults] = useState<CVEData[]>([]);

  useEffect(() => {
    if (cveResultsString) {
      setCveResults(JSON.parse(cveResultsString));
      console.log(JSON.stringify(cveResultsString));
    }
  }, [cveResultsString]);

  return (
    <>
      <div className="mx-4">
        <h1 className="text-xl pb-4">
          All vulnerabilities of{" "}
          <span className="font-bold">{productName}</span> version{" "}
          <span className="font-bold">{version}</span>:
        </h1>

        {cveResults.map((cve, index) => (
          <div
            key={index}
            className={`p-4 rounded-md flex flex-col justify-between mb-4 mx-3 ${
              Number(cve.maxCvssBaseScore) >= 9
                ? "bg-[#ffabab] dark:bg-[#FF6565]/20"
                : "bg-[#FFC986] dark:bg-[#DB8F00]/30"
            }`}
          >
            <div className="flex flex-col-reverse gap-2 sm:flex sm:flex-row sm:justify-between sm:items-start">
              {/* CVE Id and AISummary */}
              <div className="">
                <h1 className="text-lg font-semibold">CVE ID: {cve.cveId}</h1>
                <div className="prose dark:invert flex flex-col w-full">
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      ),
                    }}
                    className={"overflow-hidden"}
                  >
                    {cve.aiSolution}
                  </ReactMarkdown>
                </div>
              </div>

              {/* CVSS Score and indicator */}
              <div className="flex gap-1 items-center">
                <h1 className="font-semibold">
                  {Number(cve.maxCvssBaseScore)}
                </h1>
                <Image
                  src={
                    Number(cve.maxCvssBaseScore) >= 9
                      ? "/red_ellipse.svg"
                      : "/yellow_ellipse.svg"
                  }
                  height={20}
                  width={20}
                  alt={
                    Number(cve.maxCvssBaseScore) >= 9
                      ? "red_ellipse"
                      : "yellow_ellipse"
                  }
                />
                <h1 className="font-semibold">
                  {Number(cve.maxCvssBaseScore) >= 9 ? "Critical" : "High"}
                </h1>
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

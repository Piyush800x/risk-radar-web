"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import ViewDetailsComp from "@/components/ViewDetailsComp";
import { Skeleton } from "@/components/ui/skeleton";

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
  const { isAuthenticated, user } = useKindeBrowserClient();

  const productName = searchParams.get("productName");
  const version = searchParams.get("productVersion");
  // const cveResultsString = searchParams.get("cveResults");
  const objId = searchParams.get("objId");

  const [cveResults, setCveResults] = useState<CVEData[]>([]);

  const fetchData = async () => {
    setLoading(true);
    if (user) {
      const data = {
        objId: objId,
      };
      try {
        const req = await fetch("/api/get-cveresults", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await req.json();
        setCveResults(res.data[0].cveResults);
        console.log(`cve: ${JSON.stringify(res.data[0].cveResults)}`);
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
  };
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
    return (
      <div className="mx-6">
        <Skeleton className="text-xl mt-4 h-6 w-2/5"></Skeleton>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex flex-col gap-4 mt-8"> 
            <Skeleton className="h-52 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="mx-4">
        <h1 className="text-xl pb-4">
          All vulnerabilities of{" "}
          <span className="font-bold">{productName}</span> version{" "}
          <span className="font-bold">{version}</span>:
        </h1>

        {cveResults.map((cve, index) => (
          <ViewDetailsComp cve={cve} index={index} key={cve.cveId} />
        ))}
      </div>
    </>
  );
}

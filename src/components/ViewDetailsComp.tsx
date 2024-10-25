import Image from "next/image";
import { Button } from "./ui/button";


interface CVEData {
    cveId: string;
    aiSolution: string;
    epssScore: string;
    maxCvssBaseScore: string;
    nvdVulnStatus: string;
}

interface Props {
    cve: CVEData;
    index: number;
}

export default function ViewDetailsComp({cve, index}: Props) {


    return (
        <div>
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
        </div>
    )
}
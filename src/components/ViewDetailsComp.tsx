'use client';
import Image from "next/image";
import { Button } from "./ui/button";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useState } from "react";

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
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
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
                    <div
                    className={`prose dark:invert flex flex-col w-full overflow-hidden transition-all duration-500 ${
                        isExpanded ? "max-h-max" : "max-h-48"
                    }`}
                    >
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
                    <Button className="bg-[#fafafa] text-[#000000] hover:bg-[#fafafa]/90" onClick={toggleExpand}>
                        See full solution
                    </Button>
                </div>
            </div>
        </div>
    )
}
import { NextRequest, NextResponse } from 'next/server';

// Define severity levels
const CRITICAL_SEVERITY = 9.0; // CVSS score for Critical starts from 9.0
const HIGH_SEVERITY = 7.0;     // CVSS score for High starts from 7.0

export async function POST(req: NextRequest) {
    const date = new Date();
    try {

        // Parse request body
        const { vendor, product, version } = await req.json();

        if (!vendor || !product || !version) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        // Query CVE Details API for vulnerabilities
        const response = await fetch(
        `https://www.cvedetails.com/api/v1/vulnerability/search?vendor=${vendor}&product=${product}&version=${version}&isInCISAKEV=1&resultsPerPage=40&year=${date.getFullYear.toString().slice(-2)}&month=${date.getMonth}`,
            {
                method: 'GET',
                headers: {
                'Authorization': `Bearer ${process.env.CVE_API_KEY}`, // Replace with the actual key from your environment variables
                'Accept': '*/*',
                },
            }
        );

        const data = await response.json();
        // console.log(data);
        const vulnerabilities = data.results;
        // Filter for Critical and High vulnerabilities based on CVSS scores
        let criticalCount = 0;
        let highCount = 0;
        const vulnerabilityDetails: any[] = [];

        vulnerabilities.forEach((vul: any) => {
            const cvssScore = parseFloat(vul.maxCvssBaseScore); // Assuming the response has a "cvss_score" field
            if (cvssScore >= CRITICAL_SEVERITY) {
                vulnerabilityDetails.push({
                    cve_id: vul.cveId,
                    summary: vul.summary,
                    cvss_score: vul.maxCvssBaseScore,
                    cve_url: `https://www.cvedetails.com/cve/${vul.cveId}/`, // CVE Details page link
                });
                criticalCount++;
            } else if (cvssScore >= HIGH_SEVERITY && cvssScore <= CRITICAL_SEVERITY) {
                vulnerabilityDetails.push({
                    cve_id: vul.cveId,
                    summary: vul.summary,
                    cvss_score: vul.maxCvssBaseScore,
                    cve_url: `https://www.cvedetails.com/cve/${vul.cveId}/`, // CVE Details page link
                });
                highCount++;
            }

            console.log(vulnerabilityDetails);
            console.log(`High: ${highCount}`);
            console.log(`Critical: ${criticalCount}`);
        });

        if (!response.ok) {
            return NextResponse.json({ message: 'Error fetching data from CVE API' }, { status: 500 });
        }

        return NextResponse.json({ vulnerabilityDetails, highCount: highCount, criticalCount: criticalCount }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}

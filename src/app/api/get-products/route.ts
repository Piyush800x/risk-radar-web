import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/lib/mongodb";
import { Db, MongoClient, ObjectId } from "mongodb";

interface Products {
    vendorName: string;
    productName: string,
    productVersion: string
}

interface User {
    _id: ObjectId;
    authId: string;
    authEmailId: string;
    userFirstName: string;
    userLastName: string;
    products: Products[]
}

interface CVEData {
    _id: ObjectId;
    vendorName: string;
    productName: string;
    productVersion: string;
    critical: number;
    cveResults: {
        aiSolution: string;
        cveId: string;
        epssScore: string;
        maxCvssBaseScore: string;
        nvdVulnStatus: string;
    }[];
}

export async function POST(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await mongoClientPromise;
    const db1: Db = client.db("UserData");
    const db2: Db = client.db("CVE-Data");
    
    try {
        const data = await req.json();

        const user: User | null = await db1.collection('userdata').findOne({authId: data.authId});
        if (!user) {
            return NextResponse.json({success: false, message: "No user found!"}, {status: 404});
        }

        const products: Products[] = user?.products;

        // Initialize an array to hold CVE data
        let cveData: CVEData[] = [];

        // Loop through each product and fetch CVE data from the CVE-Data collection
        for (const product of products) {
            const cveResult = await db2.collection('cve').findOne({
                vendorName: product.vendorName,
                productName: product.productName,
                productVersion: product.productVersion,
            });
            console.log(`cveResult: ${cveResult}`);
            if (cveResult) {
                cveData.push(cveResult);
            }
        }
        console.log(`cveData: ${cveData}`);
        // Return the CVE data found
        return NextResponse.json(cveData, { status: 200 });

    }
    catch (error) {
        console.error("Error fetching data: ", error);
        return NextResponse.json({message: "Internal Server Error!"}, {status: 500});
    }    

}
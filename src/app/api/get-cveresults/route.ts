import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/lib/mongodb";
import { Db, MongoClient, ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
    const data = await req.json();
    console.log(`_id: ${data.objId}`)
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("CVE-Data");

    try {
        const cveResults = await db.collection("cve").find({
            _id: new ObjectId(`${data.objId}`)
        }).toArray();
        console.log(`API: ${JSON.stringify(cveResults)}`);
        return NextResponse.json({data: cveResults, success: true}, {status: 200});
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({success: false}, {status: 500});
    }
}
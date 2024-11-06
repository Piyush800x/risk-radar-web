import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/lib/mongodb";
import { Db, Collection, MongoClient, ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("UserData");
    const collection: Collection = db.collection("userdata");

    const data = await req.json();

    try {
        const user = await collection.findOne({"authId": data.authId});
        console.log(JSON.stringify(user));
        return NextResponse.json({success: true, data: user});
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({success: false});
    }
    
}
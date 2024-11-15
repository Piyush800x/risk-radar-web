import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/lib/mongodb";
import { MongoClient, Db, Collection } from "mongodb";


interface Notification {
    id: string;
    header: string;
    time: string;
}

interface UserDocument {
    authEmailId: string;
    notifications: Notification[];
}

export async function POST(req: NextRequest) {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("UserData");
    const collection: Collection<UserDocument> = db.collection("userdata");

    const data = await req.json();

    try {
        const result = await collection.updateOne(
            { "authId": data.authId },
            { "$pull": { "notifications": { "id": data.id } } }
        );
        if (result.modifiedCount > 0) {
            console.log("Notification removed successfully.");
            return NextResponse.json({success: true})
        } else {
            console.log("No matching notification found.");
            return NextResponse.json({success: false})
        }
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({success: false})
    }
}
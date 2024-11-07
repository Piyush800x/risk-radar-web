import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/lib/mongodb";
import { MongoClient, Db, Collection, ObjectId } from "mongodb";

interface Products {
    vendorName: string;
    productName: string,
    productVersion: string
}

interface Notification {
    id: string;
    header: string;
    time: string;
}

interface User {
    _id: ObjectId;
    authId: string;
    authEmailId: string;
    userFirstName: string;
    userLastName: string;
    products: Products[];
    notifications: Notification[];
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
            { "authEmailId": data.authEmailId },
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
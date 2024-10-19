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
    products: Products[];
}

export async function POST(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("UserData");

    const {authId, authEmailId, userFirstName, userLastName, ...data} = await req.json();
    const userDetails = {
        authId, authEmailId, userFirstName, userLastName
    }
    const productData: Products = {
        vendorName: data.vendorName,
        productName: data.productName,
        productVersion: data.selectedVersion
    }
    console.log(`userDetails: ${JSON.stringify(userDetails)}`);

    // To check if any users exists else create one
    const checkUserUrl = new URL('/api/check-user', req.nextUrl.origin);
    const response = await fetch(checkUserUrl.toString(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(userDetails)
    });
    console.log(`check-user response ${JSON.stringify(response)}`);

    if (response) {
        try {
            const updatedUser = await db.collection('userdata').updateOne(
                {
                    authId: authId
                },
                {
                    $push: {products: productData}
                },
                {upsert: true}
            );

            if (updatedUser.modifiedCount > 0) {
                return NextResponse.json({success: true});
            }
            else {
                return NextResponse.json({success: false});
            }
        }
        catch (error) {
            return NextResponse.json({success: false});
        }
    }
    
}
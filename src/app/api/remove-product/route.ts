import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/lib/mongodb";
import { MongoClient, Db, Collection } from "mongodb";

interface Products {
    vendorName: string;
    productName: string,
    productVersion: string
}

export async function POST(req: NextRequest) {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("UserData");
    const collection: Collection<Document> = db.collection('userdata');

    const data = await req.json();

    const updateData: Products = {
        vendorName: data.vendorName,
        productName: data.productName,
        productVersion: data.productVersion,
    }
    // Pull the specified product from the products array
    const result = await collection.updateOne(
        { authId: data.userAuthId },
        {
          $pull: {products: updateData as Products},
        }
    );

    if (result.modifiedCount > 0) {
        return NextResponse.json({success: true}); 
    }
    else {
        return NextResponse.json({success: false});
    }
}
import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/lib/mongodb";
import { Db, MongoClient } from "mongodb";


export async function POST(req: NextRequest) {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("UserData");

    const data = await req.json();
    console.log(`CheckUser: ${JSON.stringify(data)}`);
    const userData = {
        authId: data.authId, 
        authEmailId: data.authEmailId, 
        userFirstName: data.userFirstName, 
        userLastName: data.userLastName,
        products: []
    }
    try {
        const user = await db.collection('userdata').findOne({authId: data.authId});
        if (!user){
            const insertedUser = await db.collection('userdata').insertOne(userData);
            if (insertedUser.insertedId) {
                return NextResponse.json({success: true})    
            }
        }
        else {
            return NextResponse.json({success: true})
        }
    }
    catch (error) {
        return NextResponse.json({success: false})
    }
    
}
import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/lib/mongodb";
import { Db, MongoClient } from "mongodb";

const FLASK_API_ENDPOINT = process.env.FLASK_API_ENDPOINT

interface Products {
    vendorName: string;
    productName: string,
    productVersion: string;
    productType: string;
}

interface UserData {
    authId: string;
    authEmailId: string;
    userFirstName: string;
    userLastName: string;
    products?: Products[];
}

export async function POST(req: NextRequest) {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("UserData");
    const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

    try {
        const {authId, authEmailId, userFirstName, userLastName, ...data} = await req.json();
        const userDetails = {
            authId, authEmailId, userFirstName, userLastName
        }
        const productData: Products = {
            vendorName: data.vendorName,
            productName: data.productName,
            productVersion: data.selectedVersion,
            productType: data.selectedProductType
        }
        console.log(`userDetails: ${JSON.stringify(productData)}`);
        console.log(`ProductData: ${JSON.stringify(productData)}`);
        // To check if any users exists else create one
        const checkUserUrl = new URL('/api/check-user', NEXT_PUBLIC_API_BASE_URL);
        const response = await fetch(checkUserUrl.toString(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails)
        });
        const res2 = await response.json();
        console.log(`check-user response ${JSON.stringify(res2)}`);

        if (res2.success) {
            // Checking if user already has that product or not
            const hasProduct = await checkIfUserAlreadyHasProduct(productData.vendorName, productData.productName, productData.productVersion, authId);
            if (hasProduct) {
                return NextResponse.json({success: false, message: "Product already exists"});
            }

            // Calling Flask API First
            const req = await fetch(`${FLASK_API_ENDPOINT}api/add-products-v2`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            });

            if (req.status === 429) {
                return NextResponse.json({success: false, message: "Too many requests! Please try again after a minute."}, {status: 429});
            }

            if (req.status === 500) {
                return NextResponse.json({success: false, message: "Internal server error"}, {status: 500});
            }

            const resp = await req.json();
            console.log(`RESP: ${JSON.stringify(resp["success"])}`)

            if (resp["success"]) {
                // Add Product to User Db
                const updatedUser = await db.collection<UserData>('userdata').updateOne(
                    {
                        authId: authId
                    },
                    {
                        $push: {products: productData as Products}
                    },
                    {upsert: true}
                );
                console.log(`modifiedCount: ${updatedUser.modifiedCount}`)
                if (updatedUser.modifiedCount > 0) {
                    return NextResponse.json({success: true, message: "Product added successfully!"});
                }
                else {
                    return NextResponse.json({success: false, message: "Couldn't add product.\nPlaese try again!"});
                }
            }
            else {
                return NextResponse.json({success: false, message: "Something went wrong!.\nPlaese try again!"});
            }
        }
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({success: false});
    }
}

const checkIfUserAlreadyHasProduct = async (vendorName: string, productName: string, productVersion: string, authId: string) => {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("UserData");
    const collection = db.collection("userdata");

    const user = await collection.findOne({
        authId,
        products: {
          $elemMatch: {
            vendorName,
            productName,
            productVersion,
          },
        },
    });
    
    if (user) {
        return true
    }
    else {
        false
    }
}
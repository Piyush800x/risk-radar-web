import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/lib/mongodb";
import { Db, MongoClient } from "mongodb";

const FLASK_API_ENDPOINT = process.env.FLASK_API_ENDPOINT

interface Products {
    vendorName: string;
    productName: string,
    productVersion: string
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
    const res2 = await response.json();
    console.log(`check-user response ${JSON.stringify(res2)}`);


    // await updateCVE(productData);
    // return NextResponse.json({success: true}); 
    if (res2.success) {
        try {
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
                const setCVE = await updateCVE(productData);
                console.log(`CVE: ${setCVE}`)
                if (setCVE) {
                    return NextResponse.json({success: true});
                }
                else {
                    return NextResponse.json({success: false});
                }
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

const updateCVE = async (productData: Products) => {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("CVE-Data");

    const list = ["application", "o", "hardware", "h", "a"]
    let active = true;
    let count = 0;
    try {
        // Calling to cvedetails api to fetch CVEID, Vuln details
        while (active && count < list.length - 1) {
            const response = await fetch(
                `https://www.cvedetails.com/api/v1/vulnerability/list-by-vpv?vendorName=${productData.vendorName}&productName=${productData.productName}&versionString=${productData.productVersion}&productType=${list[count]}`,
                    {
                        method: 'GET',
                        headers: {
                        'Authorization': `Bearer ${process.env.CVE_API_KEY}`, // Replace with the actual key from your environment variables
                        'Accept': 'application/json',
                        },
                    }
                );
            const res = await response.json();
            console.log(JSON.stringify(res));
            if (res.results.length == 0) {
                count += 1
            }
            else {
                active = false
            }
        }
        
        const response = await fetch(
            `https://www.cvedetails.com/api/v1/vulnerability/list-by-vpv?vendorName=${productData.vendorName}&productName=${productData.productName}&versionString=${productData.productVersion}&productType=${list[count]}`,
                {
                    method: 'GET',
                    headers: {
                    'Authorization': `Bearer ${process.env.CVE_API_KEY}`, // Replace with the actual key from your environment variables
                    'Accept': 'application/json',
                    },
                }
            );
        const res = await response.json();
        console.log(JSON.stringify(res));
        console.log(res.results.length);
        if (res.results.length == 0) {
            return false
        } 
        console.log(JSON.stringify(res.results[0].cveId))

        const data = {productData, ...res};
        // calling flask api
        const req = await fetch(`${FLASK_API_ENDPOINT}api/sort/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const res3 = await req.json();
        console.log(`Flask API : ${JSON.stringify(res3)}`);
        
        // Add solution using Gemini api here
        // const solution = await getSolution(res.results[0].summary, productData.vendorName, productData.productName);
        
        const insertedData = {
            vendorName: productData.vendorName,
            productName: productData.productName,
            productVersion: productData.productVersion,
            high: res3.high,
            critical: res3.critical,
            cveResults: res3.cveResults
        }
        // Saving to DB
        const result = await db.collection('cve').updateOne(
            {
                vendorName: productData.vendorName,
                productName: productData.productName,
                productVersion: productData.productVersion
            },
            {
                $set: insertedData
            },
            { upsert: true }
        );
        if (result.upsertedId || result.modifiedCount > 0) {
            return true;
        } else {
            return false;
        }
        // const inserQuery = await db.collection('cve').insertOne(insertedData);
        // if (inserQuery.insertedId) {
        //     return true;
        // }
        // else {
        //     return false;
        // }
    } catch (error) {
        console.log(error)
        return false;
    }
}

// const getSolution = async (summary: string, vendorName: string, productName: string) => {
//     const prompt = `
//         Here I have a product named ${productName} from ${vendorName}.
//         This product has a vulnerability and here is the summary: 
//         ${summary}.
//         I want you to give a straight forward solution so that end users can quickly understand what to do to fix the vulnerability.
//     `
//     const result = await geminiModel.generateContent(prompt);
//     console.log(result.response.text())
//     return result.response.text();
// }
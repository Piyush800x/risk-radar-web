import { NextRequest, NextResponse } from "next/server";

const FLASK_API_ENDPOINT = process.env.FLASK_API_ENDPOINT;


export async function POST(req: NextRequest) {
    const data = await req.json();
    console.log(JSON.stringify(data));
    try {
        const request = await fetch(`${FLASK_API_ENDPOINT}api/set-emailing-status`, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({authId: data.authId, status: data.status})
        });

        if (request.status === 429) {
            return NextResponse.json({status: 429});
        }
    
        const res = await request.json();
    
        if (res) {
            return NextResponse.json({status:200});
        }
        else {
            return NextResponse.json({status: 404});
        }
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({staus: 500});
    }
    
}
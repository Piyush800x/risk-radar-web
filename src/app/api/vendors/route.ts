import { NextRequest, NextResponse } from 'next/server';
import mongoClientPromise from '@/lib/mongodb';
import { Collection, Db, MongoClient } from 'mongodb';

export async function GET(req: NextRequest) {
  try {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("risk-radar");
    const collection: Collection = db.collection("vendors_prod");

    const vendors = await collection.distinct('vendorName')
    
    return NextResponse.json({ success: true, data: vendors });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return NextResponse.json({ success: false, message: error });
  }
}

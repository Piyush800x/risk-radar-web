import { NextRequest, NextResponse } from 'next/server';
import mongoClientPromise from '@/lib/mongodb';
import { Collection, Db, MongoClient } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("risk-radar");
    const collection: Collection = db.collection("scrapped_data_v1");
    const data = await JSON.parse(req.headers.get('Metadata') || '{}');
    console.log(`Data: ${JSON.stringify(data)}`);

    // const vendors = await collection.distinct('vendorName')
    const vendors = await collection.find({vendorName: {$regex: data, $options: 'i'}}).toArray();
    console.log(`VENDORS: ${vendors}`);

    return NextResponse.json({ success: true, data: vendors });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return NextResponse.json({ success: false, message: error });
  }
}

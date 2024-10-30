import { NextRequest, NextResponse } from 'next/server';
import mongoClientPromise from '@/lib/mongodb';
import { Collection, Db, MongoClient } from 'mongodb';


export async function GET(req: NextRequest, context: { params: { vendorName: string } }) {
  const { vendorName } = context.params;
  
  try {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("risk-radar");
    const collection: Collection = db.collection("scrapped_data_v1");
    
    // Find products for the selected vendor
    const vendor = await collection.findOne({ vendorName });
    
    if (!vendor) {
      return NextResponse.json({ success: false, message: 'Vendor not found' });
    }

    return NextResponse.json({ success: true, data: vendor.Products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ success: false, message: error });
  }
}

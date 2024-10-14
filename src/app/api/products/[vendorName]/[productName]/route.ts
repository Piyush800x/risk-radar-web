import { NextRequest, NextResponse } from 'next/server';
import mongoClientPromise from '@/lib/mongodb';
import { Collection, Db, MongoClient } from 'mongodb';

export async function GET(req: NextRequest, { params }: any) {
  const { vendorName, productName } = params;

  try {
    const client: MongoClient = await mongoClientPromise;
    const db: Db = client.db("risk-radar");
    const collection: Collection = db.collection("vendors_prod_final");

    // Find the product under the selected vendor
    const vendor = await collection.findOne({ vendorName });
    
    if (!vendor) {
      return NextResponse.json({ success: false, message: 'Vendor not found' });
    }

    const product = vendor.Products[productName];
    
    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' });
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('Error fetching versions:', error);
    return NextResponse.json({ success: false, message: error });
  }
}

import { MongoClient, ObjectId, Collection, Document, Db } from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your MongoDB URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let mongoClientPromise: Promise<MongoClient>;


// In production mode, create a new client for each request
client = new MongoClient(uri, options);
mongoClientPromise = client.connect();


export default mongoClientPromise;

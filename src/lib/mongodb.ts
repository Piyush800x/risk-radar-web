import { MongoClient} from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your MongoDB URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {};



// In production mode, create a new client for each request
const client: MongoClient = new MongoClient(uri, options);
const mongoClientPromise: Promise<MongoClient> = client.connect();


export default mongoClientPromise;

import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("Missing MONGO_URI in environment variables (.env)");
}

let client;
let clientPromise;

// Extend global type (safe for Next.js hot reload in dev)
/** @type {Promise<MongoClient> | undefined} */
let globalWithMongo = global;

if (process.env.NODE_ENV === "development") {
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect().then((client) => {
      console.log("✅ Connected to MongoDB (dev)");
      return client;
    });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect().then((client) => {
    console.log("✅ Connected to MongoDB (prod)");
    return client;
  });
}

export default clientPromise;

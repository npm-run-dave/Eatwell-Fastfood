// lib/dbconnect/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("❌ Please add MONGODB_URI in your .env");

const options = {
  maxPoolSize: 10, // efficient connection pooling
  serverSelectionTimeoutMS: 5000, // fail fast if no server found
  socketTimeoutMS: 45000,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Reuse the client across hot reloads in dev
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Fresh client in production
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

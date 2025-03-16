import { MongoClient, ObjectId } from "mongodb"

// Use a global variable to cache the MongoDB connection
let cachedClient: MongoClient | null = null
let cachedDb: any = null

export async function connectToDatabase() {
  // If we already have a connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  // Get the MongoDB URI from environment variables or use the provided one
  const uri =
    process.env.MONGODB_URI ||
    "mongodb+srv://lokhith:1234@cluster0.egmcj0q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

  if (!uri) {
    throw new Error("MongoDB URI is not defined")
  }

  try {
    const client = new MongoClient(uri)
    await client.connect()
    const db = client.db("auth-app") // Use a specific database name

    // Cache the connection
    cachedClient = client
    cachedDb = db

    console.log("Connected to MongoDB successfully")
    return { client, db }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    throw new Error("Failed to connect to MongoDB. Please check your connection string.")
  }
}

// Helper function to convert string IDs to MongoDB ObjectIds
export function toObjectId(id: string) {
  return new ObjectId(id)
}

// Helper function to convert MongoDB ObjectIds to strings
export function fromObjectId(id: ObjectId) {
  return id.toString()
}

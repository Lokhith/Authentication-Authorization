import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { connectToDatabase, toObjectId } from "./db"
import { verifyToken } from "./jwt"
import type { ObjectId } from "mongodb"

// Types
export type User = {
  _id?: ObjectId | string
  username: string
  password: string // In a real app, this would be hashed
  role: "user" | "admin"
}

// Get all users
export async function getUsers(): Promise<User[]> {
  try {
    const { db } = await connectToDatabase()
    return await db.collection("users").find().toArray()
  } catch (error) {
    console.error("Error getting users:", error)
    return []
  }
}

// Create a new user
export async function createUser(username: string, password: string, role: "user" | "admin" = "user"): Promise<User> {
  const { db } = await connectToDatabase()

  // Check if username already exists
  const existingUser = await db.collection("users").findOne({ username })
  if (existingUser) {
    throw new Error("Username already exists")
  }

  const newUser: User = {
    username,
    password, // In a real app, this would be hashed
    role,
  }

  const result = await db.collection("users").insertOne(newUser)
  return { ...newUser, _id: result.insertedId }
}

// Find user by username
export async function findUserByUsername(username: string): Promise<User | null> {
  try {
    const { db } = await connectToDatabase()
    return await db.collection("users").findOne({ username })
  } catch (error) {
    console.error("Error finding user by username:", error)
    return null
  }
}

// Find user by ID
export async function findUserById(id: string): Promise<User | null> {
  try {
    const { db } = await connectToDatabase()
    return await db.collection("users").findOne({ _id: toObjectId(id) })
  } catch (error) {
    console.error("Error finding user by ID:", error)
    return null
  }
}

// Get current user from JWT
export async function getCurrentUser(): Promise<User | null> {
  try {
    const token = cookies().get("token")?.value
    if (!token) return null

    const decoded = await verifyToken(token)
    if (!decoded) return null

    return await findUserById(decoded.userId)
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Auth middleware helpers
export async function isAuthenticated(): Promise<boolean> {
  return (await getCurrentUser()) !== null
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null && user.role === "admin"
}

// Route protection
export async function requireAuth() {
  if (!(await isAuthenticated())) {
    redirect("/login")
  }
}

export async function requireAdmin() {
  if (!(await isAuthenticated())) {
    redirect("/login")
  }

  if (!(await isAdmin())) {
    redirect("/user")
  }
}

// Initialize admin user if it doesn't exist
export async function initializeAdminUser() {
  try {
    const { db } = await connectToDatabase()
    const adminUser = await db.collection("users").findOne({ username: "admin" })

    if (!adminUser) {
      await db.collection("users").insertOne({
        username: "admin",
        password: "admin123", // In a real app, this would be hashed
        role: "admin",
      })
      console.log("Admin user created successfully")
    }
  } catch (error) {
    console.error("Failed to initialize admin user:", error)
  }
}

import { SignJWT, jwtVerify } from "jose"
import type { User } from "./auth"
import { fromObjectId } from "./db"

// In a real app, this would be an environment variable
const JWT_SECRET = new TextEncoder().encode("your-secret-key-here")

export async function generateToken(user: User): Promise<string> {
  // Convert ObjectId to string if it exists
  const userId = user._id ? (typeof user._id === "string" ? user._id : fromObjectId(user._id as any)) : ""

  // Create a payload with user information (excluding sensitive data like password)
  const token = await new SignJWT({
    userId,
    username: user.username,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET)

  return token
}

export async function verifyToken(token: string): Promise<{ userId: string; username: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)

    return {
      userId: payload.userId as string,
      username: payload.username as string,
      role: payload.role as string,
    }
  } catch (error) {
    // Token is invalid or expired
    return null
  }
}

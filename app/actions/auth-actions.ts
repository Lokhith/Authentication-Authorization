"use server"

import { cookies } from "next/headers"
import { createUser, findUserByUsername } from "@/lib/auth"
import { generateToken } from "@/lib/jwt"

export async function signUp(formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  if (!username || !password) {
    return { error: "Username and password are required" }
  }

  try {
    // Create the user
    const user = await createUser(username, password)

    // Generate JWT token
    const token = await generateToken(user)

    // Store token in an HTTP-only cookie
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    })

    // Return success before redirecting
    return { success: true, redirectTo: "/user" }
  } catch (error) {
    return { error: (error as Error).message }
  }
}

export async function login(formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  if (!username || !password) {
    return { error: "Username and password are required" }
  }

  try {
    const user = await findUserByUsername(username)

    if (!user || user.password !== password) {
      return { error: "Invalid username or password" }
    }

    // Generate JWT token
    const token = await generateToken(user)

    // Store token in an HTTP-only cookie
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    })

    // Return success and the redirect path instead of redirecting directly
    const redirectTo = user.role === "admin" ? "/admin" : "/user"
    return { success: true, redirectTo }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "An error occurred during login. Please try again." }
  }
}

export async function logout() {
  // Clear the token cookie
  cookies().delete("token")

  // Return success and redirect path instead of redirecting directly
  return { success: true, redirectTo: "/login" }
}

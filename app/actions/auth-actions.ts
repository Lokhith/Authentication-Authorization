"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
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

    redirect("/user")
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

  if (user.role === "admin") {
    redirect("/admin")
  } else {
    redirect("/user")
  }
}

export async function logout() {
  // Clear the token cookie
  cookies().delete("token")

  // Redirect to login page
  redirect("/login")
}

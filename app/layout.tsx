import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { getCurrentUser, initializeAdminUser } from "@/lib/auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Auth App",
  description: "Authentication and Authorization Demo",
}

// Initialize the database with admin user
initializeAdminUser().catch(console.error)

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getCurrentUser()
  const isLoggedIn = !!user
  const isAdmin = user?.role === "admin"

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}

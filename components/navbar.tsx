"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LogOut } from "lucide-react"
import { logout } from "@/app/actions/auth-actions"

interface NavbarProps {
  isLoggedIn: boolean
  isAdmin: boolean
}

export function Navbar({ isLoggedIn, isAdmin }: NavbarProps) {
  const pathname = usePathname()

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold">
                Auth App
              </Link>
            </div>
            <div className="ml-6 flex space-x-4">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/user"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      pathname === "/user"
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    User Home
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        pathname === "/admin"
                          ? "border-primary text-foreground"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      pathname === "/login"
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      pathname === "/signup"
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {isLoggedIn && (
              <form action={logout}>
                <Button type="submit" variant="outline" className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

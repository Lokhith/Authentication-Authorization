"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LogOut, Menu, X } from "lucide-react"
import { logout } from "@/app/actions/auth-actions"
import { useState } from "react"

interface NavbarProps {
  isLoggedIn: boolean
  isAdmin: boolean
}

export function Navbar({ isLoggedIn, isAdmin }: NavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  async function handleLogout() {
    setIsLoggingOut(true)
    try {
      const result = await logout()
      if (result?.success && result?.redirectTo) {
        router.push(result.redirectTo)
      } else {
        // Reset loading state if something went wrong
        setIsLoggingOut(false)
      }
    } catch (error) {
      console.error("Logout error:", error)
      setIsLoggingOut(false)
    }
  }

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex">
            <Link href="/" className="flex items-center" onClick={closeMenu}>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Auth App
              </span>
            </Link>
            <div className="hidden md:flex items-center ml-6 space-x-4">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/user"
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      pathname === "/user"
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    User Home
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        pathname === "/admin"
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
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
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      pathname === "/login"
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      pathname === "/signup"
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
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
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="hidden md:flex items-center gap-2"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Logging out...
                  </>
                ) : (
                  <>
                    <LogOut className="h-4 w-4" />
                    Logout
                  </>
                )}
              </Button>
            )}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b">
          <div className="container py-4 space-y-3">
            {isLoggedIn ? (
              <>
                <Link
                  href="/user"
                  className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === "/user"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                  onClick={closeMenu}
                >
                  User Home
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      pathname === "/admin"
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                    onClick={closeMenu}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                      Logging out...
                    </>
                  ) : (
                    <>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === "/login"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === "/signup"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

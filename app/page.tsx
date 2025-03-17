import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Shield, UserCheck, Lock } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none gradient-heading">
                  Secure Authentication & Authorization
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  A powerful authentication system with role-based access control. Secure, fast, and easy to use.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="px-8">
                  <Link href="/login">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/signup">Create Account</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 backdrop-blur-sm" />
                <div className="relative h-full w-full rounded-lg bg-background/80 p-6 shadow-lg backdrop-blur-sm">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Secure Authentication</h3>
                        <p className="text-sm text-muted-foreground">JWT-based authentication with HTTP-only cookies</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <UserCheck className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Role-Based Access</h3>
                        <p className="text-sm text-muted-foreground">Different access levels for users and admins</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Lock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Protected Routes</h3>
                        <p className="text-sm text-muted-foreground">Secure routes with middleware and server checks</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Shield, UserCheck, Lock } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section - More compact with less vertical spacing */}
      <section className="w-full py-8 md:py-12 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-10 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl gradient-heading">
                  Secure Authentication & Authorization
                </h1>
                <p className="text-muted-foreground">
                  A powerful authentication system with role-based access control.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/login">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/signup">Create Account</Link>
                </Button>
              </div>
            </div>

            {/* More compact and filled feature box */}
            <div className="flex items-center justify-center">
              <div className="w-full rounded-xl bg-card shadow-lg border p-6">
                <h3 className="text-xl font-semibold mb-4 text-center">Key Features</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-primary/5 p-3 rounded-lg">
                    <div className="rounded-full bg-primary/10 p-2 flex-shrink-0">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Secure Authentication</h4>
                      <p className="text-sm text-muted-foreground">JWT-based with HTTP-only cookies</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-primary/5 p-3 rounded-lg">
                    <div className="rounded-full bg-primary/10 p-2 flex-shrink-0">
                      <UserCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Role-Based Access</h4>
                      <p className="text-sm text-muted-foreground">Different access for users and admins</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-primary/5 p-3 rounded-lg">
                    <div className="rounded-full bg-primary/10 p-2 flex-shrink-0">
                      <Lock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Protected Routes</h4>
                      <p className="text-sm text-muted-foreground">Secure routes with middleware</p>
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

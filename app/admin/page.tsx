import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getCurrentUser, getUsers, requireAdmin } from "@/lib/auth"
import { fromObjectId } from "@/lib/db"
import { logout } from "@/app/actions/auth-actions"
import { LogOut } from "lucide-react"

export default async function AdminDashboardPage() {
  // Server-side protection
  await requireAdmin()

  const currentUser = await getCurrentUser()
  const users = await getUsers()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Welcome, {currentUser?.username}!</CardTitle>
          <CardDescription>You are logged in as an administrator</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a protected page that only admin users can access.</p>
        </CardContent>
        <CardFooter>
          <form action={logout}>
            <Button type="submit" variant="outline" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </form>
        </CardFooter>
      </Card>

      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div className="grid gap-4">
        {users.map((user) => {
          const userId = user._id ? (typeof user._id === "string" ? user._id : fromObjectId(user._id as any)) : ""
          return (
            <Card key={userId}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{user.username}</p>
                    <p className="text-sm text-muted-foreground">ID: {userId}</p>
                    <p className="text-sm text-muted-foreground">Role: {user.role}</p>
                  </div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.role === "admin" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

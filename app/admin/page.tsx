import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getCurrentUser, getUsers, requireAdmin } from "@/lib/auth"
import { fromObjectId } from "@/lib/db"
import { logout } from "@/app/actions/auth-actions"
import { LogOut, Users, BarChart, ShieldCheck } from "lucide-react"

export default async function AdminDashboardPage() {
  // Server-side protection
  await requireAdmin()

  const currentUser = await getCurrentUser()
  const users = await getUsers()

  // Count users by role
  const adminCount = users.filter((user) => user.role === "admin").length
  const regularUserCount = users.filter((user) => user.role === "user").length

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h1 className="gradient-heading">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage users and system settings</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Total Users</CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>All registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="text-4xl font-bold">{users.length}</div>
              <p className="text-sm text-muted-foreground mt-1">registered accounts</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">User Roles</CardTitle>
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>Distribution by role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{adminCount}</div>
                <p className="text-sm text-muted-foreground mt-1">admins</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{regularUserCount}</div>
                <p className="text-sm text-muted-foreground mt-1">regular users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">System Status</CardTitle>
              <BarChart className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>Current system status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 py-4">
              <div className="flex justify-between items-center">
                <span>Database</span>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                  Online
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Authentication</span>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                  Active
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>API Services</span>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                  Running
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 card-hover">
        <CardHeader>
          <CardTitle>Welcome, {currentUser?.username}!</CardTitle>
          <CardDescription>You are logged in as an administrator</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a protected page that only admin users can access.</p>
          <p className="mt-4">As an administrator, you have access to user management and system settings.</p>
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

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
        <div className="grid gap-4">
          {users.map((user) => {
            const userId = user._id ? (typeof user._id === "string" ? user._id : fromObjectId(user._id as any)) : ""
            return (
              <Card key={userId} className="card-hover">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{user.username}</p>
                      <p className="text-sm text-muted-foreground">ID: {userId}</p>
                    </div>
                    <div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
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
    </div>
  )
}

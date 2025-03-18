import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUser, requireAuth } from "@/lib/auth"
import { fromObjectId } from "@/lib/db"
import { User, Calendar, Clock } from "lucide-react"
import { LogoutButton } from "@/components/logout-button"

export default async function UserHomePage() {
  // Server-side protection
  await requireAuth()

  const user = await getCurrentUser()
  const userId = user?._id ? (typeof user._id === "string" ? user._id : fromObjectId(user._id as any)) : ""

  // Format current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Format current time
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h1 className="gradient-heading">User Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your personal dashboard</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Profile</CardTitle>
              <User className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Username:</span>
                <span className="font-medium">{user?.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">User ID:</span>
                <span className="font-medium truncate max-w-[180px]" title={userId}>
                  {userId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Role:</span>
                <span className="font-medium">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {user?.role}
                  </span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Date</CardTitle>
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>Current date information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="text-3xl font-bold">{currentDate}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Time</CardTitle>
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>Current time information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="text-3xl font-bold">{currentTime}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 card-hover">
        <CardHeader>
          <CardTitle>Welcome, {user?.username}!</CardTitle>
          <CardDescription>You are logged in as a regular user</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a protected page that only authenticated users can access.</p>
          <p className="mt-4">
            You can manage your account settings, view your profile, and access user-specific features from this
            dashboard.
          </p>
        </CardContent>
        <CardFooter>
          <LogoutButton />
        </CardFooter>
      </Card>
    </div>
  )
}

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getCurrentUser, requireAuth } from "@/lib/auth"
import { fromObjectId } from "@/lib/db"
import { logout } from "@/app/actions/auth-actions"
import { LogOut } from "lucide-react"

export default async function UserHomePage() {
  // Server-side protection
  await requireAuth()

  const user = await getCurrentUser()
  const userId = user?._id ? (typeof user._id === "string" ? user._id : fromObjectId(user._id as any)) : ""

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">User Home</h1>

      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.username}!</CardTitle>
          <CardDescription>You are logged in as a regular user</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a protected page that only authenticated users can access.</p>
          <p className="mt-4">Your account details:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>User ID: {userId}</li>
            <li>Username: {user?.username}</li>
            <li>Role: {user?.role}</li>
          </ul>
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
    </div>
  )
}

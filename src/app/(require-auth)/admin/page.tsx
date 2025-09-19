import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function AccountPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/sign-in");
  }

  const user = {
    name:  "John Doe",
    email: "john@example.com",
    role: "Admin",
    joined: "Jan 5, 2025",
  };

  return (
    <>
      <h1 className="text-xl font-bold text-gray-800 mb-3">Account Details</h1>

      <Card className="w-full shadow-md">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Manage your account details and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue={user.name} className="mt-2" />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={user.email} className="mt-2" />
          </div>

          <div>
            <Label>Role</Label>
            <p className="mt-2 text-sm text-gray-600">{user.role}</p>
          </div>

          <div>
            <Label>Joined</Label>
            <p className="mt-2 text-sm text-gray-600">{user.joined}</p>
          </div>

          <Separator />

          <div className="flex justify-end space-x-3">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

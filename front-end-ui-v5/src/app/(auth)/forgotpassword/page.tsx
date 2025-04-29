"use client";
import { authClient } from "@/lib/auth-client";

import Link from "next/link";
import { addToast, Button, CardBody } from "@heroui/react";
import { Card, CardFooter, CardHeader } from "@heroui/react";
import { Input } from "@heroui/react";
// import { Label } from "@heroui/react";
import { toast } from "@heroui/react";
import { X } from "lucide-react";

async function passwordreset(formData: FormData) {
  const email = formData.get("email")?.toString().trim();
  if (!email) {
    addToast({
      // title: "Alert",
      description: "email shoud not be empty",
      color: "danger",
    });
    // toast("");
    return;
  }
  const { data, error } = await authClient.forgetPassword({
    email: email,
    redirectTo: "/reset-password",
  });
  // toast("Check Your Inbox for Reset Link");
  addToast({
    // title: "Alert",
    description: "Check Your Inbox for Reset Link",
    color: "success",
  });
}

export default function page() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          {/* <CardTitle className="text-2xl font-bold">Reset Password</CardTitle> */}
          <CardHeader>Reset Password</CardHeader>
          {/* <CardDescription>
            Enter the email of your lost account
          </CardDescription> */}
        </CardHeader>
        <form action={passwordreset}>
          <CardBody className="space-y-4">
            <div className="space-y-2">
              <Input
                label="Email"
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
          </CardBody>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Reset
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

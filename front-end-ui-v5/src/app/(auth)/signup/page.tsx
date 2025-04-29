"use client";
import Link from "next/link";
import { addToast, Button } from "@heroui/react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Input } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
// import { toast } from "sonner";
import { X, Check } from "lucide-react";

import { useRouter } from "next/router";
import { redirect } from "next/navigation";

async function signupEmail(formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString().trim();
  const cpassword = formData.get("confirmPassword")?.toString().trim();

  if (!email || !name || !password || !cpassword) {
    console.log("All fields are reqired");
    return;
  }

  if (cpassword !== password) {
    alert("passowrd not same");
    return;
  }

  const response = await authClient.signUp.email({
    email: email,
    password: password,
    name: name,
    image: "",
  });
  if (response.error) {
    if (response.error.code == "USER_ALREADY_EXISTS") {
      addToast({
        title: "Signup",
        description: "User already exists",
        color: "warning",
      });
      // redirect("/user");
    }

    // console.error(response.error);
  } else {
    console.log(response.data);
    // toast("User has been created", {
    //   duration: 5000,
    //   icon: <Check />,
    // });
  }
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="">
          <CardHeader className="">Create an account</CardHeader>
          <CardHeader>Enter your details to create your account</CardHeader>
        </CardHeader>
        <form action={signupEmail}>
          <CardBody className="space-y-4">
            <div className="space-y-2">
              <Input id="name" name="name" required label="Name" />
            </div>
            <div className="space-y-2">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                label="email"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                name="password"
                type="password"
                required
                label="password"
              />
            </div>
            <div className="space-y-2">
              <Input
                label="confirm-password"
                id="confirm-password"
                name="confirmPassword"
                type="password"
                required
              />
            </div>
          </CardBody>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" color="primary">
              Create account
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

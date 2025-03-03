"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { X ,Check } from 'lucide-react';

import { useRouter } from 'next/router'
import { redirect } from "next/navigation"

async function signupEmail(formData: FormData) {

  const name = formData.get('name')?.toString().trim()
  const email = formData.get('email')?.toString().trim()
  const password = formData.get('password')?.toString().trim()
  const cpassword = formData.get('confirmPassword')?.toString().trim()

  if (!email || !name || !password || !cpassword){
    console.log("All fields are reqired")
    return
  }

  if (cpassword !== password) {
    alert('passowrd not same')
    return
  }

  const response = await authClient.signUp.email({
    email: email,
    password: password,
    name: name,
    image: "",
  })
  if (response.error) {
    if (response.error.code == 'USER_ALREADY_EXISTS'){
      toast('USER ALREADY EXISTS',{
        duration: 5000,
        icon :  <X />
      })
      redirect('/user')
    }
    console.error(response.error);
  } else {
    console.log(response.data);
    toast("User has been created",{
      duration: 5000,
      icon : <Check />
    })
    

  }

}


export default function SignupPage() {


  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your details to create your account</CardDescription>
        </CardHeader>
        <form action={signupEmail}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" name="confirmPassword" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
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
  )
}


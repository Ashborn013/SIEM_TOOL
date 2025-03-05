"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { X } from "lucide-react"
import { redirect } from "next/dist/server/api-utils"

async function login(formData: FormData) {
  const email = formData.get('email')?.toString().trim()
  const password = formData.get('password')?.toString().trim()
  if (!email || !password) {
    console.error('Email and password are required')
    return
  }
  
  const response = await authClient.signIn.email({
    email: email,
    password: password,
    callbackURL : '/user/dashboard'
  })

  if (response.error) {
    console.error(response.error)
    if(response.error.code == 'INVALID_EMAIL_OR_PASSWORD'){
      toast('INVALID EMAIL OR PASSWORD',{
        duration : 5000,
        icon  : <X/>
      })
    }
  } else {
    console.log('Login successful', response.data)
  }
}


export default function LoginPage() {
  

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email and password to login to your account</CardDescription>
        </CardHeader>
        <form action={login}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Login
            </Button>
            
            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </p>
            <p className="text-sm text-center text-muted-foreground">
              Forgot your Password ?{" "}
              <Link href="/forgotpassword" className="underline">
              forgot password
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}


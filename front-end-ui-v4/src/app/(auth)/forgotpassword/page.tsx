'use client'
import { authClient } from '@/lib/auth-client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { X } from "lucide-react"


async function passwordreset(formData : FormData) {
    const email = formData.get('email')?.toString().trim()
    if (!email){
        toast ('email shoud not be empty');
        return;
    }
    const {data,error} = await authClient.forgetPassword({
        email : email , 
        redirectTo : '/reset-password'
    })
    toast ('Check Your Inbox for Reset Link');

}




export default function page() {

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>Enter the email of your lost account</CardDescription>
        </CardHeader>
        <form action={passwordreset}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Reset
            </Button>
         
          </CardFooter>
        </form>
      </Card>
    </div>
  )

}

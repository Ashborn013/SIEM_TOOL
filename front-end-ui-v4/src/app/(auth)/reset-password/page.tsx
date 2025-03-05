'use client'
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
// import 




export default function Page() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token")?.toString().trim() || null;
    setToken(token);
  }, []);
  
  async function passwordreset(formData:FormData) {
    const passwordone = formData.get('passwordone')?.toString().trim()
    const passwordtwo = formData.get('passwordtwo')?.toString().trim()
    if(!passwordone || !passwordtwo){
      toast("Fields shoud not be empty")
      return
    }
    if(passwordone !== passwordtwo){
      toast("BothPasswords shoud be same")
      return
    }

    if (!token){
      toast("Token shoud not be empty",{
        duration : 5000,
      })
      return;
    }
    const { data, error } = await authClient.resetPassword({
      newPassword: passwordone,
      token,
    });
    console.log(data)
    if(error?.code === 'PASSWORD_TOO_SHORT'){
      toast("PASSWORD TOO DAM SHORT",{
        duration : 5000
      })
    }

    if(error?.code === 'INVALID_TOKEN'){
      toast("INVALID TOKEN",{
        duration : 5000
      })
    }
    if(data?.status == true){
      toast("Password has been reset",{
        duration : 5000
      })
    }
  }

  if (token === null) {
    return <div>No token Found</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <form action={passwordreset}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input  name="passwordone" type="password" placeholder="********" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Type it Once More..</Label>
              <Input  name="passwordtwo" type="password" placeholder="********" required />
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

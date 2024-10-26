"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { handleSubmit } from "@/actions/authActions"
import { useTransition } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters."
  }),
  passworddata: z.string().min(4, {
    message: "Password must be at least 4 characters."
  })
})

export default function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      passworddata: ""
    }
  })

  function onSubmit(data) {
    startTransition(async () => {
      try {
        const formData = new FormData()
        formData.append("username", data.username)
        formData.append("passworddata", data.passworddata)
        const result = await handleSubmit(formData)

        if (result.success) {
          toast({
            title: "Login Successful",
            description: "You have been logged in successfully."
          })
          router.push("/user/dashboard");
          // redirect("/user/dashboard");
          // Handle successful login (e.g., redirect to dashboard)
        } else {
          toast({
            title: "Login Failed",
            description: result.error || "An error occurred during login.",
            variant: "destructive"
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive"
        })
      }
    })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-neutral-800">
      <div className="w-full max-w-md p-8 bg-white dark:bg-neutral-900 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">
          Login
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passworddata"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

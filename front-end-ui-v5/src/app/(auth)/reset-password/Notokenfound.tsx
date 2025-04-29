
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



export default function NoTokenFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold justify-center">No Token Found</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
          <CardContent className="space-y-4">

          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
         
          </CardFooter>
      </Card>
    </div>
  )

}

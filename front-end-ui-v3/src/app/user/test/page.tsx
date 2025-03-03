"use client"

import { useState, useEffect } from "react"
import { DynamicTable } from "@/components/DynamicTable"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Home() {
  const [jsonData, setJsonData] = useState<any[]>([])

  useEffect(() => {
    // Simulating fetching JSON data
    const fetchData = async () => {
      // Replace this with your actual data fetching logic
      const response = await fetch("http://localhost:223/Job_details")
      const data = await response.json()
      setJsonData(data)
    }

    fetchData()
  }, [])

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Dynamic JSON Table</h1>
      {/* <DynamicTable data={jsonData} /> */}
      <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
        Jokester began sneaking into the castle in the middle of the night and leaving
        jokes all over the place: under the king's pillow, in his soup, even in the
        royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
        then, one day, the people of the kingdom discovered that the jokes left by
        Jokester were so funny that they couldn't help but laugh. And once they
        started laughing, they couldn't stop.
      </ScrollArea>

    </main>
  )
}


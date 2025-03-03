"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { toast } from 'sonner'
export default function page() {
  return (
<Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast
    </Button>
  )
}

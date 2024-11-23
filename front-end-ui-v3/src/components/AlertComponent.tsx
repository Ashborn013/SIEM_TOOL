'use client'

import { useEffect } from 'react'
import { useToast } from "@/hooks/use-toast"

export function AlertComponent() {
  const { toast } = useToast()

  useEffect(() => {
    const eventSource = new EventSource('/api/alertmsg')

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      toast({
        title: "Alert",
        description: data.message,
        variant: data.threat === 'high' ? 'destructive' : 'default',
      })
    }

    return () => {
      eventSource.close()
    }
  }, [toast])

  return null // This component doesn't render anything itself
}


'use client'

import { useEffect, useState } from 'react'
import { useToast } from "@/hooks/use-toast"

export function ToastListener() {
  const { toast } = useToast()
  const [currentEventId, setCurrentEventId] = useState<number>(0)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        const data = await response.json()

        // Sort events by id
        const sortedEvents = data.sort((a: { id: number }, b: { id: number }) => a.id - b.id)

        // Toast events one by one if their id is greater than the current event id
        sortedEvents.forEach((event: { id: number, title: string, description: string }) => {
          if (event.id > currentEventId) {
            toast({
              title: event.title,
              description: event.description,
            })
            setCurrentEventId(event.id)
          }
        })
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }

    fetchEvents()

    const interval = setInterval(fetchEvents, 5000) // Fetch events every 5 seconds

    return () => clearInterval(interval)
  }, [toast, currentEventId])

  return null
}
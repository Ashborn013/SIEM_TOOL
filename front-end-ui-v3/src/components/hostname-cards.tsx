'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Laptop } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface Hostname {
  hostname: string
}

export default function HostnameCards() {
  const [hostNames, setHostNames] = useState<Hostname[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch("http://localhost:223/hostnames")
        if (!response.ok) {
          throw new Error('Failed to fetch hostnames')
        }
        const result = await response.json()
        setHostNames(result)
      } catch (error) {
        console.error(error)
        setError('An error occurred while fetching hostnames')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hostNames.map((host) => (
        <Card key={host.hostname} className="flex flex-col items-center">
          <CardHeader>
            <Laptop className="w-16 h-16 text-primary" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-center">{host.hostname}</CardTitle>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


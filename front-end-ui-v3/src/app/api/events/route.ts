import { NextRequest, NextResponse } from 'next/server'

let clients: Set<ReadableStreamDefaultController> = new Set()
let events: Array<{ title: string, description: string, timestamp: string, id: string }> = []
let globalId : number = 1
export async function GET() {
  return NextResponse.json(events, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  if (!body.title || !body.description) {
    return NextResponse.json({ error: 'Title and description are required' }, { status: 400 })
  }

  const event = {
    title: body.title,
    description: body.description,
    timestamp: new Date().toISOString(),
    id: `${globalId++}`
  }

  // Store the event in the array
  events.push(event)

  // Check if the array size is greater than 20 and reset if necessary
  if (events.length > 20) {
    events = []
  }

  const encoder = new TextEncoder()
  clients.forEach(client => {
    client.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))
  })

  return NextResponse.json({ message: 'Event sent successfully' }, { status: 200 })
}
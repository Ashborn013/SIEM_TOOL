import { NextResponse } from 'next/server';

let clients: Set<ReadableStreamDefaultController> = new Set();

export async function POST(req: Request) {
  const { message, threat } = await req.json();

  // Validate input
  if (typeof message !== 'string' || typeof threat !== 'string') {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  // Send the alert to all connected clients
  clients.forEach(client => {
    client.enqueue(`data: ${JSON.stringify({ message, threat })}\n\n`);
  });

  return NextResponse.json({ success: true });
}

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      clients.add(controller);

      return () => {
        clients.delete(controller);
      };
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}


export const runtime = "nodejs";

export async function GET() {
  const encoder = new TextEncoder();
  let interval: ReturnType<typeof setInterval> | undefined;

  const stream = new ReadableStream({
    start(controller) {
      const send = () => {
        const payload = {
          type: "queue_update",
          booth: "NDMC School Polling Station 14",
          queueLevel: 1 + Math.floor(Math.random() * 5),
          at: new Date().toISOString()
        };
        controller.enqueue(encoder.encode(`event: update\ndata: ${JSON.stringify(payload)}\n\n`));
      };

      send();
      interval = setInterval(send, 15_000);
    },
    cancel() {
      if (interval) clearInterval(interval);
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive"
    }
  });
}

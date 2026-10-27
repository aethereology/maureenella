import { secretEqual } from "@/lib/owner-session";
import { drainOutbox } from "@/lib/server/outbox";
import { databaseRpc } from "@/lib/server/database";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export const maxDuration=60;
export async function POST(request: Request) {
  const secret=process.env.CRON_SECRET;
  if (!secret || secret.length<32 || !secretEqual(request.headers.get("authorization") || "",`Bearer ${secret}`)) return new Response("Unauthorized",{status:401});
  try {
    const result=await drainOutbox();
    const health=await databaseRpc<{pending:number;needsReview:number;oldestPendingSeconds:number}>("website_delivery_health",{});
    return Response.json({...result,...health},{status:health.needsReview || health.oldestPendingSeconds>3600 ? 503 : 200,headers:{"Cache-Control":"no-store"}});
  } catch { return Response.json({error:"Delivery worker unavailable"},{status:503}); }
}

import "server-only";
import { after } from "next/server";
import { textField } from "@/lib/inquiry-validation";
import { enforceLimit, trustedClientIp, verifyHuman, privateDigest } from "./abuse";
import { databaseRpc } from "./database";
import { drainOutbox } from "./outbox";
import type { DeliveryJobInput } from "./notifications";
/** Both inquiry and waitlist use this single durable acceptance boundary. */
export async function saveLead(kind: "inquiry" | "waitlist", values: Record<string,string>, form: FormData, notifications: ()=>Promise<DeliveryJobInput[]>): Promise<string> {
  await enforceLimit(`${kind}:ip`,await trustedClientIp(),10,600);
  await verifyHuman(form);
  await enforceLimit(`${kind}:recipient`,values.email.toLowerCase(),5,3600);
  const supplied=textField(form,"submissionId");
  const nonce=/^[0-9a-f-]{36}$/i.test(supplied) ? supplied : new Date().toISOString().slice(0,10);
  const idempotencyKey=privateDigest(`submission:${kind}`,JSON.stringify({nonce,values}));
  const jobs=await notifications();
  const saved=await databaseRpc<{id:string;duplicate:boolean}>("website_accept_submission",{
    p_key:idempotencyKey,p_kind:kind,p_payload:{...values,receivedAt:new Date().toISOString()},p_jobs:jobs,
  });
  if (!saved.id) throw new Error("DATABASE_INVALID_RECEIPT");
  // Scheduled processing resumes durable jobs if this acceleration fails.
  after(async()=>{try{await drainOutbox(saved.id);}catch{console.warn("OUTBOX_WORKER_DEFERRED");}});
  return saved.id;
}

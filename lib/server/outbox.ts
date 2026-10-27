import "server-only";
import { databaseRpc } from "./database";
import { required, httpsUrl } from "./config";
type Job={id:string;submission_id:string;channel:string;body:Record<string,unknown>;lease_token:string};
export async function drainOutbox(submissionId: string | null = null): Promise<{processed:number;failed:number}> {
  const jobs=await databaseRpc<Job[]>("website_claim_jobs",{p_submission:submissionId,p_limit:4});
  const results=await Promise.all(jobs.map(async(job)=>{
    let successful=false;
    let code="DELIVERY_FAILED";
    try {
      const crm=job.channel === "crm";
      const url=crm ? httpsUrl(required("CRM_WEBHOOK_URL")) : new URL("https://api.resend.com/emails");
      const headers: Record<string,string>={"Content-Type":"application/json","Idempotency-Key":`website/${job.id}`};
      if (!crm) headers.Authorization=`Bearer ${required("RESEND_API_KEY")}`;
      else headers["X-Submission-Id"]=job.submission_id;
      const response=await fetch(url,{method:"POST",headers,body:JSON.stringify(job.body),cache:"no-store",redirect:"error",signal:AbortSignal.timeout(8000)});
      if (!response.ok) throw new Error(`DELIVERY_HTTP_${response.status}`);
      successful=true;
    } catch(error) {
      const message=error instanceof Error ? error.message : "";
      code=/^(DELIVERY_HTTP_\d{3}|CONFIG_[A-Z_]+)$/.test(message) ? message : "DELIVERY_NETWORK_ERROR";
      console.warn("OUTBOX_DELIVERY_FAILED",{jobId:job.id,code});
    }
    const recorded=await databaseRpc<boolean>("website_finish_job",{p_id:job.id,p_lease:job.lease_token,p_success:successful,p_error:successful ? null : code});
    return successful && recorded;
  }));
  return {processed:jobs.length,failed:results.filter((r)=>!r).length};
}

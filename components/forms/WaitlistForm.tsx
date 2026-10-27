"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { joinWaitlist } from "@/app/actions/waitlist";
import type { WaitlistState } from "@/lib/form-state";
import { WAITLIST_CONSENT } from "@/lib/inquiry-validation";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";
import { BotChallenge } from "./BotChallenge";
const initial:WaitlistState={status:"idle"};
function Submit({label}:{label:string}){const {pending}=useFormStatus();return <button type="submit" disabled={pending} className="shrink-0 bg-espresso px-6 py-3 text-porcelain disabled:opacity-60">{pending ? "Saving…" : label}</button>;}
export function WaitlistForm({list,cta="Join",event="education_waitlist_submit",showName=false,onSuccess}:{list:string;cta?:string;event?:AnalyticsEvent;showName?:boolean;onSuccess?:()=>void}){
  const [state,action]=useActionState(joinWaitlist,initial);
  const [email,setEmail]=useState(""); const [name,setName]=useState(""); const [consent,setConsent]=useState(false); const [submissionId,setSubmissionId]=useState("");
  const tracked=useRef<string | undefined>(undefined);
  useEffect(()=>{setSubmissionId(crypto.randomUUID());},[]);
  useEffect(()=>{if(state.accepted && state.submissionId && tracked.current!==state.submissionId){tracked.current=state.submissionId;trackEvent("education_waitlist_success",{list});onSuccess?.();}},[state,list,onSuccess]);
  if(state.status === "success") return <p role="status" className="bg-cream p-4 text-sm text-cocoa">{state.message}</p>;
  const errors=state.errors || {};
  const style="w-full border border-taupe bg-porcelain px-5 py-3 text-cocoa focus-visible:outline-2 focus-visible:outline-rose";
  return <form action={action} noValidate onSubmit={()=>trackEvent(event,{list})} className="w-full space-y-4">
    <input type="hidden" name="list" value={list}/><input type="hidden" name="submissionId" value={submissionId}/>
    <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden"><label htmlFor={`company-${list}`}>Company</label><input id={`company-${list}`} name="company" tabIndex={-1} autoComplete="off"/></div>
    <div className="flex flex-col gap-3 sm:flex-row">{showName && <div className="flex-1"><label htmlFor={`name-${list}`} className="sr-only">First name</label><input id={`name-${list}`} name="name" value={name} onChange={(e)=>setName(e.target.value)} maxLength={80} placeholder="First name" autoComplete="given-name" className={style} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `name-error-${list}` : undefined}/>{errors.name && <p id={`name-error-${list}`} className="text-sm text-rose">{errors.name}</p>}</div>}
    <div className="flex-1"><label htmlFor={`email-${list}`} className="sr-only">Email address</label><input id={`email-${list}`} name="email" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required maxLength={254} placeholder="you@email.com" autoComplete="email" className={style} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? `email-error-${list}` : undefined}/>{errors.email && <p id={`email-error-${list}`} className="text-sm text-rose">{errors.email}</p>}</div><Submit label={cta}/></div>
    <label className="flex items-start gap-3 text-sm text-cocoa"><input type="checkbox" name="consentContact" value="on" checked={consent} onChange={(e)=>setConsent(e.target.checked)} required aria-invalid={Boolean(errors.consentContact)} aria-describedby={errors.consentContact ? `consent-error-${list}` : undefined}/><span>{WAITLIST_CONSENT} <Link href="/privacy" className="underline">Privacy policy</Link>.</span></label>
    {errors.consentContact && <p id={`consent-error-${list}`} className="text-sm text-rose">{errors.consentContact}</p>}
    <BotChallenge attempt={state.attempt}/>{state.status === "error" && <p role="alert" className="text-sm text-rose">{errors.list || state.message}</p>}
  </form>;
}

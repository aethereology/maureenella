"use client";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { submitInquiry } from "@/app/actions/inquiry";
import type { InquiryState } from "@/lib/form-state";
import { INQUIRY_FIELDS, EMPTY_INQUIRY, CONTACT_CONSENT, type InquiryValues } from "@/lib/inquiry-validation";
import { trackEvent } from "@/lib/analytics";
import { BotChallenge } from "./BotChallenge";
const initial: InquiryState={status:"idle"};
const fieldClass="mt-1.5 w-full rounded-none border border-taupe bg-porcelain px-3.5 py-3 text-cocoa focus-visible:outline-2 focus-visible:outline-rose";
function SubmitButton({pending}:{pending:boolean}){return <button type="submit" disabled={pending} className="bg-espresso px-9 py-4 text-porcelain disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-rose">{pending ? "Sending…" : "Submit Inquiry"}</button>;}
export function InquiryForm(){
  const [state,action,pending]=useActionState(submitInquiry,initial);
  const [values,setValues]=useState<InquiryValues>(()=>({...EMPTY_INQUIRY,...state.values}));
  const [submissionId,setSubmissionId]=useState("");
  const started=useRef(false);
  const tracked=useRef<string | undefined>(undefined);
  const summary=useRef<HTMLParagraphElement>(null);
  useEffect(()=>{setSubmissionId(crypto.randomUUID());},[]);
  useEffect(()=>{
    if(state.status === "error"){
      trackEvent(state.errors ? "inquiry_validation_error" : "inquiry_delivery_error");
      const first=Object.keys(state.errors || {})[0];
      if(first) document.getElementById(first)?.focus(); else summary.current?.focus();
    }
    if(state.accepted && state.submissionId && tracked.current!==state.submissionId){tracked.current=state.submissionId;trackEvent("inquiry_form_success");}
  },[state]);
  if(state.status === "success") return <div role="status" className="border border-hairline bg-ivory p-8 text-center"><h2 className="text-2xl text-espresso">Inquiry received</h2><p className="mt-3 text-cocoa">{state.message}</p></div>;
  const errors=state.errors || {};
  const update=(name:keyof InquiryValues,value:string)=>setValues((old)=>({...old,[name]:value}));
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const data = new FormData(event.currentTarget);
    trackEvent("inquiry_form_submit");
    // Dispatch explicitly so a resolved validation error cannot trigger the
    // form-action automatic reset. The action prop remains a pre-hydration fallback.
    startTransition(() => action(data));
  }
  return <form action={action} noValidate aria-busy={pending} className="space-y-8" onSubmit={handleSubmit} onFocusCapture={()=>{if(!started.current){started.current=true;trackEvent("inquiry_form_start");}}}>
    <input type="hidden" name="submissionId" value={submissionId}/>
    <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden"><label htmlFor="company">Company</label><input id="company" name="company" tabIndex={-1} autoComplete="off"/></div>
    {state.status === "error" && <p ref={summary} tabIndex={-1} role="alert" className="bg-rose-soft/40 p-4 text-sm text-cocoa">{state.message}</p>}
    {[...new Set(INQUIRY_FIELDS.map((f)=>f.group))].map((group)=><fieldset key={group} className="space-y-4"><legend className="font-serif text-xl text-espresso">{group}</legend><div className="grid gap-4 sm:grid-cols-2">
      {INQUIRY_FIELDS.filter((f)=>f.group===group).map((field)=>{
        const required="required" in field && field.required;
        const common={id:field.name,name:field.name,className:fieldClass,value:values[field.name],required,"aria-invalid":Boolean(errors[field.name]),"aria-describedby":errors[field.name] ? `${field.name}-error` : undefined,onChange:(event:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>update(field.name,event.target.value)};
        return <div key={field.name}><label htmlFor={field.name} className="block text-sm font-medium text-cocoa">{field.label}{required && <span aria-hidden="true" className="text-rose"> *</span>}</label>
          {field.type === "select" ? <select {...common}><option value="">Select…</option>{field.options.map((option)=><option key={option} value={option}>{option}</option>)}</select> : <input {...common} type={field.type} maxLength={field.max} autoComplete={"autoComplete" in field ? field.autoComplete : undefined} {...(field.type === "number" ? {min:0,max:200,step:1} : {})}/>}
          {errors[field.name] && <p id={`${field.name}-error`} className="mt-1 text-sm text-rose">{errors[field.name]}</p>}
        </div>;
      })}
    </div></fieldset>)}
    <fieldset className="space-y-3"><legend className="sr-only">Consent</legend>{([
      ["consentNotReserved","I understand this inquiry does not reserve my date."],
      ["consentContact",CONTACT_CONSENT],
    ] as const).map(([name,label])=><div key={name}><label className="flex items-start gap-3 text-sm text-cocoa" htmlFor={name}><input id={name} type="checkbox" name={name} value="on" checked={values[name]==="on"} onChange={(e)=>update(name,e.target.checked ? "on" : "")} required aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined}/><span>{label}</span></label>{errors[name] && <p id={`${name}-error`} className="text-sm text-rose">{errors[name]}</p>}</div>)}</fieldset>
    <p className="text-sm text-cocoa/70">Only share allergy details relevant to your requested service. Read our <Link className="underline" href="/privacy">privacy policy</Link>.</p>
    <BotChallenge attempt={state.attempt}/><SubmitButton pending={pending}/>
  </form>;
}

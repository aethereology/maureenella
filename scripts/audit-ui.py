from pathlib import Path
import re
root=Path.cwd()
def write(path,text):
 p=root/path;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text.lstrip('\n'))
write('components/forms/BotChallenge.tsx',r'''
"use client";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
type Turnstile = { render: (container: HTMLElement, options: Record<string,unknown>)=>string; remove:(id:string)=>void };
export function BotChallenge({attempt=0}:{attempt?:number}) {
  const container=useRef<HTMLDivElement>(null);
  const [ready,setReady]=useState(false);
  const [error,setError]=useState(false);
  const sitekey=process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  useEffect(()=>{
    const turnstile=(window as unknown as {turnstile?:Turnstile}).turnstile;
    if (!sitekey || !ready || !container.current || !turnstile) return;
    const id=turnstile.render(container.current,{
      sitekey,action:"lead_capture",theme:"light",
      callback:()=>setError(false),
      "error-callback":()=>{setError(true);return true;},
      "expired-callback":()=>setError(true),
    });
    return ()=>{try{turnstile.remove(id);}catch{/* Widget may already have been removed. */}};
  },[ready,sitekey,attempt]);
  if (!sitekey) return null;
  return <div className="space-y-2"><Script id="turnstile-widget" src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={()=>setReady(true)} onError={()=>setError(true)} /><div ref={container} />{error && <p role="alert" className="text-sm text-rose">Please complete the security check again. Refresh this page if the check cannot load.</p>}</div>;
}
''')
write('components/forms/InquiryForm.tsx',r'''
"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { submitInquiry } from "@/app/actions/inquiry";
import type { InquiryState } from "@/lib/form-state";
import { INQUIRY_FIELDS, EMPTY_INQUIRY, CONTACT_CONSENT, type InquiryValues } from "@/lib/inquiry-validation";
import { trackEvent } from "@/lib/analytics";
import { BotChallenge } from "./BotChallenge";
const initial: InquiryState={status:"idle"};
const fieldClass="mt-1.5 w-full rounded-none border border-taupe bg-porcelain px-3.5 py-3 text-cocoa focus-visible:outline-2 focus-visible:outline-rose";
function SubmitButton(){const {pending}=useFormStatus();return <button type="submit" disabled={pending} className="bg-espresso px-9 py-4 text-porcelain disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-rose">{pending ? "Sending…" : "Submit Inquiry"}</button>;}
export function InquiryForm(){
  const [state,action]=useActionState(submitInquiry,initial);
  const [values,setValues]=useState<InquiryValues>({...EMPTY_INQUIRY});
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
  return <form action={action} noValidate className="space-y-8" onSubmit={()=>trackEvent("inquiry_form_submit")} onFocusCapture={()=>{if(!started.current){started.current=true;trackEvent("inquiry_form_start");}}}>
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
    <BotChallenge attempt={state.attempt}/><SubmitButton/>
  </form>;
}
''')
write('components/forms/WaitlistForm.tsx',r'''
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
''')
write('components/forms/ChecklistGate.tsx',r'''
"use client";
import { useState } from "react";
import { WaitlistForm } from "./WaitlistForm";
import { trackEvent } from "@/lib/analytics";
import type { ChecklistSection } from "@/content/education";
export function ChecklistGate({sections,cta="Get the checklist"}:{sections:ChecklistSection[];cta?:string}){
  const [unlocked,setUnlocked]=useState(false);
  if(!unlocked) return <WaitlistForm list="education-starter-checklist" cta={cta} showName onSuccess={()=>{setUnlocked(true);trackEvent("lead_magnet_download",{list:"education-starter-checklist"});}}/>;
  return <div><p role="status" className="bg-cream p-4 text-sm text-cocoa">Your signup is saved — here is your starter checklist.</p><div className="mt-10 space-y-10">{sections.map((section)=><section key={section.heading}><h2 className="text-2xl text-espresso">{section.heading}</h2>{section.intro && <p className="mt-2 text-cocoa/80">{section.intro}</p>}<ul className="mt-4 space-y-2">{section.items.map((item)=><li key={item} className="flex gap-3 text-cocoa/90"><span aria-hidden="true">✓</span><span>{item}</span></li>)}</ul></section>)}</div></div>;
}
''')
write('app/actions/owner.ts',r'''
"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createOwnerSession, OWNER_SESSION_SECONDS, secretEqual } from "@/lib/owner-session";
import { ownerCookieName } from "@/lib/server/owner-auth";
import { required } from "@/lib/server/config";
import { enforceLimit, trustedClientIp } from "@/lib/server/abuse";
export type OwnerLoginState={error?:string};
export async function loginOwner(_previous:OwnerLoginState,form:FormData):Promise<OwnerLoginState>{
  try {
    const expected=required("PRICING_OWNER_KEY",32);
    const provided=form.get("password");
    await enforceLimit("owner-login",await trustedClientIp(),5,900);
    if(typeof provided!=="string" || provided.length>1024 || !secretEqual(provided,expected)) return {error:"Sign-in failed. Check your credentials or try again later."};
    const token=createOwnerSession(expected,required("OWNER_SESSION_SECRET",32));
    (await cookies()).set(ownerCookieName(),token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:OWNER_SESSION_SECONDS});
  } catch {return {error:"Sign-in is unavailable or temporarily limited. Please try again later."};}
  redirect("/pricing/new");
}
export async function logoutOwner():Promise<void>{
  (await cookies()).delete(ownerCookieName());
  redirect("/pricing/new");
}
''')
write('components/pricing/OwnerLogin.tsx',r'''
"use client";
import {useActionState} from "react";
import {useFormStatus} from "react-dom";
import {loginOwner,type OwnerLoginState} from "@/app/actions/owner";
function Submit(){const {pending}=useFormStatus();return <button type="submit" disabled={pending} className="mt-5 bg-espresso px-6 py-3 text-porcelain disabled:opacity-50">{pending ? "Signing in…" : "Sign in"}</button>;}
export function OwnerLogin(){
  const [state,action]=useActionState(loginOwner,{} as OwnerLoginState);
  return <form action={action} className="mt-8 max-w-md"><label htmlFor="owner-password" className="block text-sm text-cocoa">Owner password</label><input id="owner-password" name="password" type="password" required maxLength={1024} autoComplete="current-password" className="mt-2 w-full border border-taupe bg-porcelain p-3 text-cocoa"/><Submit/>{state.error && <p role="alert" className="mt-4 text-sm text-rose">{state.error}</p>}</form>;
}
''')
write('app/pricing/new/page.tsx',r'''
import type {Metadata} from "next";
import {pageMetadata} from "@/lib/seo/metadata";
import {site} from "@/lib/site";
import {createPricingToken,pricingPath,PRICING_TOKEN_TTL_DAYS} from "@/lib/pricing-link";
import {isOwner} from "@/lib/server/owner-auth";
import {logoutOwner} from "@/app/actions/owner";
import {Section} from "@/components/ui/Section";
import {CopyLinkButton} from "@/components/pricing/CopyLinkButton";
import {OwnerLogin} from "@/components/pricing/OwnerLogin";
export const dynamic="force-dynamic";
export const metadata:Metadata=pageMetadata({title:"New Pricing Link",description:"Internal tool.",path:"/pricing/new",noindex:true});
export default async function NewPricingLinkPage({searchParams}:{searchParams:Promise<{name?:string|string[]}>}){
  if(!await isOwner()) return <Section tone="ivory" size="narrow" className="min-h-[70vh]"><p className="eyebrow">Internal</p><h1 className="mt-5 text-4xl text-espresso">Owner sign in</h1><p className="mt-4 text-cocoa">Sign in to create private pricing links. Passwords are never accepted in the URL.</p><OwnerLogin/></Section>;
  const {name}=await searchParams;
  const firstName=(Array.isArray(name) ? name[0] : name)?.trim().slice(0,40) || "";
  const url=new URL(pricingPath(createPricingToken({firstName})),site.baseUrl).toString();
  return <Section tone="ivory" size="narrow" className="min-h-[80vh]"><p className="eyebrow">Internal</p><h1 className="mt-5 text-4xl text-espresso">New pricing link</h1><p className="mt-4 text-cocoa">Valid for {PRICING_TOKEN_TTL_DAYS} days.</p><form method="get" className="mt-10 flex flex-wrap items-end gap-4 border-t border-hairline pt-8"><div className="flex-1"><label htmlFor="name" className="eyebrow block">Bride&apos;s first name (optional)</label><input id="name" name="name" type="text" defaultValue={firstName} maxLength={40} autoComplete="off" className="mt-3 w-full border border-hairline bg-porcelain px-4 py-3 text-cocoa"/></div><button type="submit" className="bg-espresso px-7 py-4 text-porcelain">Generate</button></form><div className="mt-10 border border-hairline bg-porcelain p-6"><p className="eyebrow">Link</p><p className="mt-3 break-all font-mono text-sm text-cocoa">{url}</p><div className="mt-6"><CopyLinkButton value={url}/></div></div><form action={logoutOwner} className="mt-8"><button type="submit" className="underline">Sign out</button></form></Section>;
}
''')
write('app/actions/unsubscribe.ts',r'''
"use server";
import {readSubscriberToken} from "@/lib/subscriber-token";
import {databaseRpc} from "@/lib/server/database";
export async function unsubscribe(_previous:{message?:string},form:FormData):Promise<{message:string}>{
  const token=form.get("token");
  const email=typeof token==="string" ? readSubscriberToken(token,process.env.SUBSCRIBER_TOKEN_SECRET || "") : null;
  if(!email) return {message:"This link cannot be used. Please contact Maureen to update your email preferences."};
  try {await databaseRpc("website_unsubscribe",{p_email:email});return {message:"You have been unsubscribed from Maureen Ella education emails."};}
  catch{return {message:"We couldn't save your preference. Please try again or contact Maureen directly."};}
}
''')
write('components/forms/UnsubscribeForm.tsx',r'''
"use client";
import {useActionState} from "react";
import {unsubscribe} from "@/app/actions/unsubscribe";
export function UnsubscribeForm({token}:{token:string}){
  const [state,action,pending]=useActionState(unsubscribe,{} as {message?:string});
  return <form action={action} className="mt-6"><input type="hidden" name="token" value={token}/><button type="submit" disabled={pending} className="bg-espresso px-6 py-3 text-porcelain">{pending ? "Saving…" : "Unsubscribe from education emails"}</button>{state.message && <p role="status" className="mt-4">{state.message}</p>}</form>;
}
''')
write('app/unsubscribe/[token]/page.tsx',r'''
import {pageMetadata} from "@/lib/seo/metadata";
import {Section} from "@/components/ui/Section";
import {UnsubscribeForm} from "@/components/forms/UnsubscribeForm";
export const dynamic="force-dynamic";
export const metadata=pageMetadata({title:"Email preferences",description:"Manage education emails.",path:"/unsubscribe",noindex:true});
export default async function UnsubscribePage({params}:{params:Promise<{token:string}>}){
  const {token}=await params;
  return <Section size="narrow"><h1 className="text-4xl text-espresso">Email preferences</h1><p className="mt-5">Confirm below to stop education emails. This does not cancel an existing inquiry or booking.</p>{token.length<=512 ? <UnsubscribeForm token={token}/> : <p className="mt-6">This link is not valid. Please contact Maureen directly.</p>}</Section>;
}
''')
p=root/'app/pricing/[token]/page.tsx';s=p.read_text().replace('import { collections, pricingIntro, goodToKnow } from "@/content/pricing";', 'import { getPricingCatalog } from "@/content/pricing";');s=s.replace('  const { firstName, expiresAt } = result;', '''  let catalog;
  try { catalog = getPricingCatalog(); } catch {
    return <Section size="narrow"><h1 className="text-4xl">Your pricing guide is being updated</h1><p className="mt-6">Please contact Maureen for your current proposal.</p><ButtonLink href={`mailto:${site.contact.email.value}`}>Contact Maureen</ButtonLink></Section>;
  }
  const { collections, aLaCarte, pricingIntro, goodToKnow } = catalog;
  const { firstName, expiresAt } = result;''').replace('<ALaCarteTable />','<ALaCarteTable items={aLaCarte} />');p.write_text(s)
p=root/'components/sections/Hero.tsx';s=p.read_text().replace('import { Reveal } from "@/components/ui/Reveal";\n','')
s=re.sub(r'<Reveal\b(?: delay=\{\d+\})?', '<div', s).replace('</Reveal>','</div>');p.write_text(s)
write('components/motion/RouteTransition.tsx',r'''
/** Keep the primary document visible in server HTML and when JavaScript fails. */
export function RouteTransition({children}:{children:React.ReactNode}) {
  return <main id="main">{children}</main>;
}
''')
p=root/'components/ui/Reveal.tsx';s=p.read_text().replace('initial={{ opacity: 0, y: 24 }}','initial={false}');p.write_text(s)
p=root/'lib/site.ts';s=p.read_text();s=s.replace('export const CONFIRM =', '''const configuredBaseUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://maureenella.com");
if (configuredBaseUrl.username || configuredBaseUrl.password || configuredBaseUrl.search || configuredBaseUrl.hash || configuredBaseUrl.pathname !== "/" || (configuredBaseUrl.protocol !== "https:" && !(process.env.NODE_ENV !== "production" && ["localhost","127.0.0.1"].includes(configuredBaseUrl.hostname)))) throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTPS origin.");

export const CONFIRM =''').replace('baseUrl: "https://maureenella.com",','baseUrl: configuredBaseUrl.origin,');p.write_text(s)
p=root/'lib/analytics.ts';s=p.read_text().replace('  | "inquiry_form_error"','  | "inquiry_form_error"\n  | "inquiry_form_success"\n  | "inquiry_validation_error"\n  | "inquiry_delivery_error"\n  | "education_waitlist_success"');s=s.replace('if (typeof window === "undefined") return;', r'if (typeof window === "undefined" || /^\/(pricing|unsubscribe)(\/|$)/.test(window.location.pathname)) return;');p.write_text(s)
# Separate root layouts force a document navigation at the private boundary.
layout=(root/'app/layout.tsx').read_text().replace('import "./globals.css";','import "../globals.css";')
public=root/'app/(public)';private=root/'app/(private)';public.mkdir(exist_ok=True);private.mkdir(exist_ok=True)
for name in ['pricing','unsubscribe']:
 (root/'app'/name).rename(private/name)
for child in list((root/'app').iterdir()):
 if child.name in ['(public)','(private)','actions','api','globals.css','robots.ts','sitemap.ts','icon.svg','layout.tsx']: continue
 child.rename(public/child.name)
write('app/(public)/layout.tsx',layout)
write('app/(private)/layout.tsx',layout.replace('import { Analytics } from "@/components/Analytics";\n','').replace('          <Analytics />\n',''))
(root/'app/layout.tsx').unlink()
p=root/'next.config.ts';s=p.read_text().replace('  "https://www.googletagmanager.com",\n  "https://www.google-analytics.com",','  "https://www.googletagmanager.com",\n  "https://www.google-analytics.com",\n  "https://challenges.cloudflare.com",',1)
s=s.replace('const connectSrc = [\n  "\'self\'",','const connectSrc = [\n  "\'self\'",\n  "https://challenges.cloudflare.com",')
s=s.replace('  "frame-ancestors \'none\'",','  "frame-ancestors \'none\'",\n  "frame-src https://challenges.cloudflare.com",')
s=s.replace('headers: [{ key: "Referrer-Policy", value: "no-referrer" }],','headers: [{ key: "Referrer-Policy", value: "no-referrer" }, { key: "X-Robots-Tag", value: "noindex, nofollow" }],')
s=s.replace('        source: "/pricing/:path*",','        source: "/:section(pricing|unsubscribe)/:path*",')
s=s.replace('  reactStrictMode: true,','  reactStrictMode: true,\n  poweredByHeader: false,\n  experimental: { serverActions: { bodySizeLimit: "64kb" } },')
p.write_text(s)
p=root/'app/robots.ts';s=p.read_text().replace('["/thank-you", "/pricing"]','["/thank-you", "/pricing", "/unsubscribe", "/api/"]');p.write_text(s)
for path in ['app/(public)/contact/page.tsx','app/(public)/education/page.tsx','app/(public)/education/starter-checklist/page.tsx']:
 p=root/path;s=p.read_text();p.write_text('export const maxDuration = 60;\n'+s)
p=root/'.gitignore';p.write_text(p.read_text()+'\n!.env.example\n.private/\nplaywright-report/\ntest-results/\naudit-artifacts/\n')

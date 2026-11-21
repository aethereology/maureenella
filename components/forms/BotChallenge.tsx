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

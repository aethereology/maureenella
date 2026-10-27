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

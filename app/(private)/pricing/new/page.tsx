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

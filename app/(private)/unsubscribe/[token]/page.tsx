import {pageMetadata} from "@/lib/seo/metadata";
import {Section} from "@/components/ui/Section";
import {UnsubscribeForm} from "@/components/forms/UnsubscribeForm";
export const dynamic="force-dynamic";
export const metadata=pageMetadata({title:"Email preferences",description:"Manage education emails.",path:"/unsubscribe",noindex:true});
export default async function UnsubscribePage({params}:{params:Promise<{token:string}>}){
  const {token}=await params;
  return <Section size="narrow"><h1 className="text-4xl text-espresso">Email preferences</h1><p className="mt-5">Confirm below to stop education emails. This does not cancel an existing inquiry or booking.</p>{token.length<=512 ? <UnsubscribeForm token={token}/> : <p className="mt-6">This link is not valid. Please contact Maureen directly.</p>}</Section>;
}

"use client";
import {useActionState} from "react";
import {unsubscribe} from "@/app/actions/unsubscribe";
export function UnsubscribeForm({token}:{token:string}){
  const [state,action,pending]=useActionState(unsubscribe,{} as {message?:string});
  return <form action={action} className="mt-6"><input type="hidden" name="token" value={token}/><button type="submit" disabled={pending} className="bg-espresso px-6 py-3 text-porcelain">{pending ? "Saving…" : "Unsubscribe from education emails"}</button>{state.message && <p role="status" className="mt-4">{state.message}</p>}</form>;
}

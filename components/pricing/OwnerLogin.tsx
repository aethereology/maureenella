"use client";
import {useActionState} from "react";
import {useFormStatus} from "react-dom";
import {loginOwner,type OwnerLoginState} from "@/app/actions/owner";
function Submit(){const {pending}=useFormStatus();return <button type="submit" disabled={pending} className="mt-5 bg-espresso px-6 py-3 text-porcelain disabled:opacity-50">{pending ? "Signing in…" : "Sign in"}</button>;}
export function OwnerLogin(){
  const [state,action]=useActionState(loginOwner,{} as OwnerLoginState);
  return <form action={action} className="mt-8 max-w-md"><label htmlFor="owner-password" className="block text-sm text-cocoa">Owner password</label><input id="owner-password" name="password" type="password" required maxLength={1024} autoComplete="current-password" className="mt-2 w-full border border-taupe bg-porcelain p-3 text-cocoa"/><Submit/>{state.error && <p role="alert" className="mt-4 text-sm text-rose">{state.error}</p>}</form>;
}

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

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

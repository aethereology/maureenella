import "server-only";
import { cookies } from "next/headers";
import { verifyOwnerSession } from "../owner-session";
export const ownerCookieName = () => process.env.NODE_ENV === "production" ? "__Host-me-owner" : "me-owner";
export async function isOwner(): Promise<boolean> {
  const token = (await cookies()).get(ownerCookieName())?.value;
  if (!token) return false;
  return verifyOwnerSession(token, process.env.PRICING_OWNER_KEY || "", process.env.OWNER_SESSION_SECRET || "");
}

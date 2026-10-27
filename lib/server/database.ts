import "server-only";
import { required, httpsUrl } from "./config";
/** Service-role key is confined to server modules. Responses never enter logs. */
export async function databaseRpc<T>(name: string, args: Record<string, unknown>): Promise<T> {
  if (!/^website_[a-z_]+$/.test(name)) throw new Error("DATABASE_FUNCTION");
  const base = httpsUrl(process.env.SUPABASE_URL || required("NEXT_PUBLIC_SUPABASE_URL"));
  const key = required("SUPABASE_SERVICE_ROLE_KEY");
  const response = await fetch(new URL(`/rest/v1/rpc/${name}`, base), {
    method: "POST", cache: "no-store", redirect: "error", signal: AbortSignal.timeout(8000),
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
  });
  if (!response.ok) throw new Error(`DATABASE_HTTP_${response.status}`);
  return await response.json() as T;
}

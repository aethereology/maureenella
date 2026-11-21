import {parsePricingCatalog} from '../lib/pricing-catalog.ts';
const failures=[];
const required=['RESEND_API_KEY','FORM_TO_EMAIL','SUPABASE_SERVICE_ROLE_KEY','NEXT_PUBLIC_TURNSTILE_SITE_KEY','TURNSTILE_SECRET_KEY'];
const secrets=['ABUSE_HASH_SECRET','PRICING_LINK_SECRET','PRICING_OWNER_KEY','OWNER_SESSION_SECRET','SUBSCRIBER_TOKEN_SECRET','CRON_SECRET'];
for(const name of required)if(!process.env[name]?.trim())failures.push(`${name} is missing`);
for(const name of secrets)if((process.env[name]?.trim().length || 0)<32)failures.push(`${name} needs at least 32 random characters`);
for(const [name,value] of [['SUPABASE_URL',process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL],['NEXT_PUBLIC_SITE_URL',process.env.NEXT_PUBLIC_SITE_URL]]){
  try{const u=new URL(value);if(u.protocol!=='https:' || u.username || u.password || u.search || u.hash || u.pathname!=='/')throw new Error();}catch{failures.push(`${name} must be an HTTPS origin`);}
}
try{parsePricingCatalog(process.env.PRICING_CATALOG_JSON || '');}catch{failures.push('PRICING_CATALOG_JSON is missing or invalid');}
if(process.env.CRM_WEBHOOK_URL){try{const u=new URL(process.env.CRM_WEBHOOK_URL);if(u.protocol!=='https:' || u.username || u.password)throw new Error();}catch{failures.push('CRM_WEBHOOK_URL must use HTTPS without embedded credentials');}}
if(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && !/^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID))failures.push('NEXT_PUBLIC_GA_MEASUREMENT_ID is invalid');
for(const [name,value] of Object.entries(process.env))if(name.startsWith('NEXT_PUBLIC_') && /SECRET|SERVICE_ROLE|PASSWORD|PRIVATE|OWNER_KEY/.test(name) && value)failures.push(`Server secret is exposed through ${name}`);
if(failures.length){console.error('Production preflight FAILED:\n'+failures.map(x=>`- ${x}`).join('\n'));process.exitCode=1;}
else console.log('Configuration shape is valid. Complete migration, worker setup, and live delivery tests before release. No secret values were printed.');

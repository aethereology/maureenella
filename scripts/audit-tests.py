from pathlib import Path
import json
root=Path.cwd()
def write(path,text):
 p=root/path;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text.lstrip('\n'))
p=root/'package.json';pkg=json.loads(p.read_text());pkg['scripts']['preflight']='node --experimental-strip-types scripts/check-production-config.mjs';pkg['overrides'].update({
 '@react-email/ui':{'next':'16.4.3'},'postcss':'8.5.23','source-map-js':'1.2.2',
 'nanoid@<3.3.18':'3.3.18','js-yaml@^4':'4.3.2','fast-uri@^3':'3.1.9',
 'engine.io@^6':'6.6.10','brace-expansion@^1':'1.1.21','brace-expansion@^4':'5.0.12','brace-expansion@^5':'5.0.12',
});p.write_text(json.dumps(pkg,indent=2)+'\n')
write('lib/inquiry-validation.test.ts',r'''
import test from "node:test";
import assert from "node:assert/strict";
import {validateInquiry,validateWaitlist} from "./inquiry-validation.ts";
const now=new Date("2026-10-27T16:00:00Z");
function inquiry(extra:Record<string,string>={}){
  const data={firstName:"Sarah",lastName:"Example",email:"SARAH@example.com",phone:"+1 (904) 555-0100",weddingDate:"2027-06-12",cityState:"St. Augustine, FL",gettingReadyLocation:"Venue",interestedIn:"Both hair and makeup",hairCount:"4",makeupCount:"4",consentContact:"on",consentNotReserved:"on",...extra};
  const form=new FormData();for(const [key,value] of Object.entries(data))form.set(key,value);return form;
}
test("valid inquiry normalizes email and preserves names",()=>{const r=validateInquiry(inquiry(),now);assert.deepEqual(r.errors,{});assert.equal(r.values.email,"sarah@example.com");assert.equal(r.values.firstName,"Sarah");});
for(const [name,value] of [["email","not-an-email"],["email","a@b.com\r\nBcc:other@example.com"],["phone","abc"],["weddingDate","2027-02-30"],["weddingDate","2026-01-01"],["interestedIn","anything"],["readyBy","25:99"],["hairCount","-1"],["hairCount","1.5"],["hairCount","201"],["makeupCount","x"],["consentContact","false"],["consentNotReserved","true"],["previewInterest","MAYBE"],["howFound","Injected"],["firstName","First\nSecond"]]){
  test(`rejects invalid ${name}: ${JSON.stringify(value)}`,()=>{assert.ok(validateInquiry(inquiry({[name]:value}),now).errors[name]);});
}
test("zero-padded service counts cannot bypass the nonzero requirement",()=>assert.ok(validateInquiry(inquiry({hairCount:"00",makeupCount:"0"}),now).errors.hairCount));
test("leap-day validation accepts a real leap day",()=>assert.equal(validateInquiry(inquiry({weddingDate:"2028-02-29"}),now).errors.weddingDate,undefined));
test("validates today's date in the business timezone, not UTC",()=>assert.equal(validateInquiry(inquiry({weddingDate:"2026-10-27"}),new Date("2026-10-28T02:00:00Z")).errors.weddingDate,undefined));
test("rejects duplicated fields",()=>{const f=inquiry();f.append("email","other@example.com");assert.ok(validateInquiry(f,now).errors.email);});
test("returns a field error for optional overlong fields and bounds echoed data",()=>{const r=validateInquiry(inquiry({allergies:"x".repeat(801),venue:"x".repeat(161)}),now);assert.ok(r.errors.allergies);assert.ok(r.errors.venue);assert.equal(r.values.allergies.length,800);});
test("file uploads cannot become string field values",()=>{const f=inquiry();f.set("firstName",new Blob(["x"]),"x.txt");assert.ok(validateInquiry(f,now).errors.firstName);});
function signup(extra:Record<string,string>={}){const f=new FormData();for(const [k,v] of Object.entries({email:"reader@example.com",name:"Reader",list:"education-waitlist",consentContact:"on",...extra}))f.set(k,v);return f;}
test("valid waitlist signup",()=>assert.deepEqual(validateWaitlist(signup()).errors,{}));
for(const [name,value] of [["list","arbitrary-list"],["consentContact","false"],["email","bad"],["name","x".repeat(81)]])test(`waitlist rejects invalid ${name}`,()=>assert.ok(validateWaitlist(signup({[name]:value})).errors[name]));
''')
write('lib/owner-session.test.ts',r'''
import test from "node:test";
import assert from "node:assert/strict";
import {createOwnerSession,verifyOwnerSession,secretEqual,OWNER_SESSION_SECONDS} from "./owner-session.ts";
const password="owner-test-secret-".repeat(3);const secret="session-test-secret-".repeat(3);const now=1800000000000;
test("owner session round-trips",()=>assert.equal(verifyOwnerSession(createOwnerSession(password,secret,now),password,secret,now),true));
test("owner session expires",()=>assert.equal(verifyOwnerSession(createOwnerSession(password,secret,now),password,secret,now+OWNER_SESSION_SECONDS*1000),false));
test("rotating owner password invalidates old sessions",()=>assert.equal(verifyOwnerSession(createOwnerSession(password,secret,now),password+"new",secret,now),false));
test("rotating session secret invalidates old sessions",()=>assert.equal(verifyOwnerSession(createOwnerSession(password,secret,now),password,secret+"new",now),false));
test("rejects tampered session",()=>{const t=createOwnerSession(password,secret,now);assert.equal(verifyOwnerSession("x"+t,password,secret,now),false);});
test("rejects malformed and oversized sessions",()=>{for(const t of ["",".","a.b.c","x".repeat(5000)])assert.equal(verifyOwnerSession(t,password,secret,now),false);});
test("refuses short secrets",()=>assert.throws(()=>createOwnerSession("short",secret,now)));
test("constant-length digest comparison handles all string lengths",()=>{assert.equal(secretEqual("a","a"),true);assert.equal(secretEqual("a","aa"),false);});
''')
write('lib/subscriber-token.test.ts',r'''
import test from "node:test";
import assert from "node:assert/strict";
import {createSubscriberToken,readSubscriberToken} from "./subscriber-token.ts";
const secret="unsubscribe-test-secret-".repeat(3);
test("opaque unsubscribe link round-trips",()=>{const t=createSubscriberToken("reader@example.com",secret);assert.equal(readSubscriberToken(t,secret),"reader@example.com");assert.ok(!Buffer.from(t,"base64url").toString("utf8").includes("reader@example.com"));});
test("unsubscribe links are randomized",()=>assert.notEqual(createSubscriberToken("a@example.com",secret),createSubscriberToken("a@example.com",secret)));
test("rejects token tampering",()=>{const bytes=Buffer.from(createSubscriberToken("a@example.com",secret),"base64url");bytes[30]^=1;assert.equal(readSubscriberToken(bytes.toString("base64url"),secret),null);});
test("rejects wrong key and malformed tokens",()=>{const t=createSubscriberToken("a@example.com",secret);assert.equal(readSubscriberToken(t,secret+"x"),null);for(const x of ["","x","x".repeat(600)])assert.equal(readSubscriberToken(x,secret),null);});
''')
write('lib/pricing-catalog.test.ts',r'''
import test from "node:test";
import assert from "node:assert/strict";
import {parsePricingCatalog} from "./pricing-catalog.ts";
const fixture={collections:[{slug:"example",name:"Example",price:"Test rate",positioning:"Example positioning",includes:["Example service"]}],aLaCarte:[{service:"Example service",price:"Test rate"}],pricingIntro:"Example intro",goodToKnow:["Example note"]};
test("parses a valid private catalog",()=>assert.deepEqual(parsePricingCatalog(JSON.stringify(fixture)),fixture));
test("rejects empty, invalid, and oversized catalogs",()=>{for(const raw of ["","{}","null","[]","not-json","x".repeat(50001)])assert.throws(()=>parsePricingCatalog(raw));});
test("rejects duplicate collection identifiers",()=>assert.throws(()=>parsePricingCatalog(JSON.stringify({...fixture,collections:[fixture.collections[0],fixture.collections[0]]}))));
test("rejects non-boolean feature flags",()=>assert.throws(()=>parsePricingCatalog(JSON.stringify({...fixture,collections:[{...fixture.collections[0],featured:"yes"}]}))));
''')
write('tests/database.sql',r'''
\set ON_ERROR_STOP on
begin;
do $$
declare a jsonb; b jsonb; sid uuid; j public.website_delivery_jobs; n integer;
begin
  assert not has_table_privilege('anon','public.website_submissions','SELECT'), 'anon can read leads';
  assert not has_table_privilege('authenticated','public.website_subscribers','SELECT'), 'authenticated can read subscribers';
  assert not has_function_privilege('anon','public.website_accept_submission(text,text,jsonb,jsonb)','EXECUTE'), 'anon can write leads';
  assert not has_function_privilege('authenticated','public.website_claim_jobs(uuid,integer)','EXECUTE'), 'browser can claim jobs';
  assert public.website_rate_limit(repeat('a',64),2,600);
  assert public.website_rate_limit(repeat('a',64),2,600);
  assert not public.website_rate_limit(repeat('a',64),2,600), 'rate limit not enforced';
  a:=public.website_accept_submission(repeat('b',64),'inquiry','{"email":"example@example.com"}', '[{"channel":"owner","body":{"text":"stable"}},{"channel":"crm","body":{"text":"stable"}}]');
  b:=public.website_accept_submission(repeat('b',64),'inquiry','{"email":"example@example.com"}', '[{"channel":"owner","body":{"text":"changed retry must be ignored"}}]');
  assert a->>'id'=b->>'id', 'duplicate submission created';
  assert (b->>'duplicate')::boolean, 'duplicate not identified';
  sid:=(a->>'id')::uuid;
  select count(*) into n from public.website_delivery_jobs where submission_id=sid;
  assert n=2, 'duplicate jobs created';
  select * into j from public.website_claim_jobs(sid,1);
  assert j.body->>'text'='stable', 'provider payload changed on retry';
  assert not public.website_finish_job(j.id,gen_random_uuid(),true), 'wrong lease accepted';
  assert public.website_finish_job(j.id,j.lease_token,true), 'valid completion failed';
  assert not public.website_finish_job(j.id,j.lease_token,true), 'completion replay accepted';
  select * into j from public.website_claim_jobs(sid,1);
  assert public.website_finish_job(j.id,j.lease_token,false,'DELIVERY_HTTP_503');
  select count(*) into n from public.website_claim_jobs(sid,10);
  assert n=0, 'retry did not back off';
  update public.website_delivery_jobs set available_at=now()-interval '1 minute' where submission_id=sid and status='pending';
  select count(*) into n from public.website_claim_jobs(sid,10);
  assert n=1, 'successful channel was retried or failed channel was lost';
  a:=public.website_accept_submission(repeat('c',64),'waitlist','{"email":"reader@example.com","name":"Reader","list":"education-waitlist","consentContact":"on","consentText":"Agreed"}', '[{"channel":"welcome","body":{"to":["reader@example.com"]}}]');
  assert exists(select 1 from public.website_subscribers where email='reader@example.com' and status='subscribed');
  perform public.website_unsubscribe('reader@example.com');
  assert exists(select 1 from public.website_subscribers where email='reader@example.com' and status='unsubscribed');
  assert exists(select 1 from public.website_delivery_jobs where submission_id=(a->>'id')::uuid and status='cancelled');
  update public.website_delivery_jobs set status='pending',lease_until=null,created_at=now()-interval '23 hours' where submission_id=sid and status='processing';
  perform public.website_claim_jobs(null,10);
  assert exists(select 1 from public.website_delivery_jobs where submission_id=sid and status='needs_review'), 'old possibly-sent job replayed';
  raise notice 'Database integration assertions passed';
end;
$$;
rollback;
''')
write('playwright.config.ts',r'''
import {defineConfig,devices} from "@playwright/test";
export default defineConfig({
  testDir:"./tests/e2e",fullyParallel:true,forbidOnly:!!process.env.CI,retries:process.env.CI ? 1 : 0,workers:2,
  reporter:[["list"],["html",{open:"never"}]],
  use:{baseURL:"http://127.0.0.1:3000",trace:"retain-on-failure"},
  projects:[{name:"chromium",use:{...devices["Desktop Chrome"]}},{name:"mobile",use:{...devices["iPhone 13"],defaultBrowserType:"chromium"}}],
  webServer:{command:"npm run start -- --hostname 127.0.0.1 --port 3000",url:"http://127.0.0.1:3000",reuseExistingServer:!process.env.CI,timeout:120000,env:{NEXT_TELEMETRY_DISABLED:"1"}},
});
''')
write('tests/e2e/production.spec.ts',r'''
import {test,expect,type Page} from "@playwright/test";
test.beforeEach(async ({page}) => {
  await page.route(/https:\/\/(www\.)?(googletagmanager|google-analytics)\.com\//, route => route.abort());
});
async function fillInquiry(page:Page){
  await page.getByLabel("First name",{exact:false}).fill("Sarah");
  await page.getByLabel("Last name",{exact:false}).fill("Example");
  await page.getByLabel("Email",{exact:false}).first().fill("sarah@example.com");
  await page.getByLabel("Phone",{exact:false}).fill("9045550100");
  await page.getByLabel("Wedding date",{exact:false}).fill("2030-06-12");
  await page.getByLabel("Wedding city",{exact:false}).fill("St. Augustine, FL");
  await page.getByLabel("Getting-ready location",{exact:false}).fill("Wedding venue");
  await page.locator('#interestedIn').selectOption("Both hair and makeup");
  await page.getByLabel("Estimated hair services",{exact:false}).fill("4");
  await page.getByLabel("Estimated makeup services",{exact:false}).fill("4");
  await page.getByLabel("I understand this inquiry").check();
  await page.getByLabel("I agree to be contacted").check();
}
test("homepage hero remains visible without JavaScript",async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();await page.goto("http://127.0.0.1:3000/");
  await expect(page.getByRole("heading",{level:1})).toBeVisible();await expect(page.locator("#main")).toHaveCSS("opacity","1");await context.close();
});
test("validation failure keeps completed inquiry fields",async({page})=>{
  await page.goto("/contact");await fillInquiry(page);await page.locator("#email").fill("not-an-email");await page.getByRole("button",{name:"Submit Inquiry"}).click();
  await expect(page.locator("#email-error")).toContainText("valid email");await expect(page.locator("#firstName")).toHaveValue("Sarah");await expect(page.locator("#gettingReadyLocation")).toHaveValue("Wedding venue");await expect(page.locator("#consentContact")).toBeChecked();
});
test("unconfigured production services fail closed without clearing input",async({page})=>{
  await page.goto("/contact");await fillInquiry(page);await page.getByRole("button",{name:"Submit Inquiry"}).click();
  await expect(page.getByRole("alert")).toContainText("couldn't save");await expect(page.locator("#email")).toHaveValue("sarah@example.com");await expect(page.getByText("Inquiry received",{exact:true})).toHaveCount(0);
});
test("owner key query parameter never authenticates or echoes a secret",async({page})=>{
  const response=await page.goto("/pricing/new?key=do-not-echo-this-query-secret");
  await expect(page.getByRole("heading",{name:"Owner sign in"})).toBeVisible();await expect(page.locator('input[name="key"]')).toHaveCount(0);
  const text=await page.locator("body").innerText();expect(text).not.toContain("do-not-echo-this-query-secret");expect(response?.headers()["referrer-policy"]).toBe("no-referrer");
});
test("private pricing never loads the analytics script",async({page})=>{
  const calls:string[]=[];page.on("request",r=>{if(/googletagmanager|google-analytics/.test(r.url()))calls.push(r.url());});
  const response=await page.goto("/pricing/not-a-valid-token");await expect(page.getByRole("heading",{name:"This pricing link has expired"})).toBeVisible();
  await expect(page.locator('script[src*="googletagmanager"]')).toHaveCount(0);expect(calls).toEqual([]);expect(response?.headers()["x-robots-tag"]).toContain("noindex");
});
test("private-to-public link uses a new document",async({page})=>{
  await page.goto("/pricing/not-a-valid-token");await page.evaluate(()=>{(window as unknown as {privateMarker?:boolean}).privateMarker=true;});
  await page.getByRole("link",{name:"Request Availability",exact:true}).last().click();await expect(page).toHaveURL(/\/contact$/);
  expect(await page.evaluate(()=>(window as unknown as {privateMarker?:boolean}).privateMarker)).toBeUndefined();
});
test("waitlist requires consent and preserves the email",async({page})=>{
  await page.goto("/education");await page.locator('input[name="email"]').fill("reader@example.com");await page.locator('form').last().locator('button[type="submit"]').click();
  await expect(page.locator('input[name="email"]')).toHaveValue("reader@example.com");await expect(page.locator('[id^="consent-error-"]')).toBeVisible();
});
test("delivery worker rejects unauthenticated callers",async({request})=>{
  const response=await request.post("/api/jobs/deliver");expect(response.status()).toBe(401);
});
test("unsubscribe requires a deliberate POST, never a GET",async({page})=>{
  await page.goto("/unsubscribe/invalid-token");await expect(page.getByRole("button",{name:"Unsubscribe from education emails"})).toBeVisible();await expect(page.getByText("You have been unsubscribed",{exact:false})).toHaveCount(0);
});
''')

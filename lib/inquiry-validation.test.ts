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

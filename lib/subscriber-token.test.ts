import test from "node:test";
import assert from "node:assert/strict";
import {createSubscriberToken,readSubscriberToken} from "./subscriber-token.ts";
const secret="unsubscribe-test-secret-".repeat(3);
test("opaque unsubscribe link round-trips",()=>{const t=createSubscriberToken("reader@example.com",secret);assert.equal(readSubscriberToken(t,secret),"reader@example.com");assert.ok(!Buffer.from(t,"base64url").toString("utf8").includes("reader@example.com"));});
test("unsubscribe links are randomized",()=>assert.notEqual(createSubscriberToken("a@example.com",secret),createSubscriberToken("a@example.com",secret)));
test("rejects token tampering",()=>{const bytes=Buffer.from(createSubscriberToken("a@example.com",secret),"base64url");bytes[30]^=1;assert.equal(readSubscriberToken(bytes.toString("base64url"),secret),null);});
test("rejects wrong key and malformed tokens",()=>{const t=createSubscriberToken("a@example.com",secret);assert.equal(readSubscriberToken(t,secret+"x"),null);for(const x of ["","x","x".repeat(600)])assert.equal(readSubscriberToken(x,secret),null);});

import test from "node:test";
import assert from "node:assert/strict";
import {parsePricingCatalog} from "./pricing-catalog.ts";
const fixture={collections:[{slug:"example",name:"Example",price:"Test rate",positioning:"Example positioning",includes:["Example service"]}],aLaCarte:[{service:"Example service",price:"Test rate"}],pricingIntro:"Example intro",goodToKnow:["Example note"]};
test("parses a valid private catalog",()=>assert.deepEqual(parsePricingCatalog(JSON.stringify(fixture)),fixture));
test("rejects empty, invalid, and oversized catalogs",()=>{for(const raw of ["","{}","null","[]","not-json","x".repeat(50001)])assert.throws(()=>parsePricingCatalog(raw));});
test("rejects duplicate collection identifiers",()=>assert.throws(()=>parsePricingCatalog(JSON.stringify({...fixture,collections:[fixture.collections[0],fixture.collections[0]]}))));
test("rejects non-boolean feature flags",()=>assert.throws(()=>parsePricingCatalog(JSON.stringify({...fixture,collections:[{...fixture.collections[0],featured:"yes"}]}))));

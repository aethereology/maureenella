import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import {
  createPricingToken,
  verifyPricingToken,
  pricingPath,
  PRICING_TOKEN_TTL_DAYS,
} from "./pricing-link.ts";

test("default lifetime is 90 days", () => {
  assert.equal(PRICING_TOKEN_TTL_DAYS, 90);
});

test("round-trips a first name", () => {
  const result = verifyPricingToken(createPricingToken({ firstName: "Sarah" }));
  assert.equal(result.ok, true);
  assert.equal(result.ok && result.firstName, "Sarah");
});

test("a token minted without a name verifies with no name", () => {
  const result = verifyPricingToken(createPricingToken());
  assert.equal(result.ok, true);
  assert.equal(result.ok && result.firstName, undefined);
});

test("expiry is roughly ttlDays in the future", () => {
  const result = verifyPricingToken(createPricingToken({ ttlDays: 10 }));
  assert.equal(result.ok, true);
  if (!result.ok) return;
  const days = (result.expiresAt.getTime() - Date.now()) / 86_400_000;
  assert.ok(days > 9.9 && days < 10.1, `expected ~10 days, got ${days}`);
});

test("never leaks an email address into the payload", () => {
  const token = createPricingToken({ firstName: "Sarah" });
  const decoded = Buffer.from(token.split(".")[0], "base64url").toString("utf8");
  assert.ok(!decoded.includes("@"), `payload leaked an address: ${decoded}`);
  assert.deepEqual(Object.keys(JSON.parse(decoded)).sort(), ["n", "v", "x"]);
});

test("rejects an expired token", () => {
  assert.deepEqual(verifyPricingToken(createPricingToken({ ttlDays: -1 })), { ok: false });
});

test("rejects a single flipped bit in the signature", () => {
  const token = createPricingToken({ firstName: "Sarah" });
  const [payload, signature] = token.split(".");
  const flipped = (signature[0] === "A" ? "B" : "A") + signature.slice(1);
  assert.deepEqual(verifyPricingToken(`${payload}.${flipped}`), { ok: false });
});

test("rejects a tampered payload", () => {
  const token = createPricingToken({ firstName: "Sarah" });
  const forged = Buffer.from(
    JSON.stringify({ v: 1, n: "Attacker", x: Math.floor(Date.now() / 1000) + 999 }),
  ).toString("base64url");
  assert.deepEqual(verifyPricingToken(`${forged}.${token.split(".")[1]}`), { ok: false });
});

test("rejects an unknown schema version", () => {
  const original = process.env.PRICING_LINK_SECRET;
  try {
    process.env.PRICING_LINK_SECRET = "schema-version-test-secret";
    const payloadB64 = Buffer.from(
      JSON.stringify({ v: 2, x: Math.floor(Date.now() / 1000) + 999 }),
    ).toString("base64url");
    const signature = crypto
      .createHmac("sha256", process.env.PRICING_LINK_SECRET)
      .update(payloadB64)
      .digest("base64url");
    // Validly signed with the secret in effect at verification time, so the
    // signature check passes and verification is rejected only because v !== 1.
    assert.deepEqual(verifyPricingToken(`${payloadB64}.${signature}`), { ok: false });
  } finally {
    process.env.PRICING_LINK_SECRET = original;
  }
});

test("rejects malformed input without throwing", () => {
  for (const bad of ["", ".", "nodot", "a.b.c", "!!!.!!!", "e30.x"]) {
    assert.deepEqual(verifyPricingToken(bad), { ok: false }, `should reject ${JSON.stringify(bad)}`);
  }
});

test("rejects a token signed with a different secret", () => {
  const original = process.env.PRICING_LINK_SECRET;
  try {
    process.env.PRICING_LINK_SECRET = "secret-one";
    const token = createPricingToken({ firstName: "Sarah" });
    process.env.PRICING_LINK_SECRET = "secret-two";
    assert.deepEqual(verifyPricingToken(token), { ok: false });
  } finally {
    process.env.PRICING_LINK_SECRET = original;
  }
});

test("trims and caps an overlong first name", () => {
  const result = verifyPricingToken(createPricingToken({ firstName: "  " + "a".repeat(200) + "  " }));
  assert.equal(result.ok, true);
  assert.equal(result.ok && result.firstName?.length, 40);
});

test("pricingPath builds the route", () => {
  assert.equal(pricingPath("abc.def"), "/pricing/abc.def");
});

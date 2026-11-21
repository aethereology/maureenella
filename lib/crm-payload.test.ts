import test from "node:test";
import assert from "node:assert/strict";
import { EMPTY_INQUIRY } from "./inquiry-validation.ts";
import { inquiryCrmFields } from "./crm-payload.ts";

test("CRM payload preserves all existing webhook field labels", () => {
  const values = { ...EMPTY_INQUIRY, firstName: "Sarah", lastName: "Example", email: "sarah@example.com", cityState: "St. Augustine, FL", hairCount: "4" };
  const fields = inquiryCrmFields(values);
  assert.deepEqual(Object.keys(fields), ["First name", "Last name", "Email", "Phone", "Instagram", "Wedding date", "Venue", "Getting-ready location", "City / State", "Ready-by time", "Interested in", "Hair services (est.)", "Makeup services (est.)", "Interested in preview", "How they found us", "Allergies / sensitivities"]);
  assert.equal(fields["First name"], "Sarah");
  assert.equal(fields.Email, values.email);
  assert.equal(fields["City / State"], values.cityState);
  assert.equal(fields["Hair services (est.)"], "4");
});

test("CRM mapping does not mutate input or accidentally export internal fields", () => {
  const values = Object.freeze({ ...EMPTY_INQUIRY, consentContact: "on", consentNotReserved: "on" });
  const fields = inquiryCrmFields(values);
  assert.equal("consentContact" in fields, false);
  assert.equal("firstName" in fields, false);
  assert.equal(fields.Instagram, "");
  assert.equal(values.consentContact, "on");
});

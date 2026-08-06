import test from "node:test";
import assert from "node:assert/strict";
import {
  pickSuccessMessage,
  SUCCESS_MESSAGE,
  SUCCESS_MESSAGE_NO_AUTORESPONDER,
} from "./inquiry-messages.ts";

test("autoresponderSent: true returns the inbox message", () => {
  assert.equal(pickSuccessMessage({ autoresponderSent: true }), SUCCESS_MESSAGE);
});

test("autoresponderSent: false returns the no-autoresponder message", () => {
  assert.equal(
    pickSuccessMessage({ autoresponderSent: false }),
    SUCCESS_MESSAGE_NO_AUTORESPONDER,
  );
});

test("the no-autoresponder message contains no reference to an inbox, a pricing guide, or an email", () => {
  const lower = SUCCESS_MESSAGE_NO_AUTORESPONDER.toLowerCase();
  assert.ok(!lower.includes("inbox"), `should not mention an inbox: ${lower}`);
  assert.ok(!lower.includes("pricing"), `should not mention pricing: ${lower}`);
  assert.ok(!lower.includes("email"), `should not mention email: ${lower}`);
});

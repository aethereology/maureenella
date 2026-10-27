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
  await expect(page.locator("#email-error")).toContainText("valid email");await expect(page.locator("#firstName")).toHaveValue("Sarah");await expect(page.locator("#gettingReadyLocation")).toHaveValue("Wedding venue");await expect(page.locator("#consentContact")).toBeChecked();await expect(page.locator("#consentNotReserved")).toBeChecked();
});
test("unconfigured production services fail closed without clearing input",async({page})=>{
  await page.goto("/contact");await fillInquiry(page);await page.getByRole("button",{name:"Submit Inquiry"}).click();
  await expect(page.locator("form [role='alert']")).toContainText("couldn't save");await expect(page.locator("#email")).toHaveValue("sarah@example.com");await expect(page.locator("#consentContact")).toBeChecked();await expect(page.getByText("Inquiry received",{exact:true})).toHaveCount(0);
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
test("waitlist retains checked consent after an email validation error",async({page})=>{
  await page.goto("/education");await page.locator('input[name="email"]').fill("not-an-email");await page.locator('input[name="consentContact"]').check();await page.locator('form').last().locator('button[type="submit"]').click();
  await expect(page.locator('[id^="email-error-"]')).toContainText("valid email");await expect(page.locator('input[name="consentContact"]')).toBeChecked();await expect(page.locator('input[name="email"]')).toHaveValue("not-an-email");
});
test("delivery worker rejects unauthenticated callers",async({request})=>{
  const response=await request.post("/api/jobs/deliver");expect(response.status()).toBe(401);
});
test("unsubscribe requires a deliberate POST, never a GET",async({page})=>{
  await page.goto("/unsubscribe/invalid-token");await expect(page.getByRole("button",{name:"Unsubscribe from education emails"})).toBeVisible();await expect(page.getByText("You have been unsubscribed",{exact:false})).toHaveCount(0);
});

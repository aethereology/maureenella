import {defineConfig,devices} from "@playwright/test";
export default defineConfig({
  testDir:"./tests/e2e",fullyParallel:true,forbidOnly:!!process.env.CI,retries:process.env.CI ? 1 : 0,workers:2,
  reporter:[["list"],["html",{open:"never"}]],
  use:{baseURL:"http://127.0.0.1:3000",trace:"retain-on-failure"},
  projects:[{name:"chromium",use:{...devices["Desktop Chrome"]}},{name:"mobile",use:{...devices["iPhone 13"],defaultBrowserType:"chromium"}}],
  webServer:{command:"npm run start -- --hostname 127.0.0.1 --port 3000",url:"http://127.0.0.1:3000",reuseExistingServer:!process.env.CI,timeout:120000,env:{NEXT_TELEMETRY_DISABLED:"1"}},
});

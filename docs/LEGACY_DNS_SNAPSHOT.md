# theparlor.info — Wix DNS zone snapshot (2026-07-12, via Wix Domains API)

Rollback map for the D007/D008 cutover. Source of truth at snapshot time; the
Wix zone stays intact (and revertable) until Wix premium is cancelled.

## ⚠️ DNSSEC IS ENABLED — cutover blocker

`dnssecEnabled: true` (keyTag 13624, SHA-256 digest `417B8843...05C4CD`).
A DS record for Wix's keys lives at the registrar (Squarespace Domains).

**Before or at the moment of switching nameservers away from Wix, DNSSEC must
be DISABLED at Squarespace (remove the DS record).** Skipping this breaks DNS
resolution for all validating resolvers (most of the internet). Re-enable
DNSSEC later only with the new DNS host's keys, once stable.

## Records to re-create at the new DNS host (Vercel DNS)

| Type | Host | Value | Keep? |
|---|---|---|---|
| MX | @ | `1 aspmx.l.google.com` | ✅ Google Workspace email — REQUIRED |
| TXT | @ | `v=spf1 include:_spf.google.com ~all` | ✅ SPF — REQUIRED |
| TXT | @ | `google.com, pub-7998908383565200, DIRECT, f08c47fec0942fa0` | ✅ AdSense verification |
| TXT | `google._domainkey` | `v=DKIM1; k=rsa` | ⚠️ appears truncated/keyless in Wix; check Google Admin → re-generate DKIM there if mail needs it |

## Records that die with Wix (do NOT re-create)

| Type | Host | Value | Why dropped |
|---|---|---|---|
| A | @ | 185.230.63.107 / .186 / .171 | Wix web servers → replaced by Vercel redirect |
| CNAME | www | cdn1.wixdns.net | Wix CDN → replaced by Vercel |
| CNAME | en | cdn1.wixdns.net | Wix multilingual CDN |
| CNAME | s1/s2/sel1._domainkey | `*.ascendbywix.com` | Ascend-by-Wix email-marketing DKIM (service being cancelled) |
| CNAME | sg | `sg.theparlor.info.s010.ascendbywix.com` | Ascend by Wix |
| NS/SOA | @ | ns2/ns3.wixdns.net | replaced by new host |

## Cutover order (per D008)

1. Add theparlor.info + www as redirect domains on the Vercel project.
2. Create the "keep" records above in Vercel DNS for theparlor.info.
3. At Squarespace Domains: **disable DNSSEC (remove DS record)**, then change
   nameservers to `ns1.vercel-dns.com` / `ns2.vercel-dns.com`.
4. Verify: redirect chain, MX lookup, live email send/receive test.
5. Rollback if needed: restore Wix nameservers (zone intact) + re-enable DNSSEC.

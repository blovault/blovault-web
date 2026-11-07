# blovault-web

Public static site for **BLO VAULT** — legal pages and partner disclosure links (Plaid, app stores, etc.).

**Repository:** [github.com/blovault/blovault-web](https://github.com/blovault/blovault-web)

Enable **GitHub Pages** (Settings → Pages → **Deploy from branch `main` / folder `/ (root)`**) to serve this site at  
`https://blovault.com/`. Until Pages is on, only GitHub **blob** links work for human-readable Markdown.

### Which URL should I give Plaid / app stores?

| Kind | Example | What reviewers see |
|------|---------|---------------------|
| **GitHub blob** | `https://github.com/blovault/blovault-web/blob/main/privacy-policy.md` | GitHub’s page with **rendered** Markdown (no raw source). **Works without GitHub Pages.** |
| **raw.githubusercontent.com** | `…/main/privacy-policy.md` | **Plain text source** — harder to read; not recommended as the primary link. |
| **GitHub Pages viewer** | `https://blovault.com/privacy-policy.html` (alias for `view.html?f=privacy-policy.md`) | **Clean reading page** (Markdown → HTML). **Requires Pages enabled.** |

**Recommendation:** Use **blob** if you have not enabled Pages yet. After Pages is live, you may switch forms to the **`.html` / `view.html`** URLs for a simpler reading experience — content stays in the `.md` files only.

---

## Current product configuration (November 2026)

Mirrors the shipping **blo-vault** app at a high level (not legal advice). The site is served at **https://blovault.com** (custom domain via `CNAME`).

| Area | Implementation |
|------|----------------|
| **Client** | Flutter (iOS, Android, macOS) |
| **Local data** | SQLite via **SQLCipher** (AES-256); keys in **iOS Keychain / Android Keystore** |
| **Sign-in** | **Sign in with Apple** on iOS (primary); pseudonymous Supabase user otherwise |
| **App unlock** | **Face ID / Touch ID** and device PIN/passcode; idle session auto-lock |
| **Bank linking** | **Plaid**; **Supabase** Edge Functions as Plaid proxy; encrypted tokens and opaque link ids only |
| **Apple Card / Apple Cash** | **FinanceKit** on the iPhone; stays in the on-device vault |
| **Backup** | Encrypted (AES-256-GCM) iCloud backup on by default with a recovery key; server backup only as fallback |
| **AI** | Optional **on-device** assistant via **Cactus SDK**; ledger not sent to cloud LLMs |
| **Monetization** | **RevenueCat**; 14-day free trial |
| **User wipe** | **Panic Delete** and "Delete account permanently" (Settings) |
| **Crash reporting** | **Sentry**, optional (only if a DSN is configured; not configured today) |
| **Data in transit** | **HTTPS (TLS)**; certificate pinning is **not** used ([Privacy Policy §10](privacy-policy.md)) |

------|----------------|
| **Client** | Flutter (iOS, Android, macOS) |
| **Local data** | SQLite via **SQLCipher** (AES-256); keys in **iOS Keychain / Android Keystore** (`flutter_secure_storage`) |
| **Auth to app** | **Face ID / Touch ID** and device PIN/passcode via `local_auth`; **15-minute** idle session auto-lock |
| **Bank linking** | **Plaid**; **Supabase** Edge Functions as **Plaid proxy only** |
| **Server-stored secrets** | **Encrypted** Plaid access tokens only — not raw transaction payloads |
| **AI** | **On-device** — Gemma 3 via **Cactus SDK**; financial content not sent to model hosts |
| **History window** | Up to **24 months** of transactions analyzed on-device (app constant) |
| **Monetization** | **RevenueCat**; free tier **3** linked Plaid accounts |
| **User wipe** | **Panic Delete** (Settings): clears local DB, secure storage, and local cache boxes |
| **Crash reporting** | **Sentry** (configurable via env); PII scrubbing in client |
| **Data in transit** | **HTTPS (TLS)**; **certificate public-key pinning** for critical endpoints (Supabase and client-configured domains), per [Privacy Policy §10](privacy-policy.md) and Plaid security questionnaire |

**Not claimed here as shipped:** jailbreak/root gating, automated subscription-based server purge schedules — see main app roadmap in the private **blo-vault** repo.

---

## Legal documents

| Document | GitHub (rendered) | Raw |
|----------|-------------------|-----|
| **Privacy Policy** | [privacy-policy.md](https://github.com/blovault/blovault-web/blob/main/privacy-policy.md) | Expanded for **Plaid / App Store / Play** review: collection categories, subprocessors, retention, rights, children, international |
| **Terms of Service** | [terms-of-service.md](https://github.com/blovault/blovault-web/blob/main/terms-of-service.md) | Subscriptions/refunds (platform rules), service changes, liability cap, Delaware + informal dispute step |

In the mobile app, the same substance is under **Settings → Data & Privacy → Privacy Policy** (bundled `assets/legal/privacy_policy.txt`).

**Store consoles:** align **Apple Privacy Nutrition Labels** and **Google Play Data safety** with Privacy Policy §3 — mismatches are a common rejection reason, not “policy length” alone.

**Planned upgrades** (domain email, legal finalization, security hardening): see **[FUTURE.md](FUTURE.md)**.

---

## Vulnerability disclosure (temporary)

Security researchers may report issues to **info@blovault.com**. Include steps to reproduce, affected component, and severity if known. We aim to acknowledge within **48 hours** and provide status updates when practical. **Replace with `security@blovault.com` (or a formal VDP page) when domain mail is live** — see [FUTURE.md](FUTURE.md).

---

## Plaid dashboard (quick paste)

| Field | Value |
|--------|--------|
| Privacy Policy URL | `https://github.com/blovault/blovault-web/blob/main/privacy-policy.md` — or after Pages: `https://blovault.com/privacy-policy.html` |
| Terms of Service URL | `https://github.com/blovault/blovault-web/blob/main/terms-of-service.md` — or after Pages: `https://blovault.com/terms-of-service.html` |
| Support / privacy / security (temporary) | `info@blovault.com` — single inbox until `@blovault.com` addresses exist |

### Plaid — Information Security Policy (attachment)

For questionnaire items that require a **documented Information Security Policy** (e.g. operationalized program to identify, mitigate, and monitor risks), attach or link:

- **File:** [`information-security-policy.md`](information-security-policy.md)  
- **GitHub (rendered):** https://github.com/blovault/blovault-web/blob/main/information-security-policy.md  
- **After GitHub Pages:** `https://blovault.com/view.html?f=information-security-policy.md`  
- **PDF (committed in this repo):** [`information-security-policy.pdf`](information-security-policy.pdf) — also via  
  `https://github.com/blovault/blovault-web/raw/main/information-security-policy.pdf` for direct download.

Regenerate after editing the `.md` (from **blo-vault** repo root, with `fpdf2` + `markdown` installed):

`python3 scripts/export_information_security_policy_pdf.py --url https://raw.githubusercontent.com/blovault/blovault-web/main/information-security-policy.md -o /path/to/blovault-web/information-security-policy.pdf`

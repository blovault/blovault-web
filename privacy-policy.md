# BLO VAULT Privacy Policy

**Last Updated:** November 8, 2026

BLO VAULT ("we," "us," "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, share, and safeguard your information when you use our mobile application (the "App"). BLO VAULT is operated by an individual developer (Chan Hong). We designed the App so that sensitive financial details stay on your device whenever possible.

**In-app:** Settings → Data & Privacy → Privacy Policy.  
**Public copy — GitHub (always works):** https://github.com/blovault/blovault-web/blob/main/privacy-policy.md  
**Easy read — GitHub Pages (enable Pages on repo first):** https://blovault.com/privacy-policy.html

---

## At a glance

- Plaid: you connect banks through Plaid; we act only as needed to access and refresh data you authorize. Transaction and balance data used in the App are stored primarily on your device in an encrypted database.
- No readable copy of your transaction history: we do not store, use, or possess your financial ledger in readable form on our servers. Your encrypted vault backup is kept in your own iCloud storage by default (see 5.1). Only if iCloud cannot be used, and you have confirmed your written recovery code, may an encrypted backup be stored on our servers as ciphertext only (see 5.2); BLO VAULT cannot decrypt either copy.
- Supabase: we use it as a secure proxy; encrypted Plaid access tokens and opaque link metadata (Plaid item/account ids) are stored there — not human-readable account names or balances. If you send in-app feedback (text and optional screenshot), that content is also stored on Supabase for review and product improvement.
- AI: optional assistant features run an on-device language model (Cactus SDK). We do not send your financial ledger to cloud LLM providers for inference.
- Subscriptions: Apple, Google, and/or RevenueCat process payments under their policies.
- Free trial: 14 days from when your pseudonymous account is created. When the trial, a subscription, or beta access ends, we remove your bank connections at Plaid; data already on your device stays until you delete it.
- Diagnostics: if enabled, Sentry may receive crash/performance data with client-side scrubbing of identifiable user fields.
- Sign in with Apple: on iOS, Sign in with Apple is the primary sign-in, so the same account follows you across devices and reinstalls. We receive your Apple user identifier and, if you choose to share it, your email address or an Apple Hide My Email relay address.
- Apple Card and Apple Cash (iOS, optional): if you choose "Add Apple Card", the App reads the Apple Card and Apple Cash accounts you allow, with their balances and transactions, through Apple's FinanceKit on your iPhone. This data stays in your encrypted vault on the device and is never sent to our servers.
- iCloud backup (iOS, on by default, can be turned off in Settings): an encrypted copy of your vault is kept in the App's private iCloud storage under your Apple ID. We cannot read it. Anyone who controls your Apple ID and a trusted device can restore it (see 5.1).
- You can wipe local data with Panic Delete in Settings, disconnect Plaid items as described below, and permanently delete your account with "Delete account permanently".

---

## 1. Scope

This policy applies to the BLO VAULT App on iOS, Android, and macOS where distributed. It does not apply to third-party sites or flows (for example, Plaid Link, your bank, or app stores) — those are governed by their own terms and policies.

## 2. Data collection and use (Plaid and financial data)

BLO VAULT uses Plaid Inc. ("Plaid") to connect your financial accounts. By linking an account, you authorize Plaid and us to access and transmit personal and financial information from the relevant financial institution as described in Plaid’s interface and disclosures.

- On-device storage: retrieved financial data used in the App is stored exclusively on your mobile device in an AES-256 encrypted local database (SQLCipher).
- No server-side storage of raw ledger: we do not store your full raw transaction history on our central servers. Our backend holds encrypted Plaid access tokens and limited metadata needed to operate linking and token refresh.

Categories Plaid may share with the App can include institution and account identifiers, account types, balances, transaction details, investment holdings, and other categories your institution exposes through Plaid — as shown during linking and under Plaid’s consumer disclosures.

### 2.1 Optional in-app feedback

If you use the feedback feature (for example, Settings → Send feedback), you may submit a text message and optionally attach a screenshot. We store that content on our backend (Supabase, including file storage for images) to triage bugs, improve the App, and respond when needed. It may be associated with your pseudonymous Supabase user identifier. Do not include passwords, full account numbers, card numbers, or other secrets in feedback text. Screenshots may unintentionally show sensitive information — crop or avoid sensitive screens if you prefer not to share them. Each report also includes the App version, iOS version, and device model. You may optionally add an email address for a reply and, for problem reports, sync diagnostics (bank connection status and recent sync times, without balances, amounts, or merchant names). We use this only to respond to your report and fix problems, and it is deleted when you delete your account.

### 2.2 Apple Card and Apple Cash (FinanceKit, iOS)

If you tap "Add Apple Card", iOS asks for your permission and lets you choose which accounts to share. With that permission the App reads those accounts, their balances and their transactions through Apple's FinanceKit framework, on your device only. The data is stored in your encrypted on-device vault and in your encrypted backups (5.1, 5.2), is used only to show your balances, spending, statement cycles and cash flow in the App, and is never sent to our servers or to third parties, including AI services. You can stop sharing at any time in iOS settings or by removing the account in the App, which deletes its data from this device.

## 3. Local AI processing

All financial analysis and AI inference for the on-device features are performed on your device using an on-device language model run through the Cactus SDK. Model files are downloaded to your device from third-party distribution infrastructure used by the SDK; those downloads are for model weights and assets, not for uploading your transaction content to a remote inference service in the standard configuration we describe in product materials.

## 4. Third-party service providers

We do not sell your personal information. We use service providers (subprocessors) as needed:

- Plaid Technologies, Inc. — linking and financial data access. See https://plaid.com/legal/
- Supabase — authentication; Edge Functions that proxy Plaid API calls; storage of encrypted Plaid tokens and opaque link ids (not readable account names or balances); operational usage counts (number of linked institutions and accounts, plan tier, number of sync requests, last time the App was opened); plan and beta-access records (type and expiry date); a log of automatic connection removals; and optional user feedback and attachments as described in Section 2.1.
- RevenueCat — subscription entitlements and paywall infrastructure.
- Apple / Google — in-app purchases, platform services, and (if you use optional speech-to-text) operating-system speech processing under their respective privacy policies.
- Sentry — optional crash and performance diagnostics if a DSN is configured; governed by Sentry’s privacy notice.
- Google ML Kit (or similar) — on-device text recognition when you use receipt scanning, where applicable.
- Reference data — some features may request non-identifying reference or market data over HTTPS from third-party hosts (for example, public ticker or index information) solely to power in-App calculations or illustrations.

Each provider processes data under its own terms and privacy notices.

## 5. Authentication and session

- Device unlock: Face ID, Touch ID, or device PIN/passcode via the operating system. We do not receive or store biometric templates.
- Sign in with Apple (iOS): Sign in with Apple is the primary sign-in on first run. We receive and store, through Supabase Auth, your Apple user identifier (a stable identifier specific to this App) and, only if you choose to share it, your email address or an Apple Hide My Email relay address. We do not receive your Apple password. The purpose is to give you the same account across devices and reinstalls, so your linked banks and subscription follow you. When you delete your account, we revoke the App's Apple sign-in token where Apple allows it.
- Backend: Supabase issues a session (JWT) so the App can call our proxy. This is tied to your Apple user identifier, or to a pseudonymous user identifier managed by Supabase if you have not signed in with Apple (for example on Android). On iOS the session is kept in the device Keychain. The session is never included in backups.

### 5.1 iCloud backup (iOS, on by default)

On iOS, the App keeps an encrypted backup of your local vault in the App's private iCloud container under your Apple ID, using your own iCloud storage. It is not visible in the Files app. The backup contains your local database, the key material needed to open it, and a small set of App settings (for example cash flow planning settings such as card statement and payment due days). It does not contain your sign-in session or your PIN. It is encrypted on your device (AES-256-GCM) with a key derived from a random recovery key before it leaves your device; we do not hold that key and cannot read the backup. iCloud storage is governed by Apple’s iCloud terms and your iCloud settings, and it counts toward your iCloud quota; if iCloud is off or full, the backup cannot be saved there.

The App creates the recovery key for you automatically and shows it so you can write it down. The recovery key is also kept in iCloud Keychain, which Apple syncs between your devices with end-to-end encryption. As a result, anyone who controls your Apple ID and a device that is trusted for your iCloud Keychain can restore your backup and read your vault without typing the written code. Protect your Apple ID and your devices accordingly.

The backup is replaced automatically: at most once a day, and only when your data has changed since the last backup. The App keeps the current copy and one previous copy; older copies are overwritten. You can turn iCloud backup off in Settings, and you can back up manually at any time. Turning it off stops new iCloud backups; copies already in iCloud remain until they are overwritten or deleted by Panic Delete or account deletion, or you remove them through your iCloud storage settings. Panic Delete and "Delete account permanently" delete the iCloud backup copies and the synced recovery key.

### 5.2 Server backup (fallback) and recovery key

If iCloud cannot be used on your device (for example iCloud is off or full) and you have confirmed that you wrote down your recovery code, the App uploads the same encrypted backup to our server (Supabase) instead. On Android, where iCloud is not available, the server backup is used after you confirm your recovery code. The backup has the same contents as described in 5.1 and does not contain your sign-in session, your PIN, or the recovery key. It is encrypted on your device (AES-256-GCM) with a key derived from the random recovery key that is generated on your device and shown to you as a recovery code. We store only the ciphertext, a non-secret short identifier of the key, the backup size and the time of the backup. BLO VAULT cannot read, search or use the backup, and cannot recover the recovery code: if you lose both the code and the device copy of the key, the backup cannot be restored by anyone. The App uploads a new backup after setup, periodically while you use the App (at most once a day, and only when your data has changed), and when you tap "Back up now". Only the most recent backup is kept (one per account). With the same account and your recovery code you can restore the backup on a new phone or after a reset. Replacing the recovery key re-encrypts the backup with the new key.

Before Panic Delete, the App makes one final server backup only if you have confirmed your recovery code.

## 6. Subscription and purchase data

Purchases are processed by Apple, Google, and/or RevenueCat. They may collect billing and device identifiers under their policies. We share your pseudonymous Supabase user identifier with RevenueCat as the subscriber identifier, and we receive entitlement information (for example, Pro vs Free) to enforce plan limits such as the number of linked accounts and to decide when bank connections are removed.

## 7. How we use information

We use information to operate and improve the App; link and refresh accounts; enforce tiers; process optional feedback you submit; fix crashes (if Sentry is on); comply with law; and respond when you contact us.

## 8. Legal bases (where applicable)

Where the GDPR, UK GDPR, or similar laws apply, we rely on contract performance, consent where required (including Plaid linking), and legitimate interests in security and improvement, balanced against your rights.

## 9. Data retention and deletion

- On-device data remains until you delete it (Panic Delete or uninstall). Panic Delete, "Delete account & data" and "Delete account permanently" erase it on the device immediately.
- Bank connections: when your free trial (14 days from account creation), subscription, or beta access ends, we remove your connections at Plaid, which ends our access to those accounts. When you use Panic Delete or "Delete account & data", your bank connections stay paused and we remove them at Plaid by the last day of the current calendar month, because Plaid bills each connection per calendar month; we delete your account at the same time. Signing back in with the same account before then restores the connections without linking again, when a recovery-key copy exists. Panic Delete and "Delete account & data" delete your iCloud backup copies and the synced recovery key (5.1) right away. A server backup (5.2), if one exists, is not deleted at once: it is kept until that same month-end date so your data and connections can be restored together with your recovery code, and it is deleted with your account on that date.
- "Delete account permanently" (Settings): ends your account for good. We delete your server backup snapshot immediately, along with your iCloud backup copies and synced recovery key; your bank connections are removed at Plaid by the last day of the current calendar month, and your account (including your Apple user identifier and email or relay address held by Supabase Auth) is deleted after that. We also revoke the App’s Apple sign-in token where Apple allows it. Because the deletion is final, restoring from a backup afterward is not possible. A copy of the connection credentials may be kept only in a form encrypted with your own recovery key, which BLO VAULT cannot read; without it, connections cannot be restored and are removed by the last day of the month. Uninstalling the App does not by itself disconnect your banks. To disconnect a bank right away, remove it in the App. For complimentary (permanent) beta access, we also remove your connections after 90 days without you opening the App; the beta access itself continues and you can link your accounts again.
- iCloud backup (5.1): kept in your iCloud storage as the current copy plus one previous copy, replaced by each new backup; deleted by Panic Delete and account deletion as described above, or by you through iCloud. Apple’s retention applies to anything Apple holds.
- Server backup (5.2): kept while your account exists and replaced by each new backup; deleted when your account is deleted (immediately for "Delete account permanently"; by the last day of the calendar month for Panic Delete and "Delete account & data", as described above).
- Sign in with Apple data (Apple user identifier, email or relay address) is kept by Supabase Auth while your account exists and is deleted with it.
- Encrypted tokens and related opaque link metadata on Supabase remain until you remove linked items, revoke access through Plaid or the App where available, or we delete them in connection with support or closure processes. We do not retain readable account names or balances on our servers.
- Feedback records and attachments on Supabase are deleted when you use "Delete account & data" or "Delete account permanently" in the App. Otherwise they are retained for as long as needed to operate support and improve the App unless we delete them earlier or you ask us to delete them where applicable law requires.
- Sentry data is retained per Sentry project settings.
- Plan and beta-access records and connection-removal logs are kept while your account exists and for as long as needed to operate billing and support.

## 10. Data security

We use industry-appropriate measures, including: AES-256 encryption at rest on device; OS secure storage (e.g., iOS Keychain / Android Keystore) for key material; and HTTPS (TLS) for data in transit between the App and our backend and other configured hosts. The App does not use certificate pinning; it relies on the platform’s standard TLS certificate validation (including OS trust store updates).

## 11. Your rights (CCPA, U.S. state laws, and others)

Depending on where you live, you may have the right to access, delete, or correct personal information we hold; to opt out of certain processing; or to appeal.

### 11.1 California (CCPA/CPRA)

you may have the rights to know, delete, and correct. We do not sell personal information as defined by the CCPA. Use in-app controls (Data & Privacy, Panic Delete) and email us below. We will not discriminate for exercising these rights.

### 11.2 Other U.S. states

residents of states with comprehensive privacy laws may have similar rights — contact us with your request.

### 11.3 EEA, UK, Switzerland

you may have GDPR-related rights, including lodging a complaint with a supervisory authority.

(Federal financial privacy rules such as GLBA primarily govern financial institutions; if you have questions about how they apply to your bank or broker, consult that institution’s privacy notice.)

## 12. Children’s privacy

BLO VAULT does not knowingly collect personal information from anyone under 13 (or the minimum age required in your region). If you believe we have, contact us and we will take appropriate steps.

## 13. International users

We are based in the United States. Your information may be processed in the U.S. and in locations where subprocessors operate. We use appropriate safeguards where required by law.

## 14. Beta and test programs

If you install a pre-release or beta build (for example through Apple TestFlight or similar), the platform provider may collect additional diagnostics, crash data, or usage metadata under its beta program terms, in addition to the practices described in this Policy.

### 14.1 Beta invite requests

If you request a beta invite on our website, we store the email address you enter, an optional name, and a salted hash of your IP address (used only to limit abuse). We use them to send your invite and code. We keep them until your request is declined or the beta ends, and delete them sooner if you ask (info@blovault.com).

## 15. Changes to this policy

We may update this policy. We will post the new version in the App and on our public page and change the “Last Updated” date. Continued use where permitted by law constitutes acceptance of the updated policy.

## 16. Contact

info@blovault.com

For privacy requests, include enough detail for us to verify and process your request. We will respond within timeframes required by applicable law.

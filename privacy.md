# Renota — Privacy Policy

**Last Updated:** 2026-11-09
**Effective Date:** 2026-11-09

Renota ("we", "our", "the extension") is a Chrome extension that helps you capture text you read on the web and use it as personal context for AI-assisted writing. This Privacy Policy explains what data Renota handles, how it is used, and the choices you have.

By installing or using Renota, you agree to this Privacy Policy. If you do not agree, please uninstall the extension.

---

## 1. Scope

This policy applies to the Renota Chrome extension (the "Extension") distributed through the Chrome Web Store and any associated first-party infrastructure that the Extension communicates with — specifically the telemetry endpoint described in Section 4 and the optional cloud sync service described in Section 3.1. The same cloud sync service is used by the Renota Zotero plugin and the Renota Android app ("FloatReader"), and this policy covers that service for all three clients.

It does **not** apply to third-party services that you choose to connect to through Renota (such as LLM providers). When you configure an LLM provider, your prompts and the response from that provider are governed by that provider's own privacy policy. Section 5 lists the providers we currently support and links to their policies.

---

## 2. Data We Do NOT Collect

We want to be clear about what we do **not** do:

- We do **not** collect the content of the web pages you visit.
- We do **not** collect the text you select unless you explicitly save it to your Knowledge Base.
- We do **not** collect your LLM API keys. API keys are stored only in your browser and sent directly from your browser to the LLM provider you choose. They never pass through our servers.
- We do **not** sell, rent, or trade any data to third parties for advertising or marketing.
- We do **not** use your data to train any AI model.

---

## 3. Data Stored Locally in Your Browser

The following data is stored **only in your browser** (using `chrome.storage.local` and `IndexedDB`). It is not transmitted to our servers, and we have no technical ability to read it — **unless you explicitly turn on Cloud Sync**, described in Section 3.1. Cloud Sync is off by default and requires an explicit sign-in.

| Data | Purpose | Location |
|------|---------|----------|
| **Knowledge Base entries** ("clips", "insights", imported markdown files) | Your personal knowledge library, used as context for AI generation | IndexedDB |
| **Selected text you save** | Captured from web pages when you explicitly choose "Save to Renota" | IndexedDB |
| **Page metadata** (URL, title, language) of saved items | Source attribution for saved knowledge | IndexedDB |
| **Your LLM provider settings** (provider name, base URL, model) | So we know which API to call | IndexedDB |
| **Your LLM API key** (BYOK — Bring Your Own Key) | Authentication with your chosen LLM provider | IndexedDB |
| **UI preferences** (locale, theme, toolbar position, action prompts) | Personalize your experience | `chrome.storage.local` |
| **Anonymous install ID** (UUID v4, generated locally) | Used only for anonymous telemetry (Section 4) | `chrome.storage.local` |

You can inspect, export, or delete all of this data at any time. See Section 7 for instructions.

---

### 3.1 Cloud Sync (optional, off by default)

Cloud Sync keeps your knowledge base consistent across the Chrome extension, the Zotero plugin and the Android app. It is entirely opt-in: nothing is uploaded until you sign in with your email address on a device.

**How it works.** You enter your email in Settings → Cloud Sync and receive an 8-character login code. Verifying the code issues a per-device access token (stored in `chrome.storage.local`). While signed in, the clients periodically call our sync endpoints (`/v1/sync/pull`, `/v1/sync/push`) to exchange knowledge entries.

**What is uploaded** — only knowledge entries (the data listed in Section 3 that is part of your knowledge base):

| Data | Purpose |
|------|---------|
| Clip content and surrounding context | So the entry is available on your other devices |
| Source metadata (URL, title, domain, Zotero item/attachment keys, Android app name) | Attribution and navigation back to the source |
| Tags, concepts, derived-from links, language, timestamps | Search quality and conflict resolution |
| A SHA-256 hash of each entry's content | Duplicate detection during sync |
| Delete markers ("tombstones") | So a deletion on one device propagates instead of resurrecting |

**What is never uploaded:**

- Your LLM API keys. They stay on each device (the Android app encrypts them with the system keystore) and go straight to your chosen provider.
- Your browsing history, page content you did not save, or anything from other tabs or apps.
- Screenshots or OCR images from the Android app — only the text you explicitly save.

**Where it is stored.** A managed PostgreSQL database operated on our behalf by our hosting providers (Vercel and a managed Postgres provider), in the Asia-Pacific region. Entries are stored as plain text on the server, so this is **not** end-to-end encrypted: we could technically read them. Do not sync content you are unwilling to store that way. Delete markers are purged after 90 days.

**Your controls.** Sign out on any device to stop syncing; the local copy remains. Deleting an entry propagates to your other devices. To delete your account and all cloud data, use the delete-account API (`DELETE /v1/me` with a valid device token) or contact us at `support@werenota.com`; deletion cascades to every entry, device token and login record belonging to the account.

## 4. Anonymous Telemetry

Renota includes an **opt-in** anonymous telemetry feature. Telemetry is **disabled by default** and is only sent after you grant consent in the Extension's settings panel.

### 4.1 What is sent

When telemetry is enabled, the Extension sends the following fields to `https://telemetry.werenota.com/v1/events`:

- `event` — a string from a fixed enum (e.g., `knowledge_saved`, `ai_generation_completed`, `extension_installed`)
- `installId` — a randomly generated UUID v4 stored locally; **not** derived from any user identity
- `appVersion` — the Extension version (e.g., `"1.0.0"`)
- `productStage` — a build-time constant (`"mvp0"` or `"mvp1"`)
- `timestamp` — Unix epoch milliseconds

### 4.2 What is NEVER sent

- Page URLs, page titles, or any page content
- Selected text or saved knowledge content
- Your LLM API key, model name, or LLM responses
- IP address (server logs are retained per Section 8)
- Any identifier that can be linked to a real person

### 4.3 Why we collect this

Telemetry helps us understand which features are used and which are not, so we can prioritize improvements. It contains no content and cannot be used to identify you.

### 4.4 How to opt out

You can disable telemetry at any time:

1. Open the Renota side panel.
2. Go to **Settings → Privacy**.
3. Toggle **"Share anonymous usage data"** off.

When disabled, no requests are sent to `telemetry.contextflow.app`. Uninstalling the Extension also stops all telemetry.

---

## 5. Third-Party Services You Choose

Renota does not include a built-in AI model. You provide your own LLM provider and API key (BYOK). When you use an AI feature, your prompt and (optionally) retrieved knowledge entries are sent **directly from your browser** to the provider you configured.

The current list of supported providers is:

| Provider | Endpoint | Privacy Policy |
|----------|----------|----------------|
| **OpenAI** | `https://api.openai.com/v1` | https://openai.com/policies/privacy-policy |
| **DeepSeek** | `https://api.deepseek.com` | https://www.deepseek.com/privacy |
| **OpenRouter** | `https://openrouter.ai/api/v1` | https://openrouter.ai/privacy |

Renota's servers are **not** in this data path. Your API key, prompts, and responses flow only between your browser and the LLM provider you selected.

If you configure a custom base URL, you are responsible for reviewing that provider's privacy practices.

---

## 6. Permissions Explained

Chrome requires us to declare the permissions we use. Here is why we use each one:

| Permission | Reason |
|------------|--------|
| `storage` | Persist your settings and knowledge base locally |
| `sidePanel` | Open the Renota workspace in Chrome's side panel |
| `activeTab` | Inject helpers into the page you are currently viewing, only after you click the toolbar |
| `scripting` | Read page metadata when you use the right-click "Save to Renota" menu |
| `contextMenus` | Add the "Save to Renota" item to Chrome's right-click menu |
| `offscreen` | Run the local indexing/retrieval worker in the background |
| `<all_urls>` host permission | Allow the toolbar and right-click menu to work on every site you read |

We do **not** inject advertising, modify page content, or exfiltrate data to remote servers beyond the third-party endpoints listed above.

---

## 7. Your Rights and Choices

### 7.1 Access and export

- Open the Renota side panel → **Knowledge** tab → click the export icon to download all saved entries as a JSON or Markdown file.

### 7.2 Delete

- Open **Settings → Data** and click **"Clear all local data"** to remove the knowledge base, settings, and install ID from this browser.
- Uninstalling the Extension also removes all locally stored data.
- If you enabled Cloud Sync: **Settings → Cloud Sync → Sign out** stops syncing on that device. To remove the data from our servers, delete your account (`DELETE /v1/me`) or contact us at `support@werenota.com`.
- To request deletion of any telemetry data we may have received, contact us at `support@werenota.com`.

### 7.3 Disable features

- Turn off telemetry: see Section 4.4.
- Turn off cloud sync: **Settings → Cloud Sync → Sign out** (or untick "Enable cloud sync").
- Turn off the right-click menu: open **Settings → General**.
- Turn off the in-page toolbar: open **Settings → Toolbar**.

### 7.4 Rights under GDPR (EEA / UK)

If you are in the EEA or UK, you have the right to access, rectify, erase, restrict, port, and object to the processing of your personal data, and to lodge a complaint with your supervisory authority. Our lawful basis for the limited processing described in Section 4 is **consent**, which you may withdraw at any time.

### 7.5 Rights under CCPA/CPRA (California)

If you are a California resident, you have the right to know, delete, correct, and limit the use of sensitive personal information. Renota does not sell or share personal information for cross-context behavioral advertising.

---

## 8. Data Retention

- **Local data** (IndexedDB / `chrome.storage.local`): retained until you clear it or uninstall the Extension.
- **Cloud sync data**: retained while your account exists. Delete markers are purged after 90 days. Deleting your account removes all entries, devices and login records.
- **Telemetry events** on `telemetry.contextflow.app`: retained for up to **90 days** in aggregate form, then deleted. They are never linked to an individual.
- **LLM prompts and responses**: handled by the third-party provider you configured. Please refer to their retention policies (Section 5).

---

## 9. Security

We take reasonable measures to protect the limited data we handle:

- All network traffic uses HTTPS (TLS 1.2+).
- API keys never leave your browser except to the LLM endpoint you configured.
- The Extension follows the principle of least privilege: no permission is requested unless it is required for a documented feature.
- We do not run our own servers in the request path of your prompts or responses.

However, no system is perfectly secure. If you discover a vulnerability, please report it to `security@werenota.com`.

---

## 10. Children's Privacy

Renota is not directed to children under 13 (or under 16 in the EEA/UK). We do not knowingly collect personal information from children. If you believe a child has installed the Extension, please contact us so we can assist with removal.

---

## 11. International Users

Renota is operated from China. By using the Extension, you understand that any telemetry data you have opted into may be transferred to and processed in China. We rely on standard contractual safeguards and your explicit consent (Section 4) for any such transfer.

---

## 12. Changes to This Policy

We may update this Privacy Policy from time to time. When we do, we will:

- Update the "Last Updated" date at the top of this page.
- For material changes, display an in-app notice and request renewed consent where required.

Previous versions of this policy are available on request at `support@werenota.com`.

---

## 13. Contact

If you have any questions, complaints, or data requests, please contact us:

- **Email:** support@werenota.com
- **Security reports:** security@werenota.com
- **General inquiries:** support@werenota.com

We aim to respond within **7 business days**.

---

## Appendix A — Telemetry Event Catalog

For full transparency, here is the complete list of telemetry event names that may be sent when telemetry is enabled. None of them include content; they are pure counters.

- `extension_installed`
- `knowledge_saved`
- `knowledge_deleted`
- `knowledge_search`
- `ai_setup_viewed`
- `ai_setup_started`
- `ai_setup_test_success`
- `ai_setup_test_failed`
- `ai_generation_started`
- `ai_generation_completed`
- `generation_with_knowledge`
- `knowledge_clip_retrieved`
- `knowledge_loop_completed`
- `editor_write_success`
- `editor_write_fallback`
- `markdown_import_completed`
- `semantic_search_enabled`

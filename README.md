# Dolbundaljai Company — Google Login + Supabase edition

This is the separate Vercel-targeted edition of the existing pixel company. The original `../snack-studio` Sites application is preserved. Do not replace Sites' hosted identity with this OAuth client.

## Delivery status

Implementation and local validation are available. **Supabase project Dolbundaljai has been created in AppStack-Dev (Singapore), and the company_core migration and owner allowlist have been applied. Owner Google sign-in, callback, membership, cloud document save/history and refresh restoration are verified in the local app. Vercel deployment remains pending.** Cloud uploads and cross-device continuity still require the acceptance checks below.

The sole initial owner is `dolbundaljai@gmail.com`, selected by the user. An authenticated Google identity does not by itself grant company access. Membership is assigned only after the trusted confirmed auth email matches the private allowlist. Other accounts cannot read or write company data or files.

## Local commands

Use Node.js 22.12+ (or supported newer version).

```sh
npm ci
npm test
npm run build
npm run dev
```

Local development uses `http://127.0.0.1:4174/`. Copy `.env.example` to `.env.local` and configure the **public project URL and publishable key only**. A secret/service-role key must never be placed in any `VITE_*` variable. The app rejects a service-role or secret key; authorization is enforced separately in PostgreSQL and Storage policies.

## Provisioning record

Supabase project: `pqyiufkvvnnoiovybkee`, organization: `AppStack-Dev`, region: `ap-southeast-1`; status verified ACTIVE_HEALTHY on 2026-10-29. The company_core migration and owner seed are installed. Google callback URI: `https://pqyiufkvvnnoiovybkee.supabase.co/auth/v1/callback`. Public RPCs use invoker wrappers; definer implementations and the owner allowlist are in the unexposed private schema. Security advisor reported only the intentional no-policy entry on private.allowed_owners, which is closed to client roles by grants and RLS. [Advisor explanation](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy).

## One-time service setup (steps 1–2 completed)

1. Create a dedicated Supabase project named **Dolbundaljai** in the owner's account, preferably Singapore. Keep credentials in the service's secure settings. Do not paste secrets in chat or source files. Do not upgrade to a paid plan without the owner's choice.
2. Apply `supabase/migrations/202610290001_company.sql`, then `supabase/setup-owner.sql` using the project's administrator connection or SQL editor. This creates company documents, immutable version history, membership and private media policies. Run on a fresh project; the migration intentionally does not delete/replace existing tables or buckets.
3. In Google Cloud create/configure an OAuth consent application and Web application OAuth client for this company. Use scopes `openid email profile`; Gmail read/send access is not needed. During Google testing mode add `dolbundaljai@gmail.com` as a test user. Register the exact redirect URI shown by the Supabase Google provider (`https://<project-ref>.supabase.co/auth/v1/callback`). Enter the Google client ID and secret directly in Supabase's Google provider settings. The secret is server-side only.
4. Enable Google sign-in in Supabase. Disable unneeded authentication providers including email/password. Configure the exact production origin as Site URL and allow the exact production root URL plus `http://127.0.0.1:4174/` for local development. Add staging origins explicitly if used; avoid wildcard preview domains.
5. Create a Vercel project from this folder. Build `npm run build`; output `dist`; Node 22+. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` as the public project values and deploy. These are build-time values, so redeploy after changing them. Never add Google secrets or privileged database keys to Vite variables.
6. After the final Vercel URL is known, finish the exact Supabase redirect allowlist and test the live flow. No app code should need an arbitrary user-controlled return URL.

## What persists

- One versioned company document: products, brand settings, seven clip tasks, captions/storyboards, review checks, approvals, upload links, recent content events, selected overtime and recent character interactions.
- Every successful document save has an immutable full snapshot with server timestamp and acting user; the UI lists history 20 versions per page and exports a selected version. Latest content-event list remains bounded at 80 items, while all document versions remain stored.
- Media: dedicated private `company-media` bucket and metadata table. Supported JPG, PNG, WebP, MP4, WebM and MOV; **50 MiB maximum per file**. Uploads over 6 MiB use TUS resumable transport with retries within the current page. A failed/reloaded upload may need the original file selected again. There is no automatic background upload after the page is closed.
- Storage objects cannot be overwritten/deleted by browser users; replacing a review video creates a new ID and revokes its approval. Finalization verifies object presence and size. Download requires an authorized session.
- Animation positions, temporary character commands and pause/zoom state are transient. Attendance is recomputed from Bangkok time; reopening does not resume exact footsteps. Character activities remain simulation, not AI job execution.

## Save and recovery behavior

The browser serializes snapshots using a server revision check. The server locks the document and rejects a stale revision (`PT409`) instead of overwriting other work. Failed saves remain visibly pending. Ordinary network failures can be retried; conflicts require exporting local work and loading the newest company document. There is no automatic merge.

Pending drafts are cached in this browser under the authenticated user AND company IDs as a best-effort recovery aid. If local storage fails, the UI warns the user to wait for a successful server save. On refresh, recovery is offered only for that user/company. A stale draft can be exported but cannot overwrite a newer company version. Uploaded binary files are not in this draft cache. Logout requires saved work and no in-flight upload.

## Move existing local data

On the old site, open Settings → export backup, and retain original media files separately. In the new company, before the first save, open Settings → import JSON. Import copies only recognized textual data into the fixed seven tasks and two products. It intentionally clears media references, product verification, checks, approvals and posted status; it never imports untrusted company membership or file IDs. Upload originals and verify products/clips again. Import is disabled after the first cloud save; this prevents silently replacing an active company. Original website data is not deleted or modified.

## Acceptance before live use

- Owner Google sign-in, callback and browser refresh restore the same workspace. Signing out clears the visible company. Other Google account and anonymous requests cannot read documents/history/media or call mutation functions.
- Save a product and a task, reopen on another device and check the same data. Make conflicting changes in two windows; the second must show conflict, retain its pending work and offer export/reload.
- Upload a small image and a video larger than 6 MiB, refresh, preview and download both. Try interrupted upload. Verify metadata/policies on the real Supabase Storage service.
- Approve only after verified product data, a private video, caption and all checks. Edit product or task or replace video; it must require review again. Server rejects incomplete approvals.
- Review history, export a version and test offline retry/draft recovery without claiming unsaved data is persisted.

## Local validation (2026-10-29)

- 12 unit tests and one PostgreSQL integration test passed; production build passed.
- Login layout inspected at 840px, 1440px (scaled iframe) and 390px (iframe).
- Temporary browser fixture verified save failure retains edits, retry succeeds, and a stale revision shows export/reload without retry-overwrite. Fixture files removed.
- Google provider is enabled. The owner completed sign-in and callback; a live database query confirmed the Google identity, confirmed owner email and owner membership. A UI interaction (petting Som) saved revision 1 with seven task drafts and two products plus an immutable history record. Browser refresh restored the authenticated company, saved revision and interaction log. Hosted Storage/TUS, sign-out, a second account and cross-device behavior remain untested.
- `evidence/login-preview.png` shows the real unconfigured login screen, not an authenticated workspace.

## Tests and limits

Unit tests cover queue serialization, immutable snapshots, retry/conflict and import invalidation. The PostgreSQL integration test runs directly in Node after the unit suite because this workspace’s Node 23.5 child test runner stalled during PGlite initialization; the direct invocation completes. PGlite executes the migration against local auth/storage table stubs to test PostgreSQL policies and RPCs. The stubs do **not** replace live testing of Google or Supabase's hosted Storage HTTP/TUS layer. Existing approval workflow, Bangkok schedule and company pathfinding tests are retained.

The AI research/generation/editing services are still unconnected. This change adds identity and persistence, not autonomous content production or posting. No subscription cost has been committed. History snapshots and immutable media accumulate; agree on retention and backup before scaling beyond the pilot.

Official references: [Google provider](https://supabase.com/docs/guides/auth/social-sign-in/auth-google), [PKCE](https://supabase.com/docs/guides/auth/sessions/pkce-flow), [Storage policies](https://supabase.com/docs/guides/storage/security/access-control), [uploads](https://supabase.com/docs/guides/storage/uploads/standard-uploads), [public keys](https://supabase.com/docs/guides/getting-started/api-keys).

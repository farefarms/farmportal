# FARE Farms platform

**Rooted in Ancestral Knowledge. Growing Food Sovereignty.**

The FARE Farms website is a knowledge hub for Afro-Indigenous-centred agricultural heritage and land stewardship. It includes a Knowledge Library, a heritage crop directory, garden and project pages, consent-based stories and recipes, events with registration, and a Marketplace with a coming-soon page that is designed to grow into a store later.

It's built with **Next.js 16** (App Router) and **Payload CMS 3.82**, with Postgres for the database and Vercel Blob for media. Both the site and the editing admin (`/admin`) run as one app on Vercel.

> **Status:** This first build hasn't been installed or run yet, because it was written in an environment without package access. Expect to fix a few small things on the first `pnpm install && pnpm dev`. See [First run checklist](#first-run-checklist).

---

## Quick start (local)

Requirements: **Node 24.22+**, **pnpm 10**, and a Postgres database (a local install, Docker, or a free Neon database).

```bash
cp .env.example .env          # then fill in POSTGRES_URL (or DATABASE_URL) and PAYLOAD_SECRET
pnpm install
pnpm dev                      # http://localhost:3000  ·  admin at /admin
```

1. Open **/admin** and create the first account. It automatically becomes an **Admin**.
2. Seed the content from the redesign:
   - `pnpm seed` creates **unpublished drafts** (crops, library items, histories, gardens, events, partners) for editors to verify and publish.
   - `pnpm seed:demo` publishes the same content so you can see the site full. Use it **for local preview only**: it bypasses review and verification.
3. `pnpm generate:types` writes `src/payload-types.ts`. Commit it.

In local development, Payload updates the database schema automatically. Production uses migrations (see below).

## Deploying to Vercel

1. Push this repo to GitHub and import it in Vercel.
2. In the Vercel project, add **Storage → Neon (Postgres)** and **Storage → Blob**. These set `DATABASE_URL` and `BLOB_READ_WRITE_TOKEN` for you (the app also accepts `POSTGRES_URL`).
3. Add environment variables:
   - `PAYLOAD_SECRET`: a long random string (`openssl rand -hex 32`)
   - `NEXT_PUBLIC_SITE_URL`: the live URL, e.g. `https://farefarms.ca`
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`: optional. Leave it empty for no analytics.
4. **Create the first migration** locally against an empty database, then commit it:
   ```bash
   pnpm migrate:create initial
   git add src/migrations && git commit -m "Initial database migration"
   ```
5. Deploy. Vercel runs `vercel-build`, which applies migrations (`payload migrate`) and then builds the site.
6. Visit `/admin` on the live site to create the first admin account.

Whenever you change a collection's fields, run `pnpm migrate:create <name>` and commit the new migration file.

## What's in the box

| Section (nav) | Pages | Content source |
|---|---|---|
| Home | `/` | Home page global plus the latest crops, library items, gardens and events |
| Our Roots | `/our-roots` | Black farming histories (`people`), partners |
| Learn | `/learn` (search and filters), `/learn/[slug]`, `/learn/crops`, `/learn/crops/[slug]` | `resources`, `crops`, `topics` |
| Land & Gardens | `/land-and-gardens`, `/land-and-gardens/[slug]`, `/land-and-gardens/stewardship/[slug]` | `projects`, `stewardship-guides` |
| Food & Culture | `/food-and-culture`, `/recipes/[slug]`, `/stories/[slug]` | `recipes`, `stories` |
| Events & Community | `/events` (filters), `/events/[slug]` (registration), `/events/[slug]/ics` | `events`, `event-registrations` |
| Get Involved | `/get-involved` | Volunteer and contribute-knowledge forms |
| Marketplace | `/marketplace` | Marketplace global, sign-up, producer interest |
| Also | `/privacy`, `/accessibility`, `/sitemap.xml`, `/robots.txt` | |

### Content models (from the brief)

- **Crop profile**: name, scientific name, regional names, origin, cultural and community context, growing zone, planting steps, culinary uses, seed saving, images, sources, contributor, reviewer, related resources and future products.
- **Library resource** (heritage article, guide, how-to, primer, story series, research, video, download, toolkit): topics, region or community, historical context, body, file or video, sources, contributor, cultural review, related content.
- **Stewardship guide**: practice, materials, steps, safety, ecological impact, site example, references, and a protocol note recording who was consulted.
- **Story / oral history** and **Recipe**: contributor, consent scope (public, community only, or archive only), documented consent, attribution, media rights, review status, withdrawal contact, and a withdrawn switch.
- **Garden / project**: location, description, status, confirmed flag, activities, gallery, partners, roadmap phases, and dated updates. Only updates marked verified are shown.
- **Event**: category, dates, location, site, status, confirmed flag, accessibility notes, and registration (capacity with waitlist, closing date, or an external link).
- **Product** and **Producer** (future): SKU, category, producer, provenance, price, tax class, inventory, fulfilment, regulatory flags, and educational links. These are admin-only and never shown on the site.

## Editorial workflow

| Role | Can do |
|---|---|
| **Contributor** | Write and save drafts. Can't publish or approve. |
| **Reviewer** | Approve content after checking sources and cultural protocols. The only role, besides Admin, that can set "Approved". |
| **Editor** | Publish, unpublish and manage events, gardens and partners. |
| **Admin** | Everything, including people, roles, form submissions and marketplace data. |

Every content type keeps **drafts and revision history**. Content moves through **Draft → In review → Approved → Published**.

### How the brief's acceptance criteria are enforced

| Criterion | Where it's enforced |
|---|---|
| Every educational article has an author or reviewer and verifiable sources | `hooks/publishGuards.ts` blocks publishing crops, library resources, stewardship guides and histories until a contributor, a reviewer, reviewer approval and at least one source are in place. |
| Crop directory can be updated without code changes | Crops are a CMS collection, so no crop data is hard-coded. |
| Unconfirmed events, achievements and partner claims aren't published as facts | Events, gardens and partners need **Details confirmed** to be ticked before they can go live, and the public API only returns confirmed records. Project updates show only when marked verified. Impact statistics were removed. |
| Sensitive oral histories stay private until permission and review | The public can only read stories and recipes that are published, have **public** consent scope, have **documented** consent and haven't been withdrawn. Private contact fields are hidden from the API. |
| Marketplace has no live checkout until approved | There is no checkout code in this build. Product data is admin-only. |
| Forms include consent, spam protection and data-handling disclosures | Every form requires consent and stores the exact consent wording with a timestamp. Spam protection uses a honeypot and a time trap. Each form links to the privacy notice. |
| Mobile, keyboard, screen-reader and contrast | Pages have a skip link and visible focus, every field is labelled, errors are announced, colours meet AA contrast, the menu works without JavaScript, video embeds are privacy-enhanced and audio comes with transcripts. Test with real assistive technology before launch. |
| Navigation and resource links resolve | Every nav item has a route. Library and crop links come from slugs. `/sitemap.xml` lists every published page. |

## Search

The Knowledge Library searches titles, summaries and regions of library resources, and the names, scientific names, regional names and summaries of crops. It filters by topic and type. It renders on the server and works without JavaScript. If the library grows past a few thousand items, consider Postgres full-text search or a hosted search service.

## Design

The site uses the visual language of the original fare-farm.vercel.app: a floating pill header with a full-screen menu, dark grain-textured heroes with drifting pollen, a tilted marquee band, pill buttons with circular arrow badges, rounded 2rem cards, mud-cloth and furrow textures, and headings whose words rise into view. Colours are soil, cream, leaf, clay and sun, set in Bricolage Grotesque (display) and Inter (text).

- All styles live in `src/app/(frontend)/globals.css` (plain CSS, no framework). The clay used for small text is slightly deeper than the original so it passes WCAG 2.2 AA contrast.
- Interactive pieces (menu, scroll reveals, pollen canvas, season switcher, the "plant a seed" game) are small DOM modules in `src/lib/enhance/`, mounted by thin client components. Pages are fully readable without JavaScript, and all motion is switched off for people who prefer reduced motion.
- Where a photo has not been uploaded and verified yet, `Photo` shows a designed placeholder panel marked "Photo to come". Upload verified images (with alt text and credit) in the admin and they replace the placeholders automatically.

## Marketplace roadmap

1. **Now:** coming-soon page, update sign-ups (`subscribers` list "marketplace") and producer interest (`producer-interest`).
2. A curated catalogue and producer profiles, built from the existing `products` and `producers` collections.
3. Secure checkout, tax, inventory and fulfilment, for example with Stripe and Stripe Tax. Before launch, review Canadian food and seed regulation, GST/PST, privacy, payments, shipping, refunds and producer agreements.
4. A multi-producer marketplace with approvals, commissions and local pickup.

Commerce stays a separate add-on. The educational pages never depend on it.

## First run checklist

- [ ] `pnpm install && pnpm dev`, then fix any type errors (`pnpm typecheck`) and lint warnings.
- [ ] `pnpm generate:importmap` if the admin reports a missing component, then commit `src/app/(payload)/admin/importMap.js`.
- [ ] `pnpm generate:types`, then commit `src/payload-types.ts`.
- [ ] `pnpm test` (unit tests for spam protection and slugs).
- [ ] Create the first admin, run `pnpm seed`, and review the drafts.
- [ ] Create the initial migration before the first Vercel deploy.

## Before launch: verify content

- [ ] Event dates, places and status. The seeded events come from the old site and are unconfirmed.
- [ ] Garden sites: status, locations and partner relationships (Museum of Vancouver, Vancouver Maritime Museum, Copley Community Orchard).
- [ ] Naming: the old site says "Sylvia Stark Garden", while Kor's brief says "Ernie King Outdoor Amphitheatre and Garden".
- [ ] Trillium Park roadmap phase statuses.
- [ ] Crop profiles: facts, regional names, sources and a named reviewer. The seed adds a "SOURCE NEEDED" placeholder.
- [ ] Black farming histories: sources and credited images.
- [ ] Photography: use only verified, credited project photos. Untick "Verified" for anything that isn't.
- [ ] Have the privacy notice reviewed against BC PIPA.

## Not yet built (next steps)

- Email notifications to staff when forms are submitted, and confirmation emails to submitters (Payload email adapter, e.g. Resend).
- A members area for "community only" stories.
- Image resizing (add `sharp` to the Payload config) and an image focal point for crops.
- CAPTCHA (e.g. Cloudflare Turnstile) if spam gets past the honeypot.
- A content submission workflow that turns a moderated knowledge submission into a draft story or recipe with one click.

## Project structure

```
src/
  access/        roles and access-control helpers
  collections/   Payload content models
  fields/        shared fields (slug, review and sources, consent)
  globals/       Home page, site settings, marketplace settings
  hooks/         publish guards, cache revalidation
  lib/           queries, types, forms, formatting, site constants
  lib/enhance/   menu, scroll reveals, pollen, seasons, seed game (DOM behaviours)
  components/    header, footer, cards, forms, season calendar, seed game, rich text
  seed/          seed script (drafts by default; demo mode for local preview)
  app/(frontend) public website
  app/(payload)  Payload admin and API (generated by Payload)
```

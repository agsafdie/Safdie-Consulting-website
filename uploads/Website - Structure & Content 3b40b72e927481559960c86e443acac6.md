# Website — Structure & Content

Working document for the new [safdieconsulting.com](http://safdieconsulting.com) build. Tracks the full site skeleton, what's already resolved, what's pending, and the finished copy for each section as we build it.

## Status legend

- ✅ Complete — content exists and is finalized
- 🟡 Partial — some content exists, needs more
- 🔴 Missing — nothing built yet, needs input

---

## Decisions locked (Sept 18)

- **Primary job of the site:** validate Andrés after a warm-network touch. The site is also inbound-ready at near-zero cost: indexable case pages, clean metadata, a share image, and fast load. There is no blog and no SEO content program. Inbound as a real channel is a board decision, because the CRMO Operations document locks one channel.
- **Language:** English, with a selector to change to Spanish (drop down option in case I want to add more languages in the fture).
- **Voice:** "we" throughout the site copy. The About bio and the case studies stay in third person ("Andrés", "he"), which is compatible with a "we" firm voice.
- **Page order:** Hero, Numbers strip, Problems We Solve (grouped by path), How We Work (three tiers), How an engagement runs, Case Studies, About, FAQ, Contact. Each case study also gets its own URL so it can be pasted into an outreach message.
- **Build path:** one design brief, prototype in Claude Design, handoff to Claude Code, static site deployed on Vercel. Andrés edits copy through Claude Code after launch. Final copy goes into Claude Design from the start to limit token use.
- **Visual reference:** type-led, editorial advisor site, with [brightspark.com](http://brightspark.com) as the closest comparable. From [paygoal.io](http://paygoal.io), the numbers strip and the one-line case cards transfer. The logo wall, product cards, and long contact form do not transfer. [befocusy.com](http://befocusy.com) was not reviewed because the site blocks automated access.

---

## 1. Header / Navigation

**Status: ✅ Complete**

Current placeholder has no nav, it's a single-screen page.

- Logo (already have it, used in placeholder and email signature)
- Nav links, in page order (revised Sept 18): Problems We Solve · How We Work · Case Studies · About · FAQ · Contact
- Persistent CTA button in header: "Book a call"
- Behavior: sticky/fixed on scroll so the CTA stays visible. Nav collapses to a hamburger menu on mobile; the CTA button stays visible even when collapsed.

Note: since Case Studies and FAQ are being built out now, the nav already assumes both exist. If either isn't ready by launch, remove it from the nav rather than leaving a broken link or an empty page.

---

## 2. Hero

**Status: ✅ Complete — updated to reflect board-confirmed two-segment positioning (geographic + enterprise scale-up)**

- Headline: "When your product architecture can't hold the next stage of growth."
- Sub: "HR Tech advisory for companies expanding into new countries or scaling up to enterprise-grade volume, backed by 25+ years building payroll, HCM, and EOR platforms across dozens of countries."
- Bullets: product / platform / data architecture diagnosis, process and team assessment, AI enablement
- Closer line: "We diagnose what's breaking. We help your teams build the fix."
- CTAs (revised Sept 18): "Book a call" as the primary button, plus one scroll link, "See how we work". LinkedIn and "Contact us" are removed from the hero, because LinkedIn sends the visitor off the site and "Contact us" duplicates the booking CTA.

**Ruling (Sept 18):** "AI enablement" stays in the hero as is. Andrés confirmed no change: it remains a hero-only bullet, with no tile, tier, or case behind it.

- Open: the headline never says HR Tech, so the sub carries that work. Worth a second look during the design pass.

---

## 2b. Numbers strip (new, Sept 18)

**Status: ✅ Complete. Labels approved by Andrés Sept 18.**

Sits directly under the hero so proof arrives before the problem tiles. Pattern borrowed from [paygoal.io](http://paygoal.io).

- 43 countries in a true Global Payroll Engine
- 100+ countries: EOR platform build
- $200M Series B supported
- 40% engineering cost reduction through AI-driven transformation

---

## 3. Problems We Solve

**Status: 🟡 Partial — copy drafted, needs to be built as functional HTML with accordion**

Positioned early and deliberately: leads with the client's pain before introducing Andrés (About), consistent with consultative-sale best practice. Confirmed with Andrés on Aug 6.

**Format:** tiles grouped under the two paths from the hero, replacing the flat 6-tile grid. Geographic Expansion holds Tile 1. Enterprise Scale-Up holds Tiles 2, 3, and 4. A third group, delivery problems on both paths, holds Tiles 5 and 6. Each path opens with the framing copy moved here from the Services columns. Each tile shows a short title + one-line hook (collapsed view). Clicking a tile expands an accordion below it with the fuller explanation and, where available, a concrete example.

Note: the "Data reconciliation & normalization" tile is intentionally kept as its own separate tile (not folded into Integrations), even though it sits close to datascalehr's territory. Andrés confirmed this is deliberate — it acts as a qualification magnet/filter for the right kind of lead, which then gets manually routed to datascalehr per the existing conflict-screen process in the CRMO document. This is a positioning choice worth revisiting if it starts generating flagged-conflict volume that outpaces the CRMO's ability to route it.

**Path intro: Geographic Expansion** (moved from Services, Sept 18)

*For teams taking their product into new countries.*

A product's data architecture built for one market rarely survives the jump into three, ten, or fifty more. Currency, labor law, and language assumptions baked into a single-country build have to be re-architected, not patched.

**Path intro: Enterprise Scale-Up** (moved from Services, Sept 18)

*For teams taking their product from a small deployment to enterprise-grade volume.*

Performance, integrations, and data reconciliation that work for a few thousand records often fail under millions, and that failure shows up in production, not in testing.

Note: the expanded copy in Tile 1 and Tile 4 repeats these two intros nearly word for word. One side of each pair needs a rewrite before the build.

**Ruling (Sept 18):** Tile 3 stays as its own separate tile. Andrés confirmed keeping it standalone rather than folding it into Enterprise Scale-Up.

### Tile 1 — Global scalability

**Collapsed:** Data models built for one market don't hold when you expand into new countries.

**Expanded:** A product's data architecture designed for a single-country payroll or HCM deployment often assumes one currency, one set of labor rules, one language. When companies expand into multiple countries, that architecture has to be re-thought, not patched, to support multi-language and multi-jurisdiction requirements without duplicating the entire system per country.

### Tile 2 — Enterprise integrations

**Collapsed:** Simple ingestion pipelines don't survive contact with enterprise-grade systems.

**Expanded:** A local or early-stage product usually connects through a simplified file or a lightweight interface. Enterprise clients bring a much larger number of interconnected systems, and the integrations required to serve them are bigger, more complex, and higher-stakes. Most HR Tech teams need outside help sizing and architecting that jump correctly the first time.

### Tile 3 — Data reconciliation & normalization

**Collapsed:** HRIS and payroll systems that don't speak the same data language create risk at every pay cycle.

**Expanded:** When employee and pay data move between HRIS and payroll systems without proper reconciliation and normalization, the result is silent errors: mismatched fields, duplicate records, payroll discrepancies that surface only after they've already caused damage. Getting this right is a distinct architecture problem, separate from integration itself.

### Tile 4 — Performance at scale

**Collapsed:** A system built for one population breaks under the weight of a global one.

**Expanded:** Local deployments are rarely built with global data volume in mind. When a client rolls the same product out across every country they operate in, performance assumptions that worked for a few thousand records can fail under millions, and that failure often shows up in production, not in testing.

### Tile 5 — Implementation friction

**Collapsed:** The deal closes, the resources committed on paper don't show up in practice.

**Expanded:** A recurring pattern: the client has the pain, agrees on the solution, and commits resources during the sales process. When implementation starts, the gap between what was promised and what's actually available shows up fast. In payroll implementations specifically, it's common for a client to discover mid-project that they don't have the internal staff or capacity to meet the agreed timeline, which pushes the go-live date and strains the relationship on both sides.

### Tile 6 — Product-engineering-business misalignment

**Collapsed:** When product speaks business and engineering speaks technical, requirements get lost in translation.

**Expanded:** Product often sits closer to the business language, while engineering operates in a more technical one. Without a shared frame of reference, requirements drift from what the business asked for to what actually gets built, and that gap tends to surface right before go-live, when it's most expensive to fix.

---

## 4. Services / How We Work

**Status: ✅ Complete. The two-column framing moved to Problems We Solve on Sept 18, and the three tiers are unchanged.**

Directly follows Problems We Solve; each tier maps back to the problems named above. Tier names, scope, and pricing are confirmed and locked in [Service Tiers](https://app.notion.com/p/Service-Tiers-3aa0b72e9274816dba13da0467a992dd?pvs=21). Per Andrés (Aug 6), no pricing appears on the site — the section closes with a CTA to book a call instead.

The board confirmed both segments are in scope: Geographic Expansion (local-to-global) and Enterprise Scale-Up (small-to-enterprise). Same three tiers serve both; the path framing copy now lives in Problems We Solve, and this section only explains the three tiers.

**Section intro:**

Two paths, three ways to work together. Whether your growth is geographic or organizational, the fix follows the same three-tier approach, depending on how much of the problem you've already mapped and how much support your team needs to execute it.

**The three tiers below apply to both paths:**

### Tier 1 — Product Assessment

*A second opinion on your product architecture, from someone who has built it before.*

You get a full review of your current product and architecture and a written set of recommendations. No process review, no implementation plan, just a clear diagnosis of what's holding your platform back from enterprise scale.

Best for teams who need an outside, expert read before deciding how much further to go.

*Typical timeline: about a week.*

### Tier 2 — Scaling Readiness

*The diagnosis, the plan, and the metrics your team needs to execute it.*

Beyond the product and architecture review, this tier looks at how your team delivers, both implementation and internal product development, and turns the findings into an action plan with clear success metrics your team can run with.

This is where 25+ years scaling payroll, HCM, and EOR platforms applies most directly: the problems named on this page are exactly what this tier is built to diagnose and fix.

*Typical timeline: 10 days across 2-3 weeks, depending on your team's availability.*

### Tier 3 — Scaling Readiness + Oversight

*Everything in Scaling Readiness, plus a second set of expert eyes while your team builds.*

Adds a diagnosis of your team's structure and weekly oversight while your team executes the plan. You get flagged risks and progress reports every week, without handing over operational control;  your team stays in the driver's seat, we supervise and report.

Best for higher-complexity engagements, or when you want expert accountability built into the execution phase, not just the diagnosis.

*Typical timeline: longest of the three, scoped to the plan, plus weekly check-ins for the duration.*

**Section closer (CTA, no pricing shown):**

Pricing depends on scope and complexity. Book a call to talk through what fits.

---

## 4b. How an engagement runs (new, Sept 18)

**Status: ✅ Complete. Steps confirmed by Andrés Sept 18, based on his actual process.**

### 1. Discovery call

We talk through the problem, your company's current situation, your objective, and a high-level read of where you are today versus where you want to get to.

### 2. Proposal

Based on the discovery call, we shape an engagement model to fit the problem: a deep diagnostic of your platform or product, a diagnostic plus a blueprint your team can execute, or a deeper diagnostic across processes, platforms, and products with a detailed plan and milestones we track together. We discuss and adjust the proposal with you, scope in or out, shorten it, before an estimate goes out.

### 3. Scope agreement

If you decide to move forward, we sign the estimate and a short contract covering responsibilities, scope, and estimated timeline. The NDA is signed either right after the discovery call or at this stage, before work begins, depending on what you prefer.

### 4. Working sessions

We work directly with your team: diagnostics, detailed plans, and a close look at your processes and platforms. What we need from you, documentation, system access, or a sandbox/training environment, depends entirely on the scope of the engagement.

### 5. Delivery

What you receive depends on what was scoped: a document, a presentation, a detailed plan, a working prototype, or functioning code. Delivery always happens in a live session, sometimes more than one, depending on the plan: a final review session and a presentation session.

**Fit line:** who this is for (funded, growth-stage HR Tech builders on one of the two paths) and who it is not for (seed-stage companies), taken from the CRMO Operations document.

---

## 5. About (Quién soy)

**Status: ✅ Complete — bio copy finalized. Photo ready, not yet placed in a build.**

Deliberately placed after Problems + Services, not right after the hero — the visitor should see the problem and the fix before reading the founder bio.

- Professional photo: ready, provided by Andrés, not yet placed in a build
- Named quotes (new, Sept 18): skipped for now per Andrés, no client quotes exist yet; not holding up progress, revisit once client work produces quotable feedback
- Link to Andrés's personal LinkedIn profile here, because buyers check the person before the company page
- Headline: "25+ years building and scaling payroll, HCM, and EOR platforms across dozens of countries."
- Bio copy:

> As VP of Application Development at ADP GlobalView, he scaled the platform to 43 countries. As VP of Product Development at Atlas, he built the EOR platform to 100+ countries, supporting a $200M Series B. Most recently, as SVP of Engineering and Data Strategy, he led an AI-driven engineering transformation that cut engineering costs by 40% while building an agent-based Pay Intelligence platform.
> 

---

## 6. Case Studies / Evidence

**Status: ✅ 3 of 3 cases resolved and signed off — ready to publish**

Across every reference site audited (boutique solo advisors, HR Tech consultancies, technical due-diligence firms), case studies were the most consistently present section, more so than About. Anonymized case format works fine when real client names can't be used (pattern seen at POD Consulting, Quandary Peak): name the problem, the approach, the outcome, without naming the client.

Note on sourcing: Case 1 is drawn from a prior operating role (Syndio), not a Safdie Consulting or datascalehr client engagement — confirmed acceptable by Andrés. Case 2 is a datascalehr client engagement; datascalehr is never named on the site per Andrés's explicit instruction.

### Case 1 — Unifying payroll data across 14 countries

**The problem:** A global HR technology company needed to connect two HRIS platforms and fourteen country-specific payroll systems into a single source of truth for analysis. Each system used its own data format and field structure, with no shared standard across countries.

**The approach:** Andrés led the architecture and build of a normalized data layer that reconciled all sixteen systems into one AI-driven analytics platform, resolving format inconsistencies at the integration layer instead of forcing every country system to conform to a single standard.

**The result:** Two HRIS systems and fourteen payroll systems now feed one normalized platform, giving the organization a single, reliable view of data across every country it operates in. Reporting that once required manual reconciliation across sixteen systems now runs directly off the unified platform, cutting both the time and the cost of producing it.

*(Maps to: Data reconciliation & normalization)*

### Case 2 — Closing a staffing gap without slipping the go-live

**The problem:** A payroll implementation client agreed to the solution and committed internal resources during the sales process. Once implementation started, the client discovered it didn't have the staff or capacity to execute its side of the plan on schedule.

**The approach:** Rather than waiting for the client to hire or reallocate people, Andrés designed and led  a forward-deployed engineering model, using technology to absorb the work the client's team couldn't cover, instead of letting the timeline stall on a staffing problem.

**The result:** The project shipped with a one-month delay instead of the extended slip a staffing gap like this typically causes.

*(Maps to: Implementation friction)*

### Case 3 — Clearing the path for Latin American expansion, market by market

**Status: Reviewed Sept 18 by Andres.**

Note on sourcing (revised Sept 18): unlike Case 1, this is not drawn from a prior operating role. It is independent advisory work Andrés did for a small Latin American company while separately employed at ADP, with no ADP ownership over the engagement. Open: confirm this framing is accurate and whether ADP needs any explicit handling here, even for internal clearance purposes. Confirmed ready as is.

**The problem:** A Latin American time management software company had built a solution for a country and wanted to expand into several others in the region. Before writing any code, the company needed to know which markets it could actually enter and what each one would legally require.

**The approach:** Andrés reviewed the labor and compliance requirements for each target country, including local calculation rules and shift rules, and identified local compliance partners the company would need in each market. In parallel, he guided the company's architects through a technical review of whether their configuration tables and codebase could support country-specific behavior without a rebuild. The review surfaced a requirement in one target market strict enough that it changed the company's plan for that country.

**The result:** The company decided to hold off on that market and moved forward with its other target countries, with a finalized plan for how the expansion would work in each one.

*(Maps to: Global scalability)*

**Format (Sept 18):** one-line case cards on the home page, each linking to its own case URL.

---

## 7. FAQ

**Status: ✅ Complete**

Questions validated against real pipeline objections by Andrés. One candidate question (CTO-fractional comparison) was dropped as not a real objection.

**Added Sept 18:** pricing, NDA/confidentiality, and what we need from your team. Andrés confirmed the "outside HR Tech" answer stays as written; on rereading the actual text, the CRMO flag is withdrawn, the answer names a concrete example (payments) and keeps HR Tech as the clear core rather than diluting the niche. Still open: whether there's a policy on client competitors, or whether that's undecided and belongs to the board.

### How long does an engagement typically take?

It depends on the tier. A Product Assessment takes about a week. Scaling Readiness runs 10 days across 2-3 weeks, depending on your team's availability. Scaling Readiness + Oversight is scoped to the plan, plus weekly check-ins for the duration of execution.

### What happens if our team can't execute the recommendation?

The diagnosis and plan are built for your team to execute, not for us to execute for you. If capacity turns out to be the real constraint, the Oversight tier adds weekly reporting and flagged risks while your team builds, without taking over the work. Where it helps, Andrés can also connect clients to his network of HR Tech and AI talent, developers, engineers, product managers, to close a specific gap.

### Do you work with teams outside HR Tech?

The core focus is HR Tech, but the expertise transfers to adjacent problems: data reconciliation, system integration, and architecture built to hold enterprise scale. Payments is one example of a space with the same underlying challenge. If your product has that kind of architecture problem, even outside HR Tech, it's worth a conversation.

### How does pricing work?

Engagement pricing depends on scope, not a fixed rate card. A focused diagnostic on one system costs less than a full architecture review across multiple markets. We provide a specific range once we understand what you're trying to solve, during the initial call.

### Do you sign an NDA?

Yes. A standard NDA and confidentiality agreement are in place before any system access, code review, or team interview begins.

### What do you need from our team?

Access to the relevant systems, time from your architects or engineers for structured interviews, and, where the engagement involves market expansion, visibility into your actual expansion plans and timeline. We scope the specific access needed during the initial call, so your team isn't opening doors they don't need to.

### Do you work with our competitors?

We don't take on simultaneous engagements with direct competitors. If a conflict comes up, we'll tell you before it becomes a problem.

---

## 8. Contact

**Status: ✅ Complete**

Already have: email ([info@safdieconsulting.com](mailto:info@safdieconsulting.com)), LinkedIn ([linkedin.com/company/safdie-consulting](http://linkedin.com/company/safdie-consulting)), Tidycal ([tidycal.com/m8n0n8r/30-minute-meeting](http://tidycal.com/m8n0n8r/30-minute-meeting)).

**Decision:** embed the Tidycal calendar directly on the page (as seen on [brightspark.com](http://brightspark.com)) rather than linking out, to reduce friction at the highest-intent moment in the funnel.

- Headline: "Let's talk about what's holding your architecture back."
- Sub: one line inviting a direct booking, no form friction
- Tidycal embedded inline (iframe), with the plain link shown above the embed as a fallback
- Below the embed: email and LinkedIn for anyone who prefers to write first
- Pending: confirm with dev that the current Tidycal plan supports iframe embedding
- Added Sept 18: a short privacy notice next to the embed, since Tidycal collects personal data
- Added Sept 18: an analytics conversion event on a completed booking
- Added Sept 18: Andrés's personal LinkedIn profile alongside the company page

---

## Privacy Policy (drafted Sept 18)

**Status: Reviewed**

Analytics tool: Google Analytics. GDPR terms included since EU visitors are expected. Cookie control: self-built (a small JS snippet + localStorage) rather than a vendor tool like Cookiebot, gating whether the GA tag fires at all, with a persistent "Cookie settings" link in the footer that reopens the banner so visitors can change their choice later. Tradeoff noted: a self-built version needs manual updates if tracking or regulations change, a vendor tool would auto-scan and stay current but adds a recurring cost.

---

**Privacy Policy**

*Last updated: [09/18/2026]*

Safdie Consulting ("we," "us," "our") operates [safdieconsulting.com](http://safdieconsulting.com). This policy explains what personal data we collect, why, and how you can control it.

**What we collect**

- **Contact information.** If you email us, connect on LinkedIn, or book a call, we collect your name, email address, and anything else you choose to share.
- **Booking data.** Scheduling a call through our booking widget (Tidycal) shares your name, email, and the details you provide with Tidycal, which processes that data under its own privacy policy.
- **Analytics data.** We use Google Analytics to understand how visitors use this site, including pages viewed and general location. This runs only after you accept cookies through the banner on your first visit.

**Why we collect it**

- To respond to inquiries and schedule calls (legal basis: your consent, and steps necessary to enter a business relationship at your request).
- To understand and improve the site (legal basis: your consent, given through the cookie banner).
- We do not sell your data, and we do not use it for advertising.

**Who we share it with**

- Tidycal, for scheduling.
- Google Analytics, for site analytics.
- We do not share your data with any other third party except where required by law.

**How long we keep it**

We retain contact and booking data for the duration of our relationship with you and for a limited period afterward, then delete it unless we're required to keep it longer by law.

**Your rights**

If you are in the EU or UK, you have the right to access, correct, delete, or export your personal data, and to withdraw consent at any time. To exercise any of these rights, contact us at [info@safdieconsulting.com](mailto:info@safdieconsulting.com). If you are not satisfied with our response, you have the right to lodge a complaint with your local data protection authority.

**Cookies**

We use a cookie consent banner on your first visit. Analytics cookies load only if you accept. You can change your preference at any time using the "Cookie settings" link in the footer.

**Changes to this policy**

If we make material changes, we'll update the date at the top of this page.

**Contact**

Safdie Consulting

[info@safdieconsulting.com](mailto:info@safdieconsulting.com)

---

## 9. Footer

**Status: ✅ Complete**

**Column 1 — Brand:** logo; one line: "HR Tech advisory for global product and data architecture."

**Column 2 — Quick links (revised Sept 18):** Problems We Solve · How We Work · Case Studies · About · FAQ · Contact · Privacy Policy · Cookie settings

**Column 3 — Contact:** [info@safdieconsulting.com](mailto:info@safdieconsulting.com) · [linkedin.com/company/safdie-consulting](http://linkedin.com/company/safdie-consulting)

**Bottom line:** © 2026 Safdie Consulting. All rights reserved.

---

## Technical spec: Cookie consent (for Claude Code build, Sept 18)

**Approach:** self-built, no third-party consent-management vendor (Cookiebot, Osano, etc.). Consistent with the rest of the stack, which has no other third-party embeds besides Tidycal, and avoids a recurring vendor cost for a scope this small.

**Behavior:**

1. On first visit, a banner appears (bottom of viewport, standard pattern) offering Accept / Decline for analytics cookies. Necessary/functional cookies (if any) don't require consent and aren't gated by this banner.
2. The visitor's choice is written to `localStorage` (e.g. key `cookie_consent`, value `granted` or `denied`). A plain cookie also works if `localStorage` persistence is a concern, but `localStorage` is the simpler default for a static site.
3. The Google Analytics script tag is not loaded in the page `<head>` by default. It is only injected/fired if `cookie_consent === 'granted'`. This means GA never loads at all on decline, rather than loading and being blocked after the fact. This ordering matters for actual GDPR compliance, not just appearance.
4. A persistent "Cookie settings" link lives in the footer (already added to the Footer section above) on every page. Clicking it reopens the same banner component, pre-filled with the visitor's current stored choice, so they can change it at any time.
5. Changing the choice from granted to denied should stop firing GA on subsequent page views; changing from denied to granted should start firing it. Either way, changing the choice does not require a page reload if avoidable, but a reload is an acceptable fallback if simpler to implement.

**Known limitation to flag if scope changes:** this self-built approach requires manual updates if new tracking/cookies are added later or if regulations change. A vendor tool would auto-scan and stay current instead, at a recurring cost. Worth revisiting if the site's tracking footprint grows beyond GA + Tidycal.

---

## Competitive audit notes (Aug 6)

Reviewed against three reference types: large HR Tech consultancies (Udder, Cielo, ISG), boutique solo-advisor sites in a similar model ([brightspark.com](http://brightspark.com) — Breght Boschker), and technical due-diligence/architecture advisory firms (Quandary Peak, POD Consulting).

Consistent pattern across all three types: About, Services/Process (numbered steps), Case Studies, FAQ. Case Studies was the most universally present section — arguably higher-impact than About given how technical-credibility-dependent this offer is.

[brightspark.com](http://brightspark.com) is the closest single-operator comparable: separates "Founders" and "Investors" into distinct nav items rather than blending both audiences into one narrative. Relevant if/when the board resolves the buyer-side positioning question — the two-audience-with-separate-paths pattern is the one to follow, not a blended message.

Not found in any reference site, and therefore not prioritized: video testimonials, client logos (likely confidentiality-driven in this segment), blog/thought-leadership competing for home page real estate.

---

## Open items blocking full completion

1. ~~Tier naming + pricing~~ — resolved. Naming and pricing are locked in Service Tiers; pricing intentionally omitted from site copy.
2. ~~Concrete About bio copy~~ — resolved.
3. ~~Real case studies to anonymize~~ — 3 of 3 signed off Sept 18, including Case 3.
4. ~~Real FAQ objections from pipeline~~ — resolved.
5. ~~Booking embed vs. link-out decision for Contact section~~ — resolved, embed chosen. Pending dev confirmation that Tidycal plan supports iframe embedding.
6. ~~Board resolution on builder-only vs. builder+buyer positioning~~ — resolved (Sept). Board confirmed both segments in scope: Geographic Expansion (local-to-global) and Enterprise Scale-Up (small-to-enterprise). Hero and Services updated accordingly. Note: the CRMO Operations document (section 2, offer + target buyer) still reads "local-to-global" only and needs a matching update outside this Notion page — not editable from here, flagged for Andrés to update at the source.

## Content owed before design starts (Sept 18, in priority order)

1. ~~A geographic-expansion case~~ — filed and signed off Sept 18 as Case 3.
2. ~~A business outcome for Case 1 and Case 2~~ — both filed Sept 18. Case 1: faster reporting and manual reconciliation cost avoided. Case 2: four-month baseline delay, one-month actual, revenue three months earlier.
3. ~~Ruling on Tile 3~~ — decided Sept 18: stays as its own separate tile.
4. ~~Ruling on "AI enablement"~~ — decided Sept 18: stays in the hero as is, no dedicated section added.
5. Two named quotes from former executives or peers — skipped for now, per Andrés (Sept 18): no client quotes exist yet, and this is not holding up progress. Revisit once client work under Safdie Consulting produces quotable feedback.
6. ~~Client-competitor policy~~ — decided Sept 18: no simultaneous engagements with direct competitors. FAQ answer filed.
7. ~~Engagement steps confirmed~~ — filed Sept 18, based on Andrés's actual process (discovery, proposal, scope agreement, working sessions, delivery). Sample deliverable requirement struck, per Andrés: not included on the site.
8. ~~Approval of the numbers strip labels~~ — approved Sept 18, company-agnostic phrasing.
9. ~~One-page privacy policy~~ — drafted Sept 18 (Google Analytics, GDPR terms, self-built persistent cookie control). Pending legal review before publishing.

## Technical launch checklist (Sept 18)

- Privacy policy page and cookie notice, with a persistent "Cookie settings" footer link.
- Page titles, meta descriptions, and a share image for every page, including each case URL
- Analytics with a booking conversion event
- Favicon and a 404 page
- Keyboard-accessible accordions
- Performance check on mobile before launch

---

Modelos de paginas similares: [www.paygoal.io](http://www.paygoal.io) ; [www.befocusy.com](http://www.befocusy.com) ; [Longevity Initiatives — Consultoría en economía de la longevidad | Bárbara Rey Actis](https://longevityinitiatives.com/)
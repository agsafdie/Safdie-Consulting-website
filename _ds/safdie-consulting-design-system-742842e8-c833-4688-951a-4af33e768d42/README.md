# Safdie Consulting — Design System

## Overview

Safdie Consulting is Andrés Safdie's independent HR Tech advisory practice — AI and product/data
architecture consulting for two segments: **HR Tech builders** (startups/mid-market taking a
product from idea to enterprise-scale) and **HR Tech buyers** (companies navigating a
build-vs-buy decision). Public presence is LinkedIn-led; the flagship artifact this system
supports is the marketing site, **safdieconsulting.com**, plus proposal and slide surfaces used
in outreach.

**Sources**
- `uploads/Safdie Consulting Design System (2)/` — a prior design-system handoff package (this
  project's direct source: tokens, components, and the website UI kit below are ported from it).
- Company logos (`uploads/Safdie Consulting - *.png`) and a LinkedIn background image.
- `uploads/Safdie-Consulting-Proposal-Template.html` and `uploads/Safdie-Consulting-Slide-Template.pptx`
  — reference materials for print/slide scale (see `--print-*` / `--slide-*` tokens in
  `tokens/typography.css`); no proposal or deck template has been built into this system yet.
- Notion — *"Service Tiers"* and *"🌐 Website — Structure & Content"* (linked in chat; not
  fetched by this agent — treat as the copy source of truth for future edits, not a live source
  read into this build).

## Content fundamentals

- **Voice mix is deliberate and locked:** site copy is **"we"**; the About bio and case studies
  switch to **third person** ("he scaled the platform to 43 countries," "Andrés led the
  architecture…"). LinkedIn is first-person "I."
- **Sentence case** in prose; **UPPERCASE only** in mono eyebrows and table heads.
- **Middle dot `·`** as the only separator — never a bullet or pipe.
- **ISO dates** (`2026-09-18`). **No emoji anywhere. No exclamation marks.**
- Confident, expert, evidence-led tone: claims are backed by a specific figure or named
  outcome ("43 countries," "$200M Series B," "40% engineering cost reduction"), not adjectives.
- Copy is treated as reviewed and final — a design agent should never rewrite it, only flag
  awkward lines. See `ui_kits/website/content.js` for the full, signed-off copy.

## Visual foundations

- **Two colours carry the brand:** Ink `#0B1220` and a cool slate-blue `#2B5F8A`. Everything else
  (Haze, Mist, Slate, Paper, White) has one defined job — a fifth colour on a surface means the
  layout is wrong. Status colours (positive/risk) are for charts only, never as brand accent.
- **Ink is tinted with alpha, not a grey scale** — `--sc-ink-70/45/16/12…` are the only
  sanctioned "neutral" steps.
- **Type:** Libre Franklin (reading) + IBM Plex Mono (checking: eyebrows, figures, dates, tier
  codes). Headlines are always weight 600 with negative tracking, **never 700**. Body measure
  caps at 620px. Full ladder in `tokens/typography.css`, at three scales — web (px), a 1920×1080
  slide scale, and a Letter print scale — reading the same relationships at each size.
- **Spacing:** six fixed steps (4/10/24/40/72/80px), never interpolated. 12-column grid, 24px
  gutter, 72px page margin, 1296px content max.
- **Radius is square by default** everywhere (print, decks, presentation). The **website alone**
  opts into soft corners via two role tokens, `--radius-control` (pills: buttons, tags, fields)
  and `--radius-surface` (20px: cards). Components always read the role token, never `--radius`.
- **No shadow, anywhere.** `--shadow-none` / `--elevation-card: none` exist so a designer reaching
  for a shadow finds the documented answer is "none." Depth comes from ground colour and a 1px
  hairline rule only.
- **Motion is functional only:** 90/140/200ms on one easing curve, for state feedback (hover,
  focus, an accordion indicator). No scroll reveals, parallax, counting numbers, bounce, or
  spring. Hover on buttons/links is colour-only — nothing moves, lifts, or scales on hover or
  press.
- **Backgrounds:** flat colour only — Paper, White, or Ink. No gradients, no photography, no
  patterns or textures, no blur/glass over content. The one deliberate texture is the diagonal
  hairline hatch used by `Placeholder`, which always names what real asset belongs there.
- **Contrast is measured and documented:** Ink on Paper 16.8:1 · Accent on Paper ~6.3:1 ·
  Haze on Ink ~10.1:1 · **Accent on Ink ~2.8:1 — never for text.** That last pair is the one
  documented trap.

## Iconography

**There is no icon set, and that is the decision.** Mono numerals (`01` `02` `03`) do the work
icons usually do (section markers, tier codes, ordered steps). The accordion's plus/minus and
the nav's hamburger are drawn in CSS (`Accordion.jsx`, `NavBar.jsx`), not glyphs. No emoji, no
Unicode-symbol icons, no Lucide/Heroicons/Font Awesome — adding a generic icon set is explicitly
called out as the fastest way to make this brand look like every other consulting site. The only
"iconography" is the `Logo` mark itself (S/C monogram on a solid tile) and the SVGs in `assets/`.

## Assets

`assets/` — `logo-monogram-ink.svg`, `logo-monogram-paper.svg` (on dark/photographic grounds),
`logo-lockup-light.svg` / `-dark.svg` (horizontal lockup), `favicon.svg` (drops the "C" at
16px). ⚠️ These SVGs use live `<text>`, not outline paths — fine for web as long as the font
loads, but should be outlined before any print use.

Raw source logo PNGs and a LinkedIn background image are kept in `uploads/` for reference; the
SVGs in `assets/` are the ones to build with.

## Components

Grouped by concern; every primitive reads CSS custom properties from `tokens/`, no CSS-in-JS.

- **core/** — `Button`, `Card`, `Eyebrow`, `Logo`, `Placeholder`, `SectionHeader`, `Stat`, `Tag`
- **disclosure/** — `Accordion`
- **embeds/** — `BookingEmbed`
- **feedback/** — `CookieBanner`
- **navigation/** — `NavBar`, `Footer`

## UI kits

- **`ui_kits/website/`** — click-through recreation of safdieconsulting.com: home page (nine
  locked sections), three case-study pages, a privacy policy, sticky nav with scroll-spy, and
  the cookie-consent gate. Open `ui_kits/website/index.html`. Content lives in
  `ui_kits/website/content.js` — copy is final and signed off; port it near-verbatim into a real
  build rather than rewriting it. See `ui_kits/website/README.md` for the full route map and open
  items still pending Andrés's input (professional photo, Tidycal plan confirmation, privacy
  legal review).

## Index

```
styles.css              single entry point — link this
tokens/                 colors, typography, spacing, elevation, motion, base, fonts
components/             core/ disclosure/ embeds/ feedback/ navigation/
guidelines/             foundation specimen cards (Colors, Type, Spacing, Brand)
assets/                 logo SVGs + favicon
ui_kits/website/        click-through site recreation + content.js + per-section JSX
SKILL.md                Claude Code / Agent Skills-compatible skill definition
```

## Caveats — help me get this right

- **No proposal or slide deck template exists yet.** The `--print-*` and `--slide-*` tokens are
  ready (matched to your uploaded Proposal Template and Slide Template), but I have not yet
  built a Google Docs–style proposal layout or slide-type set (title, section, big-stat, quote).
  Say the word and I'll build both from these tokens.
- **The About-page professional photo and the Tidycal iframe-support confirmation are still
  open** — both are rendered as labelled placeholders in the UI kit pending your input.
- **Fonts (Libre Franklin, IBM Plex Mono) load from Google Fonts**, not self-hosted — flag if you
  want webfont files vendored in for offline/email use.
- I have not independently fetched the two Notion pages referenced in chat; all copy and tier
  detail here comes from the files you uploaded. If Notion has since moved ahead of
  `content.js`, tell me what changed and I'll sync it.

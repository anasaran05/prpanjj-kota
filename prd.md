# PRD — Prapanjj S K Kota Personal Site
**For:** v0.dev build handoff
**Companion file:** `Prapanjj-Kota-Website-Content.md` (all copy — every section below references it by number)
**Format:** Single-page site, Next.js
**Feel:** Minimalist, precise, quietly luxurious — built around the optical language of a diamond, not jewellery-brand clichés (no rose gold, no soft pastels, no generic "founder site" template)

---

## 1. PROJECT SUMMARY

**What this is:** A single-page personal site for Prapanjj Kota — founder, diamond-trade native, entrepreneur. Not a Réia Diamonds marketing page; this is about *him* — his story, his USP, his network — with Réia as proof of work.

**Audience:** Investors, press, partners, potential hires, and future collaborators researching him.

**The page's one job:** In under 60 seconds of scrolling, make the reader believe: *this person understands the diamond industry from the inside out, and is building something disciplined and inevitable.*

**Design thesis:** A diamond's value comes from precision, clarity, and how it handles light — not color. The site should behave the same way: restrained palette, exact typography, and one recurring motif — light catching a facet — used as the throughline instead of decoration.

---

## 2. TECH STACK

- **Framework:** Next.js 14+ (App Router), TypeScript
- **Styling:** Tailwind CSS with a custom token config (see Section 4) — no default Tailwind palette in the final build
- **Animation:** Framer Motion for scroll-linked reveals + component transitions; native CSS scroll-snap for horizontal sections (avoid heavy scroll-jacking libraries — keep scroll native and fast)
- **Fonts:** `next/font/google`, self-hosted at build time (no FOUT)
- **Structure:** True single page — `app/page.tsx` composes section components from `/components/sections/`. No routing, no CMS. Copy is hardcoded from the content doc (or pulled from a single `content.ts` data file — recommended, see Section 8)
- **Deployment target:** Vercel

---

## 3. RESPONSIVE PHILOSOPHY (read before building anything)

Desktop and mobile are **not the same layout scaled down** — each section has its own mobile interaction, defined explicitly below. Rules:

- Breakpoints: `mobile < 768px`, `tablet 768–1199px`, `desktop ≥ 1200px`. Design desktop and mobile as two intentional states, not one fluid guess — tablet interpolates between them.
- Any horizontal-scroll section on desktop becomes a **vertical scroll-snap stack** on mobile (never a squeezed horizontal scroll on touch — touch users get vertical swipe, not sideways cramping).
- Any cursor-tracking effect (hero facet glint, magnetic buttons) becomes a **static or scroll-triggered version** on touch devices — never simulate cursor behavior with touch events.
- Typography scale is fluid (`clamp()`), not just smaller breakpoint values — no orphaned words, no line-length above ~72 characters on desktop or below ~32 on mobile.
- Every section must be independently tested at 375px, 768px, 1200px, 1440px — no section may depend on another section's height for its own layout to hold.
- Respect `prefers-reduced-motion`: all scroll-linked and cursor-linked animation must have a static fallback — content is never gated behind motion.

---

## 4. DESIGN SYSTEM

### 4.1 Why this palette
Diamonds are prized for being colorless — their entire value is in how they handle light, not pigment. The palette mirrors that: near-monochrome (paper, carbon, graphite, platinum) with **one restrained cool-steel accent** used only for interactive moments (links, hover states, the facet-glint motif). No warm cream/terracotta, no near-black-plus-neon, no rose or baby blue. This is deliberately closer to a precision/optics brand than a jewellery brand.

### 4.2 Color tokens

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#F5F5F2` | Primary light background |
| `--carbon` | `#14171A` | Primary dark background / primary text on paper |
| `--graphite` | `#4A4E52` | Secondary text, captions |
| `--ash` | `#D8D9D5` | Hairlines, dividers, borders |
| `--platinum` | `#9AA3A6` | Muted UI elements, disabled states, faint labels |
| `--glint` | `#6E7A7D` | The ONE accent — links, active states, the facet-light motif, hover underlines. Use at <10% of visual weight sitewide. |
| `--paper-on-dark` | `#EDEDE9` | Text on `--carbon` backgrounds |

No gradients except the facet-glint effect itself (Section 6.1), which is a soft conic/linear light sweep in `--platinum`→`--paper` tones — never a rainbow or purple-blue "AI" gradient.

### 4.3 Typography

- **Display (headlines):** `Fraunces` (serif, variable weight/optical size) — set at heavier optical sizes for large headlines, gives the page its one point of visual character
- **Body/UI:** `Inter` — normal, highly legible, no personality contest with the display face
- **Type scale (desktop → mobile, fluid via clamp):**
  - Hero headline: 96px → 44px
  - Section headline: 56px → 32px
  - Subhead/lede: 24px → 18px
  - Body: 18px → 16px
  - Caption/label: 13px → 12px, letter-spacing 0.08em, uppercase — used for eyebrows/labels only where content is genuinely a label (role titles, dates), not decoration
- **Line length:** cap body text at ~65ch desktop
- **No italics-as-decoration** — italic only where grammatically correct (e.g., publication names)

### 4.4 Layout grid & shape language

- 12-column grid desktop, 4-column mobile, generous gutters (min 24px mobile, 64px desktop margins)
- **Sharp corners, not rounded** — `border-radius: 0` as the default across cards, buttons, images. This is the one hard rule that makes the site feel "cut," not "soft SaaS." Exception: circular elements only where they represent something round in real life (e.g., a network-node dot).
- Hairline `1px` borders in `--ash`, never drop shadows for depth — depth comes from spacing and contrast, not blur
- Section padding: generous — min 96px vertical on desktop, 64px mobile — the page should feel unhurried

---

## 5. GLOBAL SIGNATURE ELEMENT

**The facet-glint motif.** A thin, angular light highlight (like light catching the edge of a cut diamond) that:
- In the hero, tracks the cursor subtly across a large angular typographic composition (desktop only)
- Reappears sparingly at 2–3 more moments sitewide (a card hover, the section transition into "Réia in Numbers", the footer CTA) — never more than that
- Is built as a CSS `conic-gradient` or SVG mask animated with Framer Motion, not an image asset
- On mobile/reduced-motion: renders as a static soft diagonal highlight, no cursor logic

This is the one recurring "wow" — everything else on the page stays disciplined and quiet so this reads as intentional, not decorative overload.

---

## 6. SECTION-BY-SECTION SPEC

Each row: content source (from `Prapanjj-Kota-Website-Content.md`), layout/interaction concept, desktop behavior, mobile behavior.

### 6.1 Hero
**Content:** Doc §1 (name, tagline, positioning line) + §1B (personal quote)
- **Concept:** Full-viewport, oversized `Fraunces` headline set at an angle-conscious layout (not dead-center — asymmetric, left-weighted). Facet-glint motif (Section 5) tracks cursor behind/through the type.
- **Desktop:** Cursor-tracked glint; headline breaks across 2–3 lines at large scale; scroll-cue arrow bottom-left, minimal.
- **Mobile:** Static glint gradient, headline reflows to single-column, tagline and CTA stack below with generous spacing — no cursor logic, no cramped text.

### 6.2 Personal Voice Strip
**Content:** Doc §1B (LinkedIn quotes, 3am line)
- **Concept:** A slow horizontal marquee/ticker of short quote fragments on a `--carbon` full-bleed band, pausable on hover/tap. This is the "in his own words" moment — plain-text, no imagery, lets the voice carry it.
- **Desktop:** Continuous auto-scroll ticker, pauses on hover, `Fraunces` italic-free serif at medium scale.
- **Mobile:** Same ticker, slower speed, tap-to-pause instead of hover, font size reduced via clamp.

### 6.3 About
**Content:** Doc §2
- **Concept:** Simple two-column layout — short bio left, a minimal fact-strip right (role, company, location, team size) as a bordered data block, not a card with shadow.
- **Desktop:** Two columns side by side.
- **Mobile:** Stacks vertically, bio first, fact-strip becomes a horizontal-scroll strip of small stat chips (bordered, no shadow) if space is tight — else stacks too. Prefer stacking for simplicity.

### 6.4 Founder Story
**Content:** Doc §3
- **Concept:** Long-form narrative broken into 3–4 short paragraphs, each scroll-triggered to sharpen from a slight blur/low-opacity into full focus as it enters viewport — a restrained nod to diamond clarity grading (Included → Flawless), never explained literally in copy, just felt.
- **Desktop:** Asymmetric column (text max 640px wide, right-aligned or left-aligned with wide empty margin) — lets whitespace do the luxury signaling.
- **Mobile:** Full-width column, same scroll-reveal effect but with a larger trigger threshold so it doesn't feel laggy on small screens; reduced-motion users get the text at full opacity always.

### 6.5 What He Does Today (roles + founding team)
**Content:** Doc §4
- **Concept:** **Horizontal scroll strip** (this is the dedicated horizontal-scroll moment in the page). Each role/founder is a bordered panel; user scrolls sideways through his roles like flipping through index cards.
- **Desktop:** Native horizontal scroll with CSS scroll-snap, mouse-wheel maps to horizontal scroll within the section (use a lightweight wheel-to-scrollLeft handler, not a scroll-jacking library), thin progress bar at bottom of section shows position.
- **Mobile:** Converts to a **swipeable card carousel** — vertical page scroll is untouched; horizontal swipe only within the component, snap-to-card, small dot indicator below.

### 6.6 Why Him / USP
**Content:** Doc §5
- **Concept:** **Interactive slider** (this is the dedicated slider moment) — 6 differentiator cards in a draggable slider, one visible at a time on mobile, 2.5 peeking on desktop to hint more content. Drag-to-navigate (Framer Motion `drag="x"` with constraints), plus arrow controls for accessibility.
- **Desktop:** Drag or arrow-click; cards are large, sharp-cornered, hairline-bordered, generous type.
- **Mobile:** Same component, touch-drag native, larger touch targets, single card per view.

### 6.7 Point of View (philosophy quotes)
**Content:** Doc §6
- **Concept:** Alternating full-bleed bands: `--paper` / `--carbon` / `--paper`, each holding one large pull-quote, centered, generous padding. Simple scroll-in fade, no gimmick — this section's job is contrast and pacing after the busier slider section above it.
- **Desktop:** Full-bleed bands, quote max-width ~800px centered.
- **Mobile:** Same band structure, quote type scales down via clamp, padding reduces but stays generous relative to viewport.

### 6.8 Journey (timeline)
**Content:** Doc §7
- **Concept:** Vertical timeline with a thin SVG line down the left (desktop) or center (mobile) whose `stroke-dashoffset` animates in sync with scroll position — the line "draws itself" as the reader scrolls through milestones. Each milestone is a date + one line, minimal.
- **Desktop:** Line + milestones in a single column, generous vertical rhythm, date labels in `--graphite` caption style.
- **Mobile:** Same mechanic, line moves to left edge with milestones indented, touch-scroll drives the same stroke animation (recalculated against viewport, not desktop scroll distance).

### 6.9 The Réia Story (brand narrative + promises)
**Content:** Doc §7B
- **Concept:** Short brand-voice narrative block + a 6-item "promises" icon grid (BIS Hallmarked, Lifetime Exchange, etc.) using simple line-icons (not filled/glossy), sharp-cornered bordered tiles.
- **Desktop:** 3×2 grid of promise tiles beside/below the narrative text.
- **Mobile:** Narrative first, promise tiles collapse to 2×3 or a vertical list — never smaller than a comfortable tap target (min 44px height).

### 6.10 Réia in Numbers
**Content:** Doc §9
- **Concept:** Stat block with **count-up numbers** animated on scroll-into-view (Framer Motion `useInView` + a simple count hook) — 47+, 3 cities, ₹2Cr, 15% CAGR etc. Faceted background pattern (thin angular line pattern in `--ash`, very low opacity) ties back to the diamond motif without repeating the cursor glint.
- **Desktop:** 4-column stat grid.
- **Mobile:** 2-column grid, stats stack in reading order.

### 6.11 Featured In (press)
**Content:** Doc §8
- **Concept:** Slow auto-scrolling logo/name marquee (text-based, since we don't have logo files yet — flagged in Section 9), click-through opens source article in new tab. Expandable list view below the marquee for accessibility/SEO.
- **Desktop:** Marquee band + list.
- **Mobile:** Marquee band (slower) + list, same content, no layout change needed beyond width.

### 6.12 Background & Credentials
**Content:** Doc §10
- **Concept:** Deliberately the quietest section on the page — a clean two-column definition list (education / skills / languages / tools), no motion beyond a simple fade-in. This is the palette-cleanser after the more animated sections above it.
- **Desktop:** Two columns.
- **Mobile:** Single column, same order.

### 6.13 Network
**Content:** Doc §11
- **Concept:** A minimal constellation/node graphic (SVG, a handful of dots connected by thin lines in `--ash`/`--glint`) behind the investor/network copy — a quiet visual echo of "network" without literally showing a LinkedIn graph. Static on load, very subtle idle drift (or fully static if reduced-motion).
- **Desktop:** Graphic as a right-column visual, copy left.
- **Mobile:** Graphic becomes a smaller full-width header image above the copy, simplified node count so it doesn't feel cluttered at small size.

### 6.14 Contact / Closing
**Content:** Doc §12 (site map doesn't need to render — this is just the footer/CTA)
- **Concept:** Large closing statement in `Fraunces`, one clear CTA (e.g. "Connect on LinkedIn" / email), magnetic button hover effect (button subtly follows cursor within a small radius) — the last "delight" moment, echoing the hero's facet-glint energy without repeating it exactly.
- **Desktop:** Full-bleed `--carbon` band, centered statement + magnetic CTA button.
- **Mobile:** Same band, button loses magnetic effect (becomes a standard large tap target, full-width or centered), statement type scales down.

---

## 7. MOTION RULES (sitewide)

- Every scroll-triggered animation uses `viewport={{ once: true }}` in Framer Motion — content reveals once, doesn't re-trigger on scroll-up (avoids the "flickering AI site" feeling)
- Stagger children by 40–80ms max — no long staggered cascades
- No parallax on background images/patterns beyond a very subtle (≤ 20px) shift — nothing that induces motion sickness
- No autoplay video/audio anywhere
- Hover states: color/border transitions at 150–200ms ease-out, no bounce/spring easing except the magnetic button and the slider drag (Section 6.6, 6.14) where spring physics are intentional

---

## 8. RECOMMENDED FILE/COMPONENT STRUCTURE

```
app/
  page.tsx                 → composes all sections in order
  layout.tsx                → font loading, metadata
components/
  sections/
    Hero.tsx
    VoiceStrip.tsx
    About.tsx
    FounderStory.tsx
    RolesHorizontalScroll.tsx
    USPSlider.tsx
    PhilosophyBands.tsx
    JourneyTimeline.tsx
    ReiaStory.tsx
    NumbersGrid.tsx
    PressMarquee.tsx
    Credentials.tsx
    Network.tsx
    ClosingCTA.tsx
  ui/
    FacetGlint.tsx          → shared signature motif component, reused in Hero + ClosingCTA
    StatCounter.tsx
    MagneticButton.tsx
lib/
  content.ts                 → all copy from Prapanjj-Kota-Website-Content.md, structured as typed objects (one object per section) — single source of truth, easy to edit without touching components
```

---

## 9. OPEN ITEMS BEFORE FINAL BUILD

Carried over from the content doc (§13) — still needed:
- Press logos (currently text-only marquee — swap in real logos for §6.11 when available)
- Photography/headshots (hero and about currently pure-typography by design, but confirm if a photo should be introduced anywhere)
- Final CTA destination (LinkedIn vs. email vs. contact form — pick one primary action for §6.14)
- Confirm whether Réia's own brand colors/logo need to appear anywhere, or if this stays entirely "personal site, not brand site" as designed

---

## 10. HANDOFF NOTE FOR V0

Paste this PRD plus `Prapanjj-Kota-Website-Content.md` into the same v0 project. This PRD defines structure, motion, and system; the content doc is the single source of truth for every word — do not paraphrase or invent new copy beyond what's marked as an "option" in the content doc.
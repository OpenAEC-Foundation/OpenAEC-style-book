# OpenAEC Foundation — Design System Reference

> Version 0.4 — March 2026
> Machine-readable brand & design specification for use by AI assistants (Claude Code, Claude Desktop).
> When building ANY artifact for OpenAEC (website, app, report, letter, presentation, email), follow this document exactly.

---

## 1. Identity

| Key | Value |
|-----|-------|
| Full name | **OpenAEC Foundation** |
| Short name | **OpenAEC** |
| Legal name (NL) | Stichting OpenAEC Foundation |
| Spelling | Always `OpenAEC` — one word, capital O, AEC in caps. Never: "Open AEC", "open aec", "OPENAEC" |
| Primary tagline | **Build free. Build together.** |
| Secondary tagline | Free and open-source tools for the built environment. |
| Campaign tagline | Own your tools. |
| Language | EN primary, NL secondary |

---

## 2. Design Tokens

### 2.1 Colors

```
PRIMARY
  --amber:           #D97706   rgb(217,119,6)    — Primary brand. Buttons, links, accents
  --deep-forge:      #36363E   rgb(54,54,62)     — Dark backgrounds, text on light

SECONDARY
  --signal-orange:   #EA580C   rgb(234,88,12)    — Hover states, CTAs, warnings
  --warm-gold:       #F59E0B   rgb(245,158,11)   — Highlights, badges, secondary accents
  --scaffold-gray:   #A1A1AA   rgb(161,161,170)  — Secondary text, borders, subtle UI

BACKGROUNDS
  --blueprint-white: #FAFAF9   rgb(250,250,249)  — Light background (warm, not clinical)
  --concrete:        #F5F5F4   rgb(245,245,244)  — Cards, code blocks, sections
  --night-build:     #2A2A32   rgb(42,42,50)      — Darkest background, hero sections

SEMANTIC
  --success:         #16A34A   rgb(22,163,74)    — Passed, confirmed, OK
  --error:           #DC2626   rgb(220,38,38)    — Failed, destructive, critical
  --warning:         #F59E0B   (same as warm-gold)
  --info:            #2563EB   rgb(37,99,235)    — Informational, neutral
```

**Color rules:**
1. `--amber` is NEVER used as a background fill. Only for elements that demand attention (buttons, links, accents, borders).
2. Text on dark backgrounds: use `--blueprint-white` or `--warm-gold`, never amber (too low contrast).
3. Text on light backgrounds: use `--deep-forge`, never amber.
4. Minimum contrast ratio: 4.5:1 for all text (WCAG AA).
5. Gradient accent strip: `linear-gradient(90deg, #D97706 0%, #F59E0B 40%, #EA580C 100%)` — used on header/footer borders.

### 2.2 Typography

All fonts are open-source (OFL). Load from Google Fonts or self-host.

```
HEADINGS (H1–H3)
  font-family: "Space Grotesk", system-ui, sans-serif
  font-weight: 700 (Bold)
  letter-spacing: -0.02em
  line-height: 1.2

SUBHEADINGS (H4–H6)
  font-family: "Space Grotesk", system-ui, sans-serif
  font-weight: 500 (Medium)
  letter-spacing: -0.01em
  line-height: 1.3

BODY TEXT
  font-family: "Inter", system-ui, sans-serif
  font-weight: 400 (Regular), 500 (Medium for emphasis)
  line-height: 1.6
  max-width: 70ch (for readability)

UI / BUTTONS / LABELS
  font-family: "Inter", system-ui, sans-serif
  font-weight: 600 (Semi-Bold)

CODE / MONOSPACE
  font-family: "JetBrains Mono", monospace
  font-weight: 400 (Regular)
  line-height: 1.5

SECTION LABELS (e.g., "01 — Colors")
  font-family: "JetBrains Mono", monospace
  font-weight: 500
  font-size: 0.75rem
  text-transform: uppercase
  letter-spacing: 0.1em
  color: --amber (on light) or --warm-gold (on dark)
```

**Type scale:**

| Element | Size | Weight | Font |
|---------|------|--------|------|
| H1 | 2.5rem (40px) | 700 | Space Grotesk |
| H2 | 2rem (32px) | 700 | Space Grotesk |
| H3 | 1.5rem (24px) | 700 | Space Grotesk |
| H4 | 1.25rem (20px) | 500 | Space Grotesk |
| H5 | 1.125rem (18px) | 500 | Space Grotesk |
| H6 | 1rem (16px) | 500 | Space Grotesk |
| Body | 1rem (16px) | 400 | Inter |
| Small | 0.875rem (14px) | 400 | Inter |
| XS | 0.75rem (12px) | 400 | Inter |
| Code | 0.875rem (14px) | 400 | JetBrains Mono |
| Code (print) | 0.8rem | 400 | JetBrains Mono |

**Font sources:**
- Space Grotesk: `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700`
- Inter: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700`
- JetBrains Mono: `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500`

**Typography rules:**
1. Headings in **sentence case**, never ALL CAPS (exception: tagline/logo).
2. Never more than 3 font weights on one page.
3. Body text max-width: 70ch.
4. Print body text: justify + hyphens.

### 2.3 Spacing

Based on 4px (0.25rem) increments:

```
--sp-1:   0.25rem   (4px)
--sp-2:   0.5rem    (8px)
--sp-3:   0.75rem   (12px)
--sp-4:   1rem      (16px)
--sp-5:   1.25rem   (20px)
--sp-6:   1.5rem    (24px)
--sp-8:   2rem      (32px)
--sp-10:  2.5rem    (40px)
--sp-12:  3rem      (48px)
--sp-16:  4rem      (64px)
--sp-20:  5rem      (80px)
--sp-24:  6rem      (96px)
```

### 2.4 Border Radius

```
--radius-sm:    4px    — Inline code, small elements
--radius-md:    8px    — Buttons, inputs, cards, alerts
--radius-lg:    12px   — Large cards, modals
--radius-full:  9999px — Badges, pills, tags
```

### 2.5 Dashboard / Dense UI Tokens

For dense, application dashboards with dark sidebars, panels, and terminal-style output areas.
Derived from core brand tokens — no new colors introduced.

| Token | Value | Derived from | Usage |
|-------|-------|-------------|-------|
| `--dashboard-bg` | `#2A2A32` | `--night-build` | Primary background |
| `--dashboard-surface` | `#36363E` | `--deep-forge` | Cards, panels |
| `--dashboard-surface-hover` | `#3E3E48` | deep-forge + 8% | Hover states |
| `--dashboard-sidebar` | `#222228` | night-build − 8% | Sidebar, left nav |
| `--dashboard-border` | `#4A4A54` | deep-forge + border | Dividers, outlines |
| `--dashboard-border-light` | `#404048` | subtle dividers | Section separators |
| `--dashboard-text` | `#FAFAF9` | `--blueprint-white` | Primary text |
| `--dashboard-text-muted` | `#A1A1AA` | `--scaffold-gray` | Secondary text, labels |
| `--dashboard-text-dim` | `#666670` | scaffold-gray 60% | Timestamps, metadata |
| `--dashboard-accent` | `#D97706` | `--amber` | Active states, selection |
| `--dashboard-accent-bg` | `#2E2418` | amber 10% on dark | Accent backgrounds |
| `--dashboard-accent-hover` | `#EA580C` | `--signal-orange` | Hover on accent |
| `--dashboard-terminal` | `#F59E0B` | `--warm-gold` | Terminal/live output context |
| `--dashboard-terminal-dim` | `#D97706` | `--amber` | Dimmed terminal text |

### 2.6 Shadows

```
--shadow-sm:  0 1px 2px rgba(0,0,0,0.05)
--shadow-md:  0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)
--shadow-lg:  0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)
```

### 2.7 Borders

```
Default border:     1px solid #E7E5E4
Hover border:       1px solid #D6D3D1
Featured border:    2px solid --amber
Separator:          1px solid #E7E5E4 (light) or 1px solid #27272A (dark)
```

---

## 3. Components

### 3.1 Buttons

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| **Primary** | `--amber` | white | none | bg → `--signal-orange` |
| **Secondary** | transparent | `--deep-forge` | 2px `--deep-forge` | bg → `--deep-forge`, text → white |
| **Ghost** | transparent | `--amber` | 2px `--amber` | bg → `--amber`, text → white |
| **Dark** | `--deep-forge` | `--blueprint-white` | none | bg → `#27272A` |
| **Disabled** | any variant | — | — | opacity: 0.4, cursor: not-allowed |

**Button sizing:**

| Size | Font | Padding |
|------|------|---------|
| Small | 0.75rem / 600 | 8px 16px |
| Default | 0.875rem / 600 | 12px 24px |
| Large | 1rem / 600 | 16px 32px |

All buttons: `border-radius: 8px`, `transition: all 0.15s ease`.

### 3.2 Form Inputs

```
font-family: Inter
font-size: 0.875rem
padding: 12px 16px
border: 1.5px solid #D6D3D1
border-radius: 8px
background: white

FOCUS STATE:
  border-color: --amber
  box-shadow: 0 0 0 3px rgba(217,119,6,0.15)

ERROR STATE:
  border-color: --error
  box-shadow: 0 0 0 3px rgba(220,38,38,0.15)

LABEL:
  font-weight: 500
  font-size: 0.875rem
  margin-bottom: 8px

HINT TEXT:
  font-size: 0.75rem
  color: --scaffold-gray (or --error for errors)
```

### 3.3 Cards

```
DEFAULT:
  background: white
  border: 1px solid #E7E5E4
  border-radius: 12px
  padding: 24px
  shadow: --shadow-sm
  hover: shadow → --shadow-md, border → #D6D3D1

FEATURED:
  same as default but border: 2px solid --amber

DARK:
  background: --deep-forge
  border: 1px solid #27272A
  text: --blueprint-white
  secondary text: #A1A1AA
```

### 3.4 Tables

```
WRAPPER:
  border: 1px solid #E7E5E4
  border-radius: 8px
  overflow-x: auto

HEADER (thead):
  background: --concrete
  border-bottom: 2px solid #E7E5E4
  th: font-size 0.75rem, uppercase, letter-spacing 0.05em, color #57534E, font-weight 600

CELLS:
  padding: 12px 16px
  border-bottom: 1px solid #F5F5F4
  font-size: 0.875rem

ROW HOVER:
  background: #FAFAF9
```

### 3.5 Alerts

All alerts: `padding: 16px 24px`, `border-radius: 8px`, `border-left: 4px solid`, `font-size: 0.875rem`.

| Variant | Background | Border | Text color |
|---------|-----------|--------|------------|
| Info | `#EFF6FF` | `--info` | `#1E40AF` |
| Success | `#F0FDF4` | `--success` | `#166534` |
| Warning | `#FFFBEB` | `--amber` | `#92400E` |
| Error | `#FEF2F2` | `--error` | `#991B1B` |

### 3.6 Badges

All badges: `font-size: 0.7rem`, `font-weight: 600`, `uppercase`, `letter-spacing: 0.05em`, `padding: 0.2em 0.6em`, `border-radius: 9999px`.

| Variant | Background | Text |
|---------|-----------|------|
| Amber | `#FEF3C7` | `#92400E` |
| Green | `#DCFCE7` | `#166534` |
| Red | `#FEE2E2` | `#991B1B` |
| Blue | `#DBEAFE` | `#1E40AF` |
| Gray | `#F4F4F5` | `#3F3F46` |

### 3.7 Tags

```
font-size: 0.75rem
font-weight: 500
padding: 4px 12px
border-radius: 9999px
border: 1px solid #E7E5E4
color: #57534E
background: white
```

### 3.8 Progress Bars

```
TRACK:
  height: 8px
  background: #E7E5E4
  border-radius: 9999px

FILL:
  default: --amber
  success: --success
  danger: --error
  border-radius: 9999px
  transition: width 0.3s ease
```

### 3.9 Code Blocks

```
INLINE CODE:
  background: --concrete
  padding: 0.15em 0.4em
  border-radius: 4px
  font-size: 0.85em

CODE BLOCK (pre):
  background: --night-build
  color: --blueprint-white
  padding: 24px
  border-radius: 8px

SYNTAX HIGHLIGHTING COLORS:
  comment:  --scaffold-gray (#A1A1AA)
  keyword:  --warm-gold (#F59E0B)
  string:   #34D399
  function: --amber (#D97706)
```

### 3.10 Blockquote

```
border-left: 4px solid --amber
padding: 16px 24px
background: --concrete
border-radius: 0 8px 8px 0
font-style: italic
```

### 3.11 Navigation (Website)

```
NAVBAR:
  background: --deep-forge
  border-bottom: 1px solid #27272A
  padding: 16px 24px
  brand: Space Grotesk 700, 1.25rem, "Open" white + "AEC" amber
  links: Inter 500, 0.875rem, --scaffold-gray, hover → white, active → --amber

SIDEBAR:
  width: 260px
  background: --concrete
  border-right: 1px solid #E7E5E4
  section heading: JetBrains Mono 0.65rem uppercase, --scaffold-gray
  link: 0.875rem, #57534E, padding 8px 12px, radius 4px
  link hover: bg #E7E5E4
  link active: bg --amber, text white
```

---

## 4. Layout Templates

### 4.1 Website Layouts

> Summary index — see [`LAYOUTS.md`](LAYOUTS.md) sections 1.1–1.4 for full specs with wireframes.

| Layout | Key structure | Details |
|--------|--------------|---------|
| **Landing page** | navbar → hero → feature grid → stats → CTA → footer | `LAYOUTS.md` § 1.1 |
| **Documentation** | navbar → sidebar (260px) + content (720px) + TOC (200px) | `LAYOUTS.md` § 1.2 |
| **About / Team** | navbar → header → mission (2-col) → team grid → CTA | `LAYOUTS.md` § 1.3 |
| **Blog / News** | navbar → featured post → card grid (3-col) → pagination | `LAYOUTS.md` § 1.4 |

**Shared foundations** (grid, breakpoints, z-index scale): `LAYOUTS.md` § 0.

### 4.2 Application Layouts

> Summary index — see [`LAYOUTS.md`](LAYOUTS.md) sections 2.1–2.4 (web tools) and 3.1–3.4 (desktop tools).

**Web-based tools:**

| Layout | Key structure | Details |
|--------|--------------|---------|
| **Dashboard** | topbar + sidebar + KPI cards + data area | `LAYOUTS.md` § 2.1 |
| **Data table** | toolbar + table + bulk actions + pagination | `LAYOUTS.md` § 2.2 |
| **Form / detail** | breadcrumb + form sections + sticky action bar | `LAYOUTS.md` § 2.3 |
| **Settings** | settings nav (200px) + form content (640px) | `LAYOUTS.md` § 2.4 |

**Desktop tools:**

| Layout | Key structure | Details |
|--------|--------------|---------|
| **Workspace** | titlebar + toolbar + sidebar + canvas + statusbar | `LAYOUTS.md` § 3.1 |
| **Inspector** | properties panel (280px) alongside canvas | `LAYOUTS.md` § 3.2 |
| **Modal / dialog** | centered overlay, 3 sizes (400/560/720px) | `LAYOUTS.md` § 3.3 |
| **Toolbar patterns** | horizontal (40px) and vertical (48px) variants | `LAYOUTS.md` § 3.4 |

**CSS starter snippets** for all layouts: `LAYOUTS.md` § 4.

### 4.3 A4 Report

```
PAGE SIZE: 210mm × 297mm

HEADER BANNER:
  height: ~38mm
  background: --deep-forge
  bottom border: 4px amber gradient (see section 2.1)
  left side: logo ("Open" white + "AEC" amber, Space Grotesk 700 1.5rem)
             + tagline (Inter 0.7rem, --scaffold-gray)
  right side: project metadata (0.7rem, --scaffold-gray, labels in white 600)
  background illustration: SVG at 35% opacity (see section 6)

CONTENT AREA:
  padding: 10mm horizontal, 10mm top, 30mm bottom (space for footer)
  title: Space Grotesk 700, 1.75rem
  subtitle: Inter 400, 1rem, --scaffold-gray
  body: Inter 400, 0.9rem, line-height 1.7, justify, hyphens
  section headings (h3): Space Grotesk 700, 1.1rem, 8mm top margin

FOOTER:
  fixed at bottom
  background: --deep-forge
  top border: 3px amber gradient
  padding: 5mm 12mm
  left: brand wordmark ("Open" white + "AEC" amber, 0.75rem)
  center: SVG icons row (building, code, BIM cube, git-branch) at 14px, 50% opacity
  right: document title + page number (JetBrains Mono, --amber)

FOOTER ICONS (SVG, stroke-based, 24×24 viewBox, stroke="#A1A1AA" stroke-width="1.5"):
  Building: rect + window dots + door
  Code: <polyline points="16,18 22,12 16,6"/> + <polyline points="8,6 2,12 8,18"/>
  BIM cube: 3D box with center lines
  Open-source: git branch with 3 circles
```

### 4.4 A4 Letter

```
Same as report but:
  - Header banner: slimmer (~30mm), padding 7mm
  - Header illustration: more subtle/abstract (lower density)
  - No title/subtitle block
  - Content starts with address block, then date, subject, greeting
  - Footer: brand + icons + legal info (KvK, website)

LETTER BODY FORMAT:
  address: Inter 0.85rem, line-height 1.6, margin-bottom 10mm
  subject: Inter 700, 0.95rem, margin-bottom 6mm
  greeting/closing: Inter 400, 0.9rem
  paragraphs: Inter 400, 0.9rem, justify, 4mm margin-bottom
  signature: Inter 400, 0.85rem, margin-top 12mm
```

### 4.5 Email / Newsletter

```
WIDTH: 600px max
HEADER: --deep-forge banner, logo left, minimal
BODY: white background, Inter 16px
CTA BUTTON: --amber, white text, 16px padding, 8px radius
FOOTER: --deep-forge, small text, unsubscribe link
```

---

## 5. Tone of Voice

### Personality
Direct, technical, inclusive, urgent, not bitter. We talk like an experienced builder organizing a community.

### Rules
1. **English** for all technical docs, GitHub, international comms.
2. **Dutch** for NL-specific communication.
3. Use "we" and "our", not "the foundation" or "OpenAEC believes...".
4. No abbreviations without first explanation.
5. No superlatives ("the best", "revolutionary", "unique"). Let the work speak.
6. No jargon or corporate speak. Say what you mean.
7. Reference concrete tools and code, not abstract promises.

### Examples

| Context | Good | Bad |
|---------|------|-----|
| Feature announcement | "IFC4x3 export is here. Full property sets, no lossy conversion." | "We're excited to announce our revolutionary new export feature!" |
| Call to action | "Start contributing" / "View the code" | "Join our amazing community today!" |
| Error message | "Element C-201 exceeds the limit (UC = 1.05). Upgrade to HEB 300." | "Oops! Something went wrong with your element." |
| Onboarding | "First PR? Welcome. Here are the good-first-issues." | "Begin your journey with our platform." |

---

## 6. Brand Illustration System

### Concept
The OpenAEC visual identity uses a consistent set of SVG-based elements that represent our three pillars: **building**, **BIM/3D**, and **code**. These are combined as background illustrations in headers, banners, and hero sections.

### Elements Library

All elements are SVG, stroke-based, using brand colors on dark backgrounds.

**1. Isometric Building Blocks**
- Hexagonal/isometric 3D blocks representing buildings
- Stroke: `--amber` or `--warm-gold`, width 2–2.5px
- Semi-transparent fill on top face (10–15% opacity)
- Window details: small rectangles with light fill
- Vary in height to create a skyline cluster

**2. Code Brackets `{ }`**
- JetBrains Mono, large (48–80px depending on context)
- Color: `--amber` at 70–90% opacity
- Horizontal lines inside representing code (stroke `#FAFAF9`, width 2px, 60–70% opacity)

**3. BIM Cube (3D Wireframe)**
- Front face: stroke `--amber`, width 2–2.5px
- Back face: stroke `#FAFAF9`, width 1.2px, 45% opacity
- Connecting edges between faces
- Top face: filled `--amber` at 12% opacity
- "BIM" label inside: JetBrains Mono, bold

**4. Structural Elements**
- I-profile (HEA/HEB cross-section): stroke `--warm-gold`, light fill
- Truss triangle: stroke `--warm-gold`
- Can be shown at different rotations

**5. Skyline Silhouette**
- City silhouette path at bottom of illustration
- Fill: `#FAFAF9` at 40–50% opacity
- Varying building heights, includes towers and low-rise

**6. Blueprint Grid**
- Background pattern: 20–30px squares
- Stroke: `#FAFAF9`, width 0.5–0.6px
- Creates technical drawing atmosphere

**7. Network Connections**
- Circles (nodes): 3–5px radius, filled `--amber` or `--warm-gold`
- Dashed connecting lines: stroke-width 1px, dasharray "4,3" or "5,4"
- Connect all major elements to suggest collaboration/interoperability

### Composition Rules

| Context | Opacity | Density | Width |
|---------|---------|---------|-------|
| Website hero banner | 30% | High — all elements | Full width (1200px viewBox) |
| Report header | 35% | Medium — 3 buildings + code + BIM + structural | Right-aligned (520px viewBox) |
| Letter header | 30% | Low — abstract buildings + code + nodes | Right-aligned (400px viewBox) |
| Social media card | 40% | Medium | Centered |
| Desktop app splash | 25% | Low — subtle grid + nodes | Full area |

### Color on Dark

On `--deep-forge` or `--night-build` backgrounds:
- Primary strokes: `--amber` (#D97706)
- Secondary strokes: `--warm-gold` (#F59E0B)
- Tertiary strokes: `#FAFAF9` (for depth/back faces)
- Fills: same colors at 10–20% opacity for subtle volume

---

## 7. Do's and Don'ts

### Do
- Use Construction Amber as the recognition color everywhere
- Write as if talking to a colleague, not a customer
- Reference concrete tools and code
- Use open-source fonts, icons, and images only
- Credit contributors explicitly
- Include the amber gradient strip on headers/footers
- Use the illustration system for visual identity
- Maintain WCAG AA contrast ratios

### Don't
- **Never** reference 3BM, 3BM Bouwkunde, or affiliated entities
- **Never** use proprietary fonts or licensed images
- **Never** promise what doesn't exist — no roadmaps as facts
- **Never** attack other software or companies by name
- **Never** combine the logo with other logos without approval
- **Never** use amber as a background fill for large areas
- **Never** use ALL CAPS for headings (exception: tagline)
- **Never** use more than 3 font weights on one page

---

## 8. Quick Reference Card

```
NAME:       OpenAEC Foundation
TAGLINE:    Build free. Build together.
AMBER:      #D97706
DARK:       #36363E
ORANGE:     #EA580C
GOLD:       #F59E0B
GRAY:       #A1A1AA
WHITE:      #FAFAF9
CONCRETE:   #F5F5F4
NIGHT:      #2A2A32
SUCCESS:    #16A34A
ERROR:      #DC2626
INFO:       #2563EB
HEADING:    Space Grotesk 700
BODY:       Inter 400
UI:         Inter 600
CODE:       JetBrains Mono 400
RADIUS:     4 / 8 / 12 / 9999 px
GRADIENT:   linear-gradient(90deg, #D97706 0%, #F59E0B 40%, #EA580C 100%)
LANG:       EN primary, NL secondary
```

---

## 9. CSS Starter

Copy-paste this into any new project:

```css
:root {
  /* Colors */
  --amber: #D97706;
  --deep-forge: #36363E;
  --signal-orange: #EA580C;
  --warm-gold: #F59E0B;
  --scaffold-gray: #A1A1AA;
  --blueprint-white: #FAFAF9;
  --concrete: #F5F5F4;
  --night-build: #2A2A32;
  --success: #16A34A;
  --error: #DC2626;
  --info: #2563EB;

  /* Typography */
  --font-heading: "Space Grotesk", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-code: "JetBrains Mono", monospace;

  /* Spacing */
  --sp-1: 0.25rem; --sp-2: 0.5rem; --sp-3: 0.75rem;
  --sp-4: 1rem; --sp-5: 1.25rem; --sp-6: 1.5rem;
  --sp-8: 2rem; --sp-10: 2.5rem; --sp-12: 3rem;
  --sp-16: 4rem; --sp-20: 5rem; --sp-24: 6rem;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);
}
```

---

## 10. Tailwind CSS Mapping

If using Tailwind, extend the config:

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        amber: { DEFAULT: "#D97706" },
        forge: "#36363E",
        orange: { signal: "#EA580C" },
        gold: { warm: "#F59E0B" },
        scaffold: "#A1A1AA",
        blueprint: "#FAFAF9",
        concrete: "#F5F5F4",
        night: "#2A2A32",
      },
      fontFamily: {
        heading: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        code: ['"JetBrains Mono"', "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
    },
  },
};
```

---

## 11. Asset Inventory

> This section maps every asset file to its intended purpose. Use this as a lookup table when building any OpenAEC artifact.

### 11.1 Logo Files

The logo is an **isometric open building block** — a 3D hexagonal cube with one face removed (the "open" side), representing open-source + construction. The opening faces the viewer, inviting them in.

**Naming convention:** `openaec-[logo|symbol]-[variant]-[scale].ext`

- `logo` = full lockup: symbol + "OpenAEC" wordmark + tagline "Build free. Build together."
- `symbol` = icon only: the isometric open building block without text

| File pattern | Description | Use when |
|-------------|-------------|----------|
| `openaec-logo-amber-on-dark` | Full lockup with amber symbol + amber "AEC" + white "Open" on Deep Forge background | Dark headers, dark hero sections, dark-mode navbars, social media on dark backgrounds |
| `openaec-logo-dark-on-light` | Full lockup with dark symbol + dark "Open" + amber "AEC" on Blueprint White background | Light headers, light-mode navbars, print on white paper, light presentations |
| `openaec-logo-white-on-dark` | Full lockup with white symbol + white text on Deep Forge background | Monochrome contexts, grayscale print, when amber is not available |
| `openaec-symbol-amber-on-dark` | Symbol only, amber on Deep Forge background | Favicons, app icons, small avatar contexts on dark backgrounds |
| `openaec-symbol-dark-on-light` | Symbol only, dark on Blueprint White background | Favicons, app icons on light backgrounds, small print |
| `openaec-symbol-white-on-dark` | Symbol only, white on Deep Forge background | Monochrome icon contexts, loading screens |
| `openaec-symbol-transparent` | Symbol only, amber, transparent background (no solid bg) | Overlays, watermarks, compositing on any background, GitHub profile photo |

**Scale variants (PNG only):**

| Suffix | Resolution | Use |
|--------|-----------|-----|
| `-1x` | 72 DPI | Standard web, email, documents |
| `-2x` | 144 DPI | Retina/HiDPI screens, quality social media |
| `-3x` | 216 DPI | Extra high-DPI, large displays |

**Format guidance:**

| Format | Location | Use |
|--------|----------|-----|
| SVG | `assets/logo/svg/` | Master source. Use for web (best quality), editing, resizing |
| PNG | `assets/logo/png/` | Raster contexts: email, social media, presentations, documents |
| PDF | `assets/logo/pdf/` | Print production, InDesign, vector-quality print output |

### 11.2 Illustration Files

All illustrations share the same visual language: amber/gold stroke elements on a blueprint grid, connected by dashed network lines, with a city skyline silhouette at the bottom. They contain these recurring motifs:
- **Isometric building blocks** (hexagonal 3D cubes in amber/gold strokes)
- **Code brackets `{ }`** (amber, with white "code lines" inside)
- **BIM cube** (3D wireframe box labeled "BIM")
- **I-profile** (structural steel cross-section, warm gold strokes)
- **Truss triangle** (structural engineering element)
- **Blueprint grid** (subtle white square grid in background)
- **Skyline silhouette** (city outline at bottom edge, light gray)
- **Network nodes** (amber dots connected by dashed lines)

| File | Dimensions | Density | Description | Use for |
|------|-----------|---------|-------------|---------|
| `hero-banner-dark` | 1200×400px (wide) | High — all elements spread across full width | Full panoramic composition on dark background: buildings (left), code brackets (center-top), BIM cube (center-right), I-profile, truss, small building blocks (right), skyline along bottom | **Website hero sections**, full-width banners, landing pages, README headers. Place at 30% opacity behind centered text. |
| `hero-banner-transparent` | 1200×400px (wide) | High — same composition as dark variant | Same elements as hero-banner-dark but with transparent background (amber/gold strokes only, no dark fill) | **Overlay on any background color**. Use when you need the illustration on a custom or non-standard background. Also for light-background hero variants. |
| `report-header-dark` | 520×200px (compact) | Medium — buildings + code + BIM cube + I-profile | Right-aligned cluster on dark background: large isometric building (left), medium building (center-left), code brackets, BIM cube, I-profile (right), skyline at bottom | **A4 report header banners** (38mm height). Place at 35% opacity in the right portion of the header. The compact composition fits the limited header space. |
| `letter-header-dark` | 400×120px (slim) | Low — subtle, abstract buildings only | Minimal composition on dark background: a few flat building outlines in amber strokes, very sparse. No code brackets, no BIM cube, no skyline. | **A4 letter/memo header banners** (30mm height). Deliberately understated — letters need a professional, clean look. Place at 30% opacity. |
| `background-pattern-dark` | 600×600px (square) | Medium — elements spread across large area | Square format on dark background: building blocks (top-left), code brackets (center), BIM cube (top-right), I-profile (bottom-left), truss (bottom-center), additional blocks (right), skyline at bottom. Elements are widely spaced. | **Full-page backgrounds**, desktop app splash screens, presentation backgrounds. Place at 25% opacity behind content. |
| `background-pattern-tileable-dark` | 300×300px (square tile) | Low — sparse, seamlessly tileable | Seamlessly tileable version: a few scattered isometric blocks, code brackets (top-right), I-profile (bottom-right). Edges connect when tiles repeat. | **Repeating CSS backgrounds** (`background-repeat: repeat`), large surfaces, scrolling backgrounds, desktop wallpaper. Place at 20-25% opacity. |

**Scale variants (PNG):** Same as logos — `-1x`, `-2x`, `-3x` for standard, retina, and high-DPI.

**Format guidance:** SVG masters in `assets/illustrations/svg/`. Use SVG for web (scalable). Use PNG for contexts that don't support SVG (email, some PDF generators, social media).

### 11.3 Color Palette Files

| File | Description | Use for |
|------|-------------|---------|
| `color-palette.svg` | Master vector: visual reference showing all 11 brand colors as labeled swatches grouped by category (Primary, Secondary, Backgrounds, Semantic) with hex codes and accent gradient | **Brand presentations**, style guide pages, onboarding docs. Not for production use — this is a reference visualization. |
| `color-palette.png` | Raster export of the SVG at 144 DPI | Same as SVG but for contexts that need raster (email, slides, documents) |
| `color-palette.pdf` | PDF vector export | Print-quality color reference for designers |
| `cmyk-reference.md` | Markdown table with CMYK conversions and Pantone nearest matches | Print production: offset, letterpress, screen print. Consult when producing physical materials. |

### 11.4 Decision Table — Which Asset to Use

| Context | Logo variant | Illustration | Scale |
|---------|-------------|-------------|-------|
| Website hero section (dark) | `logo-amber-on-dark` in navbar | `hero-banner-dark` at 30% opacity behind hero text | SVG or 2x PNG |
| Website hero section (light) | `logo-dark-on-light` in navbar | `hero-banner-transparent` at 20% opacity | SVG or 2x PNG |
| A4 report header | `logo-amber-on-dark` (left side of header) | `report-header-dark` at 35% opacity (right side) | 2x or 3x PNG |
| A4 letter header | `logo-amber-on-dark` (left side of header) | `letter-header-dark` at 30% opacity (right side) | 2x or 3x PNG |
| GitHub profile / avatar | `symbol-transparent` | — | 1x PNG (≥200px) |
| GitHub social preview | `logo-amber-on-dark` | `hero-banner-dark` at 40% opacity | 1280×640px composite |
| Favicon / browser tab | `symbol-transparent` | — | SVG or 1x PNG |
| Email header | `logo-amber-on-dark` | — (keep emails light) | 2x PNG |
| Desktop app titlebar | `logo-amber-on-dark` (small) | — | SVG |
| Desktop app splash screen | `logo-amber-on-dark` (centered) | `background-pattern-dark` at 25% opacity | SVG |
| Presentation slide bg | `logo-amber-on-dark` (corner) | `background-pattern-dark` at 20% opacity | 3x PNG |
| Repeating web background | — | `background-pattern-tileable-dark` at 20% opacity | SVG (CSS `background-repeat`) |

---

## 12. Print Dimensions Reference

| Element | Value |
|---------|-------|
| A4 page | 210 × 297 mm |
| Report header height | ~38mm |
| Letter header height | ~30mm |
| Footer height | ~15mm |
| Content padding horizontal | 12mm |
| Content padding top | 10mm |
| Content padding bottom | 30mm (above footer) |
| Minimum logo height (print) | 10mm |
| Minimum logo height (digital) | 32px |
| Logo clearance zone | 1× logo height on all sides |

---

*This document is the single source of truth for all OpenAEC visual output.
When in doubt, refer to `brandbook/styleguide.html` for the rendered reference.*

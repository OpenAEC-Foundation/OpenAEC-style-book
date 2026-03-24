# OpenAEC Huisstijl Migratie-instructies

> **Doel:** Elke React app (desktop of web) omzetten naar de OpenAEC huisstijl.
> **Referentie:** `brandbook/DESIGN-SYSTEM.md` — de enige bron van waarheid voor design tokens.
> **Referentie-apps:**
> - Desktop (Tauri): `openaec-reports` (eerste succesvolle migratie)
> - Web (SPA): `openaec-bcf-platform` (eerste web-migratie)

---

## Stap 0 — Platform bepalen

Bepaal eerst welk type app je migreert:

| | **Desktop (Tauri+React)** | **Web (React SPA)** |
|---|---|---|
| Window chrome | Custom TitleBar (frameless) | Browser-native |
| Toolbar | Ribbon (Office-stijl tabs) | Navbar + page tabs |
| File menu | Backstage overlay | Navigatie / routes |
| Persistentie | Tauri Store | localStorage / server |
| Auth | Tauri Store of OS keychain | OIDC / JWT / cookies |
| Routing | Single-view met panels | React Router (URL-based) |
| Template | `project-templates/Tauri+React/` | Geen template (volg deze gids) |

**Lees altijd eerst:**
- `brandbook/DESIGN-SYSTEM.md` — design tokens (kleuren, typografie, spacing, componenten)
- `brandbook/LAYOUTS.md` — layout specs

**Extra voor desktop:**
- `project-templates/Tauri+React/COMPONENT-MANIFEST.md`
- `project-templates/Tauri+React/INTEGRATION.md`

---

## Fase 1 — Design tokens installeren (BEIDE PLATFORMS)

### 1.1 Google Fonts laden

Voeg toe aan `index.html` `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### 1.2 Kleurenpalet

Bron: `DESIGN-SYSTEM.md` § 2.1. Dit zijn de ENIGE kleuren die je mag gebruiken:

```
PRIMARY
  amber:           #D97706  — Buttons, links, accenten. NOOIT als achtergrond.
  deep-forge:      #36363E  — Donkere achtergronden, tekst op licht.

SECONDARY
  signal-orange:   #EA580C  — Hover states, CTAs
  warm-gold:       #F59E0B  — Highlights, badges
  scaffold-gray:   #A1A1AA  — Secundaire tekst, borders

BACKGROUNDS
  blueprint-white: #FAFAF9  — Lichte achtergrond (warm, niet klinisch)
  concrete:        #F5F5F4  — Cards, secties
  night-build:     #2A2A32  — Donkerste achtergrond

SEMANTIC
  success:         #16A34A
  error:           #DC2626
  warning:         #F59E0B  (= warm-gold)
  info:            #2563EB

BORDERS
  border:          #E7E5E4
  border-hover:    #D6D3D1
```

### 1.3 Kleurregels (STRIKT)

1. `#D97706` (amber) wordt **NOOIT** als achtergrondvlak gebruikt. Alleen voor elementen die aandacht vragen (buttons, links, accenten, borders).
2. Tekst op donkere achtergrond: `#FAFAF9` (blueprint-white) of `#F59E0B` (warm-gold). **Nooit** amber.
3. Tekst op lichte achtergrond: `#36363E` (deep-forge). **Nooit** amber.
4. Minimum contrast ratio: 4.5:1 (WCAG AA).
5. Gradient accent strip: `linear-gradient(90deg, #D97706 0%, #F59E0B 40%, #EA580C 100%)` — header/footer borders.

### 1.4 Typografie

```
HEADINGS (H1–H3):  "Space Grotesk", system-ui, sans-serif — 700 bold
SUBHEADINGS (H4–H6): "Space Grotesk" — 500 medium
BODY TEXT:          "Inter", system-ui, sans-serif — 400/500
UI / BUTTONS:       "Inter" — 600 semi-bold
CODE:               "JetBrains Mono", monospace — 400
```

Type scale: H1=2.5rem, H2=2rem, H3=1.5rem, H4=1.25rem, Body=1rem, Small=0.875rem, XS=0.75rem.

**Regels:** Headings altijd sentence case (nooit ALL CAPS). Body max-width: 70ch. Letter-spacing headings: -0.02em.

### 1.5 Spacing, radii, shadows

```
SPACING: 4px increments (4, 8, 12, 16, 20, 24, 32, 48, 64, 80, 96)

BORDER-RADIUS:
  sm:   4px   — inline code, kleine elementen
  md:   8px   — buttons, inputs, cards, alerts
  lg:   12px  — grote cards, modals
  full: 9999px — badges, pills, tags

SHADOWS:
  sm: 0 1px 2px rgba(0,0,0,0.05)
  md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)
  lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)
```

---

## Fase 2 — Theming implementeren

### DESKTOP (Tauri): CSS custom properties + data-theme

Kopieer `themes.css` uit de template. Bevat 100+ `--theme-*` variabelen voor twee thema's:
- `light` (standaard) — donker chrome, amber accenten
- `openaec` — nog donkerder variant

Activeer via: `document.documentElement.setAttribute("data-theme", theme)`

Kopieer `tailwind.config.ts` voor de Tailwind bridge:
```
bg-surface     → var(--theme-bg)
text-on-surface → var(--theme-text)
bg-accent      → var(--theme-accent)
```

**Gouden regel:** Shell-componenten → CSS vars. Domein-componenten → Tailwind bridge classes (`bg-surface`, niet `bg-stone-800`).

### WEB (SPA): Tailwind v4 @theme blok

Web apps gebruiken Tailwind v4 met een `@theme` blok in `index.css`:

```css
@import "tailwindcss";

@theme {
  /* OpenAEC Foundation — Design System v0.4 */
  --color-amber: #D97706;
  --color-deep-forge: #36363E;
  --color-signal-orange: #EA580C;
  --color-warm-gold: #F59E0B;
  --color-scaffold-gray: #A1A1AA;
  --color-blueprint-white: #FAFAF9;
  --color-concrete: #F5F5F4;
  --color-night-build: #2A2A32;
  --color-success: #16A34A;
  --color-error: #DC2626;
  --color-warning: #F59E0B;
  --color-info: #2563EB;
  --color-border: #E7E5E4;
  --color-border-hover: #D6D3D1;
  --color-text: #36363E;
  --color-text-muted: #57534E;
  --color-text-subtle: #A1A1AA;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
  --font-heading: "Space Grotesk", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

body {
  margin: 0;
  font-family: var(--font-body);
  background-color: var(--color-blueprint-white);
  color: var(--color-text);
}

h1, h2, h3 { font-family: var(--font-heading); font-weight: 700; letter-spacing: -0.02em; line-height: 1.2; }
h4, h5, h6 { font-family: var(--font-heading); font-weight: 500; letter-spacing: -0.01em; line-height: 1.3; }
code { font-family: var(--font-mono); }
```

Dit genereert automatisch Tailwind classes: `bg-amber`, `text-deep-forge`, `font-heading`, etc.

### 2.1 Domein-tokens toevoegen

Voeg app-specifieke kleuren toe (chart kleuren, domein-badges, etc.):

```css
/* Desktop: in themes.css */
--domain-chart-1: #D97706;

/* Web: in @theme blok */
--color-domain-chart-1: #D97706;
```

---

## Fase 3 — App shell bouwen

### DESKTOP: TitleBar + Ribbon + StatusBar

Kopieer de volgende bestanden uit `project-templates/Tauri+React/`:

| Component | Bestanden | Afmeting | Doel |
|-----------|----------|----------|------|
| TitleBar | `TitleBar.tsx` + `.css` | 32px hoog | Window chrome, quick-access (Save/Undo/Redo) |
| Ribbon | `ribbon/Ribbon.tsx` + `.css` + `RibbonTab/Button/Group/ButtonStack.tsx` | 122px (28px tabs + 94px content) | Tab-gebaseerde toolbar |
| StatusBar | `StatusBar.tsx` + `.css` | 22px hoog | Informatieve footer |
| Backstage | `backstage/Backstage.tsx` + `.css` | Overlay (z:1000) | File menu |
| Modal | `Modal.tsx` + `.css` | Overlay (z:10000) | Dialogen |
| SettingsDialog | `settings/SettingsDialog.tsx` + `.css` | Modal | Thema/taal |

**Layout structuur (flex h-screen flex-col):**
```
AppShell
├── TitleBar          (32px, flex-shrink: 0)
├── Ribbon            (122px, flex-shrink: 0)
├── MainContent       (flex-1, overflow-hidden)
│   ├── Sidebar       (optioneel, toggleable)
│   └── Editor Panel  (flex-1)
└── StatusBar         (22px, flex-shrink: 0)
```

**Ribbon detail:**
- Tab layer (28px): File tab (amber bg), Home/Insert/View tabs, animated border indicator
- Content layer (94px): RibbonGroups met RibbonButtons, slide-animatie bij tab switch
- File tab opent Backstage overlay

**RibbonButton sizes:**
- Large (default): 44×66px, icon boven label, verticaal
- Medium: 70×33px, icon naast label, horizontaal
- Small: 70×22px, compact horizontaal

### WEB: Navbar + Page layout

Web apps gebruiken een lichter shell-patroon:

**Layout structuur:**
```
App
├── Navbar            (56px, vast bovenaan)
│   ├── Brand         ("Open" wit + "AEC" amber)
│   ├── Navigation    (links naar pagina's)
│   └── User menu     (login/logout)
└── <Routes>
    └── Page content  (max-width: 1280px, centered)
```

**Navbar specificatie:**
```
NAVBAR:
  background: #36363E (deep-forge)
  border-top: 3px amber gradient (linear-gradient 90deg, #D97706 → #F59E0B → #EA580C)
  height: 56px (h-14)
  padding: 0 16px

BRAND:
  font: Space Grotesk 700, 1.125rem
  "Open" → #FAFAF9 (white)
  "AEC"  → #D97706 (amber)
  Subtitel → scaffold-gray, Inter 400, 0.875rem

NAV LINKS:
  font: Inter 500, 0.875rem
  idle: scaffold-gray (#A1A1AA)
  hover: white, bg white/10
  active: bg amber, text white
  border-radius: 4px
  padding: 6px 12px

LOGIN BUTTON:
  bg: amber, text: white, font-weight: 600
  hover: signal-orange
  border-radius: 8px
  padding: 6px 12px

USER MENU:
  Naam: scaffold-gray, 0.875rem
  Logout icon: scaffold-gray, hover white
```

**Page tabs (binnen een pagina, bijv. project detail):**
```
TAB BAR:
  border-bottom: 1px solid #E7E5E4

TAB BUTTON:
  font: Inter 600, 0.875rem
  idle: text-muted, border-bottom transparent
  active: text amber, border-bottom 2px amber
  hover: text darker, border-bottom border-color
  padding: 10px 16px
```

**Responsive:**
- Mobile: hamburger menu, nav items in dropdown
- Tablet+: inline nav links
- Max content width: 1280px (max-w-7xl), centered met auto margins

---

## Fase 4 — Component styling (BEIDE PLATFORMS)

### 4.1 Buttons

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| **Primary** | `#D97706` | white | none | bg → `#EA580C` |
| **Secondary** | transparent | `#36363E` | 2px `#36363E` | bg → `#36363E`, text → white |
| **Ghost** | transparent | `#D97706` | 2px `#D97706` | bg → `#D97706`, text → white |
| **Dark** | `#36363E` | `#FAFAF9` | none | bg → `#27272A` |
| **Disabled** | (elk variant) | — | — | opacity: 0.4, cursor: not-allowed |

Alle buttons: `border-radius: 8px`, `transition: all 0.15s ease`, `font-weight: 600`.

Sizes: Small (0.75rem, 8px 16px), Default (0.875rem, 12px 24px), Large (1rem, 16px 32px).

### 4.2 Form inputs

```css
border: 1.5px solid #D6D3D1;
border-radius: 8px;
padding: 12px 16px;
font: Inter 0.875rem;

/* Focus */
border-color: #D97706;
box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.15);

/* Error */
border-color: #DC2626;
box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);

/* Label */
font-weight: 500;
font-size: 0.875rem;
margin-bottom: 8px;
```

### 4.3 Cards

```css
background: white;
border: 1px solid #E7E5E4;
border-radius: 12px;
padding: 24px;
box-shadow: 0 1px 2px rgba(0,0,0,0.05);

/* Hover */
box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
border-color: #D6D3D1;

/* Featured variant */
border: 2px solid #D97706;
```

### 4.4 Badges

```css
font-size: 0.7rem;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.05em;
padding: 0.2em 0.6em;
border-radius: 9999px;
```

| Variant | Background | Text |
|---------|-----------|------|
| Amber | `#FEF3C7` | `#92400E` |
| Green | `#DCFCE7` | `#166534` |
| Red | `#FEE2E2` | `#991B1B` |
| Blue | `#DBEAFE` | `#1E40AF` |
| Gray | `#F4F4F5` | `#3F3F46` |

### 4.5 Tags

```css
font-size: 0.75rem;
font-weight: 500;
padding: 4px 12px;
border-radius: 9999px;
border: 1px solid #E7E5E4;
color: #57534E;
background: white;
```

### 4.6 Alerts

Alle alerts: `padding: 16px 24px`, `border-radius: 8px`, `border-left: 4px solid`, `font-size: 0.875rem`.

| Variant | Background | Border | Text |
|---------|-----------|--------|------|
| Info | `#EFF6FF` | `#2563EB` | `#1E40AF` |
| Success | `#F0FDF4` | `#16A34A` | `#166534` |
| Warning | `#FFFBEB` | `#D97706` | `#92400E` |
| Error | `#FEF2F2` | `#DC2626` | `#991B1B` |

### 4.7 Tables

```css
/* Wrapper */
border: 1px solid #E7E5E4;
border-radius: 8px;
overflow-x: auto;

/* Header */
background: #F5F5F4;
border-bottom: 2px solid #E7E5E4;
th: font-size 0.75rem, uppercase, letter-spacing 0.05em, color #57534E, font-weight 600;

/* Cells */
padding: 12px 16px;
border-bottom: 1px solid #F5F5F4;
font-size: 0.875rem;

/* Row hover */
background: #FAFAF9;
```

### 4.8 Empty states

```
Icon: 48px, scaffold-gray at 40% opacity, centered
Heading: 1rem, text-muted
Subtitle: 0.875rem, text-subtle
CTA button: primary button underneath (optioneel)
```

---

## Fase 5 — Platform-specifieke onderdelen

### DESKTOP: Ribbon tabs & Backstage

#### 5.1 Verplichte knoppen

**TitleBar quick-access:**
| Knop | Shortcut | Handler |
|------|----------|---------|
| Save | `Ctrl+S` | Opslaan |
| Undo | `Ctrl+Z` | Ongedaan maken |
| Redo | `Ctrl+Y` | Opnieuw |

**Backstage verplichte items:**
| Item | Shortcut | Status |
|------|----------|--------|
| New | `Ctrl+N` | Moet werken |
| Open | `Ctrl+O` | Moet werken |
| Save | `Ctrl+S` | Moet werken |
| Save As | `Ctrl+Shift+S` | Moet werken |
| Preferences | `Ctrl+,` | Opent SettingsDialog |
| About | — | Altijd aanwezig |
| Exit | `Alt+F4` | Moet werken |

#### 5.2 Ribbon audit

Loop door ELKE knop in ELKE ribbon tab:
- `✅ WERKEND` → handler voert actie uit
- `⚠️ PLACEHOLDER` → handler is leeg/console.log
- `❌ ONTBREEKT` → zou er moeten zijn

**Regels:**
1. Geen lege knoppen — verwijder of `disabled={true}` + tooltip "Binnenkort beschikbaar"
2. Geen duplicates
3. Logische groepering (Bewerken, Invoegen, Weergave, Output)
4. Alle iconen als SVG strings in `ribbon/icons.ts`

#### 5.3 Keyboard shortcuts

```
Ctrl+S  → Save          Ctrl+N  → New
Ctrl+O  → Open          Ctrl+Z  → Undo
Ctrl+Y  → Redo          Ctrl+,  → Settings
Escape  → Sluit dialoog/backstage
```

### WEB: Navigatie & Auth

#### 5.4 Routing

```tsx
<Routes>
  <Route element={<Layout />}>           {/* Navbar + Outlet */}
    <Route path="/" element={<Home />} />
    <Route path="/items/:id" element={<Detail />} />
    <Route path="/settings" element={<Settings />} />
  </Route>
</Routes>
```

#### 5.5 Auth context

```tsx
// AuthContext.tsx
- Check URL params voor ?token= (OIDC callback)
- Bewaar JWT in localStorage
- Stuur mee als Authorization: Bearer header
- /auth/login redirect → OIDC provider
- /auth/me → haal user info op
```

#### 5.6 API client

```tsx
// api/client.ts
- Typed fetch wrapper met auth header injection
- ApiError class met status code
- Per-entiteit modules: projects.list(), topics.create(), etc.
```

---

## Fase 6 — i18n (BEIDE PLATFORMS)

### 6.1 Namespace structuur

**Desktop:**
```
src/i18n/locales/{en,nl}/
├── common.json      # App-brede labels
├── ribbon.json      # Ribbon tabs en knoppen
├── backstage.json   # File menu items
├── settings.json    # Instellingen
└── feedback.json    # Feedback (optioneel)
```

**Web:** Vereenvoudigde structuur, kan in één `common.json` per taal of opgesplitst naar behoefte.

### 6.2 Verplichte common.json keys

```json
{
  "appName": "App Naam",
  "save": "Opslaan",
  "cancel": "Annuleren",
  "ok": "OK",
  "close": "Sluiten",
  "delete": "Verwijderen",
  "edit": "Bewerken",
  "loading": "Laden...",
  "error": "Fout",
  "success": "Gelukt",
  "confirm": "Bevestigen",
  "search": "Zoeken...",
  "noResults": "Geen resultaten",
  "preferences": "Voorkeuren"
}
```

---

## Fase 7 — State management

### DESKTOP: Tauri Store

Kopieer `store.ts` uit de template voor persistente voorkeuren:
- `theme` — huidig thema (`light` / `openaec`)
- `language` — taalinstelling
- `showWelcome` — welkomscherm tonen

Thema activeren: `document.documentElement.setAttribute("data-theme", theme)`

### WEB: localStorage + Context

```tsx
// Thema
localStorage.getItem("theme") → document.documentElement.setAttribute("data-theme", theme)

// Auth
localStorage.getItem("bcf_token") → Authorization header

// Preferences
React Context of Zustand store
```

---

## Fase 8 — Productie-hardening

### DESKTOP

1. **DevTools blokkeren** in productie: F12, Ctrl+Shift+I/J/C, Ctrl+U, F5, Ctrl+R
2. **tauri.conf.json**: `decorations: false`, min 800×600
3. **About-panel**: app naam + versie, "Gebouwd op het OpenAEC platform", GitHub link, licentie

### WEB

1. **`<title>`**: App naam, bijv. "OpenAEC BCF Platform"
2. **Favicon**: OpenAEC favicon.svg
3. **Meta tags**: description, viewport
4. **CSP headers**: configureer in reverse proxy
5. **CORS**: restrictief in productie

### BEIDE

- **NOOIT** verwijzen naar 3BM of gelieerde entiteiten
- "OpenAEC" altijd als één woord, capital O, AEC in caps
- Licentie: CC BY-SA 4.0 (of app-specifiek)

---

## Fase 9 — Validatie-checklist

### Visueel (BEIDE)

- [ ] "OpenAEC" correct geschreven (niet "Open AEC" of "OPENAEC")
- [ ] Geen 3BM referenties zichtbaar
- [ ] Amber (#D97706) NOOIT als achtergrondvlak — alleen accent
- [ ] Tekst op donker: blueprint-white (#FAFAF9), nooit amber
- [ ] Tekst op licht: deep-forge (#36363E), nooit amber
- [ ] Contrast minimaal 4.5:1 (WCAG AA)
- [ ] Fonts geladen: Space Grotesk (headings), Inter (body), JetBrains Mono (code)
- [ ] Gradient accent strip aanwezig op navbar/header
- [ ] Cards: wit, 1px #E7E5E4 border, 12px radius
- [ ] Buttons: 8px radius, 600 weight, 0.15s transition
- [ ] Inputs: 1.5px border, amber focus ring
- [ ] Badges: pill-vorm (9999px radius), uppercase, juiste semantische kleuren
- [ ] Geen hardcoded kleurwaarden — alles via design tokens

### Desktop-specifiek

- [ ] TitleBar toont app-naam en versie
- [ ] Ribbon heeft geanimeerde tab-indicator
- [ ] File tab is amber (#D97706)
- [ ] StatusBar toont relevante info
- [ ] Backstage → About toont correcte app-info
- [ ] Window controls (min/max/close) werken
- [ ] Ctrl+S/N/O/Z/Y werken
- [ ] Escape sluit dialogen/backstage
- [ ] Thema wisselen werkt (light ↔ openaec)
- [ ] Alle ribbon knoppen werkend OF disabled met tooltip

### Web-specifiek

- [ ] Navbar: deep-forge (#36363E) achtergrond
- [ ] Brand: "Open" wit + "AEC" amber in navbar
- [ ] Nav links: scaffold-gray idle, amber active
- [ ] Login knop: amber primary button
- [ ] Responsive: hamburger menu op mobile
- [ ] Page tabs: amber bottom-border active state
- [ ] Routes werken (back/forward navigatie)
- [ ] Auth flow: login redirect, token opslag, logout
- [ ] API calls sturen auth header mee
- [ ] Empty states met icon + tekst

### Code (BEIDE)

- [ ] Geen hardcoded kleuren in componenten
- [ ] TypeScript zonder errors
- [ ] Geen ongebruikte imports
- [ ] Geen console.log/alert in handlers

---

## Snelle referentie — Veelgemaakte fouten

| Fout | Oplossing |
|------|-----------|
| Amber als achtergrond | Alleen als accent (buttons, borders, links, icons) |
| `bg-stone-800` hardcoded | Gebruik design token: `bg-deep-forge` (web) of `bg-surface` (desktop bridge) |
| Fonts niet geladen | Check Google Fonts `<link>` in `index.html` |
| "Open AEC" met spatie | Altijd "OpenAEC" als één woord |
| 3BM referentie | Verwijder — dit is een onafhankelijke foundation |
| Thema switcht niet | Desktop: check `data-theme` attribuut. Web: check `@theme` blok |
| Knop doet niets | Verwijder of `disabled` met tooltip "Binnenkort beschikbaar" |
| Mix van NL/EN in UI | Alles via i18n, geen hardcoded strings |
| Web app mist gradient strip | Voeg `linear-gradient(90deg, #D97706, #F59E0B, #EA580C)` border-top toe aan navbar |
| Cards hebben geen border | Altijd `1px solid #E7E5E4`, niet alleen shadow |
| Input focus is blauw (browser default) | Override met amber: `border-color: #D97706; box-shadow: 0 0 0 3px rgba(217,119,6,0.15)` |
| Badge is vierkant | Gebruik `border-radius: 9999px` voor pill-vorm |
| Heading in ALL CAPS | Altijd sentence case, behalve badge-labels |

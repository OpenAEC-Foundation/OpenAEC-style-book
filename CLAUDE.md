# OpenAEC Stijlbook

Brandbook, design system en visuele assets voor de OpenAEC Foundation.

---

## Doel

De volledige visuele identiteit van OpenAEC Foundation beheren en beschikbaar stellen als open-source resource. Eén bron van waarheid voor logo's, kleuren, typografie, illustraties en component-specificaties.

---

## Scope

- [x] Brandbook met missie, visie, tone of voice en huisstijlregels
- [x] Design system met tokens, componenten en layout templates
- [x] Logo varianten (SVG/PNG/PDF) in alle kleurcombinaties
- [x] Illustraties voor headers, banners en achtergronden
- [x] Kleurenpalet referentie (RGB, CMYK, Pantone)
- [x] Asset export tooling (SVG → PNG/PDF)
- [ ] Social media templates
- [ ] Presentatie template
- [ ] Lettertype bestanden (self-hosted)

---

## Belangrijke Bestanden

| Bestand | Doel |
|---------|------|
| `brandbook/BRANDBOOK.md` | Volledige merkrichtlijnen: naam, missie, kleuren, typografie, logo, tone of voice |
| `brandbook/DESIGN-SYSTEM.md` | Machine-readable design tokens, componenten, layout templates, CSS starter |
| `brandbook/styleguide.html` | Visuele referentie (rendered) |
| `brandbook/assets/logo/svg/` | Master vector logo bestanden (bron) |
| `brandbook/assets/illustrations/svg/` | Master vector illustraties (bron) |
| `brandbook/assets/colors/cmyk-reference.md` | CMYK en Pantone referentie voor drukwerk |
| `brandbook/assets/export_assets.py` | Script om PNG/PDF exports te genereren uit SVG |
| `generate_huisstijl_pdfs.py` | Script voor rapport/brief PDF generatie |
| `reports/` | Referentie PDF's (voorblad, briefpapier) |

---

## Notities

- **Schrijfwijze:** Altijd "OpenAEC" als één woord (hoofdletter O, AEC in caps). Nooit "Open AEC" of "OPENAEC"
- **Geen 3BM referenties:** Dit is een onafhankelijke foundation — nooit verwijzen naar 3BM of gelieerde entiteiten
- **Alle fonts open-source:** Space Grotesk (koppen), Inter (body), JetBrains Mono (code) — allemaal SIL OFL
- **Construction Amber (#D97706):** Primaire merkkleur, nooit als achtergrondvlak gebruiken
- **Licentie:** CC BY-SA 4.0
- **GitHub org:** `OpenAEC-Foundation`
- **Repo:** `OpenAEC-Foundation/OpenAEC_stijlbook`

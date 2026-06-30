# Klaro — Energy Savings Estimator

A **product prototype** built as part of a Junior Product Manager application at [Klaro](https://www.klaro.fr).

→ **[View the live prototype](https://anewpriya.github.io/klaro-energie-estimateur/)**  
→ **[Read the full PRD](./PRD.md)**

---

## What it is

A standalone web tool that helps a Klaro user answer one question in under 2 minutes: *"Am I losing money on my energy bill?"*

It covers two distinct angles:

1. **Contract comparison** — estimates the gap between the user's current regulated tariff (TRV EDF, CRE reference June 2026) and competitive market offers, based on their consumption profile.

2. **Chèque énergie eligibility** — automatically checks eligibility against the official 2026 government scale (RFR/UC threshold ≤ €11,000, benefit value €48–277/year), directly aligned with Klaro's anti non-recours mission.

The tool UI is in French because that's the language of the end user. The documentation is in English.

---

## Why this scope

Klaro publicly announced in 2025–2026 an expansion into recurring bill reduction (energy, telecoms, insurance), currently in internal testing. This prototype targets that new product surface rather than the existing employee benefits flow, which is already mature and complex (3,000+ national and local benefits with multi-variable eligibility logic).

Scope was deliberately kept narrow to stay honest: no live supplier API connections, no subscription flow. The goal is the investigation decision — "is it worth looking into my contract?" — not the quote itself.

---

## Tech stack

Zero dependencies. Pure HTML + CSS + vanilla JavaScript, single `index.html` file.

This is a deliberate choice: the product logic (5 inputs, RFR/UC calculation, tariff segmentation) is readable directly in the source without a build environment, framework, or npm. Any developer can read and critique the business logic in 5 minutes.

---

## Repo structure

```
/
├── index.html   # The working prototype (fully standalone)
├── PRD.md       # Product Requirements Document — logic, scope, metrics
└── README.md    # This file
```

---

## Data sources

All figures used in calculations are public and explicitly cited in the PRD and in the tool's source note.

| Data point | Value | Source |
|---|---|---|
| Regulated tariff (Base, 6 kVA) | €0.194/kWh incl. tax | CRE deliberation no. 2026-06 |
| Annual TRV subscription | €187.80 | EDF / CRE, June 2026 |
| Competitive market offer floor | < €0.17/kWh | Selectra / papernest, June 2026 |
| Chèque énergie eligibility threshold | €11,000/UC (reference tax income) | économie.gouv.fr, 2026 scale |
| Chèque énergie benefit value | €48–277/year | économie.gouv.fr, 2026 scale |

---

## Known limitations

- Consumption estimates (kWh/m²) are indicative averages, not individual measurements from the Enedis Datahub API — a v2 integration would improve per-user accuracy significantly.
- Contract savings range is indicative (public market floor), not a personalised real-time quote.
- The chèque énergie eligibility check is accurate against the 2026 official scale, but actual entitlement depends on the tax authority's cross-referencing of fiscal data with the household's PDL.

---

## Disclaimer

This prototype is an independent job application exercise. It does not reproduce any proprietary Klaro assets and uses no internal company data. The visual design is freely inspired by klaro.fr's design direction (palette, typography, tone) for the purpose of demonstrating design empathy.

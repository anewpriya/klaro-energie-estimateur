# Product Requirements Document
## Klaro — Energy Savings Estimator
**Author:** Anupriya Singh  
**Status:** Proof-of-concept prototype  
**Date:** June 2026  
**Version:** 1.0

---

## Product context

Klaro helps French employees access financial benefits they are legally entitled to but never claim — the non-recours problem. In 2025–2026, Klaro expanded its mission beyond workplace perks to include reduction of recurring household bills: energy, telecoms, and insurance.

This prototype targets that new product surface directly. It exists to answer a concrete product question:

> **How can Klaro help a user quickly understand whether their energy bill is optimised — and whether they're receiving every benefit they're entitled to — without replacing a human advisor or acting as a commercial broker?**

---

## User problem

**Persona:** A Klaro app user (an employee at a partner company), renter or homeowner, with an active electricity contract.

**Core problem:** They don't know whether their contract is competitive. They also don't know whether they qualify for the chèque énergie (a French state energy benefit). Both pieces of information are publicly available — but accessing them requires active effort that the majority of people never make.

**Cost of inaction:** The gap between an unoptimised regulated-tariff contract and a competitive market offer can cost a typical household €150–250/year. The chèque énergie, for eligible households, is worth €48–277/year — and goes unclaimed by a meaningful share of people who qualify for it.

---

## Product goal

Enable a Klaro user to answer the question **"Am I losing money on my energy?"** in under 2 minutes — and leave with a clear estimate and two concrete next steps.

What this product is **not**: a real-time price comparison engine, an energy broker, or a subscription flow. Klaro takes no commission — that positioning must be visible in the UX.

---

## Scope — v1 (this prototype)

### In scope

| Feature | Description |
|---|---|
| Consumption estimate | Derived from home size and heating type, for users who don't know their exact kWh figure |
| Regulated tariff comparison | Reference: CRE rate of €0.194/kWh incl. tax, annual subscription €187.80 (June 2026) |
| Potential contract savings range | Based on the gap between the regulated tariff and competitive market offers (< €0.17/kWh) — explicitly labelled as an estimate, not a live quote |
| Chèque énergie eligibility | Computed against the official 2026 government scale (RFR/UC threshold €11,000, benefit value €48–277/year) |
| Combined savings output | Single annual figure, broken down by source |
| Advisor CTA | Handoff to a Klaro advisor, no direct subscription flow |

### Out of scope for v1 (and why)

| Out of scope | Reason |
|---|---|
| Live supplier API integration | Technical and contractual complexity disproportionate to a v1; the value is in the investigation decision, not the exact quote |
| Telecoms and insurance | Same product logic, different comparison rules — a natural v2 extension once the energy module is validated |
| Subscription interface | Contradicts Klaro's positioning (no-commission, advisor-led) |
| Enedis consumption history via API | Available via the Datahub Enedis — relevant v2 integration to improve accuracy |

---

## Business logic — what the prototype calculates

### Step 1: Consumption estimate

If the user doesn't know their exact kWh figure:

```
Estimated consumption = floor area (m²) × kWh/m²
  Electric heating  → 130 kWh/m²/year
  Gas heating       → 70 kWh/m²/year
  Other / district  → 90 kWh/m²/year
```

These ratios are indicative averages for French residential housing. In production, they would be refined using real consumption data from Klaro's user base or an Enedis API integration.

### Step 2: Estimated bill at the regulated tariff

```
Regulated bill = (consumption × 0.194) + 187.80
```

Source: CRE deliberation no. 2026-06, tariff in effect until 1 August 2026.

### Step 3: Potential contract savings

```
Contract savings = Regulated bill − (consumption × 0.17 + 187.80)
```

The €0.17/kWh rate represents the lower end of competitive market offers available in June 2026 (source: Selectra / papernest comparators). Displayed as an indicative range, not a guaranteed price.

This calculation is only shown if the user is currently on the regulated tariff. Users already on a market offer are directed toward a contract review instead.

### Step 4: Chèque énergie eligibility

```
UC = 1 (1st person) + 0.5 (2nd person) + 0.3 × (additional persons)
RFR/UC = Household reference tax income ÷ UC

If RFR/UC ≤ €5,700   → chèque énergie: €277
If RFR/UC ≤ €7,850   → chèque énergie: €194
If RFR/UC ≤ €11,000  → chèque énergie: €153
If RFR/UC > €11,000  → not eligible
```

Source: économie.gouv.fr, chèque énergie scale 2026.

### Step 5: Total displayed savings

```
Total = contract savings (if applicable) + chèque énergie amount (if eligible)
```

---

## Success metrics — if this were in production

| Metric | Definition | Indicative v1 target |
|---|---|---|
| Flow completion rate | % of users who see a result after starting | > 75% |
| "Savings > 0" detection rate | % of users for whom the estimated gain is positive | To measure (relevance signal) |
| Advisor CTA conversion | % of users with a positive estimate who click "Talk to a Klaro advisor" | > 20% |
| Unclaimed chèque énergie | % of users detected as eligible who had not yet claimed | To measure post-action |

These metrics would be tracked via Metabase and reviewed in sprint rituals.

---

## What this prototype does not claim to be

This prototype uses publicly available reference data and simplified logic. It is not connected to live supplier APIs. Contract savings estimates are indicative, based on publicly available market averages, not the exact tariff conditions of each supplier. The chèque énergie eligibility calculation is accurate against the official 2026 government scale, but actual entitlement depends on the tax authority's cross-referencing of fiscal data with the household's electricity delivery point (PDL).

The goal of this prototype is to demonstrate product thinking, scope judgment, and the ability to connect real public data to a usable interface — not to simulate a production-ready product.

---

## Live prototype

[→ View the working prototype](https://votre-username.github.io/klaro-energie-estimateur/)

---

*Written as part of a job application for the Junior Product Manager role at Klaro (Station F). This project is not affiliated with Klaro and does not use any proprietary assets or internal data belonging to the company.*

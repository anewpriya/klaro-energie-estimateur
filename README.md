# Klaro — Energy Savings Estimator

Independent product prototype created for a Junior Product Manager application. French UI, English documentation.

- [Interactive prototype](https://anewpriya.github.io/klaro-energie-estimateur/)
- [Original June 2026 PRD](PRD.md)

## Scope

Estimate electricity contract savings under a historical tariff scenario and screen for potential chèque énergie eligibility using household tax income and composition. Unknown and market contracts require a real tariff comparison. No live quotes, data collection, application submission or advisor booking.

## Implementation

Standalone HTML, CSS and JavaScript. Open index.html in a browser. Run `node tests/estimate.test.mjs` with Node 22.

The revised estimator includes input validation, household-specific benefit bands, zero-income handling and official service links. The original PRD and screenshot describe the initial version, not the revised implementation.

## Assumptions and limitations

The electricity rates (€0.194 and €0.17/kWh) are historical illustrative assumptions, not current offers. The calculation assumes identical subscription costs. Consumption is estimated from floor area and heating type. Chèque énergie screening uses simplified tax-household composition and 2024 reference income for the 2026 campaign; actual eligibility and prior benefit receipt must be checked through the [official service](https://www.chequeenergie.gouv.fr/). Compare current electricity offers via [Énergie-Info](https://comparateur-offres.energie-info.fr/).

No live user validation or realised savings are claimed. Not affiliated with Klaro.

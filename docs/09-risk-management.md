# Risk Management Plan

## 1. Purpose

This document defines how Jemput Jelantah identifies, assesses, mitigates, and monitors product, operational, technical, data, and business risks throughout MVP development and pilot validation.

The purpose of risk management is not to eliminate uncertainty, but to:

* identify risks before they become blockers
* reduce avoidable execution failures
* protect the validity of pilot results
* define clear mitigation and contingency actions
* support evidence-based product decisions

---

# 2. Risk Management Principles

Jemput Jelantah follows five principles:

### 1. Evidence First

Risks should be evaluated using actual project evidence whenever available.

### 2. Early Detection

Risks should be identified before they affect the MVP or pilot.

### 3. Hypothesis Awareness

Unvalidated assumptions should be treated as risks rather than facts.

### 4. Clear Ownership

Every material risk should have a responsible owner.

### 5. Decision Readiness

High-impact risks should have predefined responses before execution.

---

# 3. Risk Categories

Risks are grouped into six categories.

| Category    | Description                                                         |
| ----------- | ------------------------------------------------------------------- |
| Product     | Risk that the product does not solve the intended user problem      |
| Market      | Risk related to target segment, adoption, or demand                 |
| Operational | Risk related to collection, scheduling, routes, and field execution |
| Technical   | Risk related to MVP functionality and system reliability            |
| Data        | Risk that data is incomplete, inaccurate, or misinterpreted         |
| Business    | Risk related to pricing, payout, route economics, and scalability   |

---

# 4. Risk Scoring

Risk priority is assessed using:

> **Risk Score = Impact × Likelihood**

Each dimension uses a 1–5 scale.

## Impact

| Score | Definition         |
| ----: | ------------------ |
|     1 | Minimal impact     |
|     2 | Limited impact     |
|     3 | Moderate impact    |
|     4 | Significant impact |
|     5 | Critical impact    |

## Likelihood

| Score | Definition  |
| ----: | ----------- |
|     1 | Rare        |
|     2 | Unlikely    |
|     3 | Possible    |
|     4 | Likely      |
|     5 | Very likely |

## Risk Level

| Score | Level    | Response                      |
| ----: | -------- | ----------------------------- |
|   1–4 | Low      | Monitor                       |
|   5–9 | Medium   | Mitigate                      |
| 10–16 | High     | Active mitigation             |
| 17–25 | Critical | Immediate action / escalation |

The score is a project-management prioritization tool and does not represent measured probability.

---

# 5. Product & Market Risks

## R01 — The Core Problem May Not Be Strong Enough

**Category:** Product
**Impact:** 5
**Likelihood:** 3
**Risk Level:** High

### Description

The product assumes that fragmented UCO supply is a meaningful operational problem for the initial target segments.

Current research supports the existence of relevant pain points, but the research sample is limited.

### Evidence Status

**Partially validated**

Current evidence:

* 15 survey respondents
* 3 user interviews
* 2 household participants
* 1 culinary micro-UMKM participant

### Mitigation

* continue collecting qualitative feedback
* validate behavior during pilot
* compare stated interest with actual contribution behavior

### Trigger

Users show low participation or do not consistently contribute UCO despite having the problem.

### Contingency

Reassess:

* target segment
* problem framing
* collection mechanism
* value proposition

---

# 6. R02 — Target Segment May Not Generate Sufficient Volume

**Category:** Market / Operational
**Impact:** 5
**Likelihood:** 4
**Risk Level:** Critical

### Description

Households generally contribute smaller individual volumes, while culinary micro-UMKM may provide higher recurring volumes.

The current positioning therefore assumes that micro-UMKM can act as potential route anchors while nearby households densify the route.

This is a product hypothesis, not a validated operational result.

### Mitigation

* identify high-volume micro-UMKM
* cluster nearby household suppliers
* monitor estimated and actual contribution
* prioritize geographically dense areas

### Trigger

Routes repeatedly fail to approach the internal 50L operating threshold.

### Contingency

Test:

* different supplier mix
* smaller collection radius
* different pickup windows
* alternative route thresholds

---

# 7. R03 — Supplier Interest Does Not Translate Into Actual Participation

**Category:** Market
**Impact:** 4
**Likelihood:** 3
**Risk Level:** High

### Description

Survey interest measures stated intention and may not represent actual behavior.

### Current Evidence

The survey provides evidence of interest, but actual repeat collection behavior has not yet been established.

### Mitigation

Track:

* pickup request creation
* scheduled pickup participation
* completed pickup
* actual volume
* repeat contribution

### Trigger

High stated interest but low actual pickup participation.

### Contingency

Investigate friction in:

* scheduling
* minimum volume
* pickup timing
* payout transparency
* perceived convenience

---

# 8. R04 — Household Supply Is Too Fragmented

**Category:** Operational
**Impact:** 5
**Likelihood:** 4
**Risk Level:** Critical

### Description

Household suppliers may contribute relatively small volumes, making individual pickups inefficient.

### Mitigation

Use an aggregation model:

> **Micro-UMKM Anchor + Nearby Household Densifiers**

Instead of treating each supplier as an independent pickup destination.

### Trigger

High number of suppliers but insufficient liters per route.

### Contingency

* reduce collection radius
* group suppliers into scheduled windows
* focus on denser neighborhoods
* adjust supplier eligibility criteria

---

# 9. R05 — Route Volume Remains Below the Internal Threshold

**Category:** Operational
**Impact:** 5
**Likelihood:** 4
**Risk Level:** Critical

### Description

The MVP uses **50L as an internal pilot operating threshold**.

This threshold is a project assumption used to test route aggregation. It is not an external industry benchmark and is not presented as proven break-even.

### Mitigation

* monitor route volume continuously
* aggregate suppliers by area
* prioritize anchor suppliers
* invite nearby suppliers
* evaluate pickup windows

### Trigger

A route remains below 50L at the planned dispatch decision point.

### Contingency

The route can remain in a waiting state while additional suppliers are aggregated.

If the pattern persists across pilot observations, reassess the threshold and route design.

---

# 10. R06 — Pickup Requests Are Geographically Scattered

**Category:** Operational
**Impact:** 5
**Likelihood:** 4
**Risk Level:** Critical

### Description

A large geographic spread can reduce route efficiency even when total supplier volume is sufficient.

### Mitigation

* define pilot area
* group suppliers by area
* prioritize dense zones
* use scheduled pickup windows

### Trigger

Supplier volume is sufficient but requires excessive travel distance.

### Contingency

Restrict active pickup zones until route density improves.

---

# 11. R07 — Estimated Volume Differs Significantly From Actual Volume

**Category:** Data / Operational
**Impact:** 4
**Likelihood:** 3
**Risk Level:** High

### Description

Supplier estimates may differ from the actual volume measured during collection.

### Mitigation

Track both:

> Estimated Volume → Actual Volume

Calculate estimation variance after pickup.

### Metric

```text
Volume Variance %
=
|Actual Volume - Estimated Volume|
÷ Estimated Volume × 100
```

### Trigger

Repeated high variance across suppliers.

### Contingency

Improve:

* volume input guidance
* supplier estimation method
* historical volume tracking

---

# 12. R08 — UCO Price Changes Affect Payout Economics

**Category:** Business
**Impact:** 5
**Likelihood:** 4
**Risk Level:** Critical

### Description

UCO pricing may change over time, affecting supplier payout and potential route economics.

### Mitigation

Maintain a pricing reference containing:

* effective date
* reference price
* supplier payout
* source
* active status

### Trigger

Reference pricing changes materially.

### Contingency

Recalculate:

* supplier payout
* buyer price assumption
* contribution margin
* route economics

---

# 13. R09 — Supplier Distrusts Weighing or Payout

**Category:** Product / Trust
**Impact:** 4
**Likelihood:** 3
**Risk Level:** High

### Description

Suppliers may question whether the final payout accurately reflects their collected UCO.

### Mitigation

Display:

* actual volume
* payout per liter
* total payout
* transaction status

### Trigger

Supplier questions or disputes transaction results.

### Contingency

Introduce stronger transaction evidence:

* weighing timestamp
* request ID
* operator record
* transaction history

---

# 14. Technical Risks

## R10 — Data Integration Failure

**Category:** Technical
**Impact:** 5
**Likelihood:** 3
**Risk Level:** High

### Description

The MVP relies on Google Apps Script and Google Sheets for application logic and data storage.

A failure in integration may affect:

* supplier records
* pickup requests
* route aggregation
* weighing
* payout

### Mitigation

* validate sheet structure
* use consistent IDs
* validate inputs
* test CRUD operations
* maintain test cases

### Trigger

Frontend and backend data become inconsistent.

### Contingency

Investigate the failing function and restore the last known working implementation.

---

# 15. R11 — Duplicate Weighing or Payout

**Category:** Technical / Business
**Impact:** 5
**Likelihood:** 2
**Risk Level:** High

### Description

A pickup request could accidentally receive multiple weighing or payout records.

### Mitigation

Use:

* unique request ID
* duplicate validation
* request status checks
* transaction validation

### Trigger

More than one weighing record exists for the same completed request.

### Contingency

Block duplicate transaction creation and flag the record for manual review.

---

# 16. R12 — Incorrect Route Threshold Calculation

**Category:** Technical
**Impact:** 5
**Likelihood:** 2
**Risk Level:** High

### Description

Incorrect aggregation logic could incorrectly classify a route as ready or not ready.

### Mitigation

Test:

* below threshold
* exactly at threshold
* above threshold
* multiple suppliers
* cancelled requests

### Example

```text
49.9L → Not Ready
50.0L → Ready
50.1L → Ready
```

### Trigger

Displayed route status does not match calculated volume.

### Contingency

Stop route dispatch logic and correct the aggregation calculation before pilot execution.

---

# 17. R13 — Data Quality Issues

**Category:** Data
**Impact:** 4
**Likelihood:** 3
**Risk Level:** High

### Description

Incomplete or inconsistent data can invalidate product metrics.

Potential issues:

* missing supplier phone
* invalid volume
* duplicate request
* missing actual volume
* inconsistent route status
* missing pricing reference

### Mitigation

Implement:

* required fields
* input validation
* unique identifiers
* status validation
* duplicate checks

### Trigger

Metric calculation requires manual correction.

### Contingency

Quarantine invalid records and correct them before analysis.

---

# 18. R14 — Pilot Data Is Insufficient for a Strong Conclusion

**Category:** Data / Research
**Impact:** 5
**Likelihood:** 4
**Risk Level:** Critical

### Description

A small or short pilot may not generate enough evidence to determine whether the aggregation model is consistently viable.

### Mitigation

Define required measurements before the pilot.

Track:

* suppliers per route
* estimated liters
* actual liters
* route status
* pickup completion
* payout
* repeat contribution
* operational notes

### Trigger

Pilot data is too limited or inconsistent to evaluate the hypothesis.

### Contingency

Run another validation cycle rather than treating insufficient evidence as confirmation.

---

# 19. R15 — Premature Geographic Expansion

**Category:** Business / Operational
**Impact:** 5
**Likelihood:** 3
**Risk Level:** High

### Description

Expanding beyond the initial pilot area before route density and economics are understood can increase operational complexity.

### Mitigation

Use a validation gate before expansion.

Expansion should require evidence regarding:

* route density
* supplier consistency
* operational feasibility
* route economics

### Trigger

Pressure to expand without sufficient pilot evidence.

### Contingency

Maintain the current pilot area and continue validation.

---

# 20. Risk Heatmap

| Impact \ Likelihood |  1 |  2 |  3 |  4 |  5 |
| ------------------- | -: | -: | -: | -: | -: |
| 5 — Critical        |  M |  H |  H |  C |  C |
| 4 — Significant     |  M |  M |  H |  H |  C |
| 3 — Moderate        |  L |  M |  M |  H |  H |
| 2 — Limited         |  L |  L |  M |  M |  H |
| 1 — Minimal         |  L |  L |  L |  M |  M |

**L = Low**
**M = Medium**
**H = High**
**C = Critical**

The heatmap is used to prioritize management attention, not to claim statistically measured risk probabilities.

---

# 21. Top Risks Requiring Active Monitoring

The following risks have the strongest potential to affect the core product hypothesis:

1. insufficient route volume
2. fragmented household supply
3. geographically scattered requests
4. changing UCO pricing
5. insufficient pilot data

These risks are directly connected to the central mechanism:

> **Fragmented Supply → Aggregated Volume → Route Efficiency → Verified Payout**

---

# 22. Risk Monitoring Metrics

| Risk Area              | Metric                                |
| ---------------------- | ------------------------------------- |
| Route Density          | Actual liters per route               |
| Supply Fragmentation   | Suppliers per route                   |
| Estimation Accuracy    | Estimated vs actual volume variance   |
| Pickup Reliability     | Completed scheduled pickups           |
| Supplier Retention     | Repeat pickup contribution            |
| Pricing                | Active payout reference               |
| Transaction Integrity  | Duplicate transaction rate            |
| Data Quality           | Invalid / incomplete records          |
| Operational Efficiency | Route distance / time where available |

These metrics should be interpreted using actual pilot data once available.

---

# 23. Risk Escalation Rules

## Immediate Escalation

Escalate when:

* payout calculation is incorrect
* duplicate payout occurs
* critical data is lost
* route calculation is incorrect
* pilot cannot be measured reliably

## Product Review

Escalate to product strategy review when:

* route volume repeatedly fails to approach the threshold
* supplier participation is materially below expectations
* geographic concentration is insufficient
* user behavior contradicts the core hypothesis

## Business Review

Escalate to business review when:

* payout economics are materially different from assumptions
* route-related variable costs are higher than expected
* pricing changes materially affect the operating model

---

# 24. Risk Review Cadence

### During Discovery

Review:

* problem assumptions
* target segment assumptions
* research gaps

### During Development

Review:

* technical risks
* scope risks
* data risks

### Before Pilot

Review:

* operational risks
* transaction risks
* measurement readiness

### During Pilot

Review:

* route density
* supplier behavior
* operational incidents
* data quality

### After Pilot

Review:

* hypothesis outcome
* route economics
* repeatability
* remaining risks

---

# 25. Risk Ownership

The Product Manager coordinates the overall risk register.

Operational risks are reviewed with the Operations / Route Coordinator.

Technical risks are reviewed with the development owner.

Data and experiment risks are reviewed with the QA / Data Analyst.

The objective is to ensure that each risk has both a mitigation owner and a clear escalation path.

---

# 26. Risk vs. Assumption

Not every unknown is a confirmed problem.

The project distinguishes:

### Assumption

Something believed to be true but not yet validated.

Example:

> Nearby households can densify routes around culinary micro-UMKM anchors.

### Risk

An assumption that could negatively affect the project if it proves false.

Example:

> Household contribution may remain too small to materially improve route density.

### Evidence

Observed data that supports or challenges the assumption.

Example:

> Actual liters contributed during pilot routes.

This distinction prevents assumptions from being presented as facts.

---

# 27. Risk Management Decision Logic

```text
IDENTIFY RISK
      ↓
ASSESS IMPACT & LIKELIHOOD
      ↓
DEFINE MITIGATION
      ↓
DEFINE TRIGGER
      ↓
MONITOR
      ↓
┌─────────────────────┐
│ Risk Materializes?  │
└──────────┬──────────┘
           │
       ┌───┴───┐
      NO      YES
       │        │
    Monitor   Execute
              Contingency
                 ↓
            Reassess Product
                 ↓
              Decision
```

---

# 28. Evidence Integrity

Risk management must follow the same evidence standard as the rest of the project.

Current research evidence consists of:

* 15 survey respondents
* 3 user interviews

Any future pilot data must be explicitly recorded as actual observations after execution.

Illustrative or dummy data used in the MVP must not be presented as:

* actual traction
* validated operational performance
* actual experiment results
* proven route economics
* proven business viability

---

# 29. Current Risk Status

At the current MVP stage, the largest unresolved risks are primarily validation risks rather than technical feasibility risks.

The most important unanswered questions are:

1. Can fragmented suppliers consistently form sufficiently dense routes?
2. Can micro-UMKM effectively act as route anchors?
3. Can nearby households materially improve route density?
4. Can scheduled pickup operate reliably?
5. Can payout transparency support supplier trust?
6. Can route economics remain viable after payout and variable operating costs?

These questions should be answered through the next validation cycle rather than assumed from the MVP itself.

---

# 30. Conclusion

The main risk for Jemput Jelantah is not whether a pickup interface can be built.

The central uncertainty is whether fragmented UCO supply can be operationally aggregated into sufficiently dense and repeatable pickup routes.

Therefore, risk management prioritizes:

> **Route Density → Supplier Consistency → Operational Reliability → Transaction Transparency → Route Economics**

The MVP is designed to make these risks measurable before the product expands geographically or increases operational complexity.

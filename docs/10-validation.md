# Product Validation Plan

## 1. Purpose

This document defines how Jemput Jelantah validates its product assumptions, operational model, and core product hypothesis.

The validation framework connects:

> **Research → Insight → Hypothesis → MVP → Experiment → Actual Data → Product Decision**

The purpose is to determine whether the product concept has sufficient evidence to justify iteration, further validation, or future expansion.

---

# 2. Validation Principle

Jemput Jelantah does not treat product assumptions as facts.

The project separates:

* **Observed Evidence**
* **Interpretation**
* **Hypothesis**
* **Product Experiment**
* **Validated Finding**
* **Product Decision**

This distinction prevents assumptions or illustrative MVP data from being presented as validated business results.

---

# 3. Current Evidence Base

The current research evidence consists of:

* **15 survey respondents**
* **3 user interviews**

  * 2 household participants
  * 1 culinary micro-UMKM participant

The research provides directional evidence about:

* UCO handling behavior
* difficulty finding a disposal/selling channel
* price transparency needs
* pickup convenience
* willingness to use scheduled collection

Because the sample is limited, the findings should be treated as **directional rather than representative of the broader population**.

---

# 4. Evidence Hierarchy

The project uses the following evidence hierarchy.

## Level 1 — User Research

Examples:

* survey responses
* interview statements
* observed user pain points

Purpose:

> Understand whether the problem exists.

---

## Level 2 — Product Behavior

Examples:

* pickup requests
* schedule selection
* collection progress views
* completed pickup

Purpose:

> Understand whether users actually interact with the proposed workflow.

---

## Level 3 — Operational Data

Examples:

* actual liters per route
* suppliers per route
* pickup completion
* estimated vs actual volume

Purpose:

> Understand whether the aggregation model works operationally.

---

## Level 4 — Economic Evidence

Examples:

* supplier payout
* route-related costs
* contribution margin
* pricing changes

Purpose:

> Understand whether the operating model may be economically sustainable.

---

## Level 5 — Repeatability

Examples:

* repeat supplier contribution
* recurring route density
* consistent pickup completion

Purpose:

> Understand whether observed performance can be repeated.

---

# 5. Core Product Hypothesis

The central hypothesis is:

> **If nearby household suppliers are aggregated around culinary micro-UMKM anchors, Jemput Jelantah may increase liters per pickup route toward the internal 50L operating threshold without immediately expanding the geographic coverage area.**

This is a **testable hypothesis**, not a validated result.

---

# 6. Supporting Hypotheses

## H1 — Route Aggregation

Nearby suppliers can be consolidated into a sufficiently dense pickup route.

### Measurement

* actual liters per route
* suppliers per route
* route status
* route threshold achievement

---

## H2 — Supplier Convenience

Scheduled pickup and transparent payout can reduce friction for suppliers.

### Measurement

* pickup request completion
* scheduled pickup completion
* user feedback
* transaction-related complaints

---

## H3 — Volume Predictability

Supplier estimated volume can provide a useful basis for route planning.

### Measurement

> Estimated Volume vs Actual Volume

---

## H4 — Supplier Repeatability

Suppliers who complete one pickup may contribute again.

### Measurement

* repeat pickup request
* repeat supplier contribution
* time between pickups

---

## H5 — Operational Economics

Route aggregation may improve route utilization sufficiently to support a viable operating model.

### Measurement

* actual volume
* supplier payout
* route-related variable costs
* revenue assumptions
* contribution margin

This hypothesis requires actual operating cost data before a conclusion can be made.

---

# 7. Validation Questions

The project seeks to answer six core questions.

### VQ1

Can fragmented UCO supply be aggregated into sufficiently dense pickup routes?

### VQ2

Can culinary micro-UMKM function as potential route anchors?

### VQ3

Can nearby households meaningfully densify those routes?

### VQ4

Can scheduled pickup be executed reliably?

### VQ5

Can weighing and payout transparency support supplier trust?

### VQ6

Can the operating model produce acceptable economics?

---

# 8. Validation Matrix

| Question                            | Evidence                    | Metric                 | Validation Method        |
| ----------------------------------- | --------------------------- | ---------------------- | ------------------------ |
| Can routes reach sufficient volume? | Operational data            | Actual L/route         | Route-density pilot      |
| Can UMKM act as anchors?            | Supplier + route data       | Volume contribution    | Segment comparison       |
| Can households densify routes?      | Route composition           | Household contribution | Route analysis           |
| Can scheduled pickup work?          | Pickup records              | Completion rate        | Operational pilot        |
| Is payout transparent?              | Transaction data + feedback | Complaint / issue rate | Post-pickup feedback     |
| Can economics work?                 | Cost + payout data          | Contribution margin    | Route economics analysis |

---

# 9. Validation Method

The validation process follows five stages.

```text id="v8k1pz"
1. DEFINE
   ↓
2. BASELINE
   ↓
3. TEST
   ↓
4. MEASURE
   ↓
5. DECIDE
```

---

# 10. Stage 1 — Define

Before an experiment begins:

* define the hypothesis
* define target population
* define route/area
* define metrics
* define measurement period
* define success criteria
* define required data

This prevents the project from changing the evaluation criteria after seeing the results.

---

# 11. Stage 2 — Establish Baseline

Baseline data should be collected before evaluating improvement.

For route-density validation, baseline should include:

* number of suppliers
* estimated volume
* actual volume
* route area
* pickup window
* route-related operational effort

If no historical baseline exists, the first real pilot observation should be documented as the **initial pilot baseline**, not represented as historical performance.

---

# 12. Stage 3 — Run the Test

The proposed route-density validation tests whether aggregation can improve route volume.

### Example Test Structure

**Control / Initial State**

Suppliers collected without additional aggregation intervention.

**Intervention**

Add nearby suppliers around a potential route anchor within the defined pilot area.

**Measure**

Compare:

* supplier count
* estimated liters
* actual liters
* route readiness
* operational effort

The exact experimental design may be adjusted after pilot feasibility review.

---

# 13. Stage 4 — Measure

The core operational metric is:

## Actual Liters per Route

```text id="a4q6hs"
Actual Liters per Route
=
Σ Actual Volume of Completed Suppliers
```

This is compared against the internal operating threshold:

> **50L**

The 50L threshold is an internal pilot operating assumption.

It is not presented as:

* an industry benchmark
* a regulatory requirement
* a proven break-even point
* a market standard

---

# 14. Route Density Metrics

## Primary Metric

### Actual Liters per Route

Measures the actual volume collected per completed route.

---

## Supporting Metrics

### Suppliers per Route

```text id="q7m1dx"
Total Suppliers on Route
```

### Average Contribution per Supplier

```text id="r4p9vz"
Actual Liters
÷
Completed Suppliers
```

### Estimated vs Actual Variance

```text id="c3n8jw"
|Actual - Estimated|
÷
Estimated × 100
```

### Threshold Achievement

```text id="m6t2ka"
Routes ≥ 50L
÷
Completed Routes × 100
```

---

# 15. Supplier Experience Metrics

The product also measures whether the collection experience is usable and transparent.

## Scheduled Pickup Completion

```text id="u2f5rb"
Completed Scheduled Pickups
÷
Scheduled Pickups × 100
```

## Pickup Request Completion

```text id="j8w4nc"
Completed Requests
÷
Created Requests × 100
```

## Repeat Contribution

```text id="p5d7le"
Suppliers with Repeat Pickup
÷
Suppliers with Completed Pickup × 100
```

These metrics should be evaluated using actual pilot data.

---

# 16. Transparency Metrics

The MVP aims to make the transaction understandable to suppliers.

Track whether the system records:

* actual volume
* payout per liter
* total payout
* pricing reference
* transaction status
* request ID

### Transaction Completeness

```text id="h3s9qa"
Complete Transactions
÷
Completed Transactions × 100
```

A transaction is considered complete when required weighing and payout information is recorded.

---

# 17. Economic Validation

Economic validation should not be inferred from supplier payout alone.

The project should calculate:

### Revenue

```text id="z9x2fk"
Actual Volume × Buyer Price per Liter
```

### Supplier Payout

```text id="e6r3mv"
Actual Volume × Supplier Payout per Liter
```

### Contribution Before Other Costs

```text id="w7k5ct"
Revenue
−
Supplier Payout
```

### Contribution Margin

```text id="s4m8pn"
Contribution
÷
Revenue × 100
```

Additional route-related variable costs should be included when actual operational data becomes available.

---

# 18. Pricing Validation

Pricing should be treated as time-sensitive.

Each pricing record should contain:

* effective date
* reference price
* supplier payout
* source
* active status

The MVP uses a pricing reference mechanism to demonstrate this logic.

The displayed pricing must not automatically be interpreted as a verified live market price unless an external source has actually been integrated and validated.

---

# 19. Data Quality Validation

Before metrics are calculated, data should pass validation checks.

### Required Checks

* unique supplier identifier
* unique pickup request ID
* valid volume
* valid route ID
* valid status
* actual volume recorded after weighing
* payout calculated from actual volume
* no duplicate weighing record
* active pricing reference exists

---

# 20. Data Validation Rules

| Data Element      | Validation                    |
| ----------------- | ----------------------------- |
| Supplier Phone    | Required                      |
| Supplier Type     | Household / UMKM              |
| Estimated Volume  | Greater than 0                |
| Pickup Area       | Required                      |
| Pickup Schedule   | Required                      |
| Request ID        | Unique                        |
| Actual Volume     | Required after weighing       |
| Pricing Reference | Active record required        |
| Payout            | Calculated from actual volume |
| Weighing Record   | Maximum one per request       |

These rules help prevent invalid data from entering the validation analysis.

---

# 21. Experiment Success Criteria

The experiment should evaluate multiple dimensions rather than a single metric.

### Route Density

Evidence that routes can repeatedly move toward the 50L internal threshold.

### Supplier Reliability

Evidence that scheduled pickups can be completed consistently.

### Data Accuracy

Evidence that estimated and actual volume can be tracked reliably.

### Transaction Transparency

Evidence that weighing and payout can be explained and verified.

### Economics

Evidence that route economics can be calculated using actual operating data.

No single metric should independently be interpreted as proof of business viability.

---

# 22. Validation Outcome Framework

After the pilot, each hypothesis receives an evidence status.

## Supported

Observed data is consistent with the hypothesis within the tested scope.

## Partially Supported

Some evidence supports the hypothesis, but important conditions or limitations remain.

## Not Supported

Observed data does not support the hypothesis within the tested scope.

## Inconclusive

Available data is insufficient to determine the outcome.

These statuses describe the evidence; they do not imply that the product is globally validated or invalidated.

---

# 23. Decision Framework

The evidence status is translated into a product action.

```text id="k1r6vx"
PILOT DATA
    ↓
DATA QUALITY CHECK
    ↓
METRIC ANALYSIS
    ↓
HYPOTHESIS STATUS
    ↓
PRODUCT REVIEW
    ↓
NEXT ACTION
```

Possible next actions include:

### Iterate

Change the product or operating model and run another validation cycle.

### Further Validate

Continue collecting evidence because the current sample or pilot is insufficient.

### Evaluate Expansion

Consider geographic expansion only when the relevant operational and economic evidence supports the expansion criteria.

---

# 24. Expansion Gate

Geographic expansion should not be triggered by request volume alone.

Before expansion, review:

* route density
* route consistency
* supplier contribution
* pickup reliability
* transaction accuracy
* route economics
* operational capacity

The decision should be based on evidence from the relevant pilot area and period.

---

# 25. Evidence Interpretation Rules

The project follows these rules:

### Survey ≠ Behavior

Stated willingness does not prove actual participation.

### Interview ≠ Market Size

Three interviews provide qualitative insight but cannot establish population-level demand.

### MVP Usage ≠ Product-Market Fit

Interaction with a prototype does not establish sustainable demand.

### Route Volume ≠ Profitability

High liters per route do not automatically mean the route is economically viable.

### One Pilot ≠ Repeatability

A successful route does not automatically prove the model works consistently.

### Dummy Data ≠ Validation

Illustrative data used to demonstrate the MVP must not be reported as actual operational performance.

---

# 26. Current Validation Status

## Research Validation

**Status: Directionally validated**

Evidence:

* 15 survey responses
* 3 interviews

The research indicates relevant user needs around:

* finding a channel for UCO
* clear selling price
* convenient pickup
* transparent transaction handling

The sample is small and should not be generalized to the entire target market.

---

## Product Validation

**Status: MVP demonstration**

The current MVP demonstrates the intended workflow:

> **COLLECT → SCHEDULE → TRACK → WEIGH → GET PAID**

This demonstrates product functionality, but does not by itself validate operational performance.

---

## Operational Validation

**Status: Not yet validated**

Actual route-density performance requires real pilot execution and actual operational data.

---

## Economic Validation

**Status: Not yet validated**

Actual route economics require real:

* buyer price
* supplier payout
* route-related variable costs
* collected volume

---

## Repeatability Validation

**Status: Not yet validated**

Repeat supplier behavior and recurring route density require longitudinal operational data.

---

# 27. Evidence Chain

The complete product evidence chain is:

```text id="e2c7wm"
15 SURVEYS + 3 INTERVIEWS
          ↓
      USER INSIGHTS
          ↓
    PRODUCT HYPOTHESES
          ↓
          MVP
          ↓
   PROPOSED EXPERIMENT
          ↓
   ACTUAL PILOT DATA
          ↓
   HYPOTHESIS EVALUATION
          ↓
    PRODUCT DECISION
```

At the current stage, the chain is complete through:

> **Research → Insights → Hypotheses → MVP → Proposed Validation**

The **Actual Pilot Data** stage remains to be completed through real-world execution.

---

# 28. Validation Documentation Requirements

Each completed validation cycle should record:

### Context

* date
* location
* route
* supplier segment
* operating conditions

### Hypothesis

* hypothesis ID
* expected behavior
* success criteria

### Data

* supplier count
* estimated volume
* actual volume
* route status
* pickup completion
* payout
* operational costs

### Analysis

* metric results
* variance
* qualitative observations
* unexpected findings

### Decision

* hypothesis status
* product change
* operational change
* next validation step

---

# 29. Validation Log Template

```text id="r8k3yf"
Validation ID:
Date:
Area:
Route:
Hypothesis:

Objective:

Baseline:

Intervention:

Observed Data:

Primary Metric:

Supporting Metrics:

Qualitative Findings:

Data Quality Issues:

Hypothesis Status:
[ ] Supported
[ ] Partially Supported
[ ] Not Supported
[ ] Inconclusive

Decision:

Product Change:

Next Validation:
```

---

# 30. Example of Evidence-Safe Reporting

Instead of:

> "Jemput Jelantah increased route volume by 36.9%."

Use:

> "A route-density experiment is proposed to test whether adding nearby suppliers can increase collected volume per route. The percentage improvement will only be reported after actual pilot execution."

Instead of:

> "The business model is profitable at 50L."

Use:

> "50L is used as an internal pilot operating threshold to evaluate route aggregation. Profitability requires actual revenue, payout, and route-related cost data."

Instead of:

> "Users want scheduled pickup."

Use:

> "In the current survey, 11 of 15 respondents indicated willingness to use scheduled area pickup, while 4 selected 'Maybe'."

---

# 31. Limitations

The current validation has several limitations.

### Small Research Sample

The research consists of 15 survey responses and 3 interviews.

### Limited Segment Coverage

The interview sample includes only:

* 2 household participants
* 1 culinary micro-UMKM participant

### Stated Preference Bias

Survey responses represent stated behavior or intention rather than necessarily observed behavior.

### No Completed Operational Validation Yet

Route density, pickup reliability, repeat behavior, and economics still require actual pilot evidence.

### Geographic Limitation

Initial findings are intended for the Jember pilot context and should not automatically be generalized to other regions.

---

# 32. What the MVP Can and Cannot Validate

| Question                            | MVP Can Demonstrate | Requires Real Pilot           |
| ----------------------------------- | ------------------- | ----------------------------- |
| Can supplier submit pickup request? | Yes                 | No                            |
| Can suppliers be grouped by area?   | Yes                 | No                            |
| Can route volume be calculated?     | Yes                 | No                            |
| Can route threshold logic work?     | Yes                 | No                            |
| Can actual weighing be recorded?    | Yes                 | Operational validation needed |
| Can payout be calculated?           | Yes                 | Economic validation needed    |
| Can routes consistently reach 50L?  | No                  | Yes                           |
| Will suppliers repeat?              | No                  | Yes                           |
| Is route economics viable?          | No                  | Yes                           |
| Is the model scalable?              | No                  | Yes                           |

This distinction is central to the product validation strategy.

---

# 33. Product Learning Loop

Validation is not a final pass/fail stage.

The intended learning loop is:

```text id="p4x8qn"
BUILD
  ↓
MEASURE
  ↓
LEARN
  ↓
ITERATE
  ↓
RETEST
```

Each cycle should reduce uncertainty around:

* supplier behavior
* route density
* operational reliability
* transaction transparency
* economics

---

# 34. Final Validation Principle

The objective of Jemput Jelantah validation is not to prove that the original product idea is correct.

The objective is to determine:

> **What evidence supports the hypothesis, what evidence challenges it, and what should be tested next?**

The product should therefore progress from:

> **Assumption → Evidence → Learning → Decision**

rather than:

> **Assumption → Confirmation**

---

# 35. Conclusion

Jemput Jelantah currently has directional user research evidence and a functional MVP that demonstrates the intended aggregation and collection workflow.

The next critical validation step is real operational testing.

The primary question is:

> **Can fragmented UCO supply from culinary micro-UMKM and nearby households be aggregated into sufficiently dense, repeatable pickup routes while maintaining a transparent supplier experience?**

The answer should be determined through actual pilot data covering:

* route density
* supplier contribution
* pickup reliability
* estimated vs actual volume
* weighing and payout
* repeat behavior
* route economics

Only after these evidence layers are available should the product make a decision about further iteration or geographic expansion.

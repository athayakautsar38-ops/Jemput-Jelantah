# Product Metrics — Jemput Jelantah

## 1. Purpose

This document defines the measurement framework for Jemput Jelantah.

The framework connects product activity with the core product hypothesis:

> **If fragmented UCO supply is aggregated around local supplier clusters, route volume can move toward a sufficiently dense operating level before geographic expansion.**

Metrics are divided into:

1. Success Metrics
2. Feature Metrics
3. Business Metrics
4. Trade-off Metrics
5. Diagnostic Metrics
6. Event Tracking
7. Measurement Rules
8. Decision Framework

---

# 2. Measurement Framework

```text
USER ACTIVITY
     ↓
FEATURE PERFORMANCE
     ↓
ROUTE PERFORMANCE
     ↓
BUSINESS OUTCOME
     ↓
SCALE / ITERATE / STOP DECISION
```

The metric hierarchy prevents the team from treating activity volume alone as product success.

For example:

```text
More Pickup Requests
        ≠
Better Route Economics
```

The product must determine whether additional requests actually improve route density and operational performance.

---

# 3. Success Metrics

## 3.1 Route Volume per Route

**Definition**

Average actual UCO volume collected per completed route.

**Formula**

```text
Total Actual UCO Collected
÷
Number of Completed Routes
```

**Pilot Direction**

```text
Tested Route Baseline → ≥ 50L
```

The 50L value is an internal pilot operating threshold, not an external industry benchmark or proven break-even point.

**Why it matters**

This is the primary metric for testing whether fragmented supplier contributions can be consolidated into sufficiently dense routes.

**Data Source**

`ROUTES` + `WEIGHING_PAYOUT`

---

## 3.2 Route Threshold Achievement Rate

**Definition**

Percentage of completed routes that reach the internal 50L operating threshold.

**Formula**

```text
Routes ≥ 50L
÷
Total Completed Routes
× 100%
```

**Target**

Increase the percentage of routes reaching the threshold during pilot validation.

A fixed final target is intentionally not defined before sufficient pilot data exists.

**Why it matters**

A single successful route does not prove that the aggregation model is repeatable.

---

## 3.3 Pickup Completion Rate

**Definition**

Percentage of scheduled pickup requests that are successfully completed.

**Formula**

```text
Completed Pickup Requests
÷
Scheduled Pickup Requests
× 100%
```

**Target**

≥ 80%

**Why it matters**

Route density alone is insufficient if scheduled pickups cannot be operationally fulfilled.

---

## 3.4 Repeat Contribution Rate

**Definition**

Percentage of suppliers who make another pickup contribution after their first completed contribution within the defined measurement period.

**Formula**

```text
Suppliers With ≥2 Completed Contributions
÷
Suppliers With ≥1 Completed Contribution
× 100%
```

**Target**

Establish baseline during pilot and define an improvement target after sufficient repeat-cycle data is available.

**Why it matters**

The aggregation model requires recurring supply, not only one-time participation.

---

# 4. Feature Metrics

Feature metrics evaluate whether individual product capabilities are functioning correctly.

| Metric                                | Definition                                                     | Target | Data Source               |
| ------------------------------------- | -------------------------------------------------------------- | -----: | ------------------------- |
| Pickup Request Completion             | Requests successfully submitted after starting the flow        |  ≥ 90% | PICKUP_REQUESTS           |
| Route Aggregation Accuracy            | Route volume correctly reflects included supplier estimates    |   100% | ROUTES                    |
| Collection Progress Data Completeness | Progress records containing required fields                    |  ≥ 95% | ROUTES / PICKUP_REQUESTS  |
| Weighing Accuracy                     | Valid weighing records correctly stored and calculated         |   100% | WEIGHING_PAYOUT           |
| Duplicate Weighing Rate               | Weighing records duplicated for the same request               |     0% | WEIGHING_PAYOUT           |
| Payout Calculation Accuracy           | Payout calculation matches actual volume × configured payout/L |   100% | WEIGHING_PAYOUT / PRICING |

These metrics primarily validate product correctness rather than business success.

---

# 5. Business Metrics

Business metrics evaluate whether the product can support a sustainable operating model.

## 5.1 Route Efficiency

**Definition**

Amount of UCO collected relative to route execution effort or capacity.

Possible measurement:

```text
Actual Liters Collected
÷
Route Capacity / Operational Input
```

The exact denominator should be finalized after real pilot operations provide reliable operational data.

**Purpose**

Determine whether aggregation improves operational utilization.

---

## 5.2 Recurring Supply

**Definition**

Volume contributed by suppliers who contribute repeatedly.

Possible measurement:

```text
Volume From Repeat Suppliers
÷
Total Actual Volume
× 100%
```

**Purpose**

Determine whether the product can generate a recurring supply base rather than relying on one-time suppliers.

---

## 5.3 Contribution Margin per Route

**Definition**

Economic contribution generated by a completed route after relevant variable costs.

Illustrative structure:

```text
Route Revenue
− Supplier Payout
− Route-Related Variable Costs
=
Contribution Margin
```

The MVP should not assume that the current pricing reference represents verified market economics.

**Purpose**

Determine whether route density can translate into improved route-level economics.

---

## 5.4 Geographic Scalability

**Definition**

Ability to replicate the operating model across additional areas without materially degrading route density or operational performance.

Potential indicators:

* Route threshold achievement by area
* Liters per route by area
* Pickup completion by area
* Repeat contribution by area
* Route-level contribution margin

**Purpose**

Support the decision of whether to expand beyond the initial pilot area.

---

# 6. Trade-off Metrics

Improving one metric can negatively affect another.

Jemput Jelantah therefore monitors trade-offs explicitly.

| Primary Objective              | Potential Trade-off              |
| ------------------------------ | -------------------------------- |
| Increase route volume          | Longer supplier waiting time     |
| Increase supplier density      | More complex pickup coordination |
| Reach 50L faster               | Lower geographic flexibility     |
| Reduce route frequency         | Longer supplier waiting period   |
| Increase payout attractiveness | Lower contribution margin        |
| Expand pickup coverage         | Lower route density              |
| Increase collection requests   | Higher operational workload      |

The team should avoid optimizing route volume in isolation.

---

# 7. Diagnostic Metrics

Diagnostic metrics help explain why a success metric changes.

### 7.1 Estimated-to-Actual Volume Variance

**Formula**

```text
Actual Volume − Estimated Volume
```

or:

```text
|Actual − Estimated|
÷
Estimated Volume
× 100%
```

**Purpose**

Measure supplier estimation accuracy and improve route planning.

---

### 7.2 Supplier Contribution per Request

**Formula**

```text
Estimated or Actual Volume
÷
Number of Pickup Requests
```

**Purpose**

Understand whether route density is being created by many small contributors or fewer high-volume suppliers.

---

### 7.3 Household Contribution Density

**Definition**

Number or volume of household suppliers contributing around an existing route anchor.

**Purpose**

Test the hypothesis that households can densify routes around culinary micro-UMKM suppliers.

---

### 7.4 Route Waiting Time

**Definition**

Time between route creation/opening and reaching the operating threshold.

```text
Threshold Reached Timestamp
−
Route Open Timestamp
```

**Purpose**

Determine how quickly an area can accumulate sufficient supply.

---

# 8. Event Tracking Plan

The MVP should capture key product events.

| Event                        | Trigger                                   | Key Properties                                            |
| ---------------------------- | ----------------------------------------- | --------------------------------------------------------- |
| `pickup_request_created`     | New request successfully created          | supplier_type, area, estimated_volume                     |
| `pickup_scheduled`           | Request assigned to schedule              | area, schedule, route_id                                  |
| `supplier_added_to_route`    | Supplier included in route                | supplier_type, estimated_volume, route_id                 |
| `collection_progress_viewed` | Supplier views progress                   | route_id, collected_volume, target_volume                 |
| `route_threshold_reached`    | Route reaches ≥50L                        | route_id, estimated_volume                                |
| `pickup_started`             | Route/pickup execution begins             | route_id                                                  |
| `pickup_completed`           | Pickup is completed                       | route_id, request_id                                      |
| `weighing_recorded`          | Actual volume recorded                    | request_id, actual_volume                                 |
| `payout_calculated`          | Supplier payout calculated                | request_id, actual_volume, payout_per_liter, payout_total |
| `repeat_pickup_requested`    | Existing supplier creates another request | supplier_id, area                                         |

---

# 9. Critical Product Event

The most important event for the core product hypothesis is:

```text
route_threshold_reached
```

This event indicates that an aggregated supplier cluster has reached the internal operating threshold.

The event should capture:

```text
route_id
area
schedule
estimated_volume
supplier_count
household_count
umkm_count
timestamp
```

This enables analysis of what supplier composition and area conditions are associated with threshold achievement.

---

# 10. Metric Ownership

| Metric Area             | Primary Owner                     |
| ----------------------- | --------------------------------- |
| Product Success Metrics | Product Manager                   |
| Feature Metrics         | Product Manager + QA/Data Analyst |
| Route Metrics           | Operations + Product Manager      |
| Business Metrics        | Product Manager                   |
| Transaction Accuracy    | Backend + QA/Data Analyst         |
| Supplier Experience     | Product Manager                   |
| Experiment Analysis     | Product Manager + QA/Data Analyst |

The Product Manager owns the interpretation and product decisions, while implementation and data quality are shared with the relevant roles.

---

# 11. Data Sources

The MVP uses Google Sheets as the primary data layer.

| Sheet             | Primary Measurement                          |
| ----------------- | -------------------------------------------- |
| `SUPPLIERS`       | Supplier identity and segment                |
| `PICKUP_REQUESTS` | Requests, estimated volume, status           |
| `ROUTES`          | Area aggregation, route volume, route status |
| `WEIGHING_PAYOUT` | Actual volume and payout                     |
| `PRICING`         | Active pricing reference                     |
| `DASHBOARD`       | Aggregated operational metrics               |
| `VALIDATION`      | Validation and test results                  |

The MVP does not require a separate analytics platform for initial validation.

---

# 12. Measurement Rules

## Rule 1 — Separate Estimated and Actual Data

Estimated volume is used for planning.

Actual weighed volume is used for final transaction calculation.

---

## Rule 2 — Define the Measurement Window

Metrics should always be evaluated against a defined period.

Example:

```text
Pilot Period:
[Start Date] → [End Date]
```

This prevents metrics from different periods from being incorrectly compared.

---

## Rule 3 — Do Not Mix Demo Data With Pilot Data

Illustrative or demo records must not be presented as validated product performance.

If demo data is displayed, it should be explicitly labelled:

```text
Illustrative / Demo Data
```

---

## Rule 4 — Keep Research Evidence Separate From Product Metrics

Survey responses measure stated preferences.

Product metrics measure observed product behavior.

They should not be treated as equivalent evidence.

For example:

```text
100% stated interest
        ≠
100% actual participation
```

---

## Rule 5 — Baseline Before Optimization

Where insufficient historical data exists, the MVP should establish a baseline first.

This applies particularly to:

* Repeat Contribution Rate
* Route Economics
* Geographic Scalability
* Supplier Retention

---

# 13. Metric Interpretation

Metrics should be interpreted together rather than individually.

Example:

```text
Route Volume ↑
        +
Pickup Completion ↓
```

This may indicate that increasing route size creates operational difficulty.

Another example:

```text
Route Volume ↑
        +
Contribution Margin ↓
```

This may indicate that additional volume is being acquired at an uneconomical payout or route cost.

Therefore:

> **A metric movement is a signal for investigation, not automatically a product success or failure.**

---

# 14. Product Decision Framework

Metrics are used to support three possible product directions.

## Iterate

Consider iteration when:

* Routes are not consistently reaching the threshold.
* Supplier participation is present but route density remains insufficient.
* Product friction prevents successful pickup completion.
* Estimated and actual volumes show significant variance.
* Supplier experience issues are identified.

---

## Scale

Consider geographic expansion only when pilot evidence demonstrates that:

* Route density is repeatable.
* Pickup operations can be completed reliably.
* Supplier contributions recur.
* Route economics are sufficiently understood.
* Operational constraints are manageable.

---

## Stop / Pivot

Consider stopping or changing the current approach when:

* Route density remains insufficient despite targeted densification.
* Supplier participation does not translate into completed pickups.
* Recurring supply remains weak.
* Route economics do not support the operating model.
* A critical assumption is invalidated by pilot evidence.

These are decision criteria, not predetermined outcomes.

---

# 15. Metric Hierarchy

The complete measurement system can be summarized as:

```text
                 BUSINESS OUTCOMES
                        │
          ┌─────────────┼─────────────┐
          ↓             ↓             ↓
    Route Efficiency  Recurring   Contribution
                      Supply       Margin
          │
          ↓
     SUCCESS METRICS
          │
    ┌─────┼─────┐
    ↓     ↓     ↓
 Liters  Route  Pickup
 /Route  ≥50L   Completion
          │
          ↓
     FEATURE METRICS
          │
    ┌─────┼─────┐
    ↓     ↓     ↓
 Request Aggregation Weighing
 Accuracy Accuracy   Accuracy
          │
          ↓
     USER / SYSTEM EVENTS
          │
          ↓
    PRODUCT ACTIVITY
```

This hierarchy connects low-level product events to the strategic business hypothesis.

---

# 16. Measurement Limitations

The initial MVP has several measurement limitations:

1. The pilot sample may be too small to establish statistically robust business conclusions.
2. Supplier volume is initially self-reported before actual weighing.
3. Route economics depend on operational cost data that may not yet be available.
4. Repeat contribution requires multiple collection cycles.
5. Geographic scalability cannot be validated from a single pilot area.
6. The 50L threshold is an internal operating assumption and requires validation through pilot data.
7. Pricing references may change over time and should therefore be stored with effective dates and sources.

These limitations should be disclosed when presenting MVP results.

---

# 17. Final Measurement Principle

Jemput Jelantah should not define success as simply:

```text
More Users
More Requests
More Liters
```

Instead, the core measurement question is:

```text
Can fragmented UCO supply
        ↓
be aggregated locally
        ↓
into sufficiently dense routes
        ↓
while maintaining
pickup reliability + transaction transparency
        ↓
and eventually supporting
sustainable route economics?
```

The MVP metrics are therefore designed to validate the **aggregation and route-density hypothesis**, while preventing early activity metrics from being mistaken for proof of business viability.

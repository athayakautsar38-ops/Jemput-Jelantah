# Product Metrics & Measurement Framework

## 1. Overview

Jemput Jelantah measures product success through **route density, collection reliability, supplier transparency, and transaction accuracy**.

The product should not evaluate success based only on the number of pickup requests.

The primary operational question is:

> **Can fragmented UCO supply be aggregated into sufficiently dense pickup routes while maintaining a transparent supplier experience?**

---

# 2. Measurement Philosophy

The measurement framework follows:

> **Research → Hypothesis → MVP → Measurement → Validation → Decision**

Current research provides the initial evidence for the problem and user needs.

The MVP provides the mechanism to collect operational data.

The pilot will provide the actual baseline required to evaluate the product hypotheses.

Therefore, metrics in this document are divided into:

* **Current Research Evidence**
* **Future Pilot Metrics**
* **Product Targets**
* **Trade-off Metrics**

No demo or illustrative data is treated as an actual product performance result.

---

# 3. Evidence Status

## [ACTUAL]

Evidence currently collected:

* 15 survey respondents
* 3 user interviews
* 10 household respondents
* 5 culinary micro-UMKM respondents

## [ILLUSTRATIVE]

Data used to demonstrate the MVP:

* sample suppliers
* sample pickup requests
* sample route volumes
* sample dashboard metrics
* example weighing records
* example payout calculations

## [ASSUMPTION]

Metrics requiring operational validation:

* route-density improvement
* 50L threshold achievement
* pickup completion
* supplier repeat contribution
* route economics

---

# 4. North Star Operational Metric

## Liters per Completed Route

### Definition

> **Total Actual Collected UCO Volume / Number of Completed Routes**

### Why It Matters

The core product proposition is based on aggregating fragmented supply before dispatching a pickup route.

Therefore, actual liters collected per completed route is the most direct measure of whether the aggregation model is producing meaningful route density.

### Baseline

> **Establish actual baseline during the operational pilot.**

There is currently no validated operational baseline being claimed.

### Evaluation Point

> **Evaluate actual route performance against ≥50L internal pilot operating threshold.**

The 50L threshold is an internal operating assumption for the MVP and is not presented as an industry benchmark or proven break-even point.

---

# 5. Metric Hierarchy

```text id="mtr7q2"
NORTH STAR
Liters per Completed Route
        ↓
ROUTE METRICS
Threshold Achievement
Suppliers per Route
Actual Volume per Route
        ↓
SUPPLIER METRICS
Pickup Completion
Repeat Contribution
Progress Engagement
        ↓
TRANSACTION METRICS
Weighing Accuracy
Payout Accuracy
Estimated vs Actual
        ↓
BUSINESS METRICS
Revenue per Route
Supplier Payout Cost
Route Variable Cost
Contribution per Route
```

This hierarchy connects user behavior with operational and business outcomes.

---

# 6. Primary Product Metrics

## 6.1 Liters per Completed Route

### Formula

> Actual Collected Liters ÷ Completed Routes

### Purpose

Measures route density after physical collection.

### Data Source

`WEIGHING_PAYOUT` + `ROUTES`

### Frequency

Per completed route / weekly aggregation.

---

## 6.2 Route Threshold Achievement

### Definition

Percentage of eligible routes reaching the internal 50L operating threshold.

### Formula

> Routes Reaching ≥50L ÷ Eligible Routes × 100%

### Purpose

Measures whether the aggregation mechanism can build sufficiently dense routes.

### Target

> Establish actual baseline → evaluate consistency against ≥50L threshold.

---

## 6.3 Actual Volume per Route

### Definition

Total verified UCO volume collected in a completed route.

### Purpose

Separates actual operational output from supplier estimates.

### Important

This metric must use **actual weighing records**, not estimated supplier volume.

---

# 7. Route Density Metrics

## 7.1 Suppliers per Route

### Formula

> Number of Suppliers Included in Route

### Purpose

Measures how many contributors are required to create route volume.

This can help identify whether routes depend heavily on one supplier or are successfully aggregated across multiple suppliers.

---

## 7.2 Average Supplier Contribution

### Formula

> Actual Collected Volume ÷ Number of Suppliers

### Purpose

Helps understand the contribution profile of different supplier segments.

It can be analyzed separately for:

* culinary micro-UMKM
* households

---

## 7.3 Anchor Contribution

### Definition

Percentage of route volume contributed by the largest or designated anchor supplier.

### Purpose

Helps determine whether the route is genuinely aggregated or overly dependent on a single supplier.

This metric becomes particularly relevant if culinary micro-UMKM are used as route anchors.

---

# 8. Supplier Experience Metrics

## 8.1 Pickup Completion Rate

### Formula

> Completed Pickups ÷ Scheduled Pickups × 100%

### Target

> **≥80%**

### Purpose

Measures operational reliability from the supplier perspective.

This is a product target for future pilot validation, not a current result.

---

## 8.2 Pickup Cancellation Rate

### Formula

> Cancelled Requests ÷ Scheduled Requests × 100%

### Purpose

Identifies friction in the pickup process.

Potential causes:

* waiting too long
* schedule mismatch
* insufficient route volume
* supplier changed availability
* operational failure

---

## 8.3 Status Visibility

### Definition

Percentage of pickup requests that have a trackable status.

### Target

> **≥90%**

### Purpose

Measures whether suppliers can understand the state of their pickup request.

---

## 8.4 Collection Progress Engagement

### Definition

Number or percentage of active suppliers who view collection progress.

### Event

`collection_progress_viewed`

### Purpose

Measures whether the aggregation-progress feature is actually used.

Usage alone should not be interpreted as proof of increased retention or satisfaction.

---

# 9. Estimation Accuracy

## Estimated vs Actual Volume

Suppliers provide estimated volume before pickup.

Operators record actual volume after weighing.

The difference provides an important operational measurement.

### Formula

> **Estimation Accuracy = Actual Volume ÷ Estimated Volume × 100%**

### Example

| Metric    | Illustrative Value |
| --------- | -----------------: |
| Estimated |                 8L |
| Actual    |               7.5L |
| Accuracy  |             93.75% |

This is an **illustrative example**, not actual pilot data.

### Why It Matters

Large estimation errors can affect:

* route planning
* threshold calculations
* pickup expectations
* supplier communication

---

# 10. Supplier Repeat Contribution

## Definition

Percentage of suppliers who submit another pickup request after completing a previous collection.

### Formula

> Suppliers with Repeat Request ÷ Eligible Completed Suppliers × 100%

### Current Baseline

> **Not yet established.**

A repeat target should be set after observing actual pilot behavior.

### Event

`repeat_pickup_requested`

---

# 11. Transaction Metrics

## 11.1 Payout Accuracy

### Definition

Percentage of completed transactions where the system calculation matches the verified payout formula.

### Formula

> Correct Payout Calculations ÷ Completed Payout Transactions × 100%

### Target

> **100%**

---

## 11.2 Weighing Completion Rate

### Formula

> Requests with Valid Weighing Records ÷ Completed Pickups × 100%

### Target

> **100%**

Every completed pickup should have a corresponding actual volume record.

---

## 11.3 Duplicate Transaction Rate

### Definition

Percentage of requests receiving more than one weighing/payout record.

### Target

> **0%**

This protects transaction integrity.

---

# 12. Pricing Metrics

The MVP stores:

* reference buyer price/L
* supplier payout/L
* effective date
* source

These values should be traceable to a specific pricing configuration.

### Pricing Reference Integrity

> Percentage of payout transactions linked to a valid active pricing reference.

### Target

> **100%**

This ensures the payout calculation is auditable.

---

# 13. Business Metrics

Business metrics should only be calculated after actual commercial and operational data becomes available.

## 13.1 Revenue per Route

### Formula

> Actual Collected Volume × Buyer Price/L

---

## 13.2 Supplier Payout Cost

### Formula

> Actual Collected Volume × Supplier Payout/L

---

## 13.3 Route Variable Cost

Potential components:

* fuel
* transportation
* collection labor
* handling
* other route-specific operating costs

---

## 13.4 Contribution per Route

### Formula

> Revenue − Supplier Payout Cost − Route Variable Costs

This is required before making claims about route-level economic viability.

---

## 13.5 Contribution Margin

### Formula

> Contribution ÷ Revenue × 100%

This should only be calculated using actual transaction and route-cost data.

---

# 14. Metric Tree

```text id="q5r3vb"
PRODUCT OBJECTIVE
Validate UCO aggregation model
            │
            ▼
ROUTE DENSITY
            │
    ┌───────┼────────┐
    ▼       ▼        ▼
Liters/   Suppliers  Threshold
Route     /Route     Achievement
    │
    ▼
OPERATIONAL RELIABILITY
    │
    ├── Pickup Completion
    ├── Cancellation
    └── Est. vs Actual
    │
    ▼
SUPPLIER EXPERIENCE
    │
    ├── Status Visibility
    ├── Progress Usage
    └── Repeat Contribution
    │
    ▼
TRANSACTION INTEGRITY
    │
    ├── Weighing Accuracy
    ├── Payout Accuracy
    └── Pricing Traceability
    │
    ▼
BUSINESS VALIDATION
    │
    ├── Revenue/Route
    ├── Route Cost
    └── Contribution/Route
```

---

# 15. Success Metrics

## Product Success

### Route Density

The pilot establishes a real route-density baseline and evaluates whether routes can consistently reach or approach the 50L internal threshold.

### Pickup Reliability

> ≥80% scheduled pickup completion.

### Status Transparency

> ≥90% pickup requests have trackable status.

### Transaction Integrity

> 100% of completed pickups have valid weighing and payout records.

### Pricing Traceability

> 100% of payout calculations reference an active pricing configuration.

---

# 16. Trade-Off Metrics

The product should not optimize route volume at the expense of supplier experience or operational quality.

Therefore, the following must be monitored alongside route density:

| Metric              | Risk                                               |
| ------------------- | -------------------------------------------------- |
| Waiting Time        | Higher route density may delay pickup              |
| Cancellation Rate   | Delays may reduce participation                    |
| Estimation Variance | Optimistic estimates may distort route planning    |
| Supplier Complaints | Operational friction                               |
| Missed Pickup       | Poor reliability                                   |
| Payout Discrepancy  | Loss of trust                                      |
| Route Distance      | Higher density should not require excessive travel |

---

# 17. Guardrail Metrics

The following metrics act as operational guardrails.

### Payout Accuracy

Target:

> 100%

### Duplicate Weighing

Target:

> 0%

### Missing Weighing Record

Target:

> 0%

### Missing Request ID

Target:

> 0%

### Missing Pricing Reference

Target:

> 0%

These metrics protect the integrity of the operational workflow.

---

# 18. Funnel Metrics

The supplier funnel is:

```text id="f9e5c1"
VISIT HOME
   ↓
START COLLECTION
   ↓
SELECT TYPE
   ↓
INPUT VOLUME
   ↓
SELECT AREA
   ↓
SELECT SCHEDULE
   ↓
CREATE REQUEST
   ↓
JOIN ROUTE
   ↓
ROUTE READY
   ↓
PICKUP COMPLETED
   ↓
WEIGHING
   ↓
PAYOUT
   ↓
REPEAT REQUEST
```

Each stage can be measured to identify where users or operational processes drop off.

---

# 19. Core Analytics Events

| Event                        | Metric Supported        |
| ---------------------------- | ----------------------- |
| `pickup_request_created`     | Request volume          |
| `supplier_added_to_route`    | Supplier aggregation    |
| `collection_progress_viewed` | Transparency engagement |
| `route_threshold_reached`    | Threshold achievement   |
| `pickup_started`             | Operational execution   |
| `pickup_completed`           | Completion rate         |
| `weighing_recorded`          | Transaction completion  |
| `payout_calculated`          | Payout processing       |
| `repeat_pickup_requested`    | Repeat contribution     |

### Critical Event

> **`route_threshold_reached`**

This is the key event connecting supplier participation to the core aggregation hypothesis.

---

# 20. Data Sources

| Metric Area     | Primary Data Source    |
| --------------- | ---------------------- |
| Supplier        | `SUPPLIERS`            |
| Pickup Requests | `PICKUP_REQUESTS`      |
| Route           | `ROUTES`               |
| Weighing        | `WEIGHING_PAYOUT`      |
| Pricing         | `PRICING`              |
| Validation      | `VALIDATION`           |
| Dashboard       | Aggregated system data |

---

# 21. Measurement Frequency

### Real-Time / Transaction Level

* pickup status
* route volume
* weighing
* payout

### Daily

* pickup requests
* route progress
* completed pickups
* operational issues

### Weekly

* liters per route
* threshold achievement
* supplier contribution
* completion rate
* estimation accuracy
* repeat contribution

### End of Pilot

* route economics
* operational constraints
* supplier experience
* hypothesis validation
* scale decision

---

# 22. Pilot Measurement Template

The operational pilot should record:

| Metric                | Baseline |                Target | Actual | Status |
| --------------------- | -------: | --------------------: | -----: | ------ |
| Liters / Route        |      TBD | ≥50L evaluation point |    TBD | TBD    |
| Threshold Achievement |      TBD |                   TBD |    TBD | TBD    |
| Pickup Completion     |      TBD |                  ≥80% |    TBD | TBD    |
| Status Visibility     |      TBD |                  ≥90% |    TBD | TBD    |
| Repeat Contribution   |      TBD |                   TBD |    TBD | TBD    |
| Payout Accuracy       |      TBD |                  100% |    TBD | TBD    |

`TBD` is intentional because the operational baseline has not yet been collected.

---

# 23. Experiment Measurement

The route-density experiment should compare actual operational data rather than relying on demo values.

### Required Measurements

**Before / Baseline**

* current supplier contribution
* current route volume
* supplier count
* estimated volume

**After Intervention**

* supplier count
* estimated volume
* actual volume
* route threshold achievement
* route completion
* operational cost

### Primary Comparison

> **Actual Liters per Route Before vs After Aggregation Intervention**

The exact baseline must be established from real operational observations.

---

# 24. Route-Density Validation

The core validation question is:

> **Does adding nearby suppliers around a route anchor increase route volume enough to improve route density?**

Potential intervention:

**Micro-UMKM Anchor + Nearby Household Densification**

Measure:

1. Number of suppliers
2. Estimated volume
3. Actual collected volume
4. Liters per route
5. Distance / route effort
6. Pickup completion
7. Repeat contribution

The experiment result should only be documented after real execution.

---

# 25. Decision Thresholds

The metrics are intended to support product decisions rather than simply report activity.

### If Route Density Improves

Investigate:

* repeatability
* route costs
* supplier consistency
* operational capacity

### If Route Density Does Not Improve

Investigate:

* supplier density
* collection radius
* anchor selection
* schedule configuration
* minimum route threshold
* supplier contribution consistency

### If Route Density Improves but Economics Do Not

Investigate:

* payout structure
* route cost
* buyer price
* collection frequency
* route distance

This prevents the product team from treating higher volume as automatically equivalent to business viability.

---

# 26. Scale Decision Inputs

Geographic expansion should only be considered after reviewing:

### Operational

* route-density consistency
* pickup reliability
* route distance
* supplier contribution consistency

### Supplier

* repeat contribution
* cancellation
* satisfaction/feedback
* payout transparency

### Economic

* buyer price
* supplier payout
* route variable cost
* contribution per route

### Product

* system reliability
* data integrity
* workflow completion
* operational usability

The scale decision should be based on actual pilot evidence.

---

# 27. Current Measurement Status

### Already Available

**Research evidence**

* 15 survey responses
* 3 interviews

**MVP capability**

* supplier records
* pickup requests
* route aggregation
* route threshold logic
* weighing
* payout calculation
* pricing reference
* dashboard

### Not Yet Validated

* actual liters per route
* actual route-density improvement
* repeatability of 50L threshold
* actual route economics
* sustainable supplier repeat behavior
* geographic expansion feasibility

---

# 28. Evidence Integrity Rule

> **A metric is not an outcome until it is measured from the relevant real-world population and period.**

Therefore:

**Demo Data ≠ Pilot Data**

**Illustrative Calculation ≠ Business Result**

**Product Target ≠ Achievement**

**Hypothesis ≠ Validation**

This principle applies to all portfolio claims.

---

# 29. Final Measurement Framework

The complete measurement chain is:

```text id="z2r7km"
USER CONTRIBUTION
       ↓
SUPPLIER AGGREGATION
       ↓
ROUTE VOLUME
       ↓
50L THRESHOLD
       ↓
ACTUAL COLLECTION
       ↓
WEIGHING
       ↓
PAYOUT
       ↓
ROUTE ECONOMICS
       ↓
REPEATABILITY
       ↓
SCALE DECISION
```

The purpose of the MVP is to generate the evidence needed to evaluate this chain.

The current project has evidence for the **problem discovery stage**, but operational metrics remain to be validated through real pickup activity.

---

# 30. Conclusion

Jemput Jelantah measures success through the quality and density of collected supply rather than request volume alone.

The primary metric is **actual liters per completed route**, evaluated against the **50L internal pilot operating threshold**.

Supporting metrics measure:

* route threshold achievement
* supplier contribution
* pickup reliability
* estimation accuracy
* repeat contribution
* weighing and payout accuracy
* pricing traceability
* route economics

Current research provides the initial problem evidence, while the operational pilot is required to establish actual baselines and validate the route-density hypothesis.

The resulting measurement framework enables the product team to make the next decision based on evidence:

> **Iterate → Validate Economics → Assess Repeatability → Consider Expansion**

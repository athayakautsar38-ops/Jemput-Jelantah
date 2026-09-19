# Product Requirements Document (PRD)

## 1. Product Documentation

**Product:** Jemput Jelantah
**Product Type:** UCO Aggregation & Scheduled Pickup Platform
**Initial Pilot Area:** Jember, East Java
**Primary Users:** Culinary micro-UMKM and households
**Product Stage:** MVP
**Document Status:** Product Definition & Validation
**Owner:** Product Manager

---

# 2. Background

## 2.1 Background

Used cooking oil (UCO) is generated across households and culinary businesses, but supply is fragmented across many small contributors.

For collection operators, fragmented supply can create inefficient pickup patterns when individual suppliers are handled separately.

Jemput Jelantah is designed to aggregate nearby UCO suppliers before pickup routes are dispatched.

The product focuses on:

> **Fragmented Supply → Aggregated Volume → Route Efficiency → Verified Payout**

The initial MVP is designed to validate this aggregation model within a focused pilot area before considering geographic expansion.

---

# 3. Problem Statement

> **How might we aggregate fragmented UCO supply from households and culinary micro-UMKM into sufficiently dense pickup routes while maintaining a convenient and transparent supplier experience?**

The problem has three connected dimensions:

### 1. Fragmented Supply

UCO is distributed across many small suppliers.

### 2. Uneven Supplier Contribution

Individual suppliers may contribute different amounts of UCO, making individual pickup requests difficult to consolidate efficiently.

### 3. Route Density

Without sufficient aggregated volume within a route, collection operations may become less efficient.

Therefore:

> **Fragmented Supply → Uneven Contribution → Insufficient Route Density → Route Economics Risk**

---

# 4. Research Evidence

Current discovery research consists of:

* **15 survey respondents**
* **3 user interviews**

  * 2 household users
  * 1 culinary micro-UMKM user

### Key Findings

| Finding                                            | Evidence                    |
| -------------------------------------------------- | --------------------------- |
| Direct pickup is relevant to respondents           | 15/15 rated interest at 4–5 |
| Scheduled area pickup has acceptance               | 11/15 answered Yes          |
| Some users do not know where to sell/hand over UCO | 5/15                        |
| Some users do not know a fair selling price        | 5/15                        |
| Clear selling price is important                   | 15/15 selected it           |
| No pickup fee is important                         | 9/15 selected it            |

> **Evidence status: ACTUAL research data.**

The sample is small and should be treated as directional rather than representative of the broader Jember population.

---

# 5. Product Opportunity

The research suggests an opportunity to make UCO collection more:

* organized
* convenient
* transparent

However, the core operational question remains:

> **Can fragmented suppliers be aggregated sufficiently before a pickup route is dispatched?**

This becomes the primary MVP validation problem.

---

# 6. Target Users

## 6.1 Primary User — Culinary Micro-UMKM

Culinary micro-UMKM are treated as potential **route anchors** because they may contribute relatively larger and more recurring UCO volumes.

The current research sample provides directional support for this hypothesis, but operational repeatability has not yet been validated.

---

## 6.2 Secondary User — Household

Households are treated as potential **route densifiers**.

A household may contribute a smaller amount individually but can increase route volume when aggregated with nearby suppliers.

This remains a product hypothesis requiring real route validation.

---

# 7. Product Hypotheses

## H1 — Route Density

> If nearby household suppliers are aggregated around culinary micro-UMKM anchors, total liters per route may increase toward the 50L internal operating threshold.

### Validation

Measure:

* estimated liters per route
* actual liters per route
* number of suppliers per route
* percentage of routes reaching 50L
* repeatability across collection windows

---

## H2 — Supplier Convenience

> If suppliers can select a scheduled pickup and monitor pickup progress, the collection process may become more convenient and transparent.

### Validation

Measure:

* pickup completion rate
* status view usage
* supplier feedback
* repeat pickup requests

---

## H3 — Payout Transparency

> If estimated payout, actual weighing, payout/L, and total payout are clearly displayed, supplier trust in the transaction process may improve.

### Validation

Measure:

* percentage of completed requests with verified weighing records
* payout calculation accuracy
* supplier feedback regarding price and weighing transparency

---

# 8. Product Goals

## 8.1 Product-Level Goal

Validate whether a localized aggregation model can consolidate fragmented UCO supply into sufficiently dense pickup routes.

---

## 8.2 Feature-Level Goals

### Collection

Allow suppliers to create UCO pickup requests.

### Scheduling

Allow suppliers to select available pickup areas and time windows.

### Aggregation

Group pickup requests by area and schedule.

### Progress Tracking

Show collection progress toward the route threshold.

### Weighing

Record actual collected volume.

### Payout

Calculate supplier payout based on verified actual volume and active payout/L.

---

## 8.3 Business-Level Goal

Establish the operational evidence required to evaluate whether route density can support a sustainable UCO collection model.

The MVP does **not** claim profitability before actual route economics are measured.

---

# 9. Product Scope

## 9.1 MVP — In Scope

### Supplier

* Supplier type selection
* Household / culinary micro-UMKM classification
* Phone-based supplier identification
* Estimated UCO volume input
* Pickup request creation

### Collection

* Area selection
* Pickup schedule selection
* Pickup request status
* Collection progress

### Route Aggregation

* Area-based supplier grouping
* Estimated route volume
* Route threshold monitoring
* Route status

### Transaction

* Actual weighing
* Active pricing reference
* Supplier payout calculation
* Transaction record

### Validation

* Basic dashboard
* Operational metrics
* Validation records
* Duplicate transaction prevention

---

# 10. Out of Scope

The following are intentionally excluded from the MVP:

1. Downstream UCO processing
2. Geographic expansion beyond the initial pilot
3. Advanced route optimization
4. Real-time automated market pricing
5. Supplier marketplace
6. Automated demand forecasting
7. Automated buyer matching
8. Full logistics fleet management

The purpose is to keep the MVP focused on validating the aggregation and collection workflow.

---

# 11. Functional Requirements

## FR-01 — Supplier Type Selection

The system shall allow users to select:

* Culinary micro-UMKM
* Household

### Acceptance Criteria

* User must select one supplier type.
* The selected type is stored with the pickup request.
* The request cannot be submitted without supplier type.

---

## FR-02 — Estimated Volume Input

The system shall allow suppliers to enter their estimated UCO volume.

### Acceptance Criteria

* Volume must be numeric.
* Volume must be greater than 0.
* The system stores the estimated volume.
* Estimated volume is used for route aggregation.

---

## FR-03 — Area Selection

The system shall allow suppliers to select their collection area.

### Acceptance Criteria

* User must select an available area.
* Area is stored with the pickup request.
* Requests can be grouped by area.

---

## FR-04 — Pickup Schedule

The system shall allow suppliers to select an available pickup window.

Example:

* Thursday 09:00–12:00
* Thursday 13:00–16:00
* Saturday 09:00–12:00
* Saturday 13:00–16:00

These schedules are MVP configuration examples and can be adjusted during pilot operations.

### Acceptance Criteria

* User must select one available schedule.
* Schedule is stored with the request.
* Requests can be grouped by area and schedule.

---

# 12. Route Aggregation Requirements

## FR-05 — Route Volume Calculation

The system shall calculate estimated route volume from pickup requests sharing the same:

* area
* pickup schedule
* route status

### Formula

> **Estimated Route Volume = Σ Estimated Supplier Volume**

---

## FR-06 — Route Threshold

The MVP shall use:

> **50L = Internal Pilot Operating Threshold**

### Route State

If:

**Estimated Volume < 50L**

→ Route remains in aggregation.

If:

**Estimated Volume ≥ 50L**

→ Route can transition to Ready for pickup.

### Important Note

The 50L threshold is an internal product assumption for pilot validation.

It is not:

* an industry benchmark
* a market standard
* a proven break-even point

---

## FR-07 — Route Status

The system shall support:

**Open → Ready → In Progress → Completed**

### Status Logic

**Open**

Route is collecting supplier requests.

**Ready**

Estimated route volume reaches the internal threshold.

**In Progress**

Pickup operation has started.

**Completed**

Pickup and transaction recording are complete.

---

# 13. Collection Progress

## FR-08 — Progress Calculation

The system shall calculate collection progress.

### Formula

> **Progress % = Estimated Collected Volume / Target Route Volume × 100**

For the MVP:

> **Target Route Volume = 50L**

Example:

> 40L / 50L = 80%

Any numeric example shown in the UI or documentation should be treated as **illustrative** unless explicitly linked to actual pilot data.

---

# 14. Pickup Status

## FR-09 — Request Status

Each pickup request shall have a status.

Minimum states:

**Pending → Scheduled → In Progress → Completed**

Optional operational state:

**Cancelled**

### Acceptance Criteria

Users should be able to identify the current state of their request through the status lookup flow.

---

# 15. Weighing Requirements

## FR-10 — Actual Volume Recording

The system shall allow the operator to record actual collected volume after pickup.

Required data:

* Request ID
* Actual volume
* Weighing timestamp
* Operator/reference information

### Validation

* Actual volume must be numeric.
* Actual volume must be greater than 0.
* A request should not receive duplicate weighing records.
* Actual volume must be linked to the corresponding pickup request.

---

# 16. Pricing & Payout Requirements

## FR-11 — Active Pricing Reference

The system shall retrieve the active pricing configuration.

Required fields:

* Effective date
* Reference buyer price/L
* Supplier payout/L
* Source
* Active status

The pricing reference should have an effective date to avoid ambiguity when market prices change.

---

## FR-12 — Payout Calculation

The system shall calculate supplier payout using:

> **Supplier Payout = Actual Volume × Supplier Payout/L**

Example:

> 8L × Rp5,500/L = Rp44,000

This is an **illustrative example**, not actual pilot transaction data.

---

# 17. Payout Transparency

The supplier transaction view should expose:

1. Actual volume
2. Payout/L
3. Total payout

Example:

**Actual Volume:** 8L
**Payout:** Rp5,500/L
**Total:** Rp44,000

This allows suppliers to understand how the final payout was calculated.

---

# 18. Returning Supplier Flow

The MVP supports phone-based lookup for returning suppliers.

### Flow

**Home**

↓

**Check Pickup Status**

↓

**Enter Phone Number**

↓

**Find Supplier**

↓

**Show Active / Previous Pickup**

↓

**Show Collection Progress**

↓

**Show Route Status**

↓

**Show Weighing & Payout**

The phone number acts as the MVP lookup mechanism rather than requiring a full account/profile system.

---

# 19. User Flow

## New Supplier

**HOME**

↓

**START COLLECTION**

↓

**SELECT SUPPLIER TYPE**

↓

**INPUT ESTIMATED VOLUME**

↓

**SELECT AREA**

↓

**SELECT PICKUP SCHEDULE**

↓

**CONFIRM REQUEST**

↓

**REQUEST CREATED**

↓

**AREA AGGREGATION**

↓

**ROUTE ≥ 50L?**

### NO

→ Continue aggregation
→ Wait / invite nearby suppliers

### YES

→ Route Ready

↓

**PICKUP IN PROGRESS**

↓

**PICKUP COMPLETED**

↓

**WEIGHING**

↓

**ACTUAL VOLUME**

↓

**PAYOUT CALCULATION**

↓

**COMPLETED**

---

# 20. Non-Functional Requirements

## NFR-01 — Usability

The core pickup request should be understandable without requiring extensive instructions.

## NFR-02 — Data Consistency

Pickup requests, route records, weighing records, and payout records must use a consistent request identifier.

## NFR-03 — Validation

Invalid volume, missing required fields, and duplicate weighing records should be prevented.

## NFR-04 — Traceability

Each transaction should be traceable from:

**Pickup Request → Route → Actual Weighing → Payout**

## NFR-05 — Pricing Traceability

Every payout calculation should be linked to an active pricing reference with an effective date.

---

# 21. Product Metrics

## Primary Metric

### Liters per Route

> **Actual Collected Liters / Completed Route**

This metric is used to determine whether aggregation is creating meaningful route density.

### Baseline

The actual pilot baseline must be established from real completed routes.

### Target / Evaluation Point

> **Evaluate actual pilot performance against ≥50L internal operating threshold.**

There is currently no validated actual baseline being claimed.

---

## Supporting Metrics

### Route Threshold Achievement

> Routes reaching ≥50L / Eligible Routes × 100%

### Pickup Completion Rate

> Completed Pickups / Scheduled Pickups × 100%

### Estimated vs Actual Accuracy

> Actual Volume / Estimated Volume × 100%

### Repeat Contribution Rate

> Suppliers with Repeat Pickup / Suppliers with Completed Pickup × 100%

### Payout Accuracy

> Correctly calculated payouts / Total completed payout transactions × 100%

---

# 22. Trade-Off Metrics

The product should avoid improving route volume at the expense of supplier experience.

Therefore, route-density metrics should be monitored alongside:

* pickup waiting time
* cancellation rate
* estimated vs actual volume variance
* supplier complaints
* missed pickup rate
* payout discrepancies

A route should not be considered successful solely because it reaches the volume threshold.

---

# 23. Success Criteria

Because operational validation has not yet been conducted, success criteria are defined as **future pilot criteria**, not current results.

### Route Density

Establish actual baseline and evaluate whether completed routes can consistently approach or exceed the 50L internal threshold.

### Collection Transparency

Target:

> ≥90% of pickup requests have a trackable status.

### Pickup Reliability

Target:

> ≥80% of scheduled pickups are completed.

### Repeat Contribution

Establish an actual pilot baseline before setting a final scale target.

### Payout Accuracy

Target:

> 100% of completed transactions use verified actual volume and the active payout reference.

---

# 24. Product Analytics Events

| Event                      | Purpose                          |
| -------------------------- | -------------------------------- |
| Pickup Request Created     | Measure demand                   |
| Supplier Added to Route    | Measure aggregation              |
| Collection Progress Viewed | Measure transparency usage       |
| Route Threshold Reached    | Measure route-density progress   |
| Pickup Started             | Measure operational execution    |
| Pickup Completed           | Measure completion               |
| Weighing Recorded          | Measure transaction completion   |
| Payout Calculated          | Measure transaction transparency |
| Repeat Pickup Requested    | Measure retention                |

### Critical Event

**`route_threshold_reached`**

This event connects user activity with the product's core operational hypothesis.

---

# 25. Data Model

The MVP uses Google Sheets as the operational database.

### SUPPLIERS

Stores:

* supplier ID
* phone
* supplier type
* area
* created date

### PICKUP_REQUESTS

Stores:

* request ID
* supplier ID
* estimated volume
* area
* schedule
* status
* created timestamp

### ROUTES

Stores:

* route ID
* area
* schedule
* estimated volume
* threshold
* route status

### WEIGHING_PAYOUT

Stores:

* request ID
* actual volume
* payout/L
* total payout
* weighing timestamp

### PRICING

Stores:

* effective date
* reference buyer price/L
* supplier payout/L
* source
* active status

### VALIDATION

Stores:

* experiment/validation ID
* metric
* baseline
* target
* actual result
* status
* notes

---

# 26. MVP Architecture

**Frontend**

Google Apps Script HTML/CSS/JavaScript

↓

**Backend**

Google Apps Script

↓

**Data Layer**

Google Sheets

↓

**Operational Modules**

Supplier → Pickup Request → Route → Weighing → Payout → Dashboard

The architecture is intentionally lightweight to support rapid MVP iteration and validation.

---

# 27. Prioritization

## P0 — Must Have

* Supplier type
* Estimated volume
* Area
* Schedule
* Pickup request
* Route aggregation
* 50L threshold
* Route status
* Actual weighing
* Payout calculation
* Request lookup
* Data validation

## P1 — Should Have

* Collection progress
* Transaction history
* Dashboard
* Pricing effective date
* Operational validation tracking

## P2 — Future

* Advanced route optimization
* Automated supplier notifications
* Dynamic pricing integration
* Buyer matching
* Demand forecasting
* Geographic expansion tools

---

# 28. MVP Validation Plan

The MVP should be validated in stages.

### Stage 1 — Functional Validation

Verify:

* request creation
* data storage
* route aggregation
* status transitions
* weighing
* payout calculation
* duplicate prevention

### Stage 2 — User Experience Validation

Evaluate:

* ease of submitting a request
* clarity of pickup status
* clarity of collection progress
* understanding of payout calculation

### Stage 3 — Operational Validation

Collect actual pilot data for:

* liters per route
* number of suppliers per route
* estimated vs actual volume
* pickup completion
* route threshold achievement
* repeat contribution
* route variable costs

### Stage 4 — Product Decision

Use actual evidence to determine whether to:

**Iterate → Validate Further → Evaluate Economics → Consider Expansion**

No geographic expansion decision should be based solely on MVP demo data.

---

# 29. Assumptions & Constraints

## Assumption 1

Nearby suppliers can be aggregated into common pickup windows.

## Assumption 2

Culinary micro-UMKM can act as potential route anchors.

## Assumption 3

Households can increase route density when located near route anchors.

## Assumption 4

A 50L route volume is a useful internal threshold for initial operational testing.

## Assumption 5

Transparent weighing and payout information can improve supplier trust.

All assumptions require validation through actual pilot data.

---

# 30. Open Questions

1. What minimum supplier density is required to consistently reach 50L?
2. What geographic radius produces acceptable route efficiency?
3. How consistent are household contributions over multiple collection cycles?
4. How much do estimated and actual volumes differ?
5. What are the actual route variable costs?
6. What buyer price can realistically be obtained?
7. What payout/L is sustainable after route costs?
8. How frequently will suppliers repeat their contribution?
9. What evidence is sufficient before expanding beyond the initial pilot area?

---

# 31. MVP Acceptance Gate

The MVP is considered ready for operational validation when:

* [ ] Supplier can create a pickup request
* [ ] Request is stored correctly
* [ ] Supplier type is recorded
* [ ] Estimated volume is recorded
* [ ] Area and schedule are recorded
* [ ] Requests can be aggregated into routes
* [ ] Route volume is calculated correctly
* [ ] 50L threshold logic works
* [ ] Route status transitions work
* [ ] Actual weighing can be recorded
* [ ] Duplicate weighing is prevented
* [ ] Active pricing reference is retrieved
* [ ] Payout is calculated correctly
* [ ] Supplier can check pickup status
* [ ] Transaction data is traceable
* [ ] Core validation events can be recorded

---

# 32. Evidence Integrity

This PRD separates current evidence from future validation.

### [ACTUAL]

Currently supported by project research:

* 15 survey respondents
* 3 user interviews
* 10 household respondents
* 5 culinary micro-UMKM respondents
* identified user needs around pickup convenience and pricing transparency

### [ILLUSTRATIVE]

Used only to demonstrate the MVP:

* example route volumes
* example payout calculations
* demo dashboard values
* sample supplier records
* sample pickup requests

### [ASSUMPTION]

Requires operational validation:

* 50L route threshold
* micro-UMKM as route anchors
* households as route densifiers
* route-density improvement
* route economics
* supplier repeat behavior

### [PROXY]

External or indirect market information that may be used when direct local data is unavailable.

---

# 33. Product Decision Principle

> **No operational claim without operational evidence.**

The MVP is therefore treated as a validation instrument rather than proof of business success.

The core question is:

> **Can Jemput Jelantah consistently aggregate fragmented UCO supply into sufficiently dense pickup routes while maintaining a transparent supplier experience?**

The answer should be determined from actual pilot data rather than demo data or assumptions.

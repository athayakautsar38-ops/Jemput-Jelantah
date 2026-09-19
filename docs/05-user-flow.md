# User Flow & Product Interaction

## 1. Overview

Jemput Jelantah is designed around a simple operational loop:

> **COLLECT → SCHEDULE → AGGREGATE → TRACK → WEIGH → GET PAID**

The user experience is connected directly to the operational workflow.

The supplier submits a pickup request, the system aggregates nearby requests, the route is dispatched when it reaches the internal operating threshold, and the final payout is calculated from verified weighing.

---

# 2. User Types

The MVP supports two supplier types:

### 1. Culinary Micro-UMKM

Potential route anchor with relatively higher recurring UCO volume.

### 2. Household

Potential route densifier that can contribute additional UCO volume around an existing route anchor.

These roles are product hypotheses based on the current research sample and are not yet operationally validated.

---

# 3. Primary User Journey

The primary new-user journey is:

> **Home → Select Supplier Type → Estimate Volume → Area → Schedule → Confirm → Track → Weigh → Get Paid**

The flow intentionally minimizes the number of steps required to create a pickup request.

---

# 4. New Supplier Flow

## Step 1 — Home

The supplier enters the Jemput Jelantah MVP.

Primary action:

**Mulai Pengumpulan**

Secondary action:

**Cek Status Pickup**

The product does not require account registration for the MVP.

---

## Step 2 — Select Supplier Type

The supplier chooses:

### UMKM Kuliner

or

### Rumah Tangga

The selection helps the product distinguish supplier segments for operational analysis.

---

## Step 3 — Input Estimated Volume

The supplier enters the estimated amount of UCO available for collection.

Example:

> **Estimated Volume: 8L**

This number is an example used to demonstrate the interaction.

> **Evidence status: ILLUSTRATIVE.**

The estimated volume is used for route aggregation before pickup.

---

# 5. Area Selection

The supplier selects the available collection area.

Example MVP areas:

* Patrang
* Sumbersari
* Kaliwates
* Ajung

These areas are configured for the MVP and do not represent validated route-density results.

The area is important because route aggregation is based on geographic concentration.

---

# 6. Pickup Schedule

The supplier selects an available pickup window.

Example:

| Day      | Time        |
| -------- | ----------- |
| Thursday | 09:00–12:00 |
| Thursday | 13:00–16:00 |
| Saturday | 09:00–12:00 |
| Saturday | 13:00–16:00 |

The schedule configuration can be changed during operational validation.

---

# 7. Request Confirmation

Before submitting, the user reviews:

* Supplier type
* Estimated volume
* Collection area
* Pickup schedule

Primary CTA:

**Confirm Pickup**

After confirmation:

> **Pickup Request Created**

The system generates a unique request ID.

---

# 8. Request Created

After submission, the request enters:

> **Pending**

The request is then available for area and schedule aggregation.

The user does not immediately receive a pickup guarantee.

This distinction is important because the pickup route depends on aggregated supply.

---

# 9. Aggregation Flow

The backend groups pickup requests using:

* Area
* Pickup schedule
* Route status

### Aggregation Logic

> **Estimated Route Volume = Σ Estimated Supplier Volume**

For example:

| Supplier    | Estimated Volume |
| ----------- | ---------------: |
| UMKM A      |              20L |
| Household B |               4L |
| Household C |               6L |
| Household D |               8L |
| **Total**   |          **38L** |

This is an **illustrative example**, not an actual route result.

---

# 10. Route Threshold

The MVP uses:

> **50L = Internal Pilot Operating Threshold**

The route checks whether aggregated estimated volume has reached the threshold.

### If < 50L

**Continue Aggregation**

The system can:

* wait for additional suppliers
* invite nearby suppliers
* maintain the selected collection window

### If ≥ 50L

**Route Ready**

The route can move toward pickup execution.

The 50L threshold is an internal pilot assumption and is not presented as an industry benchmark or proven break-even point.

---

# 11. Collection Progress

The user can view progress toward the route threshold.

### Formula

> **Collection Progress = Aggregated Estimated Volume / 50L × 100**

Example:

> **40L / 50L = 80%**

This is an **illustrative UI example**.

A real route should display actual current aggregation data from the system.

---

# 12. Route Status

The route follows:

> **OPEN → READY → IN PROGRESS → COMPLETED**

### OPEN

Requests are still being aggregated.

### READY

Estimated volume has reached the internal threshold.

### IN PROGRESS

Pickup operation has started.

### COMPLETED

Pickup operation and transaction recording are complete.

---

# 13. Supplier Pickup Status

Each supplier request has its own status.

Recommended states:

> **PENDING → SCHEDULED → IN PROGRESS → COMPLETED**

Optional state:

> **CANCELLED**

This allows supplier-level status to remain separate from route-level status.

For example:

**Route:** READY

while a supplier request may still be:

**SCHEDULED**

until the physical pickup starts.

---

# 14. Returning Supplier Flow

Returning suppliers do not need to recreate their profile.

The MVP uses phone number lookup.

### Flow

**HOME**

↓

**CEK STATUS PICKUP**

↓

**INPUT PHONE NUMBER**

↓

**FIND SUPPLIER**

↓

**SHOW ACTIVE / PREVIOUS REQUEST**

↓

**SHOW PICKUP STATUS**

↓

**SHOW COLLECTION PROGRESS**

↓

**SHOW WEIGHING & PAYOUT**

This provides a lightweight lookup mechanism without implementing a full authentication system.

---

# 15. Collection Progress View

The progress screen communicates:

### Current Aggregated Volume

Example:

**40L**

### Route Threshold

**50L**

### Remaining

**10L**

### Progress

**80%**

All numeric examples in this section are illustrative.

The purpose of the screen is to answer:

> **"How close is my area to having enough volume for pickup?"**

---

# 16. Pickup Execution

When the route reaches the operational threshold and is dispatched:

> **Route Ready → Pickup In Progress**

The operator collects UCO from participating suppliers.

The system records the pickup state.

After the route is completed:

> **Pickup In Progress → Pickup Completed**

---

# 17. Weighing Flow

After physical collection, actual UCO volume is recorded.

### Operator Flow

**Completed Pickup**

↓

**Open Request**

↓

**Enter Actual Volume**

↓

**Validate Request**

↓

**Save Weighing**

↓

**Calculate Payout**

The actual volume becomes the basis for the final supplier payout.

---

# 18. Estimated vs Actual Volume

The product intentionally stores both:

### Estimated Volume

Provided by the supplier before pickup.

### Actual Volume

Recorded after physical weighing.

This allows the product to measure estimation accuracy.

### Example

| Metric           | Example |
| ---------------- | ------: |
| Estimated Volume |      8L |
| Actual Volume    |    7.5L |
| Difference       |   -0.5L |

This is an **illustrative example**.

The actual pilot should use real weighing records to calculate the observed variance.

---

# 19. Payout Calculation

The payout is based on actual collected volume.

### Formula

> **Supplier Payout = Actual Volume × Active Supplier Payout/L**

Illustrative example:

> Actual Volume = 8L
> Supplier Payout = Rp5,500/L
> Total Payout = Rp44,000

This example is **ILLUSTRATIVE**, not an actual transaction.

---

# 20. Payout Transparency

The supplier should be able to see:

**Actual Volume**

**Payout / Liter**

**Total Payout**

Example:

> 8L × Rp5,500/L = Rp44,000

The objective is to make the transaction calculation understandable and traceable.

---

# 21. Pricing Reference

The MVP maintains an active pricing configuration containing:

* Effective date
* Reference buyer price/L
* Supplier payout/L
* Source
* Active status

The active pricing reference determines the payout calculation used by the system.

Any price displayed in demo screens must be treated as illustrative unless it is explicitly sourced and dated as actual market data.

---

# 22. Complete Supplier Journey

```text
HOME
  ↓
MULAI PENGUMPULAN
  ↓
SELECT SUPPLIER TYPE
  ↓
INPUT ESTIMATED VOLUME
  ↓
SELECT AREA
  ↓
SELECT PICKUP SCHEDULE
  ↓
CONFIRM REQUEST
  ↓
REQUEST CREATED
  ↓
AREA + SCHEDULE AGGREGATION
  ↓
ROUTE ≥ 50L?
  ├── NO
  │    ↓
  │  CONTINUE AGGREGATION
  │    ↓
  │  WAIT / INVITE NEARBY SUPPLIERS
  │
  └── YES
       ↓
     ROUTE READY
       ↓
     PICKUP IN PROGRESS
       ↓
     PICKUP COMPLETED
       ↓
     ACTUAL WEIGHING
       ↓
     PAYOUT CALCULATION
       ↓
     COMPLETED
```

---

# 23. Returning Supplier Journey

```text
HOME
  ↓
CEK STATUS PICKUP
  ↓
INPUT PHONE NUMBER
  ↓
SUPPLIER FOUND?
  ├── NO
  │    ↓
  │  SHOW NO ACTIVE REQUEST
  │
  └── YES
       ↓
     SHOW REQUEST
       ↓
     PICKUP STATUS
       ↓
     COLLECTION PROGRESS
       ↓
     ROUTE STATUS
       ↓
     WEIGHING RESULT
       ↓
     PAYOUT
```

---

# 24. Operational Flow

The supplier experience is connected to the operational flow:

```text
SUPPLIER
   ↓
CREATE REQUEST
   ↓
AREA + SCHEDULE
   ↓
AGGREGATION
   ↓
ROUTE THRESHOLD CHECK
   ↓
ROUTE READY
   ↓
PICKUP
   ↓
WEIGHING
   ↓
PAYOUT
```

This ensures that the product interface reflects the actual operational dependency.

---

# 25. Key Product States

The MVP has five important states:

### State 1 — Request Pending

Supplier has submitted a request.

### State 2 — Aggregating

The request is being combined with nearby suppliers.

### State 3 — Route Ready

The aggregated route has reached the internal operating threshold.

### State 4 — Pickup Completed

The physical collection has been completed.

### State 5 — Paid

Actual volume has been recorded and payout has been calculated.

These states are designed to minimize ambiguity around the pickup process.

---

# 26. UX Principles

## 1. Show What Happens Next

Every major state should provide a clear next action or status.

## 2. Separate Estimated from Actual

The product should never imply that supplier estimates are equivalent to verified weighing.

## 3. Make the Aggregation Visible

The supplier should understand why the pickup may need to wait for additional contributors.

## 4. Make Payout Traceable

Final payout should be understandable from actual volume and payout/L.

## 5. Keep the MVP Lightweight

The product avoids unnecessary features such as:

* complex account systems
* marketplace functionality
* advanced route optimization
* real-time pricing APIs

until the core aggregation model is validated.

---

# 27. Edge Cases

## Case 1 — Route Does Not Reach 50L

**Expected behavior:**

Keep route open and continue aggregation.

The product should not imply that pickup is guaranteed before the route reaches the operating condition.

---

## Case 2 — Estimated Volume Is Different from Actual Volume

**Expected behavior:**

Store both values.

Use actual volume for final payout.

Use the difference for operational analysis.

---

## Case 3 — Duplicate Weighing

**Expected behavior:**

Prevent a second weighing record for the same completed request.

---

## Case 4 — Supplier Cannot Be Found

**Expected behavior:**

Show a clear message and allow the user to create a new pickup request if appropriate.

---

## Case 5 — Pricing Reference Changes

**Expected behavior:**

Use the active pricing configuration applicable to the transaction.

Store the effective date and source for traceability.

---

# 28. Usability Validation

The following tasks should be tested with users during MVP validation:

### Task 1

Create a pickup request.

### Task 2

Find an existing pickup request using phone number.

### Task 3

Understand the route collection progress.

### Task 4

Understand why pickup may still be waiting.

### Task 5

Interpret the final weighing result.

### Task 6

Verify how the payout was calculated.

---

# 29. Usability Success Criteria

Future usability validation should assess whether users can:

* create a request without assistance
* identify their pickup status
* understand route progress
* distinguish estimated and actual volume
* understand payout calculation

Quantitative usability targets should be defined after the first usability test rather than invented before testing.

---

# 30. Product Analytics Mapping

Each important interaction maps to a measurable event.

| User Action             | Event                        |
| ----------------------- | ---------------------------- |
| Creates pickup request  | `pickup_request_created`     |
| Joins route             | `supplier_added_to_route`    |
| Views progress          | `collection_progress_viewed` |
| Route reaches threshold | `route_threshold_reached`    |
| Pickup starts           | `pickup_started`             |
| Pickup completes        | `pickup_completed`           |
| Weighing recorded       | `weighing_recorded`          |
| Payout calculated       | `payout_calculated`          |
| Requests another pickup | `repeat_pickup_requested`    |

The most strategically important event is:

> **`route_threshold_reached`**

because it connects supplier activity to the product's core route-density hypothesis.

---

# 31. UX → Business Logic Connection

The product is intentionally designed so that each major user interaction supports an operational objective.

| UX Interaction  | Operational Purpose               |
| --------------- | --------------------------------- |
| Supplier Type   | Segment supply                    |
| Volume Input    | Estimate route volume             |
| Area            | Geographic aggregation            |
| Schedule        | Time-window aggregation           |
| Progress        | Encourage/communicate aggregation |
| Route Status    | Coordinate collection             |
| Actual Weighing | Verify supply                     |
| Payout          | Complete supplier transaction     |

This creates a direct connection between:

> **User Experience → Operational Workflow → Business Validation**

---

# 32. MVP Design Boundary

The MVP intentionally stops at:

> **Verified Collection + Supplier Payout**

It does not attempt to manage the entire UCO downstream value chain.

Therefore, the product does not currently include:

* UCO processing
* biodiesel production
* downstream buyer marketplace
* advanced logistics optimization
* automated market pricing
* geographic expansion

This keeps the MVP focused on the core product hypothesis.

---

# 33. Evidence Integrity

### [ACTUAL]

Current research evidence:

* 15 survey respondents
* 3 user interviews
* 10 households
* 5 culinary micro-UMKM

### [ILLUSTRATIVE]

Examples used in this document:

* 8L estimated volume
* 40L / 50L route progress
* 8L × Rp5,500 payout example
* example supplier and route records

### [ASSUMPTION]

Product assumptions requiring validation:

* 50L operating threshold
* UMKM as route anchors
* households as route densifiers
* scheduled aggregation improves route density

No illustrative number in this document should be interpreted as an actual operational result.

---

# 34. Final User Experience Principle

The core user experience can be summarized as:

> **"I contribute my UCO, know when it will be collected, see whether my area has enough supply, and understand exactly how my final payout is calculated."**

The product should make the aggregation process visible while keeping the supplier journey simple.

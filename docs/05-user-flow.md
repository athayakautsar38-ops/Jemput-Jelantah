# User Flow — Jemput Jelantah

## 1. Purpose

This document defines the end-to-end user and operational flow of Jemput Jelantah.

The flow connects supplier collection, area-based aggregation, scheduled pickup, route status, weighing, and supplier payout.

The primary product principle is:

**Collect → Schedule → Aggregate → Track → Weigh → Get Paid**

---

## 2. Primary Supplier Flow

The primary flow is designed for a new or returning supplier who wants to submit a new pickup request.

```text
HOME
  ↓
MULAI PENGUMPULAN
  ↓
PILIH SUPPLIER TYPE
  ├── UMKM Kuliner
  └── Rumah Tangga
  ↓
INPUT ESTIMATED VOLUME
  ↓
PILIH AREA
  ↓
PILIH JADWAL PICKUP
  ↓
KONFIRMASI REQUEST
  ↓
REQUEST CREATED
  ↓
AREA AGGREGATION
  ↓
ROUTE ≥ 50L?
  ├── NO
  │    ↓
  │  WAIT / INVITE NEARBY SUPPLIERS
  │    ↓
  │  COLLECTION PROGRESS
  │
  └── YES
       ↓
     ROUTE READY
       ↓
     PICKUP IN PROGRESS
       ↓
     PICKUP COMPLETED
       ↓
     WEIGHING
       ↓
     ACTUAL VOLUME
       ↓
     PAYOUT CALCULATION
       ↓
     COMPLETED
```

The supplier does not need to complete a phone lookup before starting a new collection request.

---

## 3. Returning Supplier Flow

Returning suppliers can use the status-check flow to monitor an existing pickup request.

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
  │  SHOW NOT FOUND / CREATE NEW REQUEST
  │
  └── YES
       ↓
     VIEW PICKUP STATUS
       ↓
     VIEW COLLECTION PROGRESS
       ↓
     VIEW ROUTE STATUS
       ↓
     PICKUP COMPLETED
       ↓
     VIEW WEIGHING RESULT
       ↓
     VIEW PAYOUT
```

The phone number acts as the lookup key for retrieving supplier-related pickup information in the MVP.

---

## 4. Route Aggregation Decision Flow

The main operational decision occurs after pickup requests are grouped by area and schedule.

```text
PICKUP REQUESTS
      ↓
GROUP BY AREA + SCHEDULE
      ↓
CALCULATE ESTIMATED VOLUME
      ↓
COMPARE WITH INTERNAL THRESHOLD
      ↓
   ROUTE ≥ 50L?
    /       \
  NO         YES
  ↓           ↓
WAIT /      ROUTE READY
DENSIFY        ↓
ROUTE       SCHEDULE PICKUP
              ↓
          IN PROGRESS
```

The **50L threshold is an internal pilot operating threshold**, not an external industry benchmark or proven break-even point.

If a route remains below the threshold, the product prioritizes additional supplier density around the existing area rather than immediately expanding to a new geographic area.

---

## 5. Operational Flow

The operational flow connects supplier requests with route execution.

```text
SUPPLIER REQUEST
      ↓
REQUEST VALIDATION
      ↓
AREA + SCHEDULE GROUPING
      ↓
ROUTE CREATED / UPDATED
      ↓
ESTIMATED VOLUME CALCULATED
      ↓
THRESHOLD CHECK
      ↓
ROUTE READY
      ↓
PICKUP STARTED
      ↓
PICKUP COMPLETED
      ↓
ACTUAL VOLUME RECORDED
      ↓
PAYOUT CALCULATED
      ↓
TRANSACTION VALIDATED
```

The operational system tracks both:

* **Estimated Volume** — supplier-provided volume before pickup
* **Actual Volume** — volume recorded after weighing

This distinction allows the product team to measure the gap between expected and realized supply.

---

## 6. Pickup Request States

Each pickup request follows a defined state progression.

```text
PENDING
   ↓
SCHEDULED
   ↓
IN PROGRESS
   ↓
COMPLETED
```

### State Definitions

| State       | Meaning                                                        |
| ----------- | -------------------------------------------------------------- |
| Pending     | Request has been created but pickup has not yet been scheduled |
| Scheduled   | Request has been assigned to an area-based pickup schedule     |
| In Progress | Pickup operation is currently being executed                   |
| Completed   | Pickup has been completed and can proceed to weighing/payout   |

A request should not be marked as completed before the pickup operation has actually been completed.

---

## 7. Route States

Routes follow a separate state model.

```text
OPEN
  ↓
READY
  ↓
IN PROGRESS
  ↓
COMPLETED
```

### State Definitions

| Route State | Meaning                                                                       |
| ----------- | ----------------------------------------------------------------------------- |
| Open        | Route is collecting suppliers and has not reached the operating threshold     |
| Ready       | Route has reached the internal operating threshold and is ready for execution |
| In Progress | Pickup route is being executed                                                |
| Completed   | Route operation has been completed                                            |

The route state is determined at the route level, while pickup request status is maintained at the supplier/request level.

---

## 8. Collection Progress Flow

The collection progress feature makes route aggregation visible to suppliers.

```text
COLLECTED VOLUME
      ↓
COMPARE WITH TARGET
      ↓
PROGRESS %
      ↓
ROUTE STATUS
```

Example:

```text
6 L collected
10 L target

Progress = 60%

4 L remaining
```

The progress value is calculated from the current aggregated collection volume and the configured target.

This allows suppliers to understand whether the area is approaching the pickup operating threshold.

---

## 9. Weighing & Payout Flow

After pickup completion, the actual collected volume is recorded.

```text
PICKUP COMPLETED
      ↓
INPUT ACTUAL VOLUME
      ↓
RETRIEVE ACTIVE PRICING REFERENCE
      ↓
CALCULATE PAYOUT
      ↓
VALIDATE TRANSACTION
      ↓
SHOW RESULT TO SUPPLIER
```

### Payout Formula

```text
Supplier Payout
= Actual Volume × Supplier Payout / Liter
```

Example:

```text
Actual Volume = 8 L
Supplier Payout = Rp5,500/L

Payout = 8 × Rp5,500
       = Rp44,000
```

The pricing reference should include an effective date and source so that the transaction remains traceable.

---

## 10. Key Decision Points

The product contains several important decision points.

### Decision 1 — Supplier Type

```text
Supplier
  ↓
UMKM or Household?
```

The supplier type is stored because contribution patterns and route-anchoring assumptions may differ between segments.

---

### Decision 2 — Route Threshold

```text
Estimated Route Volume
        ↓
    ≥ 50L?
    /    \
  No      Yes
  ↓        ↓
Densify   Ready
```

This is the primary operational decision gate in the MVP.

---

### Decision 3 — Supplier Lookup

```text
Phone Number
     ↓
Supplier Found?
   /       \
 No         Yes
 ↓           ↓
Not Found   View Status
```

This flow is used when a supplier selects **Cek Status Pickup**.

---

### Decision 4 — Duplicate Weighing

```text
Weighing Request
      ↓
Already Recorded?
    /       \
  Yes        No
  ↓           ↓
Reject      Record
Duplicate   Weighing
```

The system should prevent the same pickup request from receiving multiple weighing records.

---

## 11. Exception & Edge Flows

The MVP should explicitly handle common operational exceptions.

### 11.1 Route Below Threshold

```text
Route < 50L
    ↓
Keep Collection Open
    ↓
Invite / Add Nearby Suppliers
    ↓
Recalculate Route Volume
```

The route should not automatically be treated as ready only because a pickup request exists.

---

### 11.2 Estimated Volume Changes

```text
Supplier Updates Volume
        ↓
Update Request
        ↓
Recalculate Route Volume
        ↓
Update Progress
        ↓
Re-evaluate Threshold
```

This prevents route progress from relying on stale estimated-volume data.

---

### 11.3 Actual Volume Differs From Estimate

```text
Estimated Volume
       ↓
Pickup
       ↓
Actual Weighing
       ↓
Store Actual Volume
       ↓
Calculate Payout From Actual Volume
```

Supplier payout is based on **actual weighed volume**, not the original estimate.

---

### 11.4 Pricing Reference Changes

```text
Active Pricing Reference
        ↓
Retrieve Price
        ↓
Record Transaction
        ↓
Calculate Payout
```

Pricing should be stored as a configurable reference rather than hard-coded into the product logic.

---

### 11.5 Supplier Not Found

If a phone number does not match an existing supplier record, the system should show a clear not-found state instead of returning an empty or misleading status page.

---

## 12. User-Visible vs Operational States

Not every operational state needs to be exposed with the same level of detail.

| Product Area        | Supplier Visible          | Operations Visible                  |
| ------------------- | ------------------------- | ----------------------------------- |
| Pickup Request      | Request status            | Full request record                 |
| Collection Progress | Collected volume / target | Supplier-level contribution         |
| Route               | Area + progress + status  | Full route composition              |
| Pickup              | Pickup status             | Execution status                    |
| Weighing            | Actual volume             | Weighing record                     |
| Payout              | Price/L + total payout    | Pricing source + transaction record |
| Validation          | Relevant result           | Full validation details             |

The supplier experience should prioritize clarity, while the operational interface should prioritize traceability and control.

---

## 13. Flow-to-Requirement Traceability

| Flow                         | Related Requirement |
| ---------------------------- | ------------------- |
| Create Pickup Request        | PR-001              |
| Supplier Type & Volume Input | PR-002              |
| Area & Schedule Selection    | PR-003              |
| Route Aggregation            | PR-004              |
| Route Threshold              | PR-005              |
| Collection Progress          | PR-006              |
| Pickup Tracking              | PR-007              |
| Actual Weighing              | PR-008              |
| Pricing Reference            | PR-009              |
| Payout Calculation           | PR-010              |
| Duplicate Prevention         | PR-011              |
| Data Validation              | PR-012              |
| Transaction Traceability     | PR-013              |

This mapping keeps the user flow connected to the product requirements defined in the PRD.

---

## 14. UX Principles

### 14.1 Minimize Input Friction

Suppliers should only provide information required to initiate and track a pickup.

### 14.2 Make Progress Understandable

Use simple indicators such as:

```text
6L / 10L
4L remaining
60% collected
```

instead of exposing operational calculations directly.

### 14.3 Make Transaction Results Transparent

The supplier should be able to see:

```text
Actual Volume
×
Payout per Liter
=
Total Payout
```

### 14.4 Separate Estimated and Actual Data

Estimated volume supports route planning.

Actual volume determines the final transaction.

### 14.5 Make Operational States Explicit

The product should clearly communicate whether a request is:

**Pending → Scheduled → In Progress → Completed**

and whether a route is:

**Open → Ready → In Progress → Completed**

---

## 15. Flow Validation Criteria

The user flow is considered functionally valid when:

* A supplier can create a pickup request.
* Supplier type and estimated volume are captured.
* The request can be associated with an area and schedule.
* Requests can be aggregated into an area-based route.
* Route volume can be recalculated when supplier data changes.
* The route threshold can be evaluated.
* Suppliers can view collection progress.
* Pickup status can progress through defined states.
* Actual volume can be recorded after pickup.
* Supplier payout is calculated from actual volume.
* Duplicate weighing records are prevented.
* Pricing references are traceable.
* Invalid or missing inputs generate clear validation states.

---

## 16. Product Flow Principle

The product flow is designed around one operational question:

> **Can fragmented supplier contributions be consolidated into a sufficiently dense route before pickup is executed?**

Therefore, the MVP does not treat the number of pickup requests as the primary operational outcome.

The critical flow is:

```text
Fragmented Suppliers
        ↓
Area-Based Aggregation
        ↓
Route Volume
        ↓
Threshold Check
        ↓
Scheduled Pickup
        ↓
Actual Weighing
        ↓
Verified Payout
```

This flow directly connects the product experience to the core business hypothesis of improving route density before geographic expansion.

---

## 17. Conclusion

Jemput Jelantah's user flow connects supplier convenience with route-level operational validation.

The supplier experience focuses on simple collection requests, visible progress, pickup status, weighing, and payout. The operational flow focuses on aggregation, route readiness, actual volume, and transaction validation.

The MVP therefore uses the user flow not only to facilitate pickup, but also to test whether localized aggregation around existing supplier clusters can improve route density toward the internal 50L pilot threshold.

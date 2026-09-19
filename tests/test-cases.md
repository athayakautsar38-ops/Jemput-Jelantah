# MVP Test Cases

## 1. Purpose

This document defines the functional and data-integrity test cases for the Jemput Jelantah MVP.

The purpose is to verify that the implemented product behaves according to its defined product requirements and business rules before pilot validation.

These test cases validate product functionality. They do not by themselves validate the underlying business hypotheses or prove operational viability.

---

## 2. Test Environment

| Component          | Environment                |
| ------------------ | -------------------------- |
| Frontend           | Google Apps Script Web App |
| Backend            | Google Apps Script         |
| Database           | Google Sheets              |
| Supplier Data      | `SUPPLIERS`                |
| Pickup Requests    | `PICKUP_REQUESTS`          |
| Route Data         | `ROUTES`                   |
| Weighing & Payout  | `WEIGHING_PAYOUT`          |
| Pricing            | `PRICING`                  |
| Validation Records | `VALIDATION`               |

---

## 3. Test Case Convention

Each test case contains:

* **ID** — unique test identifier
* **Scenario** — behavior being tested
* **Precondition** — required state before testing
* **Input** — data entered or action performed
* **Expected Result** — expected system behavior
* **Actual Result** — observed behavior during execution
* **Status** — PENDING / PASS / FAIL / BLOCKED
* **Evidence** — screenshot, request ID, sheet record, or other traceable evidence

Test results must only be marked after the test has actually been executed.

---

# 4. Supplier Management

## TC-001 — Create New Supplier

**Scenario:** Create a new supplier from the pickup flow.

**Precondition:**

* Supplier does not already exist.
* Required supplier fields are available.

**Input:**

* Name: Test Supplier A
* Phone: unique test phone number
* Supplier Type: Rumah Tangga
* Area: Patrang

**Expected Result:**

* A unique `supplier_id` is generated.
* Supplier is stored in `SUPPLIERS`.
* Supplier type and area are stored correctly.
* The supplier can be used to create a pickup request.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Screenshot / supplier_id]`

---

## TC-002 — Existing Supplier Lookup by Phone

**Scenario:** Identify an existing supplier using a phone number.

**Precondition:**

* A supplier with the test phone number already exists.

**Input:**

* Existing supplier phone number.

**Expected Result:**

* The system identifies the existing supplier.
* The system does not create an unnecessary duplicate supplier.
* Existing supplier information can be used for the pickup flow.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Screenshot / supplier_id]`

---

## TC-003 — Supplier Type Selection

**Scenario:** Select supplier type during pickup request creation.

**Input:**

* `Rumah Tangga`
* `UMKM Kuliner`

**Expected Result:**

* The selected supplier type is stored correctly.
* The value matches the supported supplier categories.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Screenshot / sheet record]`

---

# 5. Pickup Request

## TC-004 — Create Pickup Request

**Scenario:** Create a new pickup request.

**Precondition:**

* Valid supplier exists.

**Input:**

* Supplier
* Estimated volume
* Area
* Pickup date
* Pickup time window

**Expected Result:**

* A unique `request_id` is generated.
* Request is stored in `PICKUP_REQUESTS`.
* Initial status is `Pending`.
* Supplier and pickup information are associated with the request.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Request ID / screenshot]`

---

## TC-005 — Unique Request ID

**Scenario:** Verify that each pickup request receives a unique identifier.

**Precondition:**

* Multiple pickup requests can be created.

**Input:**

* Create two or more valid requests.

**Expected Result:**

* Each request has a different `request_id`.
* No existing request is overwritten.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Sheet records]`

---

# 6. Route Aggregation & Threshold

## TC-006 — Aggregate Requests in the Same Route Group

**Scenario:** Multiple requests are aggregated into the same route.

**Precondition:**

* Requests have the same:

  * Area
  * Pickup date
  * Pickup time window

**Input:**

* Request A: 20L
* Request B: 15L
* Request C: 10L

**Expected Result:**

* Requests are associated with the same route group.
* Estimated route volume is calculated from the associated requests.
* Total estimated volume is 45L.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Route ID / sheet record]`

---

## TC-007 — Do Not Aggregate Different Route Groups

**Scenario:** Requests with different route attributes are not incorrectly combined.

**Precondition:**

* Requests exist with different area, date, or time window.

**Input:**

* Request A: Patrang, Thursday, 09:00–12:00
* Request B: Sumbersari, Thursday, 09:00–12:00

**Expected Result:**

* Requests are not incorrectly assigned to the same route.
* Route grouping respects the defined route attributes.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Route records]`

---

## TC-008 — Route Below 50L

**Scenario:** Verify route behavior when estimated volume is below the internal pilot threshold.

**Input:**

* Estimated route volume: 49L

**Expected Result:**

* Route does not become `Ready` based solely on volume.
* Route remains in the appropriate pre-ready state, such as `Open`.

**Note:**
50L is an internal pilot operating threshold, not an industry benchmark or proven break-even point.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Route status / screenshot]`

---

## TC-009 — Route Exactly at 50L

**Scenario:** Verify threshold behavior at exactly 50L.

**Input:**

* Estimated route volume: 50L

**Expected Result:**

* Route reaches the defined threshold.
* Route status becomes `Ready` according to the implemented business rule.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Route status / screenshot]`

---

## TC-010 — Route Above 50L

**Scenario:** Verify threshold behavior above 50L.

**Input:**

* Estimated route volume: 60L

**Expected Result:**

* Route meets the threshold.
* Route status becomes `Ready`.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Route status / screenshot]`

---

# 7. Collection Progress & Pickup Status

## TC-011 — Collection Progress Calculation

**Scenario:** Verify supplier collection progress.

**Precondition:**

* Supplier has an active collection target.

**Input:**

* Collected volume: 8L
* Target volume: 10L

**Expected Result:**

* Progress = 80%.
* Remaining volume = 2L.
* Displayed values are consistent with the underlying request data.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Screenshot / request record]`

---

## TC-012 — Route Status Transition

**Scenario:** Verify route status changes according to operational progress.

**Expected Flow:**

`Open → Ready → In Progress → Completed`

**Expected Result:**

* Status changes occur only through valid operational actions.
* The displayed status matches the underlying route record.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Route record / screenshots]`

---

## TC-013 — Pickup Completion

**Scenario:** Mark a pickup as completed.

**Precondition:**

* Pickup exists.
* Route is in an appropriate operational state.

**Input:**

* Complete pickup action.

**Expected Result:**

* Pickup status is updated correctly.
* The request remains traceable to its route.
* The request becomes available for weighing where applicable.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Request ID / screenshot]`

---

# 8. Weighing & Payout

## TC-014 — Record Actual Volume

**Scenario:** Record the actual volume after physical weighing.

**Precondition:**

* Valid pickup request exists.

**Input:**

* Actual volume: 8L

**Expected Result:**

* Actual volume is stored in `WEIGHING_PAYOUT`.
* The value is associated with the correct `request_id`.
* Actual volume is not automatically replaced by estimated volume.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Weighing record]`

---

## TC-015 — Payout Calculation

**Scenario:** Calculate supplier payout from actual volume.

**Input:**

* Actual volume: 8L
* Supplier payout rate: Rp5,500/L

**Expected Calculation:**

`8L × Rp5,500 = Rp44,000`

**Expected Result:**

* Total payout is calculated as Rp44,000 for this test input.
* Calculation uses actual volume and the applicable payout rate.

**Note:**
The values above are test inputs only and are not presented as current market pricing or actual supplier earnings.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Weighing record / payout result]`

---

## TC-016 — Estimated vs Actual Volume

**Scenario:** Verify that payout is based on actual volume rather than estimated volume.

**Input:**

* Estimated volume: 10L
* Actual volume: 8L
* Payout rate: Rp5,500/L

**Expected Result:**

* Payout is calculated from 8L.
* Expected payout = Rp44,000.
* Estimated volume remains available as an operational planning value.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Request + weighing records]`

---

## TC-017 — Duplicate Weighing Prevention

**Scenario:** Prevent the same pickup request from being weighed and paid twice.

**Precondition:**

* Request already has a completed weighing record.

**Input:**

* Submit another weighing record for the same `request_id`.

**Expected Result:**

* Duplicate weighing is rejected or prevented.
* Existing weighing record remains unchanged.
* No duplicate payout is created.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Error message / sheet record]`

---

# 9. Pricing

## TC-018 — Retrieve Active Pricing

**Scenario:** Retrieve the currently active pricing record.

**Precondition:**

* At least one pricing record is marked active.

**Input:**

* Request active pricing.

**Expected Result:**

* System retrieves the active pricing record.
* Supplier payout rate is available for payout calculation.
* Effective date and source are traceable.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[PRICING record / screenshot]`

---

## TC-019 — Inactive Pricing Is Not Selected

**Scenario:** Prevent an inactive pricing record from being used as the current price.

**Precondition:**

* Multiple pricing records exist.
* Only one is active.

**Input:**

* Request current pricing.

**Expected Result:**

* Inactive pricing is not selected as the active pricing reference.
* The applicable active record is used.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[PRICING records]`

---

## TC-020 — Missing Pricing

**Scenario:** Handle the case where no active pricing is available.

**Precondition:**

* No active pricing record exists.

**Input:**

* Attempt to calculate payout.

**Expected Result:**

* System does not silently calculate payout using an undefined price.
* User receives an appropriate error or fallback state.
* No invalid payout record is created.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Error state / sheet record]`

---

# 10. Data Integrity & Edge Cases

## TC-021 — Negative or Zero Volume

**Scenario:** Validate volume input.

**Input:**

* `-1L`
* `0L`

**Expected Result:**

* Invalid volume values are rejected where the business rule requires positive volume.
* No invalid pickup or payout record is created.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Validation message / sheet]`

---

## TC-022 — Unknown Phone Number

**Scenario:** Check pickup status using a phone number that does not exist.

**Input:**

* Phone number not registered in `SUPPLIERS`.

**Expected Result:**

* System does not return another supplier's information.
* User receives an appropriate not-found state.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Screenshot]`

---

## TC-023 — Invalid Request ID

**Scenario:** Attempt to retrieve or modify a request using an invalid ID.

**Input:**

* Non-existent `request_id`.

**Expected Result:**

* System handles the invalid ID safely.
* No unrelated request is modified or exposed.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Error state]`

---

## TC-024 — Missing Required Fields

**Scenario:** Submit a pickup request without required information.

**Input:**

* Missing supplier
* Missing estimated volume
* Missing area
* Missing pickup date or time window

**Expected Result:**

* Request is rejected or blocked.
* User receives a clear validation state.
* No incomplete request is stored.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Screenshot / sheet]`

---

# 11. Dashboard & Derived Data

## TC-025 — Dashboard Metrics Reflect Source Records

**Scenario:** Verify that dashboard metrics are derived from underlying records.

**Precondition:**

* Test suppliers, pickup requests, routes, and weighing records exist.

**Input:**

* Create or modify a valid source record.

**Expected Result:**

* Relevant dashboard metric updates consistently with the source data.
* No metric depends on manually entered duplicated values where the metric is intended to be derived.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Source record + dashboard screenshot]`

---

# 12. Regression Testing

## TC-026 — Regression After Business Logic Changes

**Scenario:** Verify that existing functionality continues to work after changing business logic.

**Precondition:**

* A code change has been introduced.

**Test Areas:**

* Supplier creation
* Supplier lookup
* Pickup request creation
* Route aggregation
* 50L threshold
* Collection progress
* Status transition
* Weighing
* Payout calculation
* Duplicate prevention
* Pricing retrieval

**Expected Result:**

* Previously working functionality remains functional.
* No unintended changes are introduced to unrelated product flows.

**Actual Result:** `[To be filled after execution]`

**Status:** `PENDING`

**Evidence:** `[Regression checklist / screenshots]`

---

# 13. Test Execution Log

Use this table to record actual execution results.

| Test ID | Date     | Tester   | Status  | Evidence | Notes |
| ------- | -------- | -------- | ------- | -------- | ----- |
| TC-001  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-002  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-003  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-004  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-005  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-006  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-007  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-008  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-009  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-010  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-011  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-012  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-013  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-014  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-015  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-016  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-017  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-018  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-019  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-020  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-021  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-022  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-023  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-024  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-025  | `[date]` | `[name]` | PENDING | `[link]` |       |
| TC-026  | `[date]` | `[name]` | PENDING | `[link]` |       |

---

# 14. Defect Classification

When a test fails, classify the issue before fixing it.

### P0 — Critical

Core transaction is unusable or data integrity is compromised.

Examples:

* Duplicate payout
* Incorrect supplier receives another supplier's data
* Critical records are overwritten

### P1 — High

Core product flow is significantly affected.

Examples:

* Pickup request cannot be created
* Route aggregation produces incorrect volume
* Weighing cannot be recorded

### P2 — Medium

Feature works but behavior or usability is incorrect.

Examples:

* Incorrect status display
* Progress calculation display issue
* Dashboard refresh issue

### P3 — Low

Minor UI or non-blocking issue.

Examples:

* Text inconsistency
* Minor spacing issue
* Non-critical visual defect

---

# 15. Validation Rules

A test can only be marked `PASS` when:

1. The test has actually been executed.
2. The observed result matches the expected result.
3. Relevant evidence has been recorded.
4. No critical data-integrity issue remains unresolved.

A test should remain `PENDING` when it has not yet been executed.

A test should be marked `FAIL` when the observed behavior does not match the expected behavior.

A test should be marked `BLOCKED` when execution cannot proceed because of an external dependency or unresolved prerequisite.

---

# 16. Relationship to Product Validation

Functional testing answers:

> "Does the MVP behave as designed?"

Product validation answers:

> "Does the product behavior support the underlying business and user hypotheses?"

These are different validation layers.

For example:

* TC-009 can verify that a 50L route changes to `Ready`.
* It cannot prove that 50L is economically sustainable.
* TC-015 can verify payout calculation.
* It cannot prove that the payout is attractive enough to drive repeat contribution.
* TC-011 can verify collection progress.
* It cannot prove that users will actually continue contributing UCO.

Business hypotheses require real-world pilot evidence, not only software test results.

---

# 17. Final Principle

> A feature is not considered validated because it was implemented. It is validated when its expected behavior is tested, the observed result is recorded, and the evidence is traceable.

For Jemput Jelantah, functional correctness is the first validation gate. Real-world route density, supplier participation, repeat contribution, and route economics require separate pilot validation.

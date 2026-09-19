# MVP Validation Checklist

## 1. Purpose

This checklist defines the validation gates for the Jemput Jelantah MVP.

The purpose is to verify that:

1. core product flows work as intended,
2. business rules are implemented correctly,
3. data remains consistent across product states,
4. transaction calculations are reliable,
5. critical edge cases are handled,
6. prototype data is not incorrectly interpreted as business evidence.

This checklist separates **functional validation** from **product hypothesis validation**.

A passing functional test means the MVP behaves according to its specification. It does not mean that the underlying business hypothesis has been validated.

---

# 2. Validation Principles

```text
Requirement
    ↓
Expected Behavior
    ↓
Test
    ↓
Observed Result
    ↓
Pass / Fail
    ↓
Evidence
```

The following principles apply:

* Test actual MVP behavior rather than intended behavior.
* Record observed results rather than assuming success.
* Test both normal and edge-case scenarios.
* Retest affected functionality after changes.
* Separate technical correctness from business validation.
* Do not treat demo data as operational evidence.

---

# 3. Validation Status

Each checklist item uses one of the following statuses:

| Status    | Meaning                                                    |
| --------- | ---------------------------------------------------------- |
| `PASS`    | Actual behavior matches expected behavior                  |
| `FAIL`    | Actual behavior does not match expected behavior           |
| `BLOCKED` | Test cannot be completed because of an external dependency |
| `PENDING` | Test has not yet been executed                             |
| `N/A`     | Not applicable to the current MVP                          |

---

# 4. Functional Validation

## 4.1 Supplier Management

* [ ] Supplier can enter required information.
* [ ] Supplier type can be selected.
* [ ] Supplier area can be selected.
* [ ] Supplier record is created successfully.
* [ ] Existing supplier can be identified using phone number.
* [ ] Existing supplier is not unnecessarily duplicated.
* [ ] Invalid or incomplete supplier input is handled correctly.

**Gate:** Supplier information can be created and retrieved reliably.

---

## 4.2 Pickup Request

* [ ] Supplier can create a pickup request.
* [ ] Estimated volume is captured.
* [ ] Pickup area is captured.
* [ ] Pickup date is captured.
* [ ] Pickup time window is captured.
* [ ] Request receives a unique request ID.
* [ ] New request starts in the correct initial status.
* [ ] Request is stored in `PICKUP_REQUESTS`.
* [ ] Invalid volume input is rejected or handled correctly.

**Gate:** A valid pickup request can be created and persisted.

---

## 4.3 Route Aggregation

* [ ] Requests from the same area can be aggregated.
* [ ] Requests with different areas are not incorrectly grouped.
* [ ] Pickup date is considered during aggregation.
* [ ] Pickup time window is considered during aggregation.
* [ ] Estimated route volume is calculated correctly.
* [ ] Route threshold is calculated using estimated volume.
* [ ] Route below 50L remains below the readiness threshold.
* [ ] Route reaching 50L can transition to `Ready`.

**Important:** 50L is an internal pilot operating threshold, not a validated industry benchmark or break-even point.

**Gate:** Route aggregation logic behaves according to the product specification.

---

## 4.4 Collection Progress

* [ ] Supplier can check pickup status.
* [ ] Correct supplier information is retrieved.
* [ ] Correct pickup request is displayed.
* [ ] Collection progress reflects the underlying request data.
* [ ] Route status is displayed consistently.
* [ ] Progress does not rely on manually hardcoded values.
* [ ] Returning supplier can retrieve relevant status.

**Gate:** Supplier-facing status reflects the operational data available in the MVP.

---

## 4.5 Pickup Status

* [ ] Pickup can move from the initial state to the scheduled state.
* [ ] Route can move to `In Progress`.
* [ ] Completed pickup is represented correctly.
* [ ] Invalid status transitions are prevented where applicable.
* [ ] Completed requests are not treated as active requests.

**Gate:** Product states remain logically consistent.

---

## 4.6 Weighing

* [ ] Actual volume can be entered.
* [ ] Actual volume accepts valid numeric values.
* [ ] Invalid negative volume is rejected.
* [ ] Actual volume is stored correctly.
* [ ] Weighing is linked to the correct pickup request.
* [ ] Duplicate weighing for the same request is prevented.
* [ ] Completed pickup has corresponding weighing data.

**Gate:** Actual collection volume is captured reliably.

---

## 4.7 Payout

* [ ] Active payout rate can be retrieved.
* [ ] Actual volume is used for payout calculation.
* [ ] Estimated volume is not used as final payout basis.
* [ ] Total payout is calculated correctly.
* [ ] Payout value is displayed consistently.
* [ ] Invalid pricing data is handled safely.

Calculation:

```text
Total Payout
=
Actual Volume × Supplier Payout per Liter
```

**Gate:** Supplier payout is calculated from actual volume and the applicable payout rate.

---

## 4.8 Pricing Reference

* [ ] Active pricing record can be identified.
* [ ] Effective date is stored.
* [ ] Pricing source is stored.
* [ ] Supplier payout rate is stored.
* [ ] Inactive pricing records are not incorrectly treated as active.
* [ ] Pricing reference is distinguishable from supplier payout rate.

**Gate:** Pricing information is traceable and does not falsely imply real-time market pricing.

---

# 5. Data Integrity Validation

## Referential Integrity

* [ ] Every pickup request references an existing supplier.
* [ ] Every route references valid pickup requests.
* [ ] Every weighing record references an existing pickup request.
* [ ] Pricing records contain required fields.

## Uniqueness

* [ ] Supplier IDs are unique.
* [ ] Request IDs are unique.
* [ ] Route IDs are unique.
* [ ] Weighing IDs are unique.
* [ ] Duplicate weighing transactions are prevented.

## Data Consistency

* [ ] Completed request has corresponding actual volume where required.
* [ ] Payout uses actual volume.
* [ ] Route volume uses estimated volume before pickup.
* [ ] Dashboard metrics are derived from underlying records.
* [ ] Status values remain consistent across related sheets.

**Gate:** Related records remain internally consistent.

---

# 6. Edge-Case Validation

The MVP should be checked against:

* [ ] Zero estimated volume.
* [ ] Negative estimated volume.
* [ ] Zero actual volume.
* [ ] Negative actual volume.
* [ ] Missing supplier.
* [ ] Unknown phone number.
* [ ] Duplicate phone number.
* [ ] Duplicate weighing attempt.
* [ ] Route below threshold.
* [ ] Route exactly at threshold.
* [ ] Route above threshold.
* [ ] Estimated volume significantly different from actual volume.
* [ ] Missing pricing record.
* [ ] Inactive pricing record.
* [ ] Invalid request ID.
* [ ] Invalid route ID.
* [ ] Missing required fields.

**Gate:** Critical invalid states are rejected or handled predictably.

---

# 7. UX Validation

Check whether:

* [ ] Primary action is immediately understandable.
* [ ] Supplier type selection is clear.
* [ ] Volume input is understandable.
* [ ] Pickup area and schedule are easy to select.
* [ ] Confirmation state is clear.
* [ ] Pickup status is understandable.
* [ ] Collection progress is understandable.
* [ ] Weighing result is understandable.
* [ ] Payout amount is clearly communicated.
* [ ] Error messages provide actionable information.
* [ ] Important states do not rely solely on color.

**Gate:** Users can understand what happened and what to do next.

---

# 8. Regression Validation

After a change to product logic or UI:

* [ ] Re-test the changed functionality.
* [ ] Re-test directly related functionality.
* [ ] Re-test affected data calculations.
* [ ] Re-test status transitions.
* [ ] Re-test duplicate prevention where relevant.
* [ ] Confirm previously passing critical flows still work.

Regression testing is especially important after changes to:

* route aggregation,
* collection progress,
* weighing,
* payout calculation,
* pricing,
* supplier lookup.

---

# 9. Product Hypothesis Validation

Functional tests alone cannot validate the business model.

The following require real-world data:

### Route Density

Question:

> Can fragmented UCO supply consistently reach sufficiently dense pickup routes?

Required evidence:

* actual pickup volume,
* actual route volume,
* route frequency,
* supplier contribution,
* route-related operating costs.

### Supplier Participation

Question:

> Will suppliers consistently participate in scheduled pickup?

Required evidence:

* completed pickup rate,
* cancellation rate,
* repeat contribution,
* supplier feedback.

### Economic Viability

Question:

> Can the route model become economically sustainable after supplier payout and route-related variable costs?

Required evidence:

* actual UCO volume,
* supplier payout,
* transportation cost,
* operating cost,
* downstream buyer revenue where applicable.

These questions are **not considered validated by a functioning MVP alone**.

---

# 10. Evidence Classification

Every validation result should be classified as:

| Evidence Type        | Definition                                                            |
| -------------------- | --------------------------------------------------------------------- |
| Functional Evidence  | Demonstrates that an MVP feature works                                |
| Research Evidence    | Comes from user research                                              |
| Operational Evidence | Comes from actual pickup operations                                   |
| Economic Evidence    | Comes from actual operating and commercial data                       |
| Demo Data            | Illustrative data used to demonstrate the MVP                         |
| Validated Result     | Evidence-supported conclusion after an appropriate validation process |

---

# 11. Final Validation Gate

The MVP is considered functionally ready for demonstration when:

```text
Core User Flow
        +
Business Rules
        +
Data Integrity
        +
Transaction Logic
        +
Critical Edge Cases
        +
Regression Checks
```

have been tested with no unresolved critical defects.

This does **not** mean the business model is validated.

The product remains subject to real-world pilot validation for route density, supplier repeatability, and route economics.

---

# 12. Validation Record

For every executed test, record:

```text
Test ID:
Test Name:
Date:
Environment:
Input:
Expected Result:
Actual Result:
Status:
Evidence:
Notes:
```

Example:

```text
Test ID: TC-007
Test Name: Route reaches internal threshold
Input: Combined estimated volume = 50L
Expected Result: Route status becomes Ready
Actual Result: [Record after execution]
Status: [PASS / FAIL]
Evidence: [Screenshot / Sheet record]
Notes: [Optional]
```

---

# 13. Final Principle

> **A feature is not considered validated because it was implemented. It is validated when its expected behavior is tested and the observed result is recorded.**

For business hypotheses, the standard is higher:

> **A working MVP demonstrates product functionality; real-world evidence is required to validate the business hypothesis.**

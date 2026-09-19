# UI Implementation Prompts

## 1. Purpose

This document contains representative prompts used to support the implementation of the Jemput Jelantah MVP.

AI was used to accelerate frontend and backend implementation while the Product Manager remained responsible for product requirements, scope, and final validation.

---

# 2. Implementation Context

### Product

Jemput Jelantah

### MVP Technology

* Google Apps Script
* HTML
* CSS
* JavaScript
* Google Sheets

### Product Loop

> **COLLECT → SCHEDULE → TRACK → WEIGH → GET PAID**

### Core Product Mechanism

> **Fragmented Supply → Aggregated Volume → Route Efficiency → Verified Payout**

---

# 3. UI Context Prompt

## Objective

Provide AI with sufficient product context before asking it to implement UI changes.

### Prompt

```text id="h2n7qx"
Act as a frontend developer working with a Product Manager.

Product:
Jemput Jelantah

Product purpose:
An aggregation and scheduled pickup platform for used cooking oil (UCO).

Core user flow:
HOME
→ START COLLECTION
→ SELECT SUPPLIER TYPE
→ ENTER ESTIMATED VOLUME
→ SELECT AREA
→ SELECT PICKUP SCHEDULE
→ CONFIRM
→ PICKUP STATUS
→ WEIGHING
→ PAYOUT

UI direction:
- clean
- minimal
- white background
- Things 3-inspired simplicity
- strong information hierarchy
- mobile-friendly
- avoid unnecessary decorative elements

Color palette:
Deep Renewable Green: #0B3C26
Bio Yellow-Gold: #FFC300
White: #FFFFFF

Do not add features outside the described flow.

Before changing code, identify:
1. affected component
2. expected behavior
3. data required
4. possible edge cases
```

---

# 4. Home Page Implementation Prompt

## Objective

Implement the main entry point without adding unnecessary profile complexity.

### Prompt

```text id="b8v4lm"
Implement the Jemput Jelantah home page.

Primary actions:
1. Mulai Pengumpulan
2. Cek Status Pickup

Behavior:
- "Mulai Pengumpulan" should go directly to supplier type selection.
- "Cek Status Pickup" should request a phone number and retrieve the supplier's pickup status.
- Do not require phone verification before starting a new collection request.

Keep the page minimal and focused on the two primary actions.

Do not change backend data structures unless required by the described behavior.

Return:
1. code changes
2. affected functions
3. assumptions
4. edge cases to test
```

---

# 5. Supplier Type Prompt

## Objective

Implement the segmentation step.

### Prompt

```text id="q1p6we"
Implement the supplier type selection screen.

Available types:
- Culinary Micro-UMKM
- Household

Requirements:
- clear selection state
- mobile-friendly cards
- continue button
- selected supplier type must be stored for the pickup request
- prevent submission without selection

Do not introduce additional supplier categories.

Ensure the selected value is passed correctly to the next step.
```

---

# 6. Pickup Request Prompt

## Objective

Implement the core collection request.

### Prompt

```text id="s9c3kt"
Implement the pickup request flow for Jemput Jelantah.

Required inputs:
- supplier type
- estimated UCO volume
- pickup area
- pickup schedule
- supplier contact information

On successful submission:
1. create a unique request ID
2. store the request in PICKUP_REQUESTS
3. set initial status to Pending
4. return the request ID
5. display confirmation to the supplier

Validation:
- required fields cannot be empty
- estimated volume must be greater than 0
- pickup area must be selected
- schedule must be selected

Do not mark the request as completed at creation time.
```

---

# 7. Route Aggregation Prompt

## Objective

Implement route-volume logic.

### Prompt

```text id="m7d2ra"
Implement route aggregation logic.

Context:
Jemput Jelantah groups pickup requests by area and schedule.

For each route:
1. identify eligible pending requests
2. calculate total estimated volume
3. compare total volume against the internal 50L operating threshold
4. assign the appropriate route status

Status logic:
Below threshold → Open
Threshold reached → Ready

Important:
50L is an internal pilot operating threshold.
Do not describe it as an industry benchmark or break-even point.

The calculation must use the sum of eligible requests only.

Handle:
- duplicate request IDs
- cancelled requests
- completed requests
- empty routes
```

---

# 8. Collection Progress Prompt

## Objective

Give suppliers visibility into route aggregation.

### Prompt

```text id="r5k8yn"
Implement collection progress for a supplier.

Display:
- current collected volume
- route target
- remaining volume
- progress percentage
- route status

Formula:

Progress % =
Collected Volume / Route Target × 100

Cap displayed progress at 100%.

If no active route exists:
- show an appropriate empty state
- do not display fabricated progress

The progress should be based on the supplier's actual active request and eligible route data.
```

---

# 9. Weighing Prompt

## Objective

Implement post-pickup weighing.

### Prompt

```text id="x4j6pc"
Implement the weighing flow for a completed pickup request.

Input:
Actual UCO volume after weighing.

Requirements:
- actual volume must be greater than 0
- request ID must exist
- request must not already have a weighing record
- actual volume must be stored
- payout must be calculated from actual volume

Formula:

Supplier Payout =
Actual Volume × Supplier Payout per Liter

Prevent duplicate weighing for the same request.

Return:
- actual volume
- payout per liter
- total payout
- transaction status
```

---

# 10. Pricing Reference Prompt

## Objective

Implement effective-dated pricing logic.

### Prompt

```text id="n6q3vt"
Implement an active UCO pricing reference.

Pricing data contains:
- effective date
- reference price per liter
- supplier payout per liter
- source
- active status

The system should retrieve the currently active pricing record.

Supplier payout should be calculated using the active supplier payout per liter.

Do not claim that the pricing is real-time market pricing unless an external live data source is actually integrated.

If no active pricing exists:
- prevent payout calculation
- return a clear error state
```

---

# 11. Duplicate Transaction Prevention Prompt

## Objective

Protect transaction integrity.

### Prompt

```text id="w3r8fa"
Review the payout and weighing implementation for duplicate transaction risks.

Check whether the same pickup request can:
1. receive multiple weighing records
2. receive multiple payouts
3. be processed after completion

Propose validation logic using the request ID.

Expected behavior:
- first valid weighing → allowed
- second weighing for same request → blocked
- payout must be generated only from the valid weighing record

Do not silently overwrite an existing transaction.
```

---

# 12. Debugging Prompt

## Objective

Use AI to investigate reproducible bugs.

### Prompt

```text id="c7m2qx"
Help debug this Jemput Jelantah MVP issue.

Expected behavior:
[describe expected behavior]

Actual behavior:
[describe actual behavior]

Relevant function:
[paste function]

Relevant data:
[describe sheet / record]

Error:
[paste exact error if available]

Analyze:
1. likely root cause
2. affected logic
3. minimal fix
4. potential side effects
5. test cases required after the fix

Do not rewrite unrelated parts of the application.
```

---

# 13. Code Review Prompt

## Objective

Review generated or modified code before acceptance.

### Prompt

```text id="a9k5ls"
Review this implementation as a senior engineer and Product Manager.

Check:

1. Does it satisfy the requirement?
2. Does it preserve existing functionality?
3. Are inputs validated?
4. Are duplicate records prevented?
5. Are calculations correct?
6. Are status transitions valid?
7. Are edge cases handled?
8. Does it introduce unnecessary scope?
9. Could it create inconsistent Google Sheets data?

Return:
- issues found
- severity
- recommended fix
- test case for each issue

Do not assume the implementation is correct merely because it runs.
```

---

# 14. Regression Testing Prompt

## Objective

Ensure a code change does not break existing features.

### Prompt

```text id="p4v8nd"
Create a regression test checklist for this Jemput Jelantah change.

Changed functionality:
[describe change]

Existing core flow:
COLLECT → SCHEDULE → TRACK → WEIGH → GET PAID

Check that the change does not break:
- supplier creation
- pickup request
- route aggregation
- route threshold
- progress tracking
- pickup status
- weighing
- payout
- pricing reference

For each test:
- precondition
- action
- expected result
```

---

# 15. UI Quality Review Prompt

## Objective

Review implementation against the intended design direction.

### Prompt

```text id="u6r1mk"
Review this UI implementation against the following design principles:

- minimal
- clean
- mobile-first
- strong hierarchy
- low cognitive load
- consistent spacing
- clear primary action
- readable status information

Check for:
- unnecessary UI elements
- inconsistent components
- unclear CTAs
- weak hierarchy
- confusing states
- mobile usability issues

Suggest only changes that improve the core user experience.
```

---

# 16. Human Validation

AI-generated implementation follows this acceptance process:

```text id="v3q7ha"
AI GENERATES CODE
       ↓
CODE REVIEW
       ↓
RUN APPLICATION
       ↓
FUNCTIONAL TEST
       ↓
EDGE-CASE TEST
       ↓
REGRESSION TEST
       ↓
ACCEPT / ITERATE
```

Code is not considered complete simply because it compiles or renders.

---

# 17. Implementation Guardrails

AI should not:

* change product strategy without instruction
* introduce unsupported business rules
* invent pricing data
* create fake user data
* remove validation logic
* silently overwrite transactions
* expand MVP scope unnecessarily
* claim successful pilot results

---

# 18. Definition of Implementation Complete

An AI-assisted implementation is considered complete when:

* [ ] Requirement is satisfied
* [ ] Existing core flow still works
* [ ] Data is stored correctly
* [ ] Validation works
* [ ] Edge cases are handled
* [ ] Critical errors are resolved
* [ ] Regression checks pass
* [ ] Product Manager approves the result

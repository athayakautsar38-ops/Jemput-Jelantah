# Validation Prompts

## 1. Purpose

This document contains representative prompts used to validate the Jemput Jelantah MVP, its data logic, and its product hypotheses.

AI is used to identify potential issues and structure analysis.

Actual validation decisions remain human-owned and must be based on real project evidence.

---

# 2. Validation Philosophy

The validation process follows:

> **Test the implementation → Validate the data → Evaluate the hypothesis**

A working MVP does not automatically validate the product hypothesis.

---

# 3. Functional Testing Prompt

## Objective

Generate functional test cases for the core MVP.

### Prompt

```text id="k8r4yp"
Create functional test cases for the Jemput Jelantah MVP.

Core flow:

COLLECT
→ SCHEDULE
→ TRACK
→ WEIGH
→ GET PAID

Features:
- supplier type selection
- estimated volume input
- pickup area
- pickup schedule
- pickup request
- route aggregation
- route threshold
- collection progress
- pickup status
- weighing
- payout
- pricing reference

For each test provide:
- test ID
- feature
- precondition
- action
- expected result
- priority

Focus on functional correctness and data integrity.
```

---

# 4. Route Threshold Testing Prompt

## Objective

Validate the internal route threshold logic.

### Prompt

```text id="d5m7qx"
Test the route aggregation threshold logic.

Internal operating threshold:
50L

Test these cases:

1. total estimated volume = 0L
2. total estimated volume = 20L
3. total estimated volume = 49.9L
4. total estimated volume = 50.0L
5. total estimated volume = 50.1L
6. multiple suppliers whose total equals 50L
7. cancelled supplier request
8. completed supplier request
9. duplicate supplier request

Expected rule:
Below 50L → Open
50L or above → Ready

Check whether the implementation follows the rule consistently.

Do not interpret 50L as an external benchmark.
```

---

# 5. Volume Accuracy Testing Prompt

## Objective

Validate estimated vs actual volume handling.

### Prompt

```text id="f6q2ns"
Create test scenarios for estimated UCO volume versus actual weighed volume.

Test:
- estimated = actual
- estimated < actual
- estimated > actual
- estimated = 0
- actual = 0
- negative values
- decimal values
- missing actual volume

Verify:
1. input validation
2. variance calculation
3. payout calculation
4. transaction status

Do not create fake pilot conclusions from these test cases.
```

---

# 6. Payout Validation Prompt

## Objective

Validate payout calculations.

### Prompt

```text id="r9k3tw"
Validate this payout calculation:

Supplier Payout =
Actual Volume × Supplier Payout per Liter

Test:
- whole number volume
- decimal volume
- zero volume
- negative volume
- missing pricing
- inactive pricing
- duplicate weighing

For each scenario:
- expected system behavior
- expected calculation
- validation requirement
- risk if incorrect
```

---

# 7. Data Integrity Prompt

## Objective

Check consistency between related Google Sheets records.

### Prompt

```text id="m2v7hc"
Review the data model for Jemput Jelantah.

Sheets:
- SUPPLIERS
- PICKUP_REQUESTS
- WEIGHING_PAYOUT
- ROUTES
- DASHBOARD
- VALIDATION
- PRICING

Identify possible integrity problems involving:
- duplicate IDs
- missing references
- invalid status transitions
- orphan records
- duplicate weighing
- inconsistent route volume
- missing pricing reference

For each issue:
- identify affected sheet
- explain the risk
- propose validation logic
- define a test case
```

---

# 8. Edge Case Prompt

## Objective

Identify scenarios that normal happy-path testing may miss.

### Prompt

```text id="q4n8za"
Act as a QA engineer reviewing the Jemput Jelantah MVP.

Identify edge cases for:

1. new supplier
2. returning supplier
3. duplicate phone number
4. duplicate pickup request
5. cancelled request
6. route below threshold
7. route exactly at threshold
8. route above threshold
9. missing actual weighing
10. duplicate weighing
11. missing pricing
12. inactive pricing
13. invalid volume
14. incomplete data
15. repeated pickup

For each:
- expected behavior
- potential risk
- test priority
```

---

# 9. Product Hypothesis Validation Prompt

## Objective

Evaluate actual pilot data without creating conclusions that the data does not support.

### Prompt

```text id="t7p3lm"
Evaluate the following ACTUAL pilot data for Jemput Jelantah.

Important rules:
- Use only the data provided.
- Do not invent missing values.
- Do not convert assumptions into facts.
- Do not claim statistical significance unless the analysis supports it.
- Do not generalize a small pilot to the entire market.

Core hypothesis:

If nearby household suppliers are aggregated around culinary micro-UMKM anchors, Jemput Jelantah may increase liters per pickup route toward the internal 50L operating threshold without immediately expanding geographic coverage.

Analyze:
1. actual route volume
2. supplier composition
3. estimated vs actual volume
4. pickup completion
5. repeat contribution
6. operational issues
7. economic data if provided

For each hypothesis:
- supporting evidence
- contradicting evidence
- limitations
- evidence status

Use:
- Supported
- Partially Supported
- Not Supported
- Inconclusive
```

---

# 10. Research Evidence Review Prompt

## Objective

Prevent overgeneralization of research findings.

### Prompt

```text id="y5c9rw"
Review this product claim against the actual research evidence.

Research:
- 15 survey respondents
- 3 user interviews
- 2 household interview participants
- 1 culinary micro-UMKM interview participant

For the claim:
[insert claim]

Determine:
1. whether the claim is directly supported
2. whether it is an interpretation
3. whether it is an assumption
4. whether the sample is sufficient for the claim
5. how the statement should be rewritten to remain evidence-safe

Do not strengthen the claim beyond the evidence.
```

---

# 11. Dummy Data Detection Prompt

## Objective

Identify accidental presentation of demo data as actual evidence.

### Prompt

```text id="n4w6px"
Audit the following product document for possible confusion between dummy data and actual evidence.

Identify:
- illustrative data
- demo data
- actual research evidence
- actual operational evidence
- assumptions
- future experiment results

Flag any statement that presents dummy or illustrative data as:
- actual traction
- actual experiment result
- validated performance
- proven business economics

Suggest an evidence-safe wording for each flagged statement.
```

---

# 12. Metric Integrity Prompt

## Objective

Ensure metrics are calculated consistently.

### Prompt

```text id="c6m2vk"
Audit these product metrics.

For each metric:
1. verify the formula
2. identify required data
3. identify possible denominator problems
4. identify missing-data issues
5. identify interpretation limitations

Metrics:
- actual liters per route
- suppliers per route
- average contribution per supplier
- estimated vs actual variance
- threshold achievement
- pickup completion
- repeat contribution
- transaction completeness
- contribution margin

Do not generate baseline values unless they are provided as actual data.
```

---

# 13. Experiment Result Review Prompt

## Objective

Analyze completed experiments using predefined criteria.

### Prompt

```text id="j7p5sd"
Review this completed experiment against its predefined success criteria.

Experiment:
[insert experiment]

Predefined hypothesis:
[insert hypothesis]

Predefined success criteria:
[insert criteria]

Actual observations:
[insert actual data]

Analyze:
1. whether the success criteria were met
2. what evidence supports the result
3. what evidence contradicts it
4. data limitations
5. operational anomalies
6. alternative explanations
7. recommended next validation step

Do not change the success criteria after observing the results.
```

---

# 14. Post-Pilot Decision Prompt

## Objective

Translate validated evidence into a product decision.

### Prompt

```text id="w8r3qa"
Act as a senior Product Manager reviewing actual Jemput Jelantah pilot evidence.

Inputs:
- actual pilot data
- predefined metrics
- predefined hypotheses
- operational observations
- supplier feedback
- route economics

Evaluate each hypothesis as:
- Supported
- Partially Supported
- Not Supported
- Inconclusive

Then identify the evidence-based next action:

- Iterate
- Further Validate
- Evaluate Expansion

Explain the reasoning using only the provided evidence.

Do not rank these options.
Do not assume expansion is appropriate without sufficient operational and economic evidence.
```

---

# 15. AI Validation Review

AI-generated validation analysis should itself be challenged.

### Prompt

```text id="s3k9fn"
Critically review the validation analysis above.

Look for:
- unsupported conclusions
- overgeneralization
- cherry-picking
- denominator errors
- confusing correlation with causation
- ignoring contradictory evidence
- ignoring missing data
- changing success criteria
- presenting dummy data as actual
- treating stated intention as actual behavior

List each issue and explain how it affects the conclusion.
```

---

# 16. Human Validation Process

AI-assisted validation follows:

```text id="z6p2mc"
RAW DATA
   ↓
DATA QUALITY CHECK
   ↓
AI-ASSISTED ANALYSIS
   ↓
HUMAN REVIEW
   ↓
METRIC VERIFICATION
   ↓
PRODUCT INTERPRETATION
   ↓
DECISION
```

AI output is considered an analytical aid rather than the final validation result.

---

# 17. Validation Acceptance Checklist

Before a validation result is published:

* [ ] Raw data exists
* [ ] Data source is identifiable
* [ ] Sample size is documented
* [ ] Metric formula is defined
* [ ] Success criteria were predefined
* [ ] Actual and dummy data are separated
* [ ] Contradicting evidence is considered
* [ ] Limitations are documented
* [ ] No unsupported market-wide claim is made
* [ ] Product decision is traceable to evidence

---

# 18. Evidence Classification

Every important statement should be classified as one of:

### Evidence

Directly observed or measured.

### Insight

Interpretation derived from evidence.

### Assumption

Belief that has not yet been validated.

### Hypothesis

Testable assumption.

### Validation Result

Conclusion based on actual test data.

### Decision

Product action based on the available evidence.

---

# 19. Example Evidence Chain

```text id="r2f7cx"
SURVEY
15 RESPONDENTS
      ↓
OBSERVED PATTERN
      ↓
USER INSIGHT
      ↓
PRODUCT HYPOTHESIS
      ↓
MVP
      ↓
OPERATIONAL TEST
      ↓
ACTUAL DATA
      ↓
VALIDATION RESULT
      ↓
PRODUCT DECISION
```

Each step must be supported by the evidence available at that stage.

---

# 20. Current Validation Boundary

At the current project stage:

### Validated

The project has actual user research evidence from:

* 15 survey respondents
* 3 interviews

The MVP workflow and system logic can also be functionally tested.

### Not Yet Validated

The following require actual operational data:

* consistent route density
* repeated achievement of the 50L internal threshold
* pickup reliability in real operations
* supplier repeat behavior
* route economics
* geographic scalability

---

# 21. Validation Principle

The purpose of validation is to reduce uncertainty.

A result can be valuable even when a hypothesis is not supported.

For example:

> A route failing to reach the threshold can reveal that supplier density, pickup radius, or route scheduling needs to change.

Therefore:

> **Validation is successful when it produces reliable learning that improves the next product decision.**

---

# 22. Final Principle

Jemput Jelantah uses AI to accelerate analysis and testing, but the evidence remains the source of truth.

The validation process therefore follows:

> **Data First → AI-Assisted Analysis → Human Review → Evidence-Based Decision**

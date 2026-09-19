# Experiment Design & Validation — Jemput Jelantah

## 1. Purpose

This document defines the validation approach for Jemput Jelantah.

The current project has completed **discovery research** through user interviews and a user survey. The operational route-density experiment has **not yet been conducted with real-world pilot data**.

Therefore, this document separates:

* **Validated research evidence**
* **Product hypotheses**
* **Proposed operational experiments**
* **Future validation requirements**

This distinction prevents assumptions or prototype data from being presented as validated business results.

---

# 2. Current Evidence Status

| Evidence                        | Status            | Purpose                                          |
| ------------------------------- | ----------------- | ------------------------------------------------ |
| User Interviews                 | Completed         | Understand user problems and behavior            |
| User Survey                     | Completed         | Identify directional patterns across respondents |
| MVP Prototype                   | Completed         | Demonstrate proposed product workflow            |
| Route-Density Experiment        | Not yet conducted | Validate aggregation hypothesis                  |
| Route Economics Validation      | Not yet conducted | Validate operational sustainability              |
| Geographic Expansion Validation | Not yet conducted | Determine scalability                            |

The current evidence base is therefore strongest at the **problem discovery and product concept level**, rather than at the operational or commercial validation level.

---

# 3. Completed Discovery Research

## 3.1 User Interviews

Three qualitative interviews were conducted:

* 2 household users
* 1 culinary micro-UMKM operator

The interviews were used to understand:

* Current UCO handling behavior
* Collection accessibility
* Selling / handover difficulties
* Volume contribution patterns
* Trust and transparency expectations

Because the interview sample is small, findings are treated as qualitative directional evidence rather than representative market evidence.

---

## 3.2 User Survey

A survey was conducted with:

**15 respondents**

Segment composition:

```text id="2q6h9p"
10 Households
+
5 Culinary Micro-UMKM
=
15 Respondents
```

Key findings:

| Finding                                    |        Result |
| ------------------------------------------ | ------------: |
| Rated pickup interest 4–5                  |  15/15 (100%) |
| Willing to use scheduled area pickup       | 11/15 (73.3%) |
| Conditional about scheduled pickup         |  4/15 (26.7%) |
| Did not know where to sell / hand over UCO |  5/15 (33.3%) |
| Did not know a fair selling price          |  5/15 (33.3%) |
| Considered clear selling price important   |  15/15 (100%) |
| Considered no pickup fee important         |    9/15 (60%) |

These results indicate stated user preferences and reported problems within the sample.

They do **not** represent actual adoption, repeat behavior, or market-wide demand.

---

# 4. Research-Based Product Insights

The completed research generated three main insights.

### Insight 1 — Collection Access

Some respondents reported uncertainty about where to sell or hand over their UCO.

```text id="7odj4w"
UCO Generated
      ↓
No Clear Collection Channel
      ↓
Storage / Disposal / Existing Informal Channel
```

### Insight 2 — Price Transparency

All survey respondents selected clear selling price as an important factor.

This suggests that transaction transparency should be considered an important part of the product experience.

### Insight 3 — Fragmented Supply

Household contributions in the survey were generally smaller and less predictable than those reported by culinary micro-UMKM respondents.

This supports the product hypothesis of exploring:

```text id="i7sg24"
Micro-UMKM
Potential Route Anchor
       +
Households
Potential Route Densifiers
```

This is a hypothesis derived from the available sample and requires operational validation.

---

# 5. Core Product Hypothesis

Based on the discovery research, the core product hypothesis is:

> **If nearby household suppliers are aggregated around culinary micro-UMKM anchors within the same pickup area and schedule, total route volume may increase toward a sufficiently dense operating level.**

The hypothesis has not yet been validated through a real-world route-density experiment.

---

# 6. Supporting Hypotheses

### H1 — Route Density

Local supplier aggregation can increase liters collected per pickup route.

### H2 — Supplier Convenience

Scheduled pickup and a simple collection flow can reduce friction for suppliers who want to hand over UCO.

### H3 — Transaction Transparency

Clear pricing, actual weighing, and visible payout calculation can improve supplier trust in the collection transaction.

### H4 — Recurring Supply

A convenient and transparent collection experience may encourage suppliers to contribute repeatedly.

These hypotheses require behavioral and operational validation beyond the initial survey and interviews.

---

# 7. Why an Operational Experiment Is Needed

The survey and interviews answer questions such as:

```text
"What problems do users report?"
"What do users say they want?"
"What factors do users consider important?"
```

They do not answer:

```text
"Can a route consistently reach sufficient volume?"
"How many suppliers are required?"
"Can the route be operated efficiently?"
"Is the route economically sustainable?"
"Will suppliers actually repeat?"
```

Therefore, the next validation stage must move from **stated preference** to **observed operational behavior**.

---

# 8. Proposed Route-Density Experiment

The first operational experiment should test whether supplier densification can increase route volume.

### Experiment Objective

Determine whether adding nearby household suppliers around an existing culinary micro-UMKM anchor increases the total volume available for a scheduled route.

### Experimental Structure

```text id="6nqj6a"
Existing Route / Anchor
        ↓
Measure Baseline Supply
        ↓
Add Nearby Household Suppliers
        ↓
Aggregate Same Area + Schedule
        ↓
Measure New Route Volume
        ↓
Compare
```

The experiment should be conducted using real pickup data before any route-density conclusion is treated as validated.

---

# 9. Proposed Experiment Unit

The primary experiment unit is:

> **One area-based pickup route within a defined schedule.**

Each route should record:

* Route ID
* Area
* Pickup schedule
* Supplier count
* Household count
* Micro-UMKM count
* Estimated volume
* Actual volume
* Pickup completion
* Route waiting time
* Route-related operational cost

The experiment should use multiple comparable routes or collection cycles when possible to assess repeatability.

---

# 10. Internal Pilot Operating Threshold

The MVP currently uses:

**50L per route**

as an internal pilot operating threshold.

The threshold is intended to provide a concrete operational reference for the MVP experiment.

It is **not** claimed to be:

* An industry benchmark
* A market standard
* A proven break-even point
* A validated minimum viable route size

The threshold itself should be revisited after real operational data is collected.

---

# 11. Proposed Experiment Variables

### Intervention

Increase supplier density around an existing route area.

### Primary Outcome

**Actual liters collected per route**

### Secondary Outcomes

* Estimated liters per route
* Supplier count
* Household contribution
* Micro-UMKM contribution
* Estimated-to-actual volume variance
* Pickup completion rate
* Route waiting time
* Route-related variable cost
* Repeat contribution

---

# 12. Proposed Success Criteria

The first experiment should evaluate three levels.

### Level 1 — Volume Improvement

```text id="6g4t3b"
After Route Volume
>
Baseline Route Volume
```

This would provide directional evidence that additional supplier density contributes to route volume.

---

### Level 2 — Threshold Achievement

```text id="h9h3c8"
Route Volume
≥
50L Internal Threshold
```

This would indicate that the tested route reached the current internal operating reference.

---

### Level 3 — Repeatability

A single route reaching 50L would not be sufficient to validate the operating model.

The team should test whether similar route conditions can repeatedly reach the threshold across multiple collection cycles.

```text id="t7p3p6"
One Successful Route
        ≠
Validated Operating Model
```

---

# 13. Measurement Plan

Each experimental route should capture:

| Metric                | Measurement                          |
| --------------------- | ------------------------------------ |
| Supplier Count        | Number of active suppliers           |
| Supplier Mix          | Household vs micro-UMKM              |
| Estimated Volume      | Supplier-reported liters             |
| Actual Volume         | Physically weighed liters            |
| Route Volume          | Total actual liters per route        |
| Threshold Achievement | Whether route reaches ≥50L           |
| Waiting Time          | Time from route opening to threshold |
| Pickup Completion     | Completed / scheduled requests       |
| Repeat Contribution   | Suppliers contributing again         |
| Route Cost            | Variable operational cost            |

This creates a dataset that can later support operational and economic validation.

---

# 14. Estimated vs Actual Volume

Estimated volume should be recorded before pickup.

Actual volume should be recorded after weighing.

```text id="5f6w5a"
Estimated Volume
      ↓
Route Planning
      ↓
Pickup
      ↓
Actual Weighing
      ↓
Final Route Performance
```

The difference between estimated and actual volume should be monitored.

### Variance

```text id="z6r0h6"
Absolute Variance
=
|Actual Volume − Estimated Volume|
```

### Percentage Variance

```text id="h0j2gc"
Variance %
=
|Actual − Estimated|
÷
Estimated
× 100%
```

This helps determine whether supplier estimates are reliable enough for route planning.

---

# 15. Proposed Experiment Log

Every real-world experiment should be documented using a standardized record.

| Field                    | Example / Input                                 |
| ------------------------ | ----------------------------------------------- |
| Experiment ID            | EXP-001                                         |
| Hypothesis               | Supplier densification increases route volume   |
| Area                     | [Area]                                          |
| Schedule                 | [Schedule]                                      |
| Baseline Supplier Count  | [X]                                             |
| Added Suppliers          | [X]                                             |
| Baseline Volume          | [X L]                                           |
| Post-Intervention Volume | [X L]                                           |
| Actual Volume            | [X L]                                           |
| Threshold                | 50L                                             |
| Threshold Reached        | Yes / No                                        |
| Pickup Completion        | [X%]                                            |
| Route Cost               | [Rp]                                            |
| Result                   | [Observed Result]                               |
| Limitation               | [Limitation]                                    |
| Decision                 | Iterate / Continue Testing / Scale / Stop-Pivot |

---

# 16. Experiment Data Quality

Before interpreting operational results, verify:

* Route ID is unique.
* Supplier records are linked to the correct route.
* Supplier type is recorded consistently.
* Estimated volume is captured before pickup.
* Actual volume is recorded after weighing.
* Duplicate weighing is prevented.
* Pricing reference has an effective date and source.
* Cancelled requests are not counted as completed pickups.
* Route costs are recorded consistently.

If data quality is insufficient, the result should be reported as inconclusive rather than forcing a conclusion.

---

# 17. Potential Confounding Factors

The operational experiment may be affected by:

* Supplier availability
* Different supplier composition
* UCO generation variability
* Pickup schedule
* Weather
* Supplier cancellations
* Changes in pricing
* Route execution differences
* Geographic distance between suppliers

These factors should be documented during each experiment cycle.

---

# 18. Evidence Limitations

The current project has several important limitations.

### Research limitations

* Only 3 user interviews were conducted.
* The survey contains 15 respondents.
* Survey respondents may not represent the broader Jember market.
* Volume information is self-reported.
* Survey results measure stated preferences rather than observed behavior.

### Product validation limitations

* No real-world route-density experiment has been completed.
* Route economics have not yet been validated.
* Repeat supplier behavior has not yet been validated.
* Geographic scalability has not yet been validated.

Therefore, the current project should be positioned as:

> **Research-backed MVP with an operational validation plan.**

It should not be positioned as a fully validated operating business model.

---

# 19. Current Evidence → Next Validation

```text id="ps0kve"
COMPLETED
──────────────
15 User Surveys
3 User Interviews
        ↓
UNDERSTANDING
──────────────
User Problems
Collection Friction
Price Transparency
Supplier Patterns
        ↓
PRODUCT HYPOTHESES
──────────────
Local Aggregation
UMKM Anchors
Household Densification
Transparent Payout
        ↓
MVP
──────────────
Collect
Schedule
Aggregate
Track
Weigh
Pay
        ↓
NEXT VALIDATION
──────────────
Real Route-Density Experiment
        ↓
OBSERVED BEHAVIOR
        ↓
OPERATIONAL + ECONOMIC VALIDATION
```

---

# 20. Product Decision at Current Stage

Because the route-density experiment has not yet been conducted with real-world data, the project does **not** make a scale decision based on route performance.

The current product decision is:

> **Proceed with MVP validation focused on route density within the initial pilot area before considering geographic expansion.**

The next evidence required is real operational data showing:

1. Supplier density per route
2. Actual liters per route
3. Threshold achievement
4. Pickup completion
5. Repeat contribution
6. Route-related costs

Only after these data are collected should the team determine whether the aggregation model should be iterated, scaled, or reconsidered.

---

# 21. Validation Decision Framework

```text id="m1q8uj"
REAL PILOT DATA
       ↓
Route Density Validated?
   /             \
 NO               YES
 ↓                 ↓
Iterate       Repeatability?
                   /     \
                 NO       YES
                 ↓          ↓
              Iterate    Economics
                           Validated?
                          /       \
                        NO         YES
                        ↓            ↓
                     Iterate      Consider
                                  Expansion
```

The framework deliberately places **repeatability and economics after initial route validation**.

This prevents a single successful route from being treated as sufficient evidence for geographic expansion.

---

# 22. Final Validation Statement

The current evidence from 15 survey respondents and 3 user interviews provides directional insight into supplier problems, collection preferences, and transaction transparency expectations.

The MVP translates those insights into a testable product concept centered on scheduled, area-based UCO aggregation.

However, the core operational hypothesis — that local supplier aggregation can consistently create sufficiently dense pickup routes — remains **unvalidated**.

The next step is therefore to conduct real-world route-density experiments and measure actual volume, supplier contribution, pickup completion, repeat behavior, and route economics.

> **The project intentionally separates what has been learned from users, what is hypothesized about operations, and what still needs to be proven through real-world validation.**

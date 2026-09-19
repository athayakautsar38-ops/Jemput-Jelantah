# Jemput Jelantah

### Evidence-driven UCO collection and route aggregation MVP

Jemput Jelantah is a scheduled used cooking oil (UCO) collection platform designed to aggregate fragmented supply from households and culinary micro-UMKM before dispatching pickup routes.

The product focuses on one operational question:

> **Can area-based aggregation increase liters per pickup route enough to support more efficient collection?**

---

## Product Overview

UCO supply is fragmented across suppliers with different volumes, locations, and collection behaviors.

Households generally contribute smaller volumes, while culinary micro-UMKM can contribute higher volumes within the current research sample.

Instead of treating every pickup request as an isolated collection, Jemput Jelantah tests an aggregation-first operating model:

```text
Fragmented Supply
       ↓
Area Aggregation
       ↓
Aggregated Volume
       ↓
Scheduled Pickup Route
       ↓
Weighing & Verified Payout
````

### Core Product Loop

**COLLECT → SCHEDULE → TRACK → WEIGH → GET PAID**

---

## Problem

Suppliers can face friction around:

* Knowing where to sell or hand over UCO
* Understanding a fair selling price
* Accessing convenient collection services

From the operational perspective, supplier volume is fragmented across locations and supplier types.

The product therefore focuses not only on supplier acquisition, but on:

> **Concentrating supplier volume within each pickup area before dispatching a route.**

---

## Research Evidence

The product direction was informed by:

### Qualitative Research

**3 semi-structured interviews**

* 2 household suppliers
* 1 culinary micro-UMKM operator

### Quantitative Research

**15 survey responses**

* 10 households
* 5 culinary micro-UMKM

Key directional findings within the sample:

| Finding                                    |        Result |
| ------------------------------------------ | ------------: |
| Rated interest in direct UCO pickup at 4–5 |  15/15 (100%) |
| Willing to use scheduled area pickup       | 11/15 (73.3%) |
| Conditional toward scheduled pickup        |  4/15 (26.7%) |
| Did not know where to sell / hand over UCO |  5/15 (33.3%) |
| Reported not knowing a fair selling price  |  5/15 (33.3%) |
| Selected clear selling price as important  |  15/15 (100%) |

These findings are **directional only**. The research sample was small and was not designed to statistically represent the broader Jember population.

More details are available in [`docs/02-research.md`](docs/02-research.md).

---

## Product Strategy

The current operating hypothesis is:

> **Micro-UMKM as route anchors + nearby households as route densifiers.**

The hypothesis is based on differences in reported UCO volumes within the research sample.

It is not treated as a proven market or industry rule.

### Core Product Hypothesis

> If nearby household suppliers are aggregated around existing culinary micro-UMKM anchors, then liters per route will increase toward the internal MVP operating threshold, improving route utilization without requiring immediate geographic expansion.

The **50L threshold is an internal MVP operating assumption**, not an industry benchmark or confirmed break-even point.

---

## MVP

The MVP supports the complete supplier-to-payout workflow:

```text
Supplier
   ↓
Pickup Request
   ↓
Area & Schedule
   ↓
Route Aggregation
   ↓
Route Threshold
   ↓
Pickup
   ↓
Weighing
   ↓
Payout
```

### Main Features

* Supplier registration and lookup
* Household / culinary micro-UMKM segmentation
* Scheduled pickup requests
* Area-based route aggregation
* Collection progress tracking
* Pickup status tracking
* Actual volume weighing
* Supplier payout calculation
* Active pricing reference
* Operations weighing queue
* Dashboard metrics
* Data validation and duplicate prevention

---

## MVP Architecture

```text
                 ┌───────────────────┐
                 │    Supplier UI    │
                 │  HTML / CSS / JS  │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │ Google Apps Script│
                 │   Business Logic  │
                 └─────────┬─────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │   Google Sheets   │
                 │   Data Storage    │
                 └───────────────────┘
```

### Technology

* Google Apps Script
* HTML
* CSS
* JavaScript
* Google Sheets

The MVP was intentionally built with lightweight tools to enable rapid validation without requiring a full production infrastructure.

---

## Evidence Integrity

This project separates different types of evidence:

| Evidence Type            | Meaning                                               |
| ------------------------ | ----------------------------------------------------- |
| **Research Evidence**    | Findings from 3 interviews and 15 survey responses    |
| **Product Assumption**   | Hypotheses or operating assumptions being tested      |
| **Demo Data**            | Illustrative data used to demonstrate the MVP         |
| **Operational Evidence** | Actual operational data collected during a real pilot |
| **Validated Result**     | Result supported by an executed validation experiment |

Demo data is **not presented as actual traction or validated business performance**.

This distinction is maintained throughout the product documentation.

---

## Validation Approach

The first validation design uses directional pre/post comparison to test whether supplier densification can increase route volume.

The experiment compares:

```text
Before Supplier Densification
              ↓
       Add Nearby Suppliers
              ↓
After Supplier Densification
```

Because this is not a randomized controlled experiment, any observed change is treated as **directional evidence rather than definitive causal proof**.

See [`docs/07-experiment.md`](docs/07-experiment.md).

---

## Product Metrics

### North Star Metric

**Liters per Route**

Measures how much UCO volume can be consolidated into each pickup route.

### Supporting Metrics

* Route threshold achievement
* Pickup completion rate
* Repeat contribution rate
* Estimated vs actual volume variance
* Route-related operational effort
* Payout calculation accuracy

### Economic Metric

**Contribution Margin / Route**

```text
Downstream Revenue
− Supplier Payout
− Route-related Variable Cost
```

---

## Product Scope

### In Scope

* UCO pickup request
* Supplier segmentation
* Area-based aggregation
* Scheduled pickup
* Collection tracking
* Weighing
* Supplier payout
* Pricing reference
* Operational validation

### Out of Scope

* Downstream UCO processing
* Geographic expansion
* Advanced route optimization
* Real-time market pricing API
* Supplier marketplace
* Automated demand forecasting

The scope is intentionally constrained to validate the aggregation and collection operating model first.

---

## Product Development Approach

The project follows an evidence-to-delivery framework:

```text
Evidence
   ↓
Insight
   ↓
Problem
   ↓
Hypothesis
   ↓
Product Decision
   ↓
Requirement
   ↓
MVP
   ↓
Metric
   ↓
Validation
   ↓
Learning
   ↓
Next Decision
```

This traceability is used to connect research findings with product decisions and MVP implementation.

---

## Repository Structure

```text
jemput-jelantah/
│
├── README.md
│
├── docs/
│   ├── 01-product-overview.md
│   ├── 02-research.md
│   ├── 03-product-strategy.md
│   ├── 04-prd.md
│   ├── 05-user-flow.md
│   ├── 06-metrics.md
│   ├── 07-experiment.md
│   ├── 08-project-management.md
│   ├── 09-risk-management.md
│   └── 10-validation.md
│
├── ai/
│   ├── README.md
│   ├── ai-usage-log.md
│   └── prompts/
│
├── src/
│   ├── Code.gs
│   ├── Index.html
│   ├── Styles.html
│   └── Scripts.html
│
├── data/
│   └── schema.md
│
├── tests/
│   ├── validation-checklist.md
│   └── test-cases.md
│
├── assets/
│   ├── screenshots/
│   ├── wireframes/
│   └── diagrams/
│
├── CHANGELOG.md
└── LICENSE
```

---

## AI-Assisted Development

AI was used as a development and reasoning assistant across selected stages of the project, including:

* Product reasoning
* Research synthesis
* Product strategy
* PRD development
* UX implementation
* MVP coding
* Debugging
* Test-case development
* Documentation

Human ownership remained responsible for:

* Research collection
* Evidence interpretation
* Product decisions
* Scope decisions
* Validation decisions
* Final review of AI-generated outputs

AI-generated outputs were reviewed before being incorporated into the product.

See [`ai/ai-usage-log.md`](ai/ai-usage-log.md).

---

## Current Status

**Product Stage:** MVP / Pilot Validation

**Pilot Geography:** Jember, East Java

The current focus is validating whether supplier density and area-based aggregation can improve route-level collection efficiency before considering geographic expansion.

---

## Documentation

| Document                                              | Purpose                                    |
| ----------------------------------------------------- | ------------------------------------------ |
| [`Product Overview`](docs/01-product-overview.md)     | Product context and overview               |
| [`Research`](docs/02-research.md)                     | Research method, findings, and limitations |
| [`Product Strategy`](docs/03-product-strategy.md)     | Target users, positioning, hypotheses      |
| [`PRD`](docs/04-prd.md)                               | Product requirements and business rules    |
| [`User Flow`](docs/05-user-flow.md)                   | End-to-end supplier and operational flow   |
| [`Metrics`](docs/06-metrics.md)                       | Product and business metrics               |
| [`Experiment`](docs/07-experiment.md)                 | Validation experiment design               |
| [`Project Management`](docs/08-project-management.md) | Roadmap, resources, and delivery plan      |
| [`Risk Management`](docs/09-risk-management.md)       | Product and operational risks              |
| [`Validation`](docs/10-validation.md)                 | Validation framework and evidence handling |

---

## Product Principle

> **Build the route from the supply, not the other way around.**

Jemput Jelantah is designed to test whether fragmented UCO supply can be consolidated into sufficiently dense pickup routes before scaling the operation geographically.

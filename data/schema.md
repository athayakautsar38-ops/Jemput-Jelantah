# Data Schema

## 1. Purpose

This document defines the data structure used by the Jemput Jelantah MVP.

The schema supports the core product flow:

**COLLECT → SCHEDULE → TRACK → WEIGH → GET PAID**

The MVP uses Google Sheets as the primary data store, with Google Apps Script handling application logic, validation, and data processing.

---

## 2. Data Architecture

```text
SUPPLIERS
    │
    ├── PICKUP_REQUESTS
    │        │
    │        └── ROUTES
    │
    └── WEIGHING_PAYOUT
             │
             └── PRICING

DASHBOARD
    └── Aggregates operational data

VALIDATION
    └── Stores validation and QA records
```

### Core relationships

* One supplier can create multiple pickup requests.
* Multiple pickup requests can be aggregated into a route.
* One pickup request can have one completed weighing and payout record.
* A route can contain multiple pickup requests from the same area and schedule.
* Pricing is referenced when calculating supplier payout.
* Dashboard metrics are derived from operational records.

---

# 3. Sheet Structure

| Sheet             | Purpose                          | Primary Identifier |
| ----------------- | -------------------------------- | ------------------ |
| `SUPPLIERS`       | Stores supplier information      | `supplier_id`      |
| `PICKUP_REQUESTS` | Stores pickup requests           | `request_id`       |
| `ROUTES`          | Stores aggregated pickup routes  | `route_id`         |
| `WEIGHING_PAYOUT` | Stores actual volume and payout  | `weighing_id`      |
| `PRICING`         | Stores pricing references        | `pricing_id`       |
| `DASHBOARD`       | Displays derived product metrics | Metric-based       |
| `VALIDATION`      | Stores validation and QA checks  | `validation_id`    |

---

# 4. SUPPLIERS

## Purpose

Stores supplier information required to identify suppliers and support repeat pickup requests.

| Field           | Type     | Required | Description                 |
| --------------- | -------- | -------: | --------------------------- |
| `supplier_id`   | String   |      Yes | Unique supplier identifier  |
| `name`          | String   |      Yes | Supplier name               |
| `phone`         | String   |      Yes | Supplier contact number     |
| `supplier_type` | Enum     |      Yes | `UMKM` or `HOUSEHOLD`       |
| `area`          | String   |      Yes | Pickup area                 |
| `created_at`    | DateTime |      Yes | Supplier creation timestamp |

### Business rules

1. `supplier_id` must be unique.
2. `phone` is used as the primary lookup method for returning suppliers.
3. `supplier_type` must be either `UMKM` or `HOUSEHOLD`.
4. A supplier can have multiple pickup requests.
5. Existing suppliers should be identified before creating a new supplier record.

---

# 5. PICKUP_REQUESTS

## Purpose

Stores each supplier's pickup request and estimated contribution.

| Field                | Type     | Required | Description                      |
| -------------------- | -------- | -------: | -------------------------------- |
| `request_id`         | String   |      Yes | Unique pickup request identifier |
| `supplier_id`        | String   |      Yes | Reference to supplier            |
| `estimated_volume_l` | Number   |      Yes | Supplier's estimated UCO volume  |
| `area`               | String   |      Yes | Pickup area                      |
| `pickup_date`        | Date     |      Yes | Requested pickup date            |
| `pickup_time`        | String   |      Yes | Requested pickup time window     |
| `status`             | Enum     |      Yes | Request lifecycle status         |
| `route_id`           | String   |       No | Assigned route                   |
| `created_at`         | DateTime |      Yes | Request creation timestamp       |

### Request lifecycle

```text
Pending
   ↓
Scheduled
   ↓
In Progress
   ↓
Completed
```

### Business rules

1. `request_id` must be unique.
2. `supplier_id` must exist in `SUPPLIERS`.
3. `estimated_volume_l` must be greater than or equal to zero.
4. Area and pickup schedule are required for route aggregation.
5. Estimated volume is used for route planning.
6. Estimated volume is not used as the final payout basis.
7. Final payout must use actual weighed volume.

---

# 6. ROUTES

## Purpose

Stores aggregated pickup routes based on supplier area, pickup date, and time window.

| Field                | Type     | Required | Description                  |
| -------------------- | -------- | -------: | ---------------------------- |
| `route_id`           | String   |      Yes | Unique route identifier      |
| `area`               | String   |      Yes | Route area                   |
| `pickup_date`        | Date     |      Yes | Route date                   |
| `pickup_time`        | String   |      Yes | Route time window            |
| `estimated_volume_l` | Number   |      Yes | Aggregated estimated volume  |
| `threshold_l`        | Number   |      Yes | Internal operating threshold |
| `status`             | Enum     |      Yes | Route lifecycle status       |
| `created_at`         | DateTime |      Yes | Route creation timestamp     |

### Route lifecycle

```text
Open
  ↓
Ready
  ↓
In Progress
  ↓
Completed
```

### Route grouping logic

Pickup requests are grouped using:

```text
Area
+
Pickup Date
+
Pickup Time Window
```

The route's estimated volume is:

```text
Route Estimated Volume
=
Σ Estimated Volume of Assigned Requests
```

### Threshold rule

The MVP uses:

```text
Route Threshold = 50L
```

The 50L value is an **internal pilot operating threshold** used to test route aggregation.

It is not presented as:

* an industry benchmark,
* a proven break-even point,
* or a validated minimum economic volume.

### Route readiness

A route can become `Ready` when:

```text
Estimated Route Volume ≥ 50L
```

If the route remains below the threshold, additional suppliers can be aggregated before dispatch.

---

# 7. WEIGHING_PAYOUT

## Purpose

Stores the actual collected volume and supplier payout.

| Field             | Type     | Required | Description                    |
| ----------------- | -------- | -------: | ------------------------------ |
| `weighing_id`     | String   |      Yes | Unique weighing transaction ID |
| `request_id`      | String   |      Yes | Reference to pickup request    |
| `actual_volume_l` | Number   |      Yes | Actual collected volume        |
| `payout_per_l`    | Number   |      Yes | Supplier payout rate per liter |
| `total_payout`    | Number   |      Yes | Total supplier payout          |
| `weighed_at`      | DateTime |      Yes | Weighing timestamp             |

### Payout calculation

```text
Total Payout
=
Actual Volume × Supplier Payout per Liter
```

Example:

```text
Actual Volume = 8L
Payout Rate = Rp5,500/L

Total Payout
= 8 × Rp5,500
= Rp44,000
```

The example is illustrative and does not represent validated operational economics.

### Business rules

1. `request_id` must exist in `PICKUP_REQUESTS`.
2. `actual_volume_l` must be greater than or equal to zero.
3. `total_payout` should be calculated by the system.
4. A completed pickup request should not receive duplicate weighing records.
5. Actual volume is the final payout basis.
6. Estimated volume must not be used for final payout.

---

# 8. PRICING

## Purpose

Stores pricing references used by the MVP for payout calculations.

| Field                   | Type     | Required | Description                          |
| ----------------------- | -------- | -------: | ------------------------------------ |
| `pricing_id`            | String   |      Yes | Unique pricing record                |
| `effective_date`        | DateTime |      Yes | Pricing effective timestamp          |
| `reference_price_per_l` | Number   |      Yes | Reference UCO price                  |
| `supplier_payout_per_l` | Number   |      Yes | Supplier payout rate                 |
| `source`                | String   |      Yes | Pricing reference source             |
| `active`                | Boolean  |      Yes | Whether the pricing record is active |

### Pricing flow

```text
Reference Market Price
        ↓
Supplier Payout Rate
        ↓
Actual Volume
        ↓
Total Supplier Payout
```

The product separates the reference market price from the supplier payout rate so that these values can be independently tracked.

### Pricing limitation

The MVP does not claim to provide real-time market pricing unless a verified external pricing source is integrated.

Any pricing values contained in demo data should therefore be treated as illustrative references.

---

# 9. DASHBOARD

## Purpose

Provides derived metrics for monitoring product and operational performance.

Dashboard metrics should be calculated from underlying operational records whenever possible.

| Metric                 | Calculation                           | Purpose                       |
| ---------------------- | ------------------------------------- | ----------------------------- |
| Total Suppliers        | Count of suppliers                    | Supply base                   |
| UMKM Suppliers         | Count by supplier type                | Potential route anchors       |
| Household Suppliers    | Count by supplier type                | Potential route densification |
| Pickup Requests        | Count of requests                     | Product usage                 |
| Estimated Volume       | Sum of estimated volume               | Planned route supply          |
| Actual Volume          | Sum of actual volume                  | Collected supply              |
| Average Route Volume   | Route volume / completed routes       | Route density                 |
| Threshold Achievement  | Routes ≥50L / eligible routes         | Aggregation performance       |
| Pickup Completion Rate | Completed / scheduled requests        | Operational reliability       |
| Repeat Contribution    | Repeat suppliers / eligible suppliers | Retention signal              |

### Metric integrity

Dashboard values must not be interpreted as validated traction unless they are based on actual operational data.

Seeded or demo records must be clearly classified as:

```text
DEMO / ILLUSTRATIVE DATA
```

---

# 10. VALIDATION

## Purpose

Stores structured validation records used during MVP testing and product review.

| Field             | Type     | Required | Description                  |
| ----------------- | -------- | -------: | ---------------------------- |
| `validation_id`   | String   |      Yes | Unique validation record     |
| `test_name`       | String   |      Yes | Validation scenario          |
| `expected_result` | String   |      Yes | Expected system behavior     |
| `actual_result`   | String   |      Yes | Observed behavior            |
| `status`          | Enum     |      Yes | `Pass`, `Fail`, or `Pending` |
| `notes`           | String   |       No | Additional findings          |
| `validated_at`    | DateTime |      Yes | Validation timestamp         |

Validation records should distinguish between:

* functional validation,
* data validation,
* business-rule validation,
* UX validation,
* product hypothesis validation.

---

# 11. Data Relationships

The primary relationship model is:

```text
SUPPLIER
   │
   │ 1:N
   ▼
PICKUP REQUEST
   │
   │ N:1
   ▼
ROUTE
   │
   │ 1:N
   ▼
WEIGHING & PAYOUT
   │
   └──── uses ────► PRICING
```

Example:

```text
Supplier A
   │
   ├── Request A ──┐
   ├── Request B ──┼──► Route A
   └── Request C ──┘
                        │
                        ▼
                  Pickup Completed
                        │
                        ▼
                     Weighing
                        │
                        ▼
                      Payout
```

---

# 12. Estimated vs Actual Volume

A key data-model principle is separating **estimated volume** from **actual volume**.

### Estimated volume

Used before pickup:

```text
Supplier Estimate
      ↓
Route Aggregation
      ↓
Route Readiness
```

### Actual volume

Used after pickup:

```text
Physical Weighing
      ↓
Actual Volume
      ↓
Supplier Payout
```

Therefore:

```text
Estimated Volume ≠ Final Payout Basis
```

This prevents planning assumptions from being treated as transaction outcomes.

---

# 13. Core Business Rules

| Rule                | Logic                                               |
| ------------------- | --------------------------------------------------- |
| Supplier uniqueness | Phone / supplier ID identifies an existing supplier |
| Request uniqueness  | Every pickup request has a unique request ID        |
| Route grouping      | Area + date + time window                           |
| Route threshold     | Estimated route volume ≥50L                         |
| Threshold meaning   | Internal pilot operating assumption                 |
| Payout basis        | Actual weighed volume                               |
| Payout calculation  | Actual volume × payout/L                            |
| Duplicate weighing  | One completed weighing per pickup request           |
| Pricing reference   | Active pricing record used for payout calculation   |
| Dashboard           | Derived from operational records                    |
| Demo data           | Must be labelled illustrative                       |

---

# 14. Data Quality Rules

## Required fields

Required operational fields must not be empty.

## Numeric validation

Volume and payout-related fields must not contain invalid negative values.

## Referential integrity

References such as:

```text
supplier_id
request_id
route_id
```

must correspond to existing records where applicable.

## Duplicate prevention

The system should prevent duplicate:

* supplier records when an existing phone number is found,
* weighing records for the same completed request,
* transaction calculations for the same request.

## State consistency

Examples:

```text
Completed Request
→ should have actual weighing data
```

```text
Weighing Record
→ should reference an existing request
```

```text
Route Ready
→ estimated volume should meet the internal threshold
```

---

# 15. Data Flow

```text
Supplier Input
      ↓
SUPPLIERS
      ↓
PICKUP_REQUESTS
      ↓
Route Aggregation
      ↓
ROUTES
      ↓
Pickup Execution
      ↓
WEIGHING_PAYOUT
      ↓
Pricing Reference
      ↓
Supplier Payout
      ↓
DASHBOARD
```

---

# 16. Traceability to Product Requirements

| Product Requirement         | Supporting Data                      |
| --------------------------- | ------------------------------------ |
| Supplier onboarding         | `SUPPLIERS`                          |
| Supplier segmentation       | `SUPPLIERS.supplier_type`            |
| Pickup request              | `PICKUP_REQUESTS`                    |
| Estimated collection volume | `PICKUP_REQUESTS.estimated_volume_l` |
| Area aggregation            | `area` + `ROUTES.area`               |
| Scheduled pickup            | `pickup_date` + `pickup_time`        |
| Route threshold             | `ROUTES.threshold_l`                 |
| Collection tracking         | Request and route status             |
| Actual collection           | `WEIGHING_PAYOUT.actual_volume_l`    |
| Transparent payout          | `payout_per_l` + `total_payout`      |
| Pricing reference           | `PRICING`                            |
| Product monitoring          | `DASHBOARD`                          |
| Functional validation       | `VALIDATION`                         |

---

# 17. Evidence Integrity

The data model supports both product demonstration and future pilot validation.

However, the existence of a record in the MVP does not automatically mean that the underlying business hypothesis has been validated.

The project therefore distinguishes:

### Research Evidence

Direct evidence from:

* 15 survey respondents
* 3 user interviews

  * 2 household users
  * 1 culinary micro-UMKM user

### Product Assumption

A working assumption used to design or test the MVP.

### Demo Data

Seeded or illustrative records used to demonstrate functionality.

### Operational Evidence

Data generated from actual pickup operations.

### Validated Result

A measured outcome supported by actual execution and an appropriate validation method.

The classification rule is:

```text
Demo Data
≠
Research Evidence
≠
Operational Evidence
≠
Validated Business Outcome
```

---

# 18. Future Schema Considerations

If the product progresses beyond MVP, additional entities may be introduced:

```text
USERS
ROUTE_STOPS
PICKUP_OPERATIONS
PAYMENTS
UCO_BUYERS
OPERATING_COSTS
NOTIFICATIONS
AUDIT_LOGS
```

These are intentionally outside the current MVP scope.

---

# 19. Final Principle

The data architecture is designed around one product question:

> **Can fragmented UCO supply be aggregated into sufficiently dense pickup routes while maintaining a transparent supplier experience?**

The MVP therefore captures the minimum data required to connect:

**Supplier → Request → Aggregation → Route → Actual Volume → Payout**

This creates a traceable data foundation for future operational validation without treating prototype data as proof of business performance.

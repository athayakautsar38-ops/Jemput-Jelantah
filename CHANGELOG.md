# Changelog

All notable changes to the Jemput Jelantah MVP are documented in this file.

The project follows an iterative product development approach:

**Evidence → Strategy → Product → Build → Test → Validate → Learn**

---

## [Unreleased]

### Current Focus

- Finalizing MVP UI consistency
- Completing end-to-end MVP validation
- Reviewing data integrity across supplier, pickup, route, weighing, and payout flows
- Preparing pilot validation documentation
- Separating demo data from actual research evidence

### Validation Status

The product is currently in the **MVP / Pilot Validation** stage.

No unexecuted experiment or demo dataset is presented as validated business performance.

---

## [v1.0.0] — September 2026

### Added

#### Supplier Flow

- Supplier type selection:
  - Culinary micro-UMKM
  - Household
- Supplier registration
- Existing supplier lookup by phone number
- Supplier information storage
- Pickup request creation

#### Pickup Request

- Estimated UCO volume input
- Pickup area selection
- Scheduled pickup window
- Optional supplier notes
- Pickup request status
- Unique request ID generation

#### Route Aggregation

- Area-based pickup grouping
- Scheduled pickup grouping
- Route volume aggregation
- Internal route operating threshold
- Route status management
- Route readiness based on aggregated estimated volume

#### Collection Tracking

- Pickup status visibility
- Collection progress by phone number
- Estimated collection target
- Remaining volume calculation
- Progress percentage

#### Weighing & Payout

- Operations weighing queue
- Actual UCO volume input
- Backend-side payout calculation
- Active supplier payout reference
- Total payout calculation
- Pickup completion after successful weighing
- Duplicate weighing prevention

#### Pricing

- Dedicated `PRICING` data structure
- Effective date
- Reference price
- Supplier payout per liter
- Pricing source
- Active pricing selection
- Backend validation of active pricing

#### Dashboard

- Supplier count
- Supplier segmentation
- Pickup request count
- Estimated volume
- Actual collected volume
- Route volume
- Route threshold tracking
- Pickup completion metrics
- Repeat contribution metric

#### Data Integrity

- Required-field validation
- Supplier/request relationship validation
- Route/request relationship validation
- Duplicate weighing prevention
- Invalid volume prevention
- Cancelled pickup exclusion from active route calculations
- Backend-authoritative payout calculation

---

## [v0.5.0] — September 2026

### Added

#### Product Strategy

- Defined aggregation-first product direction
- Identified culinary micro-UMKM as potential route anchors
- Identified nearby households as potential route densifiers
- Defined route-density hypothesis
- Defined 50L internal MVP operating threshold

#### Research Integration

- Integrated findings from:
  - 3 semi-structured interviews
  - 15 survey responses
- Separated research evidence from product assumptions
- Added research limitations
- Defined supplier segmentation hypothesis

#### Product Planning

- Product requirements
- User stories
- User flow
- Product metrics
- Experiment design
- Risk management
- Project roadmap
- Validation framework

---

## [v0.4.0] — September 2026

### Added

#### MVP Data Model

Created structured Google Sheets data model:

- `SUPPLIERS`
- `PICKUP_REQUESTS`
- `ROUTES`
- `WEIGHING_PAYOUT`
- `PRICING`
- `DASHBOARD`
- `VALIDATION`

### Added

#### Business Rules

- Supplier volume must be greater than zero
- Pickup requests require supplier, area, schedule, and estimated volume
- Routes aggregate compatible pickup requests
- Route readiness is based on the internal MVP threshold
- Payout is calculated from actual weighed volume
- Completed pickups cannot be weighed again
- Active pricing is selected by effective date

---

## [v0.3.0] — September 2026

### Added

#### Initial Supplier Experience

- Home screen
- Pickup initiation
- Supplier type selection
- Supplier information form
- Pickup schedule selection
- Pickup request confirmation

### Added

#### Operations Experience

- Operations weighing screen
- Pickup request lookup
- Actual volume input
- Payout calculation
- Pickup completion

---

## [v0.2.0] — September 2026

### Added

#### Product Concept

Defined initial Jemput Jelantah concept as a UCO collection service.

The product direction evolved from a simple pickup service toward an:

> **Aggregation-first UCO collection model**

The revised product direction focuses on:

- Supplier density
- Area-based aggregation
- Scheduled collection
- Route-level volume
- Transparent weighing
- Supplier payout

---

## [v0.1.0] — September 2026

### Initial Product Definition

- Created Jemput Jelantah product concept
- Defined used cooking oil collection problem
- Identified household and culinary micro-UMKM suppliers
- Defined initial supplier journey
- Established MVP scope
- Selected Google Apps Script and Google Sheets for rapid MVP development

---

# Evidence Classification

The following evidence categories are maintained throughout the project:

| Category | Definition |
|---|---|
| **Research Evidence** | Findings collected from 3 interviews and 15 survey responses |
| **Product Assumption** | A hypothesis or assumption used to guide product decisions |
| **Demo Data** | Illustrative data used to demonstrate MVP functionality |
| **Operational Evidence** | Data collected from actual product operations |
| **Validated Result** | A result supported by an executed validation experiment |

### Important Rule

Demo data must not be presented as:

- Actual traction
- Actual market demand
- Actual operational performance
- Validated business results

---

# Versioning Principle

Version numbers represent meaningful product development stages rather than every individual code change.

For implementation-level changes, the source code and documentation should be updated together when the change affects:

- Product behavior
- Business logic
- Data structure
- User experience
- Validation methodology

---

# Next Release

## [v1.1.0] — Planned

Potential scope:

- End-to-end validation completion
- Additional route-density validation
- Validation of supplier participation behavior
- Validation of estimated vs actual UCO volume
- Route economics analysis
- UX refinements based on MVP usage
- Documentation updates based on validated findings

Release timing will depend on actual validation progress.

# AI-Assisted Product Development

## 1. Purpose

This folder documents how AI was used during the development of Jemput Jelantah.

The objective is to provide transparency around:

* where AI was used
* what AI was asked to produce
* how outputs were reviewed
* how outputs were tested
* which decisions remained human-owned

The project follows the principle:

> **AI-Assisted, Human-Validated Product Development**

---

# 2. Role of AI in the Project

AI was used as a productivity and reasoning assistant across several stages of product development.

### Product Reasoning

AI supported:

* problem framing
* root-cause analysis
* hypothesis formulation
* product strategy exploration
* metric design
* experiment structure

### Product Documentation

AI supported:

* PRD drafting
* user story refinement
* product requirement structuring
* documentation organization

### UX & Product Design

AI supported:

* user-flow refinement
* information architecture exploration
* interaction-state definition
* UX copy refinement

### MVP Development

AI supported:

* HTML/CSS/JavaScript implementation
* Google Apps Script development
* debugging
* validation logic
* data integration logic

### Testing & Validation

AI supported:

* test-case generation
* edge-case identification
* validation checklist creation
* debugging assistance

---

# 3. Human Responsibilities

AI did not independently determine the final product direction.

Human-owned decisions included:

* target market
* problem definition
* positioning
* product scope
* prioritization
* MVP features
* success metrics
* experiment design
* risk decisions
* final implementation approval

AI outputs were treated as suggestions that required review.

---

# 4. AI Development Workflow

The development workflow is:

```text
PRODUCT CONTEXT
      ↓
AI ASSISTANCE
      ↓
HUMAN REVIEW
      ↓
IMPLEMENTATION
      ↓
TESTING
      ↓
BUG / GAP IDENTIFICATION
      ↓
AI-ASSISTED ITERATION
      ↓
HUMAN VALIDATION
```

AI output is not considered final merely because it is generated successfully.

---

# 5. Validation of AI Outputs

AI-generated outputs were reviewed against:

### Product Requirements

Does the output support the intended user problem?

### Business Logic

Does the implementation follow the defined operating model?

### Data Integrity

Does the implementation store and calculate data correctly?

### UX Consistency

Does the implementation follow the intended user flow?

### Edge Cases

Does the system handle invalid or unexpected inputs?

### Scope

Does the output introduce unnecessary functionality?

---

# 6. AI Usage Principles

The project follows these principles:

### 1. Context Before Generation

AI receives relevant product context before implementation tasks.

### 2. Small Iterations

Large changes are broken into smaller implementation tasks where possible.

### 3. Review Before Acceptance

Generated outputs are reviewed before being treated as project deliverables.

### 4. Test Before Validation

Functional outputs are tested against expected behavior.

### 5. No Evidence Fabrication

AI must not create research findings, user quotes, experiment results, traction, or business performance data.

### 6. Human Ownership

Final product decisions remain the responsibility of the Product Manager.

---

# 7. AI and Evidence Integrity

AI may help analyze actual research data, but it must not create evidence.

The project distinguishes:

```text
ACTUAL EVIDENCE
15 Survey Responses
3 User Interviews
        ↓
AI-Assisted Analysis
        ↓
Human Review
        ↓
Product Insight
```

AI-generated assumptions, examples, or dummy data must remain explicitly labeled.

---

# 8. AI Usage Areas

| Area              | AI Usage              | Human Validation            |
| ----------------- | --------------------- | --------------------------- |
| Research Analysis | Pattern extraction    | Check against raw responses |
| Product Strategy  | Alternative framing   | Select and refine direction |
| PRD               | Structure and wording | Verify requirements         |
| UX                | Flow suggestions      | Review against user needs   |
| Development       | Code generation       | Test functionality          |
| Debugging         | Possible root causes  | Reproduce and verify        |
| Testing           | Test-case generation  | Execute tests               |
| Documentation     | Drafting              | Verify accuracy             |

---

# 9. What AI Was Not Used For

AI was not used to fabricate:

* user interviews
* survey responses
* customer quotes
* market traction
* operational pilot results
* financial performance
* experiment results

Illustrative data used in the MVP is explicitly treated as demo data.

---

# 10. Documentation

AI usage is documented through:

* `ai-usage-log.md`
* `prompts/product-reasoning.md`
* `prompts/ui-implementation.md`
* `prompts/validation.md`

These files provide examples of how AI was integrated into the product development process.

---

# 11. Final Principle

AI is treated as a development accelerator, not as the product decision-maker.

> **AI can accelerate the work. Human judgment validates the work.**

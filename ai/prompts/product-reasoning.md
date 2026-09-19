# Product Reasoning Prompts

## 1. Purpose

This document contains representative prompts used to support product reasoning during the development of Jemput Jelantah.

The prompts are designed to make AI act as a structured thinking assistant rather than a replacement for product judgment.

---

# 2. Problem Framing Prompt

## Objective

Refine the problem statement based on actual user evidence.

### Prompt

```text
Act as a senior Product Manager.

I am developing Jemput Jelantah, an MVP for scheduled used cooking oil (UCO) collection.

Current research evidence:
- 15 survey respondents
- 3 user interviews
- 2 household participants
- 1 culinary micro-UMKM participant

Do not invent research findings or customer quotes.

Analyze the available evidence and help me:
1. identify recurring user problems
2. distinguish symptoms from root causes
3. identify which problems are supported by evidence
4. identify which assumptions still require validation
5. formulate a concise problem statement

Clearly separate:
- Evidence
- Interpretation
- Assumption
- Hypothesis

Do not claim that the findings represent the entire market.
```

---

# 3. Root-Cause Analysis Prompt

## Objective

Identify the operational root cause behind the collection problem.

### Prompt

```text
Analyze this product problem using a senior PM / business analysis perspective.

Product:
Jemput Jelantah

Potential problem:
Used cooking oil supply is fragmented across households and culinary micro-UMKM.

Analyze:
1. possible symptoms
2. possible root causes
3. operational consequences
4. business implications
5. assumptions that require validation

Do not assume that a proposed root cause is proven.

Create a causal chain that can be tested through an MVP or operational experiment.
```

---

# 4. Target Market Prompt

## Objective

Evaluate potential target segments without assuming market behavior.

### Prompt

```text
Act as a Product Strategy analyst.

Evaluate these potential Jemput Jelantah segments:
- households
- culinary micro-UMKM

Available evidence:
15 survey respondents:
- 10 households
- 5 culinary micro-UMKM

Interviews:
- 2 households
- 1 culinary micro-UMKM

Analyze:
1. potential UCO contribution
2. frequency potential
3. operational relevance
4. likely role in route aggregation
5. evidence strength
6. assumptions requiring validation

Do not claim statistical representativeness.

Distinguish observed evidence from hypotheses.
```

---

# 5. Product Positioning Prompt

## Objective

Develop positioning around the core product mechanism.

### Prompt

```text
Help me develop product positioning for Jemput Jelantah.

The product concept:
An aggregation and scheduled pickup layer that consolidates UCO supply from households and culinary micro-UMKM.

Core mechanism:
Fragmented Supply
→ Aggregated Volume
→ Route Efficiency
→ Verified Payout

Explore several positioning directions.

For each direction:
- describe the customer problem
- explain the value proposition
- identify the operational mechanism
- identify the key assumption
- identify what must be validated

Avoid generic sustainability messaging.

The positioning should explain why aggregation and scheduled pickup are important to the product.
```

---

# 6. Hypothesis Formulation Prompt

## Objective

Turn product assumptions into testable hypotheses.

### Prompt

```text
Convert these product assumptions into testable product hypotheses.

Context:
Jemput Jelantah aggregates UCO from culinary micro-UMKM and nearby households.

Core assumption:
Culinary micro-UMKM may act as route anchors while nearby households densify collection routes.

For each hypothesis define:
1. hypothesis statement
2. expected behavior
3. metric
4. data required
5. experiment method
6. possible interpretation
7. limitation

Do not present any hypothesis as validated.
```

---

# 7. Metric Design Prompt

## Objective

Define metrics that measure the actual product mechanism.

### Prompt

```text
Act as a senior Product Manager.

Design a metric framework for an MVP whose core hypothesis is:

Nearby UCO suppliers can be aggregated into sufficiently dense pickup routes.

Prioritize metrics that measure:
- route density
- supplier contribution
- pickup reliability
- estimated vs actual volume
- repeat behavior
- transaction transparency
- route economics

For each metric provide:
- definition
- formula
- data source
- why it matters
- limitation

Do not create baseline values unless actual data is provided.
```

---

# 8. Experiment Design Prompt

## Objective

Design an experiment without fabricating results.

### Prompt

```text
Design an operational experiment for Jemput Jelantah.

Core hypothesis:
Aggregating nearby household suppliers around culinary micro-UMKM anchors may increase liters per pickup route.

Internal pilot operating threshold:
50L per route.

Important:
50L is an internal operating assumption, not an industry benchmark or proven break-even point.

Design:
1. baseline
2. intervention
3. control / comparison where feasible
4. primary metric
5. supporting metrics
6. experiment duration
7. data collection method
8. success criteria
9. risks
10. interpretation rules

Do not generate or assume experiment results.
```

---

# 9. Product Prioritization Prompt

## Objective

Keep MVP scope focused on the core hypothesis.

### Prompt

```text
Act as a senior Product Manager reviewing the Jemput Jelantah MVP backlog.

Core product loop:
COLLECT → SCHEDULE → TRACK → WEIGH → GET PAID

Core hypothesis:
Fragmented UCO supply can be aggregated into sufficiently dense pickup routes.

Evaluate each proposed feature based on:
- user value
- contribution to core hypothesis
- operational importance
- validation value
- implementation complexity

Recommend whether each feature should be:
- MVP
- Later
- Out of Scope

Do not prioritize features merely because they sound innovative.
```

---

# 10. Product Decision Prompt

## Objective

Prepare a decision framework after actual validation.

### Prompt

```text
Act as a senior Product Manager.

I will provide actual pilot data from Jemput Jelantah.

Evaluate the evidence against the predefined hypotheses.

For each hypothesis:
1. summarize observed evidence
2. identify supporting evidence
3. identify contradicting evidence
4. identify data limitations
5. classify the hypothesis as:
   - Supported
   - Partially Supported
   - Not Supported
   - Inconclusive

Then identify appropriate next actions:
- Iterate
- Further Validate
- Evaluate Expansion

Do not invent missing data.
Do not treat insufficient data as confirmation.
Do not change the success criteria after seeing the results.
```

---

# 11. AI Review Prompt

## Objective

Challenge AI-generated product reasoning before acceptance.

### Prompt

```text
Critically review the product analysis above.

Look specifically for:
1. unsupported assumptions
2. invented evidence
3. overgeneralization
4. correlation presented as causation
5. unclear metrics
6. weak experiment design
7. scope creep
8. business claims without evidence

For every issue:
- identify the problematic statement
- explain why it is problematic
- propose a more evidence-safe alternative

Do not rewrite the entire analysis unless necessary.
```

---

# 12. Human Review Rule

AI-generated product reasoning is accepted only after the Product Manager verifies:

```text
AI OUTPUT
   ↓
Evidence Check
   ↓
Logic Check
   ↓
Business Context Check
   ↓
Scope Check
   ↓
Final Human Decision
```

The final product decision is not determined solely by AI output.

---

# 13. Prompting Principle

The prompts intentionally require AI to:

* identify uncertainty
* distinguish evidence from assumptions
* avoid fabricated data
* identify limitations
* propose measurable validation

The objective is to use AI for **structured product thinking**, while maintaining human ownership over product decisions.

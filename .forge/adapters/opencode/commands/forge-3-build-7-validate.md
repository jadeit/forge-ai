---
description: Forge Feature Dev - Sub-phase 7 Validate
agent: forge-build
model: high
---

# Forge AI: Phase 3 - Sub-phase 7: Validate

Invoke the `@forge-validate` subagent for Feature Dev sub-phase 7.

## Purpose

Validate tests against the task document's acceptance criteria.

## Validation Checklist

### 1. Coverage Mapping
For each acceptance criterion, identify which test(s) validate it.

| Acceptance Criterion | Test(s) | Covered |
|---------------------|---------|---------|
| AC1: Users can authenticate | auth.test.ts | ✓ |
| AC2: Session expires | - | ✗ |

### 2. Assertion Quality
- Meaningful assertions (not just "no error")
- Appropriate mocking
- Error path testing

### 3. Negative Testing
- Invalid input handling
- Edge cases
- Error scenarios

### 4. Independence Check
Would tests fail if implementation removed?

## Validation Thresholds

From `.forge/config.yaml`:
- Test coverage minimum: 80% (configurable)

## Rework Decision

If validation fails → Loop to `/forge-3-build-5-implement` for test fixes

## Next Steps

After validation passes, proceed to:
- `/forge-3-build-8-summarise`

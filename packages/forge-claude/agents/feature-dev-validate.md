---
name: validate
description: Feature Dev sub-phase 7 — validate tests against acceptance criteria
tools: Glob, Grep, Read, Write, Edit, Bash
model: sonnet
color: yellow
---

Validate tests against the task document's acceptance criteria.

## Validation Process

### 1. Read Acceptance Criteria

Get acceptance criteria from the task document's frontmatter:
```yaml
acceptance_criteria:
  - "Users can authenticate with email and password"
  - "Session expires after 30 minutes"
```

### 2. Map Tests to Criteria

For each criterion, find which test(s) validate it:

| Acceptance Criterion | Test(s) | Covered |
|---------------------|---------|---------|
| AC1 | auth.test.ts — should authenticate | ✓ |
| AC3 | — | ✗ |

### 3. Assertion Quality

Check that assertions are meaningful:
- Specific values, not just "defined" or "truthy"
- Error paths are tested
- No tautological assertions

### 4. Negative Testing

Verify error cases are covered:
- Invalid input
- Unauthorized access
- Network/dependency failures

### 5. Independence Check

Would each test fail if the implementation were removed?

## Thresholds

From `.forge/config.yaml`:
- Test coverage minimum: 80%

## Output

Add a "Test Validation Report" section to the task document:

```markdown
## Test Validation Report

### Coverage Summary
| Metric | Count |
|--------|-------|
| Total Acceptance Criteria | N |
| Covered | N |
| Uncovered | N |

### Coverage Matrix
### Issues Found
### Validation Result: PASS / FAIL
```

Update task frontmatter:
```yaml
status: in-progress:validate
```

## Rework Decision

| Result | Action |
|--------|--------|
| PASS | Proceed to summarise |
| FAIL | Return to implement for test fixes |

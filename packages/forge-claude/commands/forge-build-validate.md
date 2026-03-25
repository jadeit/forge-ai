---
description: "Forge Feature Dev - Sub-phase 7 Validate: test validation against acceptance criteria"
---

# Feature Dev: 7. Validate

Validate tests against the task document's acceptance criteria.

## Validation Process

### 1. Read Task Document

Get acceptance criteria from the task document:

```yaml
acceptance_criteria:
  - "Users can authenticate with email and password"
  - "Failed attempts are logged"
  - "Session expires after 30 minutes of inactivity"
```

### 2. Read Test Files

Locate and read test files for this feature:
- Unit tests
- Integration tests
- E2E tests (if applicable)

### 3. Coverage Mapping

For each acceptance criterion, identify which test(s) validate it:

| Acceptance Criterion | Test(s) | Covered |
|---------------------|---------|---------|
| AC1: Users can authenticate | `auth.test.ts` — `should authenticate valid user` | ✓ |
| AC2: Failed attempts logged | `auth.test.ts` — `should log failed attempts` | ✓ |
| AC3: Session expires | - | ✗ |

Mark uncovered criteria with ✗.

### 4. Assertion Quality Check

Check that test assertions are meaningful:

**Good Assertions:**
```typescript
expect(result.userId).toBe(expectedId);
expect(status).toBe('active');
expect(attempts).toHaveLength(3);
```

**Poor Assertions (flag these):**
```typescript
expect(result).toBeDefined();           // too vague
expect(isValid).toBe(isValid);          // tautological
expect(() => fn()).not.toThrow();        // no meaningful check
```

Look for:
- Meaningful assertions (not just "no error")
- Appropriate mocking (not excessive)
- Edge case coverage
- Error path testing

### 5. Negative Testing

Verify error cases are tested:

| Error Case | Test Coverage |
|------------|---------------|
| Invalid input | ✓ Tested |
| Network failure | ✓ Tested |
| Unauthorized access | ✗ Not tested |

### 6. Independence Check

Would each test fail if the implementation were removed? Tests that pass without the implementation are not meaningful.

## Validation Thresholds

From `.forge/config.yaml`:
- Test coverage minimum: 80%

## Validation Report

Add a "Test Validation Report" section to the task document:

```markdown
## Test Validation Report

### Coverage Summary
| Metric | Count |
|--------|-------|
| Total Acceptance Criteria | 5 |
| Covered by Tests | 4 |
| Uncovered | 1 |
| Coverage Rate | 80% |

### Coverage Matrix
| Acceptance Criterion | Test(s) | Covered |
|---------------------|---------|---------|
| AC1 | auth.test.ts | ✓ |
| AC3 | - | ✗ |

### Issues Found
| Severity | Issue | Recommendation |
|----------|-------|----------------|
| High | AC3 not tested | Add session timeout test |

### Validation Result
- **Status:** PASS / FAIL
- **Decision:** PROCEED / ADD TESTS
```

Update task frontmatter:
```yaml
status: in-progress:validate
```

## Rework Decision

| Result | Action |
|--------|--------|
| PASS | Proceed to `/forge-ai:forge-build-summarise` |
| FAIL | Return to `/forge-ai:forge-build-implement` to add missing tests |

---
name: forge-validate
description: Feature Dev sub-phase 7 - Test validation against acceptance criteria
mode: subagent
permission:
  skill:
    "forge-*": allow
    "documents-*": allow
    "code-*": allow
    "*": deny
tools:
  read: true
  write: true
  bash: true
  glob: true
  grep: true
model: high
---

# Feature Dev: 7. Validate

Validate tests against the task document's acceptance criteria.

## Load Skills

Use these skills:
- `@forge-context-loader` - Load context for validation
- `@forge-state-manager` - Update task status

## Validation Process

### 1. Read Task Document

Get acceptance criteria from task document:

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

| Acceptance Criterion | Test(s) | Coverage |
|---------------------|---------|----------|
| AC1: Users can authenticate | `auth.test.ts` - `should authenticate valid user` | ✓ |
| AC2: Failed attempts logged | `auth.test.ts` - `should log failed attempts` | ✓ |
| AC3: Session expires | - | ✗ |
| AC4: Invalid email rejected | `auth.test.ts` - `should reject invalid email` | ✓ |

**Mark uncovered criteria with ✗**

### 4. Assertion Quality Check

Review test assertions:

**Good Assertions:**
```typescript
expect(result.userId).toBe(expectedId);
expect(status).toBe('active');
expect(attempts).toHaveLength(3);
```

**Poor Assertions:**
```typescript
// Too vague
expect(result).toBeDefined();

// Tautological
expect(isValid).toBe(isValid);

// No meaningful check
expect(() => fn()).not.toThrow();
```

**Check for:**
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
| Rate limiting | ✗ Not tested |

### 6. Independence Check

Would tests fail if implementation were removed?

```typescript
// This test would pass even without implementation!
it('should authenticate', () => {
  const result = authenticate('user', 'pass');
  expect(result).toBeTruthy(); // Too vague!
});

// Better - specific assertion
it('should authenticate and return user object', () => {
  const result = authenticate('user', 'pass');
  expect(result).toHaveProperty('token');
  expect(result.token).toMatch(/^[a-zA-Z0-9-]+$/);
});
```

## Validation Report

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
| AC1: Users can authenticate | auth.test.ts | ✓ |
| AC2: Failed attempts logged | auth.test.ts | ✓ |
| AC3: Session expires | - | ✗ |
| AC4: Invalid email rejected | auth.test.ts | ✓ |
| AC5: Rate limiting | auth.test.ts | ✓ |

### Assertion Quality

| Test File | Quality | Issues |
|-----------|---------|--------|
| auth.test.ts | Good | None |
| session.test.ts | Fair | Missing assertions in line 45 |

### Negative Testing

| Error Case | Covered |
|------------|---------|
| Invalid input | ✓ |
| Network failure | ✓ |
| Unauthorized | ✗ |
| Rate limiting | ✓ |

### Issues Found

| Severity | Issue | Criterion Affected | Recommendation |
|----------|-------|-------------------|----------------|
| High | AC3 not tested | Session expires | Add test for session timeout |
| Medium | Weak assertions | All | Strengthen assertions |

### Validation Result

- **Status:** PASS / FAIL
- **Test Coverage:** 80%
- **Criteria Coverage:** 80%

**Decision:** PROCEED / ADD TESTS
```

## Validation Thresholds

From config:
```yaml
quality:
  test_coverage_minimum: 80
```

- If coverage >= threshold: PASS
- If coverage < threshold: FAIL - add more tests

## Rework Decision

| Result | Action |
|--------|--------|
| PASS | Proceed to `@forge-summarise` |
| FAIL | Loop to `@forge-implement` for test fixes |

## Update State

### Update Task Document

```yaml
status: in-progress:validate
```

Add validation report to task document.

## Next Steps

Proceed to `@forge-summarise` when:
- All acceptance criteria have corresponding tests
- Tests have meaningful assertions
- Error cases are covered
- Coverage meets threshold

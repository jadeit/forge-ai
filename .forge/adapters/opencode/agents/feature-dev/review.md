---
name: forge-review
description: Feature Dev sub-phase 6 - Automated checks and AI code review
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
  edit: true
  bash: true
  glob: true
  grep: true
model: high
---

# Feature Dev: 6. Review

Quality review using automated checks followed by AI code review.

## Load Skills

Use these skills:
- `@forge-quality-checker` - Run automated quality gates
- `@forge-state-manager` - Update task status

## Review Sequence

Run in this order:

```
1. Automated Checks (fast failures)
   ├── Lint Check
   ├── Type Check
   └── Security Audit
   
2. Tests
   ├── Unit Tests
   └── Integration Tests
   
3. Coverage Check

4. AI Code Review (if automated checks pass)
```

## Automated Checks

### Run Quality Gates

Use `@forge-quality-checker` skill. Run these commands:

```bash
# 1. Linting
npm run lint

# 2. Type Checking
npm run typecheck

# 3. Security Audit
npm audit
```

### Required Thresholds

From `.forge/config.yaml`:
```yaml
quality:
  test_coverage_minimum: 80
  lint_must_pass: true
  type_check_must_pass: true
  security_audit_must_pass: true
```

## AI Code Review

After automated checks pass, review for:

### SOLID Principles

| Principle | What to Check |
|-----------|---------------|
| **S**ingle Responsibility | Does each module have one responsibility? |
| **O**pen/Closed | Can features be added without modifying existing code? |
| **L**iskov Substitution | Can subtypes replace base types safely? |
| **I**nterface Segregation | Are interfaces small and focused? |
| **D**ependency Inversion | Do modules depend on abstractions? |

### Design Patterns

Check for appropriate use of:
- Factory, Builder, Singleton
- Repository, Unit of Work
- Observer, Strategy
- Dependency Injection

### Error Handling

- Are errors caught and handled appropriately?
- Are exceptions used for exceptional cases only?
- Is error context preserved for debugging?

### Security

- Input validation on all user inputs?
- Authentication/authorization enforced?
- Secrets not logged or exposed?
- SQL injection, XSS, CSRF addressed?

### Performance

- Obvious bottlenecks?
- Unnecessary computations?
- Missing caching opportunities?

### Maintainability

- Would another developer understand this?
- Is the code self-documenting?
- Are there appropriate tests?

## Review Output

### Create Review Report

```markdown
## Review Report

### Automated Checks

| Check | Status | Details |
|-------|--------|---------|
| Lint | PASS | No issues |
| Type Check | PASS | No errors |
| Security | PASS | 0 vulnerabilities |
| Tests | PASS | 42/42 passed |
| Coverage | PASS | 87% |

### AI Code Review

#### SOLID Compliance
| Principle | Status | Notes |
|-----------|--------|-------|
| SRP | ✓ | Good separation |
| OCP | ✓ | Extensible design |
| LSP | ✓ | Proper inheritance |
| ISP | ⚠ | Interface X is large |
| DIP | ✓ | Good abstraction |

#### Design Patterns
- [Patterns identified]

#### Issues Found

| Severity | Issue | Location | Recommendation |
|----------|-------|----------|-----------------|
| High | Missing validation | auth.ts:45 | Add input validation |
| Medium | Deep nesting | process.ts:78 | Extract function |

#### Summary
- **Critical Issues:** 0
- **High Issues:** 1
- **Medium Issues:** 2
- **Low Issues:** 1

**Verdict:** APPROVED / REWORK REQUIRED
```

## Rework Decision

| Verdict | Action |
|---------|--------|
| APPROVED | Proceed to `@forge-validate` |
| REWORK (Minor) | Loop to `@forge-implement` |
| REWORK (Approach) | Loop to `@forge-approach` |

### Minor Issues (Loop to Implement)
- Code fixes
- Missing assertions in tests
- Lint/type errors
- Coverage gaps

### Approach Issues (Loop to Approach)
- Design was fundamentally flawed
- Wrong pattern chosen
- Architecture needs rethinking

## Update State

### Update Task Document

```yaml
status: in-progress:review
```

Add review findings to task document.

## Next Steps

Proceed to `@forge-validate` when:
- All automated checks pass
- No critical or high issues
- Minor issues are acceptable (user decision)

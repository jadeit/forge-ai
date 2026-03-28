---
description: "Forge Feature Dev - Sub-phase 6 Review: automated checks and AI code review"
---

# Feature Dev: 6. Review

Quality review using automated checks followed by AI code review.

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

4. AI Code Review (only if automated checks pass)
```

## Automated Checks

Run these commands (adapt to the project's package manager / language):

```bash
# 1. Linting
npm run lint

# 2. Type Checking
npm run typecheck

# 3. Security Audit
npm audit

# 4. Static Analysis (SAST)
semgrep --config=auto --error .
```

### Required Thresholds (from `.forge/config.yaml`):
- Test coverage minimum: 80%
- Lint must pass: true
- Type check must pass: true
- Security audit must pass: true

## AI Code Review

After automated checks pass, review for:

### SOLID Principles

| Principle | What to Check |
|-----------|---------------|
| Single Responsibility | Does each module have one responsibility? |
| Open/Closed | Can features be added without modifying existing code? |
| Liskov Substitution | Can subtypes replace base types safely? |
| Interface Segregation | Are interfaces small and focused? |
| Dependency Inversion | Do modules depend on abstractions? |

### Design Patterns
Check for appropriate use of Factory, Builder, Repository, Observer, Strategy, Dependency Injection.

### Error Handling
- Are errors caught and handled appropriately?
- Is error context preserved for debugging?

### Security
- Input validation on all user inputs?
- Authentication/authorization enforced?
- Secrets not logged or exposed?
- SQL injection, XSS, CSRF addressed?

### Performance
- Obvious bottlenecks?
- Missing caching opportunities?

### Maintainability
- Would another developer understand this?
- Are there appropriate tests?

## Review Output

Add a "Review Report" section to the task document:

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
| ISP | ⚠ | Interface X is large |
| DIP | ✓ | Good abstraction |

#### Issues Found

| Severity | Issue | Location | Recommendation |
|----------|-------|----------|-----------------|
| High | Missing validation | auth.ts:45 | Add input validation |
| Medium | Deep nesting | process.ts:78 | Extract function |

#### Summary
- **Critical Issues:** 0
- **High Issues:** 1
- **Verdict:** APPROVED / REWORK REQUIRED
```

Update task frontmatter:
```yaml
status: in-progress:review
```

## Rework Decision

| Verdict | Action |
|---------|--------|
| APPROVED | Proceed to `/forge-ai:forge-build-validate` |
| REWORK (Minor — code fixes) | Return to `/forge-ai:forge-build-implement` |
| REWORK (Approach — design flaw) | Return to `/forge-ai:forge-build-approach` |

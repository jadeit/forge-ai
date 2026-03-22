---
name: forge-quality-checker
description: Run quality gates for Forge Phase 3 - linting, type checking, security, coverage
license: MIT
compatibility: opencode
metadata:
  audience: forge-users
  workflow: build-phase
---

# Forge Quality Checker

Run quality gates for Feature Development (Phase 3).

## Quality Thresholds

Read from `.forge/config.yaml`:
```yaml
quality:
  test_coverage_minimum: 80
  lint_must_pass: true
  type_check_must_pass: true
  security_audit_must_pass: true
```

## Quality Gate Sequence

Run in this order - fail fast:

```
1. Lint Check
   ↓ (if pass)
2. Type Check
   ↓ (if pass)
3. Security Audit
   ↓ (if pass)
4. Tests
   ↓ (if pass)
5. Coverage Check
   ↓ (if pass)
6. AI Code Review
```

## Gate Definitions

### 1. Lint Check

Run the project's linter:
```bash
# Python
npm run lint  # or ruff, pylint, etc.

# JavaScript/TypeScript
npm run lint

# Multiple
npm run lint && npm run lint:style
```

**Gate:** Must pass (exit code 0)

### 2. Type Check

Run the project's type checker:
```bash
# TypeScript
npx tsc --noEmit

# Python
npm run typecheck  # or mypy, pyright
```

**Gate:** Must pass (exit code 0)

### 3. Security Audit

Run security checks:
```bash
# npm
npm audit

# pip
pip-audit

# Docker
trivy image [image-name]
```

**Gate:** Must pass (no critical/high vulnerabilities, or all acknowledged)

### 4. Tests

Run the test suite:
```bash
npm test
# or
pytest
```

**Gate:** All tests must pass (no failures)

### 5. Coverage Check

Run tests with coverage:
```bash
# Jest
npm run test:coverage

# pytest
pytest --cov=. --cov-report=term-missing
```

**Gate:** Coverage >= configured minimum (default 80%)

## Tool Detection

Detect available tools automatically:

| File | Tool |
|------|------|
| `package.json` | npm, jest, eslint, tsc |
| `pyproject.toml` | pytest, ruff, mypy |
| `Dockerfile` | hadolint, trivy |
| `Makefile` | make targets |

## Language-Specific Guidelines

### Python

- Use `ruff` for linting and formatting
- Use `mypy` or `pyright` for type checking
- Use `pytest` for testing
- Use `bandit` for security

### JavaScript/TypeScript

- Use `eslint` for linting
- Use `typescript` (tsc) for type checking
- Use `jest` or `vitest` for testing
- Use `npm audit` for security

### Multi-language Projects

Run all applicable tools:
```bash
# Run all checks
npm run lint && npm run typecheck && npm test
ruff check .
mypy src/
```

## AI Code Review

After automated checks pass, perform AI review:

### SOLID Principles Check

- **S**ingle Responsibility: Does each module do one thing?
- **O**pen/Closed: Open for extension, closed for modification?
- **L**iskov Substitution: Can subtypes replace base types?
- **I**nterface Segregation: Are interfaces small and focused?
- **D**ependency Inversion: Depend on abstractions?

### Design Patterns Check

Are established patterns used appropriately?
- Factory, Builder, Singleton
- Repository, Unit of Work
- Observer, Strategy

### Error Handling Check

- Are errors caught and handled appropriately?
- Are exceptions used for exceptional cases only?
- Is error context preserved?

### Security Check (Manual)

- Input validation on all user inputs
- Authentication/authorization properly enforced
- Secrets not logged or exposed
- SQL injection, XSS, CSRF addressed

## Reporting

### Pass Report

```
Quality Gates: PASSED

✓ Lint Check - No issues
✓ Type Check - No errors
✓ Security Audit - No vulnerabilities
✓ Tests - 42 passed, 0 failed
✓ Coverage - 87% (threshold: 80%)

AI Code Review: PASSED
- SOLID compliance: ✓
- Design patterns: ✓
- Error handling: ✓
- Security: ✓

Ready to proceed.
```

### Fail Report

```
Quality Gates: FAILED

✗ Lint Check - 3 issues found
  - src/auth.ts:45 - Unused variable 'temp'
  - src/utils.ts:12 - Line too long (85 > 80)
  - src/api.ts:78 - Missing semicolon

Fix required before proceeding.
```

## Rework Routing

| Issue Type | Route To |
|------------|----------|
| Lint/type errors | `forge 3:build 5:implement` |
| Test failures | `forge 3:build 5:implement` |
| Coverage below threshold | `forge 3:build 5:implement` |
| Design flaw | `forge 3:build 4:approach` |
| Security vulnerability | `forge 3:build 5:implement` (critical) or `forge 3:build 4:approach` |

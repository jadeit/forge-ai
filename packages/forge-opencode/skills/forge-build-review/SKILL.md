---
name: forge-build-review
description: Forge Feature Dev - Sub-phase 6: Quality review
license: MIT
compatibility: opencode
---

# Forge AI: Phase 3 - Sub-phase 6: Review

Invoke the `@forge-review` subagent for Feature Dev sub-phase 6.

## Purpose

Quality review using automated checks followed by AI code review.

## Quality Gates

Run these automated checks:
1. **Lint Check** - Code style
2. **Type Check** - Type safety
3. **Security Audit** - Vulnerabilities
4. **Tests** - All must pass
5. **Coverage** - Must meet threshold (default 80%)

## AI Code Review

After automated checks pass, review for:
- SOLID principles compliance
- Design pattern usage
- Error handling
- Security
- Performance
- Maintainability

## Issue Severity

| Severity | Action |
|----------|--------|
| Critical | Must fix before proceeding |
| High | Should fix |
| Medium | Consider fixing |
| Low | Nice to have |

## Rework Decision

- **Minor issues** → Loop to `/forge-build-implement`
- **Approach issues** → Loop to `/forge-build-approach`

## Next Steps

After review passes, proceed to `/forge-build-validate`.

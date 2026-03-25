---
description: "Forge Feature Dev - Sub-phase 8 Summarise: document accomplishments"
---

# Feature Dev: 8. Summarise

Document what was accomplished and complete the feature development lifecycle.

## Summary Content

### 1. Review Task Document

Read the complete task document to understand:
- What was planned
- What was implemented
- Any deviations from the plan

### 2. Document Changes Made

Add a "Summary" section to the task document:

```markdown
## Summary

### What Was Built

Brief description of the feature and its purpose.

### Changes Made

| File | Action | Lines | Description |
|------|--------|-------|-------------|
| src/auth.ts | Created | +120 | Authentication module |
| src/auth.test.ts | Created | +85 | Unit tests |
| src/middleware/auth.ts | Modified | +30 | Added auth middleware |

### Decisions Made During Implementation

| Decision | Original Plan | Actual | Reason for Change |
|----------|--------------|--------|-------------------|
| Token format | JWT | PASETO | Better security properties |

### Test Coverage

| Metric | Value |
|--------|-------|
| Lines Covered | 85% |
| Branches Covered | 78% |
| Functions Covered | 100% |

### Quality Gates

| Gate | Status |
|------|--------|
| Lint | ✓ Pass |
| Type Check | ✓ Pass |
| Security Audit | ✓ Pass |
| Tests | ✓ Pass (42/42) |
| Coverage | ✓ Pass (85% >= 80%) |

### Known Limitations

- [Intentionally deferred items]
- [Known issues not fixed]
- [Technical debt introduced]

### Next Steps

1. Manual testing by QA
2. Deploy to staging
3. User acceptance testing
```

## Final Task Document Update

Update task frontmatter:

```yaml
---
title: [Task Title]
status: complete
mode: brownfield  # or greenfield
completed: [ISO timestamp]
---
```

## State Updates

Update `.forge/state.yaml`:

```yaml
features:
  task-slug:
    phase: 3
    status: complete
    completed: [ISO timestamp]
    sub_phase_history:
      - sub_phase: 1_discover
        status: complete
      - sub_phase: 2_explore
        status: complete
      - sub_phase: 3_clarify
        status: complete
      - sub_phase: 4_approach
        status: complete
      - sub_phase: 5_implement
        status: complete
      - sub_phase: 6_review
        status: complete
      - sub_phase: 7_validate
        status: complete
      - sub_phase: 8_summarise
        status: complete
```

## Lifecycle Complete

Feature Development Lifecycle is complete when:
- All 8 sub-phases completed
- Task document updated with summary
- State file updated
- Quality gates all passed

## Next Actions

Present a completion summary to the user:

```
Feature Development Lifecycle Complete.

Task: [Task Title]
Status: Complete

Next options:
- Next feature: [task-name] — use /forge-ai:forge-build-discover
- Phase 4 Testing: /forge-ai:forge-test

What would you like to do?
```

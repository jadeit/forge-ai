---
name: forge-summarise
description: Feature Dev sub-phase 8 - Document accomplishments
mode: subagent
permission:
  skill:
    "forge-*": allow
    "documents-*": allow
    "*": deny
tools:
  read: true
  write: true
  edit: true
model: low
---

# Feature Dev: 8. Summarise

Document what was accomplished and complete the feature development lifecycle.

## Load Skills

Use these skills:
- `@forge-state-manager` - Update task and project state

## Summary Content

### 1. Review Task Document

Read the complete task document to understand:
- What was planned
- What was implemented
- Any deviations from the plan

### 2. Document Changes Made

Create a summary of all changes:

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

- [Any intentionally deferred items]
- [Known issues not fixed]
- [Technical debt introduced]

### Next Steps

1. Manual testing by QA
2. Deploy to staging
3. User acceptance testing
4. Documentation updates
```

## Final Task Document Update

### Update Frontmatter

```yaml
---
title: [Task Title]
status: complete
mode: brownfield  # or greenfield
completed: 2026-03-22T18:00:00Z
---
```

### Add Summary Section

Append completed summary to the task document body.

## State Updates

### Update Feature State

In `.forge/state.yaml`:

```yaml
features:
  feature-slug:
    phase: 3
    status: complete
    completed: 2026-03-22T18:00:00Z
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
- ✓ All 8 sub-phases completed
- ✓ Task document updated with summary
- ✓ State file updated
- ✓ Quality gates passed

## Next Actions

After lifecycle completion:

1. **Run full test suite** - Ensure nothing was broken
2. **Manual testing** - Verify feature works as expected
3. **Code review** - Peer review by team member
4. **Documentation** - Update API docs, README if needed
5. **Next feature** - Start next task or propose Phase 4 (Testing)

## Propose Phase Transition

After completing features:

```
Feature Development complete.

Completed features:
- implement-user-auth ✓
- session-management ✓

Ready to proceed to:
- Next feature: [task-name]
- Phase 4: Testing (forge 4:test)

What would you like to do?
```

## Output

### Confirm Completion

```
✓ Feature Development Lifecycle Complete

Task: [Task Title]
Duration: [Time spent]
Status: Complete

Next: Choose next action
```

---
name: summarise
description: Feature Dev sub-phase 8 — document accomplishments and complete the lifecycle
tools: Read, Write, Edit
model: haiku
color: cyan
---

Document what was accomplished and complete the feature development lifecycle.

## Summary Content

### 1. Review Task Document

Read the complete task document to understand what was planned, what was implemented, and any deviations.

### 2. Update Task Document

Add a "Summary" section:

```markdown
## Summary

### What Was Built
Brief description of the feature and its purpose.

### Changes Made
| File | Action | Lines | Description |
|------|--------|-------|-------------|

### Decisions Made During Implementation
| Decision | Original Plan | Actual | Reason |
|----------|--------------|--------|--------|

### Quality Gates
| Gate | Status |
|------|--------|
| Lint | ✓ Pass |
| Type Check | ✓ Pass |
| Tests | ✓ Pass |
| Coverage | ✓ Pass |

### Known Limitations
### Next Steps
```

### 3. Update Task Frontmatter

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
context:
  current_task: null
  current_sub_phase: null
```

## Lifecycle Complete

Present completion summary to the user and offer next steps:
- Next feature in task list
- Phase 4 Testing: `/forge-ai:forge-test`

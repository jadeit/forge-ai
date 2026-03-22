---
description: Forge Feature Dev - Sub-phase 8 Summarise
agent: forge-build
---

# Forge AI: Phase 3 - Sub-phase 8: Summarise

Invoke the `@forge-summarise` subagent for Feature Dev sub-phase 8.

## Purpose

Document what was accomplished.

## Summary Content

### Document in task document:

1. **What Was Built** - Brief description
2. **Changes Made** - Table of files modified
3. **Decisions Made** - Any deviations from approach
4. **Known Limitations** - Deferred items, technical debt
5. **Next Steps** - What comes next

### Update task document frontmatter:
```yaml
status: complete
completed: [timestamp]
```

### Update state file:
```yaml
features:
  task-slug:
    status: complete
```

## Lifecycle Complete

Feature Development Lifecycle is complete when:
- ✓ All 8 sub-phases completed
- ✓ Task document updated with summary
- ✓ State file updated

## Next Actions

After lifecycle complete:
1. Run full test suite
2. Manual testing
3. Next feature or Phase 4: Testing

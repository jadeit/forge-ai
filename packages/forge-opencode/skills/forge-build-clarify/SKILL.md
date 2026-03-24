---
name: forge-build-clarify
description: Forge Feature Dev - Sub-phase 3: Resolve ambiguities
license: MIT
compatibility: opencode
---

# Forge AI: Phase 3 - Sub-phase 3: Clarify

Invoke the `@forge-clarify` subagent for Feature Dev sub-phase 3.

## Purpose

Fill in gaps and resolve ambiguities. Output updates the task document.

## Clarify Activities

- Review findings from discover and explore phases
- Identify gaps in requirements
- Form questions for user
- Update acceptance criteria

## Question Format

Present questions clearly:
```
**Q1:** [Specific question]
**Context:** [Why this matters]
**Options:** [If multiple solutions exist]
```

## Prioritization

- **Must** - Blockers for implementation
- **Should** - Important for optimal solution
- **Could** - Nice to have clarification

## Next Steps

After clarify complete (all "Must" questions answered), proceed to `/forge-build-approach`.

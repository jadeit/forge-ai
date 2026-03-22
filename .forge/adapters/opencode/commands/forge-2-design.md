---
description: Forge AI Phase 2 - System design and task breakdown
agent: forge-design
model: high
---

# Forge AI: Phase 2 - Design

Invoke the `@forge-design` agent to begin Phase 2: Design.

## What Happens

1. Phase 1 artifacts are loaded and reviewed
2. Design agent creates required documents:
   - `docs/design/design-decisions.md`
   - `docs/design/task-list.md`
   - `docs/design/tasks/{task-slug}.md` (one per task)
3. Agent validates all task documents have required frontmatter
4. State is updated in `.forge/state.yaml`
5. You confirm transition to Phase 3

## Phase 2 Outputs

| Document | Purpose |
|----------|---------|
| design-decisions.md | Documented design decisions |
| task-list.md | Summary list of all tasks |
| tasks/{task-slug}.md | One document per task with implementation detail |

## Task Document Requirements

Each task document includes:
- Required frontmatter (title, status, mode, complexity, categories)
- Summary / Objective
- Acceptance Criteria (testable)
- Implementation Detail (illustrative code permitted)
- Testing Criteria

## Flags

- `--only {task}` - Work on specific task only
- `--model {tier}` - Override model tier

## Prerequisites

Phase 1 must be complete. Check `.forge/state.yaml`.

If prerequisites not met, warning is shown but you may override and proceed.

## Next Steps

After Phase 2 complete, use `/forge-3-build` for Phase 3: Development.

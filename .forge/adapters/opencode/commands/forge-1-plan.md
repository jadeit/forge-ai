---
description: Forge AI Phase 1 - Planning and requirement analysis
agent: forge-plan
model: high
---

# Forge AI: Phase 1 - Planning

Invoke the `@forge-plan` agent to begin Phase 1: Planning.

## What Happens

1. Context is loaded (existing README/brief if present)
2. Planning agent creates required documents:
   - `docs/planning/project-scope.md`
   - `docs/planning/user-stories.md`
   - `docs/planning/implementation-plan.md`
   - `docs/planning/technology-and-architecture.md`
3. Agent validates all required artifacts exist
4. State is updated in `.forge/state.yaml`
5. You confirm transition to Phase 2

## Phase 1 Outputs

| Document | Purpose |
|----------|---------|
| project-scope.md | Project aim, high-level design, technology choices |
| user-stories.md | User stories that drive development |
| implementation-plan.md | High-level phases to be implemented |
| technology-and-architecture.md | Tech choices and architecture (C4 Model) |

## Constraints

- NO executable code, scaffolding, or infrastructure
- Illustrative code snippets ARE permitted
- Use Mermaid diagrams for architecture

## Flags

- `--only {artifact}` - Work on specific artifact only
  - Options: project-scope, user-stories, implementation-plan, technology

## Prerequisites

None — Phase 1 is the starting point.

## Next Steps

After Phase 1 complete, use `/forge-2-design` for Phase 2: Design.

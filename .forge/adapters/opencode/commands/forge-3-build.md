---
description: Forge AI Phase 3 - Development via Feature Dev lifecycle
agent: forge-build
model: medium
---

# Forge AI: Phase 3 - Development

Invoke the `@forge-build` agent to begin Feature Development.

## Feature Dev Lifecycle

| Sub-Phase | Command | Description |
|-----------|---------|-------------|
| 1 | `/forge-3-build-1-discover` | Understand what needs to be built |
| 2 | `/forge-3-build-2-explore` | Explore relevant existing code |
| 3 | `/forge-3-build-3-clarify` | Resolve ambiguities |
| 4 | `/forge-3-build-4-approach` | Design/validate approach |
| 5 | `/forge-3-build-5-implement` | Build the feature |
| 6 | `/forge-3-build-6-review` | Quality review |
| 7 | `/forge-3-build-7-validate` | Test validation |
| 8 | `/forge-3-build-8-summarise` | Document accomplishments |

## Usage

Run `/forge-3-build` for full lifecycle, or use specific sub-phase commands:
- `/forge-3-build-1-discover`
- `/forge-3-build-2-explore`
- `/forge-3-build-3-clarify`
- `/forge-3-build-4-approach`
- `/forge-3-build-5-implement`
- `/forge-3-build-6-review`
- `/forge-3-build-7-validate`
- `/forge-3-build-8-summarise`

## Operating Modes

| Mode | Condition | Behaviour |
|------|-----------|-----------|
| Brownfield | Task document exists with detail | Lighter discovery, validate approach |
| Greenfield | No task document | Full scoping, create task doc |

## Flags

- `--only {sub-phase}` - Run specific sub-phase
- `--task {slug}` - Work on specific task
- `--model {tier}` - Override model tier

## Prerequisites

Phase 2 must be complete. Check `.forge/state.yaml`.

## Next Steps

After Phase 3 complete, use `/forge-4-test` for Phase 4: Testing.

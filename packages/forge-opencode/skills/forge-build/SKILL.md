---
name: forge-build
description: Forge AI Phase 3 - Development via Feature Dev lifecycle
license: MIT
compatibility: opencode
---

# Forge AI: Phase 3 - Development

Invoke the `@forge-build` agent to begin Feature Development.

## Feature Dev Lifecycle

| Sub-Phase | Command | Description |
|-----------|---------|-------------|
| 1 | `/forge-build-discover` | Understand what needs to be built |
| 2 | `/forge-build-explore` | Explore relevant existing code |
| 3 | `/forge-build-clarify` | Resolve ambiguities |
| 4 | `/forge-build-approach` | Design/validate approach |
| 5 | `/forge-build-implement` | Build the feature |
| 6 | `/forge-build-review` | Quality review |
| 7 | `/forge-build-validate` | Test validation |
| 8 | `/forge-build-summarise` | Document accomplishments |

## Usage

Run `/forge-build` for full lifecycle, or use specific sub-phase commands.

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

After Phase 3 complete, use `/forge-test` for Phase 4: Testing.

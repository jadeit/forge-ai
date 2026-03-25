---
description: Forge AI Phase 3 - Development via Feature Dev lifecycle
argument-hint: "--task <task-slug>"
---

# Forge AI: Phase 3 - Development

Orchestrate the Feature Development lifecycle for the current task.

## Feature Dev Lifecycle

| Sub-Phase | Command | Description |
|-----------|---------|-------------|
| 1 | `/forge-ai:forge-build-discover` | Understand what needs to be built |
| 2 | `/forge-ai:forge-build-explore` | Explore relevant existing code |
| 3 | `/forge-ai:forge-build-clarify` | Resolve ambiguities |
| 4 | `/forge-ai:forge-build-approach` | Design or validate approach |
| 5 | `/forge-ai:forge-build-implement` | Build the feature |
| 6 | `/forge-ai:forge-build-review` | Quality review |
| 7 | `/forge-ai:forge-build-validate` | Test validation against acceptance criteria |
| 8 | `/forge-ai:forge-build-summarise` | Document accomplishments |

## What To Do

1. Read `.forge/state.yaml` to determine current task and sub-phase
2. Read `docs/design/task-list.md` to identify the next task to work on
3. Run each sub-phase in sequence, checking state after each
4. After all 8 sub-phases complete, mark the task as done and propose the next

## Operating Modes

| Mode | Condition | Behaviour |
|------|-----------|-----------|
| Brownfield | Task document exists with detail | Lighter discovery, validate approach |
| Greenfield | No task document or stub only | Full scoping, create task doc |

## Prerequisites

Phase 2 must be complete. Read `.forge/state.yaml` to verify.

## Flags

- `--task {slug}` - Work on a specific task
- `--only {sub-phase}` - Run a specific sub-phase (1-8)

## Next Steps

After all tasks in Phase 3 are complete, use `/forge-ai:forge-test` for Phase 4: Testing.
